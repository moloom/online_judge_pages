<template>
  <div>
    <h1>当前和为：{{sum}}</h1>
    <h1>当放大十倍为：{{bigSum}}</h1>
    <h1>下方组件的总人数时：{{personList.length}}</h1>
    <select v-model="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="add(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="addOdd({sum,n})">当前求和为奇数再加</button>
    <button @click="addWait(n)">等一等再加</button>
  </div>
</template>

<script>
//使用mapState需引入一下
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: "Count",
  data() {
    return {
      n:1,
    };
  },
  methods:{
    ...mapActions("counts",['decrement',"add","addOdd","addWait"]),
  },
  computed:{
    //从counts中拿sum数据，供这个组件使用
    ...mapState("counts",["sum"]),
    ...mapState("persons",["personList"]),
    ...mapGetters("counts",['bigSum']),
  },
  mounted() {
    
  },

};
</script>

<style scoped>
</style>