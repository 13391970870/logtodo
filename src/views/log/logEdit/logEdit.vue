<template>
  <div class="log-edit-box">
    <div class="log-edit-head">
      <span class="edit-head-tag">标题:</span><input class="log-edit-input" type='text' v-model="title" />
      <span class="edit-head-tag">类型:</span>
      <div class="edit-log-type">
        <span class="noselect" v-for="(item,index) in logTypeList" :key="index" :style="{'background':item}" @click="chooseType(index)" :class="{'edit-log-type-active':chooseList.indexOf(index) > -1}">{{index}}</span>
      </div>
      <span class="edit-head-introduce">
        简述：
      </span>
      <textarea row="3" v-model="introduce" />
      <input v-model="time"/>
    </div>

    <div class="log-edit-content">
      <tinymce-editor @input="getContent" v-model="content" :disabled="disabled" @onClick="onClick" ref="editor"></tinymce-editor>
      <div class="log-edit-btn-box">
        <button class="z-btn btn-default" @click="clear">清空内容</button>
        <button class="z-btn btn-default" @click="disabled = true">禁用</button>
        <button class="z-btn btn-default" @click="submit">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce/tinymce.vue';
import { apiBlogUpdate } from '@/api/index.js';
import { dateFormat } from '@/api/utils.js';
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      content: '<h2>主题：</h2>\n<p>&nbsp;</p>\n<h2>总结：</h2>\n<p>&nbsp;</p>\n',
      blogData: {},
      logTypeList: this.$store.state.blogColorList,
      chooseList: [],
      title: '',
      introduce: '',
      time: ''
    }
  },
  methods: {
    //鼠标单击的事件
    onClick (e, editor) {
    },
    //清空内容
    clear () {
      this.$refs.editor.clear()
    },
    submit () {
      if (!this.title || !this.chooseList.length || !this.time) {
        alert('文章标题 文章类型为必填项！')
        return;
      }
      let time = this.time.split(',');
      let chooseList = [];
      apiBlogUpdate({
        title: this.title,
        content: this.content,
        log_type: this.chooseList,
        introduce: this.introduce,
        username: this.$store.state.userName,
        id: (this.blogData && this.blogData.blog_id) || false,
        file_path: (this.blogData && this.blogData.file_path) || false,
        time: dateFormat(new Date(time[0],time[1],time[2],time[3],time[4],time[5])),
        updateTime: dateFormat(new Date(new Date(time[0],time[1],time[2],time[3],time[4],time[5]))),
      }).then(res => {
        if (res.data.status) {
          this.$router.push('/log');
        }
      })
    },
    getData () {


    },
    getContent (content) {
      this.content = content;
    },
    chooseType (type) {
      let tag = this.chooseList.indexOf(type);
      if (tag < 0) {
        this.chooseList.push(type);
      }
      else {
        this.chooseList.splice(tag, 1);
      }
    }
  },
  created () {
    this.getData();
    this.blogData = this.$route.query.content;
    if (this.blogData && this.blogData.innerHTML) {
      this.content = this.blogData.innerHTML;
      this.chooseList = this.blogData.log_type.split(',');
      this.title = this.blogData.title;
      this.introduce = this.blogData.introduce;
    };
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.log-edit-box {
  padding: 20px;
  .log-edit-head {
    display: flex;
    width: 100%;
    height: 140px;
    background: #f6f6f6;
    font-size: 16px;
    padding: 10px;
    flex-wrap: wrap;
    .log-edit-input {
      width: calc(100% - 100px);
      height: 30px;
      line-height: 300px;
      border-bottom: 1px solid #ccc;
      padding: 5px;
    }
    .edit-head-tag {
      height: 30px;
      line-height: 30px;
      margin: 0px 10px;
    }
    .edit-log-type {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      span {
        padding: 5px 10px;
        height:30px;
        font-size: 14px;
        background: #ccc;
        border-radius: 10px;
        margin: 0px 5px;
        cursor: pointer;
      }
      .edit-log-type-active {
        border:1px solid #000;
      }
    }
    textarea {
      width: 30%;
      height: 75px;
      padding: 5px;
    }
  }
  .log-edit-content {
    .log-edit-btn-box {
      display: flex;
      justify-content: space-around;
      width: 50%;
      margin-top:10px;
    }
  }
}
</style>