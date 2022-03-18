<template>
  <div>
    <button @click="isShow = !isShow">点我隐藏</button>
    <transition name="hello" :appear="true">
      <h1 class="de" v-show="isShow">你好啊</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Student",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {},
};
</script>


<style scope>
.de {
  border: 1px solid rgb(211, 109, 202);
  background-color: rgb(238, 159, 227);
}
.hello-enter,.hello-leave-to {
  transform: translateX(-100%);
}
.hello-enter-to,.hello-leave {
  transform: translateX(0);
}

</style>