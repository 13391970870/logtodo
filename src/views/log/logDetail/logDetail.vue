<template>
  <div class="log-edit-box">
    <iframe class="log-content" :srcdoc="content"></iframe>
    <!-- <div v-html="content"></div> -->
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      content: '',
    }
  },
  methods: {
  },
  created () {
    this.blogData = this.$route.query.content;
    this.content = this.blogData && this.blogData.innerHTML;
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.log-edit-box {
  padding:10px 20px 0px 20px;
  display: flex;
  justify-content: center;
  .log-content {
    border: none;
    width: 60%;
    height: 100%;
  }
}
</style>