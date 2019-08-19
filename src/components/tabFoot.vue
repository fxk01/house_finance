<template>
  <!--:change="changeActive(active)"-->
  <van-tabbar
    v-model="active"
    active-color="#ff7a00"
  >
    <van-tabbar-item class="home" to="/" :icon="activeOn == 0 ? homePng_o : homePng">
      <!-- <van-icon :name="activeOn == 0 ? homePng_o : homePng" /> -->
      <!-- <span class="vertical-align-middle">首页</span> -->
      首页
    </van-tabbar-item>
    <van-tabbar-item class="exhibits" to="/exhibits" :icon="activeOn == 1 ? acquisitionPng_o : acquisitionPng">
      <!-- <van-icon :name="activeOn == 1 ? acquisitionPng_o : acquisitionPng" /> -->
      <!-- <span class="vertical-align-middle">展业</span> -->
      展业
    </van-tabbar-item>
    <!--<van-tabbar-item to="/drill">-->
      <!--<van-icon name="friends-o" />培训-->
    <!--</van-tabbar-item>-->
    <van-tabbar-item class="my" to="/user" :icon="activeOn == 2 ? userPng_o : userPng">
      <!-- <van-icon :name="active == 2 ? userPng_o : userPng" /> -->
      <!-- <span class="vertical-align-middle">我的</span> -->
      我的
      <i class="amount">
      </i>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    props: ['activeOn'],
    name: 'foot',
    data() {
      return {
        active: this.activeOn,
        homePng: require( '../assets/img/home.png'),
        homePng_o: require( '../assets/img/home_o.png'),
        acquisitionPng: require( '../assets/img/exhibits.png'),
        acquisitionPng_o: require( '../assets/img/exhibits_o.png'),
        userPng: require('../assets/img/user.png'),
        userPng_o: require('../assets/img/user_o.png')
      };
    },
    watch: {
      $route(to) {
        this.active = to.meta.active;
      }
    },
    methods: {
      changeActive(active) {
        this.active = active;
      }
    }
  };
</script>

<style lang="less">
.van-tabbar {
  height: 95px;
  border-top: 1px solid #efeff4;
  z-index: 998 !important;
  background-color: #fff;
  .van-tabbar-item {
    font-size: 20px;
    color: #666;
  }
  .van-tabbar-item__icon .van-icon {
    min-width: 33px;
    width: 33px;
    height: 33px;
  }
  // .van-icon {
  //   vertical-align: middle;
  //   margin-right: 20px;
  //   color: #b6b6b6;
  // }
  .home {
    img {
      width: 30px;
      height: 31px;
      pointer-events: none;
    }
  }
  .exhibits {
    img {
      width: 39px;
      height: 33px;
      pointer-events: none;
    }
  }
  .my {
    position: relative;
    img {
      width: 33px;
      height: 33px;
      pointer-events: none;
    }
    .amount {
      display: none;
      position: absolute;
      top: 12%;
      right: 38%;
      background-color: #ff0006;
      width: 12px;
      line-height: 30px;
      font-weight: 700;
      height: 12px;
      text-align: center;
      color: #fff;
      border-radius: 50%;
    }
  }
  &.tbc_amount {
      .amount {
        display: block;
      }
    }
}
</style>
