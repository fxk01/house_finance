<template>
  <div id="rank">
    <div class="banner">
      <span>2019年6月18日-2019年7月18日</span>
    </div>
    <div
      class="userInfo"
      v-if="uToken"
    >
      <div class="userRank">
        <span
            class="d-number"
            v-if="userRank.i === 1"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no1.png"
              alt=""
            >
          </span>
          <span
            class="d-number"
            v-else-if="userRank.i === 2"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no2.png"
              alt=""
            >
          </span>
          <span
            class="d-number"
            v-else-if="userRank.i === 3"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no3.png"
              alt=""
            >
          </span>
        <span
          v-else
          class="d-number"
          :class="{'d-none':userRank.i==='未上榜'}"
        >{{userRank.i}}</span>
        <img
          class="d-photo"
          :src="userRank.vx_headimg"
          alt=""
        >
        <span class="d-name">{{userRank.vx_nickname}}</span>
        <span class="d-invite">邀请 <i class="d-sum">{{userRank.realInvatieCount}}</i> 人</span>
      </div>
      <div class="bgImg"></div>
    </div>
    <div class="detail">
      <ul class="list">
        <li
          v-for="(item, index) in rankList"
          :key="item.i"
        >
          <span
            class="d-number"
            v-if="item.i === 1"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no1.png"
              alt=""
            >
          </span>
          <span
            class="d-number"
            v-else-if="item.i === 2"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no2.png"
              alt=""
            >
          </span>
          <span
            class="d-number"
            v-else-if="item.i === 3"
          >
            <img
              class="d-num"
              src="../../../../../assets/img/activity/invite/no3.png"
              alt=""
            >
          </span>
          <span
            v-else
            class="d-number"
          >{{item.i}}</span>
          <img
            class="d-photo"
            :src="item.vx_headimg"
            alt=""
          >
          <span class="d-name">{{item.vx_nickname}}</span>
          <span class="d-invite">邀请 <i class="d-sum">{{item.realInvatieCount}}</i> 人</span>
        </li>
      </ul>
    </div>
    <div class="more">
      <van-button
        class="btn"
        type="default"
        @click="guidUserShockList"
      >邀请更多好友赚现金</van-button>
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
export default {
  data() {
    return {
      rankList: [],
      userRank: {},
      uToken: "",
      popOne: false,
      popTwo: false,
      content: "",
      index:0
    };
  },
  created() {
    this.uToken = this.$cookie.get("token");
    this.$axios
      .fetchPost("/getRankingList", {}, this.uToken ? this.uToken : "")
      .then(res => {
        if (this.uToken) {
          this.userRank = res.data.pop();
        }
        this.rankList = res.data;
      });
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
#rank {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .banner {
    background: url('../../../../../assets/img/activity/invite/rank_banner.png') no-repeat;
    height: 273px;
    background-size: 100% 100%;
    padding-left: 30px;
    padding-top: 165px;
    span {
      font-size: 28px;
      color: #c3c9fd;
    }
  }
  .userInfo {
    .userRank {
      padding: 0 28px;
      display: flex;
      align-items: center;
      height: 142px;
      .d-num {
        width: 47px;
        height: 63px;
      }
      .d-number {
        width: 90px;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
      }
      .d-none {
        font-size: 28px;
      }
      .d-photo {
        width: 92px;
        height: 92px;
        border-radius: 50%;
        margin: 0 28px;
      }
      .d-name {
        font-size: 32px;
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000;
      }
      .d-invite {
        flex: 1;
        text-align: right;
        font-size: 24px;
        color: #797d89;
        .d-sum {
          font-size: 56px;
          font-weight: 700;
          color: #7547e3;
        }
      }
    }
    .bgImg {
      height: 20px;
      background-color: #f5f5f5;
    }
  }
  .detail {
    flex: 1;
    overflow-y: scroll;
    .list {
      padding: 0 28px;
      li {
        display: flex;
        align-items: center;
        height: 142px;
        &:not(:last-child) {
          border-bottom: 2px solid #efefef;
        }
        .d-num {
          width: 47px;
          height: 63px;
        }
        .d-number {
          width: 90px;
          text-align: center;
          font-size: 36px;
          font-weight: 700;
        }

        .d-photo {
          width: 92px;
          height: 92px;
          border-radius: 50%;
          margin: 0 28px;
        }
        .d-name {
          font-size: 32px;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #000;
        }
        .d-invite {
          flex: 1;
          text-align: right;
          font-size: 24px;
          color: #797d89;
          .d-sum {
            font-size: 56px;
            font-weight: 700;
            color: #7547e3;
          }
        }
      }
    }
  }
  .more {
    text-align: center;
    padding: 25px 0;
    .btn {
      width: 692px;
      height: 100px;
      background: linear-gradient(to bottom, #527bef, #7547e3);
      border-radius: 50px;
      border: none;
      line-height: 100px;
      color: #fff;
      font-size: 32px;
      box-shadow: 0px 3px 20px 5px #b7abd4;
    }
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