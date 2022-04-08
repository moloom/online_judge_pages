<template>
  <div v-loading.fullscreen.lock="$store.state.fullscreenLoading">
    <div style="width: 1200px; margin: 0 auto;" v-show="$store.state.isAtNav">
      <el-container class="GlobleCenter">
        <div>
          <el-header class="juzhong " style="width: 1150px;">
            <el-menu :default-active="activeIndex" class="el-menu-demo container" mode="horizontal"
            >
              <el-menu-item index="home" @click="toHome">首页</el-menu-item>
              <el-menu-item index="problems" @click="toProblemSet">题库</el-menu-item>
              <el-menu-item index="comment" @click="toCommentSet">讨论</el-menu-item>
              <el-menu-item index="submission" @click="toSubmission">提交记录</el-menu-item>
              <el-menu-item index="ranking">排行榜</el-menu-item>
              <el-menu-item
                  style="float: right;"
                  @click="toLogin"
                  v-show="!this.$store.state.sLogin.users.isLogin">
                <b>登录</b>
              </el-menu-item>
              <el-submenu
                  index="5"
                  style="float: right;"
                  v-show="this.$store.state.sLogin.users.isLogin">
                <template slot="title">{{ $store.state.sLogin.users.name }}</template>
                <el-menu-item index="5-1">积分值：{{ $store.state.sLogin.users.point }}</el-menu-item>
                <el-menu-item index="5-2">个人设置</el-menu-item>
                <el-menu-item index="5-3" @click="toSubmission">提交记录</el-menu-item>
                <el-menu-item index="5-4">个人设置</el-menu-item>
                <el-menu-item index="5-5" @click="logout">登出</el-menu-item>
              </el-submenu>
              <el-menu-item style="float: right;" index="other">
                <el-input v-model="searchText" style="width: 80%;"
                          placeholder="搜索题目..." size="small"></el-input>&nbsp;
                <!--              <i class="el-icon-search"></i>-->
                <svg t="1647660034084" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2969" width="27" @click="search">
                  <path
                      d="M934.966272 879.950848 709.541888 654.526464c47.665152-59.81696 76.166144-135.581696 76.166144-218.012672 0-193.36704-156.752896-350.124032-350.12096-350.124032S85.464064 243.145728 85.464064 436.513792s156.756992 350.124032 350.124032 350.124032c79.875072 0 153.486336-26.766336 212.39808-71.79264l226.04288 226.04288c8.416256 8.416256 19.441664 12.62592 30.470144 12.62592 11.025408 0 22.050816-4.209664 30.466048-12.62592C951.798784 924.055552 951.798784 896.782336 934.966272 879.950848zM165.953536 436.513792c0-148.912128 120.722432-269.630464 269.63456-269.630464S705.21856 287.60064 705.21856 436.513792 584.500224 706.148352 435.588096 706.148352 165.953536 585.42592 165.953536 436.513792z"
                      p-id="2970" fill="#909399"></path>
                  <path
                      d="M291.135488 302.036992c-8.997888-4.864-20.23424-1.511424-25.097216 7.486464-20.256768 37.476352-32.600064 78.152704-36.688896 120.899584-0.973824 10.181632 6.491136 19.224576 16.672768 20.1984 0.59904 0.057344 1.195008 0.084992 1.784832 0.084992 9.433088 0 17.497088-7.175168 18.413568-16.75776 3.613696-37.7856 14.5152-73.72288 32.401408-106.814464C303.485952 318.138368 300.1344 306.900992 291.135488 302.036992z"
                      p-id="2971" fill="#909399">
                  </path>
                </svg>
              </el-menu-item>
            </el-menu>
          </el-header>

        </div>
      </el-container>
    </div>
    <router-view></router-view>
    <Footer v-show="!$store.state.sLogin.isAtLogin"></Footer>
  </div>
</template>

<script>
import Footer from "@/views/Footer";

export default {
  name: "Home",
  data() {
    return {
      activeIndex: '/home',
      searchText: "",
    }
  },
  components: {Footer,},
  methods: {
    logout() {
      this.$store.state.sLogin.users.isLogin = false;
      localStorage.removeItem("name");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("point");
      localStorage.removeItem("role");
      localStorage.removeItem("picture");
      localStorage.removeItem("id");
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
    toSubmission() {
      this.$router.push({
        name: 'submission',
      })
    },
    toCommentSet() {
      this.$router.push({
        name: 'comments',
      })
    },
    toProblemSet() {
      this.$router.push({
        name: 'problems',
      })
    },
    //导航栏的搜索功能实现
    search() {
      console.log("search、search、search");
    },
    //设置当前路径所属的导航栏高亮
    updateActive() {
      let path = this.$router.currentRoute.fullPath;
      const name = this.$router.currentRoute.name;
      if (name) {
        if (path !== "/") {
          path = path.slice(1);
          let index = path.indexOf("/");
          if (index !== -1)
            path = path.slice(0, index);
          this.activeIndex = path;
          if (path === "problem")
            this.activeIndex = "problems";
        } else this.activeIndex = "home";
      }
      //防止用户直接在地址栏输入login时登录界面不能全屏显示
      if (path === 'login') {
        this.$store.state.sLogin.isAtLogin = true;
        this.$store.state.isAtNav = false;
      } else if (path.slice(0, 8) === 'problems') {
        //在刷题时，关闭底栏
        this.$store.state.sLogin.isAtLogin = true;
      } else {
        this.$store.state.sLogin.isAtLogin = false;
        this.$store.state.isAtNav = true;
      }
    },
  },
  mounted() {
    this.updateActive();//更新导航栏高亮
    //获取本地用户信息存储，防止刷新后用户信息丢失。
    if (localStorage.getItem("name") !== "")
      this.$store.state.sLogin.users.name = localStorage.getItem("name");
    if (localStorage.getItem("isLogin") !== "")
      this.$store.state.sLogin.users.isLogin = localStorage.getItem("isLogin");
    if (localStorage.getItem("point") !== "")
      this.$store.state.sLogin.users.point = localStorage.getItem("point");
    if (localStorage.getItem("role") !== "")
      this.$store.state.sLogin.users.role = localStorage.getItem("role");
    if (localStorage.getItem("picture") !== "")
      this.$store.state.sLogin.users.picture = localStorage.getItem("picture");
    if (localStorage.getItem("id") !== "")
      this.$store.state.sLogin.users.id = localStorage.getItem("id");
  },
  beforeUpdate() {
    this.updateActive();
  },
  watch: {},
}
</script>

<style scoped>
.juzhong {
  width: 100%;
  vertical-align: center;
  margin: 0 auto; /* 水平居中 */
  padding: 0;
}

.GlobleCenter {
  margin: 0 auto; /* 水平居中 */
}
</style>