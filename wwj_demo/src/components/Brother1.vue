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
        brotherVal: '兄弟1'
      }
    },
    methods: {
      broClick () {
        this.$emit('handleClick')
      }
    },
    mounted () {
      Bus.$emit('brotherEven', this.brotherVal)
    },
  }
</script>