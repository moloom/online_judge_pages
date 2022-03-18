<template>
  <div>
    <List></List>
    <Person></Person>
  </div>
</template>

<script>

import List from "./components/List";
import Person from "./components/Person";

export default {
  name: "App",
  components:{
    List,
    Person,
  },
  methods: {
  },
};
</script>

<style>

</style>