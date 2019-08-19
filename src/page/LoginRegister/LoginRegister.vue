<template>
  <div id="loginRegister">
    <div v-if="this.$store.state.login.status!==3" class="bgImg">
      <img class="images" src="../../assets/img/loginBG.jpg" alt="">
    </div>
    <div v-if="this.$store.state.login.status!==3" class="menu">
      <span :class="{active:this.$store.state.login.status===1}">
        <router-link :to="{name:'login',query:{inventNum:this.inventNum,regSource:this.regSource}}">登录</router-link>
      </span>
      <span :class="{active:this.$store.state.login.status===2}">
        <router-link :to="{name:'register',query:{inventNum:this.inventNum,regSource:this.regSource}}">注册</router-link>
      </span>
    </div>
    <router-view v-transition></router-view>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        regSource:'',
        inventNum:'',
      }
    },
    created(){
      let param = this.$router.history.current.query.inventNum;
      if(!param) return;
      if(param.indexOf('ACTIVITY') !== -1){
        this.inventNum = param.split('-')[0];
        this.regSource = param.split('-')[1];
      }else {
        this.inventNum = param;
        this.regSource = this.$router.history.current.query.regSource;
      }
    }
  }
</script>

<style lang="less" src="./loginRegister.less"></style>
