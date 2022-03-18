<template>
  <div>
    <el-container class="GlobleCenter">
      <div>
        <el-header class="juzhong " style="width: 1150px;">
          <el-menu :default-active="activeIndex" class="el-menu-demo container" mode="horizontal"
                   @select="handleSelect">
            <el-menu-item index="1" @click="toHome">首页</el-menu-item>
            <el-menu-item index="2" @click="toProblemSet">题库</el-menu-item>
            <el-menu-item index="3">讨论</el-menu-item>
            <el-menu-item index="4">比赛</el-menu-item>
            <el-menu-item
                index="6"
                style="float: right;"
                @click="toLogin"
                v-show="!this.$store.state.sLogin.isLogin">
              <b>登录</b>
            </el-menu-item>
            <el-submenu
                index="5"
                style="float: right;"
                v-show="this.$store.state.sLogin.isLogin">
              <template slot="title">昵称</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
              <el-menu-item index="5-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item style="float: right;">
              <el-input v-model="searchText" style="width: 80%;"
                        placeholder="搜索..." size="small"></el-input>&nbsp;
              <i class="el-icon-search"></i>
            </el-menu-item>
          </el-menu>
        </el-header>

        <router-view></router-view>
      </div>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      activeIndex: '1',
      searchText: "",
    }
  },
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogin() {
      this.$router.push({
        name: 'login',
      })
    },
    toHome() {
      this.$router.push({
        name: 'home',
      })
    },
    toProblemSet(){
      this.$router.push({
        name:'problems',
      })
    },
  },
}
</script>

<style scoped>
.juzhong {
  width: 100%;
  vertical-align: center;
  margin: 0 auto; /* 水平居中 */
}

.GlobleCenter {
  display: flex;
  justify-content: space-around;
}
</style>