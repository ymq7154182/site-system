<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs" addable>
        <el-tab-pane label="文件管理" name="first" class="label_top">
          <file-manager></file-manager>
        </el-tab-pane>
        <el-tab-pane label="图纸管理(PDF)" name="second" class="label_top">
          <service-real-name></service-real-name>
        </el-tab-pane>
       
        <el-tab-pane label="模型管理(CAD+BIM)" name="third" class="label_top">
          <special-equ> </special-equ>
        </el-tab-pane>
       

      </el-tabs>
    </div>


  </div>
</template>

<script>
import fileManager from './fileManager'
import shouYe from './index1'
import specialEqu from "./index1";
import serviceRealName from './index1';
import serviceKq from './index1';
export default {
  name: "dataManage",
  components: {
    fileManager,
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
    this.$store.dispatch('changeMsg', '资料管理')

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

