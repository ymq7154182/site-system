<template>
  <div class="hello">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple">123333</div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">222</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">333</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
