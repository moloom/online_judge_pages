<template>
  <div>
    <h1>当前和为：{{$store.state.sum}}</h1>
    <h1>当前和为：{{he}}</h1>
    <h1>当放大十倍为：{{bigSum}}</h1>
    <h1>下方组件的总人数时：{{personList.length}}</h1>
    <select v-model="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="addOdd">当前求和为奇数再加</button>
    <button @click="addWait">等一等再加</button>
  </div>
</template>

<script>
//使用mapState需引入一下
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: "List",
  data() {
    return {
      n:1,
    };
  },
  methods:{
    add(){
      this.$store.dispatch("add",this.n);
    },
    // decrement(){
    //   this.$store.dispatch("decrement",this.n);
    // },
    addOdd(){
      if(this.$store.state.sum%2)
        this.$store.dispatch("add",this.n);
    },
    addWait(){
      setTimeout(()=>{
        //越过actions，直接调用commit
        this.$store.commit("ADD",this.n);
      },500)
    },
    ...mapActions(['decrement']),//需要在调用函数的地方，把参数传过去，
  },
  computed:{
    //本来获取sum值的表达式是：$store.state.sum，
    //使用mapState，他会帮你取值并放到一个新变量名上去
    ...mapState({he:"sum",personList:"personList"}),//把括号里面的值展开成键值对，对象写法
    ...mapGetters(['bigSum']),//从getters中读取数据， 数组写法
  },
  mounted() {
    
  },

};
</script>

<style scoped>
</style>