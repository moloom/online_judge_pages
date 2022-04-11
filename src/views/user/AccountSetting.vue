<template>
  <div>
    <div style="width: 1100px;margin: 40px auto 0px;">
      <h2>账号设置</h2>
      <div class="input-style">
        <el-input v-model="user_name" >
          <el-button slot="append" @click="updateUserName">修改</el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountSetting",
  data(){
    return {
      user:{},//用户信息
    };
  },
}
</script>

<style scoped>
.input-style{
  margin: 20px 0px;
}
</style>