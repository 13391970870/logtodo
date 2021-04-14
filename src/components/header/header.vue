<template>
  <div class="header">
    <ul class="header-list-box">
      <li v-for="(item,index) in headers" :key="index" @click="goRoute(item)"><i :class="item.icon"></i>{{item.name}}</li>
    </ul>
    <ul class="header-user-box">
      <li v-for="(item,index) in users" :key="index" @click="setUser(item)"><i :class="item.icon"></i>{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headers: [{
        name: '日志',
        icon: 'el-icon-s-order',
        type: 'log',
      },
      {
        name: '测试',
        icon: 'el-icon-s-platform',
        type: 'demo'
      },
      {
        name: '工具箱和文档',
        icon: 'el-icon-share',
        type: 'record'
      }],
      users: [{
        name: this.$store.state.userName,
        icon: 'el-icon-s-custom',
        type: 'userName'
      }, {
        name: '退出',
        icon: 'el-icon-s-unfold',
        type: 'exit'
      }]
    }
  },
  methods: {
    goRoute (item) {
      if (item.type === 'demo') {
        window.open('http://zhangshuming.icu/model');
      }
      else {
        this.$router.push(`/${item.type}`)
      }

    },
    setUser (item) {
      switch (item.type) {
        case 'exit':
          this.$store.commit('setToken', '');
          this.$router.replace('/login');
          break;
        case 'userName':
          this.$router.replace('/user');
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    function sort1 (array) {
      let value = 0;
      for (let i = 0; i < array.length; i++) {


        for(let j = 0;j < array.length;j++){
          if(array[j] > array[j + 1]){
            value = array[j];
            array[j] = array[j + 1];
            array[j + 1] = value;
          }
        }

      }

      return array;

    }
    console.log(sort1([8, 6, 4, 2, 1]));
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background: #f5fffa;
  box-shadow: 0 2px 15px #ddd;
  color: #666;
  font-size: 16px;
  display: flex;
  padding: 15px 20px;
  justify-content: space-between;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      cursor: pointer;
      min-width: 100px;
      i {
        margin-right: 10px;
      }
    }
  }
  .header-list-box {
    margin-left: 50px;
    li {
      &:nth-child(3) {
        width: 150px;
      }
    }
  }
}
</style >
