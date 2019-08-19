<template>
  <div id="houseFinance">
    <top
      v-if="show"
      :title="this.meta"
    />
    <div
      id="app"
      v-bind:class="{'active-footer': $route.meta.showFooter,'pt':show}"
    >
      <router-view v-wechat-title="$route.meta.title" />
    </div>
    <tabFoot
      v-if="$route.meta.showFooter"
      :activeOn="activeOn"
      :class="{tbc_amount:tbcAmount>0}"
    />
  </div>
</template>

<script>
import Top from "./components/top";
import TabFoot from "./components/tabFoot";
import { Toast } from "vant";
export default {
  name: "App",
  data() {
    return {
      activeOn: 0,
      meta: "",
      show: false,
      token: "",
      openID: ""
    };
  },
  beforeCreate() {

    // 生产
    if (
      location.href == "https://fj.shangaofangjin.com/#/user" ||
      location.href == "https://fj.shangaofangjin.com/#/subOrderA" ||
      location.href ==
        "https://fj.shangaofangjin.com/#/user/cash/certification?opType=1" ||
      location.href ==
        "https://fj.shangaofangjin.com/#/activity/invite/turntable"
    ) {
      sessionStorage.setItem("webURL", location.href);
      // alert(location.href);
    }

    // 测试
    // if (
    //   location.href == "http://lodev.hsfinance.cn/#/user" ||
    //   location.href == "http://lodev.hsfinance.cn/#/subOrderA" ||
    //   location.href == "http://lodev.hsfinance.cn/#/user/cash/certification?opType=1" ||
    //   location.href == "http://lodev.hsfinance.cn/#/activity/invite/turntable"
    // ) {
    //   sessionStorage.setItem("webURL", location.href);
    //   // alert(location.href);
    // }
  },
  created() {



    if (!this.$cookie.get("token")) {
      this.$store.commit("changeTbcAmount", 0);
    }
    // console.log(this.$route.name);

    // this.$store.commit("saveWechatInfo", 1);
    let nu = navigator.userAgent.toLowerCase();
    let isWechat = nu.indexOf("micromessenger") != -1;
    if (isWechat) {
      this.show = false;
    } else {
      this.show = true;
      // location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid={$_W['account']['key']}&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=YWN0PW1vZHVsZSZuYW1lPXNob3BwaW5nMiZkbz1saXN0JndlaWQ9Mg==&connect_redirect=1#wechat_redirect";
      return;
    }
    const WeChatCode = this.getQueryValue("code", location.search);
    this.token = this.$cookie.get("token") || "";
    this.openID = this.$cookie.get("openID") || "";
    console.log("token=" + this.token, "opebID=" + this.openID, WeChatCode);
    if (!WeChatCode && !this.openID) {
      this.bindUse();
    } else if (WeChatCode && !this.openID) {
      this.$axios
        .request({
          url: "weChatUserAccessToken",
          data: {
            WeChatCode
          },
          token: this.token
        })
        .then(res => {
          if (res.code === "1") {
            location.search = "";
            console.log(res.data);
            const {
              openID,
              token,
              ewm_path,
              inventNum,
              userPhone,
              uid,
              isAuth,
              isLogin,
              isSelectCity,
              city,
              cityCode,
              regSource
            } = res.data;
            token &&
              this.$cookie.set("token", token, { paht: "/", expires: 7 });
            this.$cookie.set("openID", openID, { paht: "/", expires: 7 });
            if (this.$route.name == "newGift") {
              let num = this.$route.query.inventNum;
              this.$axios
                .fetchPost("/saveUserVxInfo", {
                  open_id: this.$cookie.get("openID"),
                  //   open_id: 'o7qUq6B0Mb0Ga0KeTqRKbq3WxvU8',
                  randomcode: this.$route.query.inventNum
                  //   randomcode: '94573056'
                })
                .then(res => {
                  // alert(res);
                });
            }
            if (!isLogin) {
              // this.$router.push("/loginRegister/login");
            } else {
              this.$cookie.set("uid", uid, { paht: "/", expires: 7 });
              this.$cookie.set("ewm_path", ewm_path, { paht: "/", expires: 7 });
              this.$cookie.set("userPhone", userPhone, {
                paht: "/",
                expires: 7
              });
              this.$cookie.set("inventNum", inventNum, {
                paht: "/",
                expires: 7
              });
              this.$cookie.set("isAuth", isAuth, { paht: "/", expires: 7 });
              this.$cookie.set("cityCode", cityCode, { paht: "/", expires: 7 });
              this.$cookie.set("isSelectCity", isSelectCity, {
                paht: "/",
                expires: 7
              });
              this.$cookie.set("city", city, { paht: "/", expires: 7 });
              this.$cookie.set("regSource", regSource, {
                paht: "/",
                expires: 7
              });
            }
          } else {
            Toast(res.msg);
          }
        });
    } else {
      if (this.token) {
        this.$axios.fetchPost("/getUserInfo", {}, this.token).then(res => {
          const {
            isAuth,
            regSource,
            isSelectCity,
            city,
            cityCode,
            uid
          } = res.data;
          this.$store.commit("changeTbcAmount", res.data.tbcAmount);
          this.$cookie.set("isAuth", isAuth, { paht: "/", expires: 7 });
          this.$cookie.set("cityCode", cityCode, { paht: "/", expires: 7 });
          this.$cookie.set("isSelectCity", isSelectCity, {
            paht: "/",
            expires: 7
          });
          this.$cookie.set("city", city, { paht: "/", expires: 7 });
          this.$cookie.set("uid", uid, { paht: "/", expires: 7 });
          this.$cookie.set("regSource", regSource, { paht: "/", expires: 7 });
        });
      }
    }
  },
  updated() {
    // let obj = document.getElementsByTagName('img');
    // this.$nextTick(() => {
    //   for(let i = 0;i < obj.length; i++) {
    //     obj[i].onclick = function(event) {
    //       console.log(event.preventDefault())
    //     };
    //   }
    // })
  },
  components: {
    Top,
    TabFoot
  },
  watch: {
    $route(to) {
      this.meta = to.meta["title"];
      this.activeOn = to.meta["active"];
    }
  },
  computed: {
    tbcAmount() {
      return this.$store.state.home.tbcAmount;
    }
  },
  methods: {
    bindUse() {
      const userAgent = window.navigator.userAgent;
      const isWechat =
        /MicroMessenger/i.test(userAgent) || /WindowsWechat/i.test(userAgent);
      if (!isWechat) {
        return;
      } else {
        this.$axios
          .request({
            url: "weChatOauth",
            data: {
              backUrl: location.href
            }
          })
          .then(res => {
            if (res.code === "1") {
              location.href = res.data;
            }
          });
      }
    },
    getQueryValue(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return " ";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  }
};
</script>

<style src="./style/base.css"></style>
