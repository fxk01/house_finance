<template>
  <div class="myDialog">
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
    >
      <div class="myDialog-dialog">
        <p>{{message['title']}}</p>
        <p>{{message['title1']}}</p>
      </div>

      <van-button type="default" :block="true" v-on:click="confirmFuc">{{message['butText']}}</van-button>

      <p class="myDialog-dialog-ft" v-on:click="cancelFuc">{{message['butCancel']}}</p>
    </van-dialog>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/28
  */

  export default {
    props: ['message', 'id'],
    name: 'myDialog',
    data() {
      return {
        show: false,
      }
    },
    methods: {
      cancelFuc() {
        this.show = false;
      },
      confirmFuc() {
        this.$emit('showConfirm');
      }
    }
  }
</script>

<style scoped>
  .van-dialog {
    width: 717px;
    height: 367px;
    color: #b18446;
    font-size: 30px;
  }
  .myDialog-dialog {
    width: 590px;
    margin: 70px auto 60px auto;
  }
  .van-button {
    width: 630px;
    height: 70px;
    line-height: 70px;
    background-color: #db0610;
    color: #ffffff;
    margin: 0 auto;
    font-size: 30px;
  }
  .myDialog-dialog-ft {
    color: #424242;
    margin-top: 25px;
    font-size: 20px;
    text-align: center;
  }
</style>
