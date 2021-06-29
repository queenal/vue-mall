import Vue from 'vue'
import VueRouter from 'vue-router'

const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, onComplete, onAbort = () => {}) {
  return push.call(this, location, onComplete, onAbort);
};

VueRouter.prototype.replace = function(
  location,
  onComplete,
  onAbort = () => {}
) {
  return replace.call(this, location, onComplete, onAbort);
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home',
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/views/home/home')
  },
  {
    path: '/category',
    name: '分类',
    component: () => import('@/views/category/category')
  },
  {
    path: '/cart',
    name: '购物车',
    component: () => import('@/views/cart/cart')
  },
  {
    path: '/profile',
    name: '个人',
    component: () => import('@/views/profile/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
