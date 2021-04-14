<template>
  <div class="app-box">
    <Header v-if="showHead"/>
    <router-view class="app-box-content"></router-view>
  </div>
</template>>
<script>
import Header from '@/components/header/header.vue';
export default {

  data () {
    return {
      text: '123',
      header: false,
    }
  },
  components: {
    Header
  },
  computed:{
    showHead() {
      return this.$route.path.indexOf('login') < 1; 
    }
  },
  methods: {
    click () {
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.app-box{
  width:100%;
  height:100%;
  .app-box-content{
    height: calc(100% - 50px);
  }
}

</style>