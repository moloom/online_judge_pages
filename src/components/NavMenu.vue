<template>
  <div>
    <el-container ref="homePage">
      <el-header class="juzhong " style="width: 1150px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo container" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">题库</el-menu-item>
          <el-menu-item index="3">讨论</el-menu-item>
          <el-menu-item index="4">比赛</el-menu-item>
          <el-submenu index="5" style="float: right;">
            <template slot="title">昵称</template>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
            <el-menu-item index="5-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="6" style="float: right;">
            <el-input v-model="searchText" style="width: 80%;"
                      placeholder="搜索..." size="small"></el-input>&nbsp;
            <i class="el-icon-search"></i>
          </el-menu-item>
        </el-menu>
      </el-header>
      <div style="height: 30px;"></div>
      <el-main class="juzhong">
        <div style="width: 1100px;margin: 0 auto;">  <!--这里控制列表的宽-->
          <div style="width: 60%;float: left;">
            <CommentList></CommentList>
          </div>
        </div>
        <!-- 排行榜 -->
        <div class="paihangbang" >sss</div>
        <div style="width:1000px;height: 400px;">Footer</div>
      </el-main>

    </el-container>

  </div>
</template>

<script>
import CommentList from "@/views/CommentList";

export default {
  name: "NavMenu",
  components: {
    CommentList,
  },
  data() {
    return {
      activeIndex: '1',
      searchText: "",
      clientHeight: '',
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeFixed(clientHeight) { //动态修改样式
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight - 20 + 'px';
    },
  }
}
</script>

<style scoped>
/* 宽度加水平居中，header和main用 */
.juzhong {
  width: 100%;
  vertical-align: center;
  margin: 0 auto; /* 水平居中 */
}

.paihangbang{
  width: 30%;height: 100px;float: left;
}

.separator {
  height: 30px;
}

</style>