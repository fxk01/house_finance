<template>
  <div class="all-item-record">
    <header class="flex flex-align-center">
      <p class="paper-text">{{text}}</p>
      <p class="flex-1 amount-text">
        <span>{{award}}</span>
        <span>元</span>
      </p>
      <div class="flex-1 tr">
        <router-link to="/user/commission">
          <button class="withdrawal-but">提现</button>
        </router-link>
      </div>
    </header>

    <div ref="recordMescroll" class="mescroll" v-bind:style="{height: recordHg}">
      <div ref="recordScroll" id="scrollWrap">
        <ul>
          <li class="flex" v-for="(item, index) in arr" :key="index">
            <div>
              <img src="../assets/img/hb-img.png" class="hb-img" v-if="item['trans_type'] === 1005"/>
              <img src="../assets/img/money-img.png" class="money-img" v-if="item['trans_type'] === 1001"/>
            </div>

            <div class="flex-1 ml33">
              <p class="hb-text" v-if="item['trans_type'] === 1005">红包</p>
              <p class="hb-text" v-if="item['trans_type'] === 1001">佣金</p>
              <p class="hb-time">{{item['trans_date']}}</p>
            </div>

            <p class="flex-1 hb-amount">{{item['trans_amount']}}元</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/6/14
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as accountingApi from '../page/User/AccountingRecord/accountingApi';
  import { mixin } from '../utils/common';

  export default {
    mixins: [mixin],
    name: 'record',
    data() {
      return {
        award: '',
        arr: [],
        page: 0,
        total: true,
        text: '可提现红包',
        recordHg: 'auto'
      }
    },
    mounted() {
      this.recordHg = this.isPc('all-item-record');

      this.recordMescroll = new MeScroll(this.$refs.recordMescroll, {
        down: {
          auto: false,
          callback: this.$route.meta.title === '红包记录' ? this.downCallback : this.downCallback2,
        },
        up: {
          auto: true,
          callback: this.$route.meta.title === '红包记录' ? this.upCallback : this.upCallback2,
          htmlNodata: '<p class="upwarp-nodata">— 已经到底部了 —</p>',
          loadFull: {
            use: false,
            delay: 500
          }
        },
      });

      if(this.$route.name === 'AccountingRecord') {
        this.text = '可提现金额'
      }
    },
    methods: {
      downCallback() {
        accountingApi.redPacket({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['redPacketDetails'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.recordMescroll.endUpScroll(true);
              this.recordMescroll.endSuccess();
            } else {
              this.recordMescroll.endSuccess(res.data['redPacketDetails'].length, true);
            }
            if(this.$refs.recordScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.recordMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        accountingApi.redPacket({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.award = res.data['award'];
          this.total = res.data['total'];
          res.data['redPacketDetails'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.recordMescroll.endSuccess();
            if(this.$refs.recordScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.recordMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.recordMescroll.endUpScroll(true)
            } else {
              this.recordMescroll.endUpScroll(false)
            }
          })
        });
      },

      downCallback2() {
        accountingApi.accountEntry({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['accountDetails'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.recordMescroll.endUpScroll(true);
              this.recordMescroll.endSuccess();
            } else {
              this.recordMescroll.endSuccess(res.data['accountDetails'].length, true);
            }
            if(this.$refs.recordScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.recordMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback2() {
        accountingApi.accountEntry({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.award = res.data['commission'] + res.data['award'];
          this.total = res.data['total'];
          res.data['accountDetails'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.recordMescroll.endSuccess();
            if(this.$refs.recordScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.recordMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.recordMescroll.endUpScroll(true)
            } else {
              this.recordMescroll.endUpScroll(false)
            }
          })
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .all-item-record {
    position: relative;
    line-height: 1;
    height: 100%;
    background-color: #ffffff;
    header {
      padding: 46px 28px 0 34px;
      margin-bottom: 59px;
    }
    .paper-text {
      font-size: 30px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(102,102,102,1);
    }
    .withdrawal-but {
      border: none;
      width: 179px;
      height: 66px;
      line-height: 66px;
      background: linear-gradient(0deg,rgba(255,107,0,1),rgba(255,141,0,1));
      border-radius: 10px;
      font-size: 36px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(255,255,255,1);
    }
    .amount-text {
      padding-left: 40px;
      width: 340px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      /*margin-bottom: 8px;*/
    }
    .amount-text span:first-child {
      font-size: 60px;
      font-family: DinMedium;
      font-weight: normal;
      color: rgba(0,0,0,1);
      vertical-align: sub;
      /*vertical-align: middle;*/
    }
    .amount-text span:last-child {
      font-size: 40px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(0,0,0,1);
      /*vertical-align: text-top;*/
    }
    .hb-img {
      width: 40px;
      height: 48px;
    }
    .money-img {
      width: 41px;
      height: 47px;
    }
    ul li {
      padding-bottom: 38px;
      margin-bottom: 38px;
      border-bottom: 2px solid #cccccc;
    }
    ul li:last-child {
      margin-bottom: 0;
    }
    ul li .hb-text {
      font-size: 28px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51,51,51,1);
      margin-bottom: 24px;
    }
    ul li .hb-time {
      font-size: 24px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153,153,153,1);
    }
    .hb-amount {
      font-size: 28px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(0,0,0,1);
      text-align: right;
    }
    .ml33 {
      margin-left: 33px;
    }
    .mescroll {
      padding: 0 28px 0 34px;
      position: absolute;
      background-color: #fff;
      height: auto;
    }
  }
</style>
