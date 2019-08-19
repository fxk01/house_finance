<template>
  <div id="houseAssess">
    <van-cell-group>
      <van-field
        v-model="city"
        placeholder="请选择"
        label="城市"
        input-align="right"
        readonly
        is-link
        @click="showArea"
      />
      <van-field
        v-model="cityName"
        placeholder="请输入楼盘名称"
        label="楼盘名称"
        input-align="right"
        readonly
        is-link
        @click="goSearch"
      />
      <van-field
        v-model="tower"
        placeholder="选择"
        label="楼栋"
        input-align="right"
        readonly
        is-link
        @click="showHouses"
      />
      <van-field
        v-model="number"
        placeholder="选择"
        label="房号"
        input-align="right"
        readonly
        is-link
        @click="showNum"
      />
      <van-field
        v-model="floor"
        placeholder="请输入"
        label="所在楼层"
        input-align="right"
        v-if="city === '成都市'"
        type="number"
      />
      <van-field
        v-model="area"
        placeholder="请输入"
        label="建筑面积（㎡）"
        input-align="right"
        type="number"
      />
      <van-field
        v-model="name"
        placeholder="请输入姓名"
        label="产权人姓名"
        input-align="right"
      />
      <van-field
        v-model="mobile"
        placeholder="请输入手机号"
        label="产权人电话"
        input-align="right"
        maxlength="11"
        type="number"
      />
    </van-cell-group>
    <div class="assess">
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
    <div class="rule">
      <h2>房产评估使用规则</h2>
      <div>1、完成以下任务可新增极速评估的资格</div>
      <p>a.完成实名认证，赠送每个月5次免费极速评房服务；</p>
      <p>b.提单成功后，赠送5次免费极速评房服务；</p>
      <p>c.放款成功后，赠送10次免费极速评房服务。</p>
      <div>2、普通评估不设使用次数，工作日10分钟内反馈结果</div>
    </div>
    <van-popup
      v-model="isShowArea"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        :columns-num="2"
        @cancel="closeArea"
        @confirm="changeArea"
        :loading="loading1"
      />
    </van-popup>
    <van-popup
      class="search"
      v-model="isSearch"
      position="right"
      :overlay="false"
    >
      <div id="searchPage">
        <h2>请选择楼盘</h2>
        <form action="/">
          <van-search
            v-model="searchValue"
            placeholder="请输入楼盘名称"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div
              slot="action"
              @click="closeSearch"
            >取消</div>
          </van-search>
        </form>
        <van-button
          class="cancelBtn"
          type="button"
          @click="onSearch"
        >搜 索</van-button>
        <ul
          v-if="isOk"
          class="list"
        >
          <li
            v-for="(item) in cityList"
            :key="item.ID"
            @click="setCityName(item)"
          >{{item.Name}}</li>
          
          <van-button class="againBtn" v-if="cityList.length === 0 && city === '成都市'" @click="showDCS" type="info">重新查询</van-button>
          <p v-if="cityList.length === 0 && city !== '成都市'">很抱歉，没有查询出结果</p>
        </ul>
      </div>
    </van-popup>
    <van-popup
      class="search"
      v-model="isSearchDC"
      position="right"
      :overlay="false"
    >
      <div id="searchPage">
        <h2>请再次选择您要找的楼盘</h2>
        <form action="/">
          <van-search
            v-model="searchValueDC"
            placeholder="请输入楼盘名称"
            show-action
            shape="round"
            @search="onSearchDC"
          >
            <div
              slot="action"
              @click="closeSearchDC"
            >取消</div>
          </van-search>
        </form>
        <van-button
          class="cancelBtn"
          type="button"
          @click="onSearchDC"
        >搜 索</van-button>
        <ul
          v-if="isOkDC"
          class="list"
        >
          <li
            v-for="(item) in cityListDC"
            :key="item.ID"
            @click="setCityNameDC(item)"
          >{{item.Name}}</li>
          <p v-show="cityListDC.length === 0">很抱歉，没有查询出结果</p>
          <!-- <van-button type="info">重新查询</van-button> -->
        </ul>
      </div>
    </van-popup>
    <van-popup
      v-model="isShowHouses"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns1"
        @cancel="closeHouses"
        @confirm="changeHouses"
        :loading="loading2"
      />
    </van-popup>
    <van-popup
      v-model="isShowNum"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns2"
        @cancel="closeNum"
        @confirm="changeNum"
        :loading="loading3"
      />
    </van-popup>
  </div>
</template>
<script>
import { Area, Search } from "vant";
export default {
  data() {
    return {
      city: "",
      cityName: "",
      tower: "",
      number: "",
      area: "",
      name: "",
      mobile: "",
      isShowArea: false,
      areaList: {},
      cityValue: [],
      isSearch: false,
      searchValue: "",
      cityList: [],
      isOk: false,
      housesId: "", //楼盘id
      isShowHouses: false,
      columns1: [],
      indexArray: [],
      isShowNum: false,
      columns2: [],
      indexArray2: [],
      buildingId: "", //楼栋id
      numId: "", //房号id
      times: "", //估价次数
      loading1: true,
      loading2: true,
      loading3: true,
      floor: "",
      Loction: "",
      dcConstructionId:'', //大成楼盘id
      dc_houses_name:'', //大成楼盘名称,
      isSearchDC:false,
      searchValueDC:'',
      isOkDC:false,
      cityListDC:[],
      houseName:'',
    };
  },
  created() {
    this.$axios
      .fetchPost("/getCityList", {}, this.$cookie.get("token"))
      .then(res => {
        this.areaList = res.data;
        this.loading1 = false;
        this.times = res.count;
        console.log(res);
        // if(this.times <= 0){
        //     this.$toast('您的急速评估次数不足，可以使用普通评估或完成任务获取更多次数');
        // }
      });
  },
  methods: {
    showArea() {
      this.isShowArea = true;
    },
    showDCS(){
      this.isSearchDC = true;
    },
    closeArea() {
      this.isShowArea = false;
    },
    changeArea(value) {
      console.log(value);
      this.city = value[1].name;
      this.isShowArea = false;
      this.cityValue = value;
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
      if (this.city !== "成都市") {
        this.$axios
          .fetchPost(
            "/houseEvaluation",
            {
              province: this.cityValue[0].name,
              city: this.city,
              cityId: this.cityValue[1].code,
              houses_name: this.houseName,
              buliding: this.tower,
              room_number: this.number,
              area: this.area,
              property_owner: this.name,
              property_owner_number: this.mobile,
              evaluation_type: '1',
              constructionId: String(this.housesId),
              buildingId: String(this.buildingId),
              houseId: String(this.numId)
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
      } else {
        this.$axios
          .fetchPost(
            "/houseEvaluation",
            {
              floor: this.floor,
              province: this.cityValue[0].name,
              city: this.city,
              cityId: this.cityValue[1].code,
              houses_name: this.houseName,
              buliding: this.tower,
              room_number: this.number,
              area: this.area,
              property_owner: this.name,
              property_owner_number: this.mobile,
              evaluation_type: '1',
              constructionId: String(this.housesId),
              buildingId: String(this.buildingId),
              houseId: String(this.numId),
              dcConstructionId: String(this.dcConstructionId),
              dc_houses_name: this.dc_houses_name,
              dc_address: this.Loction
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
            // res.data.houseAddress = this.Loction || this.cityName;
            this.$store.commit("changeAssessData", res.data);
            this.$router.push({ name: "assessResult" });
          });
      }
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
      if (this.city !== "成都市") {
        this.$axios
          .fetchPost(
            "/houseEvaluation",
            {
              province: this.cityValue[0].name,
              city: this.city,
              cityId: this.cityValue[1].code,
              houses_name: this.houseName,
              buliding: this.tower,
              room_number: this.number,
              area: this.area,
              property_owner: this.name,
              property_owner_number: this.mobile,
              evaluation_type: '2',
              constructionId: String(this.housesId),
              buildingId: String(this.buildingId),
              houseId: String(this.numId),
              provinceId: this.cityValue[0].code
            },
            this.$cookie.get("token")
          )
          .then(res => {
            console.log(res);
            toast.clear();
            this.$router.push({ name: "loading" });
          });
      } else {
        this.$axios
          .fetchPost(
            "/houseEvaluation",
            {
              evaluation_type: '2',
              provinceId: this.cityValue[0].code,
              floor: this.floor,
              province: this.cityValue[0].name,
              city: this.city,
              cityId: this.cityValue[1].code,
              houses_name: this.houseName,
              buliding: this.tower,
              room_number: this.number,
              area: this.area,
              property_owner: this.name,
              property_owner_number: this.mobile,
              constructionId: String(this.housesId),
              buildingId: String(this.buildingId),
              houseId: String(this.numId),
              dcConstructionId: String(this.dcConstructionId),
              dc_houses_name: this.dc_houses_name,
              dc_address: this.Loction
            },
            this.$cookie.get("token")
          )
          .then(res => {
            console.log(res);
            toast.clear();
            this.$router.push({ name: "loading" });
          });
      }
    },
    goSearch() {
      if (!this.city) {
        this.$toast("请先选择城市");
        return;
      }
      // this.$router.push({name:'searchPage',params:{id:this.cityValue[1].code},query:{name:123}});
      this.isSearch = true;
    },
    closeSearch() {
      this.isSearch = false;
    },
    closeSearchDC() {
      this.isSearch = false;
      this.isSearchDC = false;
    },
    onSearch() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: "正在查询.."
      });
      this.$axios
        .fetchPost(
          "/getConstruction",
          { cityId: this.cityValue[1].code, houses_name: this.searchValue },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          this.cityList = res.data;
          toast.clear();
          this.isOk = true;
        });
    },
    onSearchDC(){
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        message: "正在查询.."
      });
      this.$axios
        .fetchPost(
          "/getConstructionByDaCheng",
          { cityId: this.cityValue[1].code, houses_name: this.searchValueDC },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          this.cityListDC = res.data;
          toast.clear();
          this.isOkDC = true;
        });
    },
    setCityName(v) {
      
      this.houseName = v.Name;
      this.housesId = v.ID;
      
      if (this.city === "成都市") {
        // this.Loction = v.Loction;
        // return;
        this.isSearchDC = true;
      }else {
        this.closeSearch();
        this.cityName = v.Name;
      }
      this.loading2 = true;
      this.$axios
        .fetchPost(
          "/getBuild",
          { constructionId: v.ID },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          let housesArr = [];
          let indexArr = [];
          res.data.forEach(v => {
            housesArr.push(v.Name);
            indexArr.push(v.ID);
          });
          console.log(housesArr);
          console.log(indexArr);
          this.columns1 = housesArr;
          this.loading2 = false;
          this.indexArray = indexArr;
        });
    },
    setCityNameDC(v){
      this.dcConstructionId = v.ID;
      this.dc_houses_name = v.Name;
      this.Loction = v.Loction;
      this.cityName = v.Name;
      this.closeSearchDC();
    },
    showHouses() {
      if (!this.cityName) {
        this.$toast("请先选择楼盘名称");
        return;
      }
      this.isShowHouses = true;
    },
    closeHouses() {
      this.isShowHouses = false;
    },
    changeHouses(v, i) {
      this.loading3 = true;
      console.log(v, i);
      this.tower = v;
      this.buildingId = this.indexArray[i];
      this.closeHouses();
      this.$axios
        .fetchPost(
          "/getHouse",
          { buildingId: this.buildingId },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          let housesArr = [];
          let indexArr = [];
          res.data.forEach(v => {
            housesArr.push(v.Name);
            indexArr.push(v.ID);
          });
          console.log(housesArr);
          console.log(indexArr);
          this.columns2 = housesArr;
          this.loading3 = false;
          this.indexArray2 = indexArr;
        });
    },
    showNum() {
      if (!this.tower) {
        this.$toast("请先选择楼栋");
        return;
      }
      this.isShowNum = true;
    },
    closeNum() {
      this.isShowNum = false;
    },
    changeNum(v, i) {
      console.log(v, i);
      this.number = v;
      this.numId = this.indexArray2[i];
      this.closeNum();
    },
    myVerify() {
      if (!this.city) {
        this.$toast("请选择正确的城市");
        return false;
      }
      if (!this.cityName) {
        this.$toast("请选择正确的楼盘名称");
        return false;
      }
      if (!this.tower) {
        this.$toast("请选择正确的楼栋");
        return false;
      }
      if (!this.number) {
        this.$toast("请选择正确的房号");
        return false;
      }
      if(this.city === '成都市'){
        if (!this.floor) {
          this.$toast("请输入正确的楼层");
          return false;
        }
      }
      console.log(this.area);
      if (!this.area || this.area == 0) {
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
    },
  },
  components: {
    [Area.name]: Area,
    [Search.name]: Search
  }
};
</script>
<style lang="less" src="./assessPage.less">
</style>