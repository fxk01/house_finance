<template>
  <div class="evaluationList">
    <header>
      <div class="evaluationList-title">
        为了给您提供更优质的服务和体验，您的每次服务评价对我们都很重要。
      </div>
    </header>

    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      noDataText="没有更多数据"
      ref="evaluationListScroller"
      class="evaluationList-scroller"
    >
      <section v-for="(item, index) in list" :key="index">
        <div class="evaluationList-wrap">
          <div class="inline-block vertical-align-middle">
            <div class="flex flex-align-center mb20">
              <strong>{{item['p_name']}}</strong>
              <p>订单编号&nbsp;{{item['order_no']}}</p>
            </div>
            <div class="flex flex-align-center">
              <strong>放款日期</strong>
              <p>{{item['loan_date']}}</p>
            </div>
          </div>

          <div class="inline-block fr">
            <button class="evaluationList-but" v-on:click="hrefDetails(item)">
              <img :src="item['service_status'] === 1 ? haveEvaluationImg : notEvaluatedImg" class="evaluationList-evaluated">
              <span class="vertical-align-middle">&nbsp;&nbsp;{{item['service_status'] === 1 ? '已评价' : '评价'}}</span>
            </button>
          </div>
        </div>

        <ul class="flex flex-justify-start evaluationList-wrap-ul">
          <li class="flex-1">借款联系人</li>
          <li class="flex-1">借款金额</li>
          <li class="flex-1">借款期限</li>
        </ul>

        <ul class="flex flex-justify-start evaluationList-wrap-ul2">
          <li class="flex-1">{{item['borrower_name']}}</li>
          <li class="flex-1">{{item['loan_amount']}}&nbsp;万元</li>
          <li class="flex-1">{{item['borrowing_period']}}&nbsp;个月</li>
        </ul>
      </section>
    </scroller>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/27
  */
  import * as evaluationListApi from './evaluationListApi';

  export default {
    name: 'EvaluationList',
    data() {
      return {
        notEvaluatedImg: require('../../../../assets/img/evaluation/not-evaluated.png'),
        haveEvaluationImg: require('../../../../assets/img/evaluation/pingjia-copy.png'),
        serveData: {},
        list: [],
        page: 0,
        total: true
      }
    },
    methods: {
      refresh(done) {
        this.page = 1;
        evaluationListApi.serviceCommentList({start: 1}, this.$cookie.get('token')).then(res => {
          this.list = res.data['orders'];
          done();
        });
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.$refs.evaluationListScroller.finishInfinite(true);
          return;
        }
        evaluationListApi.serviceCommentList({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.total = res.data['total'];
          res.data['orders'].forEach((item) => {
            this.list.push(item);
          });
          done()
        });
      },
      hrefDetails(obj) {
        if(obj['service_status'] === 1) {
          // return;
        }
        this.$router.push(`evaluation/details?id=${obj['pid']}&status=${obj['order_status']}&whether=${obj['service_status']}`);
      }
    }
  }
</script>

<style lang="less" src="./evaluationList.less"></style>
