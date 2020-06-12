import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './components/home'
import login from './components/login'
import table from './components/table/table.vue'
import heatmap from './components/table/heatmap.vue'
import profit_d from './components/profit/profit_d.vue'
import profit_a from './components/profit/profit_a.vue'
import _404 from './components/404.vue'
import NotFoundComponent from './components/error404.vue'



// const hello2 = () => Promise.resolve({ /* 组件定义对象 */ })
// import('./components/hello2') // 返回 Promise
// const hello2 = () => import('./components/hello2')

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path: '/', component:home},
    {path: '/home', component:home ,meta: { title:'分析页'}},
    {path: '/login', component:login,meta: { title:'登录',unShow: true}}, //unShow参数，是否隐藏侧边栏，登陆界面时隐藏
    {path: '/table', component:table,meta: { title:'详表查询'}},
    {path: '/heatmap', component:heatmap,meta: { title:'热力图'}},
    {path: '/profit_d', component:profit_d,meta: { title:'区域销售差异'}},
    {path: '/profit_a', component:profit_a,meta: { title:'销售利润分析'}},
    {path: '/404', component:_404,meta: { title:'404'}},
    { path: '*', component: NotFoundComponent}
  ]
})


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path === '/login') {
    let usernane = localStorage.getItem('name');

    if (usernane !== null && usernane !== '') {
      next('/');
    } else {
      next();
    }
  } else {
    let usernane = localStorage.getItem('name');

    if (usernane === null || usernane === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router