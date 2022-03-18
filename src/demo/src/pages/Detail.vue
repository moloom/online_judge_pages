<template>
  <div>
    <hr><br>
    <hr>
    <ul>
      <li> 消息编号：{{$route.query.id}}</li>
      <li>消息标题：{{$route.query.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Message",
  data(){
    return{
    }
  },
}
</script>

<style scoped>
*{
  background-color: deepskyblue;
}
</style>