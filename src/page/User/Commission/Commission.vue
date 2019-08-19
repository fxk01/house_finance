<template>
  <div class="commission">
    <div v-if="this.$cookie.get('isAuth') === 'true'">
      <BankCard />

      <main>
        <div class="order-title">
        <span>
          提现金额
        </span>
        </div>

        <div class="commission-wrap">
          <label>￥</label>
          <input
            type="text"
            v-model="queryValue"
            onkeyup="if(isNaN(value))execCommand('undo')"
            onafterpaste="if(isNaN(value))execCommand('undo')"
            v-on:input="inputFuc"
            placeholder="请输入金额"
          />
          <span>元</span>
        </div>

        <div class="flex flex-justify-between flex-align-center commission-money margin-bottom-35">
          <p>可提现金额&nbsp;&nbsp;￥{{toWithdrawalData['available']}}</p>
          <p class="commission-all" v-on:click="allWithdrawalSubmit">全部提现</p>
        </div>

        <div class="flex flex-justify-between flex-align-center commission-money">
          <p>提现手续费&nbsp;&nbsp;￥{{poundage}}</p>
        </div>

        <div class="flex flex-justify-between flex-align-center commission-money">
          <p>提现到账金额&nbsp;&nbsp;￥{{arrivalAmount}}</p>
        </div>

        <div class="text-ag-center">
          <van-button type="default" v-on:click="submitFucMoney">提&nbsp;&nbsp;&nbsp;&nbsp;现</van-button>
        </div>
      </main>

      <p class="flex flex-justify-center commission-bottom">温馨提示：1～3个工作日提现到账</p>
    </div>

    <section v-if="this.$cookie.get('isAuth') !== 'true'">
      <p class="withdrawalCard-unbound">您还未绑定提现银行卡</p>
      <router-link to="/user/cash/certification?opType=1" class="ds-block">
        <van-button size="normal" :block="true">去 绑 卡</van-button>
      </router-link>
    </section>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/21
  */
  import * as commissionApi from './commissionApi';
  import BankCard from '../../../components/bankCard';
  import { mixin } from '../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Commission',
    data() {
      return {
        poundage: '',
        queryValue: '',
        arrivalAmount: '',
        toWithdrawalData: {},
        monetary: '元',
        runningLow: true,
      }
    },
    components: {
      BankCard
    },
    created() {
      this.$watch('queryValue', this.deBounce((newQuery) => {
        this.runningLow = false;
        if(this.queryValue > this.toWithdrawalData['available']) {
          this.runningLow = false;
          this.allWithdrawal();
          return true;
        } else {
          if(this.queryValue < 200000) {
            this.poundage = 2
          } else {
            this.poundage = Math.round(this.queryValue / 20) * 2;
          }
          if(this.queryValue === '') {
            this.poundage = '';
            this.arrivalAmount = '';
          } else {
            let amountSum = this.queryValue - this.poundage;
            this.arrivalAmount = amountSum < 0 ? '' : amountSum;
          }
          this.runningLow = true;
        }
      }, 1500))
    },
    mounted() {
      commissionApi.toWithdrawal({}, this.$cookie.get('token')).then(res => {
        this.toWithdrawalData = res.data;
        this.toWithdrawalData.available = res.data['available']
      });
    },
    methods: {
      inputFuc() {
        this.runningLow = false;
      },
      allWithdrawalSubmit() {
        this.queryValue = this.toWithdrawalData['available'];
      },
      allWithdrawal() {
        this.$dialog.alert({
          message: '可提现余额不足！'
        }).then(() => {
          this.queryValue = '';
        });
      },
      submitFucMoney() {
        if(this.queryValue === '') {
          this.$dialog.alert({
            message: '请输入金额！'
          });
          return false;
        }
        if(this.queryValue <= 10) {
          this.$dialog.alert({
            message: '提现金额必须大于10元'
          }).then(() => {
            this.queryValue = '';
            return false;
          });
        } else {
          if(!this.runningLow) {
            return;
          }
          commissionApi.withdrawal({withdrawAmount: this.queryValue}, this.$cookie.get('token')).then(res => {
            if(res.code === '1') {
              this.$toast({
                message: '提现申请成功'
              });
              this.$router.back();
            }
          });
        }
      }
    }
  }
</script>

<style lang="less" src="./commission.less"></style>
