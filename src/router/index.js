import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index/index'
import type from '../components/index/type'
import shoppingcart from '../components/index/shoppingcart'
import mine from '../components/index/mine'
import shopdetail from '../components/index/shopdetail/shopdetail'
import login from '../components/index/login'
import kindof from '../components/index/shopdetail/kindof'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect:'index'},//重定向到主页
    {path: '/index', name: 'index', component: index,meta: { navShow: true}},//主页
    {path: '/shopdetail/:shopid', component: shopdetail , meta: { navShow: false}},//商品详情
    {path: '/type', name: 'type', component: type , meta: { navShow: true}},//分类
    {path: '/shoppingcart', name: 'shoppingcart', component:shoppingcart,meta: { navShow: true}},//购物车
    {path: '/mine', name: 'mine', component: mine,meta: { navShow: true}},//我的
    {path: '/login', name: 'login', component: login,meta: { navShow: true}},//登录
    {path: '/kindof/:mk', component: kindof,meta: { navShow: false}},//分类
  ]
})
