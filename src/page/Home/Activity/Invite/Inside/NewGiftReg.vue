<template>
    <div class="newGiftReg">
        <div class="regPay">
            <p class="tips">抽奖机会已绑定到手机：{{mobile}}</p>
            <Register />
        </div>
        
    </div>
</template>
<script>
import Register from '../../../../LoginRegister/Register/Register';
export default {
    data(){
        return {
            mobile:''
        }
    },
    created(){
        this.mobile = this.$store.state.login.mobile;
    },
    components: {
        Register
    }
}
</script>
<style lang="less">
    .newGiftReg {
        height: 100%;
        background: url('../../../../../assets/img/activity/invite/regBG.png') no-repeat;
        background-size: 100%;
        padding-top: 258px;
        .regPay {
            width: 644px;
            height: 836px;
            background: url('../../../../../assets/img/activity/invite/regPay.png') no-repeat;
            background-size: 100%;
            margin: 0 auto;
            padding-top: 95px;
            .tips {
                text-align: center;
                font-size: 28px;
                margin-bottom: 65px;
            }
            .register {
                background: transparent;
                .van-cell-group {
                    .van-cell:first-child {
                        display: none;
                    }
                }
                .login-btn {
                    // width: 550px;
                    height: 90px;
                    border-radius: 45px;
                    background: #ffbf2b;
                    color: #ec001e;
                    font-weight: 700;
                    font-size: 36px;
                    box-shadow: 0px 3px 20px 5px #dc0c3a;
                }
                .protocol {
                    margin-bottom: 180px;
                    margin-top: 50px;
                }
                .code-btn {
                    background: #ffa910 !important;
                }
            }
        }
    }
</style>