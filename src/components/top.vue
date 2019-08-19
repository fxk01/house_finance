<template>
  <van-nav-bar
    :title="this.title"
    :left-arrow="!$route.meta.showFooter"
    :fixed="this.fixed"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    class="hed-top"
  />
</template>

<script>
  export default {
    props: ['title'],
    name: 'top',
    data() {
      return {
        fixed: true
      };
    },
    methods: {
      onClickLeft() {
        if(this.$route.meta.backHome){
          this.$router.push({name:'homePage'});
          return;
        }
        // if(this.$router.history.current.meta.isFrom){
        //   this.$router.push({name:'subOrderA'});
        //   return;
        // }
        this.$router.back();
      },
      onClickRight() {
        console.log(1)
      }
    }
  }
</script>

<style lang="less">
  .van-nav-bar {
    height: 95px;
    line-height: 95px;
    background-color: #f6f6f7;
    z-index: 998 !important;
  }
  .van-nav-bar__title {
    color: #000000;
    font-size: 30px;
    font-weight: 500;
  }
  .van-nav-bar .van-icon {
    color: #000;
  }
  .van-nav-bar__arrow {
    min-width: 1em;
    font-size: 50px;
  }
  .van-nav-bar__right {
    right: 25px;
    display: none;
  }
  .van-nav-bar__text {
    color: #ffffff;
    font-size: 30px;
  }
  .van-hairline--bottom::after {
    border: none;
  }
</style>
