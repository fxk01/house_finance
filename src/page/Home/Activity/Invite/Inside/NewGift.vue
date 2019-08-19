<template>
  <div class="newGift">
    <div class="pay">
      <div class="text">
        <span>{{inviteName}}邀请您加入山高房金</span>
        <p>我在山高房金，你还不快来 !</p>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="mobile"
          placeholder="输入手机号码立即抽奖"
          maxlength="11"
          @blur.prevent="inputLoseFocus"
        >
      </div>
      <van-button
        type="default"
        class="btn"
        @click="goReg"
      >立即抽奖</van-button>
    </div>
    <van-popup
      class="pop-up"
      v-model="show"
      :close-on-click-overlay="false"
    >
      <div class="pop">
        <span>
          您已经是老用户，无法参加
          <br />
          新人抽奖哦~
        </span>
        <p>您可以参加老用户<span>专享福利活动</span></p>
        <van-button
          class="btn"
          type="default"
          @click="$router.push('/activity/invite')"
        >我要赚5000元现金</van-button>
      </div>
    </van-popup>
    <van-popup v-model="subscribe" :close-on-click-overlay="false" class="QRcode">
      <div class="fj_logo">
        <img src="../../../../../assets/img/activity/invite/fj-logo.png" alt="">
      </div>
      <div class="QRbox">
        <img :src="showEwmUrl" alt="">
      </div>
      <div class="QRtext">
        <p>长按识别二维码关注</p>
        <span>马上抽红包、华为Mate 20、旅游卡!</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobile: "",
      inventNum: "",
      regSource: "",
      inviteName: "",
      show: false,
      subscribe:false,
      showEwmUrl:''
    };
  },
  created() {
    // 隐藏微信分享接口
    this.$axios.fetchGet(`/weChatConfig`, { url: window.location.href.split("#")[0] }).then(res => {
      console.log(res);
      wx.config({
        debug: false, // 是否开启调试模式
        appId: res.data.appId, //appid
        timestamp: res.data.timestamp, // 时间戳
        nonceStr: res.data.nonceStr, // 随机字符串
        signature: res.data.signature, // 签名
        jsApiList: [
          'hideOptionMenu',
          'showOptionMenu'
        ] // 需要使用的JS接口列表
      });

      wx.ready(function() {
        wx.hideOptionMenu();
      });
    });
    if (this.$cookie.get("token")) {
      this.show = true;
    }
    if (this.$route.query.inventNum) {
      this.inventNum = this.$route.query.inventNum;
    }
    if (this.$route.query.regSource) {
      this.regSource = this.$route.query.regSource;
    }
    // console.log(this.$route);
    // console.log(this.$router);
    this.$axios
      .fetchPost("/getUserName", { inviteNum: this.inventNum })
      .then(res => {
        console.log(res);
        this.inviteName = res.data.userName;
      });
    if (!this.$cookie.get("token") && this.$cookie.get("openID")) {
      this.$axios
        .fetchPost("/saveUserVxInfo", {
          open_id: this.$cookie.get("openID"),
          //   open_id: 'o7qUq6B0Mb0Ga0KeTqRKbq3WxvU8',
          randomcode: this.$route.query.inventNum
          //   randomcode: '94573056'
        })
        .then(res => {
          if(res.data.subscribe === 0){
            this.showEwmUrl = res.data.showEwmUrl;
            this.subscribe = true;
            // alert(res.data.showEwmUrl);
          }
        });
    }
  },
  methods: {
    goReg() {
      let r = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/;
      if (!r.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      this.$store.commit("changeMobile", this.mobile);
      this.$router.push(
        `newGiftReg?inventNum=${this.inventNum}&regSource=${this.regSource}`
      );
    },
    inputLoseFocus() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }
};
</script>
<style lang="less">
.newGift {
  height: 100%;
  background: url("../../../../../assets/img/activity/invite/regBG.png")
    no-repeat;
  background-size: 100%;
  padding-top: 250px;
  text-align: center;

  .pay {
    background: url("../../../../../assets/img/activity/invite/pay.png");
    width: 642px;
    height: 805px;
    background-size: 100%;
    margin: 0 auto;
    padding-top: 90px;
    .text {
      // text-align: center;
      color: #787373;
      margin-bottom: 200px;
      span {
        font-size: 28px;
      }
      p {
        font-size: 32px;
        margin-top: 10px;
      }
    }
    .input {
      // text-align: center;
      input {
        width: 520px;
        height: 90px;
        line-height: 90px;
        border: 2px solid #9485a3;
        border-radius: 10px;
        font-size: 32px;
        padding-left: 30px;
        padding-right: 30px;
        &::placeholder {
          color: #999999;
        }
      }
    }
    .btn {
      width: 550px;
      height: 100px;
      line-height: 100px;
      border: none;
      border-radius: 50px;
      color: #ec001e;
      font-size: 36px;
      font-weight: 700;
      background: linear-gradient(to bottom, #ffc22f, #ff9c01);
      margin-top: 175px;
      box-shadow: 0px 3px 20px 5px #dc0c3b;
    }
  }
  .pop-up {
    width: 80%;
    border-radius: 10px;
    padding: 60px 40px;
    .pop {
      > span {
        font-size: 28px;
      }
      > p {
        font-size: 36px;
        font-weight: 700;
        margin: 40px 0;
        > span {
          color: #7b00bf;
        }
      }
      .btn {
        height: 100px;
        width: 100%;
        border: none;
        border-radius: 50px;
        background: linear-gradient(to bottom, #c740d7, #7b01bf);
        color: #fff;
        line-height: 100px;
        font-size: 32px;
        font-weight: 700;
      }
    }
  }
}
.QRcode {
  width: 560px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-radius: 10px;
  text-align: center;
  .QRbox {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
  .QRtext {
    font-size: 28px;
    p {
      color: #9012c4;
      margin-bottom: 10px;
    }
    span {
      color: #333333;
    }
  }
  .fj_logo {
    img {
      width: 264px;
      height: 63px;
    }
    margin-bottom: 20px;
  }
}
</style>