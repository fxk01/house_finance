<template>
  <div class="partner">
    <header>
      <div class="flex flex-align-end flex-justify-between partner-hed">
        <p>
          已邀请合伙人&nbsp;&nbsp;&nbsp;<span>{{myPartnerCount}}</span>&nbsp;&nbsp;人
        </p>
        <!--<p>-->
          <!--排行第&nbsp;&nbsp;&nbsp;78&nbsp;&nbsp;位-->
        <!--</p>-->
      </div>
      <div class="flex flex-align-center flex-justify-between">
        <p>
          立即邀请合伙人共同赚取佣金
        </p>
        <p>
          <van-button @click="sendInvite" type="default" class="btn-money" >
            <img src="../../../assets/partner/mingpian.png" class="vertical-align-middle ming-pian">
            <i class="vertical-align-middle">发送我的邀请</i>
          </van-button>
        </p>
      </div>
    </header>

    <main>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <div slot="title">
            <img src="../../../assets/achievement/mingxi.png" class="ming-xi">
            <span class="achievement-detailed">我的合伙人列表</span>
          </div>
          <div class="flex flex-justify-start achievement-item">
            <p class="flex-1">合伙人账号</p>
            <p class="flex-1">注册日期</p>
            <p class="flex-1">提单笔数</p>
            <p class="flex-1">放款笔数</p>
          </div>

          <scroller
            :on-refresh="refresh"
            :on-infinite="infinite"
            noDataText="没有更多数据"
            ref="partnerScroller"
            class="partner-scroller"
          >
            <ul class="achievement-ul-wrap" v-for="(item, index) in list" :key="index">
              <li class="flex flex-justify-start">
                <p class="flex-1">{{item['user_phone']}}</p>
                <p class="flex-1">{{item['create_time']}}</p>
                <p class="flex-1">{{item['myPartnerOrderCount']}}</p>
                <p class="flex-1">{{item['myPartnerLoanOrderCount']}}</p>
              </li>
            </ul>
          </scroller>
        </van-collapse-item>
      </van-collapse>
    </main>

    <van-popup v-model="show">
      <img src="../../../assets/img/poster/wechat.png" alt="">
    </van-popup>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/22
  */
  import * as partnerApi from './partnerApi';
  import { constants } from 'fs';

  export default {
    name: 'Partner',
    data() {
      return {
        activeNames: ['1'],
        partnerData: {},
        myPartnerCount: 0,
        configData: {},
        list: [],
        page: 0,
        total: true,
        show: false,
        invicode: '',
        imageUrl: '',
        shareUrl: window.location.href.split('#')[0]
      };
    },
    mounted() {
      this.sendCardFuc()
    },
    methods: {
      refresh(done) {
        this.page = 1;
        partnerApi.myPartner({start: 1}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          this.list = res.data['myPartners'];
          done();
        });
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.$refs.partnerScroller.finishInfinite({
            isNoMoreData: true
          });
          return;
        }
        partnerApi.myPartner({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          this.myPartnerCount = res.data['myPartnerCount'];
          res.data['myPartners'].forEach((item) => {
            this.list.push(item);
          });
          done()
        });
      },
      isIos(){
          const u = navigator.userAgent;
          return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
       },
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
                // let link = 'http://lodev.hsfinance.cn/#/user/invitation?inventNum=' + self.invicode + '&regSource=' + self.$cookie.get('regSource');  //测试
                let link = 'https://fj.shangaofangjin.com/#/user/invitation?inventNum=' + self.invicode + '&regSource=' + self.$cookie.get('regSource');  //生产

                //分享朋友圈
                wx.onMenuShareTimeline({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: self.imageUrl, // 分享图标
                  success(data) {
                    this.$toast({
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
                    this.$toast({
                      message: '分享成功',
                    });
                  }
                })
              });
            });
          }
        });
      },
      sendInvite() {
        let nu = navigator.userAgent.toLowerCase();
        let isWechat = nu.indexOf('micromessenger') != -1;
        if(isWechat){
          this.show = true;
        }else {
          this.$toast('请使用微信浏览器进行分享');
        }
      }
    }
  }
</script>

<style lang="less" src="./partner.less"></style>
