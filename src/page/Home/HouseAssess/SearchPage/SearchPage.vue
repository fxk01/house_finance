<template>
  <div id="searchPage">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div
          slot="action"
          @click="onSearch"
        >搜索</div>
      </van-search>
    </form>
    <ul v-if="isOk" class="list">
      <li
        v-for="(item) in cityList"
        :key="item.ID"
      >{{item.Aliases}}</li>
      <p v-show="cityList.length === 0">很抱歉，没有查询出结果</p>
    </ul>
  </div>
</template>
<script>
import { Search } from "vant";
export default {
  data() {
    return {
      value: "",
      cityList: [],
      isOk:false
    };
  },
  methods: {
    onSearch() {
        console.log(this.$route);
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask:true,
        message: "正在查询.."
      });
      this.$axios
        .fetchPost(
          "/getConstruction",
          { cityId: this.$route.params.id, houses_name: this.value },
          this.$cookie.get("token")
        )
        .then(res => {
          console.log(res);
          this.cityList = res.data;
          toast.clear();
          this.isOk = true;
        });
    }
  },
  components: {
    [Search.name]: Search
  }
};
</script>
<style lang="less">
#searchPage {
  .van-search {
    padding: 20px 20px;
    background-color: #fff !important;
    .van-cell {
      background-color: #f6f6f7;
      padding: 0 16px;
      height: 54px;
      line-height: 54px;
      font-size: 24px;
      border-radius: 27px;
      .van-icon {
        line-height: 54px;
        font-size: 32px;
        margin-right: 10px;
      }
    }
  }
  .list {
    text-align: center;
    font-size: 28px;
    color: #000;
    li {
      padding: 20px 0;
    }
    li:nth-child(2n) {
      background-color: #fff;
    }
    p {
        padding: 50px 0;
    }
  }
}
</style>