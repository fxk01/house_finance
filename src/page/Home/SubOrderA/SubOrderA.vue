<template>
  <div class="sub-orderA">
    <form
      id='myForm'
      method="post"
      enctype="multipart/form-data"
    >
      <div class="bor-info">
        <!-- <h2 class="info-title">
          <img
            src="../../../assets/img/home/list.png"
            alt=""
          >
          借款人信息
        </h2> -->
        <van-cell-group class="form">
          <van-field
            v-model="product"
            placeholder="请选择拟贷款产品"
            label="贷款产品"
            class="bb urban"
            is-link
            input-align="right"
            readonly
            @click="showProduct"
          />
          <van-field
            v-model.trim="borPrice"
            placeholder="请输入拟贷款金额 (万元)"
            label="贷款金额"
            class="bb p-price"
            name="loan_amount"
            type="number"
            @input="changePrice"
            input-align="right"
          />
          <van-field
            v-model.trim="borDate"
            placeholder="请输入拟贷款期限 (月)"
            label="贷款期限"
            input-align="right"
            class="bb p-date"
            name="borrowing_period"
            @input="changeDate"
            type="number"
          />
          <van-field
            v-model.trim="userName"
            placeholder="请输入借款人姓名"
            label="借款人姓名"
            class="bb"
            input-align="right"
            name="borrower_name"
          />
          <van-field
            v-model.trim="userMobile"
            placeholder="请输入借款人手机号"
            label="借款人手机号"
            input-align="right"
            class="bb"
            name="borrower_mobile_number"
            type="number"
            maxlength="11"
          />
          <van-field
            v-model="city"
            placeholder="请选择"
            label="提单城市"
            input-align="right"
            readonly
            is-link
            @click="showArea"
            name="city"
            class="urban bb"
          />
          <van-field
            v-model="real_estate_license_number"
            placeholder="请输入房产证编号"
            label="房产证编号"
            input-align="right"
            name="real_estate_license_number"
            class="bb"
            type="number"
          />
        </van-cell-group>
        <div class="fast">
          <h2>
            <div v-if="isShowAssess && code !== '177'">
              <van-checkbox v-model="pitch">极速评估</van-checkbox>
              <span>更快更准确的房产估值</span>
            </div>
          </h2>
          <van-cell-group
            v-show="pitch && code !== '177'"
            class="fast-assess"
          >
            <van-field
              v-model="cityName"
              placeholder="请输入楼盘名称"
              label="楼盘名称"
              input-align="right"
              readonly
              is-link
              @click="goSearch"
            />
            <van-field
              v-model="tower"
              placeholder="选择"
              label="楼栋"
              input-align="right"
              readonly
              is-link
              v-show="houseName !== -1"
              @click="goSearch"
              name="buliding"
            />
            <van-field
              v-model="number"
              placeholder="选择"
              label="房号"
              input-align="right"
              v-show="houseName !== -1"
              readonly
              is-link
              @click="goSearch"
              name="room_number"
            />
            <van-field
              v-model="floor"
              placeholder="请输入楼层"
              label="所在楼层"
              input-align="right"
              v-show="dc_houses_name !== -1"
              name="floor"
              readonly
              type="number"
              @click="goSearch"
            />
            <van-field
              v-model="area"
              placeholder="请输入面积"
              label="建筑面积（㎡）"
              input-align="right"
              readonly
              name="area"
              type="number"
              @click="goSearch"
            />
          </van-cell-group>
        </div>
      </div>
      <div class="bor-info goods-info">
        <!-- <h2 class="info-title">
          <img
            src="../../../assets/img/home/diya.png"
            alt=""
          >
          抵押物信息
        </h2> -->
        <van-collapse accordion>
          <!-- <div
            v-if="false"
            @click="houseAssess"
          >
            <van-collapse-item
              title="选择近期询价的房产"
              class="house"
            >
            </van-collapse-item>
          </div> -->
          <!-- <van-field
            class="area"
            readonly
            v-model="areaValue"
            @click="showArea"
          /> -->
          <!-- <van-popup
            v-model="show"
            position="bottom"
            class="show-area"
          >
            <van-area
              :area-list="areaList"
              @cancel="closeArea"
              @confirm="changeArea"
            />
          </van-popup> -->
          <!-- <van-field
            v-model.trim="hAddress"
            placeholder="请输入房产地址"
            class="bb"
            name="hourse_address"
          />
          <van-field
            v-model.trim="hArea"
            placeholder="请输入房产面积（默认单位：平米）"
            class="bb"
            type="number"
            name="hourse_area"
          /> -->
          <div class="photo">
            <h2>请上传房产证照片：</h2>
            <p
              class="upload-img"
              v-on:click="uploadModal = true"
            >上传示例</p>
            <div class="item">
              <img
                src="../../../assets/img/camera.png"
                alt=""
                @click.prevent="uploadFile"
                id="imageA"
              >
              <p>房产证内页一</p>
            </div>
            <div class="item">
              <img
                src="../../../assets/img/camera.png"
                alt=""
                @click.prevent="uploadFile"
                id="imageB"
              >
              <p>房产证内页二</p>
            </div>
            <input
              type="file"
              class="file"
              id="uploadA"
              @change="changeURL"
              accept="image/*"
            >
            <input
              type="file"
              id="uploadB"
              class="file"
              @change="changeURL"
              accept="image/*"
            >
          </div>
        </van-collapse>
      </div>
      <div
        class="protocol"
        v-show="isChannel"
      >
        <input
          type="checkbox"
          v-model="checked"
          id="checkbox"
        >
        <p class="agree"><label for="checkbox">勾选提交即代表同意且充分理解</label><span @click="showAgree">《居间服务协议》</span></p>
      </div>
      <!-- <div class="bor-info price-info"> -->
      <!-- <h2 class="info-title">
          <img
            src="../../../assets/img/home/jiekuai.png"
            alt=""
          >
          借款信息
        </h2> -->
      <!-- <van-cell-group class="form">
          <van-field
            v-model.trim="borPrice"
            placeholder="请输入拟借款金额"
            class="bb p-price"
            name="loan_amount"
            type="number"
            @input="changePrice"
          />
          <van-field
            v-model.trim="borDate"
            placeholder="请输入拟借款期限"
            class="bb p-date"
            name="borrowing_period"
            @input="changeDate"
            type="number"
          />
        </van-cell-group> -->
      <!-- </div> -->
      <!-- <div
        class="submit-btn"
        @click="submit"
      >提交</div> -->
      <van-button
        type="default"
        class="submit-btn"
        :disabled="isDisabled"
        @click.prevent="submit"
      >提交</van-button>
    </form>
    <van-popup
      class="betAgree"
      v-model="isShowAgree"
    >
      <div class="contain">
        <h2>居间协议</h2>
        <div>
          <p class="bold">本协议是用户（下称“用户”或“您”或“本人”）与山高房金（深圳）科技有限公司（下称“甲方”）包括但不限于山高房金公众号、山高房金APP、山高房金网站所有者及其关联公司APP（以下简称“平台”或“甲方”或“本网站”）之间就居间服务等事宜所订立的契约，本协议具有合同效力，适用于您在山高房金平台的全部活动。</p>
          <p class="bold">您成为平台居间服务方前请务必仔细阅读以下条款。一旦点击提交，您接受山高房金的服务时必须受以下条款及其他相关规则的约束。在您点击提交时，您承诺已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守中国现行的法律、法规、规章及其他政府规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。若您不接受或无法准确理解本协议的任何条款，请不要进行提交。</p>
          <p>甲、乙双方拟就居间事宜签署本协议，由乙方将潜在有借款需求的客户（下称“客户”）推荐给甲方。合作事宜约定如下：</p>
          <p class="bold mt20">第一条 合作方式</p>
          <p>1.1 乙方申请注册甲方运营的山高房金平台（下称“平台”）成为平台注册用户。乙方签署本协议后，成为甲方的合作居间方，负责将有借款需求的客户推介至甲方。</p>
          <p>1.2 乙方将客户信息录入平台，甲方收到客户信息后，对客户进行独立的风险评估及审核，自行决定是否提供产品服务，乙方不得干涉、干扰。</p>
          <p>1.3 甲乙双方为平等的业务合作关系，非劳动关系，不存在任何事实上的管理关系，甲方无需向乙方支付工资，无需为乙方缴纳社保等费用。</p>
          <p>1.4 乙方在宣传介绍甲方及甲方产品时，应告知客户自己是甲方合作居间人的身份。</p>
          <p class="bold mt20">第二条 合作规则</p>
          <p>2.1 资格条件</p>
          <p>乙方签署本协议即成为甲方合作居间方。乙方维持签约主体资格应满足如下条件：</p>
          <p>本协议生效后次日起，每180个自然日内，至少向平台录入一位客户资料；或在本协议生效后次日起，每365个自然日内至少成功推荐一位客户。</p>
          <p>成功推荐指甲方指定的资金方向客户成功放款。</p>
          <p>2.2 客户保护机制</p>
          <p>2.2.1 以客户的房产证录入时间为准，进行客户的锁定保护；</p>
          <p>2.2.2 保护周期为录入日起 15 个工作日，其他人员不得再录入该客户资料；</p>
          <p class="bold mt20">第三条 合作费用</p>
          <p>3.1 乙方的合作费用</p>
          <p>甲方无需向乙方支付合作费用。甲方统一为乙方向客户代收相当于客户借款金额2%-3%的费用（乙方需保证客户的真实账户信息，并保证客户认可甲方该笔代收款，否则由此引起的甲方所有损失由乙方承担），扣除乙方应承担的所有法定税费、服务费等各项费用后，剩余部分由甲方安排支付给乙方（包括但不限于委托甲方认可的第三方支付等）。乙方不得再向客户收取超过借款金额2%的费用，否则甲方可以拒绝合作。</p>
          <p>3.2 费用支付时间：每笔业务成功放款后的三个工作日内，甲方安排支付。如遇周末或节假日，则付款时间相应顺延。若非因甲方问题致客户未能向甲方支付成功，则自客户付款成功之日起三个工作日内，安排支付。</p>
          <p>3.3 本协议项下，甲方以其统计费用之时乙方在平台中绑定的收款银行账户作为乙方该期费用的收款账户。</p>
          <p>3.4 乙方未正确提供账户信息或者账户信息变更后未及时在平台中更新的，由乙方自行承担相应的损失。</p>
          <p>3.5 以上费用已经包含了甲方接受乙方提供本协议项下服务所应支付的全部对价，除此之外，甲方无需再向乙方支付任何费用。乙方从事居间活动的费用，由乙方自行承担。所有本协议项下的款项以人民币计算并支付。</p>
          <p class="bold mt20">第四条 甲方的权利和义务</p>
          <p>4.1 甲方有权制定具体操作流程，乙方应当按甲方要求配合，甲方有权要求乙方使用甲方统一设计的宣传材料与宣传用语。甲方享有本协议项下宣传材料的知识产权、著作权、商标权等相关权利。非经甲方同意，乙方不得随意使用。</p>
          <p>4.2 甲方有权对乙方履行本协议的情况进行监督和检查。如甲方发现乙方使用未经甲方确认的宣传材料和宣传用语开展业务，甲方有权暂停支付所有未付款项及与乙方的合作，要求乙方整改。</p>
          <p>4.3 如乙方违反本协议约定推介客户，则甲方有权按照本协议约定内容，追究乙方的违约责任。甲方对本协议及附件有修改调整权。乙方在此确认已于本协议签署前阅读、知晓并愿意接受相关的违约责任。</p>
          <p>4.4 甲方可通过平台公告、系统消息推送、短信、电子邮件等通知形式，将本协议项下的全部或部分权利义务转让给其关联实体。</p>
          <p>4.5 甲方有权在业务运营中收集和储存乙方的用户信息，包括但不限于乙方自行提供的个人资料和信息，以及乙方在甲方的交易记录和使用信息。甲方收集和储存乙方的信息的主要目的在于提高服务效率和质量。</p>
          <p>4.6 甲方有权在业务运营中使用乙方的信息，包括但不限于：</p>
          <p>（1）公示乙方的相关信息；</p>
          <p>（2）向甲方的合作机构（该合作机构仅限于甲方为了完成拟向乙方提供的服务而合作的机构）提供乙方的用户信息；</p>
          <p>（3）由人工或自动程序对乙方的信息进行评估、分类、研究；</p>
          <p>（4）自行或通过合作的第三方机构对乙方提交的信息（包括但不限于乙方的个人身份证信息等）进行核实，并对获得的核实结果根据本协议及有关文件进行查看、使用、展示和留存等操作；</p>
          <p>（5）使用乙方的用户信息以改进甲方的推广；</p>
          <p>（6）甲方将不定期对用户信息进行抽查、核实，有时可能调查多个用户以识别问题或解决争议，特别是甲方可审查乙方的资料以区分使用多个用户名或别名的用户（但甲方的抽查、核实不代表对用户信息真实性、合法性负责）；</p>
          <p>（7）甲方有权对用户信息进行分析并形成用户信用数据库，甲方对该等用户信用数据库享有完整的所有权，甲方将该等信用数据库或将该等信用数据库提供给第三方使用均无需取得乙方的同意，亦无需向乙方支付任何费用。</p>
          <p>4.7甲方将采用行业标准惯例以保护乙方的用户信息，包括建立相应的信息保护制度和机制、设备等，但乙方应了解，受限于技术，甲方不能确保乙方的信息不会通过本协议中未列明的途径泄露，甲方不承担因此而导致的任何损失或责任。</p>
          <p>4.8甲方有权在下列情形下披露乙方的用户信息：</p>
          <p>（1）其他注册用户就乙方在甲方活动中的违约行为发起诉讼程序时，甲方将应该等注册用户的请求向该等注册用户披露乙方的用户信息；</p>
          <p>（2）应行政、司法部门的要求向该等机构提供乙方的用户信息；</p>
          <p>（3）依据法律要求必须向第三方提供乙方的用户信息的情形。</p>
          <p>4.9在甲方提供的交易活动中，乙方无权要求甲方提供其他注册用户的个人资料，除非符合以下条件：</p>
          <p>（1）乙方已向法院起诉其他注册用户在甲方活动中的违约行为；</p>
          <p>（2）其他有碍于乙方收回借款本息的情形。</p>
          <p>4.10 乙方违反本协议、通过甲方形成的借贷协议以及与甲方另行签署的其他协议时，甲方有权将乙方的用户信息通过甲方向所有注册用户进行公示。</p>
          <p class="bold mt20">第五条 乙方的权利和义务</p>
          <p>5.1 乙方不得利用甲方或甲方服务从事任何不符合中国法律法规或侵犯他人权益的活动。否则甲方有权不经通知而立即终止合作并停止乙方对平台的全部或部分功能的使用。</p>
          <p>5.2 乙方通过注册平台所提交的姓名、身份证号码及手机号是乙方在甲方的唯一识别信息。乙方注册成功后，除非本协议另有约定，乙方不得将姓名和密码、身份证号码及手机号转让或授权第三方使用。</p>
          <p>5.3 合作期间，乙方应保证提交的所有资料和信息应是真实、准确、完整且是最新的。若各项信息和资料发生变更，乙方应当及时更新，如因未及时更新信息和资料导致的全部法律责任和后果由乙方自行承担。</p>
          <p>5.4 甲方的所有内容，包括但不限于文本、数据、图片、音频、视频、源代码和其他所有信息，均由甲方享有知识产权。未经甲方事先书面同意，乙方或其他任何人不得复制、改编、传播、公布、展示或以任何其他方式侵犯甲方的知识产权。</p>
          <p>5.5 乙方承诺，乙方具有履行本协议的资质，且不会因履行本协议违反乙方与其他任何第三方签署的在先合同及协议等，包括但不限于劳动合同、劳务合司、竞业限制条款等。如乙方履行本合同的行为引发任何第三方纠纷，给第三方造成任何经济损失的，由乙方全权承担相应责任。如因此使得甲方对外支付任何赔偿金或承担任何损失的，包括但不限于损失取证费、律师责、诉讼费等，乙方应全额补偿甲方。甲方有权终止与乙方的合作，不予支付所有未付费用。</p>
          <p>5.6 乙方的禁止行为：</p>
          <p>（1）不得使用任何未经甲方确认的信息、资料和话术；</p>
          <p>（2）不得未经甲方事先同意，擅自使用、制作甲方的商标、标志、商业信息、技术及其他资料等；</p>
          <p>（3）不得进行虚假宣传、误导客户，应当向客户表明借款产品的介绍及说明均应以甲方及甲方工作人员的表述为准；</p>
          <p>（4）不得造成客户误会乙方为放款方；</p>
          <p>（5）不得对客户能否通过审核、获得以及借款的息费标准做出任何承诺；</p>
          <p>（6）不得向甲方提供虚假申请材料，不得涂改、伪造客户资料或协助客户伪造资料：</p>
          <p>（7）不得代客户办理任何具体业务或代替客户签字：</p>
          <p>（8）不得向客户透露重要信息，包括合作方未同意向客户提供服务的具体原因等。</p>
          <p>（9）不得向任何第三方泄露甲方及合作方的任何公司信息、产品信息等。</p>
          <p>（10）不得向甲方之外的任何第三方泄露客户在办理合作方业务过程中所产生的任何信息，及客户的财产情况、个人隐私等。</p>
          <p>（11）不得未经甲方许可，与接受媒体采访、或进行其他方式的合作；以任何形式对甲方造成任何负面影响；</p>
          <p>（12）不得引导客户非法套现或利用合作参与非法集资；</p>
          <p>（13）不得与其他居间方之间互相收受贿路，不得捏造事实中伤其他居间方或甲方及合作方的员工。</p>
          <p class="bold mt20">第六条 免责条款</p>
          <p>6.1 如因非甲方原因造成乙方泄露账户密码或相关信息的，乙方应及时书面通知甲方，以减少可能发生的损失，因上述原因导致的损失需由乙方自行承担。</p>
          <p>6.2 如乙方发现有他人冒用或盗用乙方的账户及密码或进行任何其他未经合法授权行为之情形时，应立即以书面方式通知甲方并要求暂停甲方服务。甲方将积极响应乙方的要求；但乙方理解，对乙方的要求采取行动需要合理期限，在此之前，甲方对已执行的指令及（或）所导致的乙方的损失不承担任何责任。</p>
          <p>6.3 基于运行和交易安全的需要，甲方可以暂时停止提供、限制或改变甲方服务的部分功能，或提供新的功能。在任何功能减少、增加或者变化时，只要乙方仍然使用甲方服务，表示乙方仍然同意本协议或者变更后的协议。</p>
          <p>6.4 甲方内容可能涉及或链接到由第三方所有、控制或者运营的其他软件或网站（以下称“第三方软件）。甲方不能保证也没有义务保证第三方软件上的信息的真实性和有效性。乙方确认按照第三方软件的注册协议而非本注册协议使用第三方软件，第三方软件的内容、产品、广告和其他任何信息均由乙方自行判断并承担风险。</p>
          <p>6.5 如果由于甲方及相关第三方的设备、系统故障或缺陷、病毒、黑客攻击、网络故障、网络中断、地震、台风、水灾、海啸、雷电、火灾、瘟疫、流行病、战争、恐怖主义、敌对行为、暴动、罢工、交通中断、停止供应主要服务、电力中断、经济形势严重恶化或其它类似事件，致使甲方未能履行本协议或履行本协议不符合规定，不构成甲方的违约。</p>
          <p>6.6 如因乙方在甲方的违约行为而导致乙方的亲属、利益相关人或乙方的其他社交联系人遭受任何精神损害或财产损失的，甲方不对该等精神损害或财产损失承担任何责任。</p>
          <p>6.7 甲方平台提供的各种交易信息及资料仅供乙方参考，乙方应考虑实际情况独立判断并作出交易决策。乙方应知悉投资风险，交易发生后产生的一切风险均由乙方自行承担。</p>
          <p>6.8 甲方不能完全保证平台内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。乙方依赖于个人独立判断进行交易，并应对其作出的判断承担全部责任。</p>
          <p>6.9 因乙方个人的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、注册用户使用的手机被第三方侵入、注册用户委托他人代理交易时他人恶意或不当操作而造成的损失，甲方不承担任何责任。</p>
          <p class="bold mt20">第七条 保密条款</p>
          <p>7.1 甲乙双方同意对本协议内容以及在本协议谈判、履行过程中所获知的对方和/或对方客户的任何信息予以保密。保密信息包括但不限于本协议内容、营销方案、商业计划、客户信息等商业秘密以及所有易于上还信息而制作的分析报告、清单、研究报告和类似文件。</p>
          <p>7.2 除按照法律、法规和规章规定或双方约定的方式予以使用外，未经对方事先书面同意，不得直接或间接地，以任何形式或采取任何方式，将上述信息、资料泄露或披露给任何第三人。</p>
          <p>7.3 该保密条款对甲乙双方永久有效，并不因本协议终止/无效而终止/无效。</p>
          <p class="bold mt20">第八条 违约责任</p>
          <p>8.1 甲、乙双方均应依照约定履行本协议的内容，不得违反本协议之任何约定。</p>
          <p>8.2 乙方违反本协议任意一项约定时，甲方有权选择：</p>
          <p>（1）中止履行本协议，暂停支付任何未付费用直至乙方履行义务。</p>
          <p>（2）解除本协议,要求乙方赔偿因其违约行为给甲方造成的所有损失，包括但不限于信贷损失、行政处罚、名誉损失、直接和间接经济损失及协议履行后的预期利益等。</p>
          <p class="bold mt20">第九条 协议的变更、解除</p>
          <p class="bold line">9.1 甲方对合作费率、合作方式、合作条件等进行调整时，可通过包括但不限于平台公告、系统消息推送、短信等形式通知乙方。若乙方未提出书面异议，表示乙方已充分阅读、理解并接受修改后的协议内容，并同意遵循修改后协议的所有约定。</p>
          <p class="bold line">9.2 协议期间，任何一方可以单方提出解除本协议。甲方可通过包括但不限于短信、系统消息推送等方式通知乙方解除本协议，通知送达之日本协议解除。</p>
          <p>9.2.1 存在如下情形时，甲方可单方解除本协议：</p>
          <p>（1）乙方无法满足续签主体资格条件时； </p>
          <p>（2）乙方存在伪造客户资料、联合客户骗贷、冒名顶替、信息不实等任何欺诈情形的，甲方有权立即解除本协议，并根据本协议8.2条约定追究乙方法律责任。乙方不得申请再合作。</p>
          <p>9.2.2 解除本协议后的乙方权限说明：</p>
          <P>（1）不可再使用平台为居间人专设的功能模块。</P>
          <P>（2）解除本协议前推荐的客户（乙方骗贷等任何欺诈情形除外），甲方指定的资金方成功放款后，仍可获得该项业务相应合作费用。</P>
          <P>若乙方提出解除本协议，平台保留 48 小时犹豫期。犹豫期结束视为“居间协议”正式解除。犹豫期内可以撤销申请，撤销成功后“居间协议”继续有效。</P>
          <P>9.3 协议终止后，双方尚未履行的协议部分，终止履行。协议的终止不影响甲乙双方在协议终止前业已开始履行部分协议的效力以及权利义务。</P>
          <P>9.4 申请再合作</P>
          <P>本协议解除后，乙方可申请重新签署《居间协议》（下称“新协议”）。但：</P>
          <P>（1）自新协议生效之日起30个自然日内，乙方需向甲方至少推荐一位客户且甲方指定的资金方向该客户成功放款。否则新协议自动解除。</P>
          <P>（2）在满足（1）条件下，新协议生效日起180个自然日内，乙方需至少向甲方推荐两位新客户，甲方指定的资金方至少向一位客户成功放款。否则新协议自动解除。</P>
          <P class="bold mt20">第十条 法律适用及争议解决</P>
          <P>10.1 本协议的有效性、解释、执行及履行和争议解决应适用中华人民共和国的法律法规（港澳台法律除外）。</P>
          <P>10.2 如因本协议或在履行本协议过程中发生任何争议，双方应首先通过友好协商解决争议。协商不成，可向甲方所在地法院提起诉讼。</P>
          <P>10.3 乙方确认其在指定平台内提供的电子邮箱可作为相关法律文书的送达地址。</P>
          <P class="bold mt20">第十一条 反商业贿赂条款</P>
          <P>11.1 甲乙双方都清楚并愿意严格遵守中华人民共和同反商业贿赂的法律规定，双方都清楚任何形式的贿赂和贪法行为都将犯法律，并将受到法律的严惩。</P>
          <P>11.2 甲方或乙方均不得向对方或对方经办人或其他相关人员索要、收受、提供、给予协议约定外的任何利益，包括但不限于明扣、暗扣、现金、物卡、实物、有价证券、旅游或其他非物质性利益等，但如该等利益属于行业惯例或通常做法，则须在协议中明示。</P>
          <P>11.3 甲方严格禁止甲方经办人员的任何商业贿赂行为。甲方经办人发生本条第二款所列示的任何一种行为，都是违反甲方公司制度的，都将受到甲方公司制度和国家法律的惩处。</P>
          <P>11.4 甲方郑重提示：甲方反对乙方或乙方经办人员为了本协议之目的与本协议以外的任何第三方发生本条第二款所列示的任何一种行为，该等行为都是违反国家法律的行为，并将受到国家法律的惩处。</P>
          <P>11.5 如因一方或一方经办人违反上述第二款、第三款、第四款之规定，给对方造成损失的，应承担损害赔偿责任。</P>
          <P>11.6 本条所称“其他相关人员”是指甲乙方经办人以外的与协议有直接或间接利益关系的人员，包括但不仅限于协议经办人的亲友。</P>
          <P class="bold mt20">第十二条 反虚假宣传条款</P>
          <P>甲、乙双方均清楚并愿意严格遵守中华人民共和国《著作权法》、《商标法》、《专利法》、《反不正当竞争法》等知识产权类、合同法及广告法等相关法律的规定，双方均有权就本协议所约定事项以约定方式在约定范围内进行真实、合理的使用或宣传，但不得涉及协议所约定的保密内容。为避免商标侵权及不当宣传等风险的发生，双方均同意，在使用对方的商标、品牌、企业名称等进行宣传前，均须获得对方事先的书面认可，否则，不得进行此类使用或宣传。双方在此承诺，会积极响应对方提出的就合作事项的合理使用或宣传申请。双方均承认，未经对方事先书面同意而利用其商标、品牌及企业名称等进行商业宣传；虚构合作事项；夸大合作范围、内容、效果、规模、程度等，均属对本协议的违反，并可能因虚假宣传构成不正当竞争，守约方或被侵权人将保留追究相应法律责任的权利。</P>
          <P class="bold mt20">第十三条 法律适用及争议解决</P>
          <P>本协议适用中华人民共和国法律（为免歧义，不包括香港、澳门、台湾地区的法律）并按其解释。因履行本协议发生与本协议有关的任何争议，均由本协议各方友好协商解决，协商不成的，可向甲方所在地人民法院提起诉讼。</P>
          <P class="bold mt20">第十四条 其他</P>
          <P>14.1 甲乙双方在合作过程中将严格遵守相关法律法规和监管的要求，互有义务配合外部监督检查。</P>
          <P>14.2 如果本协议的任何条款与现在或未来颁布的法律、法规、规章和规范性文件相冲突，则双方应根据法律、法规、规章和规范性文件的规定，通过友好协商的方式对本协议进行相应变更或终止。就变更事宜无法达成一致意见的，则任一方有权通过邮寄、电子邮件、短信、系统消息推送等方式通知对方解除本协议，通知送达之日本协议解除。解除本协议，无需向对方承担任何违约责任。</P>
          <P>14.3 本协议为甲乙双方合作的最终有效文本。本协议签订之前，甲乙双方就居间合作所签发的任何备忘录、电子通知、协议文本等，如与本协议存在任何冲突，其他文本自动失效，以本协议为准。</P>
          <p>14.4 本协议自双方签章后生效。本协议所称“以上”“以下”均包含本数。</p>
        </div>
        <div
          class="fixed"
          @click="closeAgree"
        >×</div>
      </div>
    </van-popup>
    <van-popup
      v-model="isShowArea"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        :columns-num="2"
        @cancel="closeArea"
        @confirm="changeArea"
        :loading="loading1"
        :value="code"
      />
    </van-popup>

    <van-popup
      v-model="isShowCity"
      class="city-list"
    >
      <h2>请选择提单城市</h2>
      <ul>
        <li
          v-for="(item, index) in cityList2"
          :key="index"
          @click="selectCity(item)"
        >
          {{item.city_name}}
        </li>
      </ul>
    </van-popup>
    <van-popup
      v-model="isShowProduct"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns3"
        @cancel="closeProduct"
        @confirm="changeProduct"
      />
    </van-popup>
    <van-popup
      v-model="uploadModal"
      class="uploadModal"
    >
      <div>
        <h2 class="title">上传示例</h2>

        <div class="flex flex-justify-between">
          <p class="describe1">房产证内页一</p>
          <p class="describe2">点击下面图片查看大图</p>
        </div>

        <div
          class="example"
          v-on:click="exampleImgFuc(0)"
        >
          <img src="../../../assets/img/subOrderA/img.png" />
        </div>

        <div class="flex flex-justify-between">
          <p class="describe1">房产证内页二</p>
          <p class="describe2">点击下面图片查看大图</p>
        </div>

        <div
          class="example"
          v-on:click="exampleImgFuc(1)"
        >
          <img src="../../../assets/img/subOrderA/img2.png" />
        </div>

        <p class="upload-ask">上传要求：</p>

        <ul>
          <li>1. 请上传和示例相符的房产证内页</li>
          <li>2. 请确保上传照片清晰、明亮，以便快速审核通过</li>
          <li>3. 请确保房产证内页信息不被遮挡</li>
        </ul>

        <button
          class="but"
          v-on:click="uploadModal = false"
        >我知道了</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { CellGroup, Area, Toast, Dialog, Search, ImagePreview } from "vant";
export default {
  data() {
    return {
      uploadModal: false,
      isChannel: "",
      userName: "",
      userMobile: "",
      borPrice: "",
      borDate: "",
      areaList: {},
      show: false,
      areaValue: "请选择拟抵押房产所在省市区",
      files: [],
      area: "",
      real_estate_license_number: "",
      hAddress: "",
      hArea: "",
      isShowAgree: false,
      base64Arr: [],
      checked: false,
      pitch: false,
      city: this.$cookie.get("city") || "其他",
      cityName: "",
      tower: "",
      number: "",
      isShowArea: false,
      isSearch: false,
      searchValue: "",
      isOk: false,
      isShowHouses: false,
      columns1: [],
      isShowNum: false,
      columns2: [],
      cityValue: [],
      cityList: [],
      housesId: -1, //楼盘id
      indexArray: [],
      indexArray2: [],
      buildingId: "", //楼栋id
      numId: "", //房号id
      times: "", //估价次数
      defaultA: null,
      defaultB: null,
      loading1: true,
      loading2: true,
      loading3: true,
      code: this.$cookie.get("cityCode") || "177",
      isShowCity: false,
      cityList2: [],
      isShowAssess: false,
      product: this.$route.query.product,
      isShowProduct: false,
      columns3: [],
      productList: [],
      productID: "",
      floor: "",
      Loction: "",
      dcConstructionId: -1, //大成楼盘id
      dc_houses_name: -1, //大成楼盘名称,
      isSearchDC: false,
      searchValueDC: "",
      isOkDC: false,
      cityListDC: [],
      houseName: -1,
      exampleImg1: require("../../../assets/img/subOrderA/enlarge1.jpg"),
      exampleImg2: require("../../../assets/img/subOrderA/enlarge2.jpg"),
      isDisabled: false
    };
  },
  created() {

    this.$axios
      .fetchPost("/getUserInfo", {}, this.$cookie.get("token"))
      .then(res => {
        res.data.isChannel === 0
          ? (this.isChannel = true)
          : (this.isChannel = false);
      });
    // 获取城市列表
    this.$axios
      .fetchPost("/getCityList", {}, this.$cookie.get("token"))
      .then(res => {
        if (res.count !== 0) {
          this.isShowAssess = true;
        }
        this.areaList = res.data;
        this.loading1 = false;
        this.times = res.count;
        console.log(res);
        // if(this.times <= 0){
        //     this.$toast('您的急速评估次数不足，可以使用普通评估或完成任务获取更多次数');
        // }
      });

    // 获取默认城市列表
    this.$axios
      .fetchPost("/getSelectCityList", {}, this.$cookie.get("token"))
      .then(res => {
        console.log(res);
        this.cityList2 = res.data;
      });
    this.queryProduct(this.city);
    console.log(this.$route);
  },
  activated() {
    let houseData = this.$store.state.home.houseData;
    if (houseData.isReturn) {
      if (houseData.dc_name !== -1 && houseData.sl_name !== -1) {
        this.cityName =
          houseData.dc_name === houseData.sl_name
            ? houseData.sl_name
            : houseData.sl_name + "，" + houseData.dc_name;
      } else {
        this.cityName =
          houseData.dc_name === -1 ? houseData.sl_name : houseData.dc_name;
      }

      this.tower = houseData.tower;
      this.number = houseData.number;
      this.floor = houseData.floor;
      this.area = houseData.area;
      this.housesId = houseData.sl_id;
      this.dcConstructionId = houseData.dc_id;
      this.Loction = houseData.loction;
      this.houseName = houseData.sl_name;
      this.dc_houses_name = houseData.dc_name;
      this.buildingId = houseData.houseInfo.ID;
      this.numId = houseData.numInfo.ID;
    }
  },
  destroyed(){
    this.$store.commit('changeHouseData',{});
  },
  methods: {
    queryProduct(city) {
      // 获取产品
      this.$axios
        .fetchPost("/getProductList2", {
          city: city ? city : "其他"
        })
        .then(res => {
          console.log(res);
          let arr = [];
          let arr2 = [];
          res.data.forEach(v => {
            arr.push(v.p_name);
            arr2.push(v.pid);
          });
          this.columns3 = arr;
          this.productList = arr2;
          if (this.city === this.$cookie.get("city")) {
            this.productID = this.productList[this.$route.query.index];
            this.product = this.$route.query.product;
          } else {
            this.productID = "";
            this.product = "";
          }
        });
    },
    goSearch() {
      this.$router.push({
        name: "subOrderB",
        query: { city: this.city, cityCode: this.code }
      });
    },
    showProduct() {
      this.isShowProduct = true;
    },
    changeProduct(v, i) {
      console.log(v, i);
      this.product = v;
      this.productID = this.productList[i];
      this.closeProduct();
    },
    closeProduct() {
      this.isShowProduct = false;
    },
    selectCity(value) {
      console.log(value);
      this.city = value.city_name;
      this.isShowCity = false;
      this.code = value.city_code;
      this.cityValue = [
        {
          code: value.city_code,
          name: value.city_name
        },
        {
          code: value.city_code,
          name: value.city_name
        }
      ];
      console.log(this.cityValue);
      // 重新查询产品
      this.queryProduct(value.city_name);
      // 清空楼盘信息
      this.cityName = "";
      this.tower = "";
      this.number = "";
      this.floor = "";
      this.area = "";
      this.housesId = "";
      this.dcConstructionId = "";
      this.Loction = "";
      this.houseName = "";
      this.dc_houses_name = "";
      this.buildingId = "";
      this.numId = "";
    },
    showArea() {
      // this.isShowArea = true;
      this.isShowCity = true;
    },
    closeArea() {
      // this.isShowArea = false;
      this.isShowCity = false;
    },
    showAgree() {
      this.isShowAgree = true;
    },
    closeAgree() {
      this.isShowAgree = false;
    },
    changeArea(value) {
      console.log(value);
      this.city = value[1].name;
      this.isShowArea = false;
      this.cityValue = value;
    },
    myVerify() {
      if (!this.userName) {
        this.$toast("请输入正确的借款人姓名");
        return false;
      }
      let r = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/;
      if (!r.test(this.userMobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!this.city) {
        this.$toast("请选择正确的城市");
        return false;
      }
      if (!this.real_estate_license_number) {
        this.$toast("请输入正确的房产证编号");
        return false;
      }
      if (this.pitch) {
        if (!this.cityName) {
          this.$toast("请选择正确的楼盘名称");
          return false;
        }
        // if (!this.tower) {
        //   this.$toast("请选择正确的楼栋");
        //   return false;
        // }
        // if (!this.number) {
        //   this.$toast("请选择正确的房号");
        //   return false;
        // }
        // if (this.city === "成都市") {
        //   if (!this.floor) {
        //     this.$toast("请输入正确的楼层");
        //     return false;
        //   }
        // }
        // if (!this.area || this.area == 0) {
        //   this.$toast("请输入正确的建筑面积");
        //   return false;
        // }
      }
      return true;
    },
    submit() {
      let startTime = Date.now();
      if (this.product === undefined || this.product === "") {
        Toast("贷款产品不允许为空");
        return;
      }
      if (this.borPrice === "") {
        Toast("拟借款金额不允许为空");
        return;
      }
      if (this.borDate === "") {
        Toast("拟借款期限不允许为空");
        return;
      }
      if (!this.myVerify()) {
        return;
      }
      if (
        document.getElementById("uploadA").value.length === 0 ||
        document.getElementById("uploadB").value.length === 0
      ) {
        Toast("请上传完整的房产信息照片");
        return;
      }

      if (this.isChannel) {
        if (!this.checked) {
          Toast("请仔细阅读并勾选平台居间服务协议");
          return;
        }
      }
      this.isDisabled = true;
      let fd = new FormData(document.getElementById("myForm"));
      console.log(this.base64Arr);
      let curArr = this.base64Arr.length;
      for (let i = 0; i < curArr; i++) {
        fd.append("base64Arr", this.base64Arr[i]);
      }

      // fd.append("province", this.cityValue[0].name);
      // fd.append("provinceId", this.cityValue[0].code);
      // fd.append("city", this.cityValue[1].name);
      // fd.append("address", this.cityValue[2].name);
      fd.append("pid", this.productID);
      fd.append("cityId", this.code);
      fd.append("constructionId", this.housesId);
      fd.append("buildingId", this.buildingId);
      fd.append("houseId", this.numId);
      fd.append("evaluation_type", this.pitch ? 1 : 2);
      fd.append("dc_address", this.Loction);
      fd.append("dcConstructionId", this.dcConstructionId);
      fd.append("dc_houses_name", this.dc_houses_name);
      fd.append("houses_name", this.houseName);
      Toast.loading({
        duration: 0,
        mask: true,
        message: "正在提单..."
      });
      this.$axios
        .fetchPost("/handleOrder", fd, this.$cookie.get("token"))
        .then(res => {
          if (res.code === "1") {
            Toast.clear();
            console.log(res);
            let endTime = Date.now();
            // alert(endTime - startTime + '毫秒');
            this.$router.push({
              name: "success",
              query: { price: res.data ? res.data.total : undefined }
            });
          }
        });
      this.isDisabled = false;
    },
    uploadFile(e) {
      if (e.target.id === "imageA") {
        document.getElementById("uploadA").click();
      } else if (e.target.id === "imageB") {
        document.getElementById("uploadB").click();
      }
    },
    changeURL(e) {
      console.log(e);
      console.log(e.target.files.length);
      if (e.target.files.length === 0) {
        if (e.target.id === "uploadA") {
          e.target.files = this.defaultA;
        }
        if (e.target.id === "uploadB") {
          e.target.files = this.defaultB;
        }
      }
      let self = this;
      if (e.target.id === "uploadA") {
        this.defaultA = e.target.files;
      }
      if (e.target.id === "uploadB") {
        this.defaultB = e.target.files;
      }
      let newSrc = this.getObjectURL(e.target.files[0]);
      console.log(e.target.files[0].size, "原图大小");
      if (e.target.files[0].size / 1024 > 10000) {
        Toast("上传图片过大，请重新选择图片");
        return;
      }

      var queryImageA = document.getElementById("imageA");
      var queryImageB = document.getElementById("imageB");

      if (e.target.id === "uploadA") {
        let imgA = new Image();
        imgA.src = newSrc;
        imgA.onload = function() {
          let dataA = self.compress(imgA);

          queryImageA.src = dataA;
          self.base64Arr[0] = dataA;
        };
      } else if (e.target.id === "uploadB") {
        let imgB = new Image();
        imgB.src = newSrc;
        imgB.onload = function() {
          let dataB = self.compress(imgB);

          queryImageB.src = dataB;
          self.base64Arr[1] = dataB;
        };
      }
    },
    getObjectURL(file) {
      var url = null;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      // console.log(width, "pic Witdh");
      let height = img.height;
      // console.log(height, "pic Height");
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.2);
      console.log("*******压缩后的图片大小*******");
      console.log(ndata);
      console.log(ndata.length);
      return ndata;
    },
    changePrice() {
      if (this.borPrice == "") return;
      if (this.borPrice < 1) {
        this.borPrice = 1;
      } else if (this.borPrice > 500) {
        this.borPrice = 500;
      }
    },
    changeDate() {
      if (this.borDate == "") return;
      if (this.borDate < 1) {
        this.borDate = 1;
      } else if (this.borDate > 24) {
        this.borDate = 24;
      }
    },
    exampleImgFuc(num) {
      ImagePreview({
        images: [this.exampleImg1, this.exampleImg2],
        startPosition: num,
        onClose() {
          // do something
        }
      });
    }
  },
  components: {
    [CellGroup.name]: CellGroup,
    [Area.name]: Area,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    [Search.name]: Search
  }
};
</script>
<style lang="less" src="./subOrderA.less">
</style>
