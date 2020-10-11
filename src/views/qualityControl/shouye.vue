<template>
    <div class="container">
      <dv-loading v-if="loading" class="load">Loading...</dv-loading>
      <div>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="col-div">
                  <div class="box-txt">
                    <span>安质检查</span>
                  </div>
                  <div id="mychart1"></div>
                  <div class="saftNum">总数：{{sumNum}}件</div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="col-div">
                  <div class="box-txt">
                    <span>整改情况</span>
                  </div>
                  <div id="mychart12"></div>
                </div>
              </el-col>
              <!--<el-col :span="8">-->
              <!--<div class="col-div">-->
              <!--<div class="box-txt">-->
              <!--<span>质量整改</span>-->
              <!--</div>-->
              <!--<div id="mychart21">-->

              <!--</div>-->
              <!--</div>-->
              <!--</el-col>-->
            </el-row>
            <el-row :gutter="20" class="rowstyle">
              <el-col :span="12">
                <div class="col-div">
                  <div class="box-txt">
                    <span>安质隐患统计</span>
                  </div>
                  <!--<div id="mychart21">-->
                  <!---->
                  <!--</div>-->
                  <div id="mychart13"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="col-div">
                  <div class="box-txt">
                    重大危险源
                  </div>
                  <div id="mychart24"></div>
                </div>
              </el-col>
              <!--<el-col :span="8">-->
              <!--<div class="col-div">-->
              <!--<div class="box-txt">-->
              <!--安全日志和交底-->
              <!--</div>-->
              <!--<div>-->
              <!--<el-row>-->
              <!--<el-col :span="12">-->
              <!--<div id="mychart22"></div>-->
              <!--</el-col>-->
              <!--<el-col :span="12">-->
              <!--<div id="mychart23"></div>-->
              <!--</el-col>-->
              <!--</el-row>-->
              <!--</div>-->
              <!--</div>-->
              <!--</el-col>-->

            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="col-div4">
              <div class="box-txt4">
                <span>监督检查记录</span>
              </div>
              <dv-scroll-board :config="configTable" style="width: 100%;height: 5.5rem;position: absolute;top: 8%" />
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20" class="rowstyle">
          <el-col :span="12">
            <div class="col-div2">
              <div class="box-txt">
                安质教育培训
              </div>
              <div>
                <el-row>
                  <el-col :span="6">
                    <div id="mychart41"></div>
                  </el-col>
                  <el-col :span="6">
                    <div id="mychart42"></div>
                  </el-col>
                  <el-col :span="6">
                    <div id="mychart43"></div>
                  </el-col>
                  <el-col :span="6">
                    <div id="mychart44"></div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="col-div2">
              <div class="box-txt">
                问题趋势分析
              </div>
              <div id="mychart32"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import echarts from 'echarts';
  import {getSysProData,getSafetyRecord,getDanger,getRectification,getSafetyCheck,getProblem,getSafetyTrouble} from '@/api/qualityControl';
    export default {
        name: "index",
      data() {
        return {
          proName:'',
          // 安全检查的总数目
          sumNum:0,
          // 新增问题数目
          newProblem:[],
          // 消除问题数目
          delProblem:[],
          // 现存问题数目
          curProblem:[],
          // 问题趋势分析的x轴
          progressXData:[],
          // 安全隐患统计
          innerData:[],
          outerData:[],
          // innerData:[
          //         {value:335,unit:'次', name:'易燃物乱摆放',},
          //         {value:679,unit:'次', name:'未正确佩戴安全帽'},
          //         {value:1548,unit:'次', name:'基坑支护安全'}
          //          ],
          // outerData:[
          //         {value:310,unit:'次', name:'模板工程安全'},
          //         {value:234, unit:'次',name:'施工用电'},
          //         {value:135, unit:'次',name:'物料提升机'},
          //         ],
          // 整改情况
          //横坐标（年份）
          changeYear:[],
          // 未整改
          noChangeData:[],
          // 总数
          allData:[],
          // 安全隐患的key
          safeTroubleKey:[],
          // 安全隐患的Value
          safeTroubleValue:[],
          // 问题趋势分析的年份
          trendData:[],
          // 安全检查数据
          checkValue:[],
          checkKey:[],
          // 重大危险源的标签
          dangerTitle:[],
          dangerData:[],
          loading: true,
          myChart1: '',
          myChart12: '',
          myChart21: '',
          myChart22: '',
          myChart23: '',
          myChart24: '',
          myChart32: '',
          myChart13: '',
          myChart41: '',
          myChart42: '',
          myChart43: '',
          myChart44: '',
          option4: '',
          option5: '',
          option6: '',
          option7: '',
          angle: 0,
          resizeTimer: null,
          timer: '',
          option: '',
          configTable: {
            header: ['安全事件', '记录时间', '安全类型', '处理情况'],
            headerHeight: 45,
            data: [
              // ['设备安全检查', '2019-10-13', '1号塔机检测', '<span style="color: #67c23a; ">通过</span>'],
              // ['人员安全检查', '2019-10-13', '员工未佩戴安全帽', '<span style="color: #f56c6c; ">整改</span>'],
              // ['用电安全检查', '2020-10-13', '用电规范', '<span style="color: #67c23a; ">通过</span>'],
              // ['设备安全检查', '2020-01-13', '2号塔机检测', '<span style="color: #e6a23c; ">警告</span>'],
              // ['人员安全检查', '2019-01-10', '佩戴安全带作业', '<span style="color: #67c23a; ">通过</span>'],
              // ['消防检查', '2019-12-30', '灭火器材配备不合理', '<span style="color: #f56c6c; ">整改</span>'],
              // ['施工现场标牌', '2020-01-15', '安全标语不醒目', '<span style="color: #f56c6c; ">整改</span>'],
              // ['基坑支护', '2020-09-07', '防护措施不符合要求', '<span style="color: #e6a23c; ">警告</span>'],
            ],
            rowNum: 7,
            align: ['center', 'center', 'center', 'center', 'center'],
            headerBGC: '',
            evenRowBGC: ''
          },
        }
      },
      created() {
        this.getConstructionSiteName(localStorage.getItem('siteId'))
        console.log("siteId",localStorage.getItem('siteId'))
      },
      mounted() {
        // this.getProblem()
        // this.getSafetyTrouble()
        // this.getSafetyRecord()
        // this.getDanger()
        // this.getRectification()
        // this.getSafetyCheck()
          var _this = this
        this.$store.dispatch('changeMsg', '安全管理')
        setTimeout(() => {
          this.loading = false
        }, 600)
        this.changeColor()
        // setTimeout(() => {
        //
        //
        //
        //   // this.myChart23.on('mouseover', function(params) {
        //   //   _this.stopTimer();
        //   // });
        //   //
        //   // this.myChart23.on('mouseout', function(params) {
        //   //   _this.startTimer();
        //   // })
        // },610)
        this.inchart1()

        this.inchart13()
        // this.inchart21()
        // this.inchart22()
        // this.inchart23()
        this.inchart24()
        this.inchart32()
        this.inchart12()
        this.inchart41()
        this.inchart42()
        this.inchart43()
        this.inchart44()
        setInterval(function () {
          _this.draw()
        },100)
        // _this.startTimer()
        // _this.myChart23.on('mouseover', function(params) {
        //   _this.stopTimer();
        // });
        //
        // _this.myChart23.on('mouseout', function(params) {
        //   _this.startTimer();
        // });

        // setTimeout(_this.startTimer, 620);
        // setTimeout(() => {
        //

        //   this.startTimer()
        // },620)
        this.chart1Res()
        this.chart12Res()
        // this.chart21Res()
        // this.chart22Res()
        // this.chart23Res()
        this.chart24Res()
        this.chart13Res()
        this.chart32Res()

      },
      methods: {
        changeColor(){

        },
        inchart1() {
            this.myChart1 = this.$echarts.init(document.getElementById('mychart1'));
            var num1 = 45;
            var num2 = 70;
            var num3 = 15;
            var num4 = 55;
            var num5 = 65;
            var num6 = 75;
            var option = {
              // backgroundColor: '#292c33',
              title: [{
                text: '',
                x: '50%',
                y: 10,
                textAlign: 'center',
                textStyle: {
                  fontSize: '18',
                  fontWeight:'600',
                  color: '#fff',
                  textAlign: 'center',
                },
              },{
                text: this.checkValue[0],
                left: '14%',
                top: '40%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgb(106,192,240)',
                  textAlign: 'center',
                },
              }, {
                text: this.checkKey[0],
                left: '14%',
                top: '50%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '14',
                  // fontWeight:'600',
                  color: 'rgb(106,192,240)',
                  textAlign: 'center',
                },
              },{
                text: this.checkValue[1],
                left: '37%',
                top: '40%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(251, 200, 79, 1)',
                  textAlign: 'center',
                },
              }, {
                text: this.checkKey[1],
                left: '37%',
                top: '50%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(251, 200, 79, 1)',
                  textAlign: 'center',
                },
              },{
                text: this.checkValue[2],
                left: '61.5%',
                top: '40%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(89, 180, 157, 1)',
                  textAlign: 'center',
                },
              },{
                text: this.checkKey[2],
                left: '61.5%',
                top: '50%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(89, 180, 157, 1)',
                  textAlign: 'center',
                },
              },{
                text: this.checkValue[3],
                left: '84.5%',
                top: '40%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(232, 85, 63, 1)',
                  textAlign: 'center',
                },
              },{
                text: this.checkKey[3],
                left: '84.5%',
                top: '50%',
                textAlign: 'center',
                textStyle: {
                  fontSize: '16',
                  // fontWeight:'600',
                  color: 'rgba(232, 85, 63, 1)',
                  textAlign: 'center',
                },
              },
              //   {
              //   text: '130',
              //   left: '19.5%',
              //   top: '60%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgb(106,192,240)',
              //     textAlign: 'center',
              //   },
              // },
              //   {
              //   text: '累计检查',
              //   left: '19.5%',
              //   top: '70%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '14',
              //     // fontWeight:'600',
              //     color: 'rgb(106,192,240)',
              //     textAlign: 'center',
              //   },
              // },{
              //   text: '45',
              //   left: '39%',
              //   top: '60%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(251, 200, 79, 1)',
              //     textAlign: 'center',
              //   },
              // }, {
              //   text: '警告',
              //   left: '39%',
              //   top: '70%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(251, 200, 79, 1)',
              //     textAlign: 'center',
              //   },
              // },{
              //   text: '65',
              //   left: '59.5%%',
              //   top: '60%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(232, 85, 63, 1)',
              //     textAlign: 'center',
              //   },
              // },{
              //   text: '整改',
              //   left: '59.5%%',
              //   top: '70%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(232, 85, 63, 1)',
              //     textAlign: 'center',
              //   },
              // },{
              //   text: '15',
              //   left: '79.5%',
              //   top: '60%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(89, 180, 157, 1)',
              //     textAlign: 'center',
              //   },
              // },{
              //   text: '通过',
              //   left: '79.5%',
              //   top: '70%',
              //   textAlign: 'center',
              //   textStyle: {
              //     fontSize: '16',
              //     // fontWeight:'600',
              //     color: 'rgba(89, 180, 157, 1)',
              //     textAlign: 'center',
              //   },
              // },
              ],
              series: [
                {
                  type: 'pie',
                  radius: ['45%', '48%'],
                  center: ['15%', '50%'],
                  data: [{
                    hoverOffset: 1,
                    value: num1,
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
                      value: 100 - num1,
                      hoverAnimation: false,
                      itemStyle: {
                        color: 'rgba(251, 200, 79, .2)',
                      },
                    }
                  ]
                },
                {
                  type: 'pie',
                  radius: ['50%', '53%'],
                  center: ['15%', '50%'],
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
                  radius: ['43%', '40%'],
                  center: ['15%', '50%'],
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
                  radius: ['45%', '48%'],
                  center: ['38%', '50%'],
                  data: [{
                    hoverOffset: 1,
                    value: num1,
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
                      value: 100 - num1,
                      hoverAnimation: false,
                      itemStyle: {
                        color: 'rgba(251, 200, 79, .2)',
                      },
                    }
                  ]
                },
                {
                  type: 'pie',
                  radius: ['50%', '53%'],
                  center: ['38%', '50%'],
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
                  radius: ['43%', '40%'],
                  center: ['38%', '50%'],
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
                  radius: ['45%', '48%'],
                  center: ['62%', '50%'],
                  data: [{
                    hoverOffset: 1,
                    value: num2,
                    name: '虚拟主机',
                    itemStyle: {
                      color: 'rgba(89, 180, 157, 1)',
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
                      value: 100 - num2,
                      hoverAnimation: false,
                      itemStyle: {
                        color: 'rgba(89, 180, 157, .2)',
                      },
                    }
                  ]
                },
                {
                  type: 'pie',
                  radius: ['50%', '53%'],
                  center: ['62%', '50%'],
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
                  radius: ['43%', '40%'],
                  center: ['62%', '50%'],
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

                {
                  type: 'pie',
                  radius: ['45%', '48%'],
                  center: ['85%', '50%'],
                  data: [{
                    hoverOffset: 1,
                    value: num3,
                    name: '虚拟主机',
                    itemStyle: {
                      color: 'rgba(232,85,63, 1)',
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
                      value: 100 - num3,
                      hoverAnimation: false,
                      itemStyle: {
                        color: 'rgba(232,85,63, .2)',
                      },
                    }
                  ]
                },
                {
                  type: 'pie',
                  radius: ['50%', '53%'],
                  center: ['85%', '50%'],
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
                {
                  type: 'pie',
                  radius: ['43%', '40%'],
                  center: ['85%', '50%'],
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
                //
                // {
                //   type: 'pie',
                //   radius: ['30%', '33%'],
                //   center: ['20%', '70%'],
                //   data: [{
                //     hoverOffset: 1,
                //     value: num1,
                //     name: '虚拟主机',
                //     itemStyle: {
                //       color: 'rgb(106,192,240)',
                //     },
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     hoverAnimation: false,
                //   },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num1,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(251, 200, 79, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '38%'],
                //   center: ['20%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['28%', '25%'],
                //   center: ['20%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                //
                // {
                //   type: 'pie',
                //   radius: ['30%', '33%'],
                //   center: ['40%', '70%'],
                //   data: [{
                //     hoverOffset: 1,
                //     value: num1,
                //     name: '虚拟主机',
                //     itemStyle: {
                //       color: 'rgba(251, 200, 79, 1)',
                //     },
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     hoverAnimation: false,
                //   },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num1,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(251, 200, 79, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '38%'],
                //   center: ['40%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['28%', '25%'],
                //   center: ['40%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                //
                // {
                //   type: 'pie',
                //   radius: ['30%', '33%'],
                //   center: ['60%', '70%'],
                //   data: [{
                //     hoverOffset: 1,
                //     value: num2,
                //     name: '虚拟主机',
                //     itemStyle: {
                //       color: 'rgba(232, 85, 63, 1)',
                //     },
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     hoverAnimation: false,
                //   },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num2,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(232, 85, 63, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '38%'],
                //   center: ['60%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num2,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['28%', '25%'],
                //   center: ['60%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num3,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                //
                // {
                //   type: 'pie',
                //   radius: ['30%', '33%'],
                //   center: ['80%', '70%'],
                //   data: [{
                //     hoverOffset: 1,
                //     value: num3,
                //     name: '虚拟主机',
                //     itemStyle: {
                //       color: 'rgba(89, 180, 157, 1)',
                //     },
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     hoverAnimation: false,
                //   },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num3,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(89, 180, 157, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '38%'],
                //   center: ['80%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num3,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['28%', '25%'],
                //   center: ['80%', '70%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num3,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: 'rgba(63, 66, 73, .3)',
                //     },
                //   }]
                // },

                // {
                //   type: 'pie',
                //   radius: ['39.5%', '30%'],
                //   center: ['20%', '75%'],
                //   data: [
                //     {
                //       hoverOffset: 1,
                //       value: num1,
                //       name: '虚拟主机',
                //       itemStyle: {
                //         color: 'rgba(251, 200, 79, 1)',
                //       },
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       hoverAnimation: false,
                //     },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num1,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(251, 200, 79, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['31%', '36%'],
                //   center: ['20%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '33.5%'],
                //   center: ['20%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['36%', '27.5%'],
                //   center: ['20%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['37%', '30.7%'],
                //   center: ['20%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num5,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },
                //
                // {
                //   type: 'pie',
                //   radius: ['39.5%', '30%'],
                //   center: ['50%', '75%'],
                //   data: [
                //     {
                //       hoverOffset: 1,
                //       value: num1,
                //       name: '虚拟主机',
                //       itemStyle: {
                //         color: 'rgba(232, 85, 63, 1)',
                //       },
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       hoverAnimation: false,
                //     },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num1,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(232, 85, 63, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['31%', '36%'],
                //   center: ['50%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '33.5%'],
                //   center: ['50%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['36%', '27.5%'],
                //   center: ['50%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['37%', '30.7%'],
                //   center: ['50%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num5,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },
                //
                // {
                //   type: 'pie',
                //   radius: ['39.5%', '30%'],
                //   center: ['80%', '75%'],
                //   data: [
                //     {
                //       hoverOffset: 1,
                //       value: num1,
                //       name: '虚拟主机',
                //       itemStyle: {
                //         color: 'rgba(89, 180, 157, 1)',
                //       },
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       hoverAnimation: false,
                //     },
                //     {
                //       label: {
                //         show: false
                //       },
                //       labelLine: {
                //         normal: {
                //           smooth: true,
                //           lineStyle: {
                //             width: 0
                //           }
                //         }
                //       },
                //       value: 100 - num1,
                //       hoverAnimation: false,
                //       itemStyle: {
                //         color: 'rgba(89, 180, 157, .2)',
                //       },
                //     }
                //   ]
                // },
                // {
                //   type: 'pie',
                //   radius: ['31%', '36%'],
                //   center: ['80%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   radius: ['35%', '33.5%'],
                //   center: ['80%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['36%', '27.5%'],
                //   center: ['80%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num1,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#3d3d3d',
                //     },
                //   }]
                // },
                // {
                //   type: 'pie',
                //   z:'1',
                //   radius: ['37%', '30.7%'],
                //   center: ['80%', '75%'],
                //   data: [{
                //     label: {
                //       show: false
                //     },
                //     labelLine: {
                //       normal: {
                //         smooth: true,
                //         lineStyle: {
                //           width: 0
                //         }
                //       }
                //     },
                //     value: 100 - num5,
                //     hoverAnimation: false,
                //     itemStyle: {
                //       color: '#000',
                //     },
                //   }]
                // },



              ]
            };
            this.myChart1.setOption(option)

          },
        inchart13() {
          this.myChart13 = this.$echarts.init(document.getElementById('mychart13'));
          let innerFontColor = '#FFFFFF';
          let outerFontColor = '#666666';
          let scale = 1;
          let echartData = {
            inner: this.innerData,
            outer: this.outerData,
          }

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
            legend: {
              orient: 'vertical',
              right: 0,
              top: '20',
              itemWidth: 14 * scale,
              itemHeight: 8 * scale,
              data:legendData,
              textStyle: {
                color: '#2CABE3',
                fontSize: 12,
              },

            },
            series: [
              {
                name:'安全隐患统计',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],
                center:["30%","50%"],
                label: {
                  show:false
                  // normal: {
                  //   position: 'inner'
                  // }
                },
                labelLine: {
                  show:false
                  // normal: {
                  //   show: false,
                  //
                  // }
                },
                data:echartData.inner
              },
              {
                name:'安全隐患统计',
                type:'pie',
                radius: ['60%', '80%'],
                center:["30%","50%"],
                data:echartData.outer,
                label: {
                  show:false
                },
                labelLine: {
                  show:false
                },
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
          this.myChart13.setOption(option)
        },
        inchart12() {
          this.myChart12 = this.$echarts.init(document.getElementById('mychart12'))
          var category = [];
          var dottedBase = [];
          var lineData = this.allData;
          var barData = this.noChangeData;
          // var lineData = [12,9];
          // var barData = [1,2];
          var rateData = [];

          for (var i = 0; i < 17; i++) {
            var date = i+2001;
            category.push(date)
            var rate=barData[i]/lineData[i];
            rateData[i] = rate.toFixed(2);
          }
          var option = {
            title: {
              text: '',
              x: 'center',
              y: 0,
              textStyle:{
                color:'#B4B4B4',
                fontSize:16,
                fontWeight:'normal',
              },

            },
            // backgroundColor: '#191E40',
            tooltip: {
              trigger: 'axis',
              backgroundColor:'rgba(255,255,255,0.1)',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  backgroundColor: '#7B7DDC'
                }
              }
            },
            legend: {
              data: ['整改率', '未整改','总数',],
              textStyle: {
                color: '#B4B4B4'
              },
              top:'7%',
            },
            grid:{
              x:'12%',
              width:'82%',
              y:'22%',
            },
            xAxis: {
              data: this.changeYear,
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4'
                }
              },
              axisTick:{
                show:false,
              },
            },
            yAxis: [{
              // name:'问题个数',
              // nameLocation:'start',
              splitLine: {show: false},
              axisLine: {
                lineStyle: {
                  color: '#B4B4B4',
                }
              },

              axisLabel:{
                formatter:'{value} 个',
              }
            },
              {
                name:'整改率',
                nameLocation:'start',
                splitLine: {show: false},
                axisLine: {
                  lineStyle: {
                    color: '#B4B4B4',
                  }
                },
                axisLabel:{
                  formatter:'{value}',
                }
              }],

            series: [{
              name: '整改率',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'emptyCircle',
              symbolSize: 8,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color:'#F02FC2'},
              },
              data: rateData
            },

              {
                name: '未整改',
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: '#956FD4'},
                        {offset: 1, color: '#3EACE5'}
                      ]
                    )
                  }
                },
                data: barData
              },

              {
                name: '总数',
                type: 'bar',
                barGap: '-100%',
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        {offset: 0, color: 'rgba(156,107,211,0.5)'},
                        {offset: 0.2, color: 'rgba(156,107,211,0.3)'},
                        {offset: 1, color: 'rgba(156,107,211,0)'}
                      ]
                    )
                  }
                },
                z: -12,

                data: lineData
              },
            ]
          }
          this.myChart12.setOption(option)
        },
        chart1Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart1").offsetWidth
            let h = document.getElementById("mychart1").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart1.resize(resize);
            },100)
          })
        },
        chart12Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart12").offsetWidth
            let h = document.getElementById("mychart12").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart12.resize(resize);
            },100)
          })
        },
        inchart21() {
          this.myChart21 = this.$echarts.init(document.getElementById('mychart21'));
          var option = {
            // backgroundColor: "#0f375f",
            legend: {
              orient: 'vertical',
              top: "center",
              right: "5%",
              data: ['安全管理', '文明施工', '脚手架', '基坑支护安全', '模板工程安全', '施工用电', '物料提升机'],
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
              name: '安全隐患统计',
              type: 'pie',
              radius: ['30%', '80%'],
              center: ['40%', '50%'],
              roseType: 'radius',
              label: {
                show: true,
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
                value: 1,
                name: '安全管理',
                itemStyle: {
                  color: "#FEDF00",
                  borderColor: "#FEDF00",
                  borderWidth: 3
                }
              },
                {
                  value: 2,
                  name: '文明施工',
                  itemStyle: {
                    color: "#01FFFF",
                    borderColor: "#01FFFF",
                    borderWidth: 3
                  }
                },
                {
                  value: 3,
                  name: '基坑支护安全',
                  itemStyle: {
                    color: "#3769F4",
                    borderColor: "#3769F4",
                    borderWidth: 3
                  }
                },
                {
                  value: 4,
                  name: '模板工程安全',
                  itemStyle: {
                    color: "#6978F2",
                    borderColor: "#6978F2",
                    borderWidth: 3
                  }
                },
                {
                  value: 5,
                  name: '施工用电',
                  itemStyle: {
                    color: "#55D5B5",
                    borderColor: "#55D5B5",
                    borderWidth: 3
                  }
                },
                {
                  value: 6,
                  name: '物料提升机',
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
        inchart22() {
          this.myChart22 = this.$echarts.init(document.getElementById('mychart22'));
          var data = [
            {
              value: 12,
              name: '土木'
            },
            {
              value: 5,
              name: '钢筋工'
            },
            {
              value: 13,
              name: '架子工'
            },
            {
              value: 5,
              name: '电焊工'
            },
            {
              value: 40,
              name: '混凝土工'
            },
          ];
          var color = ['#61a0a8', '#F87D7C', '#41E1FF', '#55D5B5', '#616BA6', '#6978F2', '#3769F4', '#01FFFF', '#FEDF00']
          var option = {
            // backgroundColor:'#021434',
            color: color,
            title: [{
              text: '130',
              left: '60%',
              top: '40%',
              textAlign: 'center',
              textStyle: {
                fontSize: '16',
                // fontWeight:'600',
                color: 'rgb(106,192,240)',
                textAlign: 'center',
              },
            },{
              text: '累计交底',
              left: '60%',
              top: '50%',
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
              top: '30%',
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 15,
              textStyle: {
                color: '#ACCFFF',
                fontSize: 12,
              },
              data: ['土木', '钢筋工', '架子工', '电焊工', '混凝土工']
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
              center: ["43%", "50%"],

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
          this.myChart22.setOption(option)
        },
        inchart24() {
          this.myChart24 = this.$echarts.init(document.getElementById('mychart24'))
          var option = {
            // backgroundColor:"#0B1837",
            color: ["#FC9D9A","#F9CDAD","#C8C8A9","#dc69aa","#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#07a2a4","#9a7fd1","#588dd5","#f5994e","#c05050","#59678c","#c9ab00","#7eb00a",
              "#8d98b3","#FFEA01","#B8D07C","#fca4bb","#6f5553","#c14089",],
            // title: {
            //     text: '网络/安全设备',
            //     left: '60',
            //     top: 0,
            //     textAlign: 'center',
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         fontWeight: 0
            //     }
            // },
            grid: {
              left: -100,
              top: 50,
              bottom: 10,
              right: 10,
              containLabel: true
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
            },
            legend: {
              type: "scroll",
              orient: "vartical",
              // x: "right",
              top: "25",
              left: "15",
              // bottom: "0%",
              itemWidth: 16,
              itemHeight: 8,
              itemGap: 10,
              textStyle: {
                color: '#A3E2F4',
                fontSize: 12,
                fontWeight: 0
              },
              data:this.dangerTitle
              // data: ['火灾', '触电', '其他', '设备倾覆', '结构坍塌', '高空坠物']
            },
            polar: {},
            angleAxis: {
              interval: 1,
              type: 'category',
              data: [],
              z: 10,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#0B4A6B",
                  width: 1,
                  type: "solid"
                },
              },
              axisLabel: {
                interval: 0,
                show: true,
                color: "#0B4A6B",
                margin: 8,
                fontSize: 16
              },
            },
            radiusAxis: {
              min: 40,
              max: 120,
              interval: 20,
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#0B3E5E",
                  width: 1,
                  type: "solid"
                },
              },
              axisLabel: {
                formatter: '{value} %',
                show: false,
                padding: [0, 0, 20, 0],
                color: "#0B3E5E",
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  color: "#0B3E5E",
                  width: 2,
                  type: "solid"
                }
              }
            },
            calculable: true,
            series: [{
              type: 'pie',
              radius: ["5%", "10%"],
              hoverAnimation: false,
              labelLine: {
                normal: {
                  show: false,
                  length: 30,
                  length2: 55
                },
                emphasis: {
                  show: false
                }
              },
              data: [{
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B"
                  }
                }
              }]
            }, {
              type: 'pie',
              radius: ["90%", "95%"],
              hoverAnimation: false,
              labelLine: {
                normal: {
                  show: false,
                  length: 30,
                  length2: 55
                },
                emphasis: {
                  show: false
                }
              },
              name: "",
              data: [{
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B"
                  }
                }
              }]
            },{
              stack: 'a',
              type: 'pie',
              radius: ['20%', '80%'],
              roseType: 'area',
              zlevel:10,
              label:{
                show:false
              },
              labelLine:{
                show:false,
              },
              // label: {
              //   normal: {
              //     show: true,
              //     formatter: "{c}",
              //     textStyle: {
              //       fontSize: 12,
              //     },
              //     position: 'outside'
              //   },
              //   emphasis: {
              //     show: true
              //   }
              // },
              // labelLine: {
              //   normal: {
              //     show: true,
              //     length: 20,
              //     length2: 55
              //   },
              //   emphasis: {
              //     show: false
              //   }
              // },
              data:this.dangerData
              //   [
              //   {
              //   value: 10,
              //   name: '火灾'
              // },
              //   {
              //     value: 5,
              //     name: '触电'
              //   },
              //   {
              //     value: 15,
              //     name: '其他'
              //   },
              //   {
              //     value: 25,
              //     name: '设备倾覆'
              //   },
              //   {
              //     value: 20,
              //     name: '结构坍塌'
              //   },
              //   {
              //     value: 35,
              //     name: '高空坠物'
              //   }
              // ]
            }, ]
          }
          this.myChart24.setOption(option)
        },
        inchart32() {
          this.myChart32 = this.$echarts.init(document.getElementById('mychart32'));
          var option = {
            // backgroundColor:'#232d36',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(0, 255, 233,0)'
                    }, {
                      offset: 0.5,
                      color: 'rgba(255, 255, 255,1)',
                    }, {
                      offset: 1,
                      color: 'rgba(0, 255, 233,0)'
                    }],
                    global: false
                  }
                },
              },
            },
            legend: {
              data: ['新增问题数', '消除问题数', '现存问题数'],
              // top: '2%',
              textStyle: {
                color: '#2CABE3',
                fontSize: 12,
              },
            },
            // color: [],
            grid: {
              top: '15%',
              left: '10%',
              right: '5%',
              bottom: '15%',
              // containLabel: true
            },
            xAxis: [{
              type: 'category',
              axisLine: {
                show: false,
                color:'#A582EA'
              },

              axisLabel: {
                color: '#A582EA',
                width:100
              },
              splitLine: {
                show: false
              },
              boundaryGap: false,
              //data: ["2020-06-21","2020-06-22","2020-06-23","2020-06-24","2020-06-25","2020-06-26","2020-06-27"]//this.$moment(data.times).format("HH-mm") ,
              data:this.progressXData
            }],

            yAxis: [{
              type: 'value',
              min: 0,
              // max: 140,
              splitNumber: 4,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#00BFF3',
                  opacity:0.23
                }
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                margin: 20,
                textStyle: {
                  color: '#fff',

                },
              },
              axisTick: {
                show: false,
              },
            }],
            series: [
              {
                name:'新增问题数',
                type: 'line',
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                  normal: {
                    color: "#A582EA",
                  },
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#A582EA',
                  }
                },
                itemStyle: {
                  color: "#fff",
                  borderColor: "#A582EA",
                  borderWidth: 2,
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(43,193,145,0.3)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(43,193,145,0)'
                      }
                    ], false),
                  }
                },
                //data: [4,7,5,4,3,5,8]//data.values
                 data:this.newProblem
              },
              {
                name:'消除问题数',
                type: 'line',
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                  normal: {
                    color: "#2CABE3",
                  },
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#2CABE3',
                  }
                },
                itemStyle: {
                  color: "#fff",
                  borderColor: "#2CABE3",
                  borderWidth: 2,
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(81,150,164,0.3)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(81,150,164,0)'
                      }
                    ], false),
                  }
                },
                //data: [3,5,4,2,1,7,6]//data.values
                data:this.delProblem
              },
              {
                name:'现存问题数',
                type: 'line',
                showAllSymbol: true,
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                  normal: {
                    color: "#00ca95",
                  },
                },
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#00ca95',
                  }
                },
                itemStyle: {
                  color: "#fff",
                  borderColor: "#00ca95",
                  borderWidth: 2,
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(81,150,164,0.3)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(81,150,164,0)'
                      }
                    ], false),
                  }
                },
                //data: [5,2,3,1,8,3,4]//data.values
                data:this.curProblem
              },
            ]
          }
          this.myChart32.setOption(option)
        },
        inchart41() {
          this.myChart41 = this.$echarts.init(document.getElementById('mychart41'));
          var _this = this
          //角度，用来做简单的动画效果的
          let value = 55;
          var option = {
            // backgroundColor:"#061740",
            title: [{
              text: '{a|'+ value +'次}',
              x: 'center',
              y: '40%',
              textStyle: {
                rich:{
                  a: {
                    fontSize: 16,
                    color: '#29EEF3'
                  },

                  c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                  }
                }
              }
            },
              {
                text: '举办次数',
                x: 'center',
                y: '50%',
                textStyle: {
                  fontSize: 14,
                  color: '#ffffff'
                }
              }],
            legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                name: '涨价后没吃过',
                icon: "circle"
              }, {
                name: '天天吃',
                icon: "circle"
              }, {
                name: '三五天吃一次',
                icon: "circle"
              }, {
                name: '半个月吃一次',
                icon: "circle"
              }],
              textStyle: {
                color: "white",
                fontSize: 16,
                padding: [10, 1, 10, 0]
              },
              selectedMode:false
            },
            series: [ {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0+_this.angle) * Math.PI / 180,
                    endAngle: (90+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180+_this.angle) * Math.PI / 180,
                    endAngle: (270+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270+-_this.angle) * Math.PI / 180,
                    endAngle: (40+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90+-_this.angle) * Math.PI / 180,
                    endAngle: (220+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (90+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",//粉
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (270+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",      //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
                {
                  value: 100-value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },

              {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 60,
                  lineStyle: {
                    width: 0,
                    color: "#061740"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },

            ]
          }
          _this.option4 = option
        },
        inchart42() {
          this.myChart42 = this.$echarts.init(document.getElementById('mychart42'));
          var _this = this
          //角度，用来做简单的动画效果的
          let value = 67;
          var option = {
            // backgroundColor:"#061740",
            title: [{
              text: '{a|'+ value +'人}',
              x: 'center',
              y: '40%',
              textStyle: {
                rich:{
                  a: {
                    fontSize: 16,
                    color: '#29EEF3'
                  },

                  c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                  }
                }
              }
            },
              {
                text: '参与人数',
                x: 'center',
                y: '50%',
                textStyle: {
                  fontSize: 14,
                  color: '#ffffff'
                }
              }],
            legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                name: '涨价后没吃过',
                icon: "circle"
              }, {
                name: '天天吃',
                icon: "circle"
              }, {
                name: '三五天吃一次',
                icon: "circle"
              }, {
                name: '半个月吃一次',
                icon: "circle"
              }],
              textStyle: {
                color: "white",
                fontSize: 16,
                padding: [10, 1, 10, 0]
              },
              selectedMode:false
            },
            series: [ {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0+_this.angle) * Math.PI / 180,
                    endAngle: (90+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180+_this.angle) * Math.PI / 180,
                    endAngle: (270+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270+-_this.angle) * Math.PI / 180,
                    endAngle: (40+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90+-_this.angle) * Math.PI / 180,
                    endAngle: (220+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (90+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",//粉
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (270+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",      //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
                {
                  value: 100-value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },

              {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 60,
                  lineStyle: {
                    width: 0,
                    color: "#061740"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },

            ]
          }
          _this.option5 = option
        },
        inchart43() {
          this.myChart43 = this.$echarts.init(document.getElementById('mychart43'));
          var _this = this
          //角度，用来做简单的动画效果的
          let value = 45;
          var option = {
            // backgroundColor:"#061740",
            title: [{
              text: '{a|'+ value +'个}',
              x: 'center',
              y: '40%',
              textStyle: {
                rich:{
                  a: {
                    fontSize: 16,
                    color: '#29EEF3'
                  },

                  c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                  }
                }
              }
            },
              {
                text: '视频数目',
                x: 'center',
                y: '50%',
                textStyle: {
                  fontSize: 14,
                  color: '#ffffff'
                }
              }],
            legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                name: '涨价后没吃过',
                icon: "circle"
              }, {
                name: '天天吃',
                icon: "circle"
              }, {
                name: '三五天吃一次',
                icon: "circle"
              }, {
                name: '半个月吃一次',
                icon: "circle"
              }],
              textStyle: {
                color: "white",
                fontSize: 16,
                padding: [10, 1, 10, 0]
              },
              selectedMode:false
            },
            series: [ {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0+_this.angle) * Math.PI / 180,
                    endAngle: (90+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180+_this.angle) * Math.PI / 180,
                    endAngle: (270+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270+-_this.angle) * Math.PI / 180,
                    endAngle: (40+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90+-_this.angle) * Math.PI / 180,
                    endAngle: (220+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (90+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",//粉
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (270+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",      //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
                {
                  value: 100-value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },

              {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 60,
                  lineStyle: {
                    width: 0,
                    color: "#061740"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },

            ]
          }
          _this.option6 = option
        },
        inchart44() {
          this.myChart44 = this.$echarts.init(document.getElementById('mychart44'));
          var _this = this
          //角度，用来做简单的动画效果的
          let value = 35;
          var option = {
            // backgroundColor:"#061740",
            title: [{
              text: '{a|'+ value +'个}',
              x: 'center',
              y: '40%',
              textStyle: {
                rich:{
                  a: {
                    fontSize: 16,
                    color: '#29EEF3'
                  },

                  c: {
                    fontSize: 20,
                    color: '#ffffff',
                    // padding: [5,0]
                  }
                }
              }
            },
              {
                text: '文档数目',
                x: 'center',
                y: '50%',
                textStyle: {
                  fontSize: 14,
                  color: '#ffffff'
                }
              }],
            legend: {
              type: "plain",
              orient: "vertical",
              right: 0,
              top: "10%",
              align: "auto",
              data: [{
                name: '涨价后没吃过',
                icon: "circle"
              }, {
                name: '天天吃',
                icon: "circle"
              }, {
                name: '三五天吃一次',
                icon: "circle"
              }, {
                name: '半个月吃一次',
                icon: "circle"
              }],
              textStyle: {
                color: "white",
                fontSize: 16,
                padding: [10, 1, 10, 0]
              },
              selectedMode:false
            },
            series: [ {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (0+_this.angle) * Math.PI / 180,
                    endAngle: (90+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.6,
                    startAngle: (180+_this.angle) * Math.PI / 180,
                    endAngle: (270+_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (270+-_this.angle) * Math.PI / 180,
                    endAngle: (40+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65,
                    startAngle: (90+-_this.angle) * Math.PI / 180,
                    endAngle: (220+-_this.angle) * Math.PI / 180
                  },
                  style: {
                    stroke: "#0CD3DB",
                    fill: "transparent",
                    lineWidth: 1.5
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (90+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",//粉
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: "ring5",  //绿点
              type: 'custom',
              coordinateSystem: "none",
              renderItem: function(params, api) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.65;
                let point = _this.getCirlPoint(x0, y0, r, (270+-_this.angle))
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4
                  },
                  style: {
                    stroke: "#0CD3DB",      //绿
                    fill: "#0CD3DB"
                  },
                  silent: true
                };
              },
              data: [0]
            }, {
              name: '吃猪肉频率',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: "center",

                }
              },
              data: [{
                value: value,
                name: "",
                itemStyle: {
                  normal: {
                    color: { // 完成的圆环的颜色
                      colorStops: [{
                        offset: 0,
                        color: '#4FADFD' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: '#28E8FA' // 100% 处的颜色
                      }]
                    },
                  }
                }
              },
                {
                  value: 100-value,
                  name: "",
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#173164"
                    }
                  }
                }
              ]
            },

              {
                name: "",
                type: "gauge",
                radius: "58%",
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 359.9,
                splitNumber: 8,
                hoverAnimation: true,
                axisTick: {
                  show: false
                },
                splitLine: {
                  length: 60,
                  lineStyle: {
                    width: 0,
                    color: "#061740"
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: {
                  show: false
                },
                axisLine: {
                  lineStyle: {
                    opacity: 0
                  }
                },
                detail: {
                  show: false
                },
                data: [{
                  value: 0,
                  name: ""
                }]
              },

            ]
          }
          _this.option7 = option
        },
        getCirlPoint(x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
          let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
          return {
            x: x1,
            y: y1
          }
        },
        draw() {
          this.angle = this.angle+3
          this.myChart41.setOption(this.option4, true)
          this.myChart42.setOption(this.option5, true)
          this.myChart43.setOption(this.option6, true)
          this.myChart44.setOption(this.option7, true)
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
        chart23Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart23").offsetWidth
            let h = document.getElementById("mychart23").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart23.resize(resize);
            },100)
          })
        },
        chart32Res() {
          let _this = this;
          window.addEventListener('resize', function () {
            let w = document.getElementById("mychart32").offsetWidth
            let h = document.getElementById("mychart32").offsetHeight
            let resize = {
              width: w,
              height: h
            }
            // _this.myChart1.resize();
            setTimeout(() => {
              _this.myChart32.resize(resize);
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
        inchart23() {
          this.myChart23 = this.$echarts.init(document.getElementById('mychart23'))
          var _this = this
          var option = {
            // backgroundColor: '#142468',
            title:{
              text: '安全日志',
              left: '50%',
              top: '50%',
              textAlign: 'center',
              textStyle: {
                fontSize: '16',
                // fontWeight:'600',
                color: 'rgb(106,192,240)',
                textAlign: 'center',
              },
            },
            series: [
              {
                type: 'pie',
                zlevel: 1,
                silent: true,
                /*
                radius
                饼图的半径。可以为如下类型：
                number：直接指定外半径值。
                string：例如，'20%'，表示外半径为可视区尺寸（容器高宽中较小一项）的 20% 长度。
                Array.<number|string>：数组的第一项是内半径，第二项是外半径。每一项遵从上述 number string 的描述。
                */
                radius: ['77%', '78%'],
                hoverAnimation: false,
                //color: "rgba(88,142,197,0.5)",
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#9933FF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#00CCFF' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                // animation:false,    //charts3 no
                label: {
                  normal: {
                    show: false
                  },
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [1]
              },
              {
                type: 'pie',
                zlevel: 2,
                silent: true,
                radius: ['70%', '71%'],
                startAngle: 90,
                hoverAnimation: false,
                // animation:false,    //charts3 no
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#9933FF' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#00CCFF' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                label: {
                  normal: {
                    show: false
                  },
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: _this.pie2()
              },
              {
                type: 'pie',
                zlevel: 3,
                silent: true,
                radius: ['63%', '64%'],
                label: {
                  normal: {
                    show: false
                  },
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: _this.pie3()
              },
              {
                type: 'pie',
                zlevel: 4,
                silent: true,
                radius: ['48%', '60%'],
                color: ["#fc8d89", "#46d3f3", "rgba(203,203,203,0.9)"],
                startAngle: 50,
                hoverAnimation: false,
                // animation:false,    //charts3 no
                label: {
                  normal: {
                    show: false
                  },
                },
                data: [1,2,3]
              },
              {
                name: '统计',
                type: 'gauge',
                splitNumber: 30, //刻度数量
                min: 0,
                max: 100,
                radius: '68%', //图表尺寸
                center: ['50%', '50%'],
                startAngle: 90,
                endAngle: -269.9999,
                axisLine: {
                  show: true,
                  lineStyle: {
                    width: 0,
                    shadowBlur: 0,
                    color: [
                      [0, '#0dc2fe'],
                      [1, '#0dc2fe']
                    ]
                  }
                },
                axisTick: {
                  show: false,
                  lineStyle: {
                    color: '#0dc2fe',
                    width: 2
                  },
                  length: 20,
                  splitNumber: 5
                },
                splitLine: {
                  show: false,
                  length: 20,
                  lineStyle: {
                    color: '#0dc2fe',
                  }
                },
                axisLabel: {
                  show: false
                },
                pointer: { //仪表盘指针
                  show: 0,
                },
                detail: {
                  borderColor: '#fff',
                  shadowColor: '#fff', //默认透明
                  shadowBlur: 2,
                  offsetCenter: [0, '-10%'], // x, y，单位px
                  textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#fff',
                    fontSize: 18,
                  },
                  formatter: '{value}'
                },
                data: [{
                  name: "",
                  value: 2020,
                }]
              },
            ]
          };
          // this.option = option
          this.myChart23.setOption(option)

        },
        tests() {
            this.config1 = {
              umber: [999],
              content: '{nt}个'
            }
        },
        pie1() {
          let dataArr = [];
          for (var i = 0; i < 8; i++) {

            dataArr.push({
              name: (i + 1).toString(),
              value: 20,
              itemStyle: {
                normal: {
                  color: "rgba(88,142,197,0.4)",
                  borderWidth: 0,
                  borderColor: "rgba(0,0,0,0)"
                }
              }
            })

          }
          return dataArr

        },
        pie2() {
          let dataArr = [];
          let _color = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#9933FF' // 0% 处的颜色
            }, {
              offset: 1, color: '#00CCFF' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
          for (var i = 0; i < 16; i++) {
            if (i % 4 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 50,
                itemStyle: {
                  normal: {
                    //color: "rgba(88,142,197,0.5)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            }else if (i % 4 === 1) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 2,
                itemStyle: {
                  normal: {
                    color: "rgba(88,142,197,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            } else if (i % 4 === 2) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                  normal: {
                    //color: "rgba(88,142,197,0.2)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 2,
                itemStyle: {
                  normal: {
                    //color: "rgba(0,0,0,0)",
                    color: "rgba(88,142,197,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            }

          }
          return dataArr
        },
        pie3() {
          let dataArr = [];
          for (var i = 0; i < 100; i++) {
            if (i % 2 === 0) {
              dataArr.push({
                name: (i + 1).toString(),
                value: 25,
                itemStyle: {
                  normal: {
                    color: "rgb(126,190,255)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            } else {
              dataArr.push({
                name: (i + 1).toString(),
                value: 20,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            }

          }
          return dataArr
        },
        pieData(data) {
          let _data = data;
          let dataArr = [];
          for (var i = 0; i < 5; i++) {
            if (i === 2) {
              let dt = (data[0].unit) ? 25 : (Number(data[0].value));
              dataArr.push({
                name: (i + 1).toString(),
                value: dt,
                itemStyle: {
                  normal: {

                    color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                      offset: 0,
                      color: 'rgb(147,187,216)'
                    }, {
                      offset: 1,
                      color: '#588ec5'
                    }]),
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0.4)"

                  }
                }
              })
            } else {
              let dta = (data[0].unit) ? 25 : (1 - Number(data[0].value)) / 4;
              dataArr.push({
                name: (i + 1).toString(),
                value: dta,
                itemStyle: {
                  normal: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0,
                    borderColor: "rgba(0,0,0,0)"
                  }
                }
              })
            }

          }
          //console.log(dataArr)
          return dataArr
        },
        doing() {
          let option = this.myChart23.getOption();
          option.series[1].startAngle = option.series[1].startAngle + 1;
          option.series[3].startAngle = option.series[3].startAngle - 1;
          // option.series[3].startAngle = option.series[3].startAngle - 1;
          option.series[4].data[0].value = option.series[4].data[0].value + 1;
          this.myChart23.setOption(option);
          // console.log(this.i++)
        },
        startTimer() {
          this.timer = setInterval(this.doing, 100);
        },
        stopTimer() {
          clearInterval(this.timer);
          // xzTimer = null;
        },
        // 获取安全检查记录
        getSafetyRecord(){
          const prames = {
            sitename:this.proName
          }
          getSafetyRecord(prames).then((res) => {
            //console.log("后端传回监督记录",res.data.data)

            var data2 = []
            for(var i = 0 ;i < res.data.data.length;i++ ){
              var data1 = []
              data1.push(res.data.data[i].checkTypeOffspring)
              data1.push(res.data.data[i].startTime)
              data1.push(res.data.data[i].checkType)
              if(res.data.data[i].processStatus === 1){
                data1.push("<span style='color: #3ad7fa'>未处理</span>")
              } else if (res.data.data[i].processStatus === 2) {
                data1.push("<span style='color: rgb(251,200,79)'>处理中</span>")
              } else if (res.data.data[i].processStatus === 3) {
                data1.push("<span style='color: rgb(89,180,157)'>已完成</span>")
              } else if (res.data.data[i].processStatus === 4) {
                data1.push("<span style='color: rgb(232,85,63)'>逾期</span>")
              }
              data2.push(data1)


            }
            // console.log("data2",data2)
            // 快速找到
            // for(var i=0;i<data2.length;i++){
            //   if(data[i][4]==="未处理"){
            //
            //   }else if(data[i][4]==="处理中"){
            //
            //   }else if(data[i][4]==="已完成"){
            //
            //   }else if(data[i][4]==="逾期"){
            //
            //   }
            // }
            //console.log("data2",data2)
            this.configTable = {
              header: ['安全事件', '记录时间', '安全类型', '处理情况'],
              headerHeight: 45,
              data: data2,
              rowNum: 7,
              align: ['center', 'center', 'center', 'center', 'center'],
              headerBGC: '',
              evenRowBGC: ''
            }
          })
        },
        // 重大危险源信息
        getDanger (){
          const prames = {
            sitename:this.proName
          }
          getDanger(prames).then((res) => {
            let dangerArr = res.data.data.map(item => {
              return{
                name:item.check_type_offspring,
                value:item.nums,
              }
            })

             for(var i=0;i<dangerArr.length;i++) {
               if (dangerArr[i].name === 0) {
                 dangerArr[i].name = "非重大危险源"
               } else if (dangerArr[i].name === 1) {
                 dangerArr[i].name = "重大危险源"
               }
               this.dangerTitle.push(dangerArr[i].name)
             }
            this.dangerData = dangerArr
            this.inchart24()
          })

        },
        // 获取整改信息
        getRectification (){
          getRectification ({
            sitename:this.proName
          }).then((res) => {
            for(var key in res.data.data.data){
              // console.log("key",key)
              this.changeYear.push(key)
              // console.log("value",res.data.data[key])
              this.noChangeData.push(res.data.data.data[key].unRectification)
              this.allData.push(res.data.data.data[key].rectificationSum)
            }
            this.changeYear.reverse()
            this.noChangeData.reverse()
            this.allData.reverse()
            this.noChangeData = Object.values(this.noChangeData)
            this.allData = Object.values(this.allData)
            // console.log("allData",this.allData)
            // console.log("noChangeData",this.noChangeData)
            this.inchart12()
          })

        },
        // 获取安全检查记录信息
        getSafetyCheck (){
          getSafetyCheck ({
            sitename:this.proName
          }).then((res) => {
            //console.log(res.data.data[0].key)
            // this.sumNum = res.data.data.length
            for(var i=0;i<res.data.data.length;i++) {
              if(res.data.data[i].key === 1){
                this.checkKey.push("未处理")
              } else if (res.data.data[i].key === 2) {
                this.checkKey.push("处理中")
              } else if (res.data.data[i].key === 3) {
                this.checkKey.push("已完成")
              } else if (res.data.data[i].key === 4) {
                this.checkKey.push("逾期")
              }
              this.checkValue.push(res.data.data[i].value)
              this.sumNum += res.data.data[i].value
            }
            //console.log("安全检查",this.checkData)
            this.inchart1()
          })
        },
        // 获取问题趋势接口
        getProblem (){

          getProblem ({
            sitename:this.proName
          }).then((res) => {
            //console.log("趋势分析",res.data.data)
            if(res.data.data.data) {
              for(var key in res.data.data.data){
                this.progressXData.push(key)
                this.newProblem.push(res.data.data.data[key].newProblem)
                this.delProblem.push(res.data.data.data[key].delProblem)
                this.curProblem.push(res.data.data.data[key].curProblem)
              }
              this.progressXData.reverse()
              // console.log("riqi",this.progressXData)
              this.newProblem.reverse()
              this.delProblem.reverse()
              this.curProblem.reverse()
              // console.log("key",this.progressXData)
              // console.log("newProblem",this.newProblem)
              // console.log("delProblem",this.delProblem)
              // console.log("curProblem",this.curProblem)
            }
            this.inchart32()
          })
        },
        // 获取安全隐患各个类型的数目
        getSafetyTrouble (){
          getSafetyTrouble ({
            sitename:this.proName
          }).then((res) => {
            //console.log("安全隐患统计")
            // {value:335,unit:'次', name:'易燃物乱摆放',},
             var Arr= res.data.data.map(item =>{
              return{
                value:item.value,
                unit:'次',
                name:item.key
              }
            })
            //console.log("Arr",Arr)
            for(var i=0;i<Arr.length;i++){
              if(i<Arr.length/2-1){
                this.innerData.push(Arr[i])
              }else{
                this.outerData.push(Arr[i])
              }
            }
            // console.log(this.innerData)
            // console.log(this.outerData)
            this.inchart13()
          })
        },
        // 根据工地id获取
        getConstructionSiteName(id) {
          getSysProData({
            deptId: id
            // deptId: 1031
          }).then(response => {
            console.log("2222222",response.data)
            console.log("2取到的proid",response.data.proName)
            this.proName = response.data.proName
            console.log("2拿到的proname",this.proName)
            this.getProblem()
            this.getSafetyTrouble()
            this.getSafetyRecord()
            this.getDanger()
            this.getRectification()
            this.getSafetyCheck()
          })
        },
      },
      destroyed() {
        clearInterval(this.timer);
      }
    }
</script>

<style scoped>
  .container {
    padding: 0.3rem;
  }
  .col-div {
    width: 100%;
    height: 3rem;
    background-image: url("../../assets/boxheader.png");
    background-size: 100% 100%;
    position: relative;
  }
  .col-div4 {
    width: 100%;
    background-image: url("../../assets/boxheader.png");
    background-size: 100% 100%;
    position: relative;
    height: 6.1rem;
  }
  .rowstyle {
    margin-top: 0.1rem;
  }
  .col-div2 {
    width: 100%;
    height: 3.3rem;
    background-image: url("../../assets/boxheader.png");
    background-size: 100% 100%;
    position: relative;
  }
  .load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #399EF4;
  }
  #mychart1 {
    width: 100%;
    height: 25vh;
  }
  #mychart12 {
    width: 100%;
    height: 25vh;
  }
  #mychart13 {
    width: 100%;
    height: 25vh;
  }
  #mychart22 {
    width: 100%;
    height: 25vh;
  }
  #mychart23 {
    width: 100%;
    height: 25vh;
  }
  #mychart24 {
    width: 100%;
    height: 25vh;
  }
  #mychart21 {
    width: 100%;
    height: 25vh;
  }
  #mychart32 {
    width: 100%;
    height: 25vh;
    position: absolute;
    top: 10%;
  }
  #mychart41 {
    width: 100%;
    height: 25vh;
    margin-top: 0.2rem;
  }
  #mychart42 {
    width: 100%;
    height: 25vh;
    margin-top: 0.2rem;
  }
  #mychart43 {
    width: 100%;
    height: 25vh;
    margin-top: 0.2rem;
  }
  #mychart44 {
    width: 100%;
    height: 25vh;
    margin-top: 0.2rem;
  }
  .box-txt {
    color: #ffa454;
    font-size: 0.2rem;
    position: absolute;
    top: 5%;
    left: 1%;
  }
  .box-txt4 {
    color: #ffa454;
    font-size: 0.2rem;
    position: absolute;
    top: 2%;
    left: 1%;
  }
  .box-text1 {
    color: rgb(106,192,240);
    font-size: 0.2rem;
    position: absolute;
    top: 30%;
    left: 1%;
  }
  .box-text2 {
    color: rgb(106,192,240);
    font-size: 0.2rem;
    position: absolute;
    top: 65%;
    left: 1%;
  }
  .box-text31 {
    width: 100%;
    height: 1.5rem;
    margin-top: 1rem;
    position: relative;
  }
  .box-txts {
    font-size: 0.25rem;
    color: rgb(106,192,240);
    position: absolute;
    top: 20%;
    left: 10%;
  }
  .box-txts2 {
    font-size: 0.25rem;
    position: absolute;
    top: 20%;
    right: 10%;
  }
  .box-txts3 {
    font-size: 0.2rem;
    color: rgb(106,192,240);
    position: absolute;
    top: 50%;
    right: 10%;
  }
  .border-top-left {
    height: 10px;
    background-image: url("../../assets/border/right-top.png");
    background-size: 100% 100%;
    width: 100%;
  }
  .saftNum{
    color: white;
    font-size: 16px;
    font-weight: 700;
    position: absolute;
    left: 40%;
    bottom: 10px;
    letter-spacing: 2px;
  }
</style>
