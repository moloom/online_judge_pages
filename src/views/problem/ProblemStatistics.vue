<template>
  <div>
    <div style="width: 80%;margin: 20px auto;">
      <h2>{{ problem.id }}.{{ problem.title }}</h2>
      <div class="problem-info-style" v-show="problem.latest_submit!=null">最后一次提交：{{ problem.latest_submit | timer }}
      </div>
    </div>
    <div style="border: #8e9aaf solid 1px;width: 80%;margin: 0 auto;">
      <div style="display: flex;">
        <div class="submission-times-style">
          <div class="title-style">提交量</div>
          <div>{{ problem.submit_pass_times }}/{{ problem.submit_times }}</div>
          <div class="small-text-style">
            {{ (problem.submit_pass_times / problem.submit_times * 100).toFixed(2) }}% 通过
          </div>
        </div>
        <div class="submission-times-style">
          <div class="title-style">提交人数</div>
          <div>{{ problem.submit_pass_number }}/{{ problem.submit_number }}</div>
          <div class="small-text-style">
            {{ (problem.submit_pass_number / problem.submit_number * 100).toFixed(2) }}% 解决
          </div>
        </div>
        <div class="submission-times-style">
          <div class="title-style">奖励</div>
          <div>{{ problem.point }}</div>
          <div class="small-text-style">M币</div>
        </div>
      </div>
      <div v-show="!submissionList.length==0" id="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "ProblemStatistics",
  data() {
    return {
      problem: {},
      submissionList: [],//提交记录数量
      statusNameList: [],//提交状态昵称
    }
  },
  methods: {
    myEcharts() {
      let myChart = echarts.init(document.getElementById('charts'));
      //配置图表
      let option = {
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.statusNameList,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}"
        },
        //文本标签
        label: {
          formatter: "{b}：{d}%",//显示格式:{a}：系列名.{b}：数据名.{c}：数据值.{d}：百分比
          position: 'outer',
          alignTo: 'labelLine',
          bleedMargin: 30
        },
        series: [
          {
            type: 'pie',
            stillShowZeroSum: false,//数据为0，则不显示饼图
            radius: '50%',
            avoidLabelOverlap: false,
            data: this.submissionList,
            /*textStyle: {
              decoration: 'none',
              fontFamily: 'Arial, Verdana, sans-serif',
              fontFamily2: '微软雅黑',    // IE8- 字体模糊并且不支持不同字体混排，额外指定一份
              fontSize: 12,
              fontStyle: 'normal',
              fontWeight: 'normal'
              [
              {value: 335, name: 'A'},
              {value: 310, name: 'B'},
              {value: 234, name: 'C'},
              {value: 135, name: 'D222222'},
              {value: 1548, name: 'E'}
            ]
            },*/
          },
        ]
      };
      myChart.setOption(option);
    },
    //获取题目信息
    searchProblem() {
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
            console.log("searchProblem 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    },
    //查询题目的提交量，根据提交状态分组
    searchSubmissionCountGroupByStatus() {
      axios({
        url: "/user/searchSubmissionCountGroupByStatus",
        method: "post",
        data: qs.stringify({
          id: this.$route.params.id,
        })
      }).then(response => {
            if (response.data) {
              this.submissionList = response.data;
              for (let i = 0; i < this.submissionList.length; ++i) {
                this.statusNameList.push(this.submissionList[i].name);
              }
            } else {
              messageTips(this, '啊哦，请求题目失败', "error");
            }
          },
          error => {
            console.log("searchProblem 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    }
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.searchProblem();
    this.searchSubmissionCountGroupByStatus();
  },
  mounted() {
    setTimeout(() => {
      this.myEcharts();
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
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

#charts {
  width: 550px;
  height: 400px;
  margin: 0px auto;
  padding-top: 15px;
}

.title-style {
  background-color: rgba(187, 199, 219, 0.38);
  font-size: 23px;
  border-bottom: #8e9aaf 1px solid;
}

.submission-times-style {
  width: 35%;
  font-size: 35px;
  text-align: center;
  border: #8e9aaf solid 1px;
}

.small-text-style {
  font-size: 14px;
  padding-bottom: 10px;
}

.problem-info-style {
  color: #a7aab2;
  font-size: 14px;
}
</style>