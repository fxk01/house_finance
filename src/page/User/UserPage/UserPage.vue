<template>
  <main>
    <div class="user">
      <header class="user-header">
        <div class="flex flex-align-center">
          <img src="../../../assets/img/userPage/user.png" class="user-name-img">
          <div class="flex flex-justify-between flex-align-center ly_width">
            <ul class="user-li-personal">
              <li>
                <!--尊敬的:-->
                <router-link to="user/cash" v-if="/^[1][0-9][0-9]{9}$/.test(this.userData.userName)">
                  {{this.userData.userName}}
                </router-link>
                <span v-if="!/^[1][0-9][0-9]{9}$/.test(this.userData.userName)">
                {{this.userData.userName}}
              </span>
              </li>
              <!--<li>会员积分：&nbsp;{{this.userData['availableIntegral']}}</li>-->
            </ul>

            <div v-on:click="hrefRolesFun">
              <span class="color-ad824b">{{this.userData.userRoleName}}</span>
              <i class="exclamatory-mark">!</i>
            </div>
          </div>
        </div>
        <div class="user-wrap">
          <div class="my-account">
            <div class="balance">
              <p class="user-commission user-com-width">佣金账户余额（元）</p>
              <p class="user-commission commission-balance">{{this.userData.available}}</p>
            </div>

            <div class="flex">
              <div class="flex-row">
                <p class="user-money-p user-com-width margin-bottom-25">邀请合伙人</p>
                <p class="user-money-p2">{{this.userData.inveteCount}}人</p>
              </div>
              <div class="flex-row user-com-line">
                <p class="user-money-p margin-bottom-25">累计赚取佣金（元）</p>
                <p class="user-money-p2">{{this.userData.historyAvailable}}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <van-collapse v-model="activeNames" v-for="(item, index) in collapseItemArr" :key="item.id">
          <router-link :to="item.url">
            <van-collapse-item
              :title="item.item"
              :name="index"
              :icon="item.urlImg"
              disabled
            >
            </van-collapse-item>
          </router-link>
        </van-collapse>
      </section>
    </div>
  </main>
</template>

<script>
  // {
  //   item: '渠道专员',
  //     url: '/user/bill',
  //   urlImg: require( '../../../assets/img/userPage/nav_bd.png'),
  // },
  // {
  //   item: '专属客服',
  //     url: '/user/bill',
  //   urlImg: require( '../../../assets/img/userPage/kefu-2.png'),
  // },
  // {
  //   item: '加入我们',
  //     url: '/user/bill',
  //   urlImg: require( '../../../assets/img/userPage/renyuanleixing-gongsizhiyuan.png'),
  // },
  // {
  //   item: '关于房金',
  //     url: '/user/bill',
  //   urlImg: require( '../../../assets/img/userPage/guanyu.png'),
  // }
  // {
  //   item: '我的派单',
  //     url: '/user/dispatch',
  //   urlImg: require( '../../../assets/img/userPage/paidan.png'),
  // },
  // {
  //   item: '我的邀请',
  //     url: '/user/partner',
  //   urlImg: require( '../../../assets/img/userPage/hehuoren.png'),
  // },
  // {
  //   item: '关于房金',
  //     url: '/user/housing',
  //   urlImg: require( '../../../assets/img/userPage/renyuanleixing-gongsizhiyuan.png'),
  // },
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/1/24
   */
  import * as userPageApi from './userPageApi';

  export default {
    name: 'UserPage',
    data() {
      return {
        userData: {},
        activeNames: ['1'],
        collapseItemArr: [{
          item: '我的提单',
          url: '/user/bill',
          urlImg: require( '../../../assets/img/userPage/tidan.png'),
        }, {
          item: '我的邀请',
          url: '/user/partner',
          urlImg: require( '../../../assets/img/userPage/hehuoren.png'),
        }, {
          item: '我的业绩',
          url: '/user/achievement',
          urlImg: require( '../../../assets/img/userPage/yejibaobiao.png'),
        }, {
          item: '佣金提现',
          url: '/user/commission',
          urlImg: require( '../../../assets/img/userPage/yinhangqiashezhi.png'),
        }, {
          item: '提现银行卡',
          url: '/user/cash',
          urlImg: require( '../../../assets/img/userPage/yinhangqiashezhi.png'),
        }, {
          item: '资金流水',
          url: '/user/capital',
          urlImg: require( '../../../assets/img/userPage/navicon-jylstj.png'),
        }, {
          item: '共享订单',
          url: '/user/orders',
          urlImg: require( '../../../assets/img/userPage/caidan_ziyuangongxiang.png'),
        }, {
          item: '我的名片',
          url: '/user/card',
          urlImg: require( '../../../assets/img/userPage/mingpian.png'),
        }, {
          item: '服务评价',
          url: '/user/evaluation',
          urlImg: require( '../../../assets/img/userPage/weipingjia.png'),
        }, {
          item: '消息通知',
          url: '/user/notify',
          urlImg: require( '../../../assets/img/userPage/xiaoxi.png'),
        }, {
          item: '账户设置',
          url: '/user/account',
          urlImg: require( '../../../assets/img/userPage/renyuanleixing-gongsizhiyuan.png'),
        }, {
          item: '关于房金',
          url: '/user/housing',
          urlImg: require( '../../../assets/img/userPage/renyuanleixing-gongsizhiyuan.png'),
        },],
        // rolesUrl: `user/roles?role=${this.userData.userRole}`,
      };
    },
    beforeCreate() {
      userPageApi.getUserInfo({}, this.$cookie.get('token')).then(res => {
        this.userData = res.data;
        if(Object.getOwnPropertyNames(this.userData).length !== 0) {
          this.$cookie.set('fjPhone', this.userData['userName']);
          this.$cookie.set('regSource', this.userData['regSource']);
        }
        if(res.data.isAuth) {
          this.$cookie.set('isAuth', res.data.isAuth.toString())
        }
      });
    },
    methods: {
      hrefRolesFun() {
        this.$router.push(`user/roles?role=${this.userData.userRole}`)
      }
    }
  }
</script>

<style lang="less" src="./userPage.less"></style>
