<template>
  <div class="achievement">
    <header>
      <ul class="flex flex-align-center flex-justify-center">
        <li class="text-ag-center">
          <!--<img src="../../../assets/achievement/sm.png" class="icon-sm" v-on:click="$toast('当前只统计两级数据')">-->
          <router-link to="/user/achievement/detail">
            <p>下级人数</p>
            <strong>{{data['totalCount']}}</strong>
          </router-link>
        </li>

        <li class="text-ag-center">
          <img src="../../../assets/achievement/sm.png" class="icon-sm" v-on:click.prevent="showBillDetail2 = true">
          <!--<router-link to="/user/bill?source=achievement">-->
            <!--<p>提单总数</p>-->
            <!--<strong>{{data['totalOrderCount']}}</strong>-->
          <!--</router-link>-->
          <router-link to="/user/mb?source=achievement">
            <p>提单总数</p>
            <strong>{{data['totalOrderCount']}}</strong>
          </router-link>
        </li>

        <li class="text-ag-center">
          <router-link to="/user/achievement/commission">
            <p>放款总额(万)</p>
            <strong>{{data['totalActualLoanAmount'] / 10000}}</strong>
          </router-link>
        </li>

        <li class="text-ag-center">
          <img src="../../../assets/achievement/sm.png" class="icon-sm icon-sm-left" v-on:click.prevent="showBillDetail4 = true">
          <router-link to="/user/achievement/commission">
            <p>佣金总额(万)</p>
            <strong>{{data['totalCommissionAmount'] / 10000}}</strong>
          </router-link>
        </li>
      </ul>

      <div class="flex flex-justify-between nav-but-wrap" v-show="isChannel">
        <van-button type="default" class="nav-but" @click="sendInvite">邀请</van-button>
        <router-link to="/user/commission">
          <van-button type="default" class="nav-but">提现</van-button>
        </router-link>
      </div>
    </header>

    <ul class="leader-wrap" v-show="data['mySuperior'] || data['myHc']">
      <li class="flex flex-align-center" v-if="data['mySuperior']">
        <img src="../../../assets/achievement/user.png" class="user-icon">
        <p class="width-35">我的上级</p>
        <p class="color-9a672b width-32">{{data['mySuperior']}}</p>
        <a :href="'tel:'+userData.mySuperior.service_number" @click="callPhone(userData.mySuperior.user_phone)" class="telephone-but">
          <img src="../../../assets/achievement/phone.png" class="phone-icon">
          <span>电话联系</span>
        </a>
      </li>

      <li class="flex flex-align-center" v-if="data['myHc']">
        <img src="../../../assets/achievement/user.png" class="user-icon">
        <p class="width-35">我的房金经理</p>
        <p class="color-9a672b width-32">{{data['myHc']}}</p>
        <a :href="'tel:'+userData.myManager.service_number" @click="callPhone(userData.myManager.user_phone)" class="telephone-but">
          <img src="../../../assets/achievement/phone.png" class="phone-icon">
          <span>电话联系</span>
        </a>
      </li>
    </ul>

    <div ref="achievementMescroll" class="mescroll" v-bind:style="{height: achievementHg}">
      <div ref="achievementScroll" id="scrollWrap">
        <performanceList
          @showIconDescription="showIconDescription"
          v-bind:partnerArr="arr"
        />
      </div>
    </div>

    <van-popup v-model="showWeChat">
      <img src="../../../assets/img/poster/wechat.png" alt="">
    </van-popup>

    <van-popup v-model="showBillDetail1" :class="[classTop, 'show-Modal-left1']" :close-on-click-overlay="false">
      <div class="icon-yq">
        <div class="icon-yq-bg">
          <p>下级人数</p>
          <strong>{{data['totalCount']}}</strong>
        </div>
      </div>
      <!--<img src="../../../assets/achievement/zz-yq.png" alt="">-->
      <img src="../../../assets/achievement/zz-jt.png" alt="" class="icon-jt">
      <p class="show-text-left1">点击这里可以查看发展的下级</p>
      <img src="../../../assets/achievement/icon-btn.png" alt="" class="icon-bt" v-on:click.prevent="showBillDetailFun('a')">
      <!--<img src="../../../assets/achievement/zz-bt.png" alt="" class="icon-bt" v-on:click="showBillDetailFun">-->
    </van-popup>

    <van-popup v-model="showBillDetail2" :class="classTop" :close-on-click-overlay="false">
      <div class="icon-yq">
        <div class="icon-yq-bg">
          <p>提单总数</p>
          <strong>{{data['totalOrderCount']}}</strong>
        </div>
      </div>
      <!--<img src="../../../assets/achievement/zz-yq.png" alt="">-->
      <img src="../../../assets/achievement/zz-jt.png" alt="" class="icon-jt">
      <p class="">点击这里可以查看下级提单详情</p>
      <img src="../../../assets/achievement/icon-btn.png" alt="" class="icon-bt" v-on:click.prevent="showBillDetailFun('b')" v-if="this.read === 0">
      <img src="../../../assets/achievement/zz-bt.png" alt="" class="icon-bt" v-on:click.prevent="showBillDetail2 = false" v-if="this.read === 1">
    </van-popup>

    <van-popup v-model="showBillDetail3" :class="[classTop, 'show-Modal-left3']" :close-on-click-overlay="false">
      <div class="icon-yq icon-yq2">
        <div class="icon-yq-bg icon-yq-bg2">
          <p>放款总额(万)</p>
          <strong>{{data['totalActualLoanAmount'] / 10000}}</strong>
        </div>
      </div>
      <!--<img src="../../../assets/achievement/zz-yq.png" alt="">-->
      <img src="../../../assets/achievement/zz-jt.png" alt="" class="icon-jt icon-jt2">
      <p class="show-text-left3">点击这里可以查看自己和下级的放款总额</p>
      <img src="../../../assets/achievement/icon-btn.png" alt="" class="icon-bt icon-bt-left3" v-on:click.prevent="showBillDetailFun('c')">
      <!--<img src="../../../assets/achievement/zz-bt.png" alt="" class="icon-bt icon-bt-left3" v-on:click="showBillDetailFun">-->
    </van-popup>

    <van-popup v-model="showBillDetail4" :class="[classTop, 'show-Modal-left4']" :close-on-click-overlay="false">
      <div class="icon-yq icon-yq2">
        <div class="icon-yq-bg icon-yq-bg2">
          <p>佣金总额(万)</p>
          <strong>{{data['totalCommissionAmount'] / 10000}}</strong>
        </div>
      </div>
      <!--<img src="../../../assets/achievement/zz-yq.png" alt="">-->
      <img src="../../../assets/achievement/zz-jt2.png" alt="" class="icon-jt icon-jt4">
      <p class="show-text-left4">点击这里可以查看自己和下级的佣金总额</p>
      <!--<img src="../../../assets/achievement/icon-btn.png" alt="" class="icon-bt icon-bt-left4" v-on:click="showBillDetailFun">-->
      <img src="../../../assets/achievement/zz-bt.png" alt="" class="icon-bt icon-bt-left4" v-on:click.prevent="showBillDetailFun('d')">
    </van-popup>

    <van-dialog
      v-model="show"
      title="图标说明"
      :show-confirm-button="false"
      :show-cancel-button="false"
      block
    >
      <ul class="dialog-ul">
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_fang2.png" class="commission-icon2"> -->
          <i class="commission-icon2">理</i>
          <p>房金经理</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_zhi2.png" class="commission-icon2"> -->
          <i class="commission-icon2">直</i>
          <p>直营经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">员</i>
          <p>公司员工</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">顾</i>
          <p>房金顾问</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">纪</i>
          <p>房金经纪人</p>
        </li>
        <!-- <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_one2.jpg" class="commission-icon2">
          <p>一级经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_two2.jpg" class="commission-icon2">
          <p>二级经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <img src="../../../assets/achievement/icon_three.png" class="commission-icon2">
          <p>三级经纪人</p>
        </li> -->
      </ul>
      <van-button type="default" class="icon-but" v-on:click="showIconDescription">知道了</van-button>
    </van-dialog>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/22
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as achievementApi from './achievementApi';
  import performanceList from '../../../components/performanceList';
  import * as partnerApi from '../Partner/partnerApi';
  import { mixin } from '../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Achievement',
    components: {
      performanceList,
    },
    data() {
      return {
        // v-bind:style="{top: this.isPc() ? pcTop : moveTop}"
        // pcTop: '8.32rem',
        // moveTop: '7.05333rem',
        show: false,
        userData:{},
        isChannel:'',
        callerPhone:'',
        read: 0,
        showWeChat: false,
        showBillDetail1: false,
        showBillDetail2: false,
        showBillDetail3: false,
        showBillDetail4: false,
        achievementHg: 'auto',
        data: {
          myHc: '',
          myHcMobile: '',
          mySuperior: '',
          mySuperiorMobile: '',
          totalActualLoanAmount: '',
          totalCommissionAmount: '',
          totalCount: '',
          totalOrderCount: '',
        },
        classTop: {
          'bill-detail-modal': true,
          'bill-detail-Wechat': this.sendInvite2(),
        },
        arr: [],
        page: 0,
        total: true,
        invicode: '',
        imageUrl: 'https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png',
        shareUrl: window.location.href.split('#')[0]
      };
    },
    created(){
      this.$axios.fetchPost('/getUserInfo',{},this.$cookie.get('token')).then(res=>{
        res.data.isChannel === 0 ? this.isChannel = true : this.isChannel = false;
        this.callerPhone = res.data.userPhone;
        this.userData = res.data;
      });
    },
    mounted() {
      this.sendCardFuc();
      
      this.achievementMescroll = new MeScroll(this.$refs.achievementMescroll, {
        down: {
          auto: false,
          callback: this.downCallback,
        },
        up: {
          auto: true,
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">— 已经到底部了 —</p>',
          loadFull: {
            use: false,
            delay: 500
          }
        },
      });

      achievementApi.myAchievementNew({}, this.$cookie.get('token')).then(res => {
        if(res.data['achievementTipRead'] === 0) {
          this.read = 0;
          this.showBillDetail1 = true;
        } else {
          this.read = 1;
        }
        Object.assign(this.data, res.data);
      });
    },
    updated() {
      this.$nextTick(() => {
        this.achievementHg = this.isPc('achievement');
      })
    },
    methods: {
      showIconDescription() {
        this.show = !this.show;
      },
      callPhone(mobile){
        this.$axios.fetchPost('/toCallPhone',{callerPhone:this.callerPhone,calledPhone:mobile},this.$cookie.get("token")).then(res=>{
          console.log(res);
        })
      },
      downCallback() {
        achievementApi.myPartnerNew({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['myPartners'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.achievementMescroll.endUpScroll(true);
              this.achievementMescroll.endSuccess();
            } else {
              this.achievementMescroll.endSuccess(res.data['myPartners'].length, true);
            }
            if(this.$refs.achievementScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.achievementMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        achievementApi.myPartnerNew({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['myPartners'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.achievementMescroll.endSuccess();
            if(this.$refs.achievementScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.achievementMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.achievementMescroll.endUpScroll(true)
            } else {
              this.achievementMescroll.endUpScroll(false)
            }
          })
        });
      },

      sendInvite() {
        let nu = navigator.userAgent.toLowerCase();
        let isWechat = nu.indexOf('micromessenger') != -1;
        if(isWechat) {
          this.showWeChat = true;
        } else {
          this.$toast('请使用微信浏览器进行分享');
        }
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
                let link = self.$store.state.shareURL+'user/invitation?inventNum=' + self.invicode + '&regSource=' + self.$cookie.get('regSource');  //生产

                //分享朋友圈
                wx.onMenuShareTimeline({
                  title: '山高房金，经纪人轻松年赚百万的大平台', // 分享标题
                  desc: '成为山高房金合伙人，推荐好友贷款成功即可获得约1-5万元的佣金哦~', // 分享描述
                  link: link.split('#')[0]+'?#'+link.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: 'https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png', // 分享图标
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
                  imgUrl: 'https://fj.shangaofangjin.com/fgold-api/assets/images/icon2.png', // 分享图标
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

      showBillDetailFun(str) {
        let self = this;
        let strategies = {
          a() {
            self.showBillDetail1 = false;
            self.showBillDetail2 = true;
          },
          b() {
            self.showBillDetail2 = false;
            self.showBillDetail3 = true;
          },
          c() {
            self.showBillDetail3 = false;
            self.showBillDetail4 = true;
          },
          d() {
            if(self.read === 1) {
              self.showBillDetail4 = false;
              return;
            } else {
              achievementApi.achievementTipRead({}, self.$cookie.get('token')).then(res => {
                if(res.msg === 'success') {
                  self.read = 1;
                  self.showBillDetail4 = false;
                }
              });
            }
          }
        };
        let calculate = function(level) {
          return strategies[level]();
        };
        calculate(str);
      },

      sendInvite2() {
        let nu = navigator.userAgent.toLowerCase();
        let isWechat = nu.indexOf('micromessenger') != -1;
        if(isWechat) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>

<style lang="less" src="./achievement.less"></style>
