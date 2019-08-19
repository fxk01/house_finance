<template>
  <div class="dispatchList">
    <main>
      <ul>
        <li class="dispatchList-wrap-pd" v-on:click="hrefDetails">
          <p class="dispatchList-title">宅业贷</p>
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
        </li>

        <li class="dispatchList-wrap-pd" v-on:click="hrefDetails">
          <p class="dispatchList-title">宅急贷</p>
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
        </li>

        <li class="dispatchList-wrap-pd">
          <p class="dispatchList-title">企业经营贷</p>
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
        </li>

        <li class="dispatchList-wrap-pd">
          <p class="dispatchList-title">企业经营贷</p>
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
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'DispatchList',
    methods: {
      hrefDetails() {
        this.$router.push({
          name: 'DispatchDetails'
        })
      }
    }
  }
</script>

<style lang="less" src="./dispatchList.less"></style>
