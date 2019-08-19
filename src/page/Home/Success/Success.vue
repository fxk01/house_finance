<template>
    <div class="success">
        <div class="hint-info">
            <van-icon name="certificate" />
            <div>提单成功</div>
            <p>请通知借款联系人保持手机通畅</p>
            <p>城市市场经理会在1小时内与借款联系人联系</p>
        </div>
        <van-button size="large" class="test" @click="goAccessTest">测一测提单准入资格</van-button>
        <van-button size="large" class="back" @click="backHome">返回首页</van-button>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        backHome(){
            this.$router.push('/');
        },
        goAccessTest(){
            this.$router.push({name: 'accessTest'});
        }
    }
}
</script>
<style lang="less" src="./success.less">
    
</style>