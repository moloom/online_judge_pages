<template>
  <div>
    <ul>
      <li v-for="p in pp" :key="p.id">{{p.text}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "News",
  data(){
    return{
      pp:[
        {id:"01",text:"news001"},
        {id:"02",text:"news002"},
        {id:"03",text:"news003"},
      ],
    }
  },
}
</script>

<style scoped>
*{
  background-color: red;
}
</style>