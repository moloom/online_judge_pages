<template>
  <div>
    <div style="height: 50px;"></div>
    <table class="table">
      <tr class="th">
        <td style="width: 10%;">#</td>
        <td style="width: 12%;">提交者</td>
        <td style="width: 17%;">题目</td>
        <td style="width: 6%;">语言</td>
        <td style="width: 15%;">评测结果</td>
        <td style="width: 6%;">耗时</td>
        <td style="width: 6%;">内存</td>
        <td style="width: 19%;">提交时间</td>
      </tr>

      <tr v-for="(sl,index) in submissionList" :key="sl.id">
        <td>
          <el-link :underline="false" class="a-color" @click="toSubmissionDetail(sl.id,sl.user_id)">{{
              sl.id
            }}
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
        <td>{{ sl.exec_time }}</td>
        <td>{{ sl.consume_memory }}</td>
        <td>{{ sl.create_time |timer }}</td>
      </tr>
    </table>
    <div class="pagination">
      <el-pagination
          layout="prev, pager, next"
          @current-change="change"
          :current-page="currentPage"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "SubmissionSet",
  data() {
    return {
      submissionList: [],
      totalCount: 0,
      currentPage: 1,
      classArr: ["", "green", "red", "yellow", "grey", "orange", "orange"],//评测结果的样式
    }
  },
  methods: {
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
      if (user_id === localStorage.getItem("id"))
        this.$router.push({
          name: 'submissionDetail',
          params: {
            id: id,
          },
        })
      else
        messageTips(this, '访问受限', "warning");
    },
    //切换页数
    change(pageNumber) {
      console.log("change", pageNumber);
      let start = (pageNumber - 1) * 10;
      this.searchSubmissionList(start);
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
            } else {
              messageTips(this, '啊哦，请求提交记录失败!', "warning");
            }
          },
          error => {
            console.log("searchSubmissionListByMap 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //获取提交记录的数量
    searchSubmissionCount(user_id) {
      axios({
        url: "/submission/searchSubmissionCount",
        method: "post",
        data: qs.stringify({
          user_id: user_id,
        })
      }).then(response => {
            if (response.data) {
              //成功拿到数据后修改本地数据
              this.totalCount = response.data;
            } else {
              messageTips(this, '啊哦，请求页数失败!', "warning");
            }
          },
          error => {
            console.log("searchSubmissionCount 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchSubmissionList(0, null);
    this.searchSubmissionCount(null);
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  }
}
</script>

<style scoped>
.table {
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0 auto;
  width: 1200px;
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

.pagination {
  padding-top: 30px;
  margin: 0 auto;
  width: 1200px;
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