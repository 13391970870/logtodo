<template>
  <div class="page">
    <ul class="page-box">
      <li v-for="item of pages" :key="item" @click="choosePage(item)" :class="{'page-active':active == item}">{{item}}</li>
    </ul>
    <p>共{{allPages}}条</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: false,
    }
  },
  props: ['allPages','limit'],
  computed: {
    pages: function () {
      return Math.ceil(this.allPages / this.limit) || 0;
    }
  },
  methods: {
    choosePage(item){
      this.active = item;
      this.$emit('choosePage',item);
    }
  },
  mounted () {
    
  }
}
</script>
<style lang="scss" scoped>
.page {
  display: flex;
  line-height: 30px;
  .page-box{
    display: flex;
    li{
      width: 30px;
      height:30px;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 5px;
      margin:0px 5px;
      cursor: pointer;
      background: #fff;
    }
    .page-active{
      background: #ccc;
    }
  }
}
</style >
