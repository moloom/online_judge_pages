<template>
  <div>
    <Banner></Banner>

    <!--实现切换-->
    <router-link :to="{name:'guanyu'}">go Home</router-link>
    <router-link to="/about">go About</router-link>

    <!--    指定组件的展现位置-->
    <router-view></router-view>
  </div>
</template>

<script>

import About from "./pages/About";
import Home from "./pages/Home";
import Banner from "@/components/Banner";

export default {
  name: "App",
  components: {
    Banner,
  },
  methods: {},
};
</script>

<style>

</style>