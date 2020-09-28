<template>
  <div>
    <div style="margin-top: 3vh;">
      <el-steps :active="2" align-center>
        <el-step title="地基与基础" @click.native="gotoOption(1)"></el-step>
        <el-step title="主体结构" @click.native="gotoOption(2)"></el-step>
        <el-step title="建筑装饰装修" @click.native="gotoOption(3)"></el-step>
        <el-step title="建筑给水排水及采暖" @click.native="gotoOption(4)"></el-step>
        <el-step title="建筑电气" @click.native="gotoOption(5)"></el-step>
        <el-step title="智能建筑" @click.native="gotoOption(6)"></el-step>
        <el-step title="通风与空调" @click.native="gotoOption(7)"></el-step>
        <el-step title="电梯" @click.native="gotoOption(8)"></el-step>
        <el-step title="建筑节能" @click.native="gotoOption(9)"></el-step>
      </el-steps>
    </div>
    <div class="schedule-content">
      <el-row>
        <div class="border-top-left"></div>
        <div class="box-title">地基与基础</div>
        <div class="schedule-press">
          <el-steps direction="vertical" :active="1" :space="150">
            <el-step :title="item.title" :description="item.content"  v-for="(item, index) in dataList" :key="index">
              <template slot="description" >
                <div class="step-row" v-for="item in dataList">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="processing_content">
                    <tr style="border-radius: 0.1rem">
                      <td style="color:rgba(230,230,230,0.9)" class="item-td">
<!--                        <div class="processing_content_detail" style="float:left;width:70%"><span >申请人&nbsp;&nbsp;<span style="color:#219AFF">圆领{{}}</span>&nbsp;&nbsp;提交了割接方案</span></div>-->
                        <div class="processing_content_detail" style="float:left;width:70%"><span >{{item.title}}&nbsp;&nbsp;{{item.content}}</span></div>
<!--                        <div class="processing_content_detail" style="float:right;"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24</span> </div>-->
                        <div class="processing_content_detail" style="float:right;"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;{{item.time}}</span> </div>
                      </td>
                    </tr>
<!--                    <tr>-->
<!--                      <td>-->
<!--                        <div class="processing_content_detail" style="float:left;width:70%">-->
<!--                          <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>-->
<!--                          <span style="color:#919FB8">同意，建议通过</span></div>-->
<!--                      </td>-->
<!--                    </tr>-->
                  </table>
                </div>
              </template>

            </el-step>

          </el-steps>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scheduleManage',
    mounted() {
      this.$store.dispatch('changeMsg', '进度管理');
      this.gotoOption(1)
    },
    data() {
      return {
        dataList: [], // 点击每一个进度，显示的详细进度条数据
      }
    },
    methods: {
      gotoOption (val) {
        if (val === 1) {
          this.dataList = [
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-01'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-09'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-20'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-30'}]
        } else if (val === 2){
          this.dataList = [
            {title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-01'},
            {title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-10'},
            {title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-15'},
            {title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-20'}]
        } else {
          this.dataList = [
            {title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-01'},
            {title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-01'},
            {title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-01'},
            {title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-09-01'}]
        }
        // console.log(val)
      },
      refresh() {
        this.gotoOption(1)
        // this.alarmTypeChart.dispose();
        // this.alarmTrendChart.dispose();
        // this.initAlarmType();
        // this.initAlarmTrend();
      }
    }
  }
</script>

<style scoped>
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
