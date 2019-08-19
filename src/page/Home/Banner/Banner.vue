<template>
    <div class="banner">
        <img :src="src" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return {
            scr:''
        }
    },
    created(){
        this.src = this.$store.state.home.bannerImg;
    }
}
</script>
<style lang="less">
    img {
        width: 100%;
    }
</style>