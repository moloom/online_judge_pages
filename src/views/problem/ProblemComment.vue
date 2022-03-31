<template>
  <div>
    <!--     高亮     <pre v-highlightjs="mdtext2"><code></code></pre>-->

    <!-- 评论   -->
    <div class="comment-box">
      <!--  头像  -->
      <div class="comment-image">
        <el-image size="large"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-image>
      </div>
      <!--  评论主体  -->
      <div class="comment-body">
        <div style="padding-bottom: 10px;"><strong>你大爷</strong></div>
        <div>
          <mavon-editor style="min-height: 100%;border: 0px; padding: 0px;margin: 0px;"
                        :value="commentText"
                        :external-link="externalLink"
                        :toolbarsFlag="false"
                        :boxShadow="false"
                        :subfield="false"
                        :editable="false"
                        previewBackground="white"
                        defaultOpen="preview"></mavon-editor>
        </div>
        <div>
          <el-button type="text">回复</el-button>
          <!--   点赞  -->
          <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(1)" src="@/assets/svg/good.svg" v-show="!isGood">
            <img @click="changeCommentGoodAndBad(0)" src="@/assets/svg/good-block.svg" v-show="isGood">
            <span style="margin-left: 10px;">0</span>
          </span>
          <!--   点踩  -->
          <span style="margin-left: 30px;">
            <img @click="changeCommentGoodAndBad(0)" src="@/assets/svg/bad.svg" v-show="!isBad">
            <img @click="changeCommentGoodAndBad(-1)" src="@/assets/svg/bad-block.svg" v-show="isBad">
            <span style="margin-left: 10px;">0</span>
          </span>
        </div>
        <div>2022-03-31 04:00:50</div>
      </div>
    </div>

    <!--评论编辑器-->
    <div style="clear: left;padding: 100px 0;">
      <mavon-editor :boxShadow="false"
                    :subfield="true"
                    :external-link="externalLink"
                    style="padding-right: 50px;min-height: 500px;"
                    :toolbars="toolbars"
                    v-model="commentText"
                    :ishljs="true"></mavon-editor>
    </div>

    <!--按钮-->
    <div style="float: right;margin:0px 50px 80px 0px;">
      <el-button type="primary" icon="el-icon-edit">回复</el-button>
    </div>
    <!-- 也可以直接写内容在标签中 -->
    <!--    <pre v-highlightjs><code class="javascript">const s = new Date().toString()</code></pre>-->
  </div>
</template>

<script>
import {marked} from "marked";
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";
// import 'github-markdown-css'
// # 在使用内容显示的标签加上class="markdown-body"
export default {
  name: "ProblemComment",
  data() {
    return {
      isGood: false,
      isBad: false,
      commentList: [{}],
      commentText: "```java\npublic class Main {\n" +
          "\tpublic static void main(String[] args) {\n" +
          "\t\tSystem.out.println(\"Hello word!\");\n" +
          " \t}\n" +
          " }\n```",
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
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
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
    changeCommentGoodAndBad(number) {
      // 根据number值来辨别要做什么工作，
      //值为1：是点赞操作，需要添加一条点赞记录，值为0：是取消点赞或点踩操作，直接删除数据库中的点赞或点踩信息就行
      //值为-1：是点踩操作，添加一条点踩记录
      axios({
        url: "/comment/changeGoodAndBad",
        method: "post",
        data: qs.stringify({
          comment_id: 0,
          user_id: this.$store.state.sLogin.users.id,
          number: number,
        })
      }).then(response => {
            /*if (response.data) {
              if (number == 1) {
                // 实时更改下点赞或点踩的人数
                if (this.isBad)
                  this.problem.bad -= 1;
                this.problem.good += 1;
                //修改点赞点踩图标显示
                this.isGood = true;
                this.isBad = false;
              } else if (number == -1) {
                // 实时更改下点赞或点踩的人数
                if (this.isGood)
                  this.problem.good -= 1;
                this.problem.bad += 1;
                //修改点赞点踩图标显示
                this.isGood = false;
                this.isBad = true;
              } else if (number == 0) {
                // 实时更改下点赞或点踩的人数
                if (this.isGood)
                  this.problem.good -= 1;
                else this.problem.bad -= 1;
                //修改点赞点踩图标显示
                this.isGood = false;
                this.isBad = false;
              }
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }*/
          },
          error => {
            console.log("searchProblemById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },

  },
  mounted() {
    marked.setOptions({
      // highlight: (code) => VueHighlightJS.highlightAuto(code).value
    })
    // this.mdText();
  }
}
</script>

<style>
.comment-box {
  margin-top: 60px;
  display: flex;
  flex-direction: row;
}

.comment-image {
  margin: 0 auto;
  padding: 0 5px;
  /*float: left;*/
  width: 25px;
  flex-grow: 1;
}

/*.hljs,
.markdown-body pre code {
  background: transparent !important;
}*/

.comment-body {
  /*float: left;*/
  padding-left: 10px;
  flex-grow: 18;
}

/*!
  Theme: GitHub
  Description: Light theme as seen on github.com
  Author: github.com
  Maintainer: @Hirse
  Updated: 2021-05-15

  Outdated base version: https://github.com/primer/github-syntax-light
  Current colors taken from GitHub's CSS
*/
pre code.hljs {
  display: block;
  overflow-x: auto;
  padding: 1em
}

code.hljs {
  padding: 3px 5px
}

.hljs {
  color: #24292e;
  background: #fff
}

.hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_ {
  color: #d73a49
}

.hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_ {
  color: #6f42c1
}

.hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-variable {
  color: #005cc5
}

.hljs-meta .hljs-string, .hljs-regexp, .hljs-string {
  color: #660e7a;
  /*color: green;*/
}

.hljs-built_in, .hljs-symbol {
  color: #e36209
}

.hljs-code, .hljs-comment, .hljs-formula {
  color: #6a737d
}

.hljs-name, .hljs-quote, .hljs-selector-pseudo, .hljs-selector-tag {
  color: #22863a;
}

.hljs-subst {
  color: #24292e
}

.hljs-section {
  color: #005cc5;
  font-weight: 700
}

.hljs-bullet {
  color: #735c0f
}

.hljs-emphasis {
  color: #24292e;
  font-style: italic
}

.hljs-strong {
  color: #24292e;
  font-weight: 700
}

.hljs-addition {
  color: #22863a;
  background-color: #f0fff4
}

.hljs-deletion {
  color: #b31d28;
  background-color: #ffeef0
}
</style>