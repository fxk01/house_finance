import accountSetRoute from '../page/User/AccountSet/AccountSetRoute';
import EvaluationRoute from '../page/User/Evaluation/EvaluationRoute';
import CashCardRoute from '../page/User/CashCard/CashCardRoute';
import DispatchRoute from '../page/User/Dispatch/DispatchRoute';
import AboutHousingRoute from '../page/User/AboutHousing/AboutHousingRoute';
import PartnerRoute from '../page/User/Partner/PartnerRoute';
import commissionHomeRoute from '../page/User/CommissionHome/commissionHomeRoute';
import MyBillRoute from '../page/User/MyBill/MyBillRoute';

const User = () => import('../page/User/User.vue');
const UserPage = () => import('../page/User/UserPage2/UserPage.vue');
const Bill = () => import('../page/User/Bill/Bill.vue');
const Achievement = () => import('../page/User/Achievement/Achievement.vue');
const CapitalFlow = () => import('../page/User/CapitalFlow/CapitalFlow.vue');
const Notify = () => import('../page/User/Notify/Notify.vue');
const MyCard = () => import('../page/User/MyCard/MyCard.vue');
const SharedOrders = () => import('../page/User/SharedOrders/SharedOrders.vue');
const BankList = () => import('../page/User/bankList/bankList.vue');
const ActivitiesInvite = () => import('../page/User/ActivitiesInvite/ActivitiesInvite.vue');
const BusinessRoles = () => import('../page/User/BusinessRoles/BusinessRoles.vue');
const LowerDetail = () => import('../page/User/Achievement/LowerDetail/LowerDetail.vue');
const CommissionDetail = () => import('../page/User/Achievement/CommissionDetail/CommissionDetail.vue');
const RedEnvelopeRecord = () => import('../page/User/RedEnvelopeRecord/RedEnvelopeRecord.vue');
const AccountingRecord = () => import('../page/User/AccountingRecord/AccountingRecord.vue');
const CommissionAffirm = () => import('../page/User/CommissionAffirm/CommissionAffirm.vue');

// const Partner = () => import('../page/User/Partner/Partner.vue');
// const Commission = () => import('../page/User/Commission/Commission.vue');

export default {
  path: '/user',
  name: 'User',
  component: User,
  meta: {
    title: '我的',
    isLogin: true
  },
  children: [{
    name: 'UserPage',
    path: '/user',
    component: UserPage,
    meta: {
      title: '我的',
      showFooter: true,
      isLogin: true
    },
  }, {
    name: 'Bill',
    path: '/user/bill',
    component: Bill,
    meta: {
      title: '我的提单',
      isLogin: true
    },
  }, {
    name: 'Achievement',
    path: '/user/achievement',
    component: Achievement,
    meta: {
      title: '我的业绩',
      isLogin: true
    }
  }, {
    name: 'CapitalFlow',
    path: '/user/capital',
    component: CapitalFlow,
    meta: {
      title: '资金流水',
      isLogin: true
    }
  }, {
    name: 'Notify',
    path: '/user/notify',
    component: Notify,
    meta: {
      title: '消息通知',
      isLogin: true
    }
  }, {
    name: 'MyCard',
    path: '/user/card',
    component: MyCard,
    meta: {
      title: '我的名片',
      isLogin: true
    }
  },{
    name: 'CommissionAffirm',
    path: '/user/affirm',
    component: CommissionAffirm,
    meta: {
      title: '收款确认',
      isLogin: true
    }
  }, {
    name: 'BankList',
    path: '/card/bank/card/list',
    component: BankList,
    meta: {
      title: '支持绑定银行列表',
      isLogin: true
    }
  }, {
    name: 'SharedOrders',
    path: '/user/orders',
    component: SharedOrders,
    meta: {
      title: '共享订单',
      isLogin: true
    }
  }, {
    name: 'ActivitiesInvite',
    path: '/user/invitation',
    component: ActivitiesInvite,
    meta: {
      title: '邀请注册',
      // isLogin: true
    }
  }, {
    name: 'LowerDetail',
    path: '/user/achievement/detail',
    component: LowerDetail,
    meta: {
      title: '下级详情页',
      isLogin: true
    },
  }, {
    name: 'CommissionDetail',
    path: '/user/achievement/commission',
    component: CommissionDetail,
    meta: {
      title: '佣金详情',
      isLogin: true
    },
  }, {
    name: 'BusinessRoles',
    path: '/user/roles',
    component: BusinessRoles,
    meta: {
      title: '业务角色说明',
      isLogin: true
    }
  }, {
    name: 'RedEnvelopeRecord',
    path: '/user/record',
    component: RedEnvelopeRecord,
    meta: {
      title: '红包记录',
      isLogin: true
    }
  }, {
    name: 'AccountingRecord',
    path: '/user/accounting',
    component: AccountingRecord,
    meta: {
      title: '入账记录',
      isLogin: true
    }
  },
    accountSetRoute,
    EvaluationRoute,
    CashCardRoute,
    DispatchRoute,
    AboutHousingRoute,
    PartnerRoute,
    commissionHomeRoute,
    MyBillRoute,
  ]
}




// {
//   name: 'Partner',
//     path: '/user/partner',
//   component: Partner,
//   meta: {
//   title: '我的邀请',
//     isLogin: true
// },
// },

// {
//   name: 'Commission',
//     path: '/user/commission',
//   component: Commission,
//   meta: {
//   title: '佣金提现',
//     isLogin: true
// }
// },
