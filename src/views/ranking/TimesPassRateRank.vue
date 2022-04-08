<template>
  <div>
    <div style="margin-left: 70px;height: 30px;margin-top: 30px;font-size: 20px;">提交次数通过率排行榜</div>
    <table class="table">
      <tr class="th">
        <td style="width: 10%;">#</td>
        <td style="width: 30%;">题目名称</td>
        <td style="width: 15%;">通过率</td>
        <td style="width: 30%;">最近提交时间</td>
      </tr>

      <tr v-for="(l,index) in list" :key="l.id">
        <td>
          {{ index }}
        </td>
        <td>
          <el-link :underline="false" class="a-color" @click="toSolveProblem(l.id)">
            {{ l.id }}.{{ l.title }}
          </el-link>
        </td>
        <td>{{ ((l.submit_pass_times/l.submit_times)*100).toFixed(2) }}%</td>
        <td>{{ l.latest_submit |timer }}</td>
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
  name: "TimesPassRateRank",
  data() {
    return {
      list: [],//数据list
      totalCount: 0,
      currentPage: 1,
    }
  },
  methods: {
    searchTimesPassRateRank(start) {
      axios({
        url: "/rank/searchTimesPassRateRank",
        method: "post",
        data: qs.stringify({
          start: start,//先写死，后面再搞分页
        })
      }).then(response => {
            if (response.data)
              this.list = response.data;
            else
              messageTips(this, '啊哦，请求数据失败!', "warning");
          },
          error => {
            console.log("searchTimesPassRateRank 请求失败", error);
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
    //切换页数
    change(pageNumber) {
      console.log("change", pageNumber);
      let start = (pageNumber - 1) * 10;
      this.searchSubmissionList(start);
    },
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchTimesPassRateRank(0);
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
  width: 1000px;
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
  width: 1000px;
}
</style>