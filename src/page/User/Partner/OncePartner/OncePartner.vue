<template>
  <div class="oncePartner">
    <div class="top-bg">
      <p class="title">成功邀请好友注册成为房金经纪人，好友提单并成功放款，您将获得一笔佣金，在线提取佣金，即可快速到账，以后好友提的单您都可以一直享受佣金，邀请的好友越多，获得的佣金也将越多噢，赶紧邀请小伙伴一起赚钱吧</p>

      <div class="border-center"></div>

      <ul class="flex flex-align-center flex-justify-between indicator-wrap">
        <li>
          <img src="../../../../assets/img/partner/icon-user.png" class="icon-user"/>
        </li>

        <li>
          <img src="../../../../assets/img/partner/icon-tb.png" class="icon-tb"/>
        </li>

        <li>
          <img src="../../../../assets/img/partner/icon-mn.png" class="icon-mn"/>
        </li>
      </ul>

      <ul class="flex flex-align-center flex-justify-between tips-wrap">
        <li>
          邀请好友
        </li>
        <li>
          <p>好友提单</p>
          <p>并成功放款</p>
        </li>
        <li>
          提取佣金
        </li>
      </ul>

      <div class="bottom-btn mt-38" @click="sendInvitePartner">
        立即邀请
      </div>

      <div class="bottom-btn bottom-btn2" v-on:click="resultFuc">
        查看邀请结果
      </div>
    </div>

    <van-popup v-model="showPartner">
      <img src="../../../../assets/img/partner/guide.png" alt=""/>
    </van-popup>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/5/20
  */
  import * as partnerApi from '../partnerApi';

  export default {
    name: 'OncePartner',
    data() {
      return {
        showPartner: false,
        invicode: '',
        imageUrl: '',
        shareUrl: window.location.href.split('#')[0]
      }
    },
    mounted() {
      this.sendCardFuc()
    },
    methods: {
      sendCardFuc() {
        const self = this;
        // if(this.isIos()){
        //   this.shareUrl = window.location.href.split('#')[0];
        //   console.log('iso');
        // }
        partnerApi.shareMyInvitation({}, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            this.invicode = res.data['randomcode'];
            this.imageUrl = res.data['imageUrl'];
            // `https://fj.shangaofangjin.com/#/user/invitation?invicode=${this.invicode}`
            partnerApi.weChatConfig({url: this.shareUrl}, this.$cookie.get('token')).then(res => {
              wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList: [
                  'checkJsApi',
                  'onMenuShareAppMessage',
                  'onMenuShareTimeline'
                ] // 必填，需要使用的JS接口列表
                // jsApiList: ['checkJsApi', 'updateAppMessageShareData', 'updateTimelineShareData']
              });

              wx.ready(function() {
                let link = self.$store.state.shareURL+'user/invitation?inventNum=' + self.invicode + '&regSource=' + self.$cookie.get('regSource');  //测试
                // let link = 'https://fj.shangaofangjin.com/#/user/invitation?inventNum=' + self.invicode + '&regSource=' + self.$cookie.get('regSource');  //生产

                //分享朋友圈
                wx.onMenuShareTimeline({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: self.imageUrl, // 分享图标
                  success(data) {
                    self.$toast({
                      message: '分享成功',
                    });
                  }
                });
                //分享给好友
                wx.onMenuShareAppMessage({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: self.imageUrl, // 分享图标
                  success(data) {
                    self.$toast({
                      message: '分享成功',
                    });
                  }
                })
              });
            });
          }
        });
      },
      sendInvitePartner() {
        let nu = navigator.userAgent.toLowerCase();
        let isWechat = nu.indexOf('micromessenger') != -1;
        if(isWechat) {
          this.showPartner = true;
        } else {
          this.$toast('请使用微信浏览器进行分享');
        }
      },
      resultFuc() {
        this.$router.push('/user/partner/result');
      }
    }
  }
</script>

<style lang="less" src="./oncePartner.less"></style>
