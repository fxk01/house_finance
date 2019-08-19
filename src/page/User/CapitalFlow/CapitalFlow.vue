<template>
  <div class="capitalFlow">
    <span class="capitalFlow-right" v-on:click="screeningCommission">筛选</span>
    <drop-list :config="configData" ref="droplist"></drop-list>

    <header>
      <span>{{getFullYear}}年{{getMonth}}月</span>
      <img src="../../../assets/img/capital/xl.png" class="capitalFlow-down" v-on:click.prevent="selectDateShow">

      <div class="flex flex-align-center flex-justify-start capitalFlow-info-wrap">
        <p class="flex-1">
          佣金总收入
          <strong>&nbsp;￥{{capitalData['earnings']}}</strong>
        </p>
        <p class="flex-1">
          佣金提现
          <strong>&nbsp;￥{{capitalData['withdraw']}}</strong>
        </p>
      </div>
    </header>

    <main>
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        height="500"
        noDataText="没有更多数据"
        ref="capitalFlowScroller"
        class="capitalFlow-scroller"
      >
        <ul class="capitalFlow-ul-wrap">
          <li v-for="(item, index) in capitalData['capitalFlow']" :key="index">
            <div class="flex flex-align-center flex-justify-between">
              <div class="flex flex-align-center">
                <p class="capitalFlow-cash"><img :src="transTypeImg(item)" class="qian"></p>
                <p class="color-666" v-html="transTypeText(item)"></p>
              </div>
              <strong :class="classStylePrice(item)">{{item['add_or_subtract']}}{{item['trans_amount']}}元</strong>
            </div>

            <div class="flex flex-align-center flex-justify-between">
              <p class="color-666">{{item['trans_date']}}</p>
              <p class="color-666">{{item['withdraw_req_status']}}</p>
            </div>
          </li>
        </ul>
      </scroller>
    </main>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="true"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :formatter="formatter"
        @cancel="onCancelDate"
        @confirm="selectDate"
      />
    </van-popup>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/25
  */
  import * as capitalFlowApi from './capitalFlowApi';
  import DropList from 'vue-droplist'

  export default {
    name: 'CapitalFlow',
    components: {
      DropList
    },
    data() {
      return {
        getFullYear: new Date().getFullYear(),
        getMonth: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
        show: false,
        minHour: 10,
        maxHour: 20,
        minDate: new Date(2018, 12, 1),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date(),
        configData : {
          position: {  // 设置显示位置，position
            top: '',
            right: '',
            bottom: '',
            left: ''
          },
          list: [ // 设置下拉列表数据和对应的点击事件
            {text: '全部', action: this.allInfo},
            {text: '佣金收入', action: this.commissionInfo},
            {text: '佣金提现', action: this.withdrawalInfo}
          ]
        },
        capitalData: {
          capitalFlow: [],
        },
        list: [],
        page: 0,
        total: true,
        transTypeStr: ''
      }
    },
    methods: {
      transTypeText(item) {
        switch(item['trans_type']) {
          case 1001:
            return '佣金收入';
          case 1002:
            return '佣金提现';
          case 1003:
            return '佣金提现冻结';
          case 1004:
            return '佣金提现解冻';
          case 1005:
            return '奖励';
          default:
        }
      },
      transTypeImg(item) {
        switch(item['trans_type']) {
          case 1001:
            return require('../../../assets/img/capital/zhanghuyue.png');
          case 1002:
            return require('../../../assets/img/capital/qian.png');
          case 1003:
            return require('../../../assets/img/capital/dongjie.png');
          case 1004:
            return require('../../../assets/img/capital/dongjie.png');
          case 1005:
            return require('../../../assets/img/capital/qian.png');
          default:
        }
      },
      classStylePrice(item) {
        return {
          'color-247811': item['add_or_subtract'] === '-' && item['trans_type'] !== 1003 && item['trans_type'] !== 1004,
          'color-d51717': item['add_or_subtract'] === '+' && item['trans_type'] !== 1003 && item['trans_type'] !== 1004,
          'color-666': item['trans_type'] === 1003 || item['trans_type'] === 1004,
        }
      },
      allInfo() {
        this.postCapitalFlow('');
      },
      commissionInfo() {
        this.postCapitalFlow('1001');
      },
      withdrawalInfo() {
        this.postCapitalFlow('1002');
      },
      refresh(done) {
        this.page = 1;
        if(this.getFullYear === '') {
          this.$toast({
            message: '日期不能为空！'
          });
          done();
          return false;
        }
        capitalFlowApi.capitalFlow({transType: this.transTypeStr, transDate: this.getFullYear + '-' + this.getMonth, start: 1}, this.$cookie.get('token')).then(res => {
          if(Object.getOwnPropertyNames(res.data).length !== 0) {
            Object.assign(this.capitalData, res.data);
          } else {
            this.capitalData = {
              capitalFlow: [],
              total: 0
            }
          }
          if(done !== undefined) {
            done();
          }
        });
      },
      capitalFlowPushData(json) {
        json.data['capitalFlow'].forEach((item) => {
          this.capitalData.capitalFlow.push(item);
        });
        Object.assign(this.capitalData, {
          current: json.data['current'],
          total: json.data['total'],
          withdraw: json.data['withdraw'],
          earnings: json.data['earnings'],
        });
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.capitalData.capitalFlow.length >= this.capitalData.total) {
          this.$refs.capitalFlowScroller.finishInfinite({
            isNoMoreData: true
          });
          return;
        }
        capitalFlowApi.capitalFlow({transType: this.transTypeStr, transDate: this.getFullYear + '-' + this.getMonth, start: ++this.page}, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            let dataLeg = Object.getOwnPropertyNames(res.data).length;
            dataLeg === 0 || res.data['capitalFlow'].length === 0 ? Object.assign(this.capitalData, {
              capitalFlow: [],
              total: 0
            }, res.data) : this.capitalFlowPushData(res);
          }
          done()
        });
      },
      postCapitalFlow(str) {
        if(this.getFullYear === '') {
          this.$toast({
            message: '日期不能为空！'
          });
        } else {
          this.transTypeStr = str;
          this.refresh()
        }
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      selectDateShow() {
        this.show = !this.show;
      },
      screeningCommission() {
        this.$refs.droplist.show()
      },
      /*
       确定日期
       */
      selectDate(index) {
        this.show = !this.show;
        let month = new Date(index).getMonth();
        this.getFullYear = new Date(index).getFullYear();
        if(month + 1 < 10) {
          this.getMonth = '0' + (new Date(index).getMonth() + 1);
        } else {
          this.getMonth = new Date(index).getMonth() + 1;
        }
        this.postCapitalFlow('');
      },
      onCancelDate() {
        this.show = !this.show;
      }
    }
  }
</script>

<style lang="less" src="./capitalFlow.less"></style>
