<template>
  <div>
    <el-container>
      <el-header class="d1">
        <el-menu :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

          <div class="touXiang">昵称</div>
          <div class="touXiang">
            <input type="text"/>
          </div>
        </el-menu>
      </el-header>

      <el-main class="d1">Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>

  </div>
</template>

<script>
export default {
  name:"NavMenu",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
/* 宽度加水平居中，header和main用 */
.d1 {
  width: 65%;
  vertical-align: center;
  margin: 0 auto; /* 水平居中 */
}

.touXiang {
  width: 200px;
  height: 60px;
  float: right;
  background-color: aqua;
}
</style>