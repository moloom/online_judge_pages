<template>
  <div>
    Hello,我是Home<br/>
    <div class="d1">

<br>
      <div class="d2">
        <router-link to="/home/news">news</router-link><br>
        <router-link to="/home/message">message</router-link><br>
      </div>
<br>
      <hr>
      <!--    指定组件的展现位置-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import News from "@/pages/News";
import Message from "@/pages/Message";
export default {
  name:"Home",
  data() {
    return {
      n:1,
    };
  },
};
</script>

<style scoped>
d1{
  width: 500px;
  height: 500px;
  float: right;
}
d2{
  margin: 0 auto; /* 水平居中 */
  width: 300px;
  height: 300px;
  text-align: center;
  font-size: 33px;
}
</style>