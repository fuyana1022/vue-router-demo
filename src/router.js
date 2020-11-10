import Vue from 'vue'
import VueRouter from 'vue-router';
import auth from './util/auth';

import Home from './views/Home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    //   alias: '/'
    },
    {
      path: '/learn',
      // component: () => import('./views/Learn'),
      components: {
        default: () => import('./views/Learn'),
        student: () => import('./views/Student'),
      },
    },
    {
      path: '/student',
      component: () => import('./views/Student'),
    },
    {
      path: '/about',
      meta: {
        requiresLogin: true,
      },
      component: () => import('./views/About'),
    },
    {
      path: '/activity',
    //   redirect: '/activity/academic',
      redirect: {name: 'academic'},
      meta: {
        requiresLogin: true,
      },
      component: () => import(/* webpackChunkName: 'academic'  */'./views/Activity'),
      children:[
        {
            path: 'academic',
            name: 'academic',
            component: () => import(/* webpackChunkName: 'academic'  */'./views/Academic'),
        },
        {
            path: 'personal',
            name: 'personal',
            component: () => import('./views/Personal'),
        },
        {
            path: 'download',
            name: 'download',
            component: () => import('./views/Download'),
        },
      ]
    },
    {
        path: '/course/:id',
        component: () => import('./views/About'),
    },
    {
        path: '/question/:id',
        name: 'question',
        props: true,
        props: (route) => ({
          name: route.name,
          id: route.params.id,
        }),
        component: () => import('./views/Question'),
    },
    {
      path: '/login',
      component: () => import('./views/Login'),
    },
  ]

const router =  new VueRouter({
    routes,
    mode: 'history',
  })

  router.beforeEach((to, from, next) => {
    const isRequireLogin = to.matched.some(item => item.meta.requiresLogin);
    if(isRequireLogin){
      const isLogin = auth.isLogin();
      console.log(isLogin);
      if(isLogin){
        next();
      }else{
        const isToLogin = window.confirm('要登录后才可以浏览，是否去登录？');
        isToLogin ? next('/login') : next(false);
      }
    }else{
      next();
    }
  })

  export default router;
