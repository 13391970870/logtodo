import Vue from "vue";
import VueRouter from 'vue-router';
Vue.use(VueRouter);


import log from '@/views/log/log.vue';
import logEdit from '@/views/log/logEdit/logEdit.vue';
import logDetail from '@/views/log/logDetail/logDetail.vue';

import login from '@/views/login/login.vue';

import demo from '@/views/demo/demo.vue';

import record from '@/views/record/record.vue';
import recordEdit from '@/views/record/recordEdit/recordEdit.vue';

import user from '@/views/user/user.vue';


const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '/',
      component: log
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/logEdit',
      component: logEdit
    },
    {
      path: '/logDetail',
      component: logDetail
    },
    {
      path: '/log',
      component: log,
    },
    {
      path: '/record',
      component: record
    },
    {
      path: '/recordEdit',
      component: recordEdit
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/demo',
      component: demo
    }
  ]
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router;