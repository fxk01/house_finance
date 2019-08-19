<template>
  <div class="register">
    <van-cell-group>
      <van-field
        v-model="mobile"
        placeholder="请输入手机号码"
        maxlength="11"
        type="number"
        v-validate.initial="'required|mobile'"
        name="手机号码"
        id="mobileName"
      />
      <van-field
        v-model="code"
        placeholder="请输入短信验证码"
        type="number"
        maxlength="4"
      >
        <van-button
          slot="button"
          size="large"
          class="code-btn"
          :class="{disabl:codeDisabled}"
          :disabled="codeDisabled"
          @click="onSubmit('yzm')"
        >{{this.codeMsg}}</van-button>
      </van-field>
      <van-field
        v-model="inviteCode"
        type="number"
        placeholder="请输入推荐人手机号或邀请码（选填）"
        maxlength="11"
        :readonly="isReadOnly"
      />
    </van-cell-group>
    <div class="protocol">
      <van-checkbox v-model="checked">
        我已阅读并同意签署
        <span
          class="line"
          @click="showAgree"
        >《注册协议》</span></van-checkbox>
    </div>
    <div>
      <van-button
        size="large"
        class="login-btn"
        :disabled="disabledBut"
        @click.prevent="onSubmit('submit')"
      >{{text}}</van-button>
    </div>
    <!-- <div class="tips">
      <p>已有账号？&nbsp;&nbsp;<router-link to="/loginRegister/login">立即登录</router-link>
      </p>
    </div> -->
    <van-popup v-model="show">
      <div class="popup-wrap">
        <h2 class="r-title">用户注册服务协议</h2>
        <div class="r-content">
          <p class="bold">本协议是用户（下称“用户”或“您”或“本人”）与山高房金（深圳）科技有限公司（下称“甲方”）包括但不限于山高房金公众号、山高房金APP、山高房金网站所有者及其关联公司APP（以下简称“平台”或“甲方”或“本网站”）之间就相关服务等事宜所订立的契约，本协议具有合同效力，适用于您在山高房金平台的全部活动。</p>
          <p class="bold">您注册成为本网站用户前请务必仔细阅读以下条款。一旦注册，您接受山高房金的服务时必须受以下条款的约束。在您注册时，您承诺已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守中国现行的法律、法规、规章及其他政府规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。若您不接受或无法准确理解本协议的任何条款，请不要进行注册。</p>
          <p class="bold mt20">第一条 特别提醒</p>
          <p>1.1 甲方运营山高房金平台（下称“平台”）。用户确认，在成为平台用户、使用平台、接受平台的服务之前，已充分阅读、理解并接受本协议的全部内容，并同意遵循本协议的所有约定。</p>
          <p class="line bold">1.2 用户同意，甲方有权随时对本协议内容进行单方面的变更，并以包括但不限于平台公告、系统消息通知、官方微信、客服通知等方式予以公布，无需另行单独通知。</p>
          <p>1.3 若用户在本协议内容变更后继续使用平台、接受平台的服务，表示用户已充分阅读、理解并接受修改后的协议内容，并同意遵循修改后协议的所有约定，若用户不同意修改后的协议内容，用户应当立即停止使用平台并拒绝接受平台的服务。</p>
          <p class="bold mt20">第二条 注册条款</p>
          <p>2.1 用户声明，在成为平台用户或接受平台的服务时，用户具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任。若不具备前述主体资格，用户应当立即停止使用平台或停止接受平台的服务，由此导致的一切后果由用户自行承担。</p>
          <p>2.2 用户成为平台用户时，需要提供姓名、性别、年龄、出生日期、身份证号码、手机号等相关信息及相应的证件资料。</p>
          <p>2.3 用户同意：</p>
          <p>（1）在登录时，向平台提供真实、准确、及时、完整的基本信息及相应的证件资料并及时更新上述信息及资料以保持其真实、准确、及时、完整；</p>
          <p>（2）在确知或者有合理理由怀疑用户提供的信息不真实、不准确、不及时、不完整时，甲方有权暂停或终止平台对用户的相应服务；</p>
          <p>（3）甲方因通过用户提供的电子邮件地扯、手机或座机号码等联系方式无法及时与用户取得联系，导致用户在使用平台过程中产生任何损失或增加费用的，由用户自行承担；</p>
          <p>（4）甲方有权以各种方式(包括但不限于平台公告、系统消息推送、官方微信、客服通知、电子邮件、手机短信等)发送与平台所提供服务相关的各类商业信息，如用户拒绝继续接收上述商业信息，必须通过书面方式通知甲方。</p>
          <p class="bold mt20">第三条 用户账户管理</p>
          <p>3.1 在用户完成平台的用户注册程序实际使用平台或接受其服务时，甲方向用户提供唯一ID号账户(以下亦称“账户”)。用户可以对账户设置用户名、密码，通过该用户名、密码登录平台。用户设置的用户名不得违反法律规定、不得侵犯他人合法权益。</p>
          <p>3.2 用户应当妥善保管其用户名和密码，对于因密码泄露所致的损失，由用户自行承担。用户保证不向其他任何人泄露用户名及密码，如用户发现任何人冒用或盗用其用户名及密码或有任何其他可能危及其账户安全的情形时，用户应当立即以有效方式通知甲方，要求甲方暂停相关平台服务。用户理解甲方对其请求采取行动需要合理时间，甲方对在采取行动前已经产生的后果(包括但不限于用户的任何损失)不承担任何责任。</p>
          <p>3.3 除非有法律依据且征得甲方的同意，否则，用户的用户名和密码不得以任何方式转让、赠与或继承(与账户相关的财产权益除外）。</p>
          <p class="bold mt20">第四条 使用条款</p>
          <p>4.1 用户在使用平台服务时，应遵守国家《计算机信息系统国际联网保密管理规定》、《中华人民共和国计算机信息系统安全保护条例》、《计算机信息网络国际联网安全保护管理办法》等相关法律规定、平台的相关协议及规则。</p>
          <p>4.2 用户在使用平台服务时，禁止任何违法违规行为，如：</p>
          <p>（1）任何干扰或破坏平台或与平台相连的服务器和网络及从事其他干扰或破坏平台服务的活动，将平台作任何非法用途；</p>
          <p>（2）通过平台发布、传播有关宗教、种族或性别等的贬损言辞；</p>
          <p>（3）侵犯党和国家利益的言论，骚扰、滥用或威胁其他用户的信息、广告信息；</p>
          <p>（4）侵犯任何第三方著作权、专利、商标、商业秘密或其他专有权利或名誉权的信息；</p>
          <p>（5）通过平台销售非平台提供的金融产品、利用平台非法集资，以个人名义销售保险，虚假宣传；</p>
          <p>（6）其他任何违反国家相关法律法规的信息。</p>
          <p>4.3 用户使用平台服务发生的任何违法违规行为，与甲方无关，由用户自行承担所有责任。</p>
          <p>4.4 若由于系统异常、用户恶意操作、黑客或第三方软件恶意攻击造成了系统损失，则甲方有权追偿用户非法所得，且追偿攻击方的法律责任。</p>
          <p>4.5 若用户本人通过恶意、非正当手段参与平台运营活动，则甲方有权冻结用户的账户，且可取消其参与活动的名次和奖励，并追偿其法律责任。</p>
          <p class="bold mt20">第五条 客户信息授权条款</p>
          <p>5.1 用户授权甲方，除法律另有规定之外，将用户提供给平台的信息、享受平台服务产生的信息(包括本用户服务协议签署之前提供和产生的信息)以及甲方根据本条约定查询、收集的信息，用于平台为其提供服务、推荐产品、开展市场调查与信息数据分析。</p>
          <p>5.2 用户授权甲方，除法律另有规定之外，基于为用户提供更优质服务和产品的目的，甲方因平台服务必要而提供、查询、收集用户的信息，或因此向甲方的合作产品方、关联公司提供前述信息。</p>
          <p>5.3 为确保用户信息的安全，甲方对上述信息负有保密义务，并采取各种措施保证信息安全。</p>
          <p>5.4 本条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
          <p class="bold mt20">第六条 责任声明</p>
          <p>6.1 对使用平台而产生的风险由用户自行承担，甲方不提供任何明示或者默示的担保。</p>
          <p>6.2 甲方对下列事项不作任何陈述与保证：</p>
          <p>（1）平台的服务符合用户的要求或经验；</p>
          <p>（2）用户使用平台的服务后所产生的任何行为，如购买或获得的任何产品、服务、信息或其他事物等，将符合用户的要求或经验；</p>
          <p>（3）甲方不能保证平台不受干扰、不发生故障，也不对使用效果做任何保证。用户同意独立承担因网站意外中断、操作或传输的迟延、电脑病毒、网络连接故障、未经授权的进入等引起的损失。</p>
          <p>6.3 用户因违反本协议或其他有关的法律、法规，而导致有第三方对甲方提起诉讼或索赔要求时，用户同意赔偿甲方因此遭受的所有损失，包括但不限于合理的律师费。</p>
          <p>6.4 甲方对用户在平台上公布的信息中查找到的内容不负责任，对信息的及时性、安全性和正确性也不作保证。对通过平台获取的任何信息，用户需自己甄别，自负风险；对因下载或引用平台的数据、信息而造成的用户计算机系统损坏或数据丢失，甲方不负责任。</p>
          <p>6.5 甲方对用户使用平台上公布的或其服务中的建议和资讯而造成的损失或伤害以及用户相信平台上的公布的或其服务中的建议和资讯而做出的决定或采取的行动不负责任。若用户对平台提供的部分或所有服务不满，则用户可停止使用平台、拒绝接受平台服务。</p>
          <p>6.6 鉴于互联网的特殊性，因黑客攻击、互联网连通中断或者系统故障等情形给用户造成的损失，甲方不承担责任。</p>
          <p class="bold mt20">第七条 知识产权声明</p>
          <p>7.1 平台上所有可阅读的资料等全部受到《中华人民共和国著作权法》等的法律保护。</p>
          <p>7.2 平台上所有内容的选材、整理、编排、排版，以及由甲方创作的文字、图片等作品的著作权，无论是否明示，均属甲方。任何组织或个人未经甲方书面许可，不得修改、出版、传播、参与传播、销售、制作衍生作品，或以其他任何方式使用整体或部分的平台上的内容。</p>
          <p>7.3 甲方对其开发的系统等享有知识产权。</p>
          <p class="bold mt20">第八条 协议终止</p>
          <p class="bold line">8.1 用户同意，出现以下情形或违反本协议其他约定的，甲方有权在告知或未经告知的情况下中止或终止向用户提供部分或全部服务，且无须因此向用户或任何第三方承担任何责任。用户应当向甲方支付违约金10万元人民币，甲方保留追究用户其他法律责任的权利：</p>
          <p>（1）向平台提供的信息或资料不真实、不准确、不及时、不完整；</p>
          <p>（2）实施或计划实施破坏、攻击平台的电脑系统、网络的完整性，或者试图擅自进入平台电脑系统、网络；</p>
          <p>（3）使用或提供含有毁坏、干扰、截取或侵占任何系统、数据或个人资料的任何电脑病毒、伪装破坏程序、电脑蠕虫、定时程序炸弹或其他破坏性程序；</p>
          <p>（4）盗用他人在平台上的用户名或密码；</p>
          <p>（5）未经甲方书面同意，擅自允许他人使用平台的服务(包括但不限于擅自允许他人使用其用户名或密码，或者私自将本人用户名或密码转让给他人的)，或者通过平台获得相关信息；</p>
          <p>（6）出现其他任何违法或违约的情形。</p>
          <p>8.2 一旦用户的用户资格或服务被中止或终止，甲方有权随时删除用户在平台的用户信息及相关资料，对用户在用户资格或服务中止或终止前的行为，甲方保留追究用户法律责任的权利。</p>
          <p class="bold mt20">第九条 法律适用及管辖</p>
          <p>本协议条款的解释及适用，以及与本协议条款有关的争议，均应依照中华人民共和国法律（不包含港澳台地区的法律）予以处理，并以甲方所在地人民法院为管辖法院。</p>
        </div>

      </div>
      <div
        class="fixed"
        @click="closeAgree"
      >×</div>
    </van-popup>
  </div>
</template>
<script>
/**
 * @Description:
 * @author 李凯明
 * @date 2019/2/15
 */
import { Field, CellGroup, Popup } from "vant";
import * as registerApi from "./registerApi";
import { mixin } from "../../../utils/common";
import { mapGetters } from "vuex";
import { SEND_YZM } from "../../../store/mutation-type";

export default {
  mixins: [mixin],
  data() {
    return {
      mobile: "",
      code: "",
      status: null,
      inviteCode: "",
      checked: false,
      show: false,
      isReadOnly: false,
      disabledBut: false,
      regSource:'',
      text:'立即注册',
      linkName:'registerSuccess',
      uToken:''
    };
  },
  watch: {
    uToken:function(newVal,oldVal){
      if(newVal){
        this.$router.push('/user');
      }
    }
  },
  created() {
    this.$store.commit("changeStatus", 2);
    this.uToken = this.$cookie.get('token');
    if(this.$route.name === 'newGiftReg'){
      this.mobile = this.$store.state.login.mobile;
      this.text = '马上注册抽大奖';
      this.linkName = 'turntable';
    }
    console.log(this.$router);
    if (this.$router.history.current.query.inventNum) {
      this.isReadOnly = true;
      this.inviteCode = this.$router.history.current.query.inventNum;
    }
    if (this.$router.history.current.query.regSource) {
      this.regSource = this.$router.history.current.query.regSource;
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup
  },
  computed: {
    ...mapGetters(["gettersSearchData"])
  },
  methods: {
    onSubmit(value) {
      this.$validator.validate().then(result => {
        if (!result) {
          for (let i = 0, l = this.$validator.errors.items.length; i < l; i++) {
            this.$toast({
              duration: 2000,
              message: this.$validator.errors.items[0].msg
            });
          }
        } else {
          if (value === "yzm") {
            this.postVerificationCode();
          }
          if (value === "submit") {
            this.postRegister();
          }
        }
      });
    },
    /*
       获取手机验证码
       */
    postVerificationCode() {
      if (this.countdown !== 120) {
        return false;
      } else {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: "spinner"
        });
      }
      this.$store
        .dispatch(SEND_YZM, {
          userPhone: this.mobile,
          smsType: "10001"
        })
        .then(() => {
          if (
            this.gettersSearchData["gettersSearchData"].code === "1" &&
            !this.timer
          ) {
            this.getCode();
          }
        });
    },
    /*
       验证码倒计时
       */
    getCode() {
      if (!this.timer) {
        setTimeout(() => {
          this.$toast.clear();
          this.$toast({
            message: "发送验证码成功！"
          });
        }, 1000);
        this.sendVerificationCode();
      }
    },
    /*
       提交注册
       */
    postRegister() {
      if (this.code === "") {
        this.$toast({
          duration: 2000,
          message: "短信验证码不能为空！"
        });
        return;
      }
      if (!this.checked) {
        this.$toast({
          duration: 2000,
          message: "请勾选注册协议！"
        });
      } else {
        this.disabledBut = true;
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: "spinner"
        });
        registerApi
          .register({
            userPhone: this.mobile,
            smsType: "10001",
            smsCode: this.code,
            inviteNum: this.inviteCode,
            regSource: this.regSource,
            open_id: this.$cookie.get('openID')
          })
          .then(res => {
            this.$toast.clear();
            if (res.code === '1') {
              this.$toast({
                message: "注册成功！"
              });
              this.$cookie.set("token", res.data.token, { expires: 7 });
              this.$cookie.set("isAuth", "false", { expires: 7 });
              this.$cookie.set("uid", res.data.uid, { expires: 7 });
              this.$cookie.set("userPhone", res.data.userPhone, { expires: 7 });
              this.$cookie.set("inventNum", res.data.inventNum, { expires: 7 });
              this.$cookie.set("isSelectCity", res.data.isSelectCity, { expires: 7 });
              this.$cookie.set("city", res.data.city, { expires: 7 });
              this.$cookie.set("cityCode", res.data.cityCode, { expires: 7 });
              // this.$router.push({
              //   name: "registerSuccess"
              // });
              if (this.$cookie.get("openID")) {
                this.$axios
                  .request({
                    url: "weChatAndUserInfoBinding",
                    data: {
                      openID: this.$cookie.get("openID")
                    },
                    token: res.data.token
                  })
                  .then(res => {
                    if (res.code === "1") {
                      this.timeID = setTimeout(() => {
                        this.$router.push({
                          name: this.linkName
                        });
                      }, 200);
                    } else {
                      this.$toast(res.msg);
                    }
                  });
              } else {
                this.timeID = setTimeout(() => {
                  this.$router.push({
                    name: this.linkName
                  });
                }, 200);
              }
            } else {
              this.disabledBut = false;
              this.$toast({
                duration: 3000,
                message: res.msg
              });
            }
          });
      }
    },
    showAgree() {
      this.show = true;
    },
    closeAgree() {
      this.show = false;
    }
  }
};
</script>

<style lang="less" src="./register.less"></style>
