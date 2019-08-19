<template>
  <div class="bankCard">
    <header>
      <section>
        <div class="flex flex-justify-between flex-align-center">
          <p><img :src="srcImg" class="bank"></p>
          <p class="explain-text">到账银行卡</p>
        </div>
        <!--<p class="cashCard-bank-num" v-html="bankCardData['bank_no_fmt']"></p>-->
        <div class="flex flex-align-center flex-justify-between">
          <p class="cashCard-bank-num" v-if="!bankCardTrue && bankCardDefaultData !== undefined" v-html="bankCardDefaultData['bank_no'].substring(0, 4)"></p>
          <p class="cashCard-bank-num" v-if="bankCardTrue" v-html="bankCardData['bank_no'].substring(0, 4)"></p>
          <p class="cashCard-bank-num">****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****</p>
          <p class="cashCard-bank-num" v-if="!bankCardTrue && bankCardDefaultData !== undefined" v-html="bankCardDefaultData['bank_no'].substr(-4)"></p>
          <p class="cashCard-bank-num" v-if="bankCardTrue" v-html="bankCardData['bank_no'].substr(-4)"></p>
        </div>
      </section>
    </header>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/23
  */
  import * as commissionApi from '../page/User/Commission/commissionApi';

  export default {
    name: 'bankCard',
    props: ['bankCardDefaultData'],
    data() {
      return {
        bankCardTrue: false,
        bankCardData: {
          bank_code: 'DEFAULT',
          bank_no: ''
        }
      }
    },
    computed: {
      srcImg() {
        if(this.bankCardDefaultData === undefined) {
          return require(`../assets/img/cash2/bank-${this.bankCardData['bank_code']}.png`)
        } else {
          return require(`../assets/img/cash2/bank-${this.bankCardDefaultData['bank_code']}.png`)
        }
      }
    },
    beforeCreate() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner"
      });
    },
    mounted() {
      if(this.$router.history.current.name !== 'Commission') {
        commissionApi.myBankCard({}, this.$cookie.get('token')).then(res => {
          if(res.data === undefined) {
            this.bankCardData = {
              bank_code: 'DEFAULT',
              bank_no_fmt: '',
            }
          } else {
            this.bankCardData = res.data;
          }
          this.$toast.clear();
          this.bankCardData['bank_num'] = this.bankCardData['bank_no'].substring(0, 4)
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            + this.bankCardData['bank_no'].substr(-4);
        });
      } else {
        // commissionApi.toWithdrawal({}, this.$cookie.get('token')).then(res => {
        //   this.bankCardData = res.data['defaultBankCard'];
        //   this.$toast.clear();
        //   this.bankCardData['bank_num'] = this.bankCardData['bank_no'].substring(0, 4)
        //     + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        //     + this.bankCardData['bank_no'].substr(-4);
        //   this.$emit('bankCardData', res);
        // });
        commissionApi.toWithdrawal({}, this.$cookie.get('token')).then(res => {
          res.data.myBankCards.forEach(ele => {
            if(ele.account_type === 0){
              this.bankCardData = ele;
            }
          });
          this.$toast.clear();
          this.bankCardData['bank_num'] = this.bankCardData['bank_no'].substring(0, 4)
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            + this.bankCardData['bank_no'].substr(-4);
          this.$emit('bankCardData', res);
        });
      }
      if(this.bankCardDefaultData === undefined) {
        this.bankCardTrue = true;
      }
    }
  }
</script>

<style scoped>
  .bankCard {
    padding-top: 34px;
  }
  header {
    height: 332px;
    background: linear-gradient(227deg,rgba(255,102,102,1),rgba(255,67,64,1));
    box-shadow: 0 6px 27px 0 rgba(216,20,8,0.49);
    border-radius: 15px;
    padding: 45px 39px 45px 0;
  }
  .explain-text {
    font-size: 24px;
    font-family:PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
  }
  .bank {
    height: 79px;
    width: auto;
  }
  .cashCard-bank-num {
    font-size: 44px;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    padding-left: 39px;
    margin-top: 70px;
  }
</style>
