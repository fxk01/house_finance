<template>
  <div class="commissionDetail">
    <header class="flex flex-align-center flex-justify-center">
      <p>借款人</p>
      <p>享佣人</p>
      <p>放款金额(万)</p>
      <p>放款时间</p>
      <p>佣金(万)</p>
    </header>

    <div ref="mescroll" class="mescroll" v-bind:style="{height: commissionDetailHg}">
      <div ref="scrollWrap" id="scrollWrap">
        <ul class="flex flex-align-center flex-justify-center main-ul-warp" v-for="(obj, index) in newArr" :key="index">
          <li class="wd-116">{{obj['borrower_name']}}</li>
          <li class="wd-141">{{obj['award_user_name']}}</li>
          <li class="wd-176">{{obj['actual_loan_amount'] / 10000}}</li>
          <li class="wd-188">{{obj.loan_date}}</li>
          <li class="wd-99">{{obj['commission_amount'] / 10000}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/18
  */

  import * as achievementApi from '../achievementApi';
  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'CommissionDetail',
    data() {
      return {
        // v-bind:style="{top: this.isPc() ? pcTop : moveTop}"
        // pcTop: '2.64rem',
        // moveTop: '1.37333rem',
        commissionDetailHg: 'auto',
        page: 0,
        total: true,
        mescroll: null,
        isReferrerUser: '',
        newArr: []
      }
    },
    mounted() {
      this.commissionDetailHg = this.isPc('commissionDetail');

      this.mescroll = new MeScroll(this.$refs.mescroll, {
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

      this.isReferrerUser = this.parseURL('isReferrerUser');
      
      if(this.isReferrerUser === null) {
        this.isReferrerUser = ''
      }
    },
    methods: {
      /*
       下拉刷新
       */
      downCallback() {
        achievementApi.myCommissionNew({start: 1, isReferrerUser: this.isReferrerUser}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.newArr = res.data['orderCommissions'];
          this.$nextTick(() => {
            if(this.newArr.length >= this.total) {
              this.mescroll.endUpScroll(true);
              this.mescroll.endSuccess();
            } else {
              this.mescroll.endSuccess(res.data['orderCommissions'].length, true);
            }
            if(this.$refs.scrollWrap.offsetHeight < 568) {
              this.mescroll.triggerUpScroll();
            }
          })
        });
      },
      /*
       上拉加载
       */
      upCallback() {
        achievementApi.myCommissionNew({start: ++this.page, isReferrerUser: this.isReferrerUser}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orderCommissions'].forEach((item) => {
            this.newArr.push(item);
          });
          this.$nextTick(() => {
            this.mescroll.endSuccess();
            if(this.$refs.scrollWrap.offsetHeight < 568) {
              if(this.newArr.length < this.total) {
                this.mescroll.triggerUpScroll();
              }
            }
            if(this.newArr.length >= this.total) {
              this.mescroll.endUpScroll(true)
            } else {
              this.mescroll.endUpScroll(false)
            }
          })
        });
      }
    }
  }
</script>

<style lang="less" src="./commissionDetail.less"></style>
