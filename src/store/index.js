import Vue from "vue";
import Vuex from "vuex";
import {
  apiLogin
} from "@/api/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || '',
    userName: localStorage.getItem("userName") || '',
    blogColorList: {
      'JavaScript': '#f7acbc',
      '前端': '#deab8a',
      '后端': '#817936',
      'Vue': '#444693',
      'React.js': '#fedcbd',
      'CSS': '#ef5b9c',
      'Node.js': '#7f7522',
      'Webpack': '#2b4490',
      '前端框架': '#feeeed',
      '算法': '#f47920',
      '浏览器': '#2a5caa',
      'ES6': '#224b8f',
      'TS': '#f47920',
    },
    recordColorList: {
      '好文章': '#f7acbc',
      '好工具': '#deab8a',
      '学习网站': '#817936',
      '手册': '#444693',
      '面试题': '#fedcbd',
      '优秀个人博客': '#ef5b9c'
    }
  },
  mutations: {
    setToken(state, data) {
      state.token = data.token;
      localStorage.setItem("token", data.token)
    },
    setUserName(state, data) {
      state.userName = data;
      localStorage.setItem("userName", data)
    },
  },
  actions: {

    // async login({
    //   commit
    // }, datas) {
    //   const {
    //     userName,
    //     password
    //   } = datas;
    //   const {
    //     data
    //   } = await apiLogin({
    //     userName,
    //     password,
    //   })

    //   // happy path
    //   const token = data.data.token;
    //   commit("setToken", {
    //     token,
    //   });
    // },
  }
})