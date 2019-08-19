<template>
  <div class="withdrawalCard">
    <div v-if="this.$cookie.get('isAuth') === 'true'">
      <BankCard />

      <main>
        <!--<van-button size="normal" :block="true">解 绑 卡</van-button>-->
        <router-link to="/user/cash/certification?opType=2" class="ds-block">
          <van-button size="normal" :block="true">换 绑 卡</van-button>
        </router-link>
      </main>
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
  import BankCard from '../../../../components/bankCard';

  export default {
    name: 'WithdrawalCard',
    components: {
      BankCard,
    },
  }
</script>

<style lang="less" src="./withdrawalCard.less"></style>
