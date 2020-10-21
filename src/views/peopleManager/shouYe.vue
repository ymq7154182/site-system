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
            <div class="p_picture">
              <ul class="p_list">
                <li v-for="(item,index) in items" :key="index" class="p_item">
                  <div >
                    <img class="yicun" :src="item.url" alt="">
                    <div>{{item.name}}</div>
                    <div>{{item.position}}</div>
                    <div class="p_temperature">{{item.temperature}}℃</div>
                  </div>
                </li>
                <li v-for="(item1,index) in items" :key="index + '-only'" class="p_item">
                  <div >
                    <img class="yicun" :src="item1.url" alt="">
                    <div>{{item1.name}}</div>
                    <div>{{item1.position}}</div>
                    <div class="p_temperature">{{item1.temperature}}℃</div>
                  </div>
                </li>
              </ul>
              <div class="p_num">
                <span class="p_attention">发烧人数：</span>
                <span class="p_attention">{{attentionNum}}</span>
                <span class="p_attention">人，已进行追踪处理</span>
              </div>
            </div>
          </div>

          <div class="left_bottom">
            <div class="border-top-left"></div>
            <div class="p_title">
              <span class="title1">现场人员考勤</span>
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
                  <div class="p_title">
                    <span class="title1">项目负责人</span>
                  </div>
                  <div style="margin-top:0.3rem;" class="device-data">
                    <ul class="device-list">
                      <li @mouseover="infohover1 = false" @mouseout="infohover1 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover1" :src="require('../../assets/peopleManager/fuze3.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover1" class="device-detail-info">
                            <table>
                              <tr>
                                <td>姓名:</td>
                                <td>王琪</td>
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
                                  {{ '王琪' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.6%; ">到岗</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>

                      <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
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
                      </li>


                    </ul>
                    <!-- <el-row>
                      <el-col :span="8">
                        <div class="headman">
                          <el-image :src="require('../../assets/peopleManager/fuze3.jpg')" fit="fill" style="height: 75%; width: 100%; " />
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              建设方负责人&nbsp;&nbsp;&nbsp;史扬
                            </el-row>
                            <el-row>
                              龙湖地产有限公司
                            </el-row>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="headman">
                          <el-image :src="require('../../assets/peopleManager/fuze2.jpg')" fit="fill" style="height: 75%; width: 100%; " />
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              监理方负责人&nbsp;&nbsp;&nbsp;王琦
                            </el-row>
                            <el-row>
                              北京铁城建设监理有限公司
                            </el-row>
                          </div>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="headman">
                          <el-image :src="require('../../assets/peopleManager/fuze1.jpg')" fit="fill" style="height: 75%; width: 100%; " />
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              施工方负责人&nbsp;&nbsp;&nbsp;赵军何
                            </el-row>
                            <el-row>
                              北京城建集团
                            </el-row>
                          </div>
                        </div>
                      </el-col>
                    </el-row> -->
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="right_bottom">
            <div class="border-top-left"></div>
            <div class="p_title">
              <span class="title1">单位考勤</span>
            </div>
            <div class="p_chart">
              <div id="chart4" style="width: 62vw;height:36vh;"></div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import kqHistory from './kqHistory'
export default {
  name: "shouYe",
  components: {
    // kqHistory
  },
  data(){
    return{
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
    }
  },
  mounted() {
    this.selectType("类型")
    this.$store.dispatch('changeMsg', '人员管理')
    this.drawLine();
    this.changeType();
  },
  methods:{
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
    drawLine(){
      let myChart1 = this.$echarts.init(document.getElementById('chart1'))
      let myChart2 = this.$echarts.init(document.getElementById('chart2'))
      let myChart3 = this.$echarts.init(document.getElementById('chart3'))
      let myChart4 = this.$echarts.init(document.getElementById('chart4'))
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

        color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0'] ,

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
          data: ['施工员', '质量员', '安全员','标准员','材料员','机械员'],
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
      myChart4.setOption({//
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },

        color:['#FFACC1','#6AC0F0','#FFC361'],
        grid: {
          left: 50,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        legend: {
          data: ['总数', '出勤数', '出勤率'],
          show: true,
          top:'top',
          textStyle: {
            color: '#6ac0f0' ,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['项目部', '亿尚龙', '三建', '中天耀', '中浩建筑', '缘振智建筑','华迅锐建筑','迈贝禾建筑','御捷达','真志祥建筑','其他'],
            // data: ['项目部', '嘉宇天泽', '明泽瑞达', '中天耀', '顾志润', '劲草园艺','宜民劳动','东悦星','御捷达','碧保','其他'],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: '#3FA0C3'
              }
            },
            // axisTick: {
            //   lineStyle: {
            //     type:'dashed'
            //   }
            // },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人员数量',
            min: 0,
            max: 200,
            interval: 20,

            axisLabel: {
              formatter: '{value} 人'
            },
            axisLine: {
              lineStyle: {
                color: '#3FA0C3'
              }
            },

          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            max: 1,
            interval: 0.1,
            axisLabel: {
              formatter: '{value} '
            },
            axisLine: {
              lineStyle: {
                color: '#3FA0C3'
              }
            },
          }
        ],
        series: [
          {
            name: '总数',
            type: 'bar',
            data: [180,160,189,177,168,190,178,180,190,178,190]
          },
          {
            name: '出勤数',
            type: 'bar',
            data: [169,150,170,170,159,169,188,168,160,168,188]
          },
          {
            name: '出勤率',
            type: 'line',
            yAxisIndex: 1,
            data: [0.8,0.7,0.9,0.6,0.9,0.5,0.9,0.6,0.7,0.8,0.9]
          }
        ]
      });
    },
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
.left_top{
  margin-bottom: 1vh;
  width: 100%;
  height: 47vh;
  background-color: rgba(0, 36, 78, 0.5);
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
  /*color: #6ac0f0;*/
  /*font-size: 14px;*/
  /*width: 90px;*/
  /*position: relative;*/
  /*top:6px;*/
  /*padding: 4px 6px;*/
  /*background-color: rgb(17,41,73);*/
  /*text-align: center;*/
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
}

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
