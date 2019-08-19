<template>
  <div class="register-success">
    <div class="bgImg">
      <img class="images" src="../../../assets/img/sucBG.png" alt="">
    </div>
    <!-- <div class="message">
      <div class="item">
        <div class="images">
          <img src="../../../assets/img/money.png" alt="">
        </div>
        <div class="text">
          <p class="t-top">简单工作，轻松赚钱</p>
          <p class="t-bottom">不上班、不打卡、不考核</p>
        </div>
      </div>
      <div class="item">
        <div class="images">
          <img src="../../../assets/img/tuig.png" alt="">
        </div>
        <div class="text">
          <p class="t-top">零成本，高佣金</p>
          <p class="t-bottom">最高3%放款佣金</p>
        </div>
      </div>
    </div>
    <div class="flow">
      <div class="images">
        <img src="../../../assets/img/photo.png" alt="">
      </div>
      <div class="text">
        <p class="big">完成实名认证就能赚取佣金啦</p>
        <p class="small">实名认证 > 推荐客户 > 赚取佣金</p>
      </div>
    </div>
    <div class="link">
      <van-button class="smrz" size="large" @click="goBank">实名认证</van-button>
      <router-link to="/">我再逛逛</router-link>
    </div> -->
    <div class="info">
      <div class="item">
        <img src="../../../assets/img/cup.png" alt="">
        <span>国企背景</span>
      </div>
      <div class="item">
        <img src="../../../assets/img/rocket.png" alt="">
        <span>急速评估</span>
      </div>
      <div class="item">
        <img src="../../../assets/img/light.png" alt="">
        <span>闪电返佣</span>
      </div>
    </div>
    <div class="qrCode">
      <img src="../../../assets/img/QRcode.png" alt="">
      <p>长按关注公众号，开启赚钱之旅</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  created(){
    this.$store.commit('changeStatus',3);
  },
  methods:{
    goBank(){
      this.$router.push("/user/cash/certification?opType=1");
    }
  }
}
</script>

<style lang="less" src="./registerSuccess.less"></style>
