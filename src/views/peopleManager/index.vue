<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs" >
        <el-tab-pane label="人员管理" name="first" class="label_top">
          <shou-ye></shou-ye>
        </el-tab-pane>
        <el-tab-pane label="劳务实名制" name="second" class="label_top">
          <service-real-name></service-real-name>
        </el-tab-pane>
       
        <el-tab-pane label="特种作业人员" name="third" class="label_top">
          <special-equ> </special-equ>
        </el-tab-pane>
        <el-tab-pane label="劳务考勤" name="fourth" class="label_top">
          <service-kq></service-kq>
        </el-tab-pane>

      </el-tabs>
    </div>


  </div>
</template>

<script>
import kqHistory from './kqHistory'
import shouYe from './shouYe'
import specialEqu from "./specialEqu";
import serviceRealName from './serviceRealName';
import serviceKq from './serviceKq';
export default {
  name: "peopleManager",
  components: {
    kqHistory,
    shouYe,
    specialEqu,
    serviceRealName,
    serviceKq
  },
  data(){
    return{
      activeName: 'first',
    }

  },
  mounted() {
    this.$store.dispatch('changeMsg', '人员管理')

  },
  methods:{
    handleTabs(tab, event) {
       console.log(tab, event);
    },
  }

}
</script>

<style scoped>
.tabs  >>>.el-tabs__item{
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

