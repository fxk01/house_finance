<template>
  <div class="withdrawalsRecord">
    <div ref="withdrawalsListMescroll" class="mescroll">
      <div ref="withdrawalsScroll" id="scrollWrap">
        <ul>
          <li class="flex flex-align-center flex-justify-start" v-for="(item, index) in arr" :key="index" v-on:click="hrefDetailFuc(item['pid'])">
            <div>
              <img src="../../../../assets/img/cash2/icon-yj.png" class="icon-yj"/>
            </div>

            <div class="flex-1">
              <p class="cash-text">佣金提现</p>
              <p class="cash-time">{{item['withdraw_req_date']}}</p>
            </div>

            <div class="flex-1">
              <p class="cash-money">{{item['withdraw_amount']}}元</p>
              <p class="cash-middle" v-if="item['withdraw_req_status'] === 0">提现申请</p>
              <p class="cash-middle" v-else-if="item['withdraw_req_status'] === 1 || item['withdraw_req_status'] === 2">提现申请</p>
              <p class="cash-middle cash-color2" v-else-if="item['withdraw_req_status'] === 3">成功</p>
              <p class="cash-middle cash-color3" v-else="item['withdraw_req_status'] === -1 || item['withdraw_req_status'] === -2">失败</p>
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
   * @date 2019/5/22
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as commissionApi from '../commissionApi';

  export default {
    name: 'WithdrawalsRecord',
    data() {
      return {
        arr: [],
        page: 0,
        total: true,
      }
    },
    mounted() {
      this.withdrawalsListMescroll = new MeScroll(this.$refs.withdrawalsListMescroll, {
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
        commissionApi.withdrawalList({start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['withdrawList'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.withdrawalsListMescroll.endUpScroll(true);
              this.withdrawalsListMescroll.endSuccess();
            } else {
              this.withdrawalsListMescroll.endSuccess(res.data['withdrawList'].length, true);
            }
            if(this.$refs.withdrawalsScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.withdrawalsListMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        commissionApi.withdrawalList({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['withdrawList'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.withdrawalsListMescroll.endSuccess();
            if(this.$refs.withdrawalsScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.withdrawalsListMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.withdrawalsListMescroll.endUpScroll(true)
            } else {
              this.withdrawalsListMescroll.endUpScroll(false)
            }
          })
        });
      },

      hrefDetailFuc(str) {
        this.$router.push(`/user/commission/record/detail?pid=${str}`)
      }
    }
  }
</script>

<style lang="less" src="./withdrawalsRecord.less"></style>
