<template>
  <div class="realNameCard">
    <header>
      <img src="../../../../assets/img/realNameCard/card.png" class="realNameCard-card-img">
      <p class="realNameCard-card-p">
        实名绑卡用于经纪人提单统计、活动奖励发放、佣金支付等等， 为了您的权益请先完成绑卡。
      </p>
    </header>

    <section>
      <div class="realNameCard-title">
        验证持卡人身份
      </div>

      <ul>
        <li>
          <van-field
            v-model="userName"
            :readonly="this.opType === '2'"
            type="text"
            label="真实姓名"
            placeholder="请输入本人真实姓名"
            v-validate.initial="'required'"
            @blur.prevent="inputLoseFocus"
            name="真实姓名"
            required
          />
        </li>
        <li>
          <van-field
            v-model="idNo"
            :readonly="this.opType === '2'"
            type="text"
            label="身份证号码"
            placeholder="请输入本人的身份证号码"
            v-validate.initial="'required|isNotCardNo'"
            @blur.prevent="inputLoseFocus"
            name="身份证号码"
            required
          />
        </li>
        <li>
          <van-field
            v-model="cardNo"
            type="tel"
            label="银行卡号"
            placeholder="请输入本人银行卡号"
            v-validate.initial="'required'"
            @blur.prevent="inputLoseFocus"
            name="银行卡号"
            required
          />
        </li>
        <li>
          <van-field
            v-model="bankName"
            :value="bankName"
            v-on:click="linkBackFuc"
            type="text"
            label="银行名称"
            placeholder="请输入银行名称"
            v-validate.initial="'required'"
            @blur.prevent="inputLoseFocus"
            name="银行名称"
            :disabled="bankNameDisabled"
            readonly
            required
          />
        </li>
        <li>
          <van-field
            v-model="mobile"
            maxlength="11"
            type="tel"
            label="银行预留手机号"
            placeholder="请输入银行预留手机号"
            v-validate.initial="'required|mobile'"
            @blur.prevent="inputLoseFocus"
            name="银行预留手机号"
            required
          />
        </li>
        <li>
          <!--v-validate.initial="'required'"-->
          <van-field
            center
            v-model="smsCode"
            maxlength="6"
            type="tel"
            label="短信验证码"
            placeholder="请填写短信验证码"
            @blur.prevent="inputLoseFocus"
            name="短信验证码"
            required
          >
            <van-button slot="button" size="small" type="primary" v-on:click="postBankYzm" :disabled="codeDisabled">{{this.codeMsg}}</van-button>
          </van-field>
        </li>
      </ul>

      <p class="realNameCard-card-link" v-on:click="linkBackFuc">
        <span class="vm">支持绑定的银行列表&nbsp;</span>
        <img src="../../../../assets/img/realNameCard/arrow.png" class="realNameCard-arrow vm">
      </p>
    </section>

    <van-button
      type="default"
      class="realNameCard-finish"
      v-on:click="postBankCardFuc"
      :disabled="submitDisabled"
    >
      提交，&nbsp;完成绑卡
    </van-button>

    <van-actionsheet
      v-model="show"
      title="银行列表"
    >
      <ul class="bankList">
        <li v-for="(item, index) in bankPayInfosData['bankPayInfos']" :key="index" v-on:click="selectBankName(item)">
          <img :src="item.src">
          <span class="vertical-align-middle">&nbsp;&nbsp;&nbsp;{{item.name}}</span>
        </li>
      </ul>
    </van-actionsheet>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/3/4
  */
  import * as realNameCardApi from './realNameCardApi';
  import { mixin } from '../../../../utils/common';
  import { mapGetters } from 'vuex';
  import { SEND_YZM } from "../../../../store/mutation-type";

  export default {
    mixins: [mixin],
    name: 'RealNameCard',
    data() {
      return {
        show: false,
        bankPayInfosData: {},
        userName: '',
        idNo: '',
        cardNo: '',
        bankName: '',
        mobile: '',
        smsCode: '',
        orderNo: '',
        bankCode: '',
        submitDisabled: true,
        bankNameDisabled: false,
        cardNoName: {
          ICBC: '中国工商银行',
          CCB: '中国建设银行',
          ABC: '中国农业银行',
          BOC: '中国银行',
          BCOM: '交通银行',
          CMB: '招商银行',
          CMBC: '中国民生银行',
          PSBC: '中国邮政储蓄银行',
          CIB: '兴业银行',
          PAB: '平安银行',
          CITIC: '中信银行',
          CEB: '中国光大银行',
          GDB: '广发银行',
          SPDB: '上海浦东发展银行',
          HXB: '华夏银行',
          SHB: '上海银行',
          BOB: '北京银行',
          CITI: '花旗银行',
          BEA: '东亚银行',
        },
        codeDisabled: false,
        opType:this.$route.query.opType
      };
    },
    created() {
      console.log(this.opType);
      this.$watch('cardNo', this.deBounce((newQuery) => {
        if(this.cardNo.length > 5) {
          realNameCardApi.getBankCardBin({cardNo: this.cardNo.replace(/\s*/g, '')}, this.$cookie.get('token')).then(res => {
            this.bankName = '';
            this.bankNameDisabled = false;
            if(res.data) {
              for(let i in this.cardNoName) {
                if(res.data === i) {
                  this.bankCode = i;
                  this.bankName = this.cardNoName[i];
                  this.bankNameDisabled = true;
                }
              }
            }
          });
        } else {
          this.bankName = '';
          this.bankNameDisabled = false;
        }
      }, 500))
    },
    mounted() {
      realNameCardApi.toAddBankCard({}, this.$cookie.get('token')).then(res => {
        this.bankPayInfosData = res.data;
        this.userName = res.data['userName'];
        this.idNo = res.data['idNo'];
        this.bankPayInfosData['bankPayInfos'].forEach((item) => {
          item.src = require('../../../../assets/img/realNameCard/bank_'+item.code+'.png');
        });
      });
      this.$validator.extend('isNotCardNo', {
        getMessage:(field) => `${field}不正确!`,
        validate:(value) => {
          return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
        }
      });
      // this.$validator.extend('isNotBankNo', {
      //   getMessage:(field) => `${field}不正确!`,
      //   validate:(value) => {
      //     return /^([1-9]{1})(\d{14}|\d{18})$/.test(value);
      //   }
      // });
    },
    computed: {
      ...mapGetters(["gettersSearchData"])
    },
    methods: {
      selectBankName(obj) {
        this.show = false;
        this.bankName = obj.name;
        this.bankCode = obj.code;
      },
      onSelect() {
        this.show = false;
      },
      linkBackFuc() {
        this.show = true;
      },
      postBankYzm() {
        this.$validator.validate().then(result => {
          if (!result) {
            for(let i = 0, l = this.$validator.errors.items.length; i < l; i++) {
              let _field = this.$validator.errors.items[i].field;
              if(_field === '真实姓名' || _field === '身份证号码' || _field === '银行卡号' || _field === '银行预留手机号') {
                this.$toast({
                  duration: 3000,
                  message: this.$validator.errors.items[i].msg,
                });
                return false;
              }
            }
          } else {
            this.poAddBankCardSendCode();
          }
        });
      },
      postBankCardFuc() {
        this.$validator.validate().then(result => {
          if (!result) {
            for(let i = 0, l = this.$validator.errors.items.length; i < l; i++) {
              this.$toast({
                duration: 3000,
                message: this.$validator.errors.items[0].msg,
              });
            }
          } else {
            this.submitAddBankCard();
          }
        });
      },
      /*
       提交绑卡信息
       */
      submitAddBankCard() {
        if(this.smsCode === '') {
          this.$toast({
            duration: 3000,
            message: '短信验证码不能为空',
          });
          return false;
        }
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
        });
        realNameCardApi.addBankCard({
          userName: this.userName,
          cardNo: this.cardNo.replace(/\s*/g, ''),
          mobile: this.mobile,
          idNo: this.idNo,
          smsCode: this.smsCode,
          opType: this.opType,
          bankCode: this.bankCode,
          smsType: '40001',
          // orderNo: this.orderNo,
        }, this.$cookie.get('token')).then(res => {
          this.$toast.clear();
          this.$toast({
            message: '绑卡成功！',
          });
          this.$cookie.set('isAuth', 'true');
          if(this.parseURL('back') ==='1' ){
            this.$router.push({name:'turntable',query:{isBack:true}});
          }else {
            this.$router.push({name: "UserPage"});
          }
          // this.$router.back();
        });
      },
      /*
       发送验证码
       */
      poAddBankCardSendCode() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
        });

        this.$store.dispatch(SEND_YZM, {
          userPhone: this.mobile,
          smsType: '40001'
        }).then(() => {
          if(this.gettersSearchData["gettersSearchData"].code === "1" && !this.timer) {
            this.$toast.clear();
            this.$toast({
              message: this.gettersSearchData["gettersSearchData"].msg,
            });
            this.submitDisabled = false;
            this.sendVerificationCode();
          }
        });

        // realNameCardApi.sendSms({
        //   userName: this.userName,
        //   cardNo: this.cardNo,
        //   mobile: this.mobile,
        //   idNo: this.idNo,
        //   opType: this.parseURL('opType'),
        //   smsType: 40001
        // }, this.$cookie.get('token')).then(res => {
        //   if(res.code === '1') {
        //     this.$toast.clear();
        //     this.$toast({
        //       message: res['msg'],
        //     });
        //     this.orderNo = res.data['order_no'];
        //     if(this.orderNo) {
        //       this.submitDisabled = false;
        //     }
        //     this.sendVerificationCode();
        //   }
        // });
      },
      inputLoseFocus() {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }
  }
</script>

<style lang="less" src="./realNameCard.less"></style>
