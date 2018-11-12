<template>
    <div>
        <p>{{text}}</p>
        <p>父组件传递的数据：{{parentData}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            parentData: {
                type:  Number | String,
                default: '1'
            }
        },
        data () {
            return {
                text: "这个是文本全局组件"
            }
        }
    }
</script>
