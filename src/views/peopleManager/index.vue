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
                    <div id="chart3" style="width: 30vw;height:34vh;"></div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="right_top_right">
                  <div class="border-top-left"></div>
                  <div class="p_title">
                    <span class="title1">项目负责人</span>
                  </div>
                  <div>
                    <el-row>
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
                    </el-row>
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
export default {
  name: "peopleManager",
  data(){
    return{
      normalNum:0,
      attentionNum:0,
      items:[
        {
          url:require('../../assets/peopleManager/yicun1.jpg'),
          name:'李芳',
          position:'项目经理',
          temperature:'36.3',
        },
        {
          url:require('../../assets/peopleManager/yicun2.jpg'),
          name:'蒋珊',
          position:'项目经理',
          temperature:'37.5',
        },
        {
          url:require('../../assets/peopleManager/yicun3.jpg'),
          name:'商鹏',
          position:'项目经理',
          temperature:'36.3',
        },{
          url:require('../../assets/peopleManager/yicun4.jpg'),
          name:'姜琦',
          position:'项目经理',
          temperature:'36.1',
        },{
          url:require('../../assets/peopleManager/yicun5.jpg'),
          name:'李白',
          position:'项目经理',
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
          position:'安全员',
          temperature:'36.6',
        },{
          url:require('../../assets/peopleManager/yicun9.jpg'),
          name:'王武',
          position:'安全员',
          temperature:'36.3',
        },{
          url:require('../../assets/peopleManager/yicun10.jpg'),
          name:'李四',
          position:'安全员',
          temperature:'37.2',
        }
      ],

    }
  },
  mounted() {
    this.$store.dispatch('changeMsg', '人员管理')
    this.drawLine();
    this.changeType();
  },
  methods:{
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
          name: '项目经理',
          stack: 'a'
        }, {
          type: 'bar',
          data: [2, 4, 9, 1, 0, 2, 1],
          coordinateSystem: 'polar',
          name: '施工员',
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
          name: '质量员',
          stack: 'a'
        },{
          type: 'bar',
          data: [2, 8, 6, 8, 3, 2, 3],
          coordinateSystem: 'polar',
          name: '下属单位',
          stack: 'a'
        }, {
          type: 'bar',
          data: [1, 2, 7, 4, 4, 2, 8],
          coordinateSystem: 'polar',
          name: '特种操作工',
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
          data: ['项目经理', '施工员', '安全员','质量员','下属单位','特种操作工'],
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

          data: ['电焊工', '建筑电工', '钢筋工', '架子工', '水电工','泥工'],
          textStyle: {
            color: '#6ac0f0' ,
            fontSize: 10,
          },
        },
        series: [
          {
            name: '访问来源',
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
            data: [
              {value: 335, name: '电焊工'},
              {value: 310, name: '建筑电工'},
              {value: 234, name: '钢筋工'},
              {value: 135, name: '架子工'},
              {value: 1548, name: '水电工'},
              {value: 148, name: '泥工'}
            ]
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
</style>
