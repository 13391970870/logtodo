//封装axios

import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router/index.js'

const myAxios = axios.create({

})

myAxios.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    //koa-jwt

    config.headers.authorization = "Bearer " + token;
  }
  return config;
})

myAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    alert(err)
    const state = {
      ...err
    };
    if (state.response.status == '401') {
      router.replace({
        path: "/login",
      });
    }
  }
);

export default myAxios;