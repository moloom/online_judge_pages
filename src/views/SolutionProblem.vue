<template>
  <div :style="conheight">
    <div class="solution-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="题面" name="first">
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理{{$route.params.id}}</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>

        <router-view></router-view>
      </el-tabs>
    </div>
    <div class="solution-left">2</div>
  </div>
</template>

<script>
export default {
  name: "SolutionProblem",
  data() {
    return {
      conheight: {//自适应高度
        height: '',
      },
      activeName: 'first',
    }
  },
  methods: {
    getHeight() {//自适应高度
      this.conheight.height = window.innerHeight - 0 + 'px';
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.$router.push({
        name: 'solution',
        params: {
          id: this.$route.params.id,
          statistics:"statistics",
        },
      })
    },

  },
  created() {
    //自适应高度
    window.addEventListener('resize', this.getHeight);
    this.getHeight()
  }
}
</script>

<style scoped>
.solution-left {
  width: 50%;
  height: 100%;
  float: left;
}

</style>