<template>
  <div class="bill-home">
    <ul class="flex flex-align-center flex-wrap list-order">
      <li class="flex flex-justify-center"
          v-for="(item, index) in data"
          :key="index"
          v-on:click.prevent="hrefListFuc(item['order_status_value'])">

        <img
          src="../../../../assets/img/mb/search.png"
          class="search-img"
          v-on:click.stop="showOrderListFuc"
          v-if="index + 1 === data.length"/>

        <div :class="item['color']">
          <p class="box-num" v-bind:style="{color: '#'+item['order_status_color']}">{{item['order_count']}}</p>
          <p class="box-text" v-bind:style="{color: '#'+item['order_status_color']}">{{item['order_status_name']}}</p>
        </div>
      </li>
    </ul>

    <van-popup v-model="show" class="show">
      <div style="position: relative;">
        <span class="close" v-on:click="show = false"></span>

        <p class="title">提单搜索</p>

        <input type="text" placeholder="请输入借款人姓名或手机号" v-model="value">

        <div class="line"></div>
      </div>

      <!--<div ref="homeListMescroll" class="mescroll">-->
        <!--<div ref="homeListScroll" id="scrollWrap">-->
          <!--<ul class="item">-->
            <!--<li class="flex flex-align-center flex-justify-between" v-for="(item, index) in arr" :key="index">-->
              <!--<p class="flex-1">{{item['borrower_name']}}</p>-->
              <!--<p class="flex-1">{{item['loan_amount']}}</p>-->
              <!--<p class="flex-1" v-bind:style="{color: '#'+item['order_status_color']}">{{item['order_status']}}</p>-->
              <!--<p class="flex-1">{{item['order_time']}}</p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->

      <div class="mescroll">
        <ul class="item">
          <li class="flex flex-align-center flex-justify-between"
              v-for="(item, index) in arr" :key="index"
              v-on:click="hrefMbDetailFuc(item)">
            <p class="flex-1">{{item['borrower_name']}}</p>
            <p class="flex-1">{{item['loan_amount']}}万</p>
            <p class="flex-1" v-bind:style="{color: '#'+item['order_status_color']}">
              <span>{{item['order_status_name']}}</span>
              <!--<span v-if="item['order_status'] === 10004 || item['order_status'] === 10005">已结束</span>-->
              <!--<span v-else-if="item['order_status'] === 40001">已放款</span>-->
              <!--<span v-else-if="item['order_status'] === 10001">待受理</span>-->
              <!--<span v-else-if="item['order_status'] === 30002">待审批</span>-->
              <!--<span v-else-if="item['order_status'] === 20001 || item['order_status'] === 20002">待进件</span>-->
            </p>
            <p class="flex-1">{{item['order_time']}}</p>
          </li>
        </ul>

        <p v-if="loadListShow">
          <span v-if="(this.total === 0 || arr.length === total) && noData === true" class="loadList2">没有更多数据了</span>
          <span v-else class="loadList" v-on:click="loadListData">点击查看更多</span>
        </p>
      </div>
    </van-popup>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/6/17
  */

  // import MeScroll from 'mescroll.js';
  // import 'mescroll.js/mescroll.min.css'
  import * as commissionApi from '../myBillApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'MyBillHome',
    data() {
      return {
        source: '',
        show: false,
        data: [],
        value: '',
        arr: [],
        page: 0,
        total: true,
        loadListShow: false,
        noData: false,
      }
    },
    created() {
      // this.$watch('value', this.deBounce(() => {
      //   this.homeListMescroll = new MeScroll(this.$refs.homeListMescroll, {
      //     down: {
      //       auto: false,
      //       callback: this.downCallback,
      //     },
      //     up: {
      //       auto: true,
      //       callback: this.upCallback,
      //       htmlNodata: '<p class="upwarp-nodata">— 已经到底部了 —</p>',
      //       loadFull: {
      //         use: false,
      //         delay: 500
      //       }
      //     },
      //   });
      // }, 1000))
      this.$watch('value', this.deBounce(() => {
        this.updateLoadListData(this.value);
      }, 1000))
    },
    mounted() {
      if(this.parseURL('source') !== null) {
        this.source = this.parseURL('source');
      }

      commissionApi.myOrderNew({source: this.source}, this.$cookie.get('token')).then(res => {
        this.data = res.data;
      });
    },
    methods: {
      downCallback() {
        commissionApi.myOrderSearch({search: this.value, start: 1}, this.$cookie.get('token')).then(res => {
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['orderList'];
          this.$nextTick(() => {
            if(this.arr.length >= this.total) {
              this.homeListMescroll.endUpScroll(true);
              this.homeListMescroll.endSuccess();
            } else {
              this.homeListMescroll.endSuccess(res.data['orderList'].length, true);
            }
            if(this.$refs.homeListScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              this.homeListMescroll.triggerUpScroll();
            }
          })
        });
      },

      upCallback() {
        commissionApi.myOrderSearch({search: this.value, start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orderList'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            this.homeListMescroll.endSuccess();
            if(this.$refs.homeListScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
              if(this.arr.length < this.total) {
                this.homeListMescroll.triggerUpScroll();
              }
            }
            if(this.arr.length >= this.total) {
              this.homeListMescroll.endUpScroll(true)
            } else {
              this.homeListMescroll.endUpScroll(false)
            }
          })
        });
      },

      loadListData() {
        if(this.arr.length === this.total) {
          this.noData = true;
          return false;
        }
        commissionApi.myOrderSearch({search: this.value, start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orderList'].forEach((item) => {
            this.arr.push(item);
          });
          this.$nextTick(() => {
            console.log(this.arr.length, this.total)
          })
        });
      },

      updateLoadListData(val) {
        commissionApi.myOrderSearch({search: val, start: 1}, this.$cookie.get('token')).then(res => {
          this.loadListShow = true;
          this.noData = false;
          this.page = 1;
          this.total = res.data['total'];
          this.arr = res.data['orderList'];
          this.$nextTick(() => {
            if(this.arr.length === this.total) {
              this.noData = true;
            }
          })
        });
      },

      showOrderListFuc() {
        this.show = true;
      },

      hrefListFuc(num) {
        this.$router.push(`/user/mb/list?str=${num}&source=${this.source}`);
      },

      hrefMbDetailFuc(obj) {
        this.$router.push(`/user/mb/list/detail?pid=${obj['pid']}`);
      }
    }
  }
</script>

<style lang="less" src="./home.less"></style>
