<template>
  <div class="accountingRecord">
    <Record />
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/6/14
  */

  import Record from '../../../components/record';

  export default {
    name: 'AccountingRecord',
    components: {
      Record,
    },
  }
</script>

<style lang="less" src="./accountingRecord.less"></style>
