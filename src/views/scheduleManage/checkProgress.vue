<template>
  <div>
    <div style="margin-top: 3vh;">
      <el-steps :active="2" align-center>
        <el-step  :title="item.title"  v-for="(item, index) in titleList" :key="index" @click.native="gotoOption(item.id, 'second')">
          <template slot="title">
            <div class="title_font">预估：{{item.time}}</div>
            <div class="title_font">完成：{{item.rightTime}}</div>
            <div>
              {{item.title}}
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <el-dialog
      title="实际完成时间"
      :visible.sync="showRightTime"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="完成时间">
<!--          <el-col :span="11">-->
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
<!--          </el-col>-->
<!--          <el-col class="line" :span="2">-</el-col>-->
<!--          <el-col :span="11">-->
<!--            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
<!--          </el-col>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="showRightTime = false">取 消</el-button>
      <el-button type="primary" @click="updateTime">确 定</el-button>
      </span>
    </el-dialog>
    <div class="schedule-content">
      <el-row>
        <div class="border-top-left"></div>
        <div class="box-title">地基与基础</div>
        <div class="schedule-press">
          <el-steps direction="vertical" :active="1" :space="120">
            <el-step :title="item.title" :description="item.content"  v-for="(item, index) in dataList" :key="index">
              <template slot="description" >
                <div class="step-row">
<!--                <div class="step-row" v-for="item in dataList">-->
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
    name: 'checkProgress',
    mounted() {
      this.$store.dispatch('changeMsg', '进度管理');
      this.gotoOption(0, 'init')
    },
    data() {
      return {
        dataList: [], // 点击每一个进度，显示的详细进度条数据
        showRightTime: false, // 是否展示完成时间
        form: {
          date: ''
        },
        id: -1, // 当前步骤id
        titleList: [{title: '地基与基础', id: 0, time: '2020-08-01', rightTime: '2020-08-09'},{title: '主体结构', id: 1, time: '2020-08-01', rightTime: '2020-08-09'},
          {title: '建筑装饰装修', id: 2, time: '2020-08-01', rightTime: '2020-08-09'},{title: '建筑给水排水及采暖', id: 3, time: '2020-08-01', rightTime: '2020-08-09'},
          {title: '建筑电气', id: 4, time: '2020-08-01', rightTime: '2020-08-09'},{title: '智能建筑', id: 5, time: '2020-08-01', rightTime: '2020-08-09'},
          {title: '通风与空调', id: 6, time: '2020-08-01', rightTime: '2020-08-09'},{title: '电梯', id: 7, time: '2020-08-01', rightTime: '2020-08-09'},
          {title: '建筑节能', id: 8, time: '2020-08-01', rightTime: '2020-08-09'},],

      }
    },
    methods: {
      updateTime() { // 修改实际时间
        this.titleList[this.id].rightTime = this.form.date.getFullYear() + '-' + (this.form.date.getMonth() + 1) + '-' + this.form.date.getDate() + ' '
        // + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        // console.log(this.dataList[this.form.id].time.length, this.form.date)
        this.showRightTime = false
      },
      gotoOption (val, num) {
        if (num !== 'init') {
          this.showRightTime = true
          this.id = val
        }
        if (val === 0) {
          this.dataList = [
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-01'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-09'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-20'},
            {title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '2020-08-30'}]
        } else if (val === 1){
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
  .title_font {
    font-size: 12px;
    color: #fff;
    /*margin-bottom: 0.15rem;*/
    /*width: 100px;*/
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
