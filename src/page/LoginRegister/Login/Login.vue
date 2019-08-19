<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="mobile"
        placeholder="请输入手机号码"
        type="number"
        maxlength="11"
        @input="isEmpty"
      />
      <van-field
        v-model="code"
        placeholder="请输入短信验证码"
        type="number"
        maxlength="4"
        @input="isEmpty"
      >
        <van-button slot="button" size="large" @click="getCode" class="code-btn" :class="{disabl:isDisabled}" :disabled="isDisabled">{{codeText}}</van-button>
      </van-field>
    </van-cell-group>
    <div>
      <van-button
        size="large"
        class="login-btn"
        :class="{disabl:isDisabled2}"
        @click="login"
        :disabled="isDisabled2"
      >立即登录</van-button>
    </div>
    <!-- <div class="tips">
      <p>
        还没账号？&nbsp;&nbsp;
        <router-link :to="{name:'register'}">立即注册</router-link>
      </p>
    </div> -->
  </div>
</template>
<script>
import { Field, CellGroup, Toast } from "vant";
import { setTimeout, clearTimeout, setInterval, clearInterval } from "timers";

export default {
  data() {
    return {
      mobile: '',
      code: '',
      status: null,
      timeID: null,
      timeID2: null,
      codeText: "获取验证码",
      isDisabled: false,
      isDisabled2: true,
      uToken:''
    };
  },
  created(){
    this.$store.commit('changeStatus',1);
    this.uToken = this.$cookie.get('token');
  },
  watch: {
    uToken:function(newVal,oldVal){
      if(newVal){
        location.href = sessionStorage.getItem('webURL');
      }
    }
  },
  methods: {
    getCode() {
      this.$axios
        .fetchPost("/sendSms", {
          userPhone: this.mobile,
          smsType: "20001"
        })
        .then(res => {
          Toast({
            message: res.msg
          });
          if (res.code != 1) return;
          let times = 120;
          if (this.timeID2 != null) clearInterval(this.timeID2);
          this.timeID2 = setInterval(() => {
            times--;
            this.codeText = `重新发送(${times}s)`;
            if (times === 0) {
              this.codeText = "获取验证码";
              this.isDisabled = false;
              clearInterval(this.timeID2);
            }
          }, 1000);
          this.isDisabled = true;
        });
    },
    login() {
      // if (this.status != "passed") {
      //   Toast({
      //     message: "请输入正确的手机号码"
      //   });
      //   return;
      // }
      const t1 = Toast.loading({
        mask: true,
        message: "登录中...",
        duration: 0
      });
      this.$axios
        .fetchPost("/login", {
          userPhone: this.mobile,
          smsType: "20001",
          smsCode: this.code
        })
        .then(res => {
          t1.clear();
          Toast({
            message: res.msg
          });
          this.$cookie.set("token", res.data.token, { expires: 7 });
          this.$cookie.set("isAuth", res.data.isAuth.toString(), { expires: 7 });
          this.$cookie.set("uid", res.data.uid, { expires: 7 });
          this.$cookie.set("ewm_path", res.data.ewm_path, { expires: 7 });
          this.$cookie.set("userPhone", res.data.userPhone, { expires: 7 });
          this.$cookie.set("inventNum", res.data.inventNum, { expires: 7 });
          this.$cookie.set("isSelectCity", res.data.isSelectCity, { expires: 7 });
          this.$cookie.set("city", res.data.city, { expires: 7 });
          this.$cookie.set("cityCode", res.data.cityCode, { expires: 7 });
          console.log(this.$router.history);
          if (this.$router.history.current.query.redirecturl) {
            location.href = this.$router.history.current.query.redirecturl;
            return;
          }
          if (this.$cookie.get("openID")) {
            this.$axios
              .request({
                url: "weChatAndUserInfoBinding",
                data: {
                  openID: this.$cookie.get("openID")
                },
                token: res.data.token
              })
              .then(res => {
                if (res.code === "1") {
                  this.custom();
                } else {
                  Toast(res.msg);
                }
              });
          }else {
            this.custom();
          }
        });
    },
    isEmpty(){
      if(this.mobile == '' || this.code == ''){
        this.isDisabled2 = true;
      }else {
        this.isDisabled2 = false;
      }
    },
    custom(){
      let referrer = sessionStorage.getItem('referrer');
      if(referrer != null){
        this.$router.push(referrer);
      }else {
        this.timeID = setTimeout(() => {
          this.$router.push({ name: "homePage" });
        }, 200);
      }
    }
  },
  destroyed() {
    clearTimeout(this.timeID);
    clearInterval(this.timeID2);
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast
  }
};
</script>
<style lang="less" src="./login.less">
</style>
