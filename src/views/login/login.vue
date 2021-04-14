<template>
  <div class="login-box">
    <div class="login-container">
      <div class="login-info" v-show="!registe">
        <h1>登录</h1>
        <p class="warn-content">{{loginWarn}}</p>
        <ul>
          <li>
            <p>用户名：</p><input v-model="userName">
          </li>
          <li>
            <p>密码：</p><input type="password" v-model="password">
          </li>
        </ul>
      </div>

      <div class="register-info" v-show="registe">
        <h1>注册</h1>
        <p class="warn-content">{{warn}}</p>
        <ul>
          <li>
            <p>用户名：</p><input v-model="registeUserName">
          </li>
          <li>
            <p>密码：</p><input type="password" v-model="registePassword">
          </li>
        </ul>
      </div>
      <div class="login-btn-box">
        <button class="register-box z-btn z-btn-defalut" @click="login">{{registe?'登录':'提交登录'}}</button>
        <button class="register-box z-btn z-btn-defalut" @click="toGegiste()">{{registe?'提交注册':'注册'}}</button>
      </div>
    </div>
    <div class="login-bottom">
      <div class="login-bottom-content">
        <p>Copyright © 2021-2024 个人网站 zhangshuming.cn All Rights Reserved. <a href="https://beian.miit.gov.cn/#/Integrated/index">备案号：晋ICP备2021006694号-1</a></p>
      </div>
    </div>
  </div>
</template>
<script>
import { apiSegiste, apiLogin } from '@/api/index.js';
export default {
  data () {
    return {
      userName: '',
      password: '',
      registeUserName: '',
      registePassword: '',
      warn: ' ',
      loginWarn: ' ',
      registe: false,
    }
  },
  methods: {
    toGegiste () {
      if (this.registe) {
        apiSegiste({
          userName: this.registeUserName,
          password: this.registePassword,
        }).then(res => {
          this.warn = res.data.content;
          if (!this.warn) {
            this.registe = false;
          }
        })
      }
      else {
        this.registe = !this.registe;
      }
    },
    login () {
      if (this.registe) {
        this.registe = !this.registe;
      }
      else {
        apiLogin({
          userName: this.userName,
          password: this.password,
        }).then(res => {
          this.loginWarn = res.data.content;
          if (!this.loginWarn) {
            this.$store.commit("setToken", res.data.data);
            this.$store.commit("setUserName", this.userName);
            this.$router.push('/log')
          }
        })
      }

    }
  }
}
</script>
<style lang="scss" scoped>
.login-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 500px;
    height: 300px;
    display: flex;
    border-radius: 20px;
    background: #F5FFFA;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 15px #ddd;
    // padding:20px;
    .register-box {
      width: 100px;
    }
    ul {
      width: 300px;
      li {
        display: flex;
        height: 50px;
        align-items: center;
        p {
          width: 65px;
          // line-height:50px;
        }
        input {
          height: 25px;
          border-radius: 5px;
          padding:5px;
        }
      }
    }
    .login-btn-box {
      margin-top:15px;
      width: 100%;
      display: flex;
      align-items: center;
      // flex-direction: column;
      justify-content: center;
      button {
        margin: 0px 5px;
      }
    }
  }
  .login-bottom {
    width: 100%;
    height: 60px;
    background: #F5FFFA;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: center;
    color: #666;
    line-height: 60px;
    .login-bottom-content {
      width: 50%;
      text-align: center;
    }
  }
  .warn-content {
    width: 100%;
    height: 16px;
    display: inline-block;
  }
}
</style >
