<template>
  <div>
    <h1>{{msg}}</h1>
    <School></School>
    <Student></Student>
  </div>
</template>

<script>
import Student from "./components/Student";
import School from "./components/School";
export default {
  name: "App",
  components: {
    Student,
    School,
  },
  data(){
    return {
      msg:"你好啊",
    }
  },
  methods:{
  },
};
</script>