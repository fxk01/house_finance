<template>
  <div class="per-list">
    <div class="flex flex-align-center flex-justify-center ft-item-div">
      <strong>下级名称</strong>
      <strong>下级人数</strong>
      <strong>提单总数</strong>
      <strong>放款总额(万)</strong>
      <strong>佣金总额(万)</strong>
    </div>

    <div v-for="(item, index) in partnerArr" :key="index">
      <ul class="flex flex-align-center ft-item-ul" v-on:click="subordinateDataFuc(item.pid, index)">
        <li class="width-96">{{item['userName']}}</li>
        <li class="width-96">{{item['partnerCount']}}</li>
        <li class="width-96">{{item['orderCount']}}</li>
        <li class="width-136">{{item['actualLoanAmount'] / 10000}}</li>
        <li class="width-136">
          <span class="vertical-align-middle">{{item['commissionAmount'] / 10000}}</span>
          &nbsp;
          <!-- <img v-if="item.userRole === 'A'" src="../assets/achievement/icon_yuan.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
          <img v-if="item.userRole === 'A+' || item.userRole === 'A-'" src="../assets/achievement/icon_one.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
          <img v-if="item.userRole === 'B'" src="../assets/achievement/icon_two.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
          <img v-if="item.userRole === 'B3'" src="../assets/achievement/icon_three.png" class="commission-icon" v-on:click.prevent="showDialogChi">
          <img v-if="item.userRole === 'C'" src="../assets/achievement/icon_fang2.png" class="commission-icon" v-on:click.prevent="showDialogChi">
          <img v-if="item.userRole === 'D'" src="../assets/achievement/icon_zhi2.png" class="commission-icon" v-on:click.prevent="showDialogChi"> -->
          <i v-on:click.prevent="showDialogChi" v-if="item.userRole === 'B' || item.userRole === 'B3'" class="commission-icon">纪</i>
          <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'C'" class="commission-icon">理</i>
          <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'A'" class="commission-icon">员</i>
          <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'A+' || item.userRole === 'A-'" class="commission-icon">顾</i>
          <i v-on:click.prevent="showDialogChi" v-else class="commission-icon">直</i>
        </li>
      </ul>

      <div ref="objLevel" :class="arrLevel.length === 0 ? '' : 'second-level'" :data-pid="item.pid" v-show="current === item.pid">
        <ul v-for="(item2, index2) in arrLevel" :key="index2" class="flex flex-align-center ft-item-ul ft-item-level">
          <li class="width-96">{{item2['userName']}}</li>
          <li class="width-96">{{item2['partnerCount']}}</li>
          <li class="width-96">{{item2['orderCount']}}</li>
          <li class="width-136">{{item2['actualLoanAmount'] / 10000}}</li>
          <li class="width-136">
            {{item2['commissionAmount'] / 10000}}
            <!-- <img v-if="item2.userRole === 'A'" src="../assets/achievement/icon_yuan.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
            <img v-if="item2.userRole === 'A+'" src="../assets/achievement/icon_one.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
            <img v-if="item2.userRole === 'B'" src="../assets/achievement/icon_two.jpg" class="commission-icon" v-on:click.prevent="showDialogChi">
            <img v-if="item2.userRole === 'B3'" src="../assets/achievement/icon_three.png" class="commission-icon" v-on:click.prevent="showDialogChi">
            <img v-if="item2.userRole === 'C'" src="../assets/achievement/icon_fang2.png" class="commission-icon" v-on:click.prevent="showDialogChi">
            <img v-if="item2.userRole === 'D'" src="../assets/achievement/icon_zhi2.png" class="commission-icon" v-on:click.prevent="showDialogChi"> -->
            <i v-on:click.prevent="showDialogChi" v-if="item.userRole === 'B' || item.userRole === 'B3'" class="commission-icon">纪</i>
            <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'C'" class="commission-icon">理</i>
            <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'A'" class="commission-icon">员</i>
            <i v-on:click.prevent="showDialogChi" v-else-if="item.userRole === 'A+' || item.userRole === 'A-'" class="commission-icon">顾</i>
            <i v-on:click.prevent="showDialogChi" v-else class="commission-icon">直</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/17
  */

  import * as achievementApi from '../page/User/Achievement/achievementApi';

  export default {
    props: ['partnerArr'],
    name: 'performanceList',
    data() {
      return {
        current: '',
        arrLevel: []
      }
    },
    methods: {
      showDialogChi() {
        this.$emit('showIconDescription')
      },
      subordinateDataFuc(pid, index) {
        this.arrLevel = [];
        if(this.current === pid) {
          this.current = null;
          this.arrLevel = [];
        } else {
          achievementApi.myPartnerNew({uid: pid}, this.$cookie.get('token')).then(res => {
            this.arrLevel = res.data['myPartners']
          });
          this.current = this.$refs.objLevel[index].dataset.pid;
        }
      }
    }
  }
</script>

<style lang="less">
  .per-list {
    background-color: #f6f6f7;
  }
  .ft-item-div {
    margin-top: 28px;
    strong {
      margin-right: 36px;
    }
    strong:last-child {
      margin-right: 0;
    }
  }
  .commission-icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-color: #0099ff;
    vertical-align: middle;
    border-radius: 50%;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    line-height: 32px;
  }
  .commission-icon2 {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: #0099ff;
    vertical-align: middle;
    border-radius: 50%;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    line-height: 36px;
  }
  .ft-item-ul {
    margin: 38px 23px 0 23px;
    li {
      text-align: center;
      word-wrap:break-word
    }
    li:first-child {
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    li:last-child {
      margin-right: 0;
      text-align: right;
    }
  }
  .second-level ul:first-child {
    margin-top: 0;
  }
  .second-level {
    background-color: #ffffff;
    padding: 24px 0 24px 20px;
    margin-top: 38px;
    min-height: 80px;
    max-height: 400px;
    overflow: scroll;
  }
</style>
