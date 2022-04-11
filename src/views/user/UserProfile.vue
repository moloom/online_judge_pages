<template>
  <div style="width: 1100px;margin: 60px auto 0px;">
    <div>
      <div class="info1-style">
        <h1 style="margin-top: 0px;" v-text="user.name"></h1>
        <div class="time-style" style="float: left;">性别：{{ user.sex == 0 ? '女' : '男' }}</div>
        <div class="time-style" style="float: left;" v-show="user.prefer_language">
          偏好语言：{{ user.preferLanguageName }}
        </div>
        <div class="time-style" style="clear: left;padding-top: 20px;">注册于：{{ user.create_time |timer }}</div>
        <div class="time-style" style="padding-top: 20px;" v-show="user.signature">个性签名：{{ user.signature }}</div>
        <div>
          <div style="width: 8%;float: left;">
            <div class="text-style">简单</div>
            <div class="text-style">中等</div>
            <div class="text-style">困难</div>
          </div>
          <div style="width: 40%;float: left;">
            <el-progress class="percentage-style" :percentage="percentageArray[0]"></el-progress>
            <el-progress class="percentage-style" :percentage="percentageArray[1]"
                         color="rgb(19, 206, 102)"></el-progress>
            <el-progress class="percentage-style" :percentage="percentageArray[2]" color="#e6a23c"></el-progress>
          </div>
          <div style="width: 15%;float: left;">
            <div class="text-style" style="margin-top: 17px;">
              {{ solveProblemInfo[0].solve }} /
              {{ solveProblemInfo[0].total }}
            </div>
            <div class="text-style" style="margin-top: 15px;">
              {{ solveProblemInfo[1].solve }} /
              {{ solveProblemInfo[1].total }}
            </div>
            <div class="text-style" style="margin-top: 15px;">
              {{ solveProblemInfo[2].solve }} /
              {{ solveProblemInfo[2].total }}
            </div>
          </div>
        </div>
      </div>
      <div class="info2-style">
        <img style="width: 270px;height: 270px;" :src="user.picture"/>
      </div>
    </div>
    <div style="clear: left;">
      <div style="margin-left: 0px;height: 40px;padding-top: 40px;font-size: 20px;">最近提交</div>
      <table class="table">
        <tr class="th">
          <td style="width: 10%;">#</td>
          <td style="width: 12%;">提交者</td>
          <td style="width: 17%;">题目</td>
          <td style="width: 6%;">语言</td>
          <td style="width: 15%;">评测结果</td>
          <td style="width: 19%;">提交时间</td>
        </tr>
        <tr v-for="sl in submissionList" :key="sl.id">
          <td>
            <el-link :underline="false" class="a-color" @click="toSubmissionDetail(sl.id,sl.user_id)">
              {{ sl.id }}
            </el-link>
          </td>
          <td>{{ sl.userName }}</td>
          <td>
            <el-link :underline="false" class="a-color" @click="toSolveProblem(sl.problem_id)">
              {{ sl.problem_id }}.{{ sl.problemTitle }}
            </el-link>
          </td>
          <td>{{ sl.languageName }}</td>
          <td :class="classArr[sl.status]">{{ sl.statusName }}</td>
          <td>{{ sl.create_time |timer }}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "UserProfile",
  data() {
    return {
      user: {},//用户信息
      solveProblemInfo: [],//用户对各个难度题目的解答数量
      percentageArray: [],//题目的百分比
      submissionList: [],//最近提交记录
      classArr: ["", "green", "red", "yellow", "grey", "orange", "orange"],//评测结果的样式
    };
  },
  methods: {
    //获取用户信息
    searchUser() {
      axios({
        url: "/user/searchUserById",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data)
              this.user = response.data;
            else
              messageTips(this, '啊哦，请求数据失败!', "warning");
          },
          error => {
            console.log("searchUserById 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取用户对各个难度的题目的解题数量
    searchUserSolveProblemInfoGroupByDifficulty() {
      axios({
        url: "/user/searchUserSolveProblemInfoGroupByDifficulty",
        method: "post",
        data: qs.stringify({
          user_id: localStorage.getItem("id"),
        })
      }).then(response => {
            if (response.data) {
              this.solveProblemInfo = response.data;
              for (let i = 0; i < 3; ++i) {
                let m = ((this.solveProblemInfo[i].solve / this.solveProblemInfo[i].total) * 100).toFixed(2);
                if (isNaN(m))
                  m = 0;
                if (m == 100)
                  m = 100;
                this.percentageArray.push(m);
              }
            } else
              messageTips(this, '啊哦，请求数据失败!', "warning");
          },
          error => {
            console.log("searchUserSolveProblemInfoGroupByDifficulty 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取提交记录list
    searchSubmissionList(start, user_id) {
      // this.$store.state.fullscreenLoading = true;
      axios({
        url: "/submission/searchSubmissionList",
        method: "post",
        data: qs.stringify({
          start: start,
          user_id: user_id,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.submissionList = response.data;
              //只显示10条
              if (response.data.length>10){
                this.submissionList=response.data.slice(0,10);
              }
            } else {
              messageTips(this, '啊哦，请求提交记录失败!', "warning");
            }
          },
          error => {
            console.log("searchSubmissionListByMap 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //转去题目解题界面
    toSolveProblem(id) {
      this.$store.state.sLogin.isAtLogin = true;//告诉别的组件，用户要去solution界面啦，不该出来的就不要出来啦
      this.$router.push({
        name: 'solution',
        params: {
          id: id,
        },
      })
    },
    // 转去提交详情界面
    toSubmissionDetail(id, user_id) {
      if (user_id == localStorage.getItem("id"))
        this.$router.push({
          name: 'submissionDetail',
          params: {
            id: id,
          },
        })
      else
        messageTips(this, '访问受限', "warning");
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchUser();
    this.searchUserSolveProblemInfoGroupByDifficulty();
    this.searchSubmissionList(0, localStorage.getItem("id"));
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  }
}
</script>

<style scoped>
.input-style {
  margin: 20px 0px;
}

.info1-style {
  width: 65%;
  float: left;
}

.info2-style {
  width: 35%;
  float: left;
}

.time-style {
  margin-right: 40px;
  color: #a7aab2;
}

.percentage-style {
  margin: 16px 20px 16px 0px;
}

.text-style {
  color: #606266;
  font-size: medium;
  margin: 10px 20px 10px 0px;
}

.table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 90%;
  text-align: center;
  border: #bcbec2 solid 1px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

}

tr {
  height: 35px;
  font-size: 14px;
}

td {
  border: 1px solid rgba(34, 36, 38, .1);
  margin: 0;
  padding: 0;
}

.a-color {
  color: #4183C4;
}

.th {
  background-color: rgba(211, 183, 216, 0.58);
  font-size: 15px;
}

.green {
  color: #21BA45;
}

.red {
  color: #DB2828;
}

.yellow {
  color: #FBBD08;
}

.grey {
  color: #767676;
}

.orange {
  color: #F2711C;
}
</style>