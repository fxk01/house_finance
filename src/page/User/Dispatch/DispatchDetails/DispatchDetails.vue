<template>
  <div class="dispatchDetails">
    <div class="dispatchDetails-wrap-pd">
      <p class="dispatchDetails-title">宅业贷</p>
      <ul>
        <li class="flex flex-justify-start mt-26">
          <p class="flex-1">贷款金额：<span class="color-000">500万</span></p>
          <p class="flex-1">贷款期限：<span class="color-000">12个月</span></p>
        </li>

        <li class="flex flex-justify-start mt-26">
          <p class="flex-1">借款人姓名：<span class="color-000">江赠洪</span></p>
          <p class="flex-1">借款人手机：<span class="color-000">15915342198</span></p>
        </li>

        <li class="flex flex-justify-start mt-26">
          <p>所在地区：<span class="color-000">广东省深圳市福田区上沙椰树村5巷24号405</span></p>
        </li>

        <li class="flex flex-justify-start mt-26">
          <p>提单时间：<span class="color-000">2019-03-18&nbsp;14:56</span></p>
        </li>
      </ul>

      <p class="dispatchDetails-title property-text">房产证照片(6)</p>
      <img src="../../../../assets/img/dispatch/property.png" width="100%" v-on:click.prevent="previewImg">

      <van-button square block type="primary" class="customer-but">联系客户</van-button>
      <van-button square block type="primary" class="customer-but2" v-on:click="followUpHref">跟进处理</van-button>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/3/28
  */
  import { ImagePreview } from 'vant';

  export default {
    name: 'DispatchDetails',
    methods: {
      previewImg() {
        ImagePreview({
          images: [
            require('../../../../assets/img/dispatch/property.png'),
          ],
          startPosition: 0,
          onClose() {
            // do something
          }
        });
      },
      followUpHref() {
        this.$router.push('/user/dispatch/details/process')
      }
    }
  }
</script>

<style lang="less" src="./dispatchDetails.less"></style>
