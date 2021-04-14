<template>
  <div class="record-edit-box">
    <div class="record-edit-head">
      <span class="edit-head-tag">标题:</span><input class="record-edit-input" type='text' v-model="title" />
      <span class="edit-head-tag">类型:</span>
      <div class="edit-record-type">
        <span class="noselect" v-for="(item,index) in recordTypeList" :key="index" :style="{'background':item}" @click="chooseType(index)" :class="{'edit-record-type-active':chooseList.indexOf(index) > -1}">{{index}}</span>
      </div>
      <span class="edit-head-introduce">
        简述：
      </span>
      <textarea row="3" v-model="introduce" />
    </div>

    <div class="record-edit-content">
      <tinymce-editor @input="getContent" v-model="content" :disabled="disabled" @onClick="onClick" ref="editor"></tinymce-editor>
      <div class="record-edit-btn-box">
        <button class="z-btn btn-default" @click="clear">清空内容</button>
        <button class="z-btn btn-default" @click="disabled = true">禁用</button>
        <button class="z-btn btn-default" @click="submit">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce/tinymce.vue';
import { apiRecordUpdate } from '@/api/index.js';
import { dateFormat } from '@/api/utils.js';
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      msg: 'Welcome to Use Tinymce Editor',
      disabled: false,
      content: '',
      recordData: {},
      recordTypeList: this.$store.state.recordColorList,
      chooseList: [],
      title: '',
      introduce: '',
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
      if (!this.title || !this.chooseList.length) {
        alert('文章标题 文章类型为必填项！')
        return;
      }
      apiRecordUpdate({
        title: this.title,
        content: this.content,
        record_type: this.chooseList,
        introduce: this.introduce,
        username: this.$store.state.userName,
        id: (this.recordData && this.recordData.record_id) || false,
        file_path: (this.recordData && this.recordData.file_path) || false,
        time: dateFormat(new Date()),
        updateTime: dateFormat(new Date(new Date())),
      }).then(res => {
        if (res.data.status) {
          this.$router.push('/record');
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
    this.recordData = this.$route.query.content;
    console.log(this.recordData);
    if (this.recordData && this.recordData.innerHTML) {
      this.content = this.recordData.innerHTML;
      this.chooseList = this.recordData.record_type.split(',');
      this.title = this.recordData.title;
      this.introduce = this.recordData.introduce;
    };
  },
  mounted () {
    
  }
}
</script>

<style lang="scss" scoped>
.record-edit-box {
  padding: 20px;
  .record-edit-head {
    display: flex;
    width: 100%;
    height: 140px;
    background: #f6f6f6;
    font-size: 16px;
    padding: 10px;
    flex-wrap: wrap;
    .record-edit-input {
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
    .edit-record-type {
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
      .edit-record-type-active {
        border:1px solid #000;
      }
    }
    textarea {
      width: 30%;
      height: 75px;
      padding: 5px;
    }
  }
  .record-edit-content {
    .record-edit-btn-box {
      display: flex;
      justify-content: space-around;
      width: 50%;
      margin-top:10px;
    }
  }
}
</style>