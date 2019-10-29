<template>
    <div class="result">{{result}}</div>
</template>

<script>
    export default {
        name: "Result",
        data() {
            return {
                result: '',
            }
        }
    }
</script>

<style scoped>
    .result {
        color: #fff;
        height: 100%;
        width: 100%;
    }
</style>