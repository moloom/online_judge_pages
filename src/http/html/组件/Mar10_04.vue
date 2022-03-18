<template>
  <div class="demo">
    <h2>学生姓名：{{ studentName }}</h2>
    <h2>学生年龄：{{ age }}</h2>
  </div>
</template>

<script>

//暴露方式1
// export default Vue.extend({

//暴露方式2
export default {
  name: "Student",
  data() {
    return {
      studentName: "moloom",
      age: 23,
    };
  },
};

//暴露方式3
// export default school
</script>


<style>
.demo {
  background-color: orange;
}
</style>