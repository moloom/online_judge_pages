
<template>
  <div class="demo">
    <h2>学校名称：{{ schoolName }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <Student ref="stu"></Student>
    
    <div class="cl">
      <br/>
      <button ref="btn" @click="showb">点我！</button>
    </div>
  </div>
</template>

<script>
import Student from "./Student.vue";

export default {
  name: "ASchool",
  data() {
    return {
      schoolName: "JXUT",
      address: "江西省南昌市南昌县紫阳大道355号江西科技学院",
    };
  },
  components: {
    Student,
  },
  methods: {
    showb(){
      console.log(this.$refs);
    }
  },
};


</script>


<style>
.demo {
  background-color: red;
}
.cl{
  background-color: white;
  border:1px solid white;
}
</style>