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
        <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16" style="margin-top: 2px;">
          <path
              d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
              p-id="2942"></path>
        </svg>
        <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16" style="margin-top: 2px;">
          <path
              d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"
              p-id="3188"></path>
        </svg>
        {{ problem.good }}
      </div>
      <div class="problemExtractD1">
        <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16" style="margin-top: 3px;">
          <path
              d="M300 608.864V88h477.916c25.815 0 41.979 5.525 51.808 14.617 6.238 6.125 9.602 13.574 10.735 20.38l0.438 2.633 92.314 402.165 0.176 0.712c5.816 23.53 1.843 43.53-10.447 59.143-9.517 11.702-32.017 21.182-59.61 21.182H546.349l72.213 130.586c7.856 14.206 15.912 31.605 23.947 53.053 10.618 28.344 20.148 61.09 28.115 98.645 0.036 0.32-0.053 0.518-0.461 1.612-1.324 3.544-4.218 8.523-9.47 15.814C644.654 926.839 623.467 936 594.813 936c-18.135 0-28.537-4.288-37.618-12.874-8.405-7.946-14.718-17.855-25.561-39.254l-5.634-11.118-5.344-5.732c-0.433-0.72-0.918-1.551-1.444-2.474-1.787-3.135-7.986-14.904-10.1-18.652l0.01-0.006c-25.204-43.028-36.934-62.463-52.366-85.841-21.447-32.49-42.12-59.384-64.482-82.682-28.251-29.434-58.872-52.508-92.273-68.503z m-88-24.668a289.824 289.824 0 0 0-29.43-1.476H97.667c-6.617 0-8.667-2.052-8.667-8.768V96.256C89 90.049 91.054 88 97.667 88H212v496.196z m483.57 112.636h167.76c53.193 0 101.27-20.48 128.379-54.272 29.665-37.376 39.382-85.504 27.107-135.168l-91.552-398.848c-2.557-15.36-10.74-44.544-36.826-69.632C863.331 13.312 825.482 0 777.916 0H97.667C42.429 0 1 41.472 1 96.256v477.696c0 55.296 41.429 96.768 96.667 96.768h84.903c121.729 0 184.64 107.008 250.618 219.648 1.535 2.56 12.787 25.6 19.947 33.28C471.037 958.976 504.282 1024 594.811 1024c55.239 0 101.782-20.992 135.027-60.928 17.39-23.552 34.268-52.224 27.108-89.088-7.304-34.634-15.547-64.206-23.833-89.152l-37.543-88z"
              p-id="3322"></path>
        </svg>
        <svg class="icon" viewBox="0 0 1024 1024" width="16" height="16" style="margin-top: 3px;">
          <path
              d="M0.324216 544.126266V99.856667c0-42.502075 34.439126-76.943007 76.950232-76.943007h69.252138v597.416871l-69.252138 0.727905C34.779598 621.060242 0.324216 586.621116 0.324216 544.126266zM906.401774 701.805334c-101.960909-0.643013-203.927236-1.295057-305.889952-1.936264 14.372063 50.5578 21.64389 95.465755 21.64389 135.014667 0 89.738243-78.615563 177.607053-157.128172 166.202603-69.225045-10.057012-76.829216-69.88612-76.829216-144.858545v-67.689761c0-86.871778-72.916951-160.897746-157.451485-169.040169l-11.119068 0.106567V22.915466h602.566394c56.362979 0 104.7768 40.090776 115.278141 95.47298 28.068601 148.097091 56.146233 296.181539 84.21664 444.269599 12.045656 63.672736-29.79715 125.053384-93.46808 137.09904a116.62016 116.62016 0 0 1-21.819092 2.048249z"
              fill="#231815" p-id="3568"></path>
        </svg>
        {{ problem.bad }}
      </div>
      <div class="problemExtractD1">
        <span>
          <i v-show="!isFavorite" class="el-icon-star-off"></i>
          <i v-show="isFavorite" class="el-icon-star-on"></i>&nbsp;&nbsp;收藏
        </span>
      </div>
      <div class="problemExtractD1">
        <i style="width: 30px;height: 30px;" class="el-icon-lollipop"></i>
        <b>{{ problem.point }}</b>&nbsp;&nbsp;M币奖励
      </div>
    </div>
    <br>
    <!-- 题干   -->
    <div>
      <div v-html="problem.problem_stem"></div>
    </div>
    <br><br><br>
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
      isFavorite: false,
    }
  },
  mounted() {
    console.log("ProblemStem  mounted");
    //初始时，拿到题目数据
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
    //拿是否收藏数据
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
  beforeUpdate() {
    console.log("ProblemStem  beforeUpdate");
  },
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
  background-color: #d3b7d8;
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