<template>
  <div id="houseAssess">
    <div
      class="select_city"
      v-if="!state"
    >
      <h2 class="sc_title">
        <i class="sct_icon">{{customData.selectCity.index}}</i>
        <span>{{customData.selectCity.text}}</span>
      </h2>
      <div class="sc_input">
        <van-field
          v-model="city"
          placeholder="请选择估值房产所在城市"
          input-align="left"
          readonly
          is-link
          @click="isShowArea = true"
        />
      </div>
    </div>
    <div class="select_house">
      <h2 class="sh_title">
        <i class="sht_icon">{{customData.selectHouse.index}}</i>
        <span>{{customData.selectHouse.text}}</span>
      </h2>
      <div
        class="sh_tips"
        v-show="city === '成都市'"
      >为使房产估值更加准确，我们采取了两种评估方式，请在下方左右两框选择您要找的楼盘</div>
      <div class="sh_search">
        <van-search
          placeholder="请输入楼盘名称"
          v-model="searchValue"
        />
      </div>
      <div
        class="sh_result"
        v-show="isOk"
      >
        <div class="shr_item">
          <h2
            class="title"
            v-show="city === '成都市'"
          >方式一</h2>
          <ul class="list">
            <li
              v-for="(item, index) in cityList"
              :key="index"
              @click="setCityName(item)"
              :class="{active:sl_id===item.ID}"
            >{{item.Name}}</li>
            <li
              class="spinner"
              v-show="spinner"
            >
              <van-loading type="spinner" />
            </li>
            <li
              class="list-none"
              v-show="cityList.length === 0 && spinner === false"
            >未找到结果，请换个关键字重新查询</li>
          </ul>
        </div>
        <div
          class="shr_item"
          v-show="city === '成都市'"
        >
          <h2 class="title">方式二</h2>
          <ul class="list">
            <li
              class="list-li"
              v-for="(item, index) in cityList2"
              :key="index"
              @click="setCityNameDC(item)"
              :class="{active:dc_id===item.ID}"
            >{{item.Name}}</li>
            <li
              class="spinner"
              v-show="spinner2"
            >
              <van-loading type="spinner" />
            </li>
            <li
              class="list-none"
              v-show="cityList2.length === 0 && spinner2 === false"
            >未找到结果，请换个关键字重新查询</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fill_house">
      <h2 class="fh_title">
        <i class="fht_icon">{{customData.fillHouse.index}}</i>
        <span>{{customData.fillHouse.text}}</span>
      </h2>
      <div class="fh_input">
        <van-cell-group>
          <van-field
            v-model="tower"
            placeholder="选择"
            label="楼栋"
            input-align="right"
            readonly
            is-link
            v-show="sl_name !== -1"
            @click="showHouses"
          />
          <van-field
            v-model="number"
            placeholder="选择"
            label="房号"
            input-align="right"
            readonly
            is-link
            v-show="sl_name !== -1"
            @click="showNum"
          />
          <van-field
            v-model="floor"
            placeholder="请输入楼层"
            label="所在楼层"
            input-align="right"
            v-show="city === '成都市' && dc_name !== -1"
            type="number"
          />
          <van-field
            v-model="area"
            placeholder="请输入面积"
            label="建筑面积（㎡）"
            input-align="right"
            type="number"
          />
          <van-field
            v-model="name"
            placeholder="请输入姓名"
            label="产权人姓名"
            input-align="right"
            v-if="!state"
          />
          <van-field
            v-model="mobile"
            placeholder="请输入手机号"
            label="产权人电话"
            input-align="right"
            maxlength="11"
            type="number"
            v-if="!state"
          />
        </van-cell-group>
      </div>
    </div>
    <div
      class="assess"
      v-if="!state"
    >
      <van-button
        type="default"
        class="quick-btn"
        @click="goResult"
        :class="{'none-btn':times === 0}"
        :disabled="times === 0"
      >极速评估</van-button>
      <van-button
        type="default"
        class="common-btn"
        @click="goLoad"
      >普通评估</van-button>
    </div>
    <div
      class="save_btn"
      v-else
    >
      <van-button
        type="default"
        class="confirm-btn"
        @click="goBack"
      >确定</van-button>
    </div>
    <!-- 选择城市框 -->
    <van-popup
      v-model="isShowArea"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        :columns-num="2"
        @cancel="isShowArea = false"
        @confirm="changeArea"
        :loading="loading1"
      />
    </van-popup>
    <!-- 选择楼栋框 -->
    <van-popup
      v-model="isShowHouses"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns1"
        value-key="Name"
        @cancel="isShowHouses = false"
        @confirm="changeHouses"
        :loading="loading2"
      />
    </van-popup>
    <!-- 选择房号框 -->
    <van-popup
      v-model="isShowNum"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns2"
        value-key="Name"
        @cancel="isShowNum = false"
        @confirm="changeNum"
        :loading="loading3"
      />
    </van-popup>
  </div>
</template>
<script>
import { Search, Area, Loading } from "vant";
export default {
  data() {
    return {
      searchValue: "",
      customData: {},
      city: "",
      isShowArea: false,
      isShowHouses: false,
      isShowNum: false,
      columns1: [],
      columns2: [],
      loading1: true,
      loading2: true,
      loading3: true,
      areaList: {},
      times: "", //估价次数
      tower: "",
      number: "",
      floor: "",
      area: "",
      name: "",
      mobile: "",
      timeID: null, // 定时器
      isOk: false,
      cityValue: [],
      cityList: [],
      spinner: false,
      cityList2: [],
      spinner2: false,
      sl_name: -1,
      dc_name: -1,
      sl_id: -1,
      dc_id: -1,
      houseInfo: {},
      numInfo: {},
      loction: "",
      state: false,
      code: ""
    };
  },
  created() {
    if (this.$route.name === "subOrderB") {
      this.state = true;
      this.city = this.$route.query.city;
      this.code = this.$route.query.cityCode;
      this.customData = {
        selectCity: {},
        selectHouse: {
          index: 1,
          text: "选择楼盘"
        },
        fillHouse: {
          index: 2,
          text: "填写楼盘资料"
        }
      };
    } else {
      this.state = false;
      this.customData = {
        selectCity: {
          index: 1,
          text: "选择城市"
        },
        selectHouse: {
          index: 2,
          text: "选择楼盘"
        },
        fillHouse: {
          index: 3,
          text: "填写楼盘资料"
        }
      };
    }

    this.$axios
      .fetchPost("/getCityList", {}, this.$cookie.get("token"))
      .then(res => {
        this.areaList = res.data;
        this.loading1 = false;
        this.times = res.count;
      });
  },
  activated() {
    this.city = this.$route.query.city;
    this.code = this.$route.query.cityCode;
    console.log(this.$store.state.home.houseData);
  },
  methods: {
    changeArea(value) {
      console.log(value);
      this.city = value[1].name;
      this.isShowArea = false;
      this.cityValue = value;
      this.code = value[1].code;
    },
    showHouses() {
      if (!this.sl_name) {
        this.$toast("请先选择楼盘");
        return;
      }
      this.isShowHouses = true;
    },
    showNum() {
      if (!this.tower) {
        this.$toast("请先选择楼栋");
        return;
      }
      this.isShowNum = true;
    },
    setCityName(v) {
      this.sl_name = v.Name;
      this.sl_id = v.ID;
      this.loading2 = true;
      this.$axios
        .fetchPost(
          "/getBuild",
          { constructionId: v.ID },
          this.$cookie.get("token")
        )
        .then(res => {
          if (res.data.length === 0) {
            this.columns1 = [{ Name: "无结果", isNull: true }];
          } else {
            this.columns1 = res.data;
          }
          this.loading2 = false;
        });
    },
    setCityNameDC(v) {
      console.log(v);
      this.dc_id = v.ID;
      this.dc_name = v.Name;
      this.loction = v.Loction;
    },
    changeHouses(v, i) {
      if (!v.isNull) {
        this.houseInfo = v;
        this.tower = this.houseInfo.Name;
        this.loading3 = true;
        this.$axios
          .fetchPost(
            "/getHouse",
            { buildingId: this.houseInfo.ID },
            this.$cookie.get("token")
          )
          .then(res => {
            if (res.data.length === 0) {
              this.columns2 = [{ Name: "无结果", isNull: true }];
            } else {
              this.columns2 = res.data;
            }
            this.loading3 = false;
          });
      }
      this.isShowHouses = false;
    },
    changeNum(v, i) {
      if (!v.isNull) {
        this.numInfo = v;
        this.number = this.numInfo.Name;
      }
      this.isShowNum = false;
    },
    goResult() {
      if (!this.myVerify()) {
        return;
      }
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: "正在评估.."
      });
      this.$axios
        .fetchPost(
          "/houseEvaluation",
          {
            city: this.city,
            cityId: this.code,
            houses_name: this.sl_name,
            buliding: this.tower,
            room_number: this.number,
            area: this.area,
            property_owner: this.name,
            property_owner_number: this.mobile,
            evaluation_type: "1",
            constructionId: String(this.sl_id),
            buildingId: String(this.houseInfo.ID),
            houseId: String(this.numInfo.ID),
            floor: this.floor,
            dcConstructionId: String(this.dc_id),
            dc_houses_name: this.dc_name,
            dc_address: this.loction
          },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          toast.clear();
          if (!res.data) {
            this.$toast(res.msg);
            return;
          }
          this.$store.commit("changeAssessData", res.data);
          this.$router.push({ name: "assessResult" });
        });
    },
    goLoad() {
      if (!this.myVerify()) {
        return;
      }
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: "正在评估.."
      });
      this.$axios
        .fetchPost(
          "/houseEvaluation",
          {
            city: this.city,
            cityId: this.code,
            houses_name: this.sl_name,
            buliding: this.tower,
            room_number: this.number,
            area: this.area,
            property_owner: this.name,
            property_owner_number: this.mobile,
            evaluation_type: "1",
            constructionId: String(this.sl_id),
            buildingId: this.houseInfo.ID ? String(this.houseInfo.ID) : -1,
            houseId: this.numInfo.ID ? String(this.numInfo.ID) : -1,
            floor: this.floor,
            dcConstructionId: String(this.dc_id),
            dc_houses_name: this.dc_name,
            dc_address: this.loction
          },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          toast.clear();
          this.$router.push({ name: "loading" });
        });
    },
    goBack() {
      if (this.sl_name === -1 && this.dc_name === -1) {
        this.$toast("请选择正确的楼盘名称");
        return false;
      } else if (!(this.sl_name === -1) && this.dc_name === -1) {
        if (!this.tower) {
          this.$toast("请选择正确的楼栋");
          return false;
        }
        if (!this.number) {
          this.$toast("请选择正确的房号");
          return false;
        }
      } else if (this.sl_name === -1 && !(this.dc_name === -1)) {
        if (!this.floor) {
          this.$toast("请输入正确的楼层");
          return false;
        }
      } else {
        if (!this.tower) {
          this.$toast("请选择正确的楼栋");
          return false;
        }
        if (!this.number) {
          this.$toast("请选择正确的房号");
          return false;
        }
        if (!this.floor) {
          this.$toast("请输入正确的楼层");
          return false;
        }
      }

      if (!this.area || this.area <= 0) {
        this.$toast("请输入正确的建筑面积");
        return false;
      }
      this.$store.commit("changeHouseData", {
        isReturn: true,
        dc_name: this.dc_name,
        sl_name: this.sl_name,
        tower: this.tower,
        number: this.number,
        floor: this.floor,
        area: this.area,
        sl_id: this.sl_id,
        dc_id: this.dc_id,
        loction: this.loction,
        houseInfo: this.houseInfo,
        numInfo: this.numInfo
      });
      //   this.$router.push({name:'subOrderA',params:{isReturn:true}});
      this.$router.back();
    },
    myVerify() {
      if (!this.city) {
        this.$toast("请选择正确的城市");
        return false;
      }
      if (this.sl_name === -1 && this.dc_name === -1) {
        this.$toast("请选择正确的楼盘名称");
        return false;
      } else if (!(this.sl_name === -1) && this.dc_name === -1) {
        if (!this.tower) {
          this.$toast("请选择正确的楼栋");
          return false;
        }
        if (!this.number) {
          this.$toast("请选择正确的房号");
          return false;
        }
      } else if (this.sl_name === -1 && !(this.dc_name === -1)) {
        if (!this.floor) {
          this.$toast("请输入正确的楼层");
          return false;
        }
      } else {
        if (!this.tower) {
          this.$toast("请选择正确的楼栋");
          return false;
        }
        if (!this.number) {
          this.$toast("请选择正确的房号");
          return false;
        }
        if (!this.floor) {
          this.$toast("请输入正确的楼层");
          return false;
        }
      }
      if (!this.area || this.area <= 0) {
        this.$toast("请输入正确的建筑面积");
        return false;
      }
      if (!this.name) {
        this.$toast("请输入正确的产权人姓名");
        return false;
      }
      let r = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      if (!r.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      return true;
    }
  },
  watch: {
    searchValue: function(newValue, oldValue) {
      this.cityList = [];
      this.cityList2 = [];
      this.numInfo = {};
      this.houseInfo = {};
      this.sl_name = -1;
      this.dc_name = -1;
      this.dc_id = -1;
      this.sl_id = -1;
      this.isOk = true;
      this.spinner = true;
      this.spinner2 = true;
      if (this.timeID !== null) {
        clearTimeout(this.timeID);
        this.timeID = null;
      }
      if (newValue === "") {
        this.isOk = false;
        return;
      }
      this.timeID = window.setTimeout(() => {
        this.$axios
          .fetchPost(
            "/getConstruction",
            { cityId: this.code, houses_name: this.searchValue },
            this.$cookie.get("token")
          )
          .then(res => {
            this.cityList = res.data;
            this.spinner = false;
          });
        if (this.city === "成都市") {
          this.$axios
            .fetchPost(
              "/getConstructionByDaCheng",
              {
                cityId: this.code,
                houses_name: this.searchValue
              },
              this.$cookie.get("token")
            )
            .then(res => {
              this.cityList2 = res.data;
              this.spinner2 = false;
            });
        }
      }, 800);
    },
    city: function(val) {
      this.searchValue = "";
    },
    sl_id: function(val) {
      this.tower = "";
    },
    tower: function(val) {
      this.number = "";
    }
  },
  components: {
    [Search.name]: Search,
    [Area.name]: Area,
    [Loading.name]: Loading
  }
};
</script>
<style lang="less">
#houseAssess {
  padding: 30px;
  background-color: #fff;
  min-height: 100vh;
  .select_city {
    .sc_title {
      display: flex;
      align-items: center;
      .sct_icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        line-height: 35px;
        text-align: center;
        background: linear-gradient(to bottom, #ff9014, #ff6b00);
        color: #fff;
        font-weight: normal;
        margin-right: 13px;
      }
      > span {
        font-size: 32px;
        line-height: 35px;
      }
    }
    .sc_input {
      margin: 30px 0 60px;
      .van-cell {
        height: 100px;
        line-height: 100px;
        border-bottom: 1px solid #e1e1e1;
        padding: 0;
        font-size: 24px;
        padding-left: 10px;

        .van-cell__title {
          max-width: 240px;
        }

        .van-cell__value {
          padding-right: 10px;
        }

        .van-icon {
          line-height: 100px;
        }
      }
    }
  }
  .select_house {
    .sh_title {
      display: flex;
      align-items: center;
      .sht_icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        line-height: 35px;
        text-align: center;
        background: linear-gradient(to bottom, #ff9014, #ff6b00);
        color: #fff;
        font-weight: normal;
        margin-right: 13px;
      }
      > span {
        font-size: 32px;
        line-height: 35px;
      }
    }
    .sh_tips {
      margin-top: 20px;
      line-height: 40px;
      color: #fe7827;
    }
    .sh_search {
      margin-top: 40px;
      .van-search {
        padding: 0;
        .van-search__content {
          border-radius: 32px;
          padding-left: 27px;
        }

        .van-field__body {
          > input {
            height: 64px;
            font-size: 24px;
          }
        }
        .van-icon-search {
          line-height: 66px;
          font-size: 32px;
        }
        .van-cell {
          padding: 0;
          padding-right: 20px;
        }
      }
    }
    .sh_result {
      display: flex;
      margin-top: 40px;
      border: 1px solid #e3e3e3;
      .shr_item {
        flex: 1;
        min-width: 0;
        .title {
          text-align: center;
          background-color: #f2f3f3;
          font-weight: normal;
          height: 56px;
          line-height: 56px;
        }
        .list {
          text-align: center;
          height: 325px;
          overflow-y: scroll;
          padding: 10px 0;
          li {
            height: 58px;
            line-height: 58px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding: 0 50px;
            &.spinner {
              height: 100%;
            }
            &.list-none {
              overflow: visible;
              white-space: normal;
              text-overflow: clip;
              height: auto;
              line-height: 40px;
            }
            .van-loading--spinner {
              margin: 0 auto;
              line-height: 325px;
            }
            &.active {
              background-color: #f79125;
              color: #fff;
            }
          }
        }
        &:nth-child(n + 2) {
          .title {
            border-left: 1px solid #e3e3e3;
          }
          .list {
            border-left: 1px solid #e3e3e3;
          }
        }
      }
    }
  }
  .fill_house {
    margin-top: 70px;
    .fh_title {
      display: flex;
      align-items: center;
      .fht_icon {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        line-height: 35px;
        text-align: center;
        background: linear-gradient(to bottom, #ff9014, #ff6b00);
        color: #fff;
        font-weight: normal;
        margin-right: 13px;
      }
      > span {
        font-size: 32px;
        line-height: 35px;
      }
    }
    .fh_input {
      margin: 30px 0 60px;
      .van-cell-group {
        // padding-left: 24px;
        // padding-right: 20px;

        &::after {
          border: none;
        }

        .van-cell {
          height: 100px;
          line-height: 100px;
          border-bottom: 1px solid #e1e1e1;
          padding: 0;
          font-size: 28px;

          .van-cell__title {
            max-width: 240px;
          }

          .van-cell__value {
            padding-right: 10px;
          }

          .van-icon {
            line-height: 100px;
          }
        }
      }
    }
  }
  .assess {
    // padding: 45px 20px;
    // background-color: #fff;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;

    .van-button {
      width: 330px;
      height: 80px;
      color: #fff;
      line-height: 80px;
      border-radius: 5px;
      font-size: 28px;
      border: none;
    }

    .quick-btn {
      background: linear-gradient(to right bottom, #ff8d00, #ff7600);
    }

    .common-btn {
      background: linear-gradient(to right bottom, #3eacf9, #1693ee);
    }
    .none-btn {
      background: #ccc;
      color: #fff;
    }
  }
  .save_btn {
    padding-bottom: 20px;
    .confirm-btn {
      width: 100%;
      height: 88px;
      line-height: 88px;
      color: #fff;
      font-size: 32px;
      text-align: center;
      background-color: #f79125;
    }
  }
}
</style>