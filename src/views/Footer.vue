<template>
  <div>
    <div>
      <div class="separator"></div>
      <div class="footer">
        <div>
          <img style="width: 130px;height: 90px;" src="@/assets/logo.png">
        </div>
        <div style="width: 300px;font-size: 16px;">
          <span>
            <span style="padding-left: 26px;font-size: 21px;color: #da9be5">M online judge</span><br>
            <span style="color: rgba(34,36,38,0.56);">开发人员：</span>
            <el-link style="color: #3a8ee6;font-size: 22px;padding-bottom: 7px;"
                     href="https://github.com/moloom">@moloom</el-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

.separator {
  width: 100%;
  height: 50px;
  overflow: hidden;
}

.footer {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-bottom: 30px;
}
</style>