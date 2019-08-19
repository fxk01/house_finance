<template>
  <div class="commission">
    <div v-if="this.$cookie.get('isAuth') === 'true'" class="lh-1">
      <BankCard @bankCardData="bankCardDataFuc" v-bind:bankCardDefaultData="defaultBankCardData"/>

      <div class="flex flex-align-center flex-justify-between container1">
        <p class="box-money">提现金额</p>

        <div v-on:click="hrefRecordFuc">
          <img src="../../../../assets/img/cash2/icon-je.png" class="icon-je"/>
          <span class="record-text">提现记录</span>
        </div>
      </div>

      <div class="commission-wrap">
        <label>￥</label>
        <input
          type="text"
          onkeyup="if(isNaN(value))execCommand('undo')"
          onafterpaste="if(isNaN(value))execCommand('undo')"
          v-model="val"
          v-on:input="realTimeVal"
          placeholder="请输入金额，单笔单月最高可提98475">
        <!--<span>元</span>-->
      </div>

      <div class="commission-bt-border"></div>

      <ul class="flex flex-align-center flex-justify-between container2">
        <li>可提现金额:&nbsp;&nbsp;{{withdrawalData['available']}}</li>
        <li class="flex-1" v-show="isChannel" v-on:click="showMoney = !showMoney">金额详情</li>
        <li class="flex-1" v-on:click="val = withdrawalData['available']">全部提现</li>
      </ul>

      <div class="wrap-cost">
        <div>
          <p>综合手续费：{{(val / 1.071 * 0.071).toFixed(2)}}</p>
          <p>综合手续费=通道费用+个人所得税</p>
        </div>
        <p class="last-text">到账金额：{{(val / 1.071).toFixed(2)}}</p>
      </div>

      <!-- <div class="flex flex-align-center flex-wrap wrap-cost confirmBank2">
        <p class="last-text">提现方式：</p>

        <ul>
          <li class="flex flex-align-center">
            <button v-bind:class="['item-but', 'item-but-mr', {'bg-039aff': !defaultBut}]" v-on:click="defaultButFuc(false)">对公</button>
            <button v-bind:class="['item-but', {'bg-039aff': defaultBut}]" v-on:click="defaultButFuc(true)">个人</button>
            <img src="../../../../assets/img/cash2/icon-wh.png" class="icon-wh" v-on:click.prevent="gotItFuc"/>
          </li>
        </ul>

        <div class="noAddUser" v-if="!defaultBut && !defaultButPublic">
          <p class="item-text item-but-mr2 color-333" v-if="!defaultButPublic">暂无对公账户</p>
          <p class="item-text-user" v-on:click="addUser = !addUser" v-if="!defaultButPublic">添加对公账户</p>
        </div>
      </div> -->

      <div class="checkbox-con">
        <div v-on:click="checkAttrFuc">
          <input type="checkbox" class="ipt-hide">
          <label v-bind:class="{checkbox, 'cur': check}"></label>
          <span>提现即表示同意</span>
          <router-link to="/user/commission/agree">
            《自由职业者与云账户协议》
          </router-link>
        </div>
      </div>

      <button
        v-on:click="confirmBankFuc"
        v-bind:class="{'commission-but': true, 'bg-f79029': val <= this.withdrawalData['available'] && check && val !== ''}">
        提现
      </button>

      <footer>温馨提示：1-3个工作日提现到账</footer>
    </div>

    <section v-if="this.$cookie.get('isAuth') !== 'true'">
      <p class="withdrawalCard-unbound">您还未绑定提现银行卡</p>
      <router-link to="/user/cash/certification?opType=1" class="ds-block">
        <van-button size="normal" :block="true">去 绑 卡</van-button>
      </router-link>
    </section>

    <van-popup v-model="showMoney" class="showMoney">
      <img src="../../../../assets/img/cash2/close.png" class="close" v-on:click.prevent="showMoney = !showMoney">

      <ul>
        <li class="flex flex-align-center">
          <p class="text1">红包(元)：</p>
          <p class="text2">{{withdrawalData['award']}}</p>
        </li>
        <li class="flex flex-align-center">
          <p class="text1">佣金(元)：</p>
          <p class="text2">{{withdrawalData['commission']}}</p>
        </li>
      </ul>
    </van-popup>

    <!-- <van-popup v-model="confirmBank" class="confirmBank">
      <div class="wrap">
        <img src="../../../../assets/img/cash2/close.png" class="close" v-on:click.prevent="confirmBank = !confirmBank">

        <p class="title">确认提现</p>

        <ul>
          <li class="flex flex-align-center">
            <p class="item-text">到账方式:</p>
            <button v-bind:class="['item-but', 'item-but-mr', {'bg-039aff': !defaultBut}]" v-on:click="defaultButFuc">对公</button>
            <button v-bind:class="['item-but', {'bg-039aff': defaultBut}]" v-on:click="defaultButFuc">个人</button>
            <img src="../../../../assets/img/cash2/icon-wh.png" class="icon-wh" v-on:click.prevent="gotItFuc"/>
          </li>
          <li class="flex flex-align-center flex-wrap item-li-mr" v-if="!defaultBut">
            <p class="item-text">到账卡号:</p>
            <p class="item-text item-but-mr2 color-333" v-if="!defaultButPublic">暂无对公账户</p>
            <p class="item-text-user" v-on:click="addUser = !addUser" v-if="!defaultButPublic">添加对公账户</p>
            <p class="item-text item-but-mr2 color-333" v-if="defaultButPublic" v-html="bankNoPublic"></p>
            <div class="bank-img" v-if="defaultButPublic">
              <img :src="confirmImg" class="confirm-img"/>
            </div>
          </li>
          <li class="flex flex-align-center flex-wrap item-li-mr" v-if="defaultBut">
            <div class="flex flex-align-center flex-justify-between flex-wrap">
              <p class="item-text">到账卡号:</p>
              <p class="item-text item-but-mr2 color-333" v-html="bankNoUser"></p>
            </div>

            <div class="bank-img">
              <img :src="confirmImg2" class="confirm-img"/>
            </div>
          </li>
        </ul>

        <button class="footer-but" v-on:click="withdrawalFuc" v-bind:style="{marginTop: !accountType && !defaultBut ? '41.5px' : ''}">
          确认
        </button>
      </div>
    </van-popup> -->

    <van-popup v-model="showWayArrival" class="showWayArrival">
      <p class="explain">到账方式说明</p>

      <div class="hg-flow">
        <div>
          <p class="title-text">个人</p>
          <p class="explain-text explain-text-user">线上快速打款，需扣个人所得税和支付通道费用</p>
        </div>

        <!-- <div class="mr-bt-50">
          <p class="title-text mr-bt-21">对公</p>
          <div class="lh-44">
            <p class="explain-text" style="color: #f38900;">
              对公付款，我司在收到您的发票后，3个工作日内完成对公付款。
            </p>
            <p class="explain-text">快递收件地址：深圳市福田区莲花街道梅岭社区景田路3号深茂商业中心18F</p>
            <p class="explain-text">收件人：房金事业部刘先生</p>
            <p class="explain-text">联系方式：0755-33009884</p>
          </div>
        </div> -->

        <!-- <div>
          <p class="title-text mr-bt-21">开票信息：</p>
          <div class="lh-44">
            <p class="explain-text">
              公司名称：山高房金（深圳）科技有限公司
            </p>
            <p class="explain-text">
              纳税人识别号：91440300MA5FGJK14E
            </p>
            <p class="explain-text">
              地址及电话：深圳市福田区莲花街道梅岭社区景田路3号深茂商业中心17F 0755-33098999
            </p>
            <p class="explain-text">开户行及账户：平安银行福景支行</p>
            <p class="explain-text">15000098099356</p>
            <p class="explain-text">开票类型：增值税专用发票</p>
          </div>
        </div> -->
      </div>

      <!-- <div v-on:click.prevent="pasteTextFuc">
        <button class="explain-but mr52-22 copyTextBut" v-if="!determinationWithdrawal" data-clipboard-text="">复制对公开票信息</button>
        <button class="explain-but2 mr52-22 copyTextBut2" v-if="determinationWithdrawal" data-clipboard-text="">复制对公开票信息</button>
      </div> -->

      <div>
        <button class="explain-but2" v-if="!determinationWithdrawal" ref="knowName" v-on:click.prevent="successWithdrawalFuc('gotIt')">知道了</button>
        <button class="explain-but" v-if="determinationWithdrawal" v-on:click.prevent="successWithdrawalFuc">确定提现</button>
      </div>

      <!-- <div style="display: none;" class="pasteText">
        <div class="mr-bt-50">
          <p class="title-text mr-bt-21">对公</p>
          <div class="lh-44">
            <p class="explain-text">快递收件地址：深圳市福田区莲花街道梅岭社区景田路3号深茂商业中心18F</p>
            <p class="explain-text">收件人：房金事业部刘先生</p>
            <p class="explain-text">联系方式：0755-33009884</p>
          </div>
        </div>

        <div>
          <p class="title-text mr-bt-21">开票信息：</p>
          <div class="lh-44">
            <p class="explain-text">
              公司名称：山高房金（深圳）科技有限公司
            </p>
            <p class="explain-text">
              纳税人识别号：91440300MA5FGJK14E
            </p>
            <p class="explain-text">
              地址及电话：深圳市福田区莲花街道梅岭社区景田路3号深茂商业中心17F 0755-33098999
            </p>
            <p class="explain-text">开户行及账户：平安银行福景支行</p>
            <p class="explain-text">15000098099356</p>
            <p class="explain-text">开票类型：普通发票</p>
          </div>
        </div>
      </div> -->
    </van-popup>

    <!-- <van-popup v-model="addUser" class="addUser">
      <img src="../../../../assets/img/cash2/close.png" class="close" v-on:click.prevent="addUser = !addUser">

      <p class="title-text">添加对公账户</p>

      <ul>
        <li>
          <label>开户名</label>
          <input v-model="userName" type="text" name="开户名" v-validate.initial="'required'"/>
        </li>
        <li>
          <label>账号</label>
          <input v-model="cardNo" type="text" name="账号" v-validate.initial="'required|isNotCardNo'"/>
        </li>
        <li>
          <label>开户行</label>
          <input :disabled="false" readonly v-on:click="showBank = !showBank" v-model="bankCode" type="text" name="开户行" v-validate.initial="'required'"/>
        </li>
        <li>
          <label>支行</label>
          <input v-model="branchName" type="text" name="支行" v-validate.initial="'required'"/>
        </li>
      </ul>

      <button class="confirm-but" v-on:click="confirmPublicAccount">确认</button>
    </van-popup> -->

    <!-- <van-actionsheet
      v-model="showBank"
      title="银行列表"
    >
      <ul class="bankList">
        <li v-for="(item, index) in withdrawalData['bankPayInfos']" :key="index" v-on:click="selectBankName(item)">
          <img :src="item.src">
          <span class="vertical-align-middle">&nbsp;&nbsp;&nbsp;{{item.name}}</span>
        </li>
      </ul>
    </van-actionsheet> -->
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/21
  */

  import Clipboard from 'clipboard';
  import BankCard from '../../../../components/bankCard';
  import { mixin } from '../../../../utils/common';
  import * as commissionApi from '../commissionApi';

  export default {
    mixins: [mixin],
    name: 'Commission',
    data() {
      return {
        check: false,
        isChannel:'',
        checkbox: 'checkbox',
        showMoney: false,
        confirmBank: false,
        showWayArrival: false,
        defaultBut: true,
        accountType: true,
        addUser: false,
        showBank: false,
        defaultButPublic: false,
        bankNoPublic: '',
        bankNoUser: '',
        userName: '',
        cardNo: '',
        bankCode: '',
        bankCode2: '',
        branchName: '',
        withdrawalData: {},
        defaultBankCardData: {
          bank_code: 'DEFAULT',
          bank_no: ''
        },
        num: '',
        val: '',
        bankCodeUser: 'DEFAULT',
        bankCodePublic: 'DEFAULT',
        publicAccountTip: '',
        successWithdrawal: false,
        gotItNum: 0,
        determinationWithdrawal: false,
      }
    },
    created(){
      this.$axios.fetchPost('/getUserInfo',{},this.$cookie.get('token')).then(res=>{
        res.data.isChannel === 0 ? this.isChannel = true : this.isChannel = false;
      });
    },
    computed: {
      confirmImg() {
        return require(`../../../../assets/img/cash/bank-${this.bankCodePublic}.png`)
      },
      confirmImg2() {
        return require(`../../../../assets/img/cash/bank-${this.bankCodeUser}.png`)
      }
    },
    components: {
      BankCard,
    },
    mounted() {
      this.$validator.extend('isNotCardNo', {
        getMessage:(field) => `请填写正确的${field}!`,
        validate:(value) => {
          return /\d{15}|\d{19}/.test(value);
        }
      });

      let obj = document.getElementsByTagName('img');
      this.$nextTick(() => {
        for(let i = 0;i < obj.length; i++) {
          obj[i].onclick = function(event) {
            event.preventDefault();
          };
        }
      })
    },
    methods: {
      // gotItFuc() {
      //   this.showWayArrival = true;
      //   this.gotItNum = 1;
      //   this.determinationWithdrawal = false;
      // },

      selectBankName(obj) {
        this.showBank = false;
        this.bankCode = obj.name;
        this.bankCode2 = obj.code;
      },

      checkAttrFuc() {
        this.check = !this.check
      },

      hrefRecordFuc() {
        this.$router.push('/user/commission/record')
      },

      realTimeVal() {
        if(this.val > this.withdrawalData['available']) {
          this.val = '';
          this.$toast('超出最大可提现金额');
        }
      },

      confirmBankFuc() {
        if(this.val !== '' && this.val < 10) {
          this.val = '';
          this.$toast('提现金额不能小于10元');
          return;
        } else if(this.val === '') {
          this.$toast('提现金额不能为空');
          return;
        } else if(this.val !== '' && this.check === false) {
          this.$toast('请勾选账户协议');
          return;
        }
        this.withdrawalFuc();
        // if(this.val <= this.withdrawalData['available'] && this.check && this.val !== '') {
        //   // this.confirmBank = !this.confirmBank;
        // }
      },

      pasteTextFuc() {
        this.$toast.clear();
        if(this.successWithdrawal && !this.defaultBut && this.gotItNum !== 1) {
          const pasteTextVal2 = document.getElementsByClassName('pasteText')[0].innerText;
          document.getElementsByClassName('copyTextBut2')[0].setAttribute('data-clipboard-text', pasteTextVal2);

          let clipboard2 = new Clipboard('.copyTextBut2');

          clipboard2.on('success', (e) => {
            this.$toast('已经将内容复制到粘贴板');
            e.clearSelection();
          });
        } else if(this.gotItNum === 1) {
          const pasteTextVal = document.getElementsByClassName('pasteText')[0].innerText;
          document.getElementsByClassName('copyTextBut')[0].setAttribute('data-clipboard-text', pasteTextVal);

          let clipboard = new Clipboard('.copyTextBut');

          clipboard.on('success', (e) => {
            this.$toast('已经将内容复制到粘贴板');
            e.clearSelection();
          });
        }
      },

      // bankCardDataFuc(data) {
      //   console.log(data)
      //   this.withdrawalData = data.data;
      //   this.publicAccountTip = data.data['publicAccountTip'];
      //   this.defaultBankCardData = data.data['defaultBankCard'];
      //   this.withdrawalData['myBankCards'].forEach((item) => {
      //     if((item.default === 1 || item.default === 0) && item['account_type'] === 0) {
      //       this.defaultBut = true;
      //       this.bankCodeUser = item['bank_code'];
      //       this.bankNoUser = item['bank_no'].substring(0, 4)
      //         + '&nbsp;&nbsp;****&nbsp;****&nbsp;&nbsp;'
      //         + item['bank_no'].substr(-4);
      //     } else if(item.default === 1 && item['account_type'] === 1) {
      //       this.defaultBut = false
      //     }
      //     if(this.withdrawalData['myBankCards'].length === 1 && item['account_type'] !== 1) {
      //       this.accountType = false
      //     }
      //     if(this.withdrawalData['myBankCards'].length === 2 && item['account_type'] === 1) {
      //       this.accountType = true;
      //       this.defaultButPublic = true;
      //       this.bankCodePublic = item['bank_code'];
      //       this.bankNoPublic = item['bank_no'].substring(0, 4)
      //         + '&nbsp;&nbsp;****&nbsp;****&nbsp;&nbsp;'
      //         + item['bank_no'].substr(-4);
      //     }
      //   });
      //   this.withdrawalData['bankPayInfos'].forEach((item) => {
      //     item.src = require('../../../../assets/img/realNameCard/bank_'+item.code+'.png');
      //   });
      // },

      bankCardDataFuc(data) {
        console.log(data)
        this.withdrawalData = data.data;
        this.publicAccountTip = data.data['publicAccountTip'];
        this.withdrawalData['myBankCards'].forEach((item) => {
          if(item.account_type === 0){
            this.defaultBankCardData = item;
          }
        });
        this.withdrawalData['bankPayInfos'].forEach((item) => {
          item.src = require('../../../../assets/img/realNameCard/bank_'+item.code+'.png');
        });
      },

      // confirmPublicAccount() {
      //   this.$validator.validate().then(result => {
      //     if (!result) {
      //       for(let i = 0, l = this.$validator.errors.items.length; i < l; i++) {
      //         this.$toast({
      //           duration: 3000,
      //           message: this.$validator.errors.items[0].msg,
      //         });
      //       }
      //     } else {
      //       this.$toast.loading({
      //         mask: true,
      //         message: '正在添加...',
      //         duration: 0
      //       });
      //       commissionApi.addPublicAccount({
      //         userName: this.userName,
      //         cardNo: this.cardNo,
      //         bankCode: this.bankCode2,
      //         branchName: this.branchName,
      //       }, this.$cookie.get('token')).then(res => {
      //         const _msg = res['msg'];
      //         if(res.code === '1') {
      //           commissionApi.toWithdrawal({}, this.$cookie.get('token')).then(res => {
      //             this.bankCardDataFuc(res);
      //             this.$toast.clear();
      //             this.$toast(_msg);
      //             this.addUser = false;
      //           });
      //         }
      //       });
      //     }
      //   });
      // },

      // defaultButFuc(boole) {
      //   let accountType;
      //   this.defaultBut = boole;
      //   if(this.defaultBut) {
      //     accountType = 0
      //   } else {
      //     accountType = 1;
      //     if(this.publicAccountTip === '0') {
      //       this.showWayArrival = true;
      //       commissionApi.publicAccountTip({}, this.$cookie.get('token')).then(res => {
      //         commissionApi.toWithdrawal({}, this.$cookie.get('token')).then(json => {
      //           this.bankCardDataFuc(json);
      //           this.defaultBut = !this.defaultBut
      //         });
      //       });
      //     }
      //   }
      //   this.withdrawalData['myBankCards'].forEach((item) => {
      //     if(item['account_type'] === accountType) {
      //       this.defaultBankCardData = item;
      //     }
      //   });
      // },

      withdrawalFuc() {
        // if(!this.defaultButPublic && !this.defaultBut) {
        //   this.$toast({
        //     message: '请添加对公账户'
        //   });
        //   return;
        // }

        if(!this.defaultBut) {
          this.showWayArrival = true;
          this.successWithdrawal = true;
          this.gotItNum = 0;
          this.determinationWithdrawal = true
        } else {
          this.successWithdrawal = false;
          this.gotItNum = 0;
          this.determinationWithdrawal = false;
          this.successWithdrawalFuc();
        }
      },

      successWithdrawalFuc(str) {
        if(str === 'gotIt') {
          this.showWayArrival = false;
          return;
        }

        if(this.$refs['knowName'] !== undefined && this.$refs['knowName'].innerText === '知道了' && this.determinationWithdrawal) {
          this.showWayArrival = false;
          return;
        }
        if(this.gotItNum === 1) {
          this.showWayArrival = false;
          return;
        }
        if(this.successWithdrawal && !this.defaultBut) {
          this.showWayArrival = !this.showWayArrival;
        }
        if(this.successWithdrawal && !this.defaultBut || !this.successWithdrawal && this.defaultBut) {
          this.showWayArrival = false;
          this.$toast.loading({
            mask: true,
            message: '提现中...',
            duration: 0
          });
          commissionApi.withdrawal({
            withdrawAmount: this.val,
            accountType: this.defaultBut ? 0 : 1
          }, this.$cookie.get('token')).then(res => {
            if(res.code === '1') {
              this.$toast.clear();
              this.$toast({
                message: '提现申请成功'
              });
              this.$router.back();
            }
          });
        }
      }
    }
  }
</script>

<style lang="less" src="./commission.less"></style>
