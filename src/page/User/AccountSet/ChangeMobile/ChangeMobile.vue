<template>
  <div class="changeMobile">
    <main>
      <van-field
        placeholder="请输入原手机号"
        :left-icon="phoneImg1"
        readonly
        class="changeMobile-img1"
        v-model="oldMobile"
        maxlength="11"
        v-validate.initial="'required|mobile'"
        name="原手机号"
        id="mobileName"
      />
      <div class="flex flex-align-center flex-justify-center" style="margin-bottom: 12px;">
        <van-field
          placeholder="请输入短信验证码"
          :left-icon="email"
          v-model="yzm"
          maxlength="6"
          class="changeMobile-img1 changeMobile-email"
        >
        </van-field>
        <van-button
          slot="button"
          type="primary"
          :disabled="codeDisabled"
          v-on:click="modifyMobile('yzm')"
        >
          {{this.codeMsg}}
        </van-button>
      </div>
      <van-field
        placeholder="请输入新手机号"
        :left-icon="phoneImg2"
        class="changeMobile-img1"
        v-model="newMobile"
        maxlength="11"
      />
      <!--v-validate.initial="'required|mobile|isNotMobile'"-->
      <!--name="新手机号"-->
      <!--id="mobileName"-->
      <van-button type="default" v-on:click="modifyMobile">提&nbsp;&nbsp;&nbsp;&nbsp;交</van-button>
    </main>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/26
  */
  import * as changeMobileApi from './changeMobileApi';
  import { mixin } from '../../../../utils/common';
  import { mapGetters } from 'vuex';
  import {
    SEND_YZM,
  } from '../../../../store/mutation-type';

  export default {
    mixins: [mixin],
    name: 'ChangeMobile',
    data() {
      return {
        phoneImg1: require( '../../../../assets/img/changeMobile/mobile1.png'),
        phoneImg2: require( '../../../../assets/img/changeMobile/mobile2.png'),
        email: require( '../../../../assets/img/changeMobile/email.png'),
        oldMobile: this.$cookie.get('userPhone'),
        newMobile: '',
        yzm: '',
        codeDisabled: false,
      }
    },
    computed: {
      ...mapGetters([
        'gettersSearchData',
      ]),
    },
    created() {
      this.$validator.extend('isNotMobile', {
        getMessage:() => '新旧手机号码不能一致!',
        validate:(value) => {
          return this.oldMobile !== value;
        }
      });
    },
    methods: {
      modifyMobile(str) {
        this.$validator.validate().then(result => {
          if (!result) {
            for(let i = 0, l = this.$validator.errors.items.length; i < l; i++) {
              this.$toast({
                message: this.$validator.errors.items[0].msg,
              });
            }
          } else {
            str === 'yzm' ? this.postAccountYzm() : this.postAccountSettings();
          }
        });
      },
      postAccountYzm() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: "spinner"
        });

        this.$store.dispatch(SEND_YZM, {
          userPhone: this.oldMobile,
          smsType: '50001'
        }).then(() => {
          if(this.gettersSearchData['gettersSearchData'].code === '1' && !this.timer) {
            setTimeout(() => {
              this.$toast.clear();
              this.$toast({
                message: '发送验证码成功！'
              });
            }, 1000);
            this.sendVerificationCode();
          }
        })
      },
      /*
       更换手机号
       */
      postAccountSettings() {
        if(this.yzm === '') {
          this.$toast({
            message: '验证码不能为空！',
          });
          return;
        }
        if(!/^[1][0-9][0-9]{9}$/.test(this.newMobile)) {
          this.$toast({
            message: '请输入正确的新手机号！',
          });
          return;
        }
        changeMobileApi.accountSettings({
          settingType: 'mobile',
          oldMobile: this.oldMobile,
          newMobile: this.newMobile,
          smsType: '50001',
          smsCode: this.yzm,
        }, this.$cookie.get('token')).then(res => {
          if(res.code === '1') {
            this.$toast({
              message: '更换成功！',
            });
            this.$cookie.delete('token');
            this.$router.push('/loginRegister/login');
          }
        });
      }
    }
  }
</script>

<style lang="less" src="./changeMobile.less"></style>
