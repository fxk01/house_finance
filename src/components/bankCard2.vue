<template>
  <header>
    <section>
      <div class="flex flex-justify-between flex-align-center">
        <p><img :src="srcImg" class="bank"></p>
        <p>到账银行卡</p>
      </div>
      <p class="text-ag-center cashCard-bank-num" v-html="bankCardData['bank_no_fmt']"></p>
    </section>
  </header>
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
    data() {
      return {
        bankCardData: {
          bank_code: 'DEFAULT'
        },
      }
    },
    computed: {
      srcImg() {
        return require(`../assets/img/cash/bank-${this.bankCardData['bank_code']}.png`)
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
        // this.bankCardData['bank_num'] = this.bankCardData['bank_no'].substring(0, 4) + '&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;' + this.bankCardData['bank_no'].substr(15)
      });
    }
  }
</script>

<style scoped>
  header {
    height: 270px;
    background-color: #f9f6f2;
    padding: 33px 45px;
    margin-bottom: 68px;
    border-bottom: 1px solid #cecece;
  }
  header section {
    height: 200px;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 30px 38px;
    color: #8b6f4e;
  }
  .bank {
    width: 240px;
    height: 79px;
  }
  .cashCard-bank-num {
    margin-top: 28px;
    font-size: 30px;
    font-weight: bold;
  }
</style>
