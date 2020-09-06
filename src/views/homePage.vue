<template>
  <div>
    <h1>fefwfwef</h1>
  </div>
</template>

<script>
    export default {
        name: "homePage",
      mounted() {
        this.$store.dispatch('changeMsg', '项目概览')
      }
    }
</script>

<style scoped>

</style>
