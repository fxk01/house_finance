<template>
  <div class="myCard">
    <div class="myCard-hg-44"></div>
    <div class="myCard-mp">
      <p class="myCard-name">{{myCardData.userName}}</p>
      <p class="myCard-userType">山高房金经纪人</p>
      <!--<p class="myCard-userType">{{myCardData['userType']}}</p>-->
      <p class="myCard-userPhone">
        {{myCardData['userPhone'].substring(0, 3)}}&nbsp;
        {{myCardData['userPhone'].substring(3, 7)}}&nbsp;
        {{myCardData['userPhone'].substring(7, 11)}}
      </p>
    </div>
    <div class="myCard-hg-88"></div>
    <section class="flex flex-justify-center">
      <!--<a href="javascript:" class="inline-block" download="名片">-->
        <!--<van-button type="default" class="myCard-phone">-->
          <!--<img src="../../../assets/img/card/baocun.png" class="vertical-align-middle myCard-cun-img">-->
          <!--<span>&nbsp;&nbsp;保存名片到手机上</span>-->
        <!--</van-button>-->
      <!--</a>-->
      <!--<van-button type="default" class="myCard-style">-->
        <!--<img src="../../../assets/img/card/ic_style.png" class="vertical-align-middle myCard-style-img">-->
        <!--<span class="vertical-align-middle">&nbsp;&nbsp;更换名片样式</span>-->
      <!--</van-button>-->
    </section>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/27
  */
  import * as myCardApi from './myCardApi';

  export default {
    name: 'MyCard',
    data() {
      return {
        myCardData: {
          photo: "",
          qrcode: "",
          userName: "",
          userPhone: "",
          userType: "",
        }
      }
    },
    beforeCreate() {
      myCardApi.myCard({}, this.$cookie.get('token')).then(res => {
        this.myCardData = res.data;
      });
    }
  }
</script>

<style lang="less" src="./myCard.less"></style>
