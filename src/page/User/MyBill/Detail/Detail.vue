<template>
  <div class="bill-detail">
    <header v-if="!dataInfo.hasOwnProperty('approval_status')">
      <div>
        <p class="hd-quota">房产估值</p>
        <p class="hd-mt29">
          <span class="hd-num">{{(dataInfo['initial_review_amount'] / 10000).toFixed(2)}}</span>
          <span class="hd-text">万</span>
        </p>
      </div>
    </header>

    <header v-if="dataInfo.hasOwnProperty('approval_status') && dataInfo['approval_status'] === 0">
      <div>
        <p class="hd-quota">房产估值</p>
        <p class="hd-mt29">
          <span class="hd-num">{{(dataInfo['initial_review_amount'] / 10000).toFixed(2)}}</span>
          <span class="hd-text">万</span>
        </p>
      </div>
    </header>

    <div class="box-two" v-if="dataInfo.hasOwnProperty('approval_status') && dataInfo['approval_status'] !== 0">
      <ul class="flex flex-align-center flex-justify-center">
        <li>
          <div>
            <p class="hd-quota">预审批额度</p>
            <p class="hd-mt29">
              <span class="hd-num">{{dataInfo['approval_amount']}}</span>
              <span class="hd-text">万</span>
            </p>
          </div>
        </li>
        <li class="bg-ff8f29">
          <div>
            <p class="hd-quota">房产估值</p>
            <p class="hd-mt29">
              <span class="hd-num">{{(dataInfo['initial_review_amount'] / 10000).toFixed(2)}}</span>
              <span class="hd-text">万</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <ul class="information-detail" v-bind:style="{marginTop: dataInfo.hasOwnProperty('approval_status') && dataInfo['approval_status'] !== 0 ? 'auto' : ''}">
      <li class="flex flex-align-center flex-justify-between mb-31" v-if="dataInfo['accept_comment']">
        <p class="error-text">{{dataInfo['accept_comment']}}</p>
      </li>
      <li class="line" v-if="dataInfo['accept_comment']"></li>

      <li class="flex flex-align-center flex-justify-between" v-if="dataInfo.hasOwnProperty('approval_status')">
        <p>预审批结果</p>
        <p v-bind:style="{color: dataInfo['approval_status'] === 0 ? '#F13636' : '#27B02E'}">
          {{dataInfo['approval_status'] === 0 ? '不通过' : '通过'}}
        </p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between" v-if="dataInfo.hasOwnProperty('approval_status')">
        <p>预审批意见</p>
        <p class="last-approval-text" style="text-align: right;">{{dataInfo['approval_comment']}}</p>
      </li>
      <li class="line" v-if="dataInfo.hasOwnProperty('approval_status')"></li>

      <li class="flex flex-align-baseline flex-justify-between">
        <p>借款金额</p>
        <p>{{dataInfo['loan_amount']}}万</p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between">
        <p>借款期限</p>
        <p>{{dataInfo['borrowing_period']}}月</p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between">
        <p>借款人</p>
        <p>{{dataInfo['borrower_name']}}</p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between">
        <p>申请产品</p>
        <p>{{dataInfo['p_name']}}</p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between">
        <p>提单时间</p>
        <p>{{dataInfo['order_time']}}</p>
      </li>
      <li class="flex flex-align-baseline flex-justify-between">
        <p>跟单员</p>
        <p>{{dataInfo['house_manager_name']}}</p>
      </li>
    </ul>

    <div class="progress-list">
      <p class="title">审批进度</p>

      <ul v-for="(item, index) in orderHandlesArr2" :key="index">
        <li class="flex flex-wrap">
          <div class="text-ag-center state">
            <div>
              <p v-if="orderHandlesArr[index] && orderHandlesArr[index].state === '已结束'" class="round bd-solid-f73535"></p>
              <p v-else-if="orderHandlesArr[index] && orderHandlesArr[index].state !== '已结束'"
                 v-bind:class="[orderHandlesArr[index] && orderHandlesArr[index]['handle_time'] ? 'round' : 'unchecked']"></p>
              <p v-else="orderHandlesArr[index]" class="unchecked"></p>
            </div>

            <div>
              <p class="round-text color-999" v-if="orderHandlesArr[index] && orderHandlesArr[index].state === '已结束'">{{item['handle_item_text']}}</p>
              <p class="round-text" v-else-if="orderHandlesArr[index] && orderHandlesArr[index].state !== '已结束'">{{item['handle_item_text']}}</p>
              <p class="round-text color-999" v-else="orderHandlesArr[index]">{{item['handle_item_text']}}</p>
            </div>
          </div>

          <div class="flex-1 text-ag-center ml-13">
            <div>
              <!--<p class="item-line-text color-f73535" v-if="orderHandlesArr[index] && (orderHandlesArr[index]['handle_item_code'] === '91'-->
            <!--|| orderHandlesArr[index]['handle_item_code'] === '92'-->
            <!--|| orderHandlesArr[index]['handle_item_code'] === '93')">-->
                <!--已结束-->
              <!--</p>-->
              <p class="item-line-text" v-if="orderHandlesArr[index] && (orderHandlesArr[index]['handle_item_code'] !== '91'
            || orderHandlesArr[index]['handle_item_code'] !== '92'
            || orderHandlesArr[index]['handle_item_code'] !== '93') && item['handle_item_code'] === orderHandlesArr[index]['handle_item_code']">
                <span v-if="(index+1 === orderHandlesArr.length)
                && (dataInfo['order_status'] !== 10004 || dataInfo['order_status'] !== 10005)
                && orderHandlesArr[index].state !== '已结束'
                && dataInfo['order_status'] !== 40001">
                  进行中
                </span>

                <span v-else-if="(dataInfo['order_status'] !== 10004 || dataInfo['order_status'] !== 10005)
                && orderHandlesArr[index].state !== '已结束'">已完成</span>

                <span class="color-f73535" v-else="(index+1 === orderHandlesArr.length)
                && (dataInfo['order_status'] === 10004 || dataInfo['order_status'] === 10005)
                && orderHandlesArr[index].state === '已结束'">
                  已结束
                </span>
              </p>
            </div>

            <div class="item-line" v-if="orderHandlesArr[index] && orderHandlesArr[index]['handle_time']"></div>

            <p class="item-line-text2" v-if="orderHandlesArr[index] && orderHandlesArr[index].state === '已结束'">{{orderHandlesArr[index]['handle_item']}}</p>
          </div>

          <div class="flex-1 time" v-if="orderHandlesArr[index]">
            {{orderHandlesArr[index]['handle_time']}}
          </div>
        </li>

        <li class="line-distance" v-if="index !== orderHandlesArr2.length - 1">
          <div class="bd-distance"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/6/19
  */

  import * as commissionApi from '../myBillApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'Detail',
    data() {
      return {
        orderHandlesArr: [{
          fk_order_id: '',
          handle_item: '',
          handle_item_code: '',
          handle_person: '',
          handle_time: '',
          pid: '',
          state: ''
        }],
        orderHandlesArr2: [{
          handle_item_code: '01',
          handle_item_text: '待受理'
        }, {
          handle_item_code: '02',
          handle_item_text: '待进件'
        }, {
          handle_item_code: '03',
          handle_item_text: '待外访'
        }, {
          handle_item_code: '04',
          handle_item_text: '待审批'
        }, {
          handle_item_code: '05',
          handle_item_text: '待签约'
        }, {
          handle_item_code: '06',
          handle_item_text: '待放款'
        }, {
          handle_item_code: '07',
          handle_item_text: '已放款'
        }],
        dataInfo: {
          initial_review_amount: ''
        },
      }
    },

    mounted() {
      commissionApi.myOrderDetail({orderId: this.parseURL('pid')}, this.$cookie.get('token')).then(res => {
        this.orderHandlesArr = res.data['orderHandles'];
        this.orderHandlesArr.sort((a, b) => {
          return a['handle_item_code'] - b['handle_item_code']
        });
        let index = this.indexOfRemove(this.orderHandlesArr);
        if (index > -1) {
          this.orderHandlesArr[index - 1].state = '已结束';
          this.orderHandlesArr.splice(index, 1);
        }
        this.dataInfo = res.data['orderInfo'];
      });
    },

    methods: {
      indexOfRemove(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]['handle_item_code'] === '91' || arr[i]['handle_item_code'] === '92' || arr[i]['handle_item_code'] === '93') {
            return i;
          }
        }
        return -1;
      }
    }
  }
</script>

<style lang="less" src="./detail.less"></style>
