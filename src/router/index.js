import Vue from 'vue'
import Router from 'vue-router'

// 重写push和replace方法
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace (location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};

const LoginPage = () => import('@/pages/login')
const NoAuth = () => import('@/pages/noAuth')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/noAuth',
    name: 'noAuth',
    component: NoAuth
  }
]

const router = new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (authList[to.name]) next()
    else next({ name: 'noAuth' })
  } else next()
})

export default router