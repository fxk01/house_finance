<template>
  <div class="friend">
    <div class="income">
      <p class="text1">累计获得邀请奖励</p>
      <p class="text2">¥ <span>{{inviteInfo.reward}}</span>&nbsp;
        <van-icon
          @click="warning"
          class="warning"
          name="warning-o"
        />
      </p>
      <p class="text3">累计邀请好友{{inviteInfo.total}}人，其中{{inviteInfo.isReg}}人帮你拿到奖励<br />{{inviteInfo.tips}}</p>
    </div>
    <div class="tabs">
      <van-tabs
        v-model="active"
        title-active-color="#504fd0"
        title-inactive-color="#333"
        type="card"
        color="#fff"
        background="#f5f5f5"
      >
        <van-tab title="邀请成功好友">
          <img
            v-if="isInvite.length === 0"
            class="none"
            src="../../../../../assets/img/activity/invite/none.png"
            alt=""
          >
          <ul
            v-else
            class="list"
          >
            <li
              v-for="(item, index) in isInvite"
              :key="index"
            >
              <div class="left">
                <img
                  :src="item.vx_headimg"
                  alt=""
                >
              </div>
              <div class="right">
                <span class="nickname">{{item.vx_nickname}}</span>
                <p class="tips">注册于{{item.create_time | showTime}} 已实名认证</p>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="邀请在路上好友">
          <img
            v-if="unInvite.length === 0"
            class="none"
            src="../../../../../assets/img/activity/invite/none.png"
            alt=""
          >
          <ul
            v-else
            class="list"
          >
            <li
              v-for="(item, index) in unInvite"
              :key="index"
            >
              <div class="left">
                <img
                  :src="item.vx_headimg"
                  alt=""
                >
              </div>
              <div class="right">
                <span class="nickname">{{item.vx_nickname}}</span>
                <p class="tips">{{item.isReg === '0'? '未注册' : '已注册'}}，未实名</p>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <div class="invite">
      <p>邀请成功和邀请在路上好友均指当前活动哟</p>
      <van-button
        type="default"
        class="btn"
        @click="guidUserShockList"
      >立即邀请</van-button>
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
  </div>
</template>

<script>
import { Tab, Tabs, Dialog } from "vant";
import moment from "moment";
export default {
  data() {
    return {
      active: 0,
      uToken: "",
      inviteInfo: {},
      isInvite: [],
      unInvite: [],
      popOne:false,
      popTwo:false,
      content: "",
      index:0
    };
  },
  components: {
    Tab,
    Tabs,
    Dialog
  },
  created() {
    this.uToken = this.$cookie.get("token");
    this.$axios.fetchPost("/getUserInviteInfo", {}, this.uToken).then(res => {
      this.inviteInfo = res.data;
    });
    this.$axios
      .fetchPost("/getUserInviteList", { status: 1 }, this.uToken)
      .then(res => {
        this.isInvite = res.data;
      });
    this.$axios
      .fetchPost("/getUserInviteList", { status: 0 }, this.uToken)
      .then(res => {
        this.unInvite = res.data;
      });
  },
  filters: {
    showTime: function(value) {
      return moment(value).format("YYYY-MM-DD");
    }
  },
  methods: {
    warning() {
      Dialog.alert({
        message: "奖励以活动结束后实际发放到账的金额为准",
        confirmButtonText:'知道了'
      }).then(() => {
        // on close
      });
    },
    guidUserShockList() {
        if(!this.uToken) {
            this.$toast('请先登录');
            this.$router.push({name:'login'});
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
.friend {
  height: 100%;
  background-color: #fff;
  // display: flex;
  // flex-direction: column;
  padding-top: 360px;
  padding-bottom: 190px;
  .income {
    height: 360px;
    background: linear-gradient(to right top, #7547e3, #5379ef);
    text-align: center;
    padding-top: 60px;
    color: #fff;
    margin-top: -360px;
    .text1 {
      font-size: 28px;
    }
    .text2 {
      margin: 30px 0;
      font-size: 68px;
      position: relative;
      .warning {
        position: absolute;
        font-size: 40px;
      }
      span {
        font-family: 'Alternate';
      }
    }
    .text3 {
      color: #d1cff8;
      font-size: 24px;
    }
  }
  .tabs {
    // flex: 1;
    height: 100%;
    .van-tabs--card {
      padding-top: 90px;
      height: 100%;
      .van-tabs__wrap {
        height: 90px;
        .van-tabs__nav {
          height: 90px;
          margin: 0;
          border: none;
          .van-tab {
            line-height: 90px;
            font-size: 28px;
            font-weight: 700;
          }
        }
      }
      .van-tabs__content {
        height: 100%;
        .none {
          width: 629px;
          height: 464px;
          display: block;
          margin: 45px auto 0;
        }
        .list {
          padding: 0 30px;
          li {
            display: flex;
            margin-top: 40px;
            .left {
              margin-right: 30px;
              img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              .nickname {
                font-size: 32px;
                font-weight: 700;
                color: #000;
              }
              .tips {
                font-size: 24px;
                color: #797d89;
              }
            }
          }
        }
        .van-tab__pane {
          overflow-y: scroll;
          height: 100%;
        }
      }
    }
  }
  .invite {
    text-align: center;
    height: 190px;
    padding-top: 20px;
    margin-bottom: -190px;
    p {
      color: #797d89;
      font-size: 24px;
      margin-bottom: 16px;
    }
    .btn {
      width: 690px;
      height: 100px;
      border: none;
      color: #fff;
      line-height: 100px;
      border-radius: 50px;
      font-size: 32px;
      background: linear-gradient(to bottom, #527bef, #7547e3);
      box-shadow: 0px 3px 20px 5px #b7abd4;
    }
  }
}
.van-dialog {
  border-radius: 20px;
  width: 600px;
  .van-dialog__content {
    border-bottom: 2px solid #ebedf0;
    .van-dialog__message {
      padding: 50px 30px;
      font-size: 32px;
      line-height: 50px;
    }
  }
  .van-hairline--top::after {
    border: none;
  }
  .van-button__text {
    font-size: 32px;
  }
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
</style>