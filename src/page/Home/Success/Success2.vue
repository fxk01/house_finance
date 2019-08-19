<template>
    <div class="success">
        <div class="msg">
            <img src="../../../assets/img/home/success.png" alt=""><span>提单成功</span>
        </div>
        <div class="info">
            <p>请通知借款人保持手机通畅</p>
            <p>城市市场经理会在1小时内与借款人联系</p>
        </div>
        <div class="assess">
            <div class="way" v-if="$route.query.price === undefined">
                <img src="../../../assets/img/home/assess.png" alt="">
                <span class="text">额度<br/>评估中</span>
            </div>
            <i class="custom" v-else>
                <p>房产估值 (万)</p>
                <span>{{($route.query.price / 10000).toFixed(2)}}</span>
            </i>
        </div>
        <div class="tips">
            <p v-if="$route.query.price === undefined">您可以在我的提单查看房产估值</p>
            <p v-else>最终放款额度以实际风控审批为主</p>
        </div>
        <div class="btn">
            <van-button size="large" class="test" @click="goAccessTest">测一测提单准入资格</van-button>
            <van-button size="large" class="back" @click="backHome">返回首页</van-button>
        </div>
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

<style lang="less">
    .success {
        height: 100%;
        text-align: center;
        background-color: #fff;
        .msg {
            padding-top: 87px;
            padding-bottom: 71px;
            img {
                width: 51px;
                height: 52px;
                margin-right: 24px;
            }
            span {
                font-size: 36px;
                color:rgba(255,117,7,1);
                vertical-align: middle;
            }
        }
        .info {
            font-size: 28px;
        }
        .assess {
            padding-top: 101px;
            padding-bottom: 62px;
            
            .custom {
                display: inline-block;
                width: 259px;
                height: 259px;
                border-radius: 50%;
                background: linear-gradient(to bottom,#ff971f,#ff7205);
                padding: 80px 0;
                box-sizing: border-box;
                p {
                    font-size:28px;
                    color: #fff;
                }
                span {
                    font-size:56px;
                    font-family:'DIN-Medium';
                    color: #fff;
                }
            }
            .way {
                position: relative;
                img {
                    width: 292px;
                    height: 292px;
                    animation: rotateImg 3s linear infinite;
                }
                .text {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-51%);
                    font-size: 28px;
                    color: #ff7700;
                }
            }
            
        }
        .tips {
            font-size:28px;
            color:rgba(102,102,102,1);
        }
        .btn {
            padding-top: 181px;
            padding-bottom: 84px;
            .van-button {
                width: 703px;
                height: 88px;
                line-height: 88px;
                border-radius: 44px;
                font-size: 36px;
                &.test {
                    background:linear-gradient(to bottom,rgba(255,141,0,1),rgba(255,107,0,1));
                    color: #fff;
                    margin-bottom: 34px;
                }
                &.back {
                    border: 2px solid #ff8c18;
                    color: #ff8c18;
                }
            }
        }
    }
    @keyframes rotateImg {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>