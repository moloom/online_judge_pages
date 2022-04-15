<template>
  <div style="padding-top: 1px;border-top: rgb(230,230,230) 1px solid;">
    <!-- 代码编辑，高亮补全 对话框内容 -->
    <div>
      <textarea ref="textarea"></textarea>

    </div>
    <div style="width: 150px;float: left;margin-left: 30px;">
      <el-select v-model="mode" @change="changeMode" style="width: 150px;" size="medium">
        <el-option v-for="mode in modes" :key="mode.value" :label="mode.label" :value="mode.value">
        </el-option>
      </el-select>
    </div>
    <div style="width: 200px;float: right;margin-left: 50px;">
      <el-button type="success" icon="el-icon-s-promotion" :loading="isLoading" @click="submitCode"
                 style="width: 140px;">提交
      </el-button>
    </div>
    <div style="width: 100px;float: right;margin-left: 20px;">
      <el-button type="warning" icon="el-icon-receiving" @click="saveCode"
                 style="width: 100px;">保存
      </el-button>
    </div>
  </div>
</template>

<script>
// 引入全局实例
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
// import 'codemirror/theme/eclipse.css'

// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/clike/clike.js'

//代码补全提示
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';

import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/selection/active-line.js'//当前行高亮
//自动闭合
import 'codemirror/addon/edit/closetag.js'
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "CodeEditor",
  props: {
    // 外部传入的内容，用于实现双向绑定
    value: String,
    // 外部传入的语法类型
    language: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isLoading: false,//提交按钮是否在加载
      // 内部真实的内容
      code: "",
      // 默认的语法类型
      mode: 'Java',
      // 编辑器实例
      coder: null,
      // 默认配置
      options: {
        matchBrackets: true,
        indentUnit: 4,//缩进量
        showCursorWhenSelecting: true,//选择时是否显示光标
        cursorHeight: 0.85,
        styleActiveLine: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        // 缩进格式
        tabSize: 4,
        // 主题，对应主题库 JS 需要提前引入 ，不引入就是默认的
        // theme: 'eclipse',
        // 显示行号
        lineNumbers: true,
        line: true,
        extraKeys: {"Alt": "autocomplete"},
      },
      // 支持切换的语法高亮类型，对应 JS 已经提前引入
      // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      modes: [{
        value: 'x-csrc',
        label: 'C'
      }, {
        value: 'x-java',
        label: 'Java'
      }],
    };
  },
  created() {
    //加载codeMirror编译器
    this.open = true;
    this.$nextTick(function () {
      this._initialize();
    });
    this.getCode();
  },
  methods: {
    //提交代码
    submitCode() {
      this.isLoading = true;
      //防止空内容直接提交
      if (this.code.getValue === "")
        return;

      let language = 0;
      if (this.mode === "Java"||this.mode===this.modes[1].value)
        language = 2;
      else if (this.mode === "C"||this.mode===this.modes[0].value)
        language = 1;
      else language = 3;
      console.log(this.coder.getValue());
      //axios请求
      axios({
        url: "/problems/submitCode",
        method: "post",
        data: qs.stringify({
          user_id: this.$store.state.sLogin.users.id,
          problem_id: this.$route.params.id,
          code: this.coder.getValue(),
          language: language,
        })
      }).then(response => {
            if (response.data)
              this.$router.push({
                name: 'submissionDetail',
                params: {
                  id: response.data,
                },
              })
            else
              messageTips(this, '啊哦，代码保存失败!', "error");
          },
          error => {
            console.log("submitCode 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    //保存代码
    saveCode() {
      //防止空内容直接提交
      if (this.code.getValue === "")
        return;
      let language = 0;
      if (this.mode === "Java"||this.mode===this.modes[1].value)
        language = 2;
      else if (this.mode === "C"||this.mode===this.modes[0].value)
        language = 1;
      else language = 3;//Text文本类型
      console.log(this.coder.getValue());
      //axios请求
      axios({
        url: "/problems/saveCode",
        method: "post",
        data: qs.stringify({
          user_id: this.$store.state.sLogin.users.id,
          problem_id: this.$route.params.id,
          code: this.coder.getValue(),
          language: language,
        })
      }).then(response => {
            if (response.data)
              messageTips(this, '代码保存成功!', "success");
            else
              messageTips(this, '啊哦，代码保存失败!', "error");
          },
          error => {
            console.log("saveCode 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //初始化时，获取用户上次保存的代码
    getCode() {
      axios({
        url: "/problems/getCode",
        method: "post",
        data: qs.stringify({
          user_id: localStorage.getItem("id"),//这里必须用本地存储，因为这时，store里还没有id值
          problem_id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data != null) {
              //更新代码
              if (response.data.code == null)
                this.code = "";
              else
                this.code = response.data.code;
              this.coder.setValue(this.code);
              //更新语言
              if (response.data.language != null) {
                this.mode = this.modes[response.data.language - 1].label;
                this.changeMode(this.modes[response.data.language - 1].value);
              }
            } else messageTips(this, '拉取代码失败', "error");
          },
          error => {
            console.log("getCode 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          }
      )
    },
    // 初始化
    _getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        let currentLanguage = language.toLowerCase()
        let currentLabel = mode.label.toLowerCase()
        let currentValue = mode.value.toLowerCase()

        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return currentLabel === currentLanguage || currentValue === currentLanguage
      })
    },
    // 获取当前语法类型
    _initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
      // 编辑器赋值
      // this.coder.setValue( this.code)
      // 支持双向绑定
      // this.coder.on('change', (coder) => {
      //   this.code = coder.getValue();
      //   if (this.$emit) {
      //     this.$emit('input', this.code)
      //   }
      // })
      this.changeMode("x-java");
      // 尝试从父容器获取语法类型
      /*if (this.language) {
        // 获取具体的语法类型对象
        let modeObj = this._getLanguage(this.language)

        // 判断父容器传入的语法是否被支持
        if (modeObj) {
          this.mode = modeObj.label
        }
      }*/
    },
    // 更改模式
    changeMode(val) {
      // 修改编辑器的语法配置
      this.coder.setOption('mode', `text/${val}`)

      // 获取修改后的语法
      let label = this._getLanguage(val).label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    },
  }
};
</script>

<style>

.CodeMirror {
  font-size: 15px;
  width: 100%;
  height: 820px;
}

/*代码字体大小*/
.CodeMirror-code {
  font-size: 15px;
}

.code-mode-select {
  width: 30px;
}

.CodeMirror-gutters {
  background-color: white;
}
</style>