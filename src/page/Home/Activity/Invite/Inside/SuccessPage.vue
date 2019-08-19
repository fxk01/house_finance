<template>
    <div class="successPage">
        <img src="../../../../../assets/img/activity/invite/successImg.png" alt="">
        <p>提交成功 !</p>
        <div>国内双人游奖励在活动结束后7个工作日内安排寄送</div>
        <van-button type="default" class="btn" @click="$router.push({name:'inviteIndex'})">查看更多福利</van-button>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
    .successPage {
        text-align: center;
        padding-top: 110px;
        height: 100%;
        background-color: #fff;
        >img {
            width: 336px;
            height: 299px;
        }
        >p {
            font-size: 52px;
            color: #f76e1d;
            margin-top: 50px;
            margin-bottom: 40px;
        }
        >div {
            width: 590px;
            margin: 0 auto;
            font-size: 28px;
            color: #9b9b9b;
            line-height: 50px;
        }
        .btn {
            width: 540px;
            height: 100px;
            line-height: 100px;
            border-radius: 50px;
            font-size: 32px;
            color: #fff;
            border: none;
            background: linear-gradient(to bottom,#fb8700,#fd5501);
            margin-top: 100px;
            box-shadow: 0px 3px 20px 5px #fec9ae;
        }
    }
</style>