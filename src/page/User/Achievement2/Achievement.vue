<template>
  <div class="achievement">
    <header>
      <ul class="flex flex-align-center flex-justify-between">
        <li>当前佣金余额(元)</li>
        <li>{{achievementData['available']}}</li>
        <li>
          <van-button type="default" class="btn-money" v-on:click="butWithdrawal">
            <img src="../../../assets/achievement/tixian.png" class="vertical-align-middle ti-xian">
            <span class="vertical-align-middle">提现</span>
          </van-button>
        </li>
      </ul>

      <div class="flex flex-align-center flex-justify-between achievement-money">
        <p>累计赚取佣金(元)</p>
        <p>{{achievementData['history_available']}}</p>
      </div>
    </header>

    <main>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1" disabled>
          <div slot="title">
            <img src="../../../assets/achievement/mingxi.png" class="ming-xi">
            <span class="achievement-detailed">佣金明细</span>
          </div>

          <scroller
            :on-refresh="refresh"
            :on-infinite="infinite"
            noDataText="没有更多数据"
            ref="achievementScroller"
            class="achievement-scroller"
          >
            <van-tabs
              v-model="active"
              animated
              v-on:change="switchCommission"
            >
              <van-tab>
                <div slot="title" class="achievement-tab1-wrap">
                  <img src="../../../assets/achievement/qian.png" class="qian">
                  <div class="inline-block achievement-tab1-bill">
                    <strong>我的提单</strong>
                    <p>共{{achievementData['commission_amount']}}元</p>
                  </div>
                </div>

                <div class="flex flex-justify-start achievement-item">
                  <p class="flex-1">借款人</p>
                  <p class="flex-1">放款日期</p>
                  <p class="flex-1">放款金额</p>
                  <p class="flex-1">赚取佣金</p>
                </div>

                <ul class="achievement-ul-wrap">
                  <li class="flex flex-justify-start" v-for="(item, index) in list" :key="index">
                    <p class="flex-1">{{item.name}}</p>
                    <p class="flex-1">{{item['loan_date']}}</p>
                    <p class="flex-1">{{item['loan_amount']}}万元</p>
                    <p class="flex-1">{{item['commission_amount']}}元</p>
                  </li>
                </ul>
              </van-tab>

              <van-tab>
                <div slot="title" class="achievement-tab1-wrap">
                  <img src="../../../assets/achievement/qian.png" class="qian">
                  <div class="inline-block achievement-tab1-bill">
                    <strong>合伙人提单</strong>
                    <p>共{{achievementData['partner_commission_amount']}}元</p>
                  </div>
                </div>

                <div class="flex flex-justify-start achievement-item">
                  <p class="flex-1">借款人</p>
                  <p class="flex-1">放款日期</p>
                  <p class="flex-1">放款金额</p>
                  <p class="flex-1">赚取佣金</p>
                </div>

                <ul class="achievement-ul-wrap">
                  <li class="flex flex-justify-start" v-for="(item, index) in list" :key="index">
                    <p class="flex-1">{{item.name}}</p>
                    <p class="flex-1">{{item['loan_date']}}</p>
                    <p class="flex-1">{{item['loan_amount']}}万</p>
                    <p class="flex-1">{{item['commission_amount']}}元</p>
                  </li>
                </ul>
              </van-tab>
            </van-tabs>
          </scroller>
        </van-collapse-item>
      </van-collapse>
    </main>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/22
  */
  import * as achievementApi from './achievementApi';

  export default {
    name: 'Achievement',
    data() {
      return {
        active: 2,
        achievementData: {
          commissions: []
        },
        activeNames: ['1', '2'],
        list: [],
        page: 0,
        total: true,
        achievementStr: '',
      };
    },
    methods: {
      refresh(done) {
        this.postMyAchievement(done);
      },
      infinite(done) {
        // 数据全部加载完成
        if(this.list.length >= this.total) {
          this.$refs.achievementScroller.finishInfinite(true);
          return
        }
        achievementApi.myAchievement({type: this.achievementStr, start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.achievementData = res.data;
          this.total = res.data['total'];
          res.data['commissions'].forEach((item) => {
            this.list.push(item);
          });
          done()
        });
      },
      /*
       获取我的业绩列表
       */
      postMyAchievement(done) {
        this.page = 1;
        if(done === undefined) {
          this.$refs.achievementScroller.triggerPullToRefresh();
          return;
        }
        achievementApi.myAchievement({type: this.achievementStr, start: this.page}, this.$cookie.get('token')).then(res => {
          this.achievementData = res.data;
          this.total = res.data['total'];
          this.list = res.data['commissions'];
          this.$refs.achievementScroller.finishInfinite(false);
          if(done !== undefined) {
            done();
          }
        });
      },
      switchCommission(index) {
        if(index === 1) {
          this.achievementStr = 'partner';
        } else {
          this.achievementStr = '';
        }
        this.refresh();
      },
      butWithdrawal() {
        if(this.$cookie.get('isAuth') === 'true') {
          this.$router.push('/user/commission')
        } else {
          this.$router.push('/user/cash')
        }
      },
    }
  }
</script>

<style lang="less" src="./achievement.less"></style>
