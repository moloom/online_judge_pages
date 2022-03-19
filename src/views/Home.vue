<template>
  <div>
    <div style="width: 1200px; margin: 0 auto;">
      <el-container class="GlobleCenter">
        <div>
          <el-header class="juzhong " style="width: 1150px;">
            <el-menu :default-active="activeIndex" class="el-menu-demo container" mode="horizontal"
                     @select="handleSelect">
              <el-menu-item index="home" @click="toHome">首页</el-menu-item>
              <el-menu-item index="problems" @click="toProblemSet">题库</el-menu-item>
              <el-menu-item index="3">讨论</el-menu-item>
              <el-menu-item index="problems">比赛</el-menu-item>
              <el-menu-item
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
    <Footer></Footer>
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
    toProblemSet() {
      this.$router.push({
        name: 'problems',
      })
    },
    search() {
      console.log("search、search、search");
    },
    updateActive() {
      //设置当前路径所属的导航栏高亮
      let path = this.$router.currentRoute.fullPath;
      const name = this.$router.currentRoute.name;
      if (name) {
        if (path !== "/") {
          path = path.slice(1);
          console.log("1", path);
          let index = path.indexOf("/");
          if (index !== -1)
            path = path.slice(0, index);
          console.log("2", path);
          this.activeIndex = path;
        } else this.activeIndex = "home";
      }
    },
  },
  mounted() {
    this.updateActive();
  },
  beforeUpdate() {
    this.updateActive();
  },
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