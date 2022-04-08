<template>
  <div>
    <el-main class="juzhong">
      <div style="width: 1100px;margin: 0 auto;">  <!--这里控制列表的宽-->
        <div style="width: 60%;float: left;">
          <HomeList></HomeList>
        </div>
      </div>
      <!-- 排行榜 -->
      <div class="ranking">
        <div style="height: 300px;">
          <table class="table">
            <tr>
              <td colspan="2">富豪榜</td>
            </tr>
            <tr class="tr">
              <td class="td">昵称</td>
              <td class="td">M币</td>
            </tr>
            <tr v-for="p in pointList" :key="p.id" class="tr">
              <td class="td" style=" width: 60%;color: #b31d28">{{ p.name }}</td>
              <td class="td" style="color: #3a8ee6">{{ p.point }}</td>
            </tr>
          </table>
        </div>
      </div>

    </el-main>
  </div>
</template>

<script>
import HomeList from "@/views/HomeList";
import axios from "axios";
import qs from "qs";
import {messageTips} from "@/utils/messageTip";

export default {
  name: "Body",
  data() {
    return {
      pointList: [],
    };
  },
  components: {
    HomeList,
  },
  methods: {
    //获取积分排行榜，显示10条
    getPointRank() {
      axios({
        url: "/rank/pointRank",
        method: "post",
        data: qs.stringify({
          start: 0,
          number: 10,//显示条数
        })
      }).then(response => {
            if (response.data) {
              this.pointList = response.data;
            } else
              messageTips(this, '啊哦，请求积分排行失败', "error");
          },
          error => {
            console.log("pointRank 请求失败", error);
            messageTips(this, '啊哦，网络打了个盹', "error");
          })
    }
  },
  created() {
    this.$store.state.fullscreenLoading = true;
    this.getPointRank();
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  },
  updated() {
    setTimeout(() => {
      this.$store.state.fullscreenLoading = false;
    }, 1000);
  }

}
</script>

<style scoped>
.juzhong {
  width: 100%;
  vertical-align: center;
  margin: 0 auto; /* 水平居中 */
}

.ranking {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;垂直居中*/
  padding-left: 50px;
  margin-top: 40px;
}

.table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 250px;
  text-align: center;
  border: #bcbec2 solid 1px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.td {
  border: 1px solid rgba(34, 36, 38, .1);
}
.tr {
  border: 1px solid rgba(34, 36, 38, .1);
}
</style>