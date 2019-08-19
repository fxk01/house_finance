const Home = () => import('../page/Home/Home.vue');
const HomePage = () => import('../page/Home/HomePage/HomePage.vue');
const ProductBrief = () => import('../page/Home/ProductBrief/ProductBrief.vue');
const SubOrderA = () => import('../page/Home/SubOrderA/SubOrderA.vue');
const SubOrderB = () => import('../page/Home/SubOrderA/SubOrderB.vue');
const SubOrder = () => import('../page/Home/SubOrderA/SubOrder.vue');
const Success = () => import('../page/Home/Success/Success2.vue');
const AccessTest = () => import('../page/Home/AccessTest/AccessTest.vue');
const Calculate = () => import('../page/Home/Calculate/Calculate.vue');
const ShareOrder = () => import('../page/Home/ShareOrder/ShareOrder.vue');
const Banner = () => import('../page/Home/Banner/Banner.vue');
const HouseAssess = () => import('../page/Home/HouseAssess/HouseAssess.vue');
const AssessResult = () => import('../page/Home/HouseAssess/AssessResult/AssessResult.vue');
const Loading = () => import('../page/Home/HouseAssess/Loading/Loading.vue');
const AssessPage = () => import('../page/Home/HouseAssess/AssessPage/AssessPage2.vue');
const SearchPage = () => import('../page/Home/HouseAssess/SearchPage/SearchPage.vue');
const ProductDetail = () => import('../page/Home/ProductDetail/ProductDetail.vue');
const HurryBorrow = () => import('../page/Home/ProductDetail/HurryBorrow/HurryBorrow.vue');
const IndustryBorrow = () => import('../page/Home/ProductDetail/IndustryBorrow/IndustryBorrow.vue');
const Activity = () => import('../page/Home/Activity/Activity.vue');
const Pull = () => import('../page/Home/Activity/Pull/Pull.vue');
const JiNan = () => import('../page/Home/ProductDetail/JiNan/JiNan.vue');
const WuHan = () => import('../page/Home/ProductDetail/WuHan/WuHan.vue');
const SuZhou = () => import('../page/Home/ProductDetail/SuZhou/SuZhou.vue');
const ChangZhou = () => import('../page/Home/ProductDetail/ChangZhou/ChangZhou.vue');
const WuXi = () => import('../page/Home/ProductDetail/WuXi/WuXi.vue');
const GuangZhou = () => import('../page/Home/ProductDetail/GuangZhou/GuangZhou.vue');
const Invite = () => import('../page/Home/Activity/Invite/Invite.vue');
const InviteIndex = () => import('../page/Home/Activity/Invite/Inside/InviteIndex.vue');
const Friend = () => import('../page/Home/Activity/Invite/Inside/Friend.vue');
const Rank = () => import('../page/Home/Activity/Invite/Inside/Rank.vue');
const Turntable = () => import('../page/Home/Activity/Invite/Inside/Turntable.vue');
const Harvest = () => import('../page/Home/Activity/Invite/Inside/Harvest.vue');
const SuccessPage = () => import('../page/Home/Activity/Invite/Inside/SuccessPage.vue');
const NewGift = () => import('../page/Home/Activity/Invite/Inside/NewGift.vue');
const NewGiftReg = () => import('../page/Home/Activity/Invite/Inside/NewGiftReg.vue');
const ActiveRule = () => import('../page/Home/Activity/Invite/Inside/ActiveRule.vue');
const TurnRule = () => import('../page/Home/Activity/Invite/Inside/TurnRule.vue');

export default {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '首页',
    showFooter: true
  },
  children: [{
      path: '/',
      name: 'homePage',
      component: HomePage,
      meta: {
        title: '首页',
        showFooter: true
      }
    },
    {
      path: 'productBrief/:id',
      name: 'productBrief',
      component: ProductBrief,
      meta: {
        title: '产品介绍'
      }
    },
    {
      path: 'subOrderA',
      name: 'subOrder',
      component: SubOrder,
      meta: {
        title: '我要提单',
        isLogin: true,
        isAuth: true
      },
      children:[
        {
          path: '',
          name: 'subOrderA',
          component: SubOrderA,
          meta: {
            title: '我要提单',
            isLogin: true,
            isAuth: true
          }
        },
        {
          path: 'subOrderB',
          name: 'subOrderB',
          component: SubOrderB,
          meta: {
            title: '房产估值',
            isLogin: true,
            isAuth: true
          }
        },
      ]
    },
    {
      path: 'success',
      name: 'success',
      component: Success,
      meta: {
        title: '提单成功',
        isLogin: true,
        isFrom: true
      }
    },
    {
      path: 'accessTest',
      name: 'accessTest',
      component: AccessTest,
      meta: {
        title: '准入测试'
      }
    },
    {
      path: 'calculate',
      name: 'calculate',
      component: Calculate,
      meta: {
        title: '还款测算',
        isLogin: true
      }
    },
    {
      path: 'shareOrder',
      name: 'shareOrder',
      component: ShareOrder,
      meta: {
        title: '共享订单',
        isLogin: true
      }
    },
    {
      path: 'banner',
      name: 'banner',
      component: Banner,
      meta: {
        title: '广告',
      }
    },
    {
      path: 'houseAssess',
      name: 'houseAssess',
      component: HouseAssess,
      meta: {
        isLogin: true
      },
      children: [{
          path: '',
          name: 'assessPage',
          component: AssessPage,
          meta: {
            title: '房产估值',
            isLogin: true
          }
        },
        {
          path: 'assessResult',
          name: 'assessResult',
          component: AssessResult,
          meta: {
            title: '房产估值结果',
            isLogin: true
          }
        },
        {
          path: 'loading',
          name: 'loading',
          component: Loading,
          meta: {
            title: '房产估值查询中',
            isLogin: true
          }
        },
        {
          path: 'searchPage/:id',
          name: 'searchPage',
          component: SearchPage,
          meta: {
            title: '房产估值'
          }
        }
      ]
    },
    {
      path: 'productDetail',
      name: 'productDetail',
      component: ProductDetail,
      children:[{
        path:'',
        name:'hurryBorrow',
        component:HurryBorrow,
        meta:{
          title:'山高宅急贷'
        }
      },{
        path:'industryBorrow',
        name:'industryBorrow',
        component:IndustryBorrow,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'jiNan',
        name:'jiNan',
        component:JiNan,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'wuHan',
        name:'wuHan',
        component:WuHan,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'suZhou',
        name:'suZhou',
        component:SuZhou,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'guangZhou',
        name:'guangZhou',
        component:GuangZhou,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'changZhou',
        name:'changZhou',
        component:ChangZhou,
        meta:{
          title:'山高宅业贷'
        }
      },{
        path:'wuXi',
        name:'wuXi',
        component:WuXi,
        meta:{
          title:'山高宅业贷'
        }
      }]
    },
    {
      path: 'activity',
      name: 'activity',
      component: Activity,
      meta: {
        title: '山高房金',
      },
      children:[
        {
          path:'',
          name:'pull',
          component: Pull,
          meta: {
            title: '邀好友 得现金',
          },
        },
        {
          path:'invite',
          name:'invite',
          component: Invite,
          meta: {
            title: '邀好友 赚现金',
          },
          children:[
            {
              path:'',
              name:'inviteIndex',
              component: InviteIndex,
              meta: {
                title: '邀好友 赚现金',
              },
            },
            {
              path:'friend',
              name:'friend',
              component: Friend,
              meta: {
                title: '已邀请好友',
                isLogin: true
              },
            },
            {
              path:'rank',
              name:'rank',
              component: Rank,
              meta: {
                title: '邀请排行榜',
              },
            },
            {
              path:'turntable',
              name:'turntable',
              component: Turntable,
              meta: {
                title: '抽奖',
                isLogin: true
              },
            },
            {
              path:'harvest',
              name:'harvest',
              component: Harvest,
              meta: {
                title: '填写收件信息',
                isLogin: true
              },
            },
            {
              path:'successPage',
              name:'successPage',
              component: SuccessPage,
              meta: {
                title: '提交成功',
                isLogin: true
              },
            },
            {
              path:'newGift',
              name:'newGift',
              component: NewGift,
              meta: {
                title: '房金新人礼',
              },
            },
            {
              path:'newGiftReg',
              name:'newGiftReg',
              component: NewGiftReg,
              meta: {
                title: '房金新人礼',
              },
            },
            {
              path:'activeRule',
              name:'activeRule',
              component: ActiveRule,
              meta: {
                title: '活动规则',
              },
            },
            {
              path:'turnRule',
              name:'turnRule',
              component: TurnRule,
              meta: {
                title: '活动规则',
                isLogin: true
              },
            }
          ]
        }
      ]
    },
  ]
}
