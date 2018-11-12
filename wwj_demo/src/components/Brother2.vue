<template>
  <div @click="broClick">
    {{brotherVal}}
  </div>
</template>
<script>
  import Bus from '../bus.js'
  export default {
    data () {
      return {
        brotherVal: '兄弟2'
      }
    },
    methods: {
      broClick () {
        this.$emit('handleClick')
      }
    },
    mounted () {
      // 兄弟组件传值
      Bus.$on('brotherEven', val =>{ // 这里的val 是从Brother.vue中的数据传过来的
        this.brotherVal = `${this.brotherVal} => 兄弟组件传递过来的数据: ${val}`
      })  
    }
  }
</script>