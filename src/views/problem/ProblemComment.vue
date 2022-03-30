<template>
  <div>


    <!-- 评论   -->
    <div style="border: #3a8ee6 solid 1px;height: 300px;width: 80%;margin-top: 60px;">
      <!--  头像  -->
      <div class="comment-image">
        <el-image size="large"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-image>
      </div>
      <!--  评论主体  -->
      <div class="comment-body">
        <div style="padding-bottom: 10px;"><strong>评论人昵称</strong></div>
        <div>
          <pre v-highlightjs="mdtext2"><code></code></pre>
        </div>
        <div>
          <button>回复</button>
          点赞，0，，点踩 ，0
        </div>
        <div>2022-03-31 04:00:50</div>
      </div>
    </div>

    <!--评论编辑器-->
    <div style="clear: left;padding: 100px 0;">
      <mavon-editor :boxShadow="false"
                    style="padding-right: 50px;height: 450px;z-index：1;"
                    :subfield="false"
                    v-model="commentText"
                    ishljs="false"></mavon-editor>
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
// import 'github-markdown-css'
// # 在使用内容显示的标签加上class="markdown-body"
export default {
  name: "ProblemComment",
  data() {
    return {
      mdtext: "",
      commentText: "",
      mdtext2: "```java\npublic class Main {\n" +
          "\tpublic static void main(String[] args) {\n" +
          "\t\tSystem.out.println(\"Hello word!\");\n" +
          " \t}\n" +
          " }```",
      code: '```javascript\nfunction(){\n\tconsole.log(123)\n}\n```',
    };
  },
  methods: {},
  mounted() {
    marked.setOptions({
      // highlight: (code) => VueHighlightJS.highlightAuto(code).value
    })
    // this.mdText();
  }
}
</script>

<style>
.comment-image {
  margin: 0 auto;
  padding: 0 5px;
  float: left;
  border: #606266 solid 1px;
  height: 100%;
  width: 50px;
}

.comment-body {
  float: left;
  padding-left: 10px;
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
  color: #22863a
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