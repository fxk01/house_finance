<template>
  <div class="harvest">
    <p class="tips">手气最佳！<br />恭喜获得国内双人旅游卡</p>
    <div class="image">
      <img
        src="../../../../../assets/img/activity/invite/travel.png"
        alt=""
      >
    </div>
    <div class="info">
      <h2>填写收件信息领取</h2>
      <div>
        <span>收货人</span>
        <input
          v-model="userName"
          type="text"
          placeholder="请填写收货人姓名"
        >
      </div>
      <div>
        <span>手机号码</span>
        <input
          v-model="userMobile"
          type="text"
          maxlength="11"
          placeholder="请填写收货人手机号"
        >
      </div>
      <div>
        <span>详细地址</span>
        <input
          v-model="address"
          type="text"
          placeholder="省市区县、乡镇、街道、楼牌号等"
        >
      </div>
    </div>
    <div class="submit">
      <van-button
        type="default"
        class="btn"
        @click="subUserInfo"
      >提交</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      userMobile: "",
      address: "",
      uToken: "",
      isHave:0
    };
  },
  created() {
    this.uToken = this.$cookie.get("token");
    this.$axios.fetchPost('/queryMyAddressInfo',{},this.uToken).then(res=>{
      this.isHave = res.data.length;
      if(this.isHave !== 0){
        this.userName = res.data[0].user_name;
        this.address = res.data[0].user_address;
        this.userMobile = res.data[0].user_phone;
      }
    })
  },
  methods: {
    subUserInfo() {
      let r = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/;
      if (!this.userName.trim()) {
        this.$toast("请输入正确的收货人姓名");
        return false;
      }

      if (!r.test(this.userMobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }

      if (!this.address.trim()) {
        this.$toast("请输入正确的收货地址");
        return false;
      }

      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask:true,
        loadingType: "spinner",
        // message: "正在提交.."
      });

      if(this.isHave !== 0){
        this.$axios
        .fetchPost(
          "/updateMyAddressInfo",
          {
            user_name: this.userName,
            user_phone: this.userMobile,
            user_address: this.address
          },
          this.uToken
        )
        .then(res => {
          toast.clear();
          if (res.code === "1") {
            this.$router.push("successPage");
          }
        });
      }else {
        this.$axios
        .fetchPost(
          "/saveUserAddressInfo",
          {
            user_name: this.userName,
            user_phone: this.userMobile,
            user_address: this.address
          },
          this.uToken
        )
        .then(res => {
          toast.clear();
          if (res.code === "1") {
            this.$router.push("successPage");
          }
        });
      }
      
    }
  },
  components: {
    Toast
  }
};
</script>
<style lang="less">
.harvest {
  height: 100%;
  background-color: #fff;
  .tips {
    color: #fd5501;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 58px;
    padding-top: 40px;
    padding-bottom: 30px;
  }
  .image {
    text-align: center;
    img {
      width: 306px;
      height: 177px;
    }
  }
  .info {
    margin-top: 100px;
    > h2 {
      text-align: center;
      font-size: 36px;
      line-height: 36px;
      margin-bottom: 80px;
    }
    > div {
      margin-bottom: 60px;
      padding-left: 38px;
      height: 82px;
      line-height: 82px;
      > input {
        width: 528px;
        padding-left: 24px;
        padding-right: 24px;
        border: 2px solid #d0d0d0;
        border-radius: 10px;
        font-size: 28px;
        &::placeholder {
          color: #d0d0d0;
        }
      }
      > span {
        display: inline-block;
        width: 130px;
        padding-right: 15px;
        font-size: 28px;
      }
    }
  }
  .submit {
    text-align: center;
    margin-top: 120px;
    .btn {
      width: 670px;
      height: 100px;
      line-height: 100px;
      font-size: 32px;
      color: #fff;
      border-radius: 50px;
      border: none;
      background: linear-gradient(to bottom, #fb8700, #fd5501);
      box-shadow: 0px 3px 20px 5px #fec9ae;
    }
  }
}
</style>