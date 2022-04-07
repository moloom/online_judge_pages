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
        <div style="height: 300px;">标签</div>
        <div style="height: 300px;">热门解题</div>
        <div style="height: 300px;">积分达人</div>
      </div>

    </el-main>
  </div>
</template>

<script>
import HomeList from "@/views/HomeList";

export default {
  name: "Body",
  components: {
    HomeList,
  },

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
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;垂直居中*/
  padding-left: 50px;
}
</style>