<template>
  <div>
    <button @click="isShow = !isShow">点我隐藏</button>
    <transition name="hello" :appear="true">
      <h1 class="d1" v-show="isShow">你好啊</h1>
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
.d1 {
  border: 1px solid greenyellow;
  background-color: honeydew;
}
.hello-enter-active {
  animation: mo 1s;
}
.hello-leave-active {
  animation: mo 1s reverse;
}

@keyframes mo {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}
</style>