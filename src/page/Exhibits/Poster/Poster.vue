<template>
  <div class="poster">
    <main>
      <img
        :src="this.$store.state.exhibits.imgUrl+'/'+this.$cookie.get('uid')"
        class="poster-poster"
        @click.prevent=""
      >
      <!-- <img class="code" :src="ewm_path" alt=""> -->
    </main>

    <div class="poster-field">
      {{this.$store.state.exhibits.text}}
    </div>

    <ul class="flex flex-justify-between poster-ul-wrap">
      <li>
        <van-button
          type="default"
          @click="save"
          class="poster-baocun-but"
        >
          <img
            src="../../../assets/img/poster/baocun.png"
            class="poster-baocun"
          >
          <span style="vertical-align: middle;">&nbsp;&nbsp;长按图片保存</span>
        </van-button>
      </li>
      <!--<li>-->
      <!--<van-button type="default" class="poster-fuzhi-but">-->
      <!--<img src="../../../assets/img/poster/fuzhi.png" class="poster-fuzhi">-->
      <!--<span style="vertical-align: middle;">&nbsp;&nbsp;复制朋友圈文案</span>-->
      <!--</van-button>-->
      <!--</li>-->
      <li>
        <van-button
          type="default"
          class="poster-baocun-but share"
          @click="shareFriend"
        >
          <img
            src="../../../assets/img/poster/fenxiang.png"
            class="poster-baocun"
          >
          <span style="vertical-align: middle;">&nbsp;&nbsp;分享到朋友圈</span>
        </van-button>
      </li>
    </ul>
    <van-popup v-model="show">
      <img
        src="../../../assets/img/poster/wechat.png"
        alt=""
      >
    </van-popup>
  </div>
</template>

<script>
/**
 * @Description:
 * @author 李凯明
 * @date 2019/3/6
 */
import { mixin } from "../../../utils/common";

export default {
  mixins: [mixin],
  name: "Poster",
  data() {
    return {
      img: require("../../../assets/img/poster/poster.png"),
      show: false,
      shareUrl: window.location.href.split("#")[0]
    };
  },
  created() {
    // this.$axios.fetchPost('/getUserRegSource',{},this.$cookie.get('token')).then(res=>{
    //   console.log(res);
    //   this.$cookie.set('regSource',res.data);
    // })
    let self = this;
    // if(this.isIos()){
    //   this.shareUrl = window.location.href.split('#')[0];
    // }
    // let localUrl = window.location.href;

    // if (
    //   localUrl.indexOf("?from=singlemessage") != -1 ||
    //   localUrl.indexOf("?from=timeline") != -1 ||
    //   localUrl.indexOf("?from=timeline&isappinstalled=0") != -1 ||
    //   localUrl.indexOf("?from=singlemessage&isappinstalled=0") != -1
    // ) {
    //   localUrl = localUrl
    //     .replace("?from=singlemessage", "")
    //     .replace("?from=timeline", "")
    //     .replace("?from=timeline&isappinstalled=0", "")
    //     .replace("?from=singlemessage&isappinstalled=0", "");
    //   imgSrc = decodeURIComponent(this.parseURL("img", localUrl));
    //   this.text = decodeURIComponent(this.parseURL("text", localUrl));
    //   console.log(imgSrc);
    // } else {
    //   imgSrc = decodeURIComponent(this.parseURL("img"));
    //   console.log(imgSrc);
    //   this.text = decodeURIComponent(this.parseURL("text"));
    //   console.log(this.text);
    // }

    this.$axios.fetchGet(`/weChatConfig`, { url: this.shareUrl }).then(res => {
      console.log(res);
      wx.config({
        debug: false, // 是否开启调试模式
        appId: res.data.appId, //appid
        timestamp: res.data.timestamp, // 时间戳
        nonceStr: res.data.nonceStr, // 随机字符串
        signature: res.data.signature, // 签名
        jsApiList: [
          "checkJsApi",
          "onMenuShareAppMessage",
          "onMenuShareTimeline"
        ] // 需要使用的JS接口列表
      });
      this.$axios
        .fetchPost("/getUserRegSource", {}, this.$cookie.get("token"))
        .then(res => {
          console.log(res);
          this.$cookie.set("regSource", res.data);
          wx.ready(function() {
            let link =
              self.$store.state.shareURL+"user/invitation?inventNum=" +
              self.$cookie.get("inventNum") +
              "&regSource=" +
              self.$cookie.get("regSource");
            // 分享到朋友圈
            wx.onMenuShareTimeline({
              title: "山高房金，经纪人轻松年赚百万的大平台", // 分享标题
              desc:
                "成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~",
              link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接
              imgUrl:
                "https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png", // 分享图标
              success: function() {
                // this.$toast({
                //   message: "分享成功"
                // });
              }
            });
            //分享给好友
            wx.onMenuShareAppMessage({
              title: "山高房金，经纪人轻松年赚百万的大平台", // 分享标题
              desc:
                "成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~", // 分享描述
              link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png", // 分享图标
              success(data) {
                // this.$toast({
                //   message: "分享成功"
                // });
              }
            });
          });
        });
    });
  },
  methods: {
    shareFriend() {
      let ua = navigator.userAgent.toLowerCase();
      let isWeixin = ua.indexOf("micromessenger") != -1;
      if (isWeixin) {
        this.show = true;
      } else {
        this.$toast("请使用微信浏览器进行分享");
      }
    },
    save() {
      this.$toast("长按上方图片即可保存");
    },
    isIos() {
      const u = navigator.userAgent;
      return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
    }
  }
};
</script>

<style lang="less" src="./poster.less"></style>
