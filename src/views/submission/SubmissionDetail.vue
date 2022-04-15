<template>
  <div>
    <div>
      <div style="height: 50px;"></div>
      <table class="table">
        <tr class="th">
          <td style="width: 10%;">#</td>
          <td style="width: 12%;">提交者</td>
          <td style="width: 17%;">题目</td>
          <td style="width: 6%;">语言</td>
          <td style="width: 15%;">评测结果</td>
          <td style="width: 8%;">耗时</td>
          <td style="width: 8%;">内存</td>
          <td style="width: 19%;">提交时间</td>
        </tr>

        <tr>
          <td> {{ submission.id }}</td>
          <td>{{ submission.userName }}</td>
          <td>
            <el-link :underline="false" class="a-color" @click="toSolveProblem(submission.problem_id)">
              {{ submission.problem_id }}.{{ submission.problemTitle }}
            </el-link>
          </td>
          <td>{{ submission.languageName }}</td>
          <td :class="classArr[submission.status]">{{ submission.statusName }}</td>
          <td>{{ submission.exec_time == null ? 'NaN' : submission.exec_time }} ms</td>
          <td>{{ (submission.consume_memory / 1024).toFixed(3) }} MB</td>
          <td>{{ submission.create_time |timer }}</td>
        </tr>
      </table>
    </div>
    <!--    <div class="error-info" v-show="submission.status>1">
          <div>{{ submission.error_info }}</div>
        </div>-->
    <div style="margin: 0 auto;  width: 1200px;padding-top: 30px;" v-show="submission.error_info!=null">
      <mavon-editor style="min-height: 100%;padding: 0px 25px;" class="error-info"
                    :value="submission.error_info"
                    :external-link="externalLink"
                    :toolbarsFlag="false"
                    :boxShadow="false"
                    :subfield="false"
                    :editable="false"
                    previewBackground="white"
                    defaultOpen="preview"></mavon-editor>
    </div>
    <div style="margin: 0 auto;  width: 1200px;padding-top: 30px;">
      <mavon-editor style="min-height: 100%;border:1px solid rgba(34,36,38,.15); font-size: 22px;padding-top: 20px;"
                    :value="submission.code"
                    :external-link="externalLink"
                    :toolbarsFlag="false"
                    :boxShadow="false"
                    :subfield="false"
                    :editable="false"
                    previewBackground="white"
                    defaultOpen="preview"></mavon-editor>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "SubmissionDetail",
  data() {
    return {
      submission: {},
      classArr: ["", "green", "yellow", "red", "yellow", "grey", "orange", "orange", "orange", "blue"],//评测结果的样式
      externalLink: {
        markdown_css: () => '/md/github-markdown.min.css',
        // markdown_css: false,
        hljs_js: () => '/md/highlight.min.js',
        hljs_css: (css) => '/md/' + css + '.min.css',
        hljs_lang: (lang) => '/md/' + lang + '.min.js',
        katex_css: () => '/md/katex.min.css',
        katex_js: () => '/md/katex.min.js',
      },
    }
  },
  methods: {
    //获取提交记录list
    searchSubmissionList() {
      // this.$store.state.fullscreenLoading = true;
      axios({
        url: "/submission/searchOneSubmission",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.submission = response.data;
              //让代码高亮
              this.submission.code = "```" + this.submission.languageName + "\n" + this.submission.code + "\n```";
            } else {
              messageTips(this, '啊哦，请求提交记录失败!', "warning");
            }
          },
          error => {
            console.log("searchSubmissionListByMap 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //转去题目解题界面
    toSolveProblem(id) {
      this.$store.state.sLogin.isAtLogin = true;//告诉别的组件，用户要去solution界面啦，不该出来的就不要出来啦
      this.$router.push({
        name: 'solution',
        params: {
          id: id,
        },
      })
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchSubmissionList();
  },
  mounted() {
    //延时关闭加载
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  },
  updated() {
    //延时关闭加载
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  }
}
</script>

<style scoped>
.table {
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 auto;
  width: 1200px;
  text-align: center;
  border: #bcbec2 solid 1px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

}

tr {
  height: 35px;
  font-size: 14px;
}

td {
  border: 1px solid rgba(34, 36, 38, .1);
  margin: 0;
  padding: 0;
}

.a-color {
  color: #4183C4;
}

.error-info {
  width: 1150px;
  min-height: 80px;
  margin: 30px auto 0;
  border: rgba(242, 113, 28, 0.94) solid 1px;
  color: #ef4743;
}

.th {
  background-color: rgba(211, 183, 216, 0.58);
  font-size: 15px;
}

.pagination {
  padding-top: 30px;
  margin: 0 auto;
  width: 1200px;
}

.green {
  color: #21BA45;
}

.red {
  color: #DB2828;
}

.yellow {
  color: #FBBD08;
}

.grey {
  color: #767676;
}

.orange {
  color: #F2711C;
}

.blue {
  color: rgb(33, 133, 208);
}
</style>