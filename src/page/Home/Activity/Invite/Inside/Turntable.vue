<template>
  <div class="turntable">
    <div class="figure">
      <div class="outer">
        <div class="inner">
          <div class="prize">
            <img
              id="go"
              class="go"
              @click="userDraw"
              src="../../../../../assets/img/activity/invite/GO.png"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="rule"
      @click="$router.push('turnRule')"
    >
      活动规则
    </div>
    <div class="tips">您可以抽{{count}}次哦 ~</div>
    <van-popup
      v-model="showGift"
      class="showGift"
      :close-on-click-overlay="false"
    >
      <div class="gift">
        <p>{{awardInfo}}</p>
        <van-button
          type="default"
          class="btn"
          @click="isGrant"
        >马上提现</van-button>
      </div>
    </van-popup>
    <van-popup
      v-model="showGrant"
      class="showGrant"
      :close-on-click-overlay="true"
    >
      <div class="grant">
        <van-button
          type="default"
          class="btn"
          @click="$router.push({name:'inviteIndex'})"
        >查看更多福利</van-button>
        <p>
          <router-link to="/user">立即查看佣金 ></router-link>
        </p>
      </div>
      <!-- <van-icon name="close" @click="close" /> -->
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uToken: "",
      awardList: [],
      awardInfo: "",
      showGift: false,
      showGrant: false,
      timeID: null,
      count:null
    };
  },
  created() {
    this.$axios
      .fetchGet(`/weChatConfig`, { url: window.location.href.split("#")[0] })
      .then(res => {
        console.log(res);
        wx.config({
          debug: false, // 是否开启调试模式
          appId: res.data.appId, //appid
          timestamp: res.data.timestamp, // 时间戳
          nonceStr: res.data.nonceStr, // 随机字符串
          signature: res.data.signature, // 签名
          jsApiList: ["hideOptionMenu", "showOptionMenu"] // 需要使用的JS接口列表
        });

        wx.ready(function() {
          wx.hideOptionMenu();
        });
      });
    this.uToken = this.$cookie.get("token");
    if (this.$route.query.isBack) {
      this.showGrant = true;
    }
    this.$axios.fetchPost("/queryAwardList").then(res => {
      this.awardList = res.data;
    });
    this.$axios.fetchPost('/getUserDrawCount',{},this.uToken).then(res=>{
      console.log(res);
      this.count = res.data.count;
    })
  },
  methods: {
    userDraw() {
      if(this.count > 0){
        this.count--;
        this.$axios
        .fetchPost(
          "/userDraw",
          {
            openID: ""
          },
          this.uToken
        )

        .then(res => {
          let pid = res.data.pid;
          let rotate;
          try {
            this.awardList.forEach(v => {
              console.log(v);
              if (v.pid === pid) {
                this.awardInfo = v.awardContent;
                throw "Jump out now!";
              }
            });
          } catch (error) {
            console.log(error);
          }
          switch (pid) {
            case "9":
              rotate = 2150;
              break;
            case "10":
              rotate = 2190;
              break;
            case "11":
              rotate = 1860;
              break;
            case "12":
              rotate = 1960;
              break;
            case "13":
              rotate = 2000;
              break;
            case "14":
              rotate = 2050;
              break;
            case "16":
              rotate = 1900;
              break;
            default:
              break;
          }
          let goImg = document.getElementById("go");
          goImg.style.transform = "rotate(" + rotate + "deg)";
          if (pid === "16") {
            this.$router.push("harvest");
          } else {
            this.timeID = setTimeout(() => {
              this.showGift = true;
            }, 6000);
          }
        });
      }else {
        // this.showGrant = true;
        this.$toast('您已经没有更多的抽奖次数了');
      }
      
    },
    isGrant() {
      this.$router.push("/user/commission");
    },
    close() {
      // this.showGrant = false;
    }
  }
};
</script>

<style lang="less">
.turntable {
  position: relative;
  height: 100%;
  background: url("../../../../../assets/img/activity/invite/turntableBG.png")
    no-repeat;
  background-size: 100%;
  background-color: #fe4501;
  .figure {
    height: 100%;
    background: url("../../../../../assets/img/activity/invite/figure.png")
      no-repeat 0 303px;
    background-size: 100%;
    .outer {
      height: 100%;
      background: url("../../../../../assets/img/activity/invite/outer.png")
        no-repeat 47px 393px;
      background-size: 658px 658px;
      .inner {
        height: 100%;
        background: url("../../../../../assets/img/activity/invite/inner.png")
          no-repeat 117px 463px;
        background-size: 518px 518px;
        .prize {
          height: 100%;
          padding-top: 568px;
          padding-left: 285px;
          background: url("../../../../../assets/img/activity/invite/prize.png")
            no-repeat 137px 495px;
          background-size: 476px 464px;
          .go {
            width: 180px;
            height: 245px;
            transition: all 5s;
            transform-origin: center 156px;
          }
        }
      }
    }
  }
  .rule {
    position: absolute;
    top: 43px;
    right: 0;
    width: 128px;
    height: 54px;
    line-height: 58px;
    text-align: center;
    background-color: #e23000;
    color: #ffffff;
    border-radius: 27px 0 0 27px;
    padding-left: 10px;
  }
  .tips {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    color: #fff;
  }
  .gift {
    width: 742px;
    height: 803px;
    background: url("../../../../../assets/img/activity/invite/gift.png")
      no-repeat;
    background-size: 100%;
    padding-top: 400px;
    text-align: center;
    p {
      font-size: 80px;
      color: #fff000;
      font-weight: 700;
      text-shadow: 0px 5px 2px rgba(0, 0, 0, 0.4);
    }
    .btn {
      width: 480px;
      height: 100px;
      line-height: 100px;
      border-radius: 50px;
      background: linear-gradient(to bottom, #f8d100, #fbdb01);
      border: none;
      color: #ff3b00;
      font-size: 36px;
      font-weight: 700;
      margin-top: 60px;
      box-shadow: 0px 3px 20px 5px #e5253b;
    }
  }
  .showGift,
  .showGrant {
    background-color: transparent;
    text-align: center;
    .van-icon-close {
      font-size: 72px;
      color: #fff;
      margin-top: 40px;
    }
  }
  .grant {
    width: 599px;
    height: 810px;
    background: url("../../../../../assets/img/activity/invite/grant.png")
      no-repeat;
    background-size: 100%;
    text-align: center;
    padding-top: 600px;
    .btn {
      width: 490px;
      height: 90px;
      line-height: 90px;
      border-radius: 45px;
      background: linear-gradient(to bottom, #ffe2a6, #fac368);
      border: none;
      color: #f04c26;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 40px;
      box-shadow: 0px 3px 20px 5px #a92321;
    }
    p {
      a {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
.van-toast {
  text-align: center;
}
</style>