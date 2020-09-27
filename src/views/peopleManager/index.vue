<template>
  <div>

    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs">
        <el-tab-pane label="首页" name="first" >
          <shou-ye></shou-ye>
        </el-tab-pane>
        <el-tab-pane label="历史考勤" name="second">
          <kq-history></kq-history>
        </el-tab-pane>
        <el-tab-pane label="施工升降机" name="third" >
          <!-- <span style="color: white">施工升降机</span> -->
        </el-tab-pane>
        <el-tab-pane label="特种设备" name="fourth">
          <!-- <span style="color: white">特种设备</span> -->
        </el-tab-pane>
        <el-tab-pane label="视频设备" name="five">
          <!-- <span style="color: white">视频设备</span> -->
        </el-tab-pane>
      </el-tabs>
    </div>

    
  </div>
</template>

<script>
import kqHistory from './kqHistory'
import shouYe from './shouYe'
export default {
  name: "peopleManager",
  components: {
    kqHistory,
    shouYe
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
