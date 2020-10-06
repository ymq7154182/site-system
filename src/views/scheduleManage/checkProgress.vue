<template>
  <div>
    <div style="margin-top: 3vh;">
      <el-steps :active="2" align-center>
        <el-step  :title="item.durationDictName"  v-for="(item, index) in titleList" :key="index" @click.native="gotoOption(item, 'second')">
          <template slot="title">
            <div class="title_font" v-if="item.scheduleTime !== null">预估：{{item.scheduleTime}}</div>
            <div class="title_font" v-if="item.endTime !== null">完成：{{item.endTime}}</div>
            <div>
              {{item.durationDictName}}
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <el-dialog
      title="预计完成时间"
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
    <el-dialog title="迟缓操作" :visible.sync="showSlow">
      <el-form :model="formDefer">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="formDefer.duration2DictName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述内容" :label-width="formLabelWidth">
          <!--                <el-select v-model="form.content" placeholder="请选择活动区域">-->
          <el-input v-model="formDefer.processData" autocomplete="off"></el-input>
          <!--                  <el-option label="区域一" value="shanghai"></el-option>-->
          <!--                  <el-option label="区域二" value="beijing"></el-option>-->
          <!--                </el-select>-->
        </el-form-item>
        <el-form-item label="延缓原因" :label-width="formLabelWidth">
          <!--                <el-input v-model="form.reason" autocomplete="off"></el-input>-->
          <el-select v-model="formDefer.reason" placeholder="请选择">
            <el-option
              v-for="(item, index) in deferReasons"
              :key="index"
              :label="item.reason"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" :label-width="formLabelWidth">
          <el-input v-model="formDefer.principal" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="延缓(预计完成)时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="formDefer.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <!--                <el-input v-model="form.date" autocomplete="off"></el-input>-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSlow = false">取 消</el-button>
        <el-button type="primary" @click="defineReason()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="schedule-content">
      <el-row>
        <div class="border-top-left"></div>
        <div class="box-title">{{title}}</div>
        <div class="schedule-press">
          <el-steps direction="vertical" :active="1" :space="120">
            <el-step :title="item.duration2DictName" v-for="(item, index) in dataList" :key="index">
<!--            <el-step :title="item.duration2DictName" :description="item.content"  v-for="(item, index) in dataList" :key="index">-->
              <template slot="description">
                <div class="step-row">
<!--                <div class="step-row" v-for="item in dataList">-->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="processing_content">
<!--                    <tr style="border-radius: 0.1rem">-->
<!--                      <td style="color:rgba(230,230,230,0.9)" class="item-td">-->
<!--                        &lt;!&ndash;                        <div class="processing_content_detail" style="float:left;width:70%"><span >申请人&nbsp;&nbsp;<span style="color:#219AFF">圆领{{}}</span>&nbsp;&nbsp;提交了割接方案</span></div>&ndash;&gt;-->
<!--                        <div class="processing_content_detail" style="float:left;width:70%"><span >{{item.duration2DictName}}</span></div>-->
<!--&lt;!&ndash;                        <div class="processing_content_detail" style="float:left;width:70%"><span >{{item.duration2DictName}}&nbsp;&nbsp;{{item.content}}</span></div>&ndash;&gt;-->
<!--                        &lt;!&ndash;                        <div class="processing_content_detail" style="float:right;"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24</span> </div>&ndash;&gt;-->
<!--                        <div class="processing_content_detail" style="float:right;" v-if="item.endTime !== null"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;{{item.endTime}}</span> </div>-->
<!--                      </td>-->
<!--                    </tr>-->
                    <tr v-if="item.status === 1">
                      <td>
                        <div class="processing_content_detail" style="float:left;width:70%">
                          <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>
                          <span style="color:#919FB8" class="status-label" @click="submitOption('延缓', item)">延缓</span>
                          <span style="color:#919FB8" class="status-label" @click="submitOption('完成', item)">完成</span>
                        </div>
                      </td>
                    </tr>
                    <tr v-else>
                      <td>
                        <div class="processing_content_detail" style="float:left;width:70%">
                          <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>
                          <span v-if="item.status === 3" style="color:#919FB8" class="status-label-status">延缓</span>
                          <span v-if="item.status === 2" style="color:#919FB8" class="status-label-status">完成</span>
                        </div>
                      </td>
                    </tr>
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
  import {getOneSchedules, getTwoSchedules, submitDeferInfo, getDeferReasons, updateTimeByPlanId, finishSmallSchedule} from '@/api/scheduleManage'
  export default {
    name: 'checkProgress',
    mounted() {
      this.$store.dispatch('changeMsg', '进度管理');
      // this.gotoOption(0, 'init')
      this.getOneSchedules()
      this.getDeferReasons()
      // this.getDeferReasons()
    },
    data() {
      return {
        dataList: [], // 点击每一个进度，显示的详细进度条数据
        title: '', // 每一个大的进度的名字
        showRightTime: false, // 是否展示完成时间
        deferReasons: [], // 滞缓原因
        showSlow: false, // 展示迟缓的原因界面
        formLabelWidth: '110px',
        formDefer: { // 迟缓对象
          id: '',
          title: '',
          content: '',
          status: '',
          reason: '', // 滞缓原因
          date: '', // 完成时间
          principal: '', // 负责人
          processData: '' // 处理内容
        },
        form: {
          date: ''
        },
        id: -1, // 当前步骤id
        titleList: [], // 所有的大任务列表
      }
    },
    computed: {
      deptId () {
        return this.$store.state.deptId
      }
    },
    methods: {
      getDeferReasons () { // 滞缓原因
        getDeferReasons().then(res => {
          this.deferReasons = res.data.data
          // console.log('置换原因', res.data.data)
        })
      },
      defineReason () { // 提交滞缓原因
        submitDeferInfo({
          scheduleDurationSectionPlanId: this.formDefer.id,
          delaysDictId: this.formDefer.reason,
          context: this.deferReasons[this.formDefer.reason-1].reason,
          principal: this.formDefer.principal,
          planTime: this.formDefer.date.getFullYear() + '-' + (this.formDefer.date.getMonth() + 1) + '-' + this.formDefer.date.getDate()
        }).then(res => {
          console.log('提交滞缓', res.data)
          if(res.data.code === 200) {
            this.showSlow = false
            this.getTwoSchedules()
          }
        })
        // this.dataList[this.form.id].time = this.form.date.getFullYear() + '-' + (this.form.date.getMonth() + 1) + '-' + this.form.date.getDate() + ' '
        // + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        // console.log(this.dataList[this.form.id].time.length, this.form.date)
        // this.dataList[this.form.id].status = this.option
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      updateTime() { // 修改实际时间
        updateTimeByPlanId({
          constructionSiteId: this.deptId,
          constructionSiteName: '',
          durationDictId: 0,
          durationDictName: '',
          endTime: '',
          id: this.id,
          scheduleTime: this.form.date.getFullYear() + '-' + (this.form.date.getMonth() + 1) + '-' + this.form.date.getDate() + ' ',
          sortKey: '',
          status: ''
        }).then(res => {
          console.log('完成', res.data.data)
          if (res.data.code === 200) {
            this.getOneSchedules()
          }
        })
        // this.titleList[this.id].rightTime =
        // + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        // console.log(this.dataList[this.form.id].time.length, this.form.date)
        this.showRightTime = false
      },
      gotoOption (val, num) {
        if (num !== 'init') {
          this.showRightTime = true
          this.id = val.id
          this.title = val.durationDictName
        }
        this.getTwoSchedules()
      },
      getOneSchedules () { // 获取所有一级进度
        getOneSchedules({
          siteId: this.deptId
        }).then(res => {
          this.titleList = res.data.data
          this.id = res.data.data[0].id
          this.getTwoSchedules()
          // console.log(res.data)
        })
      },
      getTwoSchedules () { // 获取所有二级进度
        getTwoSchedules({
          planId: this.id
        }).then(res => {
          this.dataList = res.data.data
        })
      },
      submitOption (option, item) { // 延缓或者完成按钮
        console.log(item)
        if (option === '完成') {
          finishSmallSchedule({
            scheduleDurationSectionPlanId: item.id
          }).then(res => {
            if (res.data.code === 200) {
              console.log('状态为完成')
            }
          })
        } else {
          this.formDefer = item
          this.showSlow = true
        }

        // this.showSlow = true
        // this.option = option

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
  .status-label {
    cursor: pointer;
    padding: 0 0.2rem;
    margin-left: 0.3rem;
    border: 0.01rem solid #919FB8;
    border-radius: 0.1rem;
    background-color: #fff;
  }
  .status-label-status {
    cursor: pointer;
    padding: 0 0.2rem;
    margin-left: 0.3rem;
    border: 0.01rem solid #ffb91b;
    border-radius: 0.1rem;
    background-color: #ffb91b;
    color: #fff!important;
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
