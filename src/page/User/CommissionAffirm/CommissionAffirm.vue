<template>
  <div class="affirm">
    <div class="date">*温馨提示：7天内没有点击确认，系统7天后自动确认</div>  
    <div
      class="a_item"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="item_price item">
        <div class="left">
          <img
            class="bag"
            src="../../../assets/img/userPage/bag.png"
            alt=""
          >
          <span>佣金</span>
        </div>
        <div class="right">{{item.commission_amount}} 元</div>
      </div>
      <div class="item_number item">
        <div class="left">收款账号</div>
        <div class="right">{{item.bank_no_fmt}}</div>
      </div>
      <div class="item_bank item">
        <div class="left">开户行</div>
        <div class="right">{{item.bank_name}}</div>
      </div>
      <button
        class="btn"
        @click="commissionConfirm(item.pid,item.commission_amount)"
      >确认收款</button>
    </div>
    <div class="tips" v-show="list.length === 0">暂时没有佣金发放记录</div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      uToken: "",
      list: []
    };
  },
  created() {
    this.uToken = this.$cookie.get("token");
    this.getCommissionConfirmList();
  },
  methods: {
    commissionConfirm(id, com) {
      Dialog.confirm({
        message: "是否已收到该笔佣金"
      })
        .then(() => {
          // on confirm
          this.$axios
            .fetchPost(
              "/commissionConfirm",
              { fk_commission_id: id, commission_amount: com },
              this.uToken
            )
            .then(res => {
              if (res.code === "1") {
                this.$toast(res.msg);
                this.getCommissionConfirmList();
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    getCommissionConfirmList() {
      this.$axios
        .fetchPost("/getCommissionConfirmList", {}, this.uToken)
        .then(res => {
          this.list = res.data;
        });
    }
  },
  components: {
    Dialog
  }
};
</script>
<style lang="less">
.affirm {
  padding: 16px 30px;
  background-color: #f3f3f3;
  .a_item {
    background-color: #fff;
    padding: 34px 36px;
    border-radius: 10px;
    &:not(:last-child) {
      margin-bottom: 18px;
    }
    .item {
      display: flex;
      justify-content: space-between;
    }
    .item_price {
      margin-bottom: 44px;
      .left {
        .bag {
          width: 29px;
          height: 34px;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 30px;
          font-weight: bold;
          color: #ff880e;
        }
      }
      .right {
        font-size: 32px;
        font-weight: bold;
      }
    }
    .item_number {
      margin-bottom: 24px;
      .left {
        font-size: 24px;
        color: #666666;
      }
      .right {
        font-size: 30px;
      }
    }
    .item_bank {
      margin-bottom: 40px;
      .left {
        font-size: 24px;
        color: #666666;
      }
      .right {
        font-size: 24px;
      }
    }
    .btn {
      width: 100%;
      height: 88px;
      line-height: 88px;
      border-radius: 44px;
      border: none;
      background-color: #ff8906;
      color: #fff;
      font-size: 32px;
      font-weight: 500;
      text-align: center;
    }
  }
  .tips {
      text-align: center;
      padding-top: 50px;
  }
  .date {
      font-size: 24px;
      color: #000;
      margin-bottom: 20px;
      background-color: #fffbe8;
      color: #ed6a0c;
      margin: -16px -30px 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
  }
}
.van-dialog {
  border-radius: 10px;
  .van-dialog__message {
    font-size: 28px;
  }
}
</style>