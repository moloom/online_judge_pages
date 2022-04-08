<template>
  <div style="margin: 0 auto;width: 1120px;">
    <div style="margin-top: 30px;">
      <el-link class="link-style" @click="changeActive(0)">富豪榜</el-link>
      <el-link class="link-style" @click="changeActive(1)">提交次数榜</el-link>
      <el-link class="link-style" @click="changeActive(2)">提交人数榜</el-link>
      <el-link class="link-style" @click="changeActive(3)">提交次数通过率排行榜</el-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "RankingMain",
  data() {
    return {
      activeName: 'second',
      routeList: ['pointRanking', 'submitTimesRanking', 'submitNumberRank', 'timesPassRateRank'],
    }
  },
  methods: {
    //切换页面
    changeActive(i) {
      this.$router.push({
        name: this.routeList[i],
      })
    }
  },
}
</script>

<style scoped>
.link-style {
  color: #3a8ee6;
  margin-right: 30px;
  font-size: large;
}
</style>