<template>
  <div id="Aresult">
    <div class="result">
      <div class="content">
        <div class="info">
            <h2 class="title">房产信息</h2>
          <van-cell-group>
            <van-field
              v-model="site"
              label="房产地址"
              readonly
              input-align="right"
            />
            <van-field
              v-model="area"
              label="房产面积"
              readonly
              input-align="right"
            />
          </van-cell-group>
        </div>
        <div class="score">
            <h2 class="title">估值结果</h2>
          <van-cell-group>
            <van-field
              v-model="singleP"
              label="单价"
              readonly
              input-align="right"
            />
            <van-field
              v-model="sumP"
              label="总价"
              readonly
              input-align="right"
            />
          </van-cell-group>
        </div>
        <div class="sum">
            <span>房产估值</span>
            <p>{{price}}<span> 万</span></p>
        </div>
      </div>
      <p class="tips">温馨提示：房产估值仅供参考，实际可贷金额以批复金额为准</p>
    </div>
    <div class="enter">
        <!-- <van-button type="default" class="btn1" @click="subOrder">我要提单</van-button>
        <van-button type="default" class="btn2" @click="shareOrder">继续提交共享订单</van-button> -->
        <van-button type="default" class="btn3" @click="goHome">返回首页</van-button>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            site:'',
            area:'',
            singleP:'',
            sumP:'',
            price:'',
        }
    },
    created(){
        let data = this.$store.state.home.assessData;
        console.log(data)
        this.site = data.houseAddress;
        this.area = data.houseArea + '㎡';
        this.singleP = data.unitPrice + ' 元';
        this.sumP = data.totalPrice + ' 元';
        this.price = (data.loanableAmount / 10000).toFixed(2);
    },
    methods:{
        goHome(){
            this.$router.push("/");
        },
        subOrder(){
            this.$router.push('/subOrderA/1');
        },
        shareOrder(){
            this.$router.push('/shareOrder');
        }
    }

};
</script>
<style lang="less" src="./assessResult.less">
</style>