<template>
  <div>
    <h1>我系标题！</h1>
    <button @click="back">后退</button>
    <button @click="forward">前进</button>
  </div>
</template>

<script>
export default {
  name:"Banner",
  methods:{
    back(){
      this.$router.back();
    },
    forward(){
      this.$router.forward();
    },
  }
}

</script>


<style>
h1{
  text-align: center;
  color: blueviolet;
}
</style>