<template>
  <div class="app">
    <div class="notice_container">
      <div class="notice_left">
        <img src="../assets/homepage/laba.png">
        <span style="margin-left: 0.5rem">北京智慧工地新增一个项目引进了最新型建造方式......</span>
      </div>
      <div class="notice_right">
        <span>用户身份:</span>
        <span style="color:#13cafd ">管理员</span>
        <span style="margin-left: 0.1rem">在线人数:</span>
        <span style="color:#13cafd ">5</span>
        <span>人</span>
      </div>
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
              </div>
              <div class="pro_item_two">
              </div>
              <div class="pro_item_three">
              </div>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">建设单位：精准医疗中心责任有限公司</span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;padding-right: 0.1rem;margin-left: 0.1rem">设计单位：中路设计研究院</span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;padding-right: 0.1rem;margin-left: 0.1rem">监理单位：建设监理有限公司</span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;margin-left: 0.1rem">施工单位：建工集团第一建筑有限公司</span>
            </div>
            <div class="project_item">
              <span style="height: 0.43rem;line-height: 0.43rem;font-size: 0.08rem;color: #d2d7dc;padding-right: 0.1rem;margin-left: 0.1rem">备案编号：98387009JDHWUH</span>
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
        <el-col :span="12">
          <div style="padding-left: 0.3rem;margin-right: 0.3rem">
            <div class="video_container">
            </div>
            <div class="process">
              <div class="process_content">
                <span>项目进度</span>
              </div>
            </div>
          </div>
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
                    <p style="color: #fefefe">周五</p>
                    <p style="color: #fefefe">07月17日</p>
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe"><span style="font-size: 0.5rem">28</span>阴</p>
                    <p style="color: #fefefe">25-33℃</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.1rem">
                    <p style="color: #fefefe">多云转雷阵雨</p>
                    <p style="color: #fefefe">西南风3-6级</p>
                  </div>
                </div>
                <div class="green_two" style="width: 1.5rem">
                  <div style="position: relative;margin-top: 0.1rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/wendu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">温度</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/shidu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">湿度</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/fengsu.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">风速</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/zaoying.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">噪音</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/pm.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">PM2.5</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                  <div style="position: relative;margin-top: 0.17rem">
                    <img style="width: 0.3rem;position: absolute;top: -0.05rem" src="../assets/homepage/ten.png">
                    <span style="color: #fefefe;margin-left: 0.4rem">PM10</span>
                    <span style="color:#d15765;margin-left: 0.25rem;float: right">6.6</span>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">周六</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">07月18日</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/leizhenyu.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">25-33℃</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">多云转雷阵雨</p>
                    <p style="color: #fefefe">西南风3-6级</p>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">周日</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">07月19日</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/leizhenyu.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">25-33℃</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">多云转雷阵雨</p>
                    <p style="color: #fefefe">西南风3-6级</p>
                  </div>
                </div>
                <div class="green_three">
                  <div style="text-align: center">
                    <p style="color: #fefefe">周一</p>
                    <p style="color: #fefefe;margin-top: 0.15rem">07月20日</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.17rem">
                    <img src="../assets/homepage/qingtian.png">
                  </div>
                  <div style="text-align: center">
                    <p style="color: #fefefe">25-33℃</p>
                  </div>
                  <div style="text-align: center;margin-top: 0.15rem">
                    <p style="color: #fefefe">雷阵雨转晴</p>
                    <p style="color: #fefefe">西南风3-6级</p>
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
  require('echarts/theme/macarons')
    export default {
        name: "homePage",
      mounted() {
        this.$store.dispatch('changeMsg', '项目概览')
        this.inchart13()
        this.chart13Res()
        this.inchart24()
        this.chart24Res()
        this.inchart22()
        this.chart22Res()
        this.inchart21()
        this.chart21Res()
      },
      data(){
          return{
            myChart13: '',
            myChart24: '',
            myChart22: '',
            myChart21: '',
          }
      },
      methods:{
        inchart13() {
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
          this.myChart13.setOption(option)
        },
        inchart24() {
          this.myChart24 = this.$echarts.init(document.getElementById('mychart24'),'macarons')
          var option = {
            angleAxis: {
              type: 'category',
              data: ['塔吊', '起重机', '升降机', '特种设备', '视频设备'],
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
          this.myChart22 = this.$echarts.init(document.getElementById('mychart22'));
          var data = [
            {
              value: 12,
              name: '施工安全'
            },
            {
              value: 5,
              name: '物资安全'
            },
            {
              value: 13,
              name: '设备安全'
            },
            {
              value: 5,
              name: '人员安全'
            }
          ];
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
              top: '30%',
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 15,
              textStyle: {
                color: '#ACCFFF',
                fontSize: 12,
              },
              data: ['施工安全', '物资安全', '人员安全', '设备安全']
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
              formatter: '{a} <br/>{b} : {c} ({d}%)'
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
                value: 1,
                name: '监督员',
                itemStyle: {
                  color: "#FEDF00",
                  borderColor: "#FEDF00",
                  borderWidth: 3
                }
              },
                {
                  value: 2,
                  name: '项目经理',
                  itemStyle: {
                    color: "#01FFFF",
                    borderColor: "#01FFFF",
                    borderWidth: 3
                  }
                },
                {
                  value: 3,
                  name: '下属单位',
                  itemStyle: {
                    color: "#3769F4",
                    borderColor: "#3769F4",
                    borderWidth: 3
                  }
                },
                {
                  value: 4,
                  name: '施工员',
                  itemStyle: {
                    color: "#6978F2",
                    borderColor: "#6978F2",
                    borderWidth: 3
                  }
                },
                {
                  value: 5,
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
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/project_head_little.png");
    background-size:contain
  }
  .pro_item_two{
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/three.png");
    background-size:contain
  }
  .pro_item_three{
    margin-top: 0.5rem;
    width: 1.2rem;
    height: 0.7rem;
    background-image: url("../assets/homepage/two.png");
    background-size:contain
  }
  .project_item{
    margin-left: 0.2rem;
    margin-top: 0.1rem;
    width: 90%;
    height: 0.43rem;
    background-image:url("../assets/homepage/project_item_bg.png") ;
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
  .process_content {
    padding-left: 0.2rem;
    padding-top: 0.2rem;
  }
  .process_content{
    font-size: 0.2rem;
    height: 93%;
    color: #ffa454;
    background-image: url("../assets/homepage/process.png");
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
</style>
