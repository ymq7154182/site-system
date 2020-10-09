<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @click="handleTabs" >
        <el-tab-pane label="查看进度" name="first" class="label_top">
          <check-progress></check-progress>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second" class="label_top">
          <upload-image></upload-image>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import uploadImage from './uploadImage'
  import checkProgress from './checkProgress'
  export default {
    name: 'scheduleManage',
    components: {
      uploadImage,
      checkProgress
    },
    data() {
      return {
        dataList: [], // 点击每一个进度，显示的详细进度条数据
        activeName: 'first',
      }
    },
    // computed: {
    //   deptId () {
    //     return localStorage.getItem('deptId')
    //   }
    // },
    mounted() {
      this.$store.dispatch('changeMsg', '进度管理');
      // this.gotoOption(1)
    },
    methods: {
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
  .border-top-left {
    height: 10px;
    background-image: url("../../../src/assets/border/top-center.png");
    background-size: 100% 100%;
    width: 100%;
  }
  .box-title {
    color: #FFA454;
    font-size: 0.27rem;
    height: 0.5rem;
    line-height: 0.5rem;
    padding-left: 0.25rem;
  }
  .schedule-content {
    margin: 8vh 6vw;
    background-color: rgba(0, 36, 78, 0.5);
    /*height: 40vh;*/
  }
  .schedule-press {
    margin: 6vh 3vw;
    /*height: 60vh;*/
    /*max-height: 100vh;*/
  }
  .processing_content{
    background-color: rgba(204, 224, 255, 0.5);
    border-radius: 0.1rem;
  }
  .item-td {
    font-size: 15px;
  }
  .processing_content_detail{
    margin-left: 0.4rem;
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    width: 150px;
    display: inline-block;
}
.step-row{
  min-width:500px;
  margin-bottom:12px;
  margin-top:12px;
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
<style>
  .el-step:last-of-type .el-step__description {
    padding-right: 10%;
  }
  .schedule-content .el-step__title {
    font-size: 18px;
    font-weight: bold;
  }
</style>
