<template>
  <div class="bill-list">
    <div ref="billListMescroll" class="mescroll">
      <div ref="billListScroll" id="scrollWrap">
        <ul class="wrap-ul">
          <li class="wrap-li flex flex-align-center flex-justify-start"
              v-for="(item, index) in arr" :key="index"
              v-on:click="listHrefDetailFuc(item)">
            <div class="box-first">
              <p class="list-money">{{item['loan_amount']}}<span class="list-money-text">&nbsp;万</span></p>
              <p class="list-money-explain">借款金额</p>
            </div>

            <div class="box-last">
              <ul>
                <li>{{item['p_name']}}</li>
                <li>借款期限：{{item['borrowing_period']}}月</li>
                <li>借款人：{{item['borrower_name']}}</li>
                <li>审批进度</li>
                <li class="flex flex-align-center flex-justify-between">
                  <van-progress class="" color="#F53030" :percentage="item['approval_progress_rate']"/>
                  <p class="box-progress">{{item['approval_progress_rate']}}%</p>
                </li>
              </ul>
            </div>
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
   * @date 2019/6/21
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as commissionApi from '../myBillApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'List',
    data() {
      return {
        arr: [],
        page: 0,
        total: true,
      }
    },
    mounted() {
      this.billListMescroll = new MeScroll(this.$refs.billListMescroll, {
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
    },
    methods: {
      downCallback() {
        commissionApi.myOrderList({
          orderStatus: this.parseURL('str'),
          source: this.parseURL('source'),
          start: 1,
        }, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['myOrderList'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.billListMescroll.endUpScroll(true);
              this.billListMescroll.endSuccess();
            } else {
              this.billListMescroll.endSuccess(res.data['myOrderList'].length, true);
            }
            if(this.$refs.billListScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight && this.total > 10) {
              this.billListMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        commissionApi.myOrderList({
          orderStatus: this.parseURL('str'),
          source: this.parseURL('source'),
          start: ++this.page
        }, this.$cookie.get('token')).then(res => {
          this.award = res.data['award'];
          this.total = res.data['total'];
          res.data['myOrderList'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.billListMescroll.endSuccess();
            if(this.$refs.billListScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.billListMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.billListMescroll.endUpScroll(true)
            } else {
              this.billListMescroll.endUpScroll(false)
            }
          })
        });
      },

      listHrefDetailFuc(obj) {
        this.$router.push(`/user/mb/list/detail?pid=${obj['pid']}`);
      }
    }
  }
</script>

<style lang="less" src="./list.less"></style>
