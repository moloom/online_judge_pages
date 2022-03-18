<template>
  <div>
    <NavMenu v-show="isLogin" class="dd"></NavMenu>
    <Login v-show="!isLogin"></Login>
  </div>
</template>


<script>
import NavMenu from './components/NavMenu.vue'
import Login from "@/views/Login";

export default {
  name:"App",
  data(){
    return{
      isLogin:true,
    }
  },
  components:{
    NavMenu,
    Login,
  }
}
</script>

<style>
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.dd{
  display: flex;
  justify-content: space-around;
}

</style>
