<template>
  
  <div id="proBrief">
    <van-tabs v-model="active" color="#ff7c12"  :line-width='60' :line-height='2' @click="getTitle">
      <van-tab :title="item.p_name" v-for="(item, index) in productList" :key="index">
        <div class="merit">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/cup@2x.png" alt="">
            </i>
            <span>产品优势</span>
          </div>
          <div class="content-bar">
            <ul class="flex-ul">
              <li v-for="(item2, index) in item.p_selling_point" :key="index">
                <img :src="item2.api_path" alt="">
                <p>{{item2.content}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="info">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/item@2x.png" alt="">
            </i>
            <span>产品介绍</span>
          </div>
          <div class="content-bar" v-html="item.p_introduction_txt">
          </div>
        </div>
        <div class="enter">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/house@2x.png" alt="">
            </i>
            <span>准入条件</span>
          </div>
          <div class="content-bar" v-html="item.p_access_criteria">
          </div>
        </div>
        <div class="data">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/data@2x.png" alt="">
            </i>
            <span>申请资料</span>
          </div>
          <div class="content-bar" v-html="item.p_apply">
          </div>
        </div>
        <div class="flow">
          <div class="title-bar">
            <i>
              <img src="../../../assets/img/home/flow@2x.png" alt="">
            </i>
            <span>业务流程</span>
            <img class="vip" src="../../../assets/img/home/vip.jpg" alt="">
          </div>
          <div class="content-bar">
            <img width="97%" :src="item.p_flow.api_path" alt="">
          </div>
        </div>
        <div class="tips">
          ————&nbsp;&nbsp;&nbsp;中国山东高速金融集团(00412.HK)旗下品牌&nbsp;&nbsp;&nbsp;————
        </div>
        <div class="order">
          <van-button type="default" @click="subOrder">我要提单</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Dialog,Toast,Tab, Tabs } from "vant";
export default {
  data() {
    return {
      p_selling_point: [],
      p_open_city: "",
      p_access_criteria: {},
      p_flow: {},
      pid: "",
      imgSrc:'',
      active:0,
      productList:[],
      product:'',
    };
  },
  created() {
    this.pid = this.$route.params.id;
    this.$axios.fetchPost('/getProductList2',{city:this.$cookie.get('city')?this.$cookie.get('city'):'其他'}).then(res=>{
      // console.log(res);
      res.data.forEach((v,i)=>{
        v.p_selling_point = JSON.parse(v.p_selling_point);
        v.p_flow = JSON.parse(v.p_flow);
        if(this.pid === v.pid){
          this.active = i;
          this.product = v.p_name;
        }
      })
      this.productList = res.data;
    })
  },
  methods: {
    subOrder() {
      if(!this.$cookie.get('token')){
        Toast('请先登录');
        this.$router.push({name:'login'});
        return;
      }
      if(this.$cookie.get("isAuth") === null){
        Toast('请先登录');
        this.$router.push({name:'login'});
        return;
      }
      if (!JSON.parse(this.$cookie.get("isAuth"))) {
        Dialog.confirm({
          title: "温馨提示",
          message: "实名认证才能提单，现在去认证？"
        })
          .then(() => {
            // on confirm
            this.$router.push('/user/cash/certification?opType=1');
            return;
          })
          .catch(() => {
            // on cancel
            return;
          });
      }else {
        this.$router.push({name:'subOrderA',query:{index:this.active,product:this.product}});
      }
    },
    getTitle(i,v){
      this.product = v;
    }
  },
  components: {
    [Dialog.name]: Dialog,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>
<style lang="less" src="./productBrief.less"></style>
