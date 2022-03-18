<template>
  <div>
    <ul>
      <li v-for="p in pp" :key="p.id">
        <!-- 跳转路由直接携带query参数，to的字符串写法
        <router-link :to="`/home/message/detail?id=${p.id}`">{{p.text}}</router-link>-->

        <!--        to的对象写法-->
        <router-link :to="{
          path:'/home/message/detail',
          query:{
            id:p.id,
            text:p.text,
          }
        }">{{ p.text }}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      pp: [
        {id: "01", text: "Message001"},
        {id: "02", text: "Message002"},
        {id: "03", text: "Message003"},
      ],
    }
  },
}
</script>

<style scoped>
* {
  background-color: indianred;
}
</style>