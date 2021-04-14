<template>
  <div class="log-box">

    <div class="log-left">

      <vue-scroll :ops="ops">
        <div class="log-box-content">
          <div class="log-box-edit-btn">
            <!-- <button class="z-btn z-btn-default" @click="$router.push('/logEdit')">创建文章</button> -->
          </div>

          <ul class="log-list">
            <li v-for="(item,index) in blogList" :key="index" @click="showDetail(item)">
              <div class="log-title">

                <h1>{{item.title}}</h1>
                <div class="blog-update">
                  <!-- <button class="z-btn z-btn-default" @click.stop="$router.push({path:'/logEdit',query:{content:item}})">编辑</button>
                  <button class="z-btn z-btn-default" @click.stop="deleteBlog(item)">删除</button> -->
                </div>
              </div>
              <div class="log-content">
                <div class="log-tag-box">
                  <span v-for="(item,index) in item.log_type.split(',')" :style="{'background':blogColorList[item]}" :key="index">{{item}}</span>
                </div>
                <div class="log-detail-info">
                  <i class="el-icon-s-custom"></i>创建者：{{item.username}}
                </div>
                <div class="log-detail-info">
                  <i class="el-icon-s-grid"></i>创建时间：{{item.time}} <span v-show="item.updateTime">&nbsp;&nbsp;&nbsp;&nbsp;修改时间：{{item.updateTime}}</span>
                </div>
                <div class="log-detail-detail">
                  {{item.introduce}}
                </div>
              </div>
            </li>
          </ul>
          <page :limit="pages.limit" :allPages="pages.allPages" @choosePage="choosePage"></page>
        </div>

        <!-- <router-view></router-view> -->

      </vue-scroll>
    </div>
    <div class="log-right">
      <div class="user-info">
        <img src="/public/user/userName.jpg">
      </div>
      <ul class="log-tag-list">
        <li v-for="(item,index) in blogColorList" :key="index" :style="{'background': item}" :class="{'log-tag-choose':chooseType.indexOf(index) > -1}" @click="chooseTag(index)">{{index}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import page from '@/components/page/page.vue';
import { apiBlog, apiBlogDelete, apiBlogSearch } from '@/api/index.js';
export default {
  components: {
    page
  },
  data () {
    return {
      blogList: [],
      blogColorList: this.$store.state.blogColorList,
      ops: {
        bar: {
          keepShow: true,
          background: '#96b97d'
        },
        rail: {
          gutterOfSide: "5px",
          keepShow: false,
        },
      },
      pages: {
        allPages: 0,
        limit: 10,
        page: 1,
      },
      chooseType: [],
    }
  },
  methods: {
    getData () {
      apiBlogSearch({ log_type: this.chooseType, page: this.pages.page, limit: this.pages.limit }).then((res) => {
        this.blogList = res.data.pages;
        this.pages.allPages = res.data.allPages;
      })

    },
    updateBlog (content) {
      this.$router.push({
        path: '/logEdit',
        params: {
          content,
        }
      })
    },
    deleteBlog (item) {
      apiBlogDelete({ id: item.blog_id, file_path: item.file_path }).then(res => {
        this.getData();
      })
    },
    showDetail (content) {
      this.$router.push({
        path: '/logDetail',
        query: {
          content,
        }
      })
    },
    chooseTag (item) {
      if (this.chooseType.length) {
        this.chooseType = [];
      }
      else {
        this.chooseType.push(item);
      }
      this.getData();
    },
    choosePage (page) {
      this.pages.page = page;
      this.getData();
    }
  },
  created () {
    this.getData();
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.log-box {
  padding: 20px;
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
  .log-left {
    width: calc(80% - 20px);
    background: #f5fffa;
    box-shadow: 0 2px 15px #ddd;
    padding: 10px 0px 0px 20px;
    overflow: auto;
    .log-box-content {
      margin-right: 20px;
      .log-list {
        li {
          cursor: pointer;
          width: 100%;
          height: 200px;
          padding: 10px;
          margin: 10px 0px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 15px #ddd;
          .log-title {
            width: 100%;
            height: 35px;
            display: flex;
            justify-content: space-between;
            .blog-update {
              display: flex;
              button {
                width: 60px;
                height: 25px;
                line-height: 25px;
                margin: 0px 10px;
              }
            }
          }
          .log-content {
            padding: 10px;
            width: 100%;
            height: 145px;
            overflow: hidden;
            .log-detail-info {
              font-size: 12px;
              color: #6c757d;
              margin: 0px 12px;
              margin-bottom: 8px;
              i {
                font-size: 14px;
                margin-right: 8px;
              }
            }
            .log-tag-box {
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
            .log-autor {
              font-size: 16px;
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
    // padding: 20px;
  }
  .log-right {
    background: #f5fffa;
    box-shadow: 0 2px 15px #ddd;
    width: 20%;
    padding: 20px;
    .log-tag-list {
      display: flex;
      flex-wrap: wrap;
      li {
        margin-bottom: 15px;
        height: 30px;
        padding: 5px 10px;
        font-size: 14px;
        background: #ccc;
        border-radius: 10px;
        margin-right: 5px;
        cursor: pointer;
      }
      .log-tag-choose {
        border: 1px solid #000;
      }
    }
    .user-info{
      display: flex;
      justify-content: center;
      margin: 80px 0px;
      img{
        width: 150px;
        height:150px;
        border-radius: 50%;
      }
    }
  }
}
</style>