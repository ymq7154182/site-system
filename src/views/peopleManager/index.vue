<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs" >
        <el-tab-pane label="人员管理" name="first" class="label_top">
          <shou-ye></shou-ye>
        </el-tab-pane>
        <el-tab-pane label="历史考勤" name="second" class="label_top">
          <kq-history></kq-history>
        </el-tab-pane>
        <el-tab-pane label="特种作业人员" name="third" class="label_top">
          <special-equ> </special-equ>
          <!-- <span style="color: white">施工升降机</span> -->
        </el-tab-pane>
<!--        <el-tab-pane label="特种设备" name="fourth">-->
<!--          -->
<!--          &lt;!&ndash; <span style="color: white">特种设备</span> &ndash;&gt;-->
<!--        </el-tab-pane>-->
        <!--<el-tab-pane label="视频设备" name="five" class="label_top">-->
          <!--&lt;!&ndash; <span style="color: white">视频设备</span> &ndash;&gt;-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>


  </div>
</template>

<script>
import kqHistory from './kqHistory'
import shouYe from './shouYe'
import specialEqu from "./specialEqu";
export default {
  name: "peopleManager",
  components: {
    kqHistory,
    shouYe,
    specialEqu
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

