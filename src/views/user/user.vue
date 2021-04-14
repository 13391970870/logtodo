<template>
  <div class="user-box">
    <div class="user-box-content">
      <img :src="userImg" @click="updateUserImg"/>
      <div class="user-info">
        <p>用户名：<span>{{user.userName}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userImg: 'https://fanyi-cdn.cdn.bcebos.com/static/translation/widget/translate/output/img/short-banner1_edeef70.png',
      user:{
        userName: this.$store.state.userName,
      }
    }
  },
  methods: {
    updateUserImg(){}
  }
}
</script>
<style lang="scss" scoped>
.user-box {
  padding: 20px;
  display: flex;
  .user-box-content {
    background: #f5fffa;
    padding-left: 50px;
    padding-top: 50px;
    width: 100%;
    img {
      cursor: pointer;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-info{
      margin-top:20px;
      font-size:18px;
    }
  }
}
</style >
