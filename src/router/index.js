import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import QuickQuestion from '@/components/QuickQuestion'
import PersonalCenter from '@/components/PersonalCenter'
import SelectQuestion from '@/components/SelectQuestion'
import SelectMaster from '@/components/SelectMaster'
import SureOrder from '@/components/SureOrder'
import PaySuccess from '@/components/PaySuccess'
import CreatArchives from '@/components/CreatArchives'
import SelectArchives from '@/components/SelectArchives'
import SearchMaster from '@/components/SearchMaster'
import MasterList from '@/components/MasterList'
import MasterDetail from '@/components/MasterDetail'
import Topic from '@/components/Topic'
import TopicDetail from '@/components/TopicDetail'

// import Coupon from '@/components/Coupon'
import Order from '@/components/Order'
import OrderDetail from '@/components/OrderDetail'
// import OrderFinshed from '@/components/OrderFinshed'
// import Evaluate from '@/components/Evaluate'
// import EvaluateFinshed from '@/components/EvaluateFinshed'
import Feedback from '@/components/Feedback'
import AboutUs from '@/components/AboutUs'
import TodayFortune from '@/components/TodayFortune'
import ArchivesDetail from '@/components/ArchivesDetail'
import PersonArchives from '@/components/PersonArchives'
// import PersonCoupon from '@/components/PersonCoupon'

import Phone from '@/components/Phone'
import ShortcutPhone from '@/components/ShortcutPhone'
import Login from '@/components/Login'
import PersonSet from '@/components/PersonSet'
import FollowTeacher from '@/components/FollowTeacher'
// import Test from '@/components/Test'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
      path: "/",
      redirect: '/home'
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   meta: { title: "快速提问" },
    //   component: Test
    // },
    {
      path: '/followTeacher',
      name: 'followTeacher',
      meta: { title: "关注老师" },
      component: FollowTeacher
    },
    {
      path: '/personSet',
      name: 'personSet',
      meta: { title: "设置" },
      component: PersonSet
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "登录"
      },
      component: Login
    },
    {
      path: '/shortcutPhone',
      name: 'shortcutPhone',
      meta: {
        title: "快捷电话"
      },
      component: ShortcutPhone
    },
    {
      path: '/phone',
      name: 'phone',
      meta: {
        title: "手机号码"
      },
      component: Phone
    },
    // {
    //   path: '/personCoupon',
    //   name: 'personCoupon',
    //   meta: { title: "优惠卷" },
    //   component: PersonCoupon
    // },
    {
      path: '/personArchives',
      name: 'personArchives',
      meta: { title: "八字档案" },
      component: PersonArchives
    },
    {
      path: '/archivesDetail',
      name: 'archivesDetail',
      meta: { title: "八字档案" },
      component: ArchivesDetail
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: "问易台"
      },
      component: Home
    },


    {
      path: '/PersonalCenter',
      name: 'personalCenter',
      meta: {
        title: "个人中心"
      },
      component: PersonalCenter
    },
    {
      path: '/quickQuestion',
      name: 'quickQuestion',
      meta: {
        title: "快速提问"
      },
      component: QuickQuestion
    },
    {
      path: '/selectQuestion',
      name: 'selectQuestion',
      meta: {
        title: "婚恋感情-提问"
      },
      component: SelectQuestion
    },
    {
      path: '/selectMaster',
      name: 'selectMaster',
      meta: {
        title: "选老师"
      },
      component: SelectMaster
    },
    {
      path: '/sureOrder',
      name: 'sureOrder',
      meta: {
        title: "确定订单"
      },
      component: SureOrder
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      meta: { title: "确定订单" },
      component: PaySuccess
    },
    {
      path: '/creatArchives',
      name: 'creatArchives',
      meta: { title: "新建档案" },
      component: CreatArchives
    },
    {
      path: '/selectArchives',
      name: 'selectArchives',
      meta: { title: "选择档案" },
      component: SelectArchives
    },
    {
      path: '/searchMaster',
      name: 'searchMaster',
      meta: {
        title: "找老师"
      },
      component: SearchMaster
    },
    {
      path: '/masterList',
      name: 'masterList',
      component: MasterList
    },

    {
      path: '/masterDetail',
      name: 'masterDetail',
      meta: {
        title: ""
      },
      component: MasterDetail
    },
    {
      path: '/topic',
      name: 'topic',
      meta: {
        title: "话题快测"
      },
      component: Topic
    },
    {
      path: '/topicDetail',
      name: 'topicDetail',
      meta: {
        title: "话题快测"
      },
      component: TopicDetail
    },
    // {
    //   path: '/coupon',
    //   name: 'coupon',
    //   meta: { title: "优惠券" },
    //   component: Coupon
    // },
    {
      path: '/order',
      name: 'order',
      meta: { title: "咨询订单" },
      component: Order
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      meta: { title: "咨询订单" },
      component: OrderDetail
    },
    // {
    //   path: '/orderFinshed',
    //   name: 'orderFinshed',
    //   meta: { title: "咨询订单" },
    //   component: OrderFinshed
    // },
    // {
    //   path: '/evaluate',
    //   name: 'evaluate',
    //   meta: { title: "评价" },
    //   component: Evaluate
    // },
    // {
    //   path: '/evaluateFinshed',
    //   name: 'evaluateFinshed',
    //   meta: { title: "评价" },
    //   component: EvaluateFinshed
    // },
    {
      path: '/feedback',
      name: 'feedback',
      meta: { title: "意见反馈" },
      component: Feedback
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {
        title: "关于我们"
      },
      component: AboutUs
    },
    {
      path: '/todayFortune',
      name: 'todayFortune',
      meta: { title: "今日运势" },
      component: TodayFortune
    }
  ]
})

router.beforeEach((to, from, next) => { //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) { //判断是否有标题
    document.title = to.meta.title
  }
  next() //执行进入路由，如果不写就不会进入目标页
})



export default router


// WEBPACK FOOTER //
// ./src/router/index.js
