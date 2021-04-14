<template>
  <div class="record-box">
    <div class="record-content">
      <div class="record-content-head">

        <h1 class="record-content-title">随看随记</h1>

        <!-- <button class="z-btn z-btn-default" @click="$router.push('/recordEdit')">创建文章</button> -->
        <p class="record-content-lag">—— 做好眼下之事 ——</p>
      </div>

      <div class="record-content-content">
        <vue-scroll :ops="ops">
          <div class="record-content-content-list">
            <div class="record-content-content-info" v-for="(item,index) in recordList" :key="index">
              <h1>{{item.title}}</h1>
              <div class="record-content-contro">
                <!-- <p @click.stop="updateRecord(item)">编辑</p>
                <p @click.stop="deleteRecord(item)">删除</p> -->
              </div>
              <!-- <iframe class="record-content" :src="item.file_path"></iframe> -->
              <div class="record-type">
                <span class="noselect" v-for="(item,index) in item.record_type.split(',')" :key="index" :style="{'background':recordColorList[item]}">{{item}}</span>
              </div>
              <div class="record-content-info" v-html="item.innerHTML"></div>
            </div>
          </div>

        </vue-scroll>
      </div>
    </div>
  </div>
</template>>
<script>
import { apiRecord, apiRecordDelete } from '@/api/index.js';
export default {

  data () {
    return {
      text: 'record',
      recordColorList: this.$store.state.recordColorList,
      recordList: [],
      ops: {
        bar: {
          keepShow: true
        },
        rail: {
          gutterOfSide: "0px",
          keepShow: false,
        },
      }
    }
  },
  methods: {
    getData () {
      apiRecord().then((res) => {
        this.recordList = res.data;
      })

    },
    updateRecord (content) {
      console.log(content);
      this.$router.push({
        path: '/recordEdit',
        query: {
          content,
        }
      })
    },
    deleteRecord (item) {
      apiRecordDelete({ id: item.record_id, file_path: item.file_path }).then(res => {
        this.getData();
      })
    },
  },
  created () {
    this.getData();
  }
}
</script>
<style lang="scss" scoped>
.record-box {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0px 20px;
  background: #f5fffa;
  box-shadow: 0 2px 15px #ddd;
  display: flex;
  justify-content: center;
  .record-content {
    padding: 20px;
    width: 80%;
    margin: 0 auto;
    background: #f5fffa;
    border: none;
    .record-content-head {
      height: 80px;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .record-content-title {
        text-align: center;
        width: 100%;
      }

      .record-content-lag {
        float: right;
        margin-top: 10px;
        color: #6c757d;
      }
    }

    .record-content-content {
      // display: flex;
      // justify-content: center;
      // flex-wrap: wrap;
      height: calc(100% - 80px);
      // .record-content-content-btn {
      //   width: 60%;
      //   padding: 10px 0px;
      //   margin: 0 auto;
      // }
      .record-content-content-list {
        margin-right: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .record-content-content-info {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          border-bottom: 1px dashed #6c757d;
          padding: 10px 0px 20px 0px;
          h1 {
            margin: 5px 0px;
            display: initial;
          }
          .record-content-info {
            width: 100%;
          }
        }
        .record-content-contro {
          display: inline-block;
        }
        .record-type {
          width: 100%;
          display: flex;
          margin: 10px 0px;
          span {
            height: 30px;
            padding: 5px 10px;
            font-size: 14px;
            background: #ccc;
            border-radius: 10px;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>