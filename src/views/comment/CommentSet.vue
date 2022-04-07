<template>
  <div>

    <div style="width: 1200px;margin: 0 auto; padding-top: 30px;">
      <el-switch
          v-model="isMyComment"
          @change="changeIsMyComment"
          active-color="#409eff"
          active-text="我的讨论"
          inactive-text="全部讨论">
      </el-switch>
      <div class="comment-box" v-for="c in commentList" :key="c.id">
        <!--  头像  -->
        <div class="comment-image">
          <el-image size="large"
                    :src="c.userPicture"></el-image>
        </div>
        <!--  评论主体    -->
        <div class="comment-body">
          <span><strong>{{ c.userName }}</strong></span>
          <el-link style="padding-left: 20px;color: #3a8ee6;padding-bottom: 4px;" @click="toSolveProblem(c.problem_id)">
            题目：{{ c.problemTitle }}
          </el-link>
          <div>
            <mavon-editor style="min-height: 100%;border: 0px; padding: 0px;margin: 0px;"
                          :value="c.text"
                          :external-link="externalLink"
                          :toolbarsFlag="false"
                          :boxShadow="false"
                          :subfield="false"
                          :editable="false"
                          previewBackground="white"
                          defaultOpen="preview"></mavon-editor>
          </div>
          <span class="comment-time">{{ c.create_time | timer }}</span>
          <el-link style="padding-left: 10px;color: #21BA45;padding-bottom: 4px;" @click="toCommentDetail(c.id)">查看全文
          </el-link>
        </div>
      </div>
      <!--  分页  -->
      <div class="pagination">
        <el-pagination @current-change="changePage"
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "CommentSet",
  data() {
    return {
      isMyComment: false,
      commentList: [],
      totalCount: 0,
      currentPage: 1,
      externalLink: {
        markdown_css: () => '/md/github-markdown.min.css',
        // markdown_css: false,
        hljs_js: () => '/md/highlight.min.js',
        hljs_css: (css) => '/md/' + css + '.min.css',
        hljs_lang: (lang) => '/md/' + lang + '.min.js',
        katex_css: () => '/md/katex.min.css',
        katex_js: () => '/md/katex.min.js',
      },
    };
  },
  methods: {
    //获取最近的评论
    searchCommentListRecently(user_id, start) {
      axios({
        url: "/comment/searchCommentListRecently",
        method: "post",
        data: qs.stringify({
          user_id: user_id,
          start: start,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.commentList = response.data;
            } else {
              messageTips(this, '啊哦，请求评论失败!', "warning");
            }
          },
          error => {
            console.log("searchCommentListRecently 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取评论的数量
    searchCommentCountRecently(user_id) {
      axios({
        url: "/comment/searchCommentCountRecently",
        method: "post",
        data: qs.stringify({
          user_id: user_id,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.totalCount = response.data;
            } else {
              messageTips(this, '啊哦，请求评论数量失败!', "warning");
            }
          },
          error => {
            console.log("searchCommentCountRecently 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //开关状态切换
    changeIsMyComment(flag) {
      this.$store.state.fullscreenLoading = true;
      let id = null;
      if (flag) {
        id = localStorage.getItem("id");
      }
      this.searchCommentListRecently(id, 0);
      this.searchCommentCountRecently(id);
    },
    //翻页
    changePage(pageNumber) {
      this.$store.state.fullscreenLoading = true;
      console.log("change", pageNumber);
      let start = (pageNumber - 1) * 10;
      let user_id = null;
      if (this.isMyComment)
        user_id = localStorage.getItem("id");
      this.searchCommentListRecently(user_id, start);
    },
    //转去题目解题界面
    toSolveProblem(id) {
      this.$store.state.sLogin.isAtLogin = true;//告诉别的组件，用户要去solution界面啦，footer就不要出来啦
      this.$router.push({
        name: 'solution',
        params: {
          id: id,
        },
      })
    },
    //转去评论详情界面
    toCommentDetail(id) {
      this.$router.push({
        name: 'commentDetail',
        params: {
          id: id,
        },
      });
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    //初始化点赞点踩数据
    // this.searchGoodAndBadInfo();
    //初始化评论数据
    // this.searchCommentListByProblemId();
    this.searchCommentListRecently(null, 0);
    this.searchCommentCountRecently(null);
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000)
  },
  updated() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 700)
  }
}
</script>

<style>
.comment-box {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  width: 85%;
}

.comment-image {
  margin: 0 auto;
  padding: 0 5px;
  /*float: left;*/
  width: 47px;
}

/*.hljs,
.markdown-body pre code {
  background: transparent !important;
}*/

.comment-body {
  /*float: left;*/
  padding-left: 10px;
  width: 450px; /*防止头像过于小*/
  flex-grow: 18;
}

.pagination {
  padding-top: 30px;
}

.comment-tip {
  height: 30px;
  width: 100%;
  font-family: "Hiragino Sans GB";
  margin-left: 50px;
  color: #606266;
  font-size: 14px;
  line-height: 37px;
}

.comment-time {
  margin-right: 10px;
  color: #a7aab2;
}

</style>