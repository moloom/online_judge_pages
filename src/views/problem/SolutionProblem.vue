<!--解题界面-->
<template>
  <div :style="conheight">
    <div class="solution-left" style="border-right:rgb(230,230,230) solid 1px;border-top: rgb(230,230,230) 1px solid;">
      <el-tabs v-model="routeName[index]" @tab-click="handleClick" style="margin-left: 25px;margin-right: 20px;">
        <el-tab-pane label="题面" name="solution"></el-tab-pane>
        <el-tab-pane label="讨论" name="comment"></el-tab-pane>
        <el-tab-pane label="统计数据" name="statistics"></el-tab-pane>
        <el-tab-pane label="提交记录" name="problemSubmission"></el-tab-pane>
        <router-view></router-view>
      </el-tabs>
    </div>
    <div class="solution-left">
      <CodeEditor></CodeEditor>
    </div>
  </div>
</template>

<script>
import CodeEditor from "@/components/CodeEditor";

export default {
  name: "SolutionProblem",
  components: {
    CodeEditor,
  },
  data() {
    return {
      conheight: {//自适应高度
        height: '',
      },
      index: 0,
      routeName: ["solution", "comment", "statistics", "problemSubmission"],
    }
  },
  methods: {
    getHeight() {//自适应高度
      this.conheight.height = window.innerHeight - 110 + 'px';
    },
    handleClick(tab, event) {
      console.log(tab.index);
      // console.log(event);
      // this.index = tab.index;
      this.$router.push({
        name: this.routeName[tab.index],
        params: {
          id: this.$route.params.id,
        },
      })
    },
    updateActive() {
      //在刷新时，正常高亮当前模块所属的二级导航栏
      let path = this.$router.currentRoute.fullPath;
      path = path.substring(12);
      console.log("solutionProblem.vue---", path);
      for (let m = 0; m < this.routeName.length; m++) {
        if (this.routeName[m] == path) {
          this.index = m;
        }
      }
    },

  },
  computed: {},
  created() {
    //自适应高度
    window.addEventListener('resize', this.getHeight);
    this.getHeight();
    this.updateActive();
  },
  beforeUpdate() {
  },
}
</script>

<style scoped>
.solution-left {
  width: 49%;
  height: 100%;
  float: left;
}

</style>