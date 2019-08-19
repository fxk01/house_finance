<template>
  <div class="bill">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      noDataText="没有更多数据"
      ref="billScroller"
      class="bill-scroller"
    >
      <van-tabs
        v-model="active"
        animated
        v-on:change="switchOrder"
      >
        <van-tab v-for="(item, indexTabs) in navTabs" :key="indexTabs">
          <div slot="title">
            <p>{{item.text}}</p>
            <p>({{item.num}})</p>
          </div>

          <main class="bill-main-wrap" v-for="(item, index) in orderData" :key="index">
            <section>
              <div class="flex flex-justify-between flex-align-center border-bt-e2 bill-between">
                <p class="bill-description">{{item['p_name']}}</p>
                <p class="bill-description2">订单编号&nbsp;{{item['order_no']}}</p>
                <p class="bill-description2">{{item['order_time']}}</p>
              </div>

              <div class="failure" v-if="item['reject_handle_item']">
                {{item['reject_handle_item']}}
              </div>

              <div class="flex flex-justify-between flex-align-center bill-between" v-if="item['initial_review_status'] === 1">
                <p class="bill-description">初评额度</p>
                <p class="bill-description2">{{(item['initial_review_amount']/10000).toFixed(2)}}万</p>
                <p class="bill-description2">&nbsp;{{fmtDate(item['initial_review_time'])}}</p>
              </div>

              <div class="flex flex-justify-between flex-align-center bill-between" v-if="item['initial_review_status'] === 2">
                <p class="bill-description">拒件</p>
                <p class="bill-description2" style="color: #333;">{{item['initial_review_remark']}}</p>
              </div>

              <div class="flex desc-head" style="">
                <p class="desc-item-col-1">借款联系人</p>
                <p class="desc-item-col-2">拟借款金额</p>
                <p class="desc-item-col-3">拟借款期限</p>
              </div>

              <div class="flex desc-body" style="">
                <p class="desc-item-col-1">{{item['borrower_name']}}</p>
                <p class="desc-item-col-2">{{item['loan_amount']}}万元</p>
                <p class="desc-item-col-3">{{item['borrowing_period']}}个月</p>
              </div>
            </section>

            <van-collapse v-model="activeNames">
              <van-collapse-item :name="index">
                <div class="flex" slot="title">
                  <p class="list-item-col-1">进度</p>
                  <p class="list-item-col-2">项目</p>
                  <p class="list-item-col-3">完成时间</p>
                  <p class="list-item-col-4">经办人</p>
                </div>
                <ul class="flex" v-for="(item2, index2) in item['orderProgress']" :key="index2">
                  <li class="list-item-col-1 bill-list-li">
                    <img src="../../../assets/bill/da_gou.png" class="item-icon">
                  </li>
                  <li class="list-item-col-2 bill-list-li">
                    {{item2['handle_item']}}
                  </li>
                  <li class="list-item-col-3 bill-list-li">
                    {{item2['handle_time']}}
                  </li>
                  <li class="list-item-col-4 bill-list-li">
                    {{item2['handle_person']}}
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </main>

          <div></div>
        </van-tab>
      </van-tabs>
    </scroller>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/21
  */
  import * as billApi from './billApi';
  import { mixin } from '../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Bill',
    data() {
      return {
        page: 0,
        active: 0,
        total: true,
        orderData: [],
        activeNames: [],
        orderProgressData: [],
        postOrderDataStr: '',
        source: '',
        navTabs:[{
          text: '全部',
          num: '',
          all_order_count: '',
          isActive: true,
          status: '',
        }, {
          text: '已放款',
          num: '',
          loan_order_count: '',
          isActive: false,
          status: '40001',
        }, {
          text: '已审批',
          num: '',
          approved_order_count: '',
          isActive: false,
          status: '30001',
        }, {
          text: '已受理',
          num: '',
          accepted_order_count: '',
          isActive: false,
          status: '20001',
        }, {
          text: '初评',
          num: '',
          initial_review_order_count: '',
          isActive: false,
          status: '20002',
        }, {
          text: '已提单',
          num: '',
          req_order_count: '',
          isActive: false,
          status: '10001',
        }, {
          text: '已结束',
          num: '',
          eol_order_count: '',
          isActive: false,
          status: '10004',
        }]
      };
    },
    mounted() {
      if(this.parseURL('source') !== null) {
        this.source = this.parseURL('source');
      }
      this.postOrderDataStr = '';
    },
    methods: {
      refresh(done) {
        this.postMyOrder(done)
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.orderData.length >= this.total) {
          this.$refs.billScroller.finishInfinite({
            isNoMoreData: false
          });
          return;
        }
        billApi.myOrder({orderStatus: this.postOrderDataStr, start: ++this.page, source: this.source}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orders'].forEach((item, index) => {
            this.orderData.push(item);
            if(this.activeNames.length >= 10) {
              this.activeNames.push(++this.activeNames[this.activeNames.length - 1]);
            } else {
              this.activeNames.push(index);
            }
          });
          for(let name in res.data) {
            this.navTabs.forEach((item) => {
              if(item.hasOwnProperty(name) === true) {
                item.num = item[name] = res.data[name];
              }
            })
          }
          done()
        });
      },
      switchOrder(index) {
        this.active = index;
        this.postOrderDataStr = this.navTabs[index].status;
        this.postMyOrder();
      },
      postMyOrder(done) {
        this.page = 1;
        if(done === undefined) {
          this.$refs.billScroller.triggerPullToRefresh();
          return;
        }
        billApi.myOrder({orderStatus: this.postOrderDataStr, start: 1, source: this.source}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          this.orderData = res.data['orders'];
          if(done !== undefined) {
            done();
          }
        });
      }
    }
  }
</script>

<style lang="less" src="./bill.less"></style>
