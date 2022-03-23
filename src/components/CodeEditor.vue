<template>
  <div style="padding-top: 1px;border-top: rgb(230,230,230) 1px solid;">
    <!-- 代码编辑，高亮补全 对话框内容 -->
    <div>
      <textarea ref="textarea"></textarea>

    </div>
    <div style="width: 200px;float: left;margin-left: 50px;">
      <el-select v-model="mode" @change="changeMode" style="width: 150px;" size="medium">
        <el-option v-for="mode in modes" :key="mode.value" :label="mode.label" :value="mode.value">
        </el-option>
      </el-select>
    </div>
    <div style="width: 200px;float: right;margin-left: 50px;">
      <el-button type="success" icon="el-icon-s-promotion" :loading="isLoading" @click="submitCode" style="width: 140px;">提交</el-button>
    </div>
  </div>
</template>

<script>
// 引入全局实例
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/eclipse.css'

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
      isLoading:false,//提交按钮是否在加载
      // 内部真实的内容
      code: 'public class Main { \n\tpublic static void main(String[] args) { \n\t\tSystem.out.println("Hello word!");\n \t}\n }',
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
        // 主题，对应主题库 JS 需要提前引入
        theme: 'eclipse',
        // 显示行号
        lineNumbers: true,
        line: true,
        extraKeys: {"Alt": "autocomplete"},
      },
      // 支持切换的语法高亮类型，对应 JS 已经提前引入
      // 使用的是 MIME-TYPE ，不过作为前缀的 text/ 在后面指定时写死了
      modes: [{
        value: 'x-java',
        label: 'Java'
      }, {
        value: 'x-csrc',
        label: 'C'
      },],
    };
  },
  created() {
    this.open = true;
    this.$nextTick(function () {
      this._initialize();
    });
  },
  methods: {
    submitCode(){
      this.isLoading=true;
      setTimeout(()=>{
        //axios请求
        this.isLoading=false;
      },900);
    },
    // 初始化
    _initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
      // 编辑器赋值
      this.coder.setValue(this.value || this.code)

      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue()

        if (this.$emit) {
          this.$emit('input', this.code)
        }
      })
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
    // 获取当前语法类型
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
    // 更改模式
    changeMode(val) {
      console.log("====", val);
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