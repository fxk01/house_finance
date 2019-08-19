<template>
  <div class="accountSetIng">
    <van-collapse v-model="activeNames">
      <router-link to="/user/account/mobile">
        <van-collapse-item
          title="修改手机号"
          :icon="phone"
          disabled
        />
      </router-link>
      <router-link to="/user/account/city">
        <van-collapse-item
          title="修改城市"
          :icon="city"
          disabled
        />
      </router-link>
    </van-collapse>

    <div class="text-ag-center btn-wrap">
      <van-button type="default" v-on:click="outUserFuc">退出账户</van-button>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/20
  */

  export default {
    name: 'AccountSetIng',
    data() {
      return {
        phone: require( '../../../../assets/img/userPage/mobile.png'),
        city: require('../../../../assets/img/userPage/city.png'),
        activeNames: ['1']
      };
    },
    methods: {
      outUserFuc() {
        this.$cookie.delete('token');
        this.$cookie.delete('uid');
        this.$cookie.delete('isAuth');
        this.$cookie.delete('ewm_path');
        this.$cookie.delete('userPhone');
        this.$cookie.delete('inventNum');
        this.$cookie.delete('openID');
        this.$cookie.delete('city');
        this.$cookie.delete('cityCode');
        this.$cookie.delete('isSelectCity');
        this.$cookie.delete('regSource');
        this.$router.push({name:'homePage'});
        this.$store.commit('changeTbcAmount',0);
      }
    }
  }
</script>

<style lang="less" src="./accountSetIng.less"></style>
