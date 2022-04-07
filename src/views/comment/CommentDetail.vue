<template>
  <div style="width: 1150px;margin: 0 auto; padding-top: 30px;">
    <!--     高亮     <pre v-highlightjs="mdtext2"><code></code></pre>-->
    <div>
      <el-link style="font-size: x-large;color: black;" @click="toSolveProblem(comment.problem_id)">
        <strong>{{ comment.problem_id }}.{{ comment.problemTitle }}</strong></el-link>

      <div class="comment-box">
        <!--  头像  -->
        <div class="comment-image">
          <img :src='comment.userPicture' style="width: 47px"/>
        </div>
        <!--  评论主体    -->
        <div class="comment-body">
          <div><strong>{{ comment.userName }}</strong></div>
          <div>
            <mavon-editor style="min-height: 100%;border: 0px; padding: 0px;margin: 0px;"
                          :value="comment.text"
                          :external-link="externalLink"
                          :toolbarsFlag="false"
                          :boxShadow="false"
                          :subfield="false"
                          :editable="false"
                          previewBackground="white"
                          defaultOpen="preview"></mavon-editor>
          </div>
          <div style="height: 30px;">
            <span class="comment-time">{{ comment.create_time |timer }}</span>
            <el-button type="text"
                       @click="changeReply(comment.id,comment.userName)"
                       v-show="$store.state.sLogin.users.id!=comment.user_id">回复
            </el-button>
            <el-button type="text" style="color: green;"
                       @click="deleteComment(comment.id)"
                       v-show="$store.state.sLogin.users.id==comment.user_id">删除
            </el-button>
            <!--   点赞  -->
            <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(1)" src="@/assets/svg/good.svg"
                 v-show="!goodAndBadInfo.isGood">
            <img @click="changeCommentGoodAndBad(0)" src="@/assets/svg/good-block.svg"
                 v-show="goodAndBadInfo.isGood">
            <span style="margin-left: 10px;">{{ comment.good }}</span>
          </span>
            <!--   点踩  -->
            <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(-1)" src="@/assets/svg/bad.svg"
                 v-show="!goodAndBadInfo.isBad">
            <img @click="changeCommentGoodAndBad(0)" src="@/assets/svg/bad-block.svg"
                 v-show="goodAndBadInfo.isBad">
            <span style="margin-left: 10px;">{{ comment.bad }}</span>
          </span>
          </div>
        </div>
      </div>
    </div>
    <!--编辑评论部分-->
    <div v-show="$store.state.sLogin.users.id!=comment.user_id">
      <!--评论编辑器-->
      <div style="clear: left;padding: 60px 0px 0px 0px;">
        <mavon-editor :boxShadow="false"
                      :subfield="false"
                      :external-link="externalLink"
                      style="padding-right: 50px;min-height: 380px;border: 2px solid #ebeef1;"
                      :toolbars="toolbars"
                      v-model="commentText"
                      :ishljs="true"></mavon-editor>
      </div>
      <!--  显示当前正在回复谁  -->
      <div class="comment-tip">
        <el-tooltip class="item" effect="light" content="点击这里清除 @" placement="top-start">
          <span @click="cancelReply">你当前正在回复<strong>{{ reply.name }}</strong></span>
        </el-tooltip>
      </div>
      <!--按钮-->
      <div style="float: right;margin:0px 50px 30px 0px;">
        <el-button type="primary" icon="el-icon-edit" @click="addComment">回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "CommentDetail",
  data() {
    return {
      goodAndBadInfo: {},//存放当前用户对评论的点赞点踩操作
      reply: {  //假设A回复B，这里存的就是B的信息
        comment_id: null,
        name: "...",
      },
      comment: {},
      commentText: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: false, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: false, // 上一步
        redo: false, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
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
    //取消回复
    cancelReply() {
      this.reply.comment_id = null;
      this.reply.name = "...";
    },
    //点击回复所执行的操作
    changeReply(id, name) {
      this.reply.comment_id = id;
      this.reply.name = name;
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
    //修改点赞或点赞
    changeCommentGoodAndBad(number) {
      // 根据number值来辨别要做什么工作，
      //值为1：是点赞操作，需要添加一条点赞记录，值为0：是取消点赞或点踩操作，直接删除数据库中的点赞或点踩信息就行
      //值为-1：是点踩操作，添加一条点踩记录
      axios({
        url: "/comment/changeGoodAndBad",
        method: "post",
        data: qs.stringify({
          comment_id: this.comment.id,
          id: this.comment.problem_id,//传problem_id过去，更新缓存时用
          user_id: this.$store.state.sLogin.users.id,
          number: number,
        })
      }).then(response => {
            if (response.data) {
              // 实时更改下点赞或点踩的人数和图标
              if (number > 0) {
                //防止用户在已点踩的情况，直接点赞造成点赞点踩数量不对
                if (this.goodAndBadInfo.isBad)
                  --this.comment.bad;
                this.goodAndBadInfo.isGood = true;
                this.goodAndBadInfo.isBad = false;
                ++this.comment.good;
              } else if (number == 0) {
                //取消点赞或点踩，点赞点踩数量需要减 1
                if (this.goodAndBadInfo.isGood)
                  --this.comment.good;
                else if (this.goodAndBadInfo.isBad)
                  --this.comment.bad;
                this.goodAndBadInfo.isGood = false;
                this.goodAndBadInfo.isBad = false;
              } else if (number < 0) {
                if (this.goodAndBadInfo.isGood)
                  --this.comment.good;
                this.goodAndBadInfo.isGood = false;
                this.goodAndBadInfo.isBad = true;
                ++this.comment.bad;
              }
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("changeGoodAndBad 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //提交评论
    addComment() {
      //根据当前被回复的评论的等级，计算出新增评论的数据
      let first = null;
      let second = null;
      let level = null;
      if (this.comment.level == 1) {
        level = 2;
        first = this.comment.id;
      } else if (this.comment.level == 2 || this.comment.level == 3) {
        level = 3;
        first = this.comment.first_comment_id;
        second = this.comment.id;
      }
      axios({
        url: "/comment/insertComment",
        method: "post",
        data: qs.stringify({
          user_id: this.$store.state.sLogin.users.id,
          problem_id: this.comment.problem_id,
          text: this.commentText,
          level: level,
          first_comment_id: first,
          second_comment_id: second,
        })
      }).then(response => {
            if (response.data) {
              this.commentText = "";
              messageTips(this, '^_^回复成功', "success");
            } else {
              messageTips(this, '-_-啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("insertComment 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //删除一条评论
    deleteComment(id) {
      axios({
        url: "/comment/deleteComment",
        method: "post",
        data: qs.stringify({
          id: id,
          problem_id: this.comment.problem_id,//用于删除评论缓存
        })
      }).then(response => {
            if (response.data) {
              //删除成功就转去讨论首页
              this.$router.push({
                name: 'comments',
              })
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("deleteComment 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取评论数据
    searchCommentOneById() {
      axios({
        url: "/comment/searchCommentOneById",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.comment = response.data;
              //默认回复当前这条评论
              this.changeReply(this.comment.id, this.comment.userName);
            } else {
              messageTips(this, '啊哦，请求评论失败!', "warning");
            }
          },
          error => {
            console.log("searchCommentOneById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //查询当前用户对当前评论的点赞点踩情况
    searchCommentOneGoodAndBad() {
      axios({
        url: "/comment/searchCommentOneGoodAndBad",
        method: "post",
        data: qs.stringify({
          comment_id: this.$route.params.id,
          user_id: localStorage.getItem("id"),
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.goodAndBadInfo = response.data;
            } else {
              messageTips(this, '啊哦，请求点赞信息失败!', "warning");
            }
          },
          error => {
            console.log("searchCommentOneGoodAndBad 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    //初始化点赞点踩数据
    this.searchCommentOneGoodAndBad();
    //初始化评论数据
    this.searchCommentOneById();

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
  width: 550px; /*防止头像过于小*/
  flex-grow: 18;
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
  margin-right: 20px;
  color: #a7aab2;
}

</style>