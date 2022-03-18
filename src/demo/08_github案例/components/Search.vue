<template>
  <div>
    <h2>Search Github Users</h2>
    <input
      type="text"
      v-model="keyValue"
      placeholder="enter the name you serach"
    />
    <button @click="search">Search</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Search",
    data() {
    return {
        keyValue: "",
    };
    },
    methods: {
    search() {
        this.$bus.$emit("getData",[],false,true,"");
        axios.get(`http://api.github.com/search/users?q=${this.keyValue}`).then(
        (response) => {
            this.$bus.$emit("getData",response.data,false,false,"");
        },
        (error) => {
            console.log("呜呜呜",error.message);
            this.$bus.$emit("getData",[],false,false,error.message);
        }
        );
        
    },
    },
};
</script>

<style>
</style>