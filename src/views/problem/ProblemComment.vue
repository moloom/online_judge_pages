<template>
  <div>
    <!--     高亮     <pre v-highlightjs="mdtext2"><code></code></pre>-->

    <!-- 一级评论 -->
    <div>
      <div class="comment-box" v-for="(cm,index) in commentList" :key="cm.id">
        <!--  头像  -->
        <div class="comment-image">
          <el-image size="large"
                    :src="cm.userPicture"></el-image>
        </div>
        <!--  评论主体    -->
        <div class="comment-body">
          <div><strong>{{ cm.userName }}</strong></div>
          <div>
            <mavon-editor style="min-height: 100%;border: 0px; padding: 0px;margin: 0px;"
                          :value="cm.text"
                          :external-link="externalLink"
                          :toolbarsFlag="false"
                          :boxShadow="false"
                          :subfield="false"
                          :editable="false"
                          previewBackground="white"
                          defaultOpen="preview"></mavon-editor>
          </div>
          <div style="height: 30px;">
            <span class="comment-time">{{ cm.create_time |timer }}</span>
            <el-button type="text"
                       @click="changeReply(2,cm.id,null,cm.userName)"
                       v-show="$store.state.sLogin.users.id!=cm.user_id">回复
            </el-button>
            <el-button type="text" style="color: green;"
                       @click="deleteComment(cm.id)"
                       v-show="$store.state.sLogin.users.id==cm.user_id">删除
            </el-button>
            <!--   点赞  -->
            <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(cm.id,1,index,null)" src="@/assets/svg/good.svg"
                 v-show="!goodAndBadInfo[cm.id][0]">
            <img @click="changeCommentGoodAndBad(cm.id,0,index,null)" src="@/assets/svg/good-block.svg"
                 v-show="goodAndBadInfo[cm.id][0]">
            <span style="margin-left: 10px;">{{ cm.good }}</span>
          </span>
            <!--   点踩  -->
            <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(cm.id,-1,index,null)" src="@/assets/svg/bad.svg"
                 v-show="!goodAndBadInfo[cm.id][1]">
            <img @click="changeCommentGoodAndBad(cm.id,0,index,null)" src="@/assets/svg/bad-block.svg"
                 v-show="goodAndBadInfo[cm.id][1]">
            <span style="margin-left: 10px;">{{ cm.bad }}</span>
          </span>
          </div>
          <!--   二级评论     -->
          <div class="comment-box" style="margin-top: 20px;" v-for="(cm2,index2) in cm.commentChildList" :key="cm2.id">
            <!--  头像  -->
            <div class="comment-image">
              <el-image size="large"
                        :src="cm2.userPicture"></el-image>
            </div>
            <!--  评论主体    -->
            <div class="comment-body">
              <!--  标题行    -->
              <div>
                <strong>{{ cm2.userName }}</strong>
                <span>&nbsp;&nbsp;&nbsp;回复&nbsp;&nbsp;</span>
                <el-link type="success" href="/#/problems/1/comment">@ {{ cm2.userNameOfComment }}</el-link>
              </div>
              <!--  md显示    -->
              <div>
                <mavon-editor style="min-height: 100%;border: 0px; padding: 0px;margin: 0px;"
                              :value="cm2.text"
                              :external-link="externalLink"
                              :toolbarsFlag="false"
                              :boxShadow="false"
                              :subfield="false"
                              :editable="false"
                              previewBackground="white"
                              defaultOpen="preview"></mavon-editor>
              </div>
              <!--  回复的相关信息    -->
              <div style="height: 30px;">
                <span class="comment-time">{{ cm2.create_time |timer }}</span>
                <el-button type="text"
                           @click="changeReply(3,cm.id,cm2.id,cm2.userName)"
                           v-show="$store.state.sLogin.users.id!=cm2.user_id">回复
                </el-button>
                <el-button type="text" style="color: green;"
                           @click="deleteComment(cm2.id)"
                           v-show="$store.state.sLogin.users.id==cm2.user_id">删除
                </el-button>
                <!--   点赞  -->
                <span style="margin-left: 30px;">
                <img @click="changeCommentGoodAndBad(cm2.id,1,index,index2)"
                     src="@/assets/svg/good.svg"
                     v-show="!goodAndBadInfo[cm2.id][0]">
                <img @click="changeCommentGoodAndBad(cm2.id,0,index,index2)"
                     src="@/assets/svg/good-block.svg"
                     v-show="goodAndBadInfo[cm2.id][0]">
                <span style="margin-left: 10px;">{{ cm2.good }}</span>
              </span>
                <!--   点踩  -->
                <span style="margin-left: 30px;">
                <img @click="changeCommentGoodAndBad(cm2.id,0,index,index2)"
                     src="@/assets/svg/bad.svg"
                     v-show="!goodAndBadInfo[cm2.id][1]">
                <img @click="changeCommentGoodAndBad(cm2.id,-1,index,index2)"
                     src="@/assets/svg/bad-block.svg"
                     v-show="goodAndBadInfo[cm2.id][1]">
                <span style="margin-left: 10px;">{{ cm2.bad }}</span>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <el-button type="primary" icon="el-icon-edit" @click="addComment">发表</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "ProblemComment",
  data() {
    return {
      goodAndBadInfo: {},//存放当前用户对评论的点赞点踩操作
      reply: {  //假设A回复B，这里存的就是B的信息
        first_comment_id: null,
        second_comment_id: null,
        level: 1,
        name: "...",
      },
      commentList: [],
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
      this.first_comment_id = null;
      this.second_comment_id = null;
      this.reply.name = "...";
      this.reply.level = 1;
    },
    //点击回复所执行的操作
    changeReply(level, id1, id2, name) {
      this.reply.level = level;
      this.reply.first_comment_id = id1;
      this.reply.second_comment_id = id2;
      this.reply.name = name;
    },
    //修改点赞或点赞
    changeCommentGoodAndBad(id, number, i1, i2) {
      // 根据number值来辨别要做什么工作，
      //值为1：是点赞操作，需要添加一条点赞记录，值为0：是取消点赞或点踩操作，直接删除数据库中的点赞或点踩信息就行
      //值为-1：是点踩操作，添加一条点踩记录
      axios({
        url: "/comment/changeGoodAndBad",
        method: "post",
        data: qs.stringify({
          comment_id: id,
          id: this.$route.params.id,//传problem_id过去，更新缓存时用
          user_id: this.$store.state.sLogin.users.id,
          number: number,
        })
      }).then(response => {
            if (response.data) {
              // 实时更改下点赞或点踩的人数和图标
              if (number == 0) {
                // 如果是取消点赞，则点赞人数--
                if (this.goodAndBadInfo[id][0]) {
                  if (i2 == null)
                    this.commentList[i1].good -= 1;
                  else
                    this.commentList[i1].commentChildList[i2].good -= 1;
                } else {
                  //如果是取消点踩，点踩人数--
                  if (i2 == null)
                    this.commentList[i1].bad -= 1;
                  else
                    this.commentList[i1].commentChildList[i2].bad -= 1;
                }
                this.goodAndBadInfo[id][0] = false;
                this.goodAndBadInfo[id][1] = false;
              } else if (number == 1) {
                // 如果是点赞，则点赞人数++，
                if (this.goodAndBadInfo[id][1]) {
                  //用户在已经点踩的状态再点赞时需要减少点踩的数量
                  if (i2 == null)
                    this.commentList[i1].bad -= 1;
                  else
                    this.commentList[i1].commentChildList[i2].bad -= 1;
                }
                if (i2 == null)
                  this.commentList[i1].good += 1;
                else
                  this.commentList[i1].commentChildList[i2].good += 1;
                this.goodAndBadInfo[id][0] = true;
                this.goodAndBadInfo[id][1] = false;
              } else if (number == -1) {
                //如果是点踩，点踩人数++
                if (this.goodAndBadInfo[id][0]) {
                  //用户在已经点踩的状态再点赞时需要减少点踩的数量
                  if (i2 == null)
                    this.commentList[i1].good -= 1;
                  else
                    this.commentList[i1].commentChildList[i2].good -= 1;
                }
                if (i2 == null)
                  this.commentList[i1].bad += 1;
                else
                  this.commentList[i1].commentChildList[i2].bad += 1;
                this.goodAndBadInfo[id][0] = false;
                this.goodAndBadInfo[id][1] = true;
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
    //删除一条评论
    deleteComment(id) {
      axios({
        url: "/comment/deleteComment",
        method: "post",
        data: qs.stringify({
          id: id,
          problem_id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              this.searchCommentListByProblemId();
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("deleteComment 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //添加回复
    addComment() {
      //排除用户不输入评论，直接点发表的问题
      if (this.commentText===""){
        messageTips(this, '请输入内容！', "warning");
        return ;
      }
      axios({
        url: "/comment/insertComment",
        method: "post",
        data: qs.stringify({
          user_id: this.$store.state.sLogin.users.id,
          problem_id: this.$route.params.id,
          text: this.commentText,
          level: this.reply.level,
          first_comment_id: this.reply.first_comment_id,
          second_comment_id: this.reply.second_comment_id,
        })
      }).then(response => {
            if (response.data) {
              this.searchCommentListByProblemId();
              this.searchGoodAndBadInfo();
              this.commentText = "";
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("insertComment 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取评论数据
    searchCommentListByProblemId() {
      this.$store.state.fullscreenLoading = true;
      axios({
        url: "/comment/searchCommentListByProblemId",
        method: "post",
        data: qs.stringify({
          problem_id: this.$route.params.id,
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
            console.log("searchCommentListByProblemId 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
      setTimeout(() => {
        this.$store.state.fullscreenLoading = false;
      }, 1300);
    },
    //查询当前用户对当前题目中的评论的点赞点踩情况
    searchGoodAndBadInfo() {
      axios({
        url: "/comment/searchGoodAndBadInfo",
        method: "post",
        data: qs.stringify({
          problem_id: this.$route.params.id,
          user_id: localStorage.getItem("id"),
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.goodAndBadInfo = response.data;
            } else {
              messageTips(this, '啊哦，请求点赞失败!', "warning");
            }
          },
          error => {
            console.log("searchGoodAndBadInfo 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
  },
  mounted() {
    //初始化点赞点踩数据
    this.searchGoodAndBadInfo();
    //初始化评论数据
    this.searchCommentListByProblemId();
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