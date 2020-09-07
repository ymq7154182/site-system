<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 1.4vh; ">
      <el-col :span="6" style="padding-left: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">塔吊数据</div>
          <el-row>
            <el-col :span="12">
              <dv-decoration-9 class="tower-data">
                <ul style="list-style: none; padding: 0; text-align: center; ">
                  <li>4</li>
                  <li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>
                </ul>
              </dv-decoration-9>
            </el-col>
            <el-col :span="12">
              <dv-decoration-9 class="tower-data">
                <ul style="list-style: none; padding: 0; text-align: center; ">
                  <li>2</li>
                  <li style="color: #3FA0C3; font-size: 0.25rem; ">离线数</li>
                </ul>
              </dv-decoration-9>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="13">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div class="border-top-center"></div>
          <div class="box-title">塔吊数据</div>
          <div class="device-data">
            <ul class="device-list">
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">1号塔机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：1号吊机</p>
                        <p>安装位置：A4栋东南区</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZT520-TJ</p>
                        <p>责任人：</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">2号塔机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：2号塔机</p>
                        <p>安装位置：A6栋门口</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZTJ582-124</p>
                        <p>责任人：</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">一号吊机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：一号吊机</p>
                        <p>安装位置：施工区</p>
                        <p>生产厂家：三一重工</p>
                        <p>设备型号：CZ-6910</p>
                        <p>责任人：王刚</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">三号闸机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：三号闸机</p>
                        <p>安装位置：A4栋</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZYJ582-124</p>
                        <p>责任人：张银洲</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">四号闸机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：四号闸机</p>
                        <p>安装位置：A5栋</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZYJ582-124</p>
                        <p>责任人：张银洲</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">1号塔机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：1号吊机</p>
                        <p>安装位置：A4栋东南区</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZT520-TJ</p>
                        <p>责任人：</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">2号塔机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：2号塔机</p>
                        <p>安装位置：A6栋门口</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZTJ582-124</p>
                        <p>责任人：</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">一号吊机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：一号吊机</p>
                        <p>安装位置：施工区</p>
                        <p>生产厂家：三一重工</p>
                        <p>设备型号：CZ-6910</p>
                        <p>责任人：王刚</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">三号闸机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：三号闸机</p>
                        <p>安装位置：A4栋</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZYJ582-124</p>
                        <p>责任人：张银洲</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
              <li>
                <div class="device-detail">
                  <el-row>
                    <el-col :span="7" style="text-align: center; ">
                      <el-image
                        :src="require('../assets/tower.png')"
                        style="height: 0.6rem; width: 0.6rem; "
                        fit="contain"
                      />
                      <div class="device-detail-title">四号闸机</div>
                      <div class="device-detail-tag">在线</div>
                    </el-col>
                    <el-col :span="17">
                      <div class="device-detail-span">
                        <p>塔吊名称：四号闸机</p>
                        <p>安装位置：A5栋</p>
                        <p>生产厂家：HAIZHI</p>
                        <p>设备型号：HZYJ582-124</p>
                        <p>责任人：张银洲</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="5"  style="padding-right: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">处理总览</div>
          <div class="solve-view">
            <dv-active-ring-chart :config="configPie" style="width: 3rem; height: 3rem; margin: auto; " />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8" style="padding-left: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title" @click="refresh">报警类型</div>
          <el-row type="flex" justify="center">
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">1号塔机</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">2号塔机</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">一号吊机</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">1号塔机</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">2号塔机</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="alarm-select">
                <el-button type="text">一号吊机</el-button>
              </div>
            </el-col>
          </el-row>
          <div id="alarmType" class="alarm-type"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">报警趋势</div>
          <div id="alarmTrend" class="alarm-trend"></div>
        </div>
      </el-col>
      <el-col :span="8" style="padding-right: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">报警记录</div>
          <dv-scroll-board :config="configTable" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'Device Manage',
  mounted() {
    this.$store.dispatch('changeMsg', '设备管理');
    this.initAlarmType();
    this.initAlarmTrend();
  },
  data() {
    return {
      alarmTypeChart: null,
      alarmTrendChart: null,
      configPie: {
        data: [
          {
            name: '红色报警',
            value: 55
          },
          {
            name: '已处理',
            value: 120
          },
          {
            name: '黄色报警',
            value: 78
          },
          {
            name: '检测中',
            value: 66
          }
        ],
        digitalFlopStyle: {
          fontSize: 17
        },
        color: ['#f56c6c', '#67c23a', '#e6a23c', '#409eff'],
        showOriginValue: true
      },
      configTable: {
        header: ['设备名称', '报警时间', '报警类型', '处理情况', '报警数值'],
        headerHeight: 45,
        data: [
          ['1号塔机', '2019-10-13 13:14:01', '高度限位报警', '<span style="color: #67c23a; ">已处理</span>', 53.5],
          ['2号塔机', '2019-10-13 14:14:01', '幅度限位报警', '<span style="color: red; ">未处理</span>', 54.5],
          ['一号吊机', '2020-10-13 15:14:01', '风速限位报警', '<span style="color: #67c23a; ">已处理</span>', 57.5],
          ['1号塔机', '2020-1-13 3:14:01', '角度限位报警', '<span style="color: red; ">未处理</span>', 123.5],
          ['1号塔机', '2019-1-1 8:14:01', '高度限位报警', '<span style="color: #67c23a; ">已处理</span>', 56.5],
          ['2号塔机', '2019-12-30 10:14:01', '幅度限位报警', '<span style="color: red; ">未处理</span>', 87.5],
          ['一号吊机', '2020-1-15 12:14:01', '风速限位报警', '<span style="color: #67c23a; ">已处理</span>', 97],
          ['1号塔机', '2020-9-7 3:14:01', '角度限位报警', '<span style="color: red; ">未处理</span>', 123.5],
        ],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        headerBGC: '#3FA0C3',
        evenRowBGC: ''
      },
    }
  },
  methods: {
    initAlarmType() {
      this.alarmTypeChart = echarts.init(document.getElementById('alarmType'));
      this.alarmTypeChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: ['#2C71A2', '#FD9F6F'],
        legend: {
          data: ['最近七天', '今天'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: ['风速', '角度', '幅度', '高度'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '最近七天',
            type: 'bar',
            data: [105, 110, 270, 310]
          },
          {
            name: '今天',
            type: 'bar',
            data: [100, 100, 250, 300]
          }
        ]
      });
    },
    initAlarmTrend() {
      this.alarmTrendChart = echarts.init(document.getElementById('alarmTrend'));
      this.alarmTrendChart.setOption({
        color: ['#a5e7f0', '#edafda'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['最近7天', '最近14天'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: ['8月30日', '8月31日', '9月1日', '9月2日', '9月3日', '9月4日', '9月5日'],
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          },
          splitLine: {
            show: false
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          },
          splitLine: {
            show: false
          },
        },
        series: [
          {
            name: '最近7天',
            data: [820, 932, 901, 934, 1290, 1330, 1350],
            type: 'line'
          },
          {
            name: '最近14天',
            data: [800, 900, 910, 1000, 1300, 1310, 1310],
            type: 'line'
          }
        ]
      });
    },
    refresh() {
      this.alarmTypeChart.dispose();
      this.alarmTrendChart.dispose();
      this.initAlarmType();
      this.initAlarmTrend();
    }
  }
}
</script>

<style scoped>
.border-top-left {
  height: 10px;
  background-image: url("../../src/assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}

.border-top-center {
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

.alarm-type {
  height: calc(53vh - 10px - 1.1rem);
  width: calc(100% - 0.34rem);
  margin: 0 0.17rem;
}

.alarm-select {
  width: 100%;
  height: 0.6rem;
  text-align: center;
}

.el-button--text {
  color: #3FA0C3;
}

.el-button--small {
  font-size: 0.2rem;
}

.alarm-trend {
  height: calc(53vh - 10px - 0.5rem);
  width: calc(100% - 0.34rem);
  margin: 0 0.17rem;
}

.solve-view {
  height: calc(28vh - 10px - 0.5rem);
  width: 100%;
}

.device-data {
  height: calc(28vh - 10px - 0.5rem - 0.34rem);
  margin: 0.17rem;
  width: calc(100% - 0.34rem);
  overflow: hidden;
}

.device-detail {
  height: calc(100% - 0.34rem);
  width: calc(3.5rem - 0.34rem);
  padding: 0.17rem;
}

.device-detail-title {
  font-size: 0.23rem;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #E8FEFF;
}

.device-detail-tag {
  width: 100%;
  background-color: #3FA0C3;
  height: 0.43rem;
  line-height: 0.43rem;
  font-size: 0.2rem;
}

.device-detail-span {
  padding-left: 0.17rem;
  font-size: 0.2rem;
  color: #E8FEFF;
  line-height: 0.37rem;
}

.tower-data {
  width: 2.3rem;
  height: 2.3rem;
  margin: 0.15rem auto 0 auto;
  font-size: 0.39rem;
  color: #FFA454;
}

.device-list {
  list-style: none;
  padding: 0;
  margin: 0;
  animation: moving 12s linear infinite;
  width: 35rem;
}

.device-list li {
  float: left;
}

@keyframes moving {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-17.5rem);
  }
}

.device-list:hover {
  animation-play-state: paused;
}
</style>
