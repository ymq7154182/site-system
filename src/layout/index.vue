<template>
  <div class="bg-style">
    <Header></Header>
    <AppMain></AppMain>
  </div>
</template>

<script>
  import AppMain  from './components/AppMain'
  import Header from './components/head/header'
    export default {
        name: "index",
      components: {
        AppMain,
        Header
      },
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          loading: true
        }
      },
      mounted() {
        this.cancelLoading();
      },
      methods: {
        cancelLoading() {
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    }
</script>

<style scoped>
  .bg-style {
    background-image: url("../assets/homepage/bg.png");
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    overflow-y: auto;
  }
</style>
