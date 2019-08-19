<template>
  <div class="result">
    <div class="box-bg">
      <p class="item-text1">已邀请合伙人</p>
      <p class="item-text2">{{myPartnerCount}}</p>
    </div>

    <div class="flex flex-align-center flex-justify-between box-list">
      <p>合伙人账号</p>
      <p>注册日期</p>
      <p>提单总数</p>
      <p>放款总额(万)</p>
    </div>

    <div ref="resultMescroll" class="mescroll" v-bind:style="{height: resultHg}">
      <div ref="resultScroll" id="scrollWrap">
        <ul class="flex flex-align-center flex-justify-start box-item" v-for="(item, index) in arr" :key="index">
          <li>{{item['user_phone']}}</li>
          <li>{{item['create_time']}}</li>
          <li>{{item['myPartnerOrderCount']}}</li>
          <li>{{item['myPartnerLoanOrderCount'] / 10000}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/5/20
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as partnerApi from '../partnerApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Result',
    data() {
      return {
        page: 0,
        total: true,
        arr: [],
        resultHg: 'auto',
        myPartnerCount: 0,
      }
    },

    mounted() {
      this.resultMescroll = new MeScroll(this.$refs.resultMescroll, {
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

      this.resultHg = (window.screen.height -
        document.getElementsByClassName('hed-top')[0].offsetHeight -
        document.getElementsByClassName('box-bg')[0].offsetHeight - document.getElementsByClassName('box-list')[0].offsetHeight) + 'px';
      console.log( this.resultHg)
    },

    methods: {
      downCallback() {
        partnerApi.myPartner({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.myPartnerCount = res.data['myPartnerCount'];
          this.arr = res.data['myPartners'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.resultMescroll.endUpScroll(true);
              this.resultMescroll.endSuccess();
            } else {
              this.resultMescroll.endSuccess(res.data['myPartners'].length, true);
            }
            if(this.$refs.resultScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.resultMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        partnerApi.myPartner({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.myPartnerCount = res.data['myPartnerCount'];
          this.total = res.data['total'];
          res.data['myPartners'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.resultMescroll.endSuccess();
            if(this.$refs.resultScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.resultMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.resultMescroll.endUpScroll(true)
            } else {
              this.resultMescroll.endUpScroll(false)
            }
          })
        });
      },
    }
  }
</script>

<style lang="less" src="./result.less"></style>
