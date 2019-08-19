<template>
  <div class="share-order">
    <div class="header">
      您提交的订单（借款人：{{userName}}）已被拒件，请先完成项目简介和征信情况，平台审核通过后，系统将推送此订单到共享订单池。
    </div>
    <div class="my-info">
      <h2 class="info-title">
        <img src="../../../assets/img/home/my.png" alt="">
        我的提单信息
      </h2>
      <van-cell-group>
        <van-field
          v-model="userName"
          label="借款联系人"
          readonly
          class="bb"
        />
        <van-field
          v-model="userMobile"
          label="借款人手机号码"
          readonly
          class="bb"
        />
        <van-field
          v-model="userPrice"
          label="拟借款金额"
          readonly
          class="bb"
        />
        <van-field
          v-model="userDate"
          label="拟借款期限"
          readonly
          class="bb"
        />
        <van-field
          v-model="userAddress"
          label="房产地址"
          readonly
          class="bb"
        />
      </van-cell-group>
    </div>
    <div class="assess" v-if="false">
      <h2 class="info-title">
        <img src="../../../assets/img/home/guzhi.png" alt="">
        房产估值
      </h2>
      <van-collapse
        accordion
        @change="houseAssess"
      >
        <van-collapse-item
          title="现在去估值"
          class="house"
        >
        </van-collapse-item>

      </van-collapse>
    </div>
    <div class="project">
      <h2 class="info-title">
        <img src="../../../assets/img/home/jianjie.png" alt="">
        项目简介
      </h2>
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="（选填）请简单描述借款项目。
示例：借款人是私营企业主，拟用本人名下住宅一套申请抵押贷款，用于企业生产经营。"
          rows="1"
          class="bb"
        />
      </van-cell-group>
    </div>
    <div class="credit">
      <h2 class="info-title">
        <img src="../../../assets/img/home/xinyo.png" alt="">
        征信情况
      </h2>
      <div class="condition">
        <div class="item">
          <div class="item-title">
            <img src="../../../assets/img/home/yuqi.png" alt="">
            近12个月贷款逾期情况
          </div>
          <div class="item-content">
            <van-cell
              title="逾期笔数"
              is-link
              arrow-direction="down"
              :value="myArray[0]"
              @click="selects(0)"
            />
            <van-cell
              title="最高逾期月数"
              is-link
              arrow-direction="down"
              :value="myArray[1]"
              @click="selects(1)"
            />
            <van-cell
              title="累计逾期次数"
              is-link
              arrow-direction="down"
              :value="myArray[2]"
              @click="selects(2)"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../../assets/img/home/yuqigl.png" alt="">
            近12个月信用卡逾期情况
          </div>
          <div class="item-content">
            <van-cell
              title="逾期笔数"
              is-link
              arrow-direction="down"
              :value="myArray[3]"
              @click="selects(3)"
            />
            <van-cell
              title="最高逾期月数"
              is-link
              arrow-direction="down"
              :value="myArray[4]"
              @click="selects(4)"
            />
            <van-cell
              title="累计逾期次数"
              is-link
              arrow-direction="down"
              :value="myArray[5]"
              @click="selects(5)"
            />
          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../../assets/img/home/chaxun.png" alt="">
            征信查询情况
          </div>
          <div class="item-content">
            <van-cell
              title="近 1 个月查询次数"
              is-link
              arrow-direction="down"
              :value="myArray[6]"
              @click="selects(6)"
            />
            <van-cell
              title="近 3 个月查询次数"
              is-link
              arrow-direction="down"
              :value="myArray[7]"
              @click="selects(7)"
            />
            <van-cell
              title="近 6 个月查询次数"
              is-link
              arrow-direction="down"
              :value="myArray[8]"
              @click="selects(8)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="sub-order">
      <van-button
        size="large"
        @click="subShareOrder"
      >提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</van-button>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import {  Cell, CellGroup, Dialog, Toast } from "vant";

export default {
  data() {
    return {
      userName: "",
      userMobile: "",
      userPrice: "",
      userDate: "",
      userAddress: "",
      message: "",
      columns: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      show: false,
      myArray: ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      index: "",
      order_no:''
    };
  },
  created() {
    // 获取订单信息
    this.$axios
      .fetchPost(
        "/getOrderInfo",
        { pid: this.$route.params.pid },
        this.$cookie.get("token")
      )
      .then(res => {
        console.log(res);
        this.order_no = res.data.order_no;
        this.userName = res.data.borrower_name;
        this.userMobile = res.data.borrower_mobile_number;
        this.userPrice = res.data.loan_amount + " 万元";
        this.userDate = res.data.borrowing_period + " 个月";
        this.userAddress = res.data.hourse_address;
      });
  },
  methods: {
    houseAssess() {
      console.log(123);
      Dialog.alert({
        title: "温馨提示",
        message: "功能完善中,敬请期待!"
      }).then(() => {
        // on close
      });
    },
    selects(i) {
      this.index = i;
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    onConfirm(v, i) {
      this.myArray[this.index] = v;
      this.show = false;
    },
    subShareOrder() {
      this.$axios
        .fetchPost(
          "/handleShareOrder",
          {
            project_desc: this.message,
            loc: this.myArray[0],
            lmom: this.myArray[1],
            lcof: this.myArray[2],
            coc: this.myArray[3],
            cmom: this.myArray[4],
            ccof: this.myArray[5],
            recent1: this.myArray[6],
            recent2: this.myArray[7],
            recent3: this.myArray[8],
            fk_order_id: this.$route.params.pid,
            borrower_name: this.userName,
            borrower_mobile_number: this.userMobile,
            loan_amount: parseInt(this.userPrice),
            borrowing_period: parseInt(this.userDate),
            order_no:this.order_no
          },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          if(res.code == 1){
            Toast.success('提交共享订单成功');
            setTimeout(()=>{
              this.$router.push({name:'homePage'});
            },100)
          }
        });
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [Toast.name]:Toast
  }
};
</script>
<style lang="less" src="./shareOrder.less">
</style>
