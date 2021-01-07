<template>
  <div class="peopleManager">

    <el-row >
      <el-col :span="8" >
        <div class="p_left">
          <div class="left_top">
            <div class="border-top-left"></div>
            <div class="p_title">
              <span class="title1">今日出勤</span>
            </div>
            <div class="p_chart">
              <div id="chart1" style="width:30vw;height:17vh;"></div>
            </div>
            
              <div style="color:white; margin-left: 40%;margin-top: 5%;font-size:20px;" v-if="!showDayList">暂无考勤信息</div>
              <div style="width:100%;height: 3.2rem;position: absolute;top: 40%" v-if="showDayList" >
                <dv-scroll-board :config="configTable" />
              </div>
              
            <!-- </div> -->
            
          </div>

          <div class="left_bottom">
            <div class="border-top-left"></div>
            <div class="p_title">
              <span class="title1">近7天考勤分布统计</span>
            </div>
            <div class="p_chart">
              <div id="chart2" style="width: 28vw;height:29vh;"></div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="p_right">
          <div class="right_top">
            <el-row>
              <el-col :span="12">
                <div class="right_top_left">
                  <div class="border-top-left"></div>
                  <div class="p_title">
                    <span class="title1">现场工种</span>
                  </div>
                  <div class="p_chart">
                    <el-row>
                      <el-col :span="20">
                         <div id="chart3" style="width: 100%;height:34vh;"></div>
                      </el-col>
                      <el-col :span="4" >
                        <div class="gongzhong_fenlei">
                          <ul class="feilei_ul">
                            <li class="fenlei_li" >
                              <el-tag type="success" @click.native="selectType('类型')">类型</el-tag>
                            </li>
                            <li>
                              <el-tag type="info" @click.native="selectType('年龄')">年龄</el-tag>
                            </li>
                            <li>
                              <el-tag  @click.native="selectType('学历')">学历</el-tag>
                            </li>
                            <li>
                              <el-tag type="danger" @click.native="selectType('民族')">民族</el-tag>
                            </li>
                          </ul>
                        </div>
                      </el-col>
                    </el-row>

                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="right_top_right">
                  <div class="border-top-left"></div>
                  <div class="p_title ">
                    <span class="title1">项目负责人</span>
                  </div>
                  <div style="float:right; margin: -20px 10px 0 0; ">
                    <!-- <el-button type="text" style="text-decoration: underline; " @click="gotoCheckRecord">历史数据</el-button> -->
                    <el-select v-model="responsePeople" placeholder="请选择责任主体" class="item-defer" @change="selectResponsePeople">
                      <el-option
                        v-for="(item, index) in responsePeopleList"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                  <div style="margin-top:0.3rem;" class="device-data">
                    <ul class="device-list" >
                     
                      <li @mouseover="infohover1 = false" @mouseout="infohover1 = true" v-for="(item, index) in leadersList">
                        <div class="device-detail">
                          <div v-if="item.userImg !== null" style="height:80%;">
                            <el-image v-show="infohover1"  :src="item.userImg" fit="fill" style="height: 100%; " />
                          </div>
                          <div v-else style="height:80%;">
                            <el-image v-show="infohover1"  :src="require('../../assets/peopleManager/wu.jpg')" fit="fill" style="height: 100%; " />
                          </div>
                          <div v-show="!infohover1" class="device-detail-info" v-if="item.userImg !== null">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>{{item.userSignName}}</td>
                              </tr>
                              <tr>
                                <td>单位:</td>
                                <td>{{item.deptName}}</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>{{item.userSignPhone}}</td>
                              </tr>
                              <tr>
                                <td>岗位:</td>
                                <td>{{item.userSignKind}}</td>
                              </tr>
                            </table>
                          </div>
                          <div v-else style="height:80%;margin-top:-110%;" @click="updateInfo" v-show="!infohover1">
                            <el-image  :src="require('../../assets/peopleManager/upload.jpg')" fit="fill" style="height: 100%; " />
                          </div>
                          
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ item.userSignName }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" v-if="item.userSignStatus === 0" style="margin-top: 1.6%; ">到岗</el-tag>
                                <el-tag type="warninng" effect="dark" v-if="item.userSignStatus === 1" style="margin-top: 1.6%; ">未打卡</el-tag>
                                <el-tag type="danger" effect="dark" v-if="item.userSignStatus === 2" style="margin-top: 1.6%; ">补打卡</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <!-- <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover2" :src="require('../../assets/peopleManager/fuze2.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover2" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>史杨</td>
                              </tr>
                              <tr>
                                <td>角色:</td>
                                <td>施工方总监</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>17739162457</td>
                              </tr>
                              <tr>
                                <td>体温:</td>
                                <td>36.5</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '史杨' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <li @mouseover="infohover3 = false" @mouseout="infohover3 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover3" :src="require('../../assets/peopleManager/fuze1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover3" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>赵君何</td>
                              </tr>
                              <tr>
                                <td>角色:</td>
                                <td>建设方项目经理</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>13588673472</td>
                              </tr>
                              <tr>
                                <td>体温:</td>
                                <td>36.5</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '赵君何' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <li @mouseover="infohover4 = false" @mouseout="infohover4 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover4" :src="require('../../assets/peopleManager/fuze4.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover4" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>张欣</td>
                              </tr>
                              <tr>
                                <td>角色:</td>
                                <td>监理方项目经理</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>18227447739</td>
                              </tr>
                              <tr>
                                <td>体温:</td>
                                <td>36.5</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '张欣' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <li @mouseover="infohover5 = false" @mouseout="infohover5 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover5" :src="require('../../assets/peopleManager/fuze5.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover5" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>杨琪</td>
                              </tr>
                              <tr>
                                <td>角色:</td>
                                <td>施工方总监</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>17739162457</td>
                              </tr>
                              <tr>
                                <td>体温:</td>
                                <td>36.5</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '杨琪' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <li @mouseover="infohover6 = false" @mouseout="infohover6 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover6" :src="require('../../assets/peopleManager/fuze6.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover6" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>廉伟</td>
                              </tr>
                              <tr>
                                <td>角色:</td>
                                <td>建设方项目经理</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>13588673472</td>
                              </tr>
                              <tr>
                                <td>体温:</td>
                                <td>36.5</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '廉伟' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li> -->


                    </ul>
                    
                  </div>
                  <div style="color:white;font-size:16px; margin-left:50%;">共计{{leaderTotalCount}}人，今日出勤{{attendLeaderCount}}人</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="right_bottom">
            <div class="border-top-left"></div>
            <div class="p_title">
              <span class="title1">单位考勤</span>
            </div>
           
            
            <div style="margin: -15px 10px 0 0; float:right;">
              
                <el-button type="primary" size="mini" @click.native="showYear" >年</el-button>
                <el-button type="primary" size="mini" @click="showMonth">月</el-button>
                <el-button type="primary" size="mini" @click="showDay">日</el-button>
                <el-date-picker
                  v-model="selectDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </div>
            
            <div class="p_chart" style="clear:both;">
              <div id="chart4" style="width: 62vw;height:36vh;"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { listDay, getCount, leaderList, leaderCount } from '@/api/peopleManager'
export default {
  name: "shouYe",
  components: {
    // kqHistory
  },
  data(){
    return{
      leaderTotalCount: '',
      attendLeaderCount: '',
      leadersList: [],
      selectDate: '',
      deptId: '',
      currentDay: '',
      responsePeople: '',
      responsePeopleList: ['施工方', '监理方', '建设方'],
      showDayList: false,
      configTable: {
            header: ['考勤时间', '考勤人员', '工种', '考勤类型'],
            headerHeight: 45,
            data: [],
            rowNum: 4,
            align: ['center', 'center', 'center', 'center'],
            headerBGC: '',
            evenRowBGC: ''
          },
      // 现场工种的legend
      legendData:[],
      // 现场工种的数据
      gongzhongData:[],
      normalNum:0,
      attentionNum:0,
      items:[
        {
          url:require('../../assets/peopleManager/yicun1.jpg'),
          name:'李芳',
          position:'施工人员',
          temperature:'36.3',
        },
        {
          url:require('../../assets/peopleManager/yicun2.jpg'),
          name:'蒋珊',
          position:'施工人员',
          temperature:'37.5',
        },
        {
          url:require('../../assets/peopleManager/yicun3.jpg'),
          name:'商鹏',
          position:'施工人员',
          temperature:'36.3',
        },{
          url:require('../../assets/peopleManager/yicun4.jpg'),
          name:'姜琦',
          position:'施工人员',
          temperature:'36.1',
        },{
          url:require('../../assets/peopleManager/yicun5.jpg'),
          name:'李白',
          position:'施工人员',
          temperature:'37.0',
        },{
          url:require('../../assets/peopleManager/yicun6.jpg'),
          name:'王久',
          position:'安全员',
          temperature:'36.6',
        },{
          url:require('../../assets/peopleManager/yicun7.jpg'),
          name:'刘琦',
          position:'质检员',
          temperature:'36.3',
        },{
          url:require('../../assets/peopleManager/yicun8.jpg'),
          name:'江流',
          position:'标准员',
          temperature:'36.6',
        },{
          url:require('../../assets/peopleManager/yicun9.jpg'),
          name:'王武',
          position:'材料员',
          temperature:'36.3',
        },{
          url:require('../../assets/peopleManager/yicun10.jpg'),
          name:'李四',
          position:'机械员',
          temperature:'37.2',
        }
      ],
      infohover1: true,
      infohover2: true,
      infohover3: true,
      infohover4: true,
      infohover5: true,
      infohover6: true,
      responsePeopleTotal: [],
      responsePeopleKq: [],
      servicePeopleTotal: [],
      servicePeopleKq: []

    }
  },
  mounted() {
    var date = this.transDate()
    this.currentDay = date
    this.deptId = localStorage.getItem('siteId')
    var type = 3
    this.getPeopleCount(date, this.deptId, type)
    this.selectType("类型")
    this.$store.dispatch('changeMsg', '人员管理')
    this.drawLine();
    //this.changeType();
    this.getListDay()
    this.getLeaderList()
    this.getLeaderCount()
    
  },
  methods:{
    getLeaderCount() {
      var id = localStorage.getItem("siteId")
      leaderCount(id).then((res) => {
        console.log("aaaaaasasasa", res.data)
        this.leaderTotalCount = res.data.data.leaderCount
        this.attendLeaderCount = res.data.data.attendLeaderCount
      })
    },
    updateInfo() {
      alert(123)
    },
    selectType(val) {
      console.log("123")
      console.log("类型改变",val)
      if(val === "类型"){
        this.legendData = ['施工员', '质量员', '安全员', '标准员', '材料员','机械员', '劳务员', '资料员'],
        this.gongzhongData = [
          {value: 35, name: '施工员'},
          {value: 18, name: '质量员'},
          {value: 19, name: '安全员'},
          {value: 7, name: '标准员'},
          {value: 48, name: '材料员'},
          {value: 52, name: '机械员'},
          {value: 60, name: '劳务员'},
          {value: 26, name: '资料员'}
        ]
      } else if(val === "年龄") {
        this.legendData = ['25-30', '30-35', '36-40', '41-45', '41-45','46-50','51-55'],
        this.gongzhongData = [
          {value: 3, name: '25-30'},
          {value: 36, name: '30-35'},
          {value: 46, name: '36-40'},
          {value: 16, name: '41-45'},
          {value: 8, name: '46-50'},
          {value: 1, name: '51-55'}
        ]
      }else if(val === "学历") {
        this.legendData = ['博士', '研究生', '本科', '专科','其他'],
        this.gongzhongData = [
          {value: 3, name: '博士'},
          {value: 12, name: '研究生'},
          {value: 30, name: '本科'},
          {value: 5, name: '专科'},
          {value: 60, name: '其他'}
        ]
      }else if(val === "民族") {
        this.legendData = [ '回族', '满族', '土家族','壮族','苗族','汉族'],
        this.gongzhongData = [

          {value: 2, name: '回族'},
          {value: 4, name: '满族'},
          {value: 5, name: '土家族'},
          {value: 1, name: '壮族'},
          {value: 4, name: '苗族'},
          {value: 56, name: '汉族'},
        ]
      }
      this.drawLine()
    },
    selectAge() {
      console.log("Type")
    },
    selectXueli() {
      console.log("Type")
    },
    selectMinzu() {
      console.log("Type")
    },
    changeType(){
      let labelItem = document.querySelectorAll('.p_temperature')
      for (let j = 0; j < this.items.length; j++) {
        console.log(this.items[j].temperature)
        if(this.items[j].temperature >= 37){
          labelItem[j].className = 'p_temperature changeRed'
          this.attentionNum++
        }else{
          this.normalNum++
        }

      }
    },
    drawLine4() {
       let myChart4 = this.$echarts.init(document.getElementById('chart4'))
       myChart4.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
          textStyle: {
              color: '#fff',
          },
          bottom:'bottom',
            data: ['项目负责人-总数', '劳务人员总数', '项目负责人-考勤', '劳务人员总数考勤']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
              show: true,
                textStyle: {
                  color: '#c3dbff',  //更改坐标轴文字颜色
                  fontSize : 12      //更改坐标轴文字大小
                }
            },
        },
        yAxis: {
            type: 'category',
            data: ['建设单位', '施工单位', '监理单位'],
            axisLabel: {
              show: true,
                textStyle: {
                  color: '#c3dbff',  //更改坐标轴文字颜色
                  fontSize : 12      //更改坐标轴文字大小
                }
            },
        },
        series: [
            {
                name: '项目负责人-总数',
                type: 'bar',
                stack: '总数',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: this.responsePeopleTotal
            },
            
            {
                name: '项目负责人-考勤',
                type: 'bar',
                stack: '考勤',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: this.responsePeopleKq
            },
            {
                name: '劳务人员总数',
                type: 'bar',
                stack: '总数',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: this.servicePeopleTotal
            },
            {
                name: '劳务人员总数考勤',
                type: 'bar',
                stack: '考勤',
                label: {
                    show: true,
                    position: 'insideRight'
                },
                data: this.servicePeopleKq
            }
        ]
      })
    },
    drawLine(){
      let myChart1 = this.$echarts.init(document.getElementById('chart1'))
      let myChart2 = this.$echarts.init(document.getElementById('chart2'))
      let myChart3 = this.$echarts.init(document.getElementById('chart3'))
     
      var num1 = 130;
      var num2 = 14;
      var num3 = 116;
      myChart1.setOption({

        title: [{
          text: '',
          x: '50%',
          y: 10,
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            fontWeight:'600',
            color: '#fff',
            textAlign: 'center',
          },
        },{
          text: '14',
          left: '49%',
          top: '30%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgba(251, 200, 79, 1)',
            textAlign: 'center',
          },
        }, {
          text: '未签到',
          left: '49%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgba(251, 200, 79, 1)',
            textAlign: 'center',
          },
        },{
          text: '130',
          left: '19.5%',
          top: '30%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgba(232, 85, 63, 1)',
            textAlign: 'center',
          },
        },{
          text: '登记人数',
          left: '19.5%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgba(232, 85, 63, 1)',
            textAlign: 'center',
          },
        },{
          text: '116',
          left: '79%',
          top: '30%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgb(106,192,240)',
            textAlign: 'center',
          },
        }, {
          text: '已签到',
          left: '79%',
          top: '45%',
          textAlign: 'center',
          textStyle: {
            fontSize: '13',
            // fontWeight:'600',
            color: 'rgb(106,192,240)',
            textAlign: 'center',
          },
        },],
        series: [

          // 左边 num1
          {
            type: 'pie',
            radius: ['65%', '70%'],
            center: ['20%', '50%'],
            data: [{
              hoverOffset: 1,
              value: num1,
              name: '虚拟主机',
              itemStyle: {
                color: 'rgba(232, 85, 63, 1)',
              },
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              hoverAnimation: false,
            },
              {
                label: {
                  show: false
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    lineStyle: {
                      width: 0
                    }
                  }
                },
                value: 130-num1,
                hoverAnimation: false,
                itemStyle: {
                  color: 'rgba(232, 85, 63, .2)',
                },
              }
            ]
          },
          {
            type: 'pie',
            radius: ['75%', '70%'],
            center: ['20%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num2,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
          {
            type: 'pie',
            radius: ['65%', '60%'],
            center: ['20%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num3,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
          // 中间
          {
            type: 'pie',
            radius: ['65%', '70%'],
            center: ['50%', '50%'],
            data: [{
              hoverOffset: 1,
              value: num2,
              name: '虚拟主机',
              itemStyle: {
                color: 'rgba(251, 200, 79, 1)',
              },
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              hoverAnimation: false,
            },
              {
                label: {
                  show: false
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    lineStyle: {
                      width: 0
                    }
                  }
                },
                value: 130 - num2,
                hoverAnimation: false,
                itemStyle: {
                  color: 'rgba(251, 200, 79, .2)',
                },
              }
            ]
          },
          {
            type: 'pie',
            radius: ['75%', '70%'],
            center: ['50%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num1,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
          {
            type: 'pie',
            radius: ['65%', '60%'],
            center: ['50%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num1,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
          //右边 num1
          {
            type: 'pie',
            radius: ['65%', '70%'],
            center: ['80%', '50%'],
            data: [{
              hoverOffset: 1,
              value: num3,
              name: '虚拟主机',
              itemStyle: {
                color: 'rgb(106,192,240)',
              },
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              hoverAnimation: false,
            },
              {
                label: {
                  show: false
                },
                labelLine: {
                  normal: {
                    smooth: true,
                    lineStyle: {
                      width: 0
                    }
                  }
                },
                value: 130 - num3,
                hoverAnimation: false,
                itemStyle: {
                  color: 'rgba(251, 200, 79, .2)',
                },
              }
            ]
          },
          {
            type: 'pie',
            radius: ['75%', '70%'],
            center: ['80%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num1,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
          {
            type: 'pie',
            radius: ['65%', '60%'],
            center: ['80%', '50%'],
            data: [{
              label: {
                show: false
              },
              labelLine: {
                normal: {
                  smooth: true,
                  lineStyle: {
                    width: 0
                  }
                }
              },
              value: 100 - num1,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
        ]

      });
      myChart2.setOption({

        color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0', '#6495ED', '#98FB98'] ,

        angleAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLine: { //极坐标轴颜色
            lineStyle:{
              color:'#6ac0f0',
            }
          },

        },
        radiusAxis: { //极坐标的径向轴
          //show:false,
          axisLine: {
            //show:false,
            lineStyle:{
              color:'#FFEDA7',
            },

          },
          axisTick:{
            lineStyle:{
              color:'#6ac0f0',
              //show:false,
            }
          }
        },
        polar: { //极坐标位置
          center:['45%','50%'],
        },
        series: [{
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: '施工员',
          stack: 'a'
        }, {
          type: 'bar',
          data: [2, 4, 9, 1, 0, 2, 1],
          coordinateSystem: 'polar',
          name: '质量员',
          stack: 'a'
        },{
          type: 'bar',
          data: [2, 3, 6, 6, 3, 2, 1],
          coordinateSystem: 'polar',
          name: '安全员',
          stack: 'a'
        },{
          type: 'bar',
          data: [2, 4, 6, 1, 1, 5, 1],
          coordinateSystem: 'polar',
          name: '标准员',
          stack: 'a'
        },{
          type: 'bar',
          data: [2, 8, 6, 8, 3, 2, 3],
          coordinateSystem: 'polar',
          name: '材料员',
          stack: 'a'
        }, {
          type: 'bar',
          data: [1, 2, 7, 4, 4, 2, 8],
          coordinateSystem: 'polar',
          name: '机械员',
          stack: 'a'
        },{
          type: 'bar',
          data: [1, 3, 5, 4, 2, 6, 8],
          coordinateSystem: 'polar',
          name: '劳务员',
          stack: 'a'
        },{
          type: 'bar',
          data: [4, 2, 5, 6, 2, 1, 7],
          coordinateSystem: 'polar',
          name: '资料员',
          stack: 'a'
        }],
        // radar: {
        //   center: ['0', '40%'],
        //   textStyle: {
        //     color: '#6ac0f0' ,
        //   },
        // },
        legend: {
          itemWidth: 13 ,
          show: true,
          right:'right',
          data: ['施工员', '质量员', '安全员','标准员','材料员','机械员', '劳务员', '资料员'],
          textStyle: {
            fontSize:10,
            color: '#6ac0f0' ,
          },
        },

      });
      myChart3.setOption({
        color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0'] ,

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },

        legend: {
          itemWidth: 15 ,
          orient: 'vertical',
          top:10,
          left:10,

          data: this.legendData,
          textStyle: {
            color: '#6ac0f0' ,
            fontSize: 14,
          },
        },
        series: [
          {
            name: '现场工种',
            type: 'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                // fontSize: '15',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              // lineStyle: {
              //   color: 'rgba(255, 255, 255, 0.3)'
              // },
              smooth: 0,
              length: 10,
              length2: 20
            },
            data: this.gongzhongData
          }
        ]
      });

      
      
    },
    getListDay() {
      listDay({
        constructionSiteId: localStorage.getItem('siteId')
      }).then((res) => {
        if(res.data.data.userDay.length === 0) {
          this.showDayList = false
        } else {
          this.showDayList = true
          var tmparr = res.data.data.userDay
          var data = []
          for(var i = 0; i < tmparr.length; i++) {
            var data1 = []
            data1.push(tmparr[i].userSignTime)
            data1.push(tmparr[i].userSignName)
            data1.push(tmparr[i].userSignKind)
            if(tmparr[i].userSignType === 1) {
              data1.push("<span style='color: #3DE7C9'>签到</span>")
            } else if(tmparr[i].userSignType === 2){
              data1.push("<span style='color: #eeba2b'>签出</span>")
            } else {
              data1.push("<span style='color: #e43c13'>无签到信息</span>")
            }
            data.push(data1)
          }
          this.configTable = {
            header: ['考勤时间', '考勤人员', '工种', '考勤类型'],
            headerHeight: 30,
            data: data,
            rowNum: 4,
            align: ['center', 'center', 'center', 'center'],
            headerBGC: '',
            evenRowBGC: ''
          }
        }
        

      })
    },
    getLeaderList() {
      var id = localStorage.getItem('siteId')
      leaderList(id).then((res) => {
        console.log("领导", res.data)
        this.leadersList = res.data.rows
        console.log("qwert", this.leadersList)
      })
    },
    getPeopleCount(date, id, type) {
      var params = {
        datetime: date,
        id: id,
        type: type
      }
      console.log("count", params)
      getCount(params).then((res) => {
        console.log("Counts", res.data.data)
        var obj = res.data.data
        this.responsePeopleTotal = []
        this.responsePeopleKq = []
        this.servicePeopleTotal = []
        this.servicePeopleKq = []
        for(var i = 0; i < obj.length; i++) {

          var tmp = obj[i]
          console.log("SSSSS", tmp)
          this.responsePeopleTotal.push(tmp.leaderTotal)
          this.responsePeopleKq.push(tmp.leaderAttend)
          this.servicePeopleTotal.push(tmp.labourTotal)
          this.servicePeopleKq.push(tmp.labourAttend)
          console.log("DDDDD", this.responsePeopleTotal)
        }
        this.drawLine4()
      })
    },
    transDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    showYear() {
      var year = this.currentDay.split('-')[0]
      
      this.getPeopleCount(year, this.deptId, 1)
    },
    showMonth() {
      var date = this.currentDay.slice(0, 7)
      
      this.getPeopleCount(date, this.deptId, 2)
    },
    showDay() {
      
      this.getPeopleCount(this.currentDay, this.deptId, 3)
    },
    selectResponsePeople() {
      this.getPeopleCount(this.currentDay, this.deptId, 3)
    }
  }
}
</script>

<style scoped>
.border-top-left {
  height: 10px;
  background-image: url("../../assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}
.peopleManager{
  margin: 0.5vh 0.5vw;
}
.p_left{

}
/* .col-div4 {
    width: 100%;
    background-image: url("../../assets/boxheader.png");
    background-size: 100% 100%;
    position: relative;
    height: 6.1rem;
  } */
.left_top{
  margin-bottom: 1vh;
  width: 100%;
  height: 47vh;
  background-color: rgba(0, 36, 78, 0.5);
  position: relative;
}

.p_icon{

  color: white;
  font-size: 0.2rem;
  text-align: center;
  margin: 0 4vw 0 4vw;
}
.left_bottom{
  height: 35vh;
  background-color: rgba(0, 36, 78, 0.5);
}
.p_right{
  margin-left: 1vw;
}
.right_top{
  margin-bottom: 10px;
}
.right_top_left{
  margin-right: 0.5vw;
  height: 40vh;
  background-color: rgba(0, 36, 78, 0.5);
}
.right_top_right{
  height: 40vh;
  background-color: rgba(0, 36, 78, 0.5);
}
.right_bottom{
  height: 42vh;
  background-color: rgba(0, 36, 78, 0.5);
}
.p_title{
  
}
.box-txt4 {

 
  
}
.title1{
  color: #fd9f6f;
  font-size: 0.25rem;
  margin-left: 1vw;
}
.p_picture{
  height: 35vh;
  width: 32vw;
  overflow: hidden;
}
.p_list{
  font-size: 0.13rem;
  list-style: none;
  padding: 0;
  margin: 0;
  animation: moving 12s linear infinite;
  width: 35rem;
}
@keyframes moving {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-11rem);
  }
}
.p_list:hover {
  animation-play-state: paused;
;
}
.p_item{
  text-align: center;
  color:white;
  float:left;
  margin: 0 0.2rem 3vh 0.2rem;
}
.yicun{
  margin-top: 0.5vw;
  width: 0.7rem;
  height: 1rem;
}
.p_num{
  font-size: 0.1rem;
  /*position: relative;*/
  /*bottom: 3%;*/
  text-align: center;
}

.p_attention{
  color: #FFD66A;
  font-size: 13px;
}
.p_temperature{
  color: #3DE7C9;
}
.changeRed{
  color: #DE3143 !important;
  font-weight: 600;
}

.headman {
  height: 30vh;
  width: 94%;
  margin: 0.3rem auto 0 auto;
  border: 1px solid #3FA0C3;;
  border-radius: 4px;
  background-color: rgba(0 ,0 ,0 , 0.35);
  color: #E8FEFF;
  text-align: center;
  line-height: 0.35rem;
}


.device-detail {
  width: 2.5rem;
  height:30vh;
  margin: 0 0.05rem;
  border: 1px solid #3FA0C3;;
  border-radius: 4px;
  background-size: 100% 100%;
  background-color: rgba(0 ,0 ,0 , 0.35);
}

.device-detail-info {
  float: top;
  height: 80%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #E8FEFF;
  font-size: 0.18rem;
  margin-top:-25vh;
}
/* .device-detail-info-btn {
  float: top;
  height: 20%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #E8FEFF;
  font-size: 0.18rem;

  margin-left:20%;
} */
.device-detail-info table {
  height: 90%;
  margin: 3px 4px;
}

.device-detail-span {
  font-size: 0.25rem;
  color: #E8FEFF;
  text-align: right;
  margin: 0 auto;
}



.device-list {
  list-style: none;
  padding: 0;
  margin: 0;
  animation: moving2 12s linear infinite;
  width: 25rem;

}

.device-list li {
  float: left;
}

@keyframes moving2 {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-8.6rem);
  }
}

.device-data {
  /* height: calc(28vh - 10px - 0.5rem - 0.3rem); */
  margin: 0.15rem;
  width: calc(100% - 0.3rem);
  overflow: hidden;
}

.device-list:hover {
  animation-play-state: paused;
}
.gongzhong_fenlei {
  /* padding-top: 1rem; */
}
.feilei_ul {
  list-style: none;
  padding: 0;
  text-align: center;
  line-height: 0.8rem;

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
