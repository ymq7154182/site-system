<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleTabs" addable>
        <el-tab-pane label="视频展示" name="first" class="label_top">
          <shou-ye v-if="shouyeFlag"></shou-ye>
        </el-tab-pane>
        <el-tab-pane label="视频管理" name="second" class="label_top">
          <video-m v-if="mFlag"></video-m>
        </el-tab-pane>
       
       

      </el-tabs>
    </div>


  </div>
</template>

<script>
import shouYe from './shouye'

import videoM from "./videoM";


export default {
  name: "dataManage",
  components: {
    shouYe,
    videoM
  },
  data(){
    return{
      activeName: 'first',
      shouyeFlag: true,
      mFlag: false
    }

  },
  mounted() {
    this.$store.dispatch('changeMsg', '资料管理')

  },
  methods:{
    handleTabs(tab, event) {
       console.log(tab, event);
       if(tab.name === 'first') {
         this.shouyeFlag = true
         this.mFlag = false

        } else {
         this.shouyeFlag = false
         this.mFlag = true
       } 
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

