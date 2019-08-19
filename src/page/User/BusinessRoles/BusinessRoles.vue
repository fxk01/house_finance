<template>
  <div class="businessRoles">
    <header>
      <h1>
        <img src="../../../assets/img/icon_user.png" class="icon-user">
        {{userRoleData.name}}
      </h1>

      <div class="businessRoles-explain">
        <strong>业务权限：</strong>
        <span>{{userRoleData.rights_desc}}</span>
      </div>

      <div class="businessRoles-explain">
        <strong>提成：</strong>
        <span>{{userRoleData.commission_desc}}</span>
      </div>
    </header>

    <main>
      <div class="text-ag-center">
        <img src="../../../assets/img/icon_gn.png" class="icon-fun">
      </div>

      <ul class="businessRoles-wrap" v-for="(value, key) in userRoleData['description']" :key="key">
        <li>{{value}}</li>
      </ul>
    </main>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/4/9
  */

  import * as businessRolesApi from './businessRolesApi';
  import { mixin } from '../../../utils/common';

  export default {
    mixins: [mixin],
    data() {
      return {
        userRoleData: {}
      }
    },
    name: 'BusinessRoles',
    mounted() {
      businessRolesApi.userRoleDetail({userRole: this.parseURL('role')}, this.$cookie.get('token')).then(res => {
        if(res.code === '1') {
          this.userRoleData = res.data;
          this.userRoleData['description'] = this.filterData('description');
        }
      });
    },
    methods: {
      filterData(str) {
        return this.userRoleData[str].split(/[\s\n]/).filter((s) => {
          return s && s.trim();
        });
      }
    }
  }
</script>

<style lang="less" src="./businessRoles.less"></style>
