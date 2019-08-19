<template>
  <div id="loading">
    <img
      src="../../../../assets/img/loading.png"
      alt=""
    >
    <p>您申请的房产评估将会在10分钟内反馈结果，<br>稍后将会有短信通知您，请注意查收。</p>
    <van-button
      type="default"
      class="back"
      @click="goHome"
    >返回首页</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" src="./loading.less">
</style>