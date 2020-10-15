<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs">
        <el-tab-pane label="质安管理" name="first"  >
          <shou-ye></shou-ye>
        </el-tab-pane>
        <el-tab-pane label="考评月报" name="second" >
          <safe-record> </safe-record>
        </el-tab-pane>
      </el-tabs>
    </div>


  </div>
</template>

<script>
import shouYe from './shouYe'
import safeRecord from "./safeRecord";
export default {
  name: "peopleManager",
  components: {
    shouYe,
    safeRecord
  },
  data(){
    return{
      activeName: 'first',
    }

  },
  mounted() {
    this.$store.dispatch('changeMsg', '安全管理')

  },
  methods:{
    handleTabs(tab, event) {
      console.log(tab, event);
    },
  }

}
</script>

<style scoped>
.tabs >>>.el-tabs__item{
  color: #fff;
}
.tabs >>>.el-tabs__item.is-active {
  color: #409EFF;
}
.tabs >>> .el-tabs__item:hover {
  color: #409EFF;
}
.tabs >>> .el-tabs__nav-wrap::after {
  height: 0;
}
/*.tabs >>> .el-tabs__active-bar {*/
/*height: 1px;*/
/*}*/
.tabs >>> .el-tabs__nav-wrap {
  background-image: url("../../assets/homepage/notice_bg.png");
  padding-left: 0.3rem;
}
</style>
