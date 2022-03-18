<template>
  <div class="de">
    <br />
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
    <button @click="sendStudentName">点我传数据1</button>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      name:"刘思",
      gender:"男",
    };
  },
  methods: {
    sendStudentName(){
      this.$bus.$emit("hello",this.name);
    }
  },
};
</script>


<style>
.de {
  border: 1px solid greenyellow;
  background-color: honeydew;
}
</style>