<template>
  <div class="sharedOrders">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      noDataText="没有更多数据"
      ref="sharedOrderScroller"
      class="sharedOrders-scroller"
    >
      <van-tabs
        v-model="active"
        @change="changeOrdersTab"
        animated
      >
        <van-tab>
          <div slot="title" class="sharedOrders-tab-content">
            <van-icon :name="tdImg" class-prefix="sharedOrders-tdImg"/>
            我的推单
          </div>

          <section v-for="(item, index) in list" :key="index" v-if="item['status'] === 0">
            <div class="sharedOrders-status1">
              <strong class="inline-block">{{item['guser_phone'] && item['guser_phone'].length > 0 ? '抢单人': '状态'}}</strong>
              <strong
                class="inline-block"
                :style="{width: item['guser_phone'] && item['guser_phone'].length > 0 ? '' : '3.35rem'}"
              >
                {{item['guser_phone'] && item['guser_phone'].length > 0 ? item['grab_user_name'] : '已移出共享订单池'}}
              </strong>
              <!--联系抢单人-->
              <van-button type="default" :class="'sharedOrders-single'" v-if="item['guser_phone'] && item['guser_phone'].length > 0">
                <a :href="tel+item['guser_phone']">联系抢单人</a>
              </van-button>
              <strong class="inline-block">{{item['order_no']}}</strong>
            </div>
            <div class="inline-block sharedOrders-status1-left">
              <p>{{item['loan_amount']}}&nbsp;万</p>
              <p>{{item['borrowing_period']}}&nbsp;个月</p>
              <!--<van-button type="default" class="sharedOrders-soldOut bg-b8964f" @click="orderOperation(item['pid'], 0)">下架</van-button>-->
            </div>
            <div class="inline-block sharedOrders-status1-right">
              <p>房产地址：{{item['hourse_address']}}</p>
              <p>房产面积：{{item['hourse_area']}}平米</p>
              <!--<p>房产估值：XX.XX万元</p>-->
              <p>项目简介：{{item['project_desc']}}</p>
              <p>征信情况：{{credit1(item['credit_information'])}}</p>
              <p>推单日期：{{item['push_time']}}&nbsp;&nbsp;<span v-if="item['days'] === 0"></span><span v-else>（{{item['days']}}天前）</span></p>
            </div>
          </section>
          <section v-for="(item, index) in list" :key="index" v-if="item['status'] === 1">
            <div class="sharedOrders-status1 sharedOrders-status2">
              <strong class="inline-block">状态</strong>
              <strong class="inline-block" :style="{width: '3.35rem'}">已进入共享订单池{{item['days']}}天</strong>
              <!--&lt;!&ndash;联系抢单人&ndash;&gt;-->
              <!--<van-button type="default" :class="'sharedOrders-single'" v-if="item['guser_phone'] && item['guser_phone'].length > 0">-->
                <!--<a :href="tel+item['guser_phone']">联系抢单人</a>-->
              <!--</van-button>-->
              <strong class="inline-block">{{item['order_no']}}</strong>
            </div>
            <div class="inline-block sharedOrders-status1-left">
              <p>{{item['loan_amount']}}&nbsp;万</p>
              <p>{{item['borrowing_period']}}&nbsp;个月</p>
              <van-button type="default" class="sharedOrders-soldOut bg-b8964f" @click="orderOperation(item['pid'], 0)">下架</van-button>
              <!--<van-button type="default" class="sharedOrders-soldOut" @click="orderOperation(item['pid'], 1)">上架</van-button>-->
            </div>
            <div class="inline-block sharedOrders-status1-right">
              <p>房产地址：{{item['hourse_address']}}</p>
              <p>房产面积：{{item['hourse_area']}}平米</p>
              <!--<p>房产估值：XX.XX万元</p>-->
              <p>项目简介：{{item['project_desc']}}</p>
              <p>征信情况：{{credit1(item['credit_information'])}}</p>
              <p>推单日期：{{item['push_time']}}&nbsp;&nbsp;<span v-if="item['days'] === 0"></span><span v-else>（{{item['days']}}天前）</span></p>
            </div>
          </section>

          <p></p>
        </van-tab>

        <van-tab>
          <div slot="title" class="sharedOrders-tab-content">
            <van-icon :name="qdImg" class-prefix="sharedOrders-qdImg"/>
            我的抢单
          </div>

          <section v-for="(item, index) in list" :key="index">
            <div class="sharedOrders-status1 sharedOrders-status2">
              <strong class="inline-block">推单人</strong>
              <strong class="inline-block">{{item['borrower_name']}}</strong>
              <!--联系推单人-->
              <van-button type="default" class="sharedOrders-single bg-b8964f">
                <a :href="tel+item['puser_phone']">联系推单人</a>
              </van-button>
              <strong class="inline-block">{{item['order_no']}}</strong>
            </div>
            <div class="inline-block sharedOrders-status1-left">
              <p>{{item['loan_amount']}}&nbsp;万</p>
              <p>{{item['borrowing_period']}}&nbsp;个月</p>
            </div>
            <div class="inline-block sharedOrders-status1-right">
              <p>房产地址：{{item['hourse_address']}}</p>
              <p>房产面积：{{item['hourse_area']}}平米</p>
              <!--<p>房产估值：XX.XX万元</p>-->
              <p>项目简介：{{item['project_desc']}}</p>
              <p>征信情况：{{credit1(item['credit_information'])}}</p>
              <p>推单日期：{{item['push_time']}}&nbsp;&nbsp;<span v-if="item['days'] === 0"></span><span v-else>（{{item['days']}}天前）</span></p>
            </div>
          </section>

          <p></p>
        </van-tab>
      </van-tabs>
    </scroller>

    <Dialog
      @showConfirm="confirmNotify"
      ref="childOrder"
      v-bind:message="{
        title: this.OperateData.operateType == 0 ? '您确定要将该订单移出共享订单池吗？' : '您确定要重新推单到共享订单池吗？',
        title1: '  ',
        butText: '确定',
        butCancel: '再考虑一下'
      }"
    />
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/27
   */
  import * as sharedOrdersAPi from './sharedOrdersAPi';
  import Dialog from '../../../components/myDialog';

  export default {
    name: 'SharedOrders',
    data() {
      return {
        active: 0,
        ordersTdData: {
          orders: []
        },
        myGrabOrderData: {},
        tdImg: require('../../../assets/img/orders/td-img.png'),
        qdImg: require('../../../assets/img/orders/qd-img.png'),
        OperateData: {},
        index: 0,
        list: [],
        page: 0,
        total: true,
        nameRoll: '',
        tel: 'tel:',
      };
    },
    components: {
      Dialog,
    },
    mounted() {
      this.nameRoll = this.$refs['sharedOrderScroller'];
    },
    methods: {
      refresh(done) {
        this.page = 1;
        if(this.index === 0) {
          sharedOrdersAPi.myPushOrder({start: 1}, this.$cookie.get('token')).then(res => {
            this.total = res.data['total'];
            this.list = res.data['orders'];
            if(done !== undefined) {
              done();
            }
          });
        } else {
          sharedOrdersAPi.myGrabOrder({start: 1}, this.$cookie.get('token')).then(res => {
            this.total = res.data['total'];
            this.list = res.data['orders'];
            if(done !== undefined) {
              done();
            }
          });
        }
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.nameRoll.finishInfinite(true);
          return;
        }
        if(this.index === 0) {
          sharedOrdersAPi.myPushOrder({start: ++this.page}, this.$cookie.get('token')).then(res => {
            this.total = res.data['total'];
            res.data['orders'].forEach((item) => {
              this.list.push(item);
            });
            done()
          });
        } else {
          sharedOrdersAPi.myGrabOrder({start: ++this.page}, this.$cookie.get('token')).then(res => {
            this.total = res.data['total'];
            res.data['orders'].forEach((item) => {
              this.list.push(item);
            });
            done()
          });
        }
      },
      credit1(data) {
        let obj = JSON.parse(data);
        let str = `近12个月贷款逾期${obj.loc ? obj.loc : 0}笔、信用卡逾期${
          obj.coc ? obj.coc : 0
          }笔;`;
        return str;
      },
      changeOrdersTab(index) {
        this.index = index;
        this.refresh();
      },
      orderOperation(pid, index) {
        this.OperateData.orderId = pid;
        this.$refs.childOrder.show = true;
        this.$set(this.OperateData, 'operateType', index);
      },
      confirmNotify() {
        this.$refs.childOrder.show = false;
        sharedOrdersAPi.shareOrderOperate(this.OperateData, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            this.$toast({
              message: res.msg,
            });
            this.refresh();
          }
        });
      }
    }
  }
</script>

<style lang="less" src="./sharedOrders.less"></style>
