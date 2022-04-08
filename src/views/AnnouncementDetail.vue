<template>
  <div style="width: 1200px;margin: 0 auto;">
    <div>
      <h2>{{ announcement.title }}</h2>
      <div>
        <el-link style="margin: 0px 30px 6px 6px;font-size: 21px;color: #3a8ee6">{{ announcement.userName }}</el-link>
        <span>{{ announcement.create_time|timer }}</span>
      </div>
      <!--评论编辑器-->
      <div style="clear: left;padding: 10px 0px 0px 0px;">
        <div>
          <mavon-editor style="min-height: 100%;width:90%;border: 1px #8e9aaf solid; padding: 0px;margin: 0px;"
                        :value="announcement.text"
                        :external-link="externalLink"
                        :toolbarsFlag="false"
                        :boxShadow="false"
                        :subfield="false"
                        :editable="false"
                        previewBackground="white"
                        defaultOpen="preview"></mavon-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {messageTips} from "@/utils/messageTip";
import qs from "qs";

export default {
  name: "AnnouncementDetail",
  data() {
    return {
      announcement: {},
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
    //查询公告信息
    searchAnnouncementOne() {
      axios({
        url: "/rank/searchAnnouncementOne",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              this.announcement = response.data;
            } else
              messageTips(this, '啊哦，请求公告失败!', "warning");
          },
          error => {
            console.log("searchAnnouncementOne 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    }
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchAnnouncementOne();
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
  },
}
</script>

<style scoped>

</style>