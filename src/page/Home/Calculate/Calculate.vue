<template>
  <div class="calculate">
    <div class="bor-info">
      <h2 class="info-title jiekuai">
        <img
          src="../../../assets/img/home/jiekuai.png"
          alt=""
        >
        借款信息
      </h2>
      <van-cell-group>
        <van-field
          v-model="formData.price"
          placeholder="请输入"
          label="借款金额"
          class="bb b-price must"
          type="number"
          @input="inputPrice"
        />
        <van-field
          v-model="formData.date"
          placeholder="请输入"
          label="借款期限"
          class="bb b-date must"
          @input="inputDate"
          type="number"
        />
        <van-field
          v-model="formData.rate"
          placeholder="年化综合成本包含放款手续费"
          label="综合成本"
          @change="inputRate"
          class="bb b-rate must"
          type="number"
        />
        <van-field
          v-model="formData.serveC"
          label="放款手续费"
          class="bb must"
          icon="arrow-down"
          readonly
          @click="selectSum(1)"
        />
        <van-field
          v-model="formData.way"
          placeholder="按月付息、到期还本"
          label="还款方式"
          class="bb b-way must"
          readonly
        />
        <van-field
          v-model="formData.loan"
          placeholder="请选择"
          label="放款日期"
          class="bb b-loan must"
          icon="notes-o"
          readonly
          @click="selectDate(1)"
        />
        <van-field
          v-model="formData.repay"
          label="还款日"
          class="bb b-way must"
          icon="arrow-down"
          readonly
          @click="selectDay"
        />
        <van-field
          v-model="formData.beforeLoan"
          placeholder="请选择"
          label="提前还款日期"
          class="bb b-loan"
          icon="notes-o"
          readonly
          @click="selectDate(2)"
          :disabled="isSuccess"
        />
        <van-field
          v-model="formData.penal"
          label="提前还款违约金"
          class="bb b-way"
          icon="arrow-down"
          :disabled="isSuccess"
          @click="selectSum(2)"
        />
      </van-cell-group>

    </div>
    <div class="plan">
      <h2 class="info-title jihua">
        <img
          src="../../../assets/img/home/jihua.png"
          alt=""
        >
        还款计划表
      </h2>
      <div class="p-table">
        <table>
          <thead>
            <tr>
              <td>序号</td>
              <td>应还日期</td>
              <td>应还金额</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in repayList"
              :key="item.index"
            >
              <td>{{item.index == repayList.length? '': item.index}}</td>
              <td>{{item.repay_date}}</td>
              <td>{{item.repay_amount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="hint">
      * 温馨提示：还款计划表仅供参考，实际以合同为准
    </div>
    <div class="btn">
      <van-button
        size="large"
        @click="backHome"
      >返回首页</van-button>
    </div>
    <van-popup
      v-model="showDay"
      position="bottom"
    >
      <van-picker
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        show-toolbar
      />
    </van-popup>
    <van-popup
      v-model="showSum"
      position="bottom"
    >
      <van-picker
        :columns="columns2"
        @cancel="onCancel2"
        @confirm="onConfirm2"
        show-toolbar
      />
    </van-popup>
    <van-popup
      v-model="showDate"
      position="bottom"
    >
      <van-datetime-picker
        :min-date="currentDate"
        type="date"
        @confirm="onConfirmDate"
        @cancel="onCancelDate"
      />
    </van-popup>
    <van-popup
      v-model="showDate2"
      position="bottom"
    >
      <van-datetime-picker
        :min-date="supDate"
        type="date"
        @confirm="onConfirmDate2"
        cancel-button-text="重置"
        @cancel="onCancelDate2"
      />
    </van-popup>
  </div>
</template>
<script>
import moment from "moment";
import { clearInterval, setInterval } from "timers";

export default {
  data() {
    return {
      formData: {
        price: "",
        date: "",
        rate: "",
        way: "按月付息、到期还本",
        loan: "",
        beforeLoan: "",
        repay: "放款对应日还款",
        penal: "0%",
        serveC: "0%"
      },
      showDay: false,
      showSum: false,
      showDate: false,
      showDate2: false,
      columns: ["放款对应日还款", "每月固定还款"],
      columns2: ["0%", "1%", "2%", "3%"],
      index: "",
      currentDate: new Date(),
      times: null,
      columnsIndex: 0,
      repayList: [],
      isSuccess: true,
      supDate:''
    };
  },
  created() {},
  methods: {
    backHome() {
      this.$router.push("/");
    },
    selectDay() {
      this.showDay = true;
    },
    selectSum(index) {
      this.index = index;
      this.showSum = true;
    },
    selectDate(index) {
      this.index = index;
      if(this.index == 1){
        this.showDate = true;
      }else if(this.index == 2){
        this.showDate2 = true;
      }
    },
    onCancel() {
      this.showDay = false;
    },
    onConfirm(value, index) {
      this.columnsIndex = index;
      this.formData.repay = value;
      this.showDay = false;
    },
    onCancelDate() {
      this.showDate = false;
    },
    onConfirmDate2(value){
      this.formData.beforeLoan = moment(value).format("YYYY-MM-DD");
      this.showDate2 = false;
    },
    onCancelDate2(){
      this.formData.beforeLoan = '';
      this.showDate2 = false;
    },
    onConfirmDate(value) {
      this.supDate = value;
      this.formData.loan = moment(value).format("YYYY-MM-DD");
      this.showDate = false;
    },
    onCancel2() {
      this.showSum = false;
    },
    onConfirm2(value) {
      if (this.index === 1) {
        this.formData.serveC = value;
      } else if (this.index === 2) {
        this.formData.penal = value;
      }
      this.showSum = false;
    },
    inputPrice() {
      if (this.formData.price == "") return;
      this.formData.price = parseInt(this.formData.price);
      if (this.formData.price < 1) {
        this.formData.price = 1;
      } else if (this.formData.price > 1000) {
        this.formData.price = 1000;
      }
    },
    inputDate() {
      if (this.formData.date == "") return;
      this.formData.date = parseInt(this.formData.date);
      if (this.formData.date < 1) {
        this.formData.date = 1;
      } else if (this.formData.date > 36) {
        this.formData.date = 36;
      }
    },
    inputRate() {
      if (this.formData.rate == "") return;
      if (this.formData.rate < 6) {
        this.formData.rate = 6;
      } else if (this.formData.rate > 24) {
        this.formData.rate = 24;
      }
      this.formData.rate = this.toDecimal2(this.formData.rate);
    },
    toDecimal2(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s;
    },
    getDataList(date,rate) {
      let newRate = rate;
      if(this.isSuccess){
        newRate = '';
      }
      if (
        this.formData.price !== "" &&
        this.formData.date !== "" &&
        this.formData.rate !== "" &&
        this.formData.loan !== ""
      ) {
        this.$axios
          .fetchPost("/repayBudget", {
            borrow_amount: this.formData.price,
            borrow_term: this.formData.date,
            loan_charge: this.formData.serveC,
            repay_way: 0,
            loan_date: this.formData.loan,
            composite_cost: this.formData.rate,
            repay_date: this.columnsIndex,
            pre_repay_date:date,
            pre_repay_rate:newRate
          })
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.repayList = res.data;
              this.isSuccess = false;
            }
          });
      } else {
        console.log(123);
      }
    }
  },
  watch: {
    formData: {
      handler:function(){
        this.getDataList(this.formData.beforeLoan,this.formData.penal)
      },
      deep:true
    }
  },
  components: {
  }
};
</script>
<style lang="less" src="./calculate.less">
</style>