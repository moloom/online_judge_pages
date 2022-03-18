<!--主页左边的文字列表-->
<template>
  <div>
    <div style="vertical-align: middle;" v-for="(p,index) in 11" :key="index">
      <el-row class="clearMarginBottom">
        <el-col :span="24">
          <div class="verticalCenter">
            <el-avatar size="large"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>&nbsp;&nbsp;&nbsp;我是题目标题 {{ index }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row class="clearMarginBottom">
        <el-col :span="24">
          <div class="grid-content bg-purple-light"><p>saoidhsaofdhnasd1sdsadadasd是闪电发是货saoidhsaofdhnasd1sdsadadasd
            是闪电发是货saoidhsaofdhnasd1sdsadadasd是闪电发是货saoidhsaofdhnasd少时诵诗书是少时诵诗书2222222
            1sdsadadasd是闪电发是货saoidhsaofdhnasd1sdsadadasd是闪电发是货s</p></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentList"
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

&
:last-child {
  margin-bottom: 0;
}

}

.clearMarginBottom{
  margin-bottom: 0px;
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.verticalCenter {
  display: flex;
  align-items: center;
}
</style>