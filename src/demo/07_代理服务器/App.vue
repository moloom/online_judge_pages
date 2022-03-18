<template>
  <div>
    <button @click="gets">点我</button>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "App",
  methods: {
    gets(){
      axios.get("http://localhost/api/vue.min.js").then(
        response=>{
          console,log("啦啦啦");
        },
        error=>{
          console.log("呜呜呜");
        }
      )
    }
  },
};
</script>