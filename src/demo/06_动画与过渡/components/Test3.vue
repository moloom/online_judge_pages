<template>
  <div>
    <button @click="isShow = !isShow">点我隐藏</button>
    <transition-group name="animate__animated animate__bounce" 
    enter-active-class="animate__swing"
    leave-active-class="animate__backOutUp"
    appear="true">
      <h1 class="d3" key="1" v-show="isShow">你好啊</h1>
      <h1 class="d3" key="2" v-show="!isShow">我好啊</h1>
    </transition-group>
  </div>
</template>

<script>
import 'animate.css'

export default {
  name: "Student",
  data() {
    return {
      isShow: true,
    };
  },

};
</script>


<style scope>
.d3 {
  border: 1px solid rgb(241, 132, 7);
  background-color: rgb(139, 145, 130);
}

</style>