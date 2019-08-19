<template>
  <div class="evaluationDetails">
    <header>
      <div class="evaluationDetails-title">
        为了给您提供更优质的服务和体验，您的每次服务评价对我们都很重要。
      </div>
      <section>
        <div class="flex flex-align-center flex-justify-start evaluationDetails-goods">
          <p class="flex-1 evaluationDetails-p1">{{serviceDetailData['p_name']}}</p>
          <p class="flex-1">订单编号<br />{{serviceDetailData['order_no']}}</p>
          <p class="flex-1">{{serviceDetailData['loan_date']}}</p>
        </div>

        <ul class="flex flex-align-center flex-justify-start evaluationDetails-wrap-ul">
          <li class="flex-1">
            <p>借款联系人</p>
            <strong>{{serviceDetailData['borrower_name']}}</strong>
          </li>
          <li class="flex-1">
            <p>拟借款金额</p>
            <strong>{{serviceDetailData['loan_amount']}}万元</strong>
          </li>
          <li class="flex-1">
            <p>拟借款期限</p>
            <strong>{{serviceDetailData['borrowing_period']}}个月</strong>
          </li>
        </ul>
      </section>
    </header>

    <main>
      <div class="evaluationDetails-wrap-content">
        <div class="evaluationDetails-content-title">
          <img src="../../../../assets/img/evaluation/nav_bd.png" class="evaluationDetails-img-nav">
          <span>房金经理服务评价</span>
        </div>
        <ul>
          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">专业度</p>
            <div class="flex-1 evaluationDetails-wrap-div">
              <van-rate
                v-model="rateFjValue"
                :count="5"
                color="#8b6f4e"
                void-color="#8b6f4e"
              />
              <ul class="flex evaluationDetails-right-item">
                <li>不专业</li>
                <li>一般</li>
                <li>中等</li>
                <li>专业</li>
                <li>非常专业</li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">服务态度</p>
            <div class="flex-1 evaluationDetails-wrap-div2">
              <van-rate
                v-model="rateFjValue2"
                :count="5"
                color="#8b6f4e"
                void-color="#8b6f4e"
              />
              <ul class="flex evaluationDetails-right-item2">
                <li>很差</li>
                <li>不好</li>
                <li>一般</li>
                <li>好</li>
                <li>非常好</li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title width-270">是否有冲撞？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioFj1" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">是否有侮辱性语言？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioFj2" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">是否要求额外收费？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioFj3" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="evaluationDetails-wrap-content" v-if="statusEvaluation">
        <div class="evaluationDetails-content-title">
          <img src="../../../../assets/img/evaluation/kefu-2.png" class="evaluationDetails-img-nav">
          <span>专属客服服务评价</span>
        </div>
        <ul>
          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">专业度</p>
            <div class="flex-1 evaluationDetails-wrap-div">
              <van-rate
                v-model="rateZsValue"
                :count="5"
                color="#8b6f4e"
                void-color="#8b6f4e"
              />
              <ul class="flex evaluationDetails-right-item">
                <li>不专业</li>
                <li>一般</li>
                <li>中等</li>
                <li>专业</li>
                <li>非常专业</li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">服务态度</p>
            <div class="flex-1 evaluationDetails-wrap-div2">
              <van-rate
                v-model="rateZsValue2"
                :count="5"
                color="#8b6f4e"
                void-color="#8b6f4e"
              />
              <ul class="flex evaluationDetails-right-item2">
                <li>很差</li>
                <li>不好</li>
                <li>一般</li>
                <li>好</li>
                <li>非常好</li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title width-270">是否有冲撞？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioZs1" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">是否有侮辱性语言？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioZs2" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="evaluationDetails-wrap-content" v-if="statusEvaluation">
        <div class="evaluationDetails-content-title">
          <img src="../../../../assets/img/evaluation/zhanghuyue.png" class="evaluationDetails-img-nav">
          <span>佣金发放服务评价</span>
        </div>
        <ul>
          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">佣金发放是否及时？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioYj1" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>

          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">佣金金额是否正确？</p>
            <div class="evaluationDetails-wrap-div2">
              <ul class="flex">
                <li>
                  <van-radio-group v-model="radioYj2" class="flex flex-align-center">
                    <van-radio name="1" checked-color="#8b6f4e">是</van-radio>
                    <van-radio name="2" checked-color="#8b6f4e">否</van-radio>
                  </van-radio-group>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="evaluationDetails-wrap-content">
        <div class="evaluationDetails-content-title">
          <img src="../../../../assets/img/evaluation/kefu-2.png" class="evaluationDetails-img-nav">
          <span>平台功能体验服务评价</span>
        </div>
        <ul>
          <li class="flex flex-align-center flex-justify-start flex-1 evaluationDetails-wrap-item">
            <p class="evaluationDetails-left-title">功能满意度</p>
            <div class="flex-1 evaluationDetails-wrap-div2">
              <van-rate
                v-model="ratePtValue"
                :count="5"
                color="#8b6f4e"
                void-color="#8b6f4e"
              />
              <ul class="flex evaluationDetails-right-item2">
                <li>很差</li>
                <li>不好</li>
                <li>一般</li>
                <li>好</li>
                <li>非常好</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="evaluationDetails-wrap-content pr-45 evaluationDetails-last-wrap">
        <textarea
          :placeholder="disabled === true ?  '' : '（选填）请留下您的宝贵意见和建议'"
          class="evaluationDetails-area"
          v-model="areaDetailValue"
          maxlength="255"
          :disabled="disabled"
        >
        </textarea>
        <van-button size="large" v-on:click="submitEvaluation" v-if="!disabled">提&nbsp;&nbsp;&nbsp;&nbsp;交</van-button>
      </div>
    </main>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/27
  */
  import * as evaluationDetailsApi from './evaluationDetailsApi';
  import { mixin } from '../../../../utils/common';

  export default {
    mixins: [mixin],
    name: 'evaluationDetails',
    data() {
      return {
        rateFjValue: 5,
        rateFjValue2: 5,
        rateZsValue: 5,
        rateZsValue2: 5,
        ratePtValue: 5,
        serviceDetailData: {},
        areaDetailValue: '',
        radioZs1: '2',
        radioZs2: '2',
        radioYj1: '1',
        radioYj2: '1',
        radioFj1: '2',
        radioFj2: '2',
        radioFj3: '2',
        disabled: false,
      };
    },
    computed: {
      statusEvaluation() {
        let par = parseInt(this.parseURL('status'));
        if(par === 10004 || par === 10005) {
          return false
        } else {
          return true
        }
      }
    },
    mounted() {
      evaluationDetailsApi.serviceCommentDetail({orderId: this.parseURL('id')}, this.$cookie.get('token')).then(res => {
        if(parseInt(this.parseURL('whether')) === 1) {
          this.echoDetails(res.data);
        }
        if(res.data === undefined) {
          this.serviceDetailData = {
            borrower_name: '',
            borrowing_period: '',
            loan_amount: '',
            order_no: '',
            p_name: '',
          }
        } else {
          this.serviceDetailData = res.data;
        }
      });
    },
    methods: {
      /*
       回显详情
       */
      echoDetails(data) {
        let serviceComment = JSON.parse(data['customer_service_comment']);
        let managerComment = JSON.parse(data['house_manager_comment']);
        let paymentComment = JSON.parse(data['payment_services_comment']);
        let platformComment = JSON.parse(data['platform_experience_comment']);
        this.radioZs2 = serviceComment['csHaveInsultingLanguage'] === '0' ? '2' : '1';
        this.radioZs1 = serviceComment['csHaveOffend'] === '0' ? '2' : '1';
        this.radioFj3 = managerComment['hmHaveExtraCharge'] === '0' ? '2' : '1';
        this.radioFj2 = managerComment['hmHaveInsultingLanguage'] === '0' ? '2' : '1';
        this.radioFj1 = managerComment['hmHaveOffend'] === '0' ? '2' : '1';

        this.rateZsValue = parseInt(serviceComment['csProRate']);
        this.rateZsValue2 = parseInt(serviceComment['csServiceRate']);
        this.rateFjValue = parseInt(managerComment['hmProRate']);
        this.rateFjValue2 = parseInt(managerComment['hmServiceRate']);

        this.radioYj2 = paymentComment['psCorrect'] === '0' ? '2' : '1';
        this.radioYj1 = paymentComment['psTimely'] === '0' ? '2' : '1';
        this.ratePtValue = parseInt(platformComment['peRate']);

        this.areaDetailValue = data.remark;

        this.disabled = true;
      },
      submitEvaluation() {
        evaluationDetailsApi.serviceComment({
          orderId: this.parseURL('id'),
          hmProRate: this.rateFjValue,
          hmServiceRate: this.rateFjValue2,
          hmHaveOffend: this.radioFj1 === '2' ? '0' : '1',
          hmHaveInsultingLanguage: this.radioFj2 === '2' ? '0' : '1',
          hmHaveExtraCharge: this.radioFj3 === '2' ? '0' : '1',
          csProRate: this.rateZsValue,
          csServiceRate: this.rateZsValue2,
          csHaveOffend: this.radioZs1 === '2' ? '0' : '1',
          csHaveInsultingLanguage: this.radioZs2 === '2' ? '0' : '1',
          psTimely: this.radioYj1 === '2' ? '0' : '1',
          psCorrect: this.radioYj2 === '2' ? '0' : '1',
          peRate: this.ratePtValue,
          remark: this.areaDetailValue
        }, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            this.$toast({
              message: '评价成功！'
            });
            this.$router.back();
          }
        });
      }
    }
  }
</script>

<style lang="less" src="./evaluationDetails.less"></style>
