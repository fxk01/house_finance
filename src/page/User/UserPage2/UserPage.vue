<template>
  <div class="user-info">
    <div class="info">
      <h1 class="head">
        <img
          src="../../../assets/img/userPage/user2.png"
          alt=""
          v-on:click.prevent=""
        >
        <router-link
          to="user/cash"
          v-if="/^[1][0-9][0-9]{9}$/.test(this.userData.userName)"
        >
          {{this.userData.userName}}
        </router-link>
        <span v-if="!/^[1][0-9][0-9]{9}$/.test(this.userData.userName)">
          {{this.userData.userName}}
        </span>
      </h1>
      <div class="com_tips" v-show="this.userData.tbcAmount !== 0">
        <router-link to="/user/affirm">
          <i class="icon">!</i>
          您有一笔佣金已发放，点击此处确认是否收到
        </router-link>  
      </div>
      <!-- 渠道用户 -->
      <ul class="data" :class="{channel:this.userData.tbcAmount===0}" v-if="this.userData.isChannel === 1">
        <li>
          <router-link to="/user/record" style="display: inline-block;">
            <span>{{this.userData.award}}</span>
            <p>红包(元)</p>
          </router-link>
          <button>
            <router-link to="/user/commission">提现</router-link>
          </button>
        </li>
        <li>
          <router-link to="/user/achievement/commission?isReferrerUser=0" style="display: inline-block;">
            <span>{{this.userData.commission}}</span>
            <p>佣金余额(元)</p>
            <!-- <p>确认佣金</p> -->
          </router-link>
          <button @click="showMySuperior">领取说明</button>
        </li>
        <li>
          <router-link to="/user/partner/result" style="display: inline-block;">
            <span>{{this.userData.inveteCount}}</span>
            <p>合伙人</p>
          </router-link>
          <button>
            <router-link to="/user/partner">邀请</router-link>
          </button>
        </li>
      </ul>
      <!-- 普通用户 -->
      <ul class="data general" :class="{mt80:this.userData.tbcAmount!==0}" v-if="this.userData.isChannel === 0">
        <li>
          <router-link to="/user/record" style="display: inline-block;">
            <span>{{this.userData.award}}</span>
            <p>红包(元)</p>
          </router-link>
        </li>
        <li>
          <router-link to="/user/achievement/commission?isReferrerUser=0" style="display: inline-block;">
            <span>{{this.userData.commission}}</span>
            <p>佣金余额(元)</p>
          </router-link>
        </li>
        <li v-show="this.userData.isChannel === 0">
          <router-link to="/user/accounting" style="display: inline-block;">
            <span>{{this.userData.historyAvailable}}</span>
            <p>累计金额(元)</p>
          </router-link>
        </li>
        <li>
          <router-link to="/user/partner/result" style="display: inline-block;">
            <span>{{this.userData.inveteCount}}</span>
            <p>合伙人</p>
          </router-link>
        </li>
      </ul>
      <div class="fj-man" @click="hrefRolesFun">
        <img src="../../../assets/img/userPage/fj-man.png" alt="">
        <span>{{this.userData.userRoleName}}</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="lists">
      <div class="order item">
        <h2>订单相关</h2>
        <ul>
          <li v-for="(item, index) in orderList" :key="index">
            <router-link :to="item.url">
              <img :src="item.urlImg" alt="">
              <p>{{item.item}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="fund item">
        <h2>资金相关</h2>
        <ul v-if="userData.isChannel === 1">
          <li v-for="(item, index) in fundList2" :key="index">
            <router-link :to="item.url">
              <img :src="item.urlImg" alt="">
              <p>{{item.item}}</p>
            </router-link>
          </li>
        </ul>
        <ul v-else>
          <li v-for="(item, index) in fundList" :key="index">
            <router-link :to="item.url">
              <img :src="item.urlImg" alt="">
              <p>{{item.item}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="more item">
        <h2>更多服务</h2>
        <ul>
          <li v-for="(item, index) in moreList" :key="index">
            <router-link v-if="item.item === '消息通知'" :to="item.url">
              <img :src="item.urlImg" alt="">
              <p>{{item.item}}</p>
              <i v-if="userData.redTips !== 0 && userData.redTips !== undefined" class="my_icon_num">{{userData.redTips}}</i>
            </router-link>
            <router-link v-else :to="item.url">
              <img :src="item.urlImg" alt="">
              <p>{{item.item}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <van-popup class="s_popup" v-model="mySuperior">
      <div class="mySuperior">
        <div class="s_title">您的佣金由您的房金顾问发放，请联系您的房金顾问，或咨询您的房金经理</div>
        <div class="s_content">
          <div class="s_item" v-if="userData.myAdvisor">
            <img src="../../../assets/img/userPage/s_img.png" alt="">
            <span class="s_nick">{{userData.myAdvisor.user_type}}</span>
            <span class="s_name">{{userData.myAdvisor.user_name}}</span>
            <a class="s_btn" :href="'tel:'+userData.myAdvisor.service_number" @click="callPhone(userData.myAdvisor.user_phone)">
              <img src="../../../assets/img/userPage/s_mobile.png" alt="">
              <span>电话联系</span>
            </a>
          </div>
          <div class="s_item" v-if="userData.myManager">
            <img src="../../../assets/img/userPage/s_img.png" alt="">
            <span class="s_nick">{{userData.myManager.user_type}}</span>
            <span class="s_name">{{userData.myManager.user_name}}</span>
            <a class="s_btn" :href="'tel:'+userData.myManager.service_number" @click="callPhone(userData.myManager.user_phone)">
              <img src="../../../assets/img/userPage/s_mobile.png" alt="">
              <span>电话联系</span>
            </a>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
/**
 * @Description:
 * @author 李凯明
 * @date 2019/1/24
 */
import * as userPageApi from "./userPageApi";

export default {
  name: "UserPage",
  data() {
    return {
      userData: {},
      mySuperior: false,
      superiorData:{},
      activeNames: ["1"],
      orderList:[
        {
          item: "我的提单",
          // url: "/user/bill",
          url: "/user/mb",
          urlImg: require("../../../assets/img/userPage/tidan2.png")
        },
        // {
        //   item: "我的派单",
        //   url: "/user/partner",
        //   urlImg: require("../../../assets/img/userPage/paidan2.png")
        // },
        {
          item: "我的邀请",
          url: "/user/partner",
          urlImg: require("../../../assets/img/userPage/yaoqing2.png")
        },
        {
          item: "我的业绩",
          url: "/user/achievement",
          urlImg: require("../../../assets/img/userPage/yeji2.png")
        },
      ],
      fundList:[
        {
          item: "提现",
          url: "/user/commission",
          urlImg: require("../../../assets/img/userPage/tixian2.png")
        },
        {
          item: "资金流水",
          url: "/user/capital",
          urlImg: require("../../../assets/img/userPage/zijin2.png")
        },
        {
          item: "银行卡",
          url: "/user/cash",
          urlImg: require("../../../assets/img/userPage/card2.png")
        },

      ],
      fundList2:[
        // {
        //   item: "资金流水",
        //   url: "/user/capital",
        //   urlImg: require("../../../assets/img/userPage/zijin2.png")
        // },
        {
          item: "银行卡",
          url: "/user/cash",
          urlImg: require("../../../assets/img/userPage/card2.png")
        },
        // {
        //   item: "",
        //   url: "",
        // },

      ],
      moreList:[
        {
          item: "消息通知",
          url: "/user/notify",
          urlImg: require("../../../assets/img/userPage/xiaoxi2.png")
        },
        {
          item: "账户设置",
          url: "/user/account",
          urlImg: require("../../../assets/img/userPage/set2.png")
        },
        {
          item: "我的名片",
          url: "/user/card",
          urlImg: require("../../../assets/img/userPage/mp2.png")
        },
        {
          item: "服务评价",
          url: "/user/evaluation",
          urlImg: require("../../../assets/img/userPage/fuwu2.png")
        },
        {
          item: "关于房金",
          url: "/user/housing",
          urlImg: require("../../../assets/img/userPage/fj2.png")
        },
      ]
      // rolesUrl: `user/roles?role=${this.userData.userRole}`,
    };
  },
  beforeCreate() {
    userPageApi.getUserInfo({}, this.$cookie.get("token")).then(res => {
      this.userData = res.data;
      this.superiorData = res.data.fjUsers;
      this.$store.commit('changeTbcAmount',res.data.tbcAmount);
      if (Object.getOwnPropertyNames(this.userData).length !== 0) {
        this.$cookie.set("fjPhone", this.userData["userName"]);
        this.$cookie.set("regSource", this.userData["regSource"]);
      }
      if (res.data.isAuth) {
        this.$cookie.set("isAuth", res.data.isAuth.toString());
      }
    });
    
  },
  methods: {
    hrefRolesFun() {
      this.$router.push(`user/roles?role=${this.userData.userRole}`);
    },
    showMySuperior(){
      this.mySuperior = true;
    },
    callPhone(mobile){
      this.$axios.fetchPost('/toCallPhone',{callerPhone:this.userData.userPhone,calledPhone:mobile},this.$cookie.get("token")).then(res=>{
        console.log(res);
        this.mySuperior = false;
      })
    }
  }
};
</script>

<style lang="less" src="./userPage.less"></style>
