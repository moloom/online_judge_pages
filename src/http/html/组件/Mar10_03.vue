
<template>
  <div class="demo">
    <h2>学校名称：{{ schoolName }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <Student></Student>
  </div>
</template>

<script>
import Student from "./Mar10_04.vue";
//暴露方式1
// export default Vue.extend({

//暴露方式2
export default {
  name: "School",
  data() {
    return {
      schoolName: "JXUT",
      address: "江西省南昌市南昌县紫阳大道355号江西科技学院",
    };
  },
  components: {
    Student,
  },
};

//暴露方式3
// export default school
</script>


<style>
.demo {
  background-color: red;
}
</style>