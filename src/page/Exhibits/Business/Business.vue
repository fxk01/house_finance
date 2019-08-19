<template>
  <div class="business">
    <header>
      <ul :class="`flex flex-justify-center flex-align-center ${typeListData.length > 5 ? 'business-overflow-x' : ''}`">
        <li v-for="(item, index) in typeListData" v-on:click="queryPromotionList(item.type)" :key="index">
          <div :class="{'active':currentType===item.type}">
            <img :src="item.icon">
          </div>
          <p>{{item.type}}</p>
        </li>
      </ul>

      <div class="business-not-data" v-show="typeListData.length <= 0">
        暂无数据！
      </div>
    </header>

    <main>
      <ul class="list">
        <li v-for="(item, index) in PromotionListData" :key="index" v-on:click="hrefPosterFuc(item)">
          <img @click.prevent="" v-lazy="JSON.parse(item['e_images'])['slt_api_path'] || JSON.parse(item['e_images'])['api_path']" class="business-img">
          <h1>{{JSON.parse(item['e_images']).title}}</h1>
          <div>
            <p class="business-text" style="display: initial;">{{item.e_type}}</p>
            <!-- <p class="business-text2">{{item['record_status']}}</p> -->
          </div>
        </li>
      </ul>
      <div class="business-not-data" v-show="PromotionListData.length <= 0" v-cloak>
        暂无数据！
      </div>
    </main>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/2/19
  */
  import * as businessApi from './businessApi';

  export default {
    name: 'Business',
    data() {
      return {
        typeListData: [{
          icon: '',
          type: ''
        }],
        currentType:'全部',
        PromotionListData: [],
      }
    },
    beforeCreate() {
      businessApi.getPromotionTypeList().then(res => {
        console.log(res);
        this.typeListData = res.data;
      });

      businessApi.getPromotionList({e_type: '',cityCode:this.$cookie.get('cityCode')?this.$cookie.get('cityCode'):'177'}).then(res => {
        console.log(res)
        this.PromotionListData = res.data;
      });
    },
    methods: {
      queryPromotionList(type) {
        this.currentType = type;
        let _type = type === '全部' ? '' : type;
        businessApi.getPromotionList({e_type: _type,cityCode:this.$cookie.get('cityCode')?this.$cookie.get('cityCode'):'177'}).then(res => {
          console.log(res)
          this.PromotionListData = res.data;
        });
      },
      hrefPosterFuc(obj) {
        if(obj.e_type !== 'H5'){
          this.$store.commit('changeImgUrl',obj.deatil_path);
          this.$store.commit('changeText',JSON.parse(obj.e_images)['odal']);
          localStorage.setItem('imgUrl',this.$store.state.exhibits.imgUrl);
          localStorage.setItem('text',this.$store.state.exhibits.text);
          this.$router.push('/exhibits/poster');
        }else {
          location.href = JSON.parse(obj.e_images)['page_url'];
        }
      }
    }
  }
</script>

<style lang="less" src="./business.less"></style>
