<template>
  <transition 
    name="fade"
    appear
    appear-active-class="fade-enter-active"
  >
    <slot v-if="isShow"></slot>
  </transition>
</template>
<script>
  export default {
    props: ["isShow"]
  } 
</script>
<style scoped>
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 1s;
  }
</style>


