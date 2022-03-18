<template>
  <div class="d1" >
    <div class="d2"
    v-show="userList.length"
    v-for="(users) in userList" 
    :key="users.id">
      <a :href="users.html_url">
        <img class="src_size" :src="users.avatar_url"/>
      </a>
      <br>
      <p>{{users.login}}</p>
    </div>
    <h1 v-show="isFirst">欢迎宁！</h1>
    <h1 v-show="isLoading">加载中</h1>
    <h1 v-show="errorMsg">出错啦</h1>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      isFirst:true,
      isLoading:false,
      errorMsg:"",
      userList:[],
    };
  },
  mounted() {
    this.$bus.$on("getData",(params,f,l,e)=>{
      console.log(params);
      this.userList=params.items;
      this.isFirst=f;
      this.isLoading=l;
      this.errorMsg=e;
    })
  },
  beforeDestroy(){
    this.$bus.$off("getData");
  }
};
</script>

<style scoped>
.src_size {
  height: 100px;
  width: 100px;
  text-align: center;
  vertical-align: middle;
}
.d1 {
  width: 600px;
  /* 下面两时浮动效果 */
  display: flex;
  justify-content: space-around;
}
p{
  text-align: center;
}
.d2{
  /* float: left; */
  
  height: 150px;
  width: 150px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
}
</style>