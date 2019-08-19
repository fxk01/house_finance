<template>
  <div class="location">
    <div class="cur-city">
      <div>
        <img
          src="../../../../assets/img/home/city.png"
          alt=""
        >
        <span>当前城市</span>
      </div>
      <i>{{currentCity}}</i>
    </div>
    <div class="cur-text">
      <p>请选择您要修改的城市</p>
      <span>当前业务覆盖城市如下，若您不在覆盖城市范围，可选择其他</span>
    </div>
    <ul class="lists">
      <li
        v-for="(item, index) in cityList"
        :key="index"
      >
        <span
          :class="{active:item.city_name === currentCity}"
          @click="changeCity(item.city_name,item.city_code)"
        >{{item.city_name}}</span>
      </li>
    </ul>
    <van-button
      type="default"
      @click="setCity"
    >确 定</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [],
      currentCity: "",
      currentCode: ""
    };
  },
  created() {
    this.$axios.fetchPost('/getSelectCityList',{},this.$cookie.get('token')).then(res=>{
        console.log(res);
        this.cityList = res.data;
      })
    // this.cityList = [
    //   {
    //     cCode: "5101",
    //     cName: "成都市",
    //     pCode: "51",
    //     pName: "四川省"
    //   },
    //   {
    //     cCode: "3201",
    //     cName: "南京市",
    //     pCode: "32",
    //     pName: "江苏省"
    //   },
    //   {
    //     cCode: "3701",
    //     cName: "济南市",
    //     pCode: "37",
    //     pName: "山东省"
    //   },
    //   {
    //     cCode: "4201",
    //     cName: "武汉市",
    //     pCode: "42",
    //     pName: "湖北省"
    //   },
    //   {
    //     cCode: "3205",
    //     cName: "苏州市",
    //     pCode: "32",
    //     pName: "江苏省"
    //   },
    //   {
    //     cCode: "3702",
    //     cName: "青岛市",
    //     pCode: "37",
    //     pName: "山东省"
    //   },
    //   // {
    //   //   cCode: "12",
    //   //   cName: "天津市",
    //   //   pCode: "12",
    //   //   pName: "天津市"
    //   // },
    //   {
    //     cCode: "78",
    //     cName: "其他",
    //     pCode: "78",
    //     pName: "其他"
    //   }
    // ];
    this.currentCity = this.$cookie.get("city");
    this.currentCode = this.$cookie.get("cityCode");
  },
  methods: {
    changeCity(v, v2) {
      this.currentCity = v;
      this.currentCode = v2;
    },
    setCity() {
      this.$cookie.set("city", this.currentCity);
      this.$cookie.set("isSelectCity", true);
      this.$cookie.set("cityCode", this.currentCode);
      this.$axios
        .fetchPost(
          "/selectCity",
          { city: this.currentCode },
          this.$cookie.get("token")
        )
        .then(res => {
          if(res.code === '1'){
              this.$router.back();
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.location {
  width: 100%;
  height: 100%;
  background-color: #fff;
  text-align: center;
  .lists {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.3%;
      text-align: center;
      padding: 20px 30px;
      span {
        display: block;
        height: 70px;
        line-height: 70px;
        background-color: #f3f1f2;
        border-radius: 6px;
        &.active {
          color: #fff;
          background-color: #fe8301;
        }
      }
    }
  }
  .van-button {
    width: 94%;
    background-color: #ff8500;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    font-size: 28px;
    margin-top: 30px;
    border-radius: 5px;
    margin-bottom: 50px;
  }
  .cur-city {
    display: flex;
    justify-content: space-between;
    height: 102px;
    margin: 0 24px;
    align-items: center;
    color: #000;
    border-bottom: 1px solid #d9d9d9;
    img {
      width: 45px;
      height: 42px;
      margin-right: 10px;
    }
    span {
      font-size: 28px;
      vertical-align: sub;
    }
    i {
      font-size: 32px;
      font-weight: 700;
    }
  }
  .cur-text {
    margin: 0 24px;
    text-align: left;
    padding: 30px 0;
    p {
      font-size: 30px;
      color: #000;
      margin-bottom: 8px;
    }
    span {
      color: #8c8c8c;
      font-size: 24px;
    }
  }
}
</style>