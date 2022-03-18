<template>
  <div>
    <!-- 给student组件传数据， 加:代表vue接管，里面就是表达式-->
    <Student name="moloom" gender="男" :age="22"></Student>
  </div>
</template>

<script>
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    Student,
  },
};
</script>