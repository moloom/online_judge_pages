<template>
  <div class="de">
    <br />
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ gender }}</h2>
    <!-- <button v-on:moo="sss">点我获取名字！</button> -->
    <button @click="setStuName">点我获取名字！</button>
    <button @click="unbind">解绑mo事件！</button>
  </div>
</template>

<script>

export default {
  name: "Student",
  data() {
    return {
      name: "moloom",
      gender:"女",
    };
  },
  methods: {
    setStuName(){
      //触发事件，通过这个方法，给App父组件传值
      this.$emit("mo",this.name,this.gender,444,5332,111);

    },
    unbind(){
      //解绑一个事件
      this.$off("mo");
      //解绑多个事件
      this.$off(["mo"]);
      //解绑所有事件
      this.$off();
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