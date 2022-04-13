<template>
  <div class="d1">
    <!-- 题目 -->
    <h2>{{ problem.id }}.{{ problem.title }}</h2>
    <!-- 题目相关信息栏 -->
    <div class="problemExtractInfo fontSize">
      <div class="problemExtractD1">
        <span>难度&nbsp;&nbsp;</span>
        <span>{{ problem.difficultyName }}</span>
      </div>
      <div class="problemExtractD1">
        <!-- 点赞图标：未点赞状态 -->
        <img @click="updateGoodAndBad(1)"
             src="@/assets/svg/good.svg"
             width="16"
             style="margin-top: 2px;"
             v-show="!isGood">
        <!-- 点赞图标：点赞状态 -->
        <img @click="updateGoodAndBad(0)"
             src="@/assets/svg/good-block.svg"
             width="16"
             style="margin-top: 2px;"
             v-show="isGood">
        <span style="font-size: medium;margin-left: 10px;">{{ problem.good }}</span>
      </div>
      <div class="problemExtractD1">
        <!-- 点踩图标：未点踩状态 -->
        <img @click="updateGoodAndBad(-1)"
             src="@/assets/svg/bad.svg"
             style="margin-top: 3px;"
             v-show="!isBad">
        <!-- 点踩图标：点踩状态 -->
        <img @click="updateGoodAndBad(0)"
             src="@/assets/svg/bad-block.svg"
             style="margin-top: 3px;"
             v-show="isBad">
        <div style="font-size: medium;margin: 3px 0 0 10px;float: right">{{ problem.bad }}</div>
      </div>
      <!--  收藏    -->
      <div class="problemExtractD1">
        <span>
          <i v-show="!isFavorite" class="el-icon-star-off" @click="updateFavorite"></i>
          <i v-show="isFavorite" class="el-icon-star-on" @click="updateFavorite"></i>&nbsp;&nbsp;收藏
        </span>
      </div>
      <!--  奖励    -->
      <div class="problemExtractD1">
        <i style="width: 30px;height: 30px;" class="el-icon-lollipop"></i>
        <b style="color: green ">{{ problem.point }}</b>&nbsp;&nbsp;M币奖励
      </div>
    </div>
    <br>
    <!-- 题干   -->
    <div v-show="problem.problem_stem!=null">
      <div v-html="problem.problem_stem"></div>
      <br><br><br>
    </div>
    <!--  输入输出格式  -->
    <div>
      <h4>输入格式</h4>
      {{ problem.in_format }}
      <h4>输出格式</h4>
      {{ problem.out_format }}
    </div>
    <!--  示例  -->
    <div>
      <h4>示例</h4>
      <div class="example">
        <b>输入：</b> {{ problem.in_example }}
      </div>
      <br>
      <div class="example">
        <b>输出：</b> {{ problem.out_example }}
      </div>
    </div>
    <br><br>
    <!--  提示  -->
    <div>
      <h4>提示</h4>
      {{ problem.notice }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "ProblemStem",
  data() {
    return {
      problem: {},//题目信息
      isFavorite: false,//题目是否收藏
      isGood: false,//题目是否点赞啦
      isBad: false,//题目是否点踩啦
    }
  },
  methods: {
    //修改喜欢
    updateFavorite() {
      axios({
        url: "/problems/updateFavorite",
        method: "post",
        data: qs.stringify({
          create_by: this.$store.state.sLogin.users.id,
          problem_id: this.$route.params.id,
          isFavorite: this.isFavorite,
        })
      }).then(response => {
            if (response.data) {
              this.isFavorite = !this.isFavorite;
            } else {
              if (this.isFavorite)
                messageTips(this, '啊哦，取消收藏失败', "error");
              else
                messageTips(this, '啊哦，收藏失败', "error");
            }
          },
          error => {
            console.log("updateFavorite 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //修改点赞点踩
    async updateGoodAndBad(number) {
      // 根据number值来辨别要做什么工作，
      //值为1：是点赞操作，需要添加一条点赞记录，值为0：是取消点赞或点踩操作，直接删除数据库中的点赞或点踩信息就行
      //值为-1：是点踩操作，添加一条点踩记录
      axios({
        url: "/problems/changeGoodAndBad",
        method: "post",
        data: qs.stringify({
          problem_id: this.$route.params.id,
          user_id: this.$store.state.sLogin.users.id,
          number: number,
        })
      }).then(response => {
            if (response.data) {
              if (number == 1) {
                // 实时更改下点赞或点踩的人数
                if (this.isBad)
                  this.problem.bad -= 1;
                this.problem.good += 1;
                //修改点赞点踩图标显示
                this.isGood = true;
                this.isBad = false;
              } else if (number == -1) {
                // 实时更改下点赞或点踩的人数
                if (this.isGood)
                  this.problem.good -= 1;
                this.problem.bad += 1;
                //修改点赞点踩图标显示
                this.isGood = false;
                this.isBad = true;
              } else if (number == 0) {
                // 实时更改下点赞或点踩的人数
                if (this.isGood)
                  this.problem.good -= 1;
                else this.problem.bad -= 1;
                //修改点赞点踩图标显示
                this.isGood = false;
                this.isBad = false;
              }
            } else {
              messageTips(this, '啊哦，网络走丢啦!', "warning");
            }
          },
          error => {
            console.log("searchProblemById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //拿到题目数据
    async searchProblemList() {
      axios({
        url: "/problems/searchProblemById",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              this.problem = response.data;
            } else {
              messageTips(this, '啊哦，请求题目失败', "error");
            }
          },
          error => {
            console.log("searchProblemById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //拿到是否收藏数据
    async searchIsFavorite() {
      axios({
        url: "/problems/isFavorite",
        method: "post",
        data: qs.stringify({
          problemId: this.$route.params.id,
          userId: localStorage.getItem("id"),
        })
      }).then(response => {
            this.isFavorite = response.data;
          },
          error => {
            console.log("isFavorite 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //拿到点赞和点踩的信息
    async searchIsGood() {
      axios({
        url: "/problems/isGood",
        method: "post",
        data: qs.stringify({
          problem_id: this.$route.params.id,
          user_id: localStorage.getItem("id"),
        })
      }).then(response => {
            this.isGood = response.data.isGood;
            this.isBad = response.data.isBad;
          },
          error => {
            console.log("isGood 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchProblemList();
    this.searchIsFavorite();
    this.searchIsGood();
  },
  mounted() {
    this.$store.state.fullscreenLoading = true;
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 800);
  },
  updated() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 800);
  }
}
</script>

<style scoped>
.d1 {
  height: 100%;
  width: 100%;
}

h2 {
  margin-top: 0px;
}

.example {
  width: 95%;
  background-color: rgba(211, 183, 216, 0.87);
  padding: 10px 15px;
}

hr {
  color: #d3b7d8;
}

.problemExtractInfo {
  height: 30px;
  width: 100%;
  margin-bottom: 0px;
}

.problemExtractD1 {
  float: left;
  margin-right: 30px;
}

.fontSize {
  font-size: 15px;
}
</style>