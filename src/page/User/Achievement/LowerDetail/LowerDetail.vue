<template>
  <div class="lowerDetail">
    <div class="lowerDetail-hed">
      <header class="flex flex-align-center">
        <p class="mr-33">统计时间</p>
        <van-field v-model="startTimeValue" v-on:focus="startTimeFuc('start')" readonly/>
        <span class="cl-7f7f7f">&nbsp;—&nbsp;</span>
        <van-field v-model="endTimeValue" v-on:focus="startTimeFuc('end')" readonly/>
        <van-button type="default" class="screen-but" v-on:click="showTerm">筛选</van-button>
      </header>

      <div class="flex flex-align-center">
        <p class="mr-33">下级名称</p>
        <van-field class="junior-name" v-model="value"/>
        <van-button type="default" class="confirm-but" v-on:click="downCallback()">确定</van-button>
      </div>
    </div>

    <div ref="LowerMescroll" class="mescroll" v-bind:style="{height: lowerDetailHg}">
      <div ref="LowerScroll" id="scrollWrap">
        <performanceList
          @showIconDescription="showIconDescription"
          v-bind:partnerArr="arr"
        />
      </div>
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="false"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="onCancelDate"
        @confirm="selectDate"
      />
    </van-popup>

    <van-dialog
      v-model="show2"
      title="图标说明"
      :show-confirm-button="false"
      :show-cancel-button="false"
      block
    >
      <ul class="dialog-ul">
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_fang2.png" class="commission-icon2"> -->
          <i class="commission-icon2">理</i>
          <p>房金经理</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_zhi2.png" class="commission-icon2"> -->
          <i class="commission-icon2">直</i>
          <p>直营经纪人</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">员</i>
          <p>公司员工</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">顾</i>
          <p>房金顾问</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <!-- <img src="../../../assets/achievement/icon_yuan2.jpg" class="commission-icon2"> -->
          <i class="commission-icon2">纪</i>
          <p>房金经纪人</p>
        </li>
      </ul>

      <van-button type="default" class="icon-but" v-on:click="showIconDescription">知道了</van-button>
    </van-dialog>

    <div class="deployment-screen" v-if="term">
      <div class="flex flex-align-center">
        <img src="../../../../assets/achievement/px.png" class="icon-px">
        <p class="ft-32">&nbsp;&nbsp;排序</p>
      </div>

      <ul class="sort-wrap">
        <li v-bind:class="{'sort-bg':1 === sortBg}" v-on:click="selectScreen(1, 'sub_low_to_high')">下级人数由低到高</li>
        <li v-bind:class="{'sort-bg':2 === sortBg}" v-on:click="selectScreen(2, 'sub_high_to_low')">下级人数由高到低</li>
        <li v-bind:class="{'sort-bg':3 === sortBg}" v-on:click="selectScreen(3, 'loan_amount_low_to_high')">放款金额由低到高</li>
        <li v-bind:class="{'sort-bg':4 === sortBg}" v-on:click="selectScreen(4, 'loan_amount_high_to_low')">放款金额由高到低</li>
      </ul>

      <div class="flex flex-align-center">
        <img src="../../../../assets/achievement/fl.png" class="icon-fl">
        <p class="ft-32">&nbsp;&nbsp;分类</p>
      </div>

      <ul class="sort-wrap2">
        <li v-bind:class="{'sort-bg2':1 === sortBg2}" v-on:click="selectScreen2(1, 'A')">公司员工</li>
        <li v-bind:class="{'sort-bg2':2 === sortBg2}" v-on:click="selectScreen2(2, 'A+')">一级经纪人</li>
        <li v-bind:class="{'sort-bg2':3 === sortBg2}" v-on:click="selectScreen2(3, 'B')">二级经纪人</li>
      </ul>
    </div>

    <div class="van-overlay2" v-if="term" v-on:click="showTerm"></div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/15
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css'
  import * as achievementApi from '../achievementApi';
  import performanceList from '../../../../components/performanceList';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'LowerDetail',
    components: {
      performanceList,
    },
    data() {
      return {
        // v-bind:style="{top: this.isPc() ? pcTop : moveTop}"
        // pcTop: '4.34667rem',
        // moveTop: '3.08rem',
        lowerDetailHg: 'auto',
        show2: false,
        startTimeValue: '',
        endTimeValue: '',
        show: false,
        minDate: new Date(2018, 12 ,1),
        value: '',
        currentDate: new Date(),
        statusTime: '',
        dialogStatus: false,
        arr: [],
        page: 0,
        total: true,
        term: false,
        sort: '',
        sortBg: '',
        sortBg2: '',
        category: ''
      }
    },
    mounted() {
      this.lowerDetailHg = this.isPc('lowerDetail');

      this.LowerMescroll = new MeScroll(this.$refs.LowerMescroll, {
        down: {
          auto: false,
          callback: this.downCallback,
        },
        up: {
          auto: true,
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">— 已经到底部了 —</p>',
          loadFull: {
            use: false,
            delay: 500
          }
        },
      });
    },
    methods: {
      showIconDescription() {
        this.show2 = !this.show2;
      },
      onCancelDate() {
        this.show = false;
      },
      selectDate(value) {
        let time = new Date(value);
        let month = new Date(value).getMonth();
        let getDate = new Date(value).getDate();
        let getMonth;
        let getDay;
        let final;
        this.show = false;

        if(month + 1 < 10) {
          getMonth = '0' + (new Date(value).getMonth() + 1);
        } else {
          getMonth = new Date(value).getMonth() + 1;
        }

        if(getDate < 10) {
          getDay = '0' + getDate;
        } else {
          getDay = getDate;
        }
        final = time.getFullYear() + '-' + getMonth + '-' + getDay;
        if(this.statusTime === 'start') {
          this.startTimeValue = final;
        } else {
          this.endTimeValue = final;
        }
        this.postTimePartnerNew();
      },
      postTimePartnerNew() {
        let status = new Date(this.startTimeValue).getTime() > new Date(this.endTimeValue).getTime();
        if(status) {
          this.$toast({
            message: '起始时间不能大于结束时间'
          });
        } else if(this.startTimeValue !== '' && this.endTimeValue !== '' && !status) {
          this.downCallback();
        }
      },
      startTimeFuc(str) {
        this.statusTime = str;
        this.show = true;
      },
      selectScreen(num, str) {
        if(this.sort === str) {
          this.sortBg = '';
          this.sort = '';
        } else {
          this.sortBg = num;
          this.sort = str;
        }
        this.showTerm();
        this.downCallback()
      },
      selectScreen2(num, str) {
        if(this.category === str) {
          this.sortBg2 = '';
          this.category = '';
        } else {
          this.sortBg2 = num;
          this.category = str;
        }
        this.showTerm();
        this.downCallback()
      },
      showTerm() {
        this.term = !this.term
      },
      downCallback() {
        achievementApi.myPartnerNew({
          start: 1,
          startDate: this.startTimeValue,
          endDate: this.endTimeValue,
          user_name: this.value,
          sort: this.sort,
          category: this.category,
          subordinate: 1
        }, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['myPartners'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.LowerMescroll.endUpScroll(true);
              this.LowerMescroll.endSuccess();
            } else {
              this.LowerMescroll.endSuccess(res.data['myPartners'].length, true);
            }
            if(this.$refs.LowerScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.LowerMescroll.triggerUpScroll();
            }
          })
        });
      },
      upCallback() {
        achievementApi.myPartnerNew({
          start: ++this.page,
          startDate: this.startTimeValue,
          endDate: this.endTimeValue,
          user_name: this.value,
          sort: this.sort,
          category: this.category,
          subordinate: 1
        }, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['myPartners'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            if(this.arr.length > 10 && this.sort === 'sub_low_to_high') {
              function lowToHigh(a, b){
                return a.partnerCount - b.partnerCount
              }
              this.arr.sort(lowToHigh);
            }

            if(this.arr.length > 10 && this.sort === 'sub_high_to_low') {
              function highToLow(a, b){
                return b.partnerCount - a.partnerCount
              }
              this.arr.sort(highToLow);
            }

            if(this.arr.length > 10 && this.sort === 'loan_amount_low_to_high') {
              function amountLowToHigh(a, b){
                return a.actualLoanAmount - b.actualLoanAmount
              }
              this.arr.sort(amountLowToHigh);
            }

            if(this.arr.length > 10 && this.sort === 'loan_amount_high_to_low') {
              function amountHighToLow(a, b){
                return b.actualLoanAmount - a.actualLoanAmount
              }
              this.arr.sort(amountHighToLow);
            }
            this.LowerMescroll.endSuccess();
            if(this.$refs.LowerScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.LowerMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.LowerMescroll.endUpScroll(true)
            } else {
              this.LowerMescroll.endUpScroll(false)
            }
          })
        });
      },
    }
  }
</script>

<style lang="less" src="./lowerDetail.less"></style>
