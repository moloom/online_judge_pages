<template>
  <div>
    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson(name)">添加</button>
    <ul>
      <li v-for="(p,index) in personList" :key="p.id">---{{p.name}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";


export default {
  name: "Person",
  data(){
    return{
      name:"",
    }
  },
  computed:{
    ...mapState("persons",["personList"]),
  },
  methods:{
    ...mapActions("persons",["addPerson"]),
  }
}
</script>

<style scoped>

</style>