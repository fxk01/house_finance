<template>
  <div class="notify">
    <header class="flex flex-justify-start flex-align-center">
      <p class="flex-1">类型</p>
      <p class="flex-1">内容</p>
      <p class="flex-1 margin-left-40">时间</p>
    </header>

    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      noDataText="没有更多数据"
      ref="my_scroller"
      class="notify-scroller"
    >
      <section>
        <ul class="flex flex-justify-start flex-align-center" v-for="(item) in list">
          <li class="flex-1">
            {{item.type_name}}
          </li>
          <li class="flex-1" v-if="item.type_value === '20005' && item.is_link === 1">
            <router-link to="/user/record">{{item.content}}</router-link>
          </li>
          <li class="flex-1" v-else-if="item.type_value === '20006' && item.is_link === 1">
            <router-link to="/activity/invite/harvest">{{item.content}}</router-link>
          </li>
          <li class="flex-1" v-else>
            {{item.content}}
            <span
              v-if="item.content.indexOf('拒件') > 0"
              v-on:click="hrefShareOrder(item['fk_order_id'])"
              style="color: #4e8b54; text-decoration: underline;">
                共享订单
              </span>
          </li>
          <li class="flex-1 margin-left-40">
            <p>{{item.message_time.split(' ')[0]}}</p>
            <p>{{item.message_time.split(' ')[1]}}</p>
          </li>
        </ul>
      </section>
    </scroller>

    <Dialog
      @showConfirm="confirmNotify"
      ref="child"
      v-bind:message="{
        title: '该订单已推送到共享订单池。',
        title1: '可在我的-共享订单-我的推单中查看进度',
        butText: '查看进度',
        butCancel: '留在消息中心'
      }"
      v-bind:id="fk_order_id"
    />
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/18
  */
  import * as notifyApi from './notifyApi';
  import Dialog from '../../../components/myDialog';

  export default {
    name: 'Notify',
    components: {
      Dialog,
    },
    data() {
      return {
        fk_order_id: '',
        isLoading: true,
        list: [],
        loading: false,
        finished: false,
        page: 0,
        totalRow: true
      }
    },
    created(){
      
    },
    methods: {
      refresh(done) {
        this.page = 1;
        notifyApi.getStationMessage({start: 1}, this.$cookie.get('token')).then(res => {
          this.list = res.data['messages'];
          done();
        });
      },
      infinite(done) {
        // 数据全部加载完成
        if (this.list.length >= this.totalRow) {
          this.$refs.my_scroller.finishInfinite({
            isNoMoreData: true
          });
          return;
        }
        notifyApi.getStationMessage({start: ++this.page}, this.$cookie.get('token')).then(res => {
          this.totalRow = res.data['total'];
          res.data['messages'].forEach((item) => {
            this.list.push(item);
          });
          this.$axios.fetchPost('/updateNotification',{},this.$cookie.get('token')).then(res=>{
            console.log(res)
          })
          done()
        });
      },
      hrefShareOrder(str) {
        this.fk_order_id = str;
        notifyApi.getOrderInfo({pid: this.fk_order_id}, this.$cookie.get('token')).then(res => {
          if(res.data['isSubmit'] === false) {
            this.confirmNotify();
          } else {
            this.$refs.child.show = true;
          }
        });
      },
      confirmNotify() {
        if(this.$refs.child.show === true) {
          this.$router.push('/user/orders')
        } else {
          this.$router.push({
            name: 'shareOrder',
            params: { pid: this.fk_order_id }
          })
        }
      }
    }
  }
</script>

<style lang="less" src="./notify.less"></style>
