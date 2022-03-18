
<template>
  <div class="demo">
    <h2>学校名称：{{ schoolName }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from "pubsub-js";

export default {
  name: "ASchool",
  data() {
    return {
      schoolName: "JXUT",
      address: "江西省南昌市南昌县紫阳大道355号江西科技学院",
    };
  },
  mounted() {
    // this.$bus.$on("hello",(data)=>{
    //   console.log("我收到数据啦-",data);
    // })
    this.pubId = pubsub.subscribe("m1", (functionName, value)=> {
      console.log("sss", functionName, value);
    });
  },
  //组件销毁时，必须解绑事件，否则全部事件都不能用
  beforeDestroy() {
    // this.$bus.$off("hello");
    pubsub.unsubscribe(this.pubId);
  },
};
</script>


<style>
.demo {
  background-color: red;
}
.cl {
  background-color: white;
  border: 1px solid white;
}
</style>