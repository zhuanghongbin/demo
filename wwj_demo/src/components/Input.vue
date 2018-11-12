<template>
  <div style="margin: 20px;">
    <!-- 实际上这里的方法还是要看input设置的是input方法还是change方法 -->
    <input class="default-input" type="text" @input="handleInput" :value="inputValue">
  </div>
</template>

<script>
  export default {
    model:{ // 重命名组件传递的props 和 方法名
      prop: 'inputValue',
      event: 'defaultEven'
    },
    props: ['inputValue'],
    methods: {
      handleInput(e) {
        console.log(e.target.value)
        this.$emit('defaultEven', e.target.value)
      }
    }
  }
</script>

<style scoped>
  .default-input{
    height: 36px;
    border: 1px solid red;
  }
</style>

