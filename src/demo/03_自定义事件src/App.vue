<template>
  <div>
    <h1>{{msg}}</h1>
    <!-- 通过父组件给子组件绑定一个自定义事件   ref实现 -->
    <Student ref="student"></Student>
    <!-- 通过父组件给子组件绑定一个自定义事件  @click实现-->
    <Student v-on:mo="demo"></Student>
    <!-- 加.native就是原生事件，不加默认是自定义事件 -->
    <Student @click.native="show"></Student>
  </div>
</template>

<script>
import Student from "./components/Student";
export default {
  name: "App",
  components: {
    Student,
  },
  data(){
    return {
      msg:"mmmm"
    }
  },
  methods:{
    //前面两个参数指定接收前两个值，后续值全放在x中
    getStudentName(name,gender,...x){
      console.log(name,gender,x);
    },
    demo(name){
      console.log("demo被调用了",name);
    }
  },
  mounted() {
    //this.$refs.student.$on("mo",this.getStudentName);//当mo事件触发时
    //这里需要写箭头函数，不然 this是子组件的vc
    this.$refs.student.$on("mo",(name,...params)=>{
      console.log(name,params);
    });
  },
};
</script>