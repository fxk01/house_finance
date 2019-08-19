<template>
  <div class="index">
    <div class="title">
      <img
        src="../../../../../assets/img/activity/invite/title.png"
        alt=""
        @click.prevent=""
      >
    </div>
    <div class="redp">
      <span class="r-title">每邀请一名新用户您最高可赚奖励</span>
      <p class="r-award"><img
          src="../../../../../assets/img/activity/invite/5000.png"
          alt=""
        > <span>元</span> </p>
      <span class="r-tips">好友最高可得价值4000元华为手机</span>
      <van-button
        type="default"
        class="r-btn"
        @click="guidUserShockList"
      >立即邀请赚奖励</van-button>
    </div>
    <div class="main">
      <div class="combat">
        <ul class="c-list">
          <li>
            <span>{{inviteData.isReg || 0}}</span>
            <p>邀请成功(人)</p>
          </li>
          <li>
            <span>{{inviteData.unReg || 0}}</span>
            <p>邀请在路上</p>
          </li>
          <li>
            <span>{{inviteData.reward || 0}}</span>
            <p>获得奖励(元)</p>
          </li>
        </ul>
        <van-button
          type="default"
          class="c-btn"
          @click="$router.push({name:'friend'})"
        >查看详情</van-button>
      </div>
      <div class="rank">
        <span class="r-tips">邀请注册实名满68人以上可获得排行榜叠加奖励</span>
        <ul class="r-list">
          <li>
            <div class="right">
              <img
                class="oneA"
                src="../../../../../assets/img/activity/invite/oneA.png"
                alt=""
              >
            </div>
            <div class="left">
              <p>华为P30 8+128GB</p>
              <span>¥ 4288.00</span>
            </div>
          </li>
          <li>
            <div class="right">
              <img
                class="oneB"
                src="../../../../../assets/img/activity/invite/oneB.png"
                alt=""
              >
            </div>
            <div class="left">
              <p>豪华国际双人旅游卡</p>
              <span>¥ 3668.00</span>
            </div>
          </li>
          <li>
            <div class="right">
              <img
                class="oneC"
                src="../../../../../assets/img/activity/invite/oneC.png"
                alt=""
              >
            </div>
            <div class="left">
              <p>经典国内双人旅游卡</p>
              <span>¥ 2880.00</span>
            </div>
          </li>
        </ul>
        <van-button
          class="r-btn"
          type="default"
          @click="$router.push({name:'rank'})"
        >查看排行榜</van-button>
      </div>
      <div class="count">
        <ul class="c-list">
          <li>
            <i>1</i>
            <p>累计邀请3人注册实名，邀请人得<span>28元</span>现金奖励；</p>
          </li>
          <li>
            <i>2</i>
            <p>累计邀请10人注册实名，邀请人得<span>188元</span>现金奖励；</p>
          </li>
          <li>
            <i>3</i>
            <p>累计邀请25人注册实名，邀请人得<span>588元</span>现金奖励；</p>
          </li>
        </ul>
      </div>
      <div class="guide">
        <span>发邀请给好友</span>
        <span class="special">好友成功注册<br />实名/提单并<br />放款成功</span>
        <span>您获得奖励</span>
      </div>
    </div>
    <div class="invite">
      <van-button
        type="default"
        class="btn"
        @click="guidUserShockList"
      >立即邀请赚现金</van-button>
    </div>
    <div
      class="rule"
      @click="$router.push('/activity/invite/activeRule')"
    >
      活动规则
    </div>
    <van-popup
      v-model="popOne"
      class="popOne"
    >
      <img
        @click.prevent="closePop(1)"
        src="../../../../../assets/img/activity/invite/pop1.png"
        alt=""
      >
    </van-popup>
    <van-popup
      v-model="popTwo"
      class="popTwo"
    >
      <div class="content">{{content}}</div>
      <van-button
        v-if="index === 1"
        type="default"
        class="btn"
        @click="showPopOne"
      >继续邀请赚现金</van-button>
      <van-button
        v-else-if="index === 2"
        type="default"
        class="btn"
        @click="goHome"
      >逛逛其他</van-button>
      <van-icon
        name="close"
        class="close"
        @click="closePop(2)"
      />
    </van-popup>
    <van-popup
      v-model="end"
      class="end"
      :close-on-click-overlay="false"
    >
      活动已结束
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uToken: "",
      popOne: false,
      popTwo: false,
      content: "",
      index: 0,
      shareUrl: window.location.href.split("#")[0],
      inviteData: {},
      end:true
    };
  },
  created() {
    this.uToken = this.$cookie.get("token");
    if (this.uToken) {
      this.$axios.fetchPost("/getUserInviteInfo", {}, this.uToken).then(res => {
        // console.log(res,111);
        this.inviteData = res.data;
      });
    }
    let self = this;
    this.$axios.fetchGet('/weChatConfig', { url: this.shareUrl }).then(res => {
      console.log(res);
      wx.config({
        debug: false, // 是否开启调试模式
        appId: res.data.appId, //appid
        timestamp: res.data.timestamp, // 时间戳
        nonceStr: res.data.nonceStr, // 随机字符串
        signature: res.data.signature, // 签名
        jsApiList: [
          "checkJsApi",
          "onMenuShareAppMessage",
          "onMenuShareTimeline",
          "hideAllNonBaseMenuItem",
          'hideOptionMenu',
          'showOptionMenu'
        ] // 需要使用的JS接口列表
      });

      wx.ready(function() {
        if (self.uToken) {
          wx.showOptionMenu();
          let link =
            "https://fj.shangaofangjin.com/#/activity/invite/newGift?inventNum=" +
            self.$cookie.get("inventNum") +
            "&regSource=ACTIVITY";
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: "我在山高房金，邀你来抽新人壕礼哟！", // 分享标题
            desc: "华为Mate20、国内双人旅游卡中奖概率高~",
            link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接
            imgUrl:
              "https://fj.shangaofangjin.com/fgold-api/assets/images/xinrenli.png", // 分享图标
            success: function() {
              // self.$toast({
              //   message: "分享成功"
              // });
            }
          });
          //分享给好友
          wx.onMenuShareAppMessage({
            title: "我在山高房金，邀你来抽新人壕礼哟！", // 分享标题
            desc: "华为Mate20、国内双人旅游卡中奖概率高~", // 分享描述
            link: link.split("#")[0] + "?#" + link.split("#")[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
              "https://fj.shangaofangjin.com/fgold-api/assets/images/xinrenli.png", // 分享图标
            success(data) {
              // self.$toast({
              //   message: "分享成功"
              // });
            }
          });
        } else {
          wx.hideOptionMenu();
          wx.hideAllNonBaseMenuItem();
        }
      });
    });

    // 微信分享
  },
  methods: {
    guidUserShockList() {
      if (!this.uToken) {
        this.$toast("请先登录");
        this.$router.push({ name: "login" });
        return;
      }
      this.$axios.fetchPost("/guidUserShockList", {}, this.uToken).then(res => {
        console.log(res);
        if (!res.data.content && res.data.isGoOn) {
          this.popOne = true;
        } else if (res.data.content && res.data.isGoOn) {
          this.content = res.data.content;
          this.index = 1;
          this.popTwo = true;
        } else if (res.data.content && !res.data.isGoOn) {
          this.content = res.data.content;
          this.index = 2;
          this.popTwo = true;
        } else {
          this.$toast("error");
        }
      });
    },
    closePop(i) {
      if (i === 1) {
        this.popOne = false;
      } else {
        this.popTwo = false;
      }
    },
    showPopOne() {
      this.popTwo = false;
      this.popOne = true;
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less">
.index {
  position: relative;
  background: url("../../../../../assets/img/activity/invite/indexBG.jpg")
    no-repeat;
  background-size: 100%;
  padding-bottom: 140px;
  .title {
    padding-top: 78px;
    padding-bottom: 40px;
    text-align: center;
    > img {
      width: 642px;
      height: 132px;
    }
  }
  .redp {
    margin: 0 auto;
    background: url("../../../../../assets/img/activity/invite/redp.png")
      no-repeat center/cover;
    height: 742px;
    width: 714px;
    padding-top: 110px;
    text-align: center;
    .r-title {
      color: #e71417;
      font-size: 28px;
      font-weight: 700;
    }
    .r-award {
      color: #f93a31;
      padding: 40px 0;
      img {
        width: 349px;
        height: 138px;
      }
      span {
        font-size: 40px;
        font-weight: 700;
        vertical-align: bottom;
      }
    }
    .r-tips {
      font-size: 28px;
      color: #d2985f;
    }
    .r-btn {
      width: 522px;
      height: 100px;
      line-height: 100px;
      margin-top: 130px;
      border-radius: 50px;
      background: linear-gradient(to bottom, #ffeb00, #ff7f00);
      border: none;
      color: #e5302a;
      font-size: 36px;
      font-weight: 700;
      text-shadow: 0px 1px 2px #fff;
      box-shadow: 0px 3px 20px 5px #c42723;
    }
  }
  .main {
    margin: 0 auto;
    background: url("../../../../../assets/img/activity/invite/indexBG2.png")
      no-repeat center/cover;
    width: 705px;
    height: 3243px;
    .combat {
      padding-top: 250px;
      text-align: center;
      .c-list {
        display: flex;
        justify-content: space-evenly;
        li {
          text-align: center;
          span {
            color: #504fd0;
            font-weight: 700;
            font-size: 60px;
            font-family: "Alternate";
          }
          p {
            font-size: 28px;
            color: #333;
          }
        }
      }
      .c-btn {
        width: 526px;
        height: 100px;
        line-height: 100px;
        margin-top: 78px;
        border-radius: 50px;
        background: linear-gradient(to bottom, #517bef, #7547e3);
        color: #fff;
        font-size: 36px;
        border: none;
        box-shadow: 0px 3px 20px 5px #b7abd4;
      }
    }
    .rank {
      margin-top: 215px;
      text-align: center;
      .r-tips {
        font-size: 24px;
        color: #666666;
      }
      .r-list {
        margin-top: 50px;
        li {
          display: flex;
          height: 200px;
          width: 590px;
          margin: 0 auto;
          .left {
            width: 390px;
            text-align: left;
            p {
              font-size: 28px;
              color: #222222;
              margin-top: 48px;
              margin-bottom: 18px;
            }
            span {
              color: #ff0030;
              font-size: 44px;
              font-weight: 700;
            }
          }
          .right {
            flex: 1;
            text-align: right;
            line-height: 180px;
            margin-right: 20px;
            .oneA {
              width: 153px;
              height: 162px;
            }
            .oneB {
              width: 169px;
              height: 121px;
            }
            .oneC {
              width: 169px;
              height: 111px;
            }
          }
          &:not(:last-child) {
            border-bottom: 2px solid #e6e6e6;
          }
        }
      }
      .r-btn {
        width: 526px;
        height: 100px;
        line-height: 100px;
        font-size: 36px;
        color: #fff;
        background: linear-gradient(to bottom, #527bef, #7547e3);
        border-radius: 50px;
        margin-top: 36px;
        box-shadow: 0px 3px 20px 5px #b7abd4;
        border: none;
      }
    }
    .count {
      margin-top: 385px;
      .c-list {
        li {
          display: flex;
          width: 585px;
          margin: 0 auto;
          margin-bottom: 10px;
          i {
            width: 34px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            font-size: 28px;
            background-color: #8483de;
            color: #fff;
            margin-right: 22px;
            margin-top: 8px;
          }
          p {
            width: 522px;
            font-size: 28px;
            color: #333333;
            line-height: 52px;
            span {
              color: #ff204a;
            }
          }
        }
      }
    }
    .guide {
      width: 600px;
      margin: 0 auto;
      margin-top: 765px;
      display: flex;
      text-align: center;
      font-size: 28px;
      justify-content: space-between;
      .special {
        flex: 1;
        margin-right: 20px;
      }
    }
  }
  .invite {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    .btn {
      width: 100%;
      height: 100px;
      line-height: 100px;
      border: none;
      background-color: #ffa900;
      color: #fff;
      font-size: 32px;
    }
  }
  .rule {
    position: absolute;
    top: 25px;
    right: 0;
    width: 128px;
    height: 54px;
    line-height: 58px;
    text-align: center;
    background: linear-gradient(to right bottom, #ffe9a8, #ffd33b);
    color: #7223ce;
    border-radius: 27px 0 0 27px;
    padding-left: 10px;
  }
  .popOne {
    background-color: transparent;
    top: 12px;
    left: auto;
    right: 12px;
    transform: translate(0, 0);
    img {
      width: 559px;
      height: 834px;
    }
  }
  .popTwo {
    width: 623px;
    height: 770px;
    background: url("../../../../../assets/img/activity/invite/pop2.png")
      transparent no-repeat center top/100%;
    .content {
      padding-top: 160px;
      width: 375px;
      margin: 0 auto;
      font-size: 36px;
      color: #e5302a;
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 180px;
      transform: translateX(-50%);
      width: 522px;
      height: 100px;
      line-height: 100px;
      border-radius: 50px;
      background: linear-gradient(to bottom, #ffeb00, #ff7f00);
      border: none;
      color: #e5302a;
      font-size: 36px;
      font-weight: 700;
      text-shadow: 0px 1px 2px #fff;
      box-shadow: 0px 3px 20px 5px #841bc4;
    }
    .close {
      position: absolute;
      color: #fff;
      font-size: 80px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
    }
  }
}
.end {
  width: 80%;
  text-align: center;
  padding: 60px 0;
  border-radius: 10px;
}
</style>