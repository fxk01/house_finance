<template>
  <div class="access-test">
    <div class="access">
      <div
        class="test"
        v-for="(item, index) in dataTest"
        :key="item.sort_num"
      >
        <div class="title">{{item.sort_num}}.{{item.exam_question}}</div>
        <van-radio-group v-model="item.exam_type">
          <van-radio
            checked-color="#8e6e4a"
            :name="exam.score"
            v-for="(exam, index) in item.exam_answer"
            :key="exam.sort"
          >{{exam.name}}</van-radio>
        </van-radio-group>
        <div
          class="status"
          v-show="item.exam_type==2"
        >
          <van-icon
            name="success"
            color="#00b81c"
          />
        </div>
        <div
          class="status"
          v-show="item.exam_type==1"
        >
          <van-icon
            name="cross"
            color="#b80201"
          />
        </div>
      </div>
    </div>
    <div class="bottom">------------------------- 我是底线 -------------------------</div>
    
    <router-link class="btn" to="/">完成准入测试，返回首页</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "0",
      dataTest: []
    };
  },
  methods: {},
  created() {
    //   获取测试数据
    this.$axios
      .fetchPost("/getQuestionList", {}, this.$cookie.get("token"))
      .then(res => {
        console.log(res);
        this.dataTest = res.data;
      });
  },
  components: {
  }
};
</script>
<style lang="less" src="./accessTest.less">
</style>