<template>
  <div class="de">
    <br />
    <h2>学生姓名：{{ name }}</h2>
    <h2 @click="ageAdd">学生年龄：{{ myAge }}</h2>
    <h2>学生性别：{{ gender }}</h2>
  </div>
</template>

<script>
//引入一个混合
import { m } from "../mixin";
export default {
  name: "Student",
  data() {
    return {
      myAge: this.age,
    };
  },
  

  //简单接收外部传过来的数据
  //props:["name","gender","age"],

  //确认接收的类型
  // props:{
  //   name:String,
  //   age:Number,
  //   gender:String,
  // }

  //接收数据的同时，对数据进行限制
  props: {
    //比data函数更快被vue处理
    name: {
      type: String,
      require: true, //必须要
    },
    age: {
      type: Number,
      default: 0, //默认值
    },
    gender: {
      type: String,
      require: true,
    },
  },
  mixins: [m]
};
</script>


<style>
.de {
  border: 1px solid greenyellow;
  background-color: honeydew;
}
</style>