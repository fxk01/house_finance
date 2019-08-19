<template>
  <div class="cashDetail">
    <ul>
      <li class="flex flex-align-center flex-justify-between">
        <p>提现金额</p>
        <p>{{data['withdraw_amount']}}元</p>
      </li>
      <li class="flex flex-align-center flex-justify-between">
        <p>综合手续费</p>
        <p>{{data['withdraw_fee']}}元</p>
      </li>
      <li class="flex flex-align-center flex-justify-between">
        <p>到账金额</p>
        <p>{{data['real_withdraw_amount']}}元</p>
      </li>
      <li class="flex flex-align-center flex-justify-between">
        <p>提现状态</p>
        <p class="cash-middle" v-if="data['withdraw_req_status'] === 0">提现申请</p>
        <p class="cash-middle" v-else-if="data['withdraw_req_status'] === 1 || data['withdraw_req_status'] === 2">提现申请</p>
        <p class="cash-middle cash-color2" v-else-if="data['withdraw_req_status'] === 3">成功</p>
        <p class="cash-middle cash-color3" v-else="data['withdraw_req_status'] === -1 || data['withdraw_req_status'] === -2">失败</p>
      </li>
      <li class="flex flex-align-center flex-justify-between" v-if="data['withdraw_req_status'] === -1 || data['withdraw_req_status'] === -2">
        <p>失败原因</p>
        <p>{{data['comment']}}</p>
      </li>
      <li class="flex flex-align-center flex-justify-between">
        <p>提现时间</p>
        <p>{{data['withdraw_req_date']}}</p>
      </li>
      <li class="flex flex-align-center flex-justify-between">
        <p>提现银行卡</p>
        <p>{{data['card_number'].substring(0, 4)}}********{{data['card_number'].substr(-4)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/5/27
  */

  import * as commissionApi from '../commissionApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'CashDetail',
    data() {
      return {
        data: {
          card_number: '',
        }
      }
    },
    mounted() {
      commissionApi.withdrawalDetail({pid: this.parseURL('pid')}, this.$cookie.get('token')).then(res => {
        this.data = res.data;
      });
    }
  }
</script>

<style lang="less" src="./cashDetail.less"></style>
