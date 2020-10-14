<template>
  <div class="app">
    <div class="notice_container">
      <div class="notice_left">
        <img src="../assets/homepage/laba.png">
        <span style="margin-left: 0.5rem">北京智慧工地新增一个项目引进了最新型建造方式......</span>
      </div>
      <!--<div class="notice_right">-->
        <!--<span>用户身份:</span>-->
        <!--<span style="color:#13cafd ">管理员</span>-->
        <!--<span style="margin-left: 0.1rem">在线人数:</span>-->
        <!--<span style="color:#13cafd ">5</span>-->
        <!--<span>人</span>-->
      <!--</div>-->
    </div>
    <div class="content_container">
      <el-row>
        <el-col :span="4">
          <div class="project">
            <div style="position: absolute;top: 0.2rem;left: 0.2rem">
              <span style="font-size: 0.2rem;color: #ffa454;">项目情况</span>
            </div>
            <div class="project_head">
              <div class="pro_item">
                <span style="position: absolute;top: 0.4rem;left: 0.4rem;color: #b0d530;">{{projectDetails.proCost}}</span>
              </div>
              <div class="pro_item_two">
                <span style="position: absolute;top: 0.4rem;left: 0.5rem;color: #e06666">{{projectTime}}</span>
              </div>
              <div class="pro_item_three">
                <span style="position: absolute;top: 0.4rem;left: 0.4rem;color: #e06666">{{projectDetails.proArea}}</span>
              </div>
            </div>
            <div class="project_item">
<!--              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">建设单位：精准医疗中心责任有限公司</span>-->
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">建设单位：<span>{{projectDetails.constructionUnitJs}}</span></span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">监理单位：<span>{{projectDetails.constructionControlUnit}}</span></span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">施工单位：<span>{{projectDetails.constructionUnitSg}}</span></span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">工程类别：<span v-if="projectDetails.protype===1">省重点项目</span></span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">备案编号：<span>{{projectDetails.proCode}}</span></span>
            </div>
          </div>
          <div class="people">
            <div style="position: absolute;top: 0.2rem;left: 0.2rem">
              <span style="font-size: 0.2rem;color: #ffa454;">人员管理</span>
            </div>
            <div class="people_head">
              <div class="peple_item">
                <div style="text-align: center;height: 0.33rem">
                  <span style="color: #9ddfef;height: 0.33rem;line-height: 0.33rem">项目登记人数</span>
                </div>
                <div style="text-align: center;height: 0.44rem">
                  <span style="color: #ffc000;font-size: 0.3rem">4522</span>
                </div>
              </div>
              <div class="peple_item">
                <div style="text-align: center;height: 0.33rem">
                  <span style="color: #9ddfef;height: 0.33rem;line-height: 0.33rem">今日出勤人数</span>
                </div>
                <div style="text-align: center;height: 0.44rem">
                  <span style="color: #ffc000;font-size: 0.3rem">4102</span>
                </div>
              </div>
            </div>
            <div id="mychart21">
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="homePage_dialog">
          <div style="padding-left: 0.3rem;margin-right: 0.3rem">
            <div class="video_container">
              <el-image :src="require('../assets/homepage/button.png')" fill="contain" style="height: 0.4rem; width: 4rem; margin: 0.17rem 0 0 0.17rem; " />
            </div>
            <div class="process">
              <div class="process_content">
<!--                <div class="border-top-left"></div>-->
<!--                <div class="box-title">项目进度</div>-->
                <span>项目进度</span>
                <div style="margin-top: 3vh;">
                  <el-steps :active="active" align-center>
                    <el-step  :title="item.durationDictName"  v-for="(item, index) in titleList" :key="index" @click.native="gotoOption(item)">
                        <template slot="title">
                          <div>
                            {{item.durationDictName}}
                          </div>
                          <div class="title_font">{{item.scheduleTime}}</div>
                        </template>
                    </el-step>
                  </el-steps>
                </div>

              </div>
            </div>
          </div>
          <el-dialog
            :title="title + '具体进度情况'"
            :visible.sync="dialogVisible"
            width="70%"
            class="home_second"
            :before-close="handleClose">
            <div class="wc_time" v-if="endTime !== null">完成时间：{{endTime}}</div>
<!--            <div class="box-title">{{title}}</div>-->
            <div class="schedule-press">
              <el-steps direction="vertical" :space="120">
<!--              <el-steps direction="vertical" :active="1" :space="120">-->
                <el-step :title="item.duration2DictName" v-for="(item, index) in dataList" :key="index">
                  <!--            <el-step :title="item.duration2DictName" :description="item.content"  v-for="(item, index) in dataList" :key="index">-->
                  <template slot="description">
                    <div class="step-row">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="processing_content">
                        <tr v-if="item.status === 1">
                          <td>
                            <div class="processing_content_detail" style="float:left;width:70%">
                              <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>
                              <span style="color:#919FB8" class="status-label" @click="submitOption('延缓', item)">延缓</span>
                              <span style="color:#919FB8" class="status-label" @click="submitOption('完成', item)">完成</span>
                              <span style="color:#919FB8" class="status-label" @click="submitOption('错误信息报告', item)">错误信息报告</span>

                            </div>
                          </td>
                        </tr>
                        <tr v-else>
                          <td>
                            <div class="processing_content_detail" style="float:left;width:70%">
                              <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>
                              <span v-if="item.status === 3" style="color:#919FB8" class="status-label-status" @click="checkStatus(item)">延缓</span>
                              <span v-if="item.status === 2" style="color:#919FB8" class="status-label-status" @click="checkStatus(item)">完成</span>
                              <span style="color:#919FB8" class="status-label" @click="submitOption('错误信息报告', item)">错误信息报告</span>

                            </div>
                            <div class="processing_content_detail" style="float:right;color: #7c7c7c" v-if="item.endTime !== null"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;{{item.endTime}}</span> </div>

                          </td>
                        </tr>
                      </table>
                    </div>
                  </template>

                </el-step>

              </el-steps>
            </div>
<!--            <div class="schedule-press">-->
<!--              <el-steps direction="vertical" :active="1" :space="150">-->
<!--&lt;!&ndash;                <el-step :key="index">&ndash;&gt;-->
<!--                <el-step :title="item.title" :description="item.content"  v-for="(item, index) in dataList" :key="index">-->
<!--                  <template slot="description" >-->
<!--                    <div class="step-row">-->
<!--&lt;!&ndash;                    <div class="step-row" v-for="item in dataList">&ndash;&gt;-->
<!--                      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="processing_content">-->
<!--                        <tr style="border-radius: 0.1rem">-->
<!--                          <td style="color: #3c3c3c" class="item-td">-->
<!--                            &lt;!&ndash;                        <div class="processing_content_detail" style="float:left;width:70%"><span >申请人&nbsp;&nbsp;<span style="color:#219AFF">圆领{{}}</span>&nbsp;&nbsp;提交了割接方案</span></div>&ndash;&gt;-->
<!--                            <div class="processing_content_detail" style="float:left;width:70%"><span >{{item.title}}&nbsp;&nbsp;{{item.content}}</span></div>-->
<!--                            &lt;!&ndash;                        <div class="processing_content_detail" style="float:right;"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;昨天12:24</span> </div>&ndash;&gt;-->
<!--                            <div class="processing_content_detail" style="float:right;" v-if="item.time.length > 0"><span ><i class="el-icon-time"></i>&nbsp;&nbsp;{{item.time}}</span> </div>-->
<!--                          </td>-->
<!--                        </tr>-->
<!--                        <tr v-if="form.id!==item.id">-->
<!--                          <td>-->
<!--                            <div class="processing_content_detail" style="float:left;width:70%">-->
<!--                              <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>-->
<!--                                <span style="color:#919FB8" class="status-label" @click="submitOption('延缓', item)">延缓</span>-->
<!--                                <span style="color:#919FB8" class="status-label" @click="submitOption('完成', item)">完成</span>-->
<!--                              </div>-->
<!--&lt;!&ndash;                              <span style="color:#919FB8">同意，建议通过</span></div>&ndash;&gt;-->
<!--                          </td>-->
<!--                        </tr>-->
<!--                        <tr v-else>-->
<!--                          <td>-->
<!--                            <div class="processing_content_detail" style="float:left;width:70%">-->
<!--                              <div style="float:left;width: 2px;height: 20px; background:#C7D4E9;margin-left:10px;margin-right:10px"></div>-->
<!--                              <span style="color:#919FB8" class="status-label-status">{{item.status}}</span>-->
<!--                            </div>-->
<!--                            &lt;!&ndash;                              <span style="color:#919FB8">同意，建议通过</span></div>&ndash;&gt;-->
<!--                          </td>-->
<!--                        </tr>-->
<!--                      </table>-->
<!--                    </div>-->
<!--                  </template>-->

<!--                </el-step>-->

<!--              </el-steps>-->
<!--            </div>-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="requestData">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="迟缓操作" :visible.sync="showSlow">
            <el-form :model="form">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="form.duration2DictName" autocomplete="off" class="item-defer" :disabled="disabledStr"></el-input>
              </el-form-item>

              <el-form-item label="延缓原因" :label-width="formLabelWidth">
                <!--                <el-input v-model="form.reason" autocomplete="off"></el-input>-->
                <el-select v-model="form.reason" placeholder="请选择" class="item-defer" :disabled="disabledStr">
                  <el-option
                    v-for="(item, index) in deferReasons"
                    :key="index"
                    :label="item.reason"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原因描述" :label-width="formLabelWidth">
                <el-input v-model="form.context" autocomplete="off" class="item-defer" :disabled="disabledStr"></el-input>
              </el-form-item>
              <el-form-item label="负责人" :label-width="formLabelWidth">
                <el-input v-model="form.principal" autocomplete="off" class="item-defer" :disabled="disabledStr"></el-input>
              </el-form-item>
              <el-form-item label="延缓(预计完成)时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择日期"
                  class="item-defer" :disabled="disabledStr">
                </el-date-picker>
                <!--                <el-input v-model="form.date" autocomplete="off"></el-input>-->
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showSlow = false">取 消</el-button>
              <el-button type="primary" @click="defineReason()" :disabled="disabledStr">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog
            title="完成时间"
            :visible.sync="showComplete"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="formComplete" label-width="80px">
              <el-form-item label="完成时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="formComplete.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="showComplete = false">取 消</el-button>
      <el-button type="primary" @click="completeTime">确 定</el-button>
      </span>
          </el-dialog>
        </el-col>
        <el-col :span="8">
          <el-row>
            <div class="green">
              <div style="padding-top: 0.2rem;margin-left: 0.2rem">
                <span style="font-size: 0.2rem;color: #ffa454;">绿色施工</span>
              </div>
              <div class="green_container" style="display: flex;justify-content:space-evenly">
                <div class="green_one" style="font-size: 0.15rem">
                  <div style="text-align: center">
                    <img src="../assets/homepage/yin.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.todayweather.week}}</p>
                    <p style="color: #fefefe">{{this.todayweather.day}}</p>
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe"><span style="font-size: 0.5rem">{{this.todayweather.tem}}</span>晴</p>
                    <p style="color: #fefefe">{{this.todayweather.tem1}}-{{this.todayweather.tem2}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.1rem">
                    <p style="color: #fefefe">{{this.todayweather.wea}}</p>
                    <p style="color: #fefefe">{{this.todayweather.win_speed}}</p>
                  </div>
                </div>
                <div class="green_two" style="width: 1.5rem">
                  <div style="position: relative;margin-top: 0.1rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/wendu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">温度</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">{{this.todayweather.tem}}</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/shidu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">湿度</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">84%</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/fengsu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">风速</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/zaoying.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">噪音</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">43</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/pm.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">PM2.5</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">274</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/ten.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">PM10</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">358</span>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.firstweather.week}}</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">{{this.firstweather.day}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/yingtian.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.firstweather.tem1}}-{{this.firstweather.tem2}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">{{this.firstweather.wea}}</p>
                    <p style="color: #fefefe">{{this.firstweather.win_speed}}</p>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.secondweather.week}}</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">{{this.secondweather.day}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/yingtian.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.secondweather.tem1}}-{{this.secondweather.tem2}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">{{this.secondweather.wea}}</p>
                    <p style="color: #fefefe">{{this.secondweather.win_speed}}</p>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.thirdweather.week}}</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">{{this.thirdweather.day}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/qingtian.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">{{this.thirdweather.tem1}}-{{this.thirdweather.tem2}}</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">{{this.thirdweather.wea}}</p>
                    <p style="color: #fefefe">{{this.thirdweather.win_speed}}</p>
                  </div>
                </div>
                <!--                <img src="../assets/homepage/shigong.png" style="margin-left: 1.6rem;width:6rem;height: 3rem">-->
              </div>
            </div>
          </el-row>
          <el-row style="margin-top: 0.1rem">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="thing">
                  <div style="position: absolute;top: 0.2rem;left: 0.2rem">
                    <span style="font-size: 0.2rem;color: #ffa454;">设备管理</span>
                  </div>
                  <div id="mychart24"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="safe">
                  <div style="position: absolute;top: 0.2rem;left: 0.2rem">
                    <span style="font-size: 0.2rem;color: #ffa454;">安全管理</span>
                  </div>
                  <div id="mychart22"></div>
                </div>
              </el-col>
            </el-row>
          </el-row>
          <el-row style="margin-top: 0.15rem">
            <div class="quality">
              <div style="position: absolute;top: 0.2rem;left: 0.2rem">
                <span style="font-size: 0.2rem;color: #ffa454;">质量管理</span>
              </div>
              <div id="mychart13"></div>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getDeferReasons, getDeferInfo, submitDeferInfo, getOneSchedules, getTwoSchedules, finishSmallSchedule, getErrorInfo} from '@/api/scheduleManage'
  import { getSite } from '@/api/dataManage'
  import { getGongDiNameById,screenName } from '@/api/projectOverview'
  import { getSafeOrQualityChartData,getProjectDetails,getProjectTimeInformation } from '@/api/projectOverview.js'
  import axios from 'axios'
  require('echarts/theme/macarons')
    export default {
        name: "homePage",
      beforeMount(){
        // this.getProDetails()
      },
      mounted() {
        this.$store.dispatch('changeMsg', '项目概览')
        this.getUrl()
        this.getOneSchedules() // 获取所有一级进度
        this.getDeferReasons() // 获取滞缓原因

        // this.getTwoSchedules() // 获取所有二级进度
        // this.inchart13()
        this.chart13Res()
        this.inchart24()
        this.chart24Res()
        // this.inchart22()
        this.chart22Res()
        this.inchart21()
        this.chart21Res()
        this.getWeatherData()

        this.getProDetails()
        this.getsiteName()
        this.getProjectName()
        this.getProjectTime()
        // setTimeout(()=>{
        //   this.verifyProjectName()
        // },100)
        setTimeout(()=>{
          this.inchart13()
        },100)
        setTimeout(()=>{
          this.inchart22()
        },100)
        // window.onload = function () {
        //
        // }
      },
      data(){
          return{
            showComplete: false, // 选择完成时间框
            currentSche: {},
            formComplete: {
              date: ''
            },
            todayweather:[],
            firstweather:[],
            secondweather:[],
            thirdweather:[],
            projectTime: '',
            projectDetails: {},
            projectName: '',
            flag: 0, // 是否展示延缓和完成按钮
            // titleList: [{title: '地基与基础', id: 0, time: '2020-08-01'},{title: '主体结构', id: 1, time: '2020-08-01'},{title: '建筑装饰装修', id: 2, time: '2020-08-01'},{title: '建筑给水排水及采暖', id: 3, time: '2020-08-01'},{title: '建筑电气', id: 4, time: '2020-08-01'},{title: '智能建筑', id: 5, time: '2020-08-01'},
            //   {title: '通风与空调', id: 6, time: '2020-08-01'},{title: '电梯', id: 7, time: '2020-08-01'},{title: '建筑节能', id: 8, time: '2020-08-01'},],
            title: '', // 每一个大的进度的名字
            id: -1, // 当前步骤id
            titleList: [], // 所有的大任务列表
            myChart13: '',
            myChart24: '',
            myChart22: '',
            myChart21: '',
            dataList: [],
            dialogVisible: false,
            slowData: [], // 迟缓对象
            showSlow: false,
            formLabelWidth: '110px',
            option: '', // 完成还是迟缓
            deferReasons: [], // 滞缓原因列表
            active: 0,
            form: {
              id: '',
              duration2DictName: '',
              context: '',
              status: '',
              reason: '', // 滞缓原因
              endTime: '', // 完成时间
              principal: '', // 负责人
              processData: '' // 处理内容
            },
            disabledStr: false,
            endTime: '', // 某个大进度完成时间
          }
      },
      computed: {
          deptId () {
            return localStorage.getItem('siteId')
          },
          schedulePlanId () {
            return this.$store.state.schedulePlanId
          }
      },
      methods:{
        requestData: function(){
          this.dialogVisible = false
          console.log('重新获取信息')
          this.getOneSchedules() // 获取所有一级进度
        },
          getWeatherData:function(){
            axios({
              url: 'https://www.tianqiapi.com/api/',
              method: "get",
              params: {
                version: 'v1',
                city: '石家庄',      // 若不提供城市名，会根据本机IP获取当地天气
                appid: '55828931',      // 到该网站上注册申请（操作很简单）
                appsecret: 'U54NAK5q'
              },
              headers: {
                'Content-type':'application/x-www-form-urlencoded'
              },
              data: []
            }).then(response=>{
              console.log('测试天气数据')
              console.log(response.data.data)
              this.todayweather = response.data.data[0]
              this.firstweather = response.data.data[1]
              this.secondweather = response.data.data[2]
              this.thirdweather = response.data.data[3]
            })
          },
        getProDetails: function(){
          const prams = {
            deptId: localStorage.getItem('siteId')
          }
          getProjectDetails(prams).then(response=>{
            console.log('获取项目的详细数据')
            console.log(response.data)
            this.projectDetails = response.data
            console.log('测试projectDetails')
            console.log(this.projectDetails.addressAll)
          })
        },
        getProjectTime: function(){
          const prams = {
            deptId: localStorage.getItem('siteId')
          }
          getProjectTimeInformation(prams).then(response=>{
            console.log('获取项目的时间详细数据')
            console.log(response.data.msg)
            var temTime = response.data.msg
            var index = 0
            for(let i = 0;i<temTime.length;i++){
              if(temTime[i] === '天' ){
                index= i
                break
              }
            }
            console.log(temTime.substring(0,index))
            this.projectTime = temTime.substring(0,index)
            console.log(this.projectTime)
          })
        },
        getProjectName: function(){
          const prams = {
            siteId: localStorage.getItem('siteId')
          }
          getGongDiNameById(prams).then(response=>{
            console.log('测试根据id获取项目名')
            console.log(response.data.data)
            this.projectName = response.data.data.deptName
          })
        },
        verifyProjectName: function(){
          const prams = {
            name: this.projectName
          }
          screenName(prams).then(response=>{
            console.log('测试校验项目名称')
            console.log(response.data)
          })
        },
        getDeferReasons () { // 滞缓原因
          getDeferReasons().then(res => {
            this.deferReasons = res.data.data
            // console.log('置换原因', res.data.data)
          })
        },
        checkStatus (item) { // 查看滞缓和完成信息
          if (item.status === 3) {
            getDeferInfo({
              scheduleDurationSectionPlanId: item.id
            }).then(res => {
              console.log(res.data, item)
              this.form.principal = res.data.data.principal
              this.form.duration2DictName = item.duration2DictName
              this.form.endTime = res.data.data.planTime
              this.form.reason = res.data.data.delaysDictId
              this.form.context = res.data.data.context
              this.showSlow = true
              this.disabledStr = true
            })
            // this.formDefer = item

          }
        },
        // getOneSchedules () { // 获取所有一级进度
        //   getOneSchedules({
        //     siteId: this.deptId
        //   }).then(res => {
        //     this.titleList = res.data.data
        //     this.id = res.data.data[0].id
        //     this.title = res.data.data[0].durationDictName
        //     this.endTime = res.data.data[0].endTime
        //     console.log(res.data)
        //   })
        // },
        getOneSchedules () { // 获取所有一级进度
            // console.log('进度测试id')
          // console.log(localStorage.getItem('siteId'))
          getOneSchedules({
            siteId: this.deptId
          }).then(res => {
            // console.log('获取进度数据')
            // console.log(res.data.data)
            this.titleList = res.data.data
            // this.id = res.data.data[0].id
            // this.title = res.data.data[0].durationDictName
            for (let i in this.titleList) {
              // console.log('i', i)
              if (this.titleList[i].endTime === null) { // 如果有完成时间，则当前转态变为完成，下一个变成正在进行
                this.id = this.titleList[parseInt(i)].id
                this.title = this.titleList[parseInt(i)].durationDictName
                // console.log(this.id, this.title)
                this.$nextTick(() => {
                  setTimeout(() => {
                    // let currentNode = document.querySelector('.el-tabs__content .el-tab-pane')
                    // console.log('currentNode:', currentNode)
                    let steps = document.querySelectorAll('.el-steps .el-step')
                    // console.log('step', steps, steps[parseInt(i)])
                    for (let j = 0; j < i;j++) {
                      steps[parseInt(j)].querySelector('.el-step__head').className = 'el-step__head is-finish'
                      steps[parseInt(j)].querySelector('.el-step__main .el-step__title').className = 'el-step__title is-finish'
                    }
                    let waiting = steps[parseInt(i)].querySelector('.el-step__head.is-wait')
                    let waitingTitles = steps[parseInt(i)].querySelector('.el-step__main .el-step__title.is-wait')
                    waiting.className= 'el-step__head is-process'
                    waitingTitles.className = 'el-step__title is-process'
                  }, 0)
                })
                break
              } else {
                if(i == this.titleList.length - 1) {
                  console.log('chenglima')
                  this.id = this.titleList[parseInt(i)].id
                  this.title = this.titleList[parseInt(i)].durationDictName
                  getTwoSchedules({
                    planId: this.id
                  }).then(res => {
                    this.dataList = res.data.data
                  })
                  this.$nextTick(() => {
                    let steps = document.querySelectorAll('.el-steps .el-step')
                    console.log('step', steps, steps[parseInt(i)])
                    for (let j = 0; j <= i;j++) {
                      steps[parseInt(j)].querySelector('.el-step__head').className = 'el-step__head is-finish'
                      steps[parseInt(j)].querySelector('.el-step__main .el-step__title').className = 'el-step__title is-finish'
                    }
                  })
                }
              }

            }
            // for (let i in this.titleList) {
            //   if (this.titleList[i].endTime !== null) { // 如果有完成时间，则当前转态变为完成，下一个变成正在进行
            //     this.id = this.titleList[parseInt(i)+1].id
            //     this.title = this.titleList[parseInt(i)+1].durationDictName
            //     // this.getTwoSchedules()
            //     this.$nextTick(() => {
            //       setTimeout(() => {
            //         let steps = document.querySelector('.el-steps')
            //         console.log('steps', steps)
            //         // console.log(steps[i + 1].querySelector('.el-step__head.is-process'))
            //         let process = steps.querySelector('.el-step .el-step__head.is-process')
            //         let processTitle = steps.querySelector('.el-step .el-step__main .el-step__title.is-process')
            //         process.className = 'el-step__head is-finish'
            //         processTitle.className = 'el-step__title is-finish'
            //         let waitings = steps.querySelectorAll('.el-step .el-step__head.is-wait')
            //         let waitingTitles = steps.querySelectorAll('.el-step .el-step__main .el-step__title.is-wait')
            //         waitings[0].className = 'el-step__head is-process'
            //         waitingTitles[0].className = 'el-step__title is-process'
            //       }, 0)
            //       // // let currentNode = document.querySelector('.el-tabs__content .el-tab-pane')
            //       // // console.log('currentNode:', currentNode)
            //       // let steps = document.querySelector('.el-steps')
            //       // console.log('steps', steps)
            //       // // console.log(steps[i + 1].querySelector('.el-step__head.is-process'))
            //       // let process = steps.querySelector('.el-step .el-step__head.is-process')
            //       // let processTitle = steps.querySelector('.el-step .el-step__main .el-step__title.is-process')
            //       // process.className = 'el-step__head is-finish'
            //       // processTitle.className = 'el-step__title is-finish'
            //       // let waitings = steps.querySelectorAll('.el-step .el-step__head.is-wait')
            //       // let waitingTitles = steps.querySelectorAll('.el-step .el-step__main .el-step__title.is-wait')
            //       // waitings[0].className = 'el-step__head is-process'
            //       // waitingTitles[0].className = 'el-step__title is-process'
            //       // // that.id = that.titleList[i+1].id
            //       // // that.title = that.titleList[i+1].durationDictName
            //       // // console.log(that.id, that.title)
            //     })
            //   }
            //   // break
            // }

          })
        },
        getTwoSchedules () { // 获取所有二级进度
          getTwoSchedules({
            planId: this.id
          }).then(res => {
            this.dataList = res.data.data
          })
        },
        completeTime () { // 完成时间
          finishSmallSchedule({
            dataTime: this.formComplete.date.getFullYear() + '-' + (this.formComplete.date.getMonth() + 1) + '-' + this.formComplete.date.getDate() + ' ',
            scheduleDurationSectionPlanId: this.currentSche.id
          }).then(res => {
            if (res.data.code === 200) {
              console.log('完成按钮', this.currentSche)
              this.getTwoSchedules()
              this.showComplete = false
              if (this.currentSche.scheduleEnd === 1) { // 表示是最后一个小进度
                this.getOneSchedules()
              }
            }
          })
        },
        defineReason () { // 提交滞缓原因
          submitDeferInfo({
            scheduleDurationSectionPlanId: this.form.id,
            delaysDictId: this.form.reason,
            context: this.form.context,
            principal: this.form.principal,
            planTime: this.form.endTime.getFullYear() + '-' + (this.form.endTime.getMonth() + 1) + '-' + this.form.endTime.getDate()
          }).then(res => {
            console.log('提交滞缓', res.data)
            if(res.data.code === 200) {
              this.showSlow = false
              this.getTwoSchedules()
            }
          })
        },
        submitOption (option, item) {
          if (option === '完成') {
            this.showComplete = true
            this.currentSche = item
          } else if (option === '延缓') {
            this.disabledStr = false
            this.form = item
            this.showSlow = true
          } else if (option === '错误信息报告') {
            this.$router.push({
              path: '/infoRecord',
              // name: 'infoRecord',
              query: {
                planId: item.id,
                sectionId: this.id,
                sitename: localStorage.siteName
              }
            })
          }
          // this.form = item
          // this.showSlow = true
          // this.option = option
          // console.log(this.form)
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        gotoOption (val) {
          console.log(val)
          this.id = val.id
          this.title = val.durationDictName
          this.dialogVisible = true
          this.endTime = val.endTime
          this.getTwoSchedules()
          // console.log(val)
          // if (val === 0) {
          //   this.dataList = [
          //     {id: 0, title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 1, title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 2, title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 3, title: '地基与基础', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'}
          //     ]
          // } else if (val === 1){
          //   this.dataList = [
          //     {id: 0, title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 1, title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 2, title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 3, title: '主体结构', content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '进行中'}]
          // } else {
          //   this.dataList = [
          //     {id: 0, title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '迟缓'},
          //     {id: 1, title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 2, title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'},
          //     {id: 3, title: '流程中' + val, content: '混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，混凝土，够凝土，', time: '', status: '完成'}]
          // }
          // console.log(val)
        },
        inchart13() {
          const prams = {
            classes: '质量',
            sitename: localStorage.getItem('siteName')
          }
          var getData = []
          getSafeOrQualityChartData(prams).then(response=>{
            console.log('测试质量管理获取数据')
            console.log(response.data.data)
            for(let i = 0;i<response.data.data.length;i++){
              let obj = {}
              obj.value = response.data.data[i].counts
              obj.unit = '人'
              obj.name  = response.data.data[i].check_type_offspring
              getData.push(obj)
            }
            console.log('测试getData')
            console.log(getData)
          })
          this.myChart13 = this.$echarts.init(document.getElementById('mychart13'));
          let innerFontColor = '#FFFFFF';
          let outerFontColor = '#666666';
          let scale = 1;
          let echartData = {
            inner: [
              // {value:335,unit:'人', name:'明泽瑞达', selected:true,
              // },
              // {value:679,unit:'人', name:'嘉宇天泽'},
              // {value:1548,unit:'人', name:'御达捷'}
            ],
            outer: [
              {value:310,unit:'人', name:'塔基与基础工程'},
              {value:234, unit:'人',name:'主体结构工程'},
              {value:135, unit:'人',name:'防水工程'},
              {value:310,unit:'人', name:'给排水及采暖工程'},
              {value:234, unit:'人',name:'电气安装工程'},
              {value:135, unit:'人',name:'建筑智能化工程'},
            ]
          }
          echartData.outer = getData
          console.log('测试outer')
          console.log(echartData.outer)
          let legend1 = echartData.inner.map(v => v.name);
          let legend2 = echartData.outer.map(v => v.name);
          let legendData = [...legend1, ...legend2];

          var option = {
            color: ["#6f5553","#c14089","#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a",
              "#8d98b3","#FFEA01","#B8D07C","#fca4bb","#dc69aa",
            ],
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            // legend: {
            //   // orient: 'vertical',
            //   // right: 30,
            //   // top: 'center',
            //   // itemWidth: 14 * scale,
            //   // itemHeight: 14 * scale,
            //   // data:legendData,
            //   // textStyle: {
            //   //   color: '#2CABE3',
            //   //   fontSize: 12,
            //   // },
            // },
            series: [
              {
                name:'人员统计',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],
                label: {
                  normal: {
                    position: 'inner'
                  }
                },
                labelLine: {
                  normal: {
                    show: false,

                  }
                },
                data:echartData.inner
              },
              {
                name:'人员统计',
                type:'pie',
                radius: ['60%', '80%'],
                data:echartData.outer,
                // label: {
                //   normal: {
                //     color: outerFontColor,
                //     fontSize: 12 * scale,
                //     lineHeight: 16 * scale,
                //     padding: [20 * scale, 1,0,0],
                //     formatter: function(params){
                //       // return '{a|'+params.name+'}\n{b|'+params.percent+'}{a|'+(params.data.unit || '')+'}'
                //       return params.name+'\n{b|'+params.percent+'}'+(params.data.unit || '');
                //
                //     },
                //     rich:{
                //       b: {
                //         fontWeight: 'bold',
                //         color: outerFontColor
                //       }
                //     }
                //   }
                // }
              }
            ]
          };
          setTimeout(()=>{
            this.myChart13.setOption(option)
          },600)
        },
        inchart24() {
          this.myChart24 = this.$echarts.init(document.getElementById('mychart24'),'macarons')
          var option = {
            // tooltip: {
            //   trigger: 'item',
            //   formatter: '{a} <br/>{b}: {c}'
            // },
            angleAxis: {
              type: 'category',
              data: ['塔式起重机', '物料提升机', '施工升降机', '特种设备', '视频设备'],
              textStyle:{
                fontSize:16,
                color:'#544bfc'
              }
            },
            radiusAxis: {
            },
            polar: {
              radius: ['10%', '50%'],
              center: ["50%", "50%"],
            },
            label:{
              normal:{
                show:true,
                position:'top',
                textStyle:{
                  fontSize:16,
                  color:'#B0CEFC'
                }
              }
            },
            series: [{
              radius: ['20%', '70%'],
              center: ["20%", "20%"],
              type: 'bar',
              data: [1, 2, 3, 4, 3, 5, 1],
              coordinateSystem: 'polar',
              name: '异常',
              stack: 'a',
            }, {
              radius: ['20%', '70%'],
              center: ["90%", "90%"],
              type: 'bar',
              data: [15, 24, 16, 33, 23, 22, 21],
              coordinateSystem: 'polar',
              name: '总数',
              stack: 'a'
            }],
            legend: {
              show: true,
              data: ['异常', '总数'],
              left: 'right',
              textStyle: {
                color: '#2CABE3',
                fontSize: 12,
              },
            }
          }
          // var option = {
          //   // backgroundColor:"#0B1837",
          //   color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
          //   grid: {
          //     left: -100,
          //     top: 50,
          //     bottom: 10,
          //     right: 10,
          //     containLabel: true
          //   },
          //   tooltip: {
          //     trigger: 'item',
          //     formatter: "{b} : {c} ({d}%)"
          //   },
          //   legend: {
          //     type: "scroll",
          //     orient: "vartical",
          //     // x: "right",
          //     top: "center",
          //     right: "15",
          //     // bottom: "0%",
          //     itemWidth: 16,
          //     itemHeight: 8,
          //     itemGap: 16,
          //     textStyle: {
          //       color: '#A3E2F4',
          //       fontSize: 12,
          //       fontWeight: 0
          //     },
          //     data: ['火灾', '触电', '其他', '设备倾覆', '结构坍塌', '高空坠物']
          //   },
          //   polar: {},
          //   angleAxis: {
          //     interval: 1,
          //     type: 'category',
          //     data: [],
          //     z: 10,
          //     axisLine: {
          //       show: false,
          //       lineStyle: {
          //         color: "#0B4A6B",
          //         width: 1,
          //         type: "solid"
          //       },
          //     },
          //     axisLabel: {
          //       interval: 0,
          //       show: true,
          //       color: "#0B4A6B",
          //       margin: 8,
          //       fontSize: 16
          //     },
          //   },
          //   radiusAxis: {
          //     min: 40,
          //     max: 100,
          //     interval: 20,
          //     axisLine: {
          //       show: false,
          //       lineStyle: {
          //         color: "#0B3E5E",
          //         width: 1,
          //         type: "solid"
          //       },
          //     },
          //     axisLabel: {
          //       formatter: '{value} %',
          //       show: false,
          //       padding: [0, 0, 20, 0],
          //       color: "#0B3E5E",
          //       fontSize: 16
          //     },
          //     splitLine: {
          //       lineStyle: {
          //         color: "#0B3E5E",
          //         width: 2,
          //         type: "solid"
          //       }
          //     }
          //   },
          //   calculable: true,
          //   series: [{
          //     type: 'pie',
          //     radius: ["10%", "20%"],
          //     hoverAnimation: false,
          //     labelLine: {
          //       normal: {
          //         show: false,
          //         length: 30,
          //         length2: 55
          //       },
          //       emphasis: {
          //         show: false
          //       }
          //     },
          //     data: [{
          //       name: '',
          //       value: 0,
          //       itemStyle: {
          //         normal: {
          //           color: "#0B4A6B"
          //         }
          //       }
          //     }]
          //   }, {
          //     type: 'pie',
          //     radius: ["10%", "10%"],
          //     hoverAnimation: false,
          //     labelLine: {
          //       normal: {
          //         show: false,
          //         length: 30,
          //         length2: 55
          //       },
          //       emphasis: {
          //         show: false
          //       }
          //     },
          //     name: "",
          //     data: [{
          //       name: '',
          //       value: 0,
          //       itemStyle: {
          //         normal: {
          //           color: "#0B4A6B"
          //         }
          //       }
          //     }]
          //   },{
          //     stack: 'a',
          //     type: 'pie',
          //     radius: ['20%', '50%'],
          //     roseType: 'area',
          //     zlevel:10,
          //     label: {
          //       normal: {
          //         show: true,
          //         formatter: "{c}",
          //         textStyle: {
          //           fontSize: 12,
          //         },
          //         position: 'outside'
          //       },
          //       emphasis: {
          //         show: true
          //       }
          //     },
          //     labelLine: {
          //       normal: {
          //         show: true,
          //         length: 20,
          //         length2: 55
          //       },
          //       emphasis: {
          //         show: false
          //       }
          //     },
          //     data: [{
          //       value: 10,
          //       name: '火灾'
          //     },
          //       {
          //         value: 5,
          //         name: '触电'
          //       },
          //       {
          //         value: 15,
          //         name: '其他'
          //       },
          //       {
          //         value: 25,
          //         name: '设备倾覆'
          //       },
          //       {
          //         value: 20,
          //         name: '结构坍塌'
          //       },
          //       {
          //         value: 35,
          //         name: '高空坠物'
          //       }
          //     ]
          //   }, ]
          // }
          this.myChart24.setOption(option)
        },
        inchart22() {
          const prams = {
            classes: '安全',
            sitename: localStorage.getItem('siteName')
          }
          var data = []
          getSafeOrQualityChartData(prams).then(response=>{
            console.log('测试安全管理获取数据')
            console.log(response.data.data)
            for(let i = 0;i<response.data.data.length;i++){
              let obj = {}
              obj.value = response.data.data[i].counts
              obj.name  = response.data.data[i].check_type_offspring
              data.push(obj)
            }
            console.log('测试safeData')
            console.log(data)
          })
          this.myChart22 = this.$echarts.init(document.getElementById('mychart22'));
          // var data = [
          //   {
          //     value: 12,
          //     name: '施工安全'
          //   },
          //   {
          //     value: 5,
          //     name: '物资安全'
          //   },
          //   {
          //     value: 13,
          //     name: '设备安全'
          //   },
          //   {
          //     value: 5,
          //     name: '人员安全'
          //   }
          // ];
          var color = ['#61a0a8', '#F87D7C', '#41E1FF', '#55D5B5', '#616BA6', '#6978F2', '#3769F4', '#01FFFF', '#FEDF00']
          var option = {
            // backgroundColor:'#021434',
            color: color,
            title: [{
              left: '60%',
              top: '40%',
              textAlign: 'center',
              textStyle: {
                fontSize: '16',
                // fontWeight:'600',
                color: 'rgb(106,192,240)',
                textAlign: 'center',
              },
            }],
            legend: {
              orient: 'vertical',
              left: 10,
              top: '15%',
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 15,
              textStyle: {
                color: '#ACCFFF',
                fontSize: 12,
              },
              data: ['塔吊', '遵章守纪', '楼梯口防护', '电梯口防护',  '安全教育','施工机具']
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            series: [{
              // name: '访问来源',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ["43%", "60%"],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                },

              },
              // data: [{
              //   value: 335,
              //   name: '一般'
              // },
              //   {
              //     value: 67,
              //     name: '紧急'
              //   }
              // ]
            },
              {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ["63%", "50%"],
                selectedMode: 'single',
                selectedOffset: 10,
                clockwise: true,
                label: {
                  normal: {
                    show: false
                    // fontSize: 16,
                    // color: '#4B70C9',
                    // formatter: '{b}{d}%'
                  },
                },
                itemStyle: {
                  normal: {
                    shadowColor: "rgba(0,0,0,0.4)",
                    shadowBlur: 15
                  }
                },
                labelLine: {
                  normal: {
                    length: 30,
                    length2: 20,
                    lineStyle: {
                      color: '#4B70C9',
                    }
                  }
                },
                data: data
              }
            ]
          };
          setTimeout(()=>{
            this.myChart22.setOption(option)
          },600)
        },
        inchart21() {
          this.myChart21 = this.$echarts.init(document.getElementById('mychart21'));
          var option = {
            // backgroundColor: "#0f375f",
            // legend: {
            //   orient: 'vertical',
            //   top: "bottom",
            //   right: "5%",
            //   data: ['安全管理', '文明施工', '脚手架', '基坑支护安全', '模板工程安全', '施工用电', '物料提升机'],
            //   textStyle: {
            //     color: "#fff",
            //     fontSize: 16
            //   }
            // },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            series: [{
              name: '人员管理',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                // show: true,
                normal: {
                  position: 'outside',
                  fontSize: 14
                }
              },
              labelLine: {
                length: 1,
                length2: 20,
                smooth: true
              },
              data: [{
                value: 5,
                name: '监督员',
                itemStyle: {
                  color: "#FEDF00",
                  borderColor: "#FEDF00",
                  borderWidth: 3
                }
              },
                {
                  value: 5,
                  name: '项目经理',
                  itemStyle: {
                    color: "#01FFFF",
                    borderColor: "#01FFFF",
                    borderWidth: 3
                  }
                },
                {
                  value: 4,
                  name: '材料员',
                  itemStyle: {
                    color: "#3769F4",
                    borderColor: "#3769F4",
                    borderWidth: 3
                  }
                },
                {
                  value: 80,
                  name: '施工员',
                  itemStyle: {
                    color: "#6978F2",
                    borderColor: "#6978F2",
                    borderWidth: 3
                  }
                },
                {
                  value: 10,
                  name: '质量员',
                  itemStyle: {
                    color: "#55D5B5",
                    borderColor: "#55D5B5",
                    borderWidth: 3
                  }
                },
                {
                  value: 6,
                  name: '安全员',
                  itemStyle: {
                    color: "#F87D7C",
                    borderColor: "#F87D7C",
                    borderWidth: 3
                  }
                }
              ]
            }]
          }
          this.myChart21.setOption(option)
        },
        chart21Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart21").offsetWidth
            let h = document.getElementById("mychart21").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart21.resize(resize);
            },100)
          })
        },
        chart13Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart13").offsetWidth
            let h = document.getElementById("mychart13").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart13.resize(resize);
            },100)
          })
        },
        chart22Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart22").offsetWidth
            let h = document.getElementById("mychart22").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart22.resize(resize);
            },100)
          })
        },
        chart24Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart24").offsetWidth
            let h = document.getElementById("mychart24").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart24.resize(resize);
            },100)
          })
        },
        getUrl() {
          // var url = ''
          // url = window.location.href
          var str = window.location.search
          if(str === '') {
            console.log('str为空')
          }else {
            var siteId = str.split('=')[1]
            localStorage.setItem('siteId', siteId)
          }

          // console.log(url)
          // console.log(siteId)
        },
        getsiteName() {
          var siteId = localStorage.getItem('siteId')
          var data = {
            siteId: siteId
          }
          getSite(data).then((res) => {
            localStorage.setItem('siteName', res.data.data.deptName)
          })
        }

      }
    }
</script>

<style scoped>
  #mychart22 {
    width: 100%;
    height: 25vh;
  }
  #mychart24 {
    padding-top: 0.2rem;
    width: 100%;
    height: 25vh;
  }
  #mychart13 {
    padding-top: 0.2rem;
    width: 100%;
    height: 25vh;
  }
  #mychart21 {
    padding-top: 0.4rem;
    width: 100%;
    height: 25vh;
  }
  .app{
    padding-left: 0.4rem;
    padding-right: 0.8rem;
  }
  .notice_container {
    width: 100%;
    height: 0.66rem;
    background-image: url("../assets/homepage/notice_bg.png");
    padding-left: 0.4rem;
    line-height: 0.4rem;
  }
  .notice_left{
    float: left;
    height:0.66rem;
    position: relative;
  }
  .notice_left img{
    position: absolute;
    top: 50%;
    transform: translate(0,-50%)
  }
  .notice_container span{
    height: 0.66rem;
    line-height: 0.66rem;
    color: #E8FEFF;
    font-size: 0.2rem;
  }
  .notice_right{
    float: right;
    margin-right: 0.4rem;
  }
  .content_container{
    margin-top: 0.16rem ;
  }
  .project{
    position: relative;
    width: 100%;
    height: 4rem;
    background-image: url("../assets/homepage/project_bg.png");
  }
  .project_head{
    display: flex;
    justify-content: space-around;
  }
  .pro_item{
    text-align: center;
    position: relative;
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/project_head_little.png");
    background-size:contain
  }
  .pro_item_two{
    position: relative;
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/three.png");
    background-size:contain
  }
  .pro_item_three{
    position: relative;
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/two.png");
    background-size:contain
  }
  .project_item{
    margin-left: 0.1rem;
    margin-top: 0.1rem;
    width: 93%;
    height: 0.43rem;
    font-size: 3px;
    background-image:url("../assets/homepage/project_item_bg.png") ;
    background-size: 100% 100%
  }
  .video_container {
    width: 100%;
    height: 5.961rem;
    background-image: url("../assets/homepage/video_bg.png");
    background-size:contain
  }
  .process {
    margin-top: 0.15rem;
    width: 100%;
    height: 3rem;
    background-image: url("../assets/homepage/process_bg.png") ;
  }
  .border-top-left {
    height: 10px;
    background-image: url("../../src/assets/border/top-center.png");
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
  .process_content{
    padding-left: 0.2rem;
    padding-top: 0.2rem;
    font-size: 0.2rem;
    height: 93%;
    color: #ffa454;
    /*background-image: url("../assets/homepage/process_1.png");*/
    background-size: contain;
  }
  .people {
    position: relative;
    width: 100%;
    margin-top: 0.2rem;
    height: 4.9rem;
    background-image: url("../assets/homepage/project_bg.png") ;
    background-size: 100% 100%;
  }
  .people_head{
    display: flex;
    justify-content: space-around;
  }
  .peple_item{
    margin-top: 0.6rem;
    width: 1.53rem;
    height: 0.77rem;
    background-image: url("../assets/homepage/people_little_bg.png");
  }
  .green {
    position: relative;
    width: 105%;
    height: 3rem;
    background-image: url("../assets/homepage/project_bg.png") ;
    background-size: 100% 100%;
  }
  .green_container{
    width: 100%;
    height: 2.5rem;
    /*background-image: url("../assets/homepage/shigong.png");*/
    background-repeat: no-repeat;
    background-size: cover;
  }
  .thing{
    position: relative;
    width: 100%;
    height: 2.85rem;
    background-image: url("../assets/homepage/project_bg.png") ;
  }
  .safe{
    position: relative;
    width: 110%;
    height: 2.85rem;
    background-image: url("../assets/homepage/project_bg.png") ;
    background-size: 100% 100%;
  }
  .quality{
    position: relative;
    width: 105%;
    height: 3rem;
    background-image: url("../assets/homepage/project_bg.png") ;
    background-size: 100% 100%;
  }
  .processing_content{
    background-color: rgba(204, 224, 255, 0.5);
    border-radius: 0.1rem;
    /*color: #3c3c3c;*/
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
    margin-top: 0.15rem;
    /*width: 100px;*/
  }
  .wc_time {
    position: absolute;
    font-size: 16px;
    top: 3.5vh;
    left: 25vw;
  }
</style>
<style>
  .process_content .el-step__title.is-finish,
  .process_content .el-step__title.is-process,
  .process_content .el-step__title.is-wait {
    /*color: #409EFF;*/
    width: 45px;
    margin-left: 50%;
    transform: translateX(-50%);
    height: 1.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-steps .el-step__title.is-process {
    color: rgb(89, 180, 157);;
    /*color: #4dd209;*/
  }
  .el-steps .el-step__head.is-process .is-text {
    border: 4px solid rgb(89, 180, 157);
    /*border: 4px solid #4dd209;*/
    width: 36px;
    height: 36px;
    margin-top: -8px;
    margin-left: -6px;
  }
  .schedule-press .el-steps .el-step:last-of-type .el-step__description {
    padding-right: 10%;
  }
  .process_content .el-step__title {
    line-height: 26px;
  }
  .schedule-content .el-step__title {
    font-size: 18px;
    font-weight: bold;
  }
  .homePage_dialog .home_second .el-dialog__body {
    margin-left: 10%;
  }
</style>
