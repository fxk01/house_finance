<template>
  <div id="industry">
    <van-swipe
      vertical
      :loop="false"
      @change="isUp"
    >
      <van-swipe-item
        v-for="(item, index) in imgArr"
        :key="index"
      >
        <img
          v-if="index !== imgArr.length-1"
          :src="item.imgSrc"
          alt=""
        >
        <div
          v-else
          class="position"
        >
          <img
            :src="item.imgSrc"
            alt=""
          >
          <div
            class="absolute"
            @click="subOrder"
          >
            <img
              src="../../../../assets/img/home/industryBorrow/td.png"
              alt=""
            >
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="share" @click="share">
      <img
        src="../../../../assets/img/home/myshare.png"
        alt=""
      >
    </div>
    <div class="up" v-if="showUp">
      <img src="../../../../assets/img/home/industryBorrow/top.png" alt="">
    </div>
    <van-popup v-model="show" class="shareBG">
      <img
        src="../../../../assets/img/poster/wechat.png"
        alt=""
      >
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgArr: [
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg1.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg2.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg3.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg4.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg5.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg6.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg7.png")
        },
        {
          imgSrc: require("../../../../assets/img/home/GuangZhou/bg8.png")
        },
        // {
        //   imgSrc: require("../../../../assets/img/home/JiNan/bg10.png")
        // },
        {
          imgSrc: require("../../../../assets/img/home/JiNan/bg9.png")
        }
      ],
      shareUrl: window.location.href.split("#")[0],
      show:false,
      showUp:true
    };
  },
  created(){
    this.$axios.fetchPost('/getUserRegSource',{},this.$cookie.get('token')).then(res=>{
      console.log(res);
      this.$cookie.set('regSource',res.data);
    })

    let self = this;
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
      wx.ready(function() {
        let link =
          "https://fj.shangaofangjin.com/#/productDetail/guangZhou?inventNum=" +
          self.$cookie.get("inventNum")+'&regSource='+self.$cookie.get('regSource');
        // 分享到朋友圈
        wx.onMenuShareTimeline({
          title: "山高宅业贷，房子变资金，做大您的生意", // 分享标题
          desc:
            "宅业贷，轻松贷！先息后本，月息低至1%，快至1天放款，最高抵押7成",
          link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接
          imgUrl: "https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png", // 分享图标
          success: function() {
            this.$toast({
              message: "分享成功"
            });
          }
        });
        //分享给好友
        wx.onMenuShareAppMessage({
          title: "山高宅业贷，房子变资金，做大您的生意", // 分享标题
          desc:
            "宅业贷，轻松贷！先息后本，月息低至1%，快至1天放款，最高抵押7成", // 分享描述
          link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png", // 分享图标
          success(data) {
            this.$toast({
              message: "分享成功"
            });
          }
        });
      });
    });
  },
  methods: {
    subOrder() {
      if(!this.$cookie.get('token')){
        this.$toast('请先登录');
        this.$router.push({name:'loginRegister',query:{inventNum:this.$router.history.current.query.inventNum,regSource:this.$router.history.current.query.regSource}});
        return;
      }
      if(this.$cookie.get("isAuth") === null){
        this.$toast('请先登录');
        this.$router.push({name:'loginRegister',query:{inventNum:this.$router.history.current.query.inventNum,regSource:this.$router.history.current.query.regSource}});
        return;
      }
      this.$router.push({ name: "subOrderA" });
    },
    share(){
      let ua = navigator.userAgent.toLowerCase();
      let isWeixin = ua.indexOf("micromessenger") != -1;
      if (isWeixin) {
        this.show = true;
      } else {
        this.$toast('请使用微信浏览器进行分享');
      }
    },
    isUp(i){
        if(i === this.imgArr.length-1){
            this.showUp = false;
        }else {
            this.showUp = true;
        }
    }
  }
};
</script>
<style lang="less">
#industry {
  height: 100%;
  .van-swipe {
    height: 100%;
    .van-swipe__indicators {
      left: 720px;
      .van-swipe__indicator {
        width: 16px;
        height: 16px;
        background-color: #ccc;
        &.van-swipe__indicator--active {
          background-color: #ff8554;
        }
      }
    }
    .position {
      position: relative;
      height: 100%;
      .absolute {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%);
        width: 464px;
        height: 137px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  .share {
    position: absolute;
    right: 15px;
    bottom: 150px;
    width: 125px;
    height: 125px;
    img {
      width: 100%;
    }
  }
  .up {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: 42px;
    height: 36px;
    img {
      width: 100%;
    }
  }
}
img {
  width: 100%;
}
.shareBG {
  background-color: transparent;
  top: 35%;
  img {
    width: 500px;
  }
}
</style>