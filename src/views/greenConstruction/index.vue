<template>
  <div>
    <el-row style="margin-bottom: 1.4vh; ">
      <el-col :span="6" style="padding: 0 0.5vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 40vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">实时监控</div>
          <div class="item">
            <table cellspacing="0">
              <tr style="background-color: rgba(56, 93, 128, 0.5); ">
                <td colspan="2" style="border-color: rgba(56, 93, 128, 0.5);">名称</td>
                <td style="border-color: rgba(56, 93, 128, 0.5);">单位</td>
                <td style="border-color: rgba(56, 93, 128, 0.5);">阈值</td>
                <td style="border-color: rgba(56, 93, 128, 0.5);">实际值</td>
              </tr>
              <tr>
                <td><i class="iconfont iconfengsu" style="color: rgb(110, 203, 253); "></i></td>
                <td><span>风速</span></td>
                <td>m/s</td>
                <td><span style="font-weight: bold">6</span></td>
                <td><span style="font-weight: bold; color: #67C23A; ">0</span></td>
              </tr>
              <tr>
                <td><i class="iconfont iconwumai" style="color: rgb(106, 193, 241); "></i></td>
                <td><span>PM2.5</span></td>
                <td>ug/m<sup>3</sup></td>
                <td><span style="font-weight: bold">100</span></td>
                <td><span style="font-weight: bold; color: #67C23A; ">39</span></td>
              </tr>
              <tr>
                <td><i class="iconfont iconzaoyin1" style="color: rgb(238, 216, 152); "></i></td>
                <td><span>PM10</span></td>
                <td>ug/m<sup>3</sup></td>
                <td><span style="font-weight: bold">200</span></td>
                <td><span style="font-weight: bold; color: #F56C6C; ">201</span></td>
              </tr>
              <tr>
                <td><i class="iconfont iconPM" style="color: rgb(255, 179, 88); "></i></td>
                <td><span>噪音</span></td>
                <td>dB</td>
                <td><span style="font-weight: bold">85</span></td>
                <td><span style="font-weight: bold; color: #67C23A; ">47.5</span></td>
              </tr>
              <tr>
                <td><i class="iconfont iconwendu" style="color: rgb(255, 143, 161); "></i></td>
                <td><span>温度</span></td>
                <td>℃</td>
                <td><span style="font-weight: bold">40</span></td>
                <td><span style="font-weight: bold; color: #67C23A; ">6.6</span></td>
              </tr>
              <tr>
                <td><i class="iconfont iconshidu" style="color: rgb(235, 108, 177); "></i></td>
                <td><span>湿度</span></td>
                <td>%</td>
                <td><span style="font-weight: bold">25</span></td>
                <td><span style="font-weight: bold; color: #F56C6C; ">99.9</span></td>
              </tr>
            </table>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 40vh; width: 100%;">
          <div class="border-top-center"></div>
          <div class="box-title">环境数据趋势图</div>
          <div v-show="envFlag" class="environmentTag" >
                <el-tag :type="buttonType(index)" v-for="(type,index) in environmentType" :key="index"  @click.native="selectType(index)">{{type}}</el-tag>

          </div>
          <div v-show="envFlag" id="environmentChart" style="height: 31vh" ></div>
          <div v-show="!envFlag" style="text-align: center;padding-top: 120px">
            <span style="font-size: 12px;color: #ffffff;font-weight: bolder;">暂无数据，此数据来源于建工随手拍小程序</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" style="padding: 0 0.5vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 40vh; width: 100%;">
          <div class="border-top-left"></div>
          <div class="box-title">用电用水统计</div>
          <div class="addBtn">
            <el-button type="primary" size="mini" @click="addResume">新增</el-button>
          </div>
          <div id="alarmTrend" ></div>

        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="padding: 0 0.5vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 42vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title" @click="refresh">一周空气质量统计</div>
          <div id="alarmType" style="height: 37vh"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 42vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">报警类型统计</div>
          <dv-active-ring-chart :config="config" style="width:98%;height:37vh" />
        </div>
      </el-col>
      <el-col :span="8" style="padding: 0 0.5vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 42vh; width: 100%; ">
          <div class="border-top-left"></div>
          <div class="box-title">报警记录</div>
          <dv-scroll-board :config="configTable" style="width: 98%; height: calc(42vh - 10px - 0.7rem);margin-left: 50%;transform: translateX(-50%);padding-top: 0.1rem" />
        </div>
      </el-col>
    </el-row>


    <el-dialog :visible.sync="showAdd" title="新增用水用电统计" width="40%">
      <div >
        <el-form :model="uploadInfo" :rules="rules" ref="uploadInfo" label-width="1.5rem">
          <el-form-item label="用电量" prop="kwh">
            <el-input v-model="uploadInfo.kwh" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="用水量" prop="mwo">
            <el-input v-model="uploadInfo.mwo" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="collectDate">
            <el-date-picker v-model="uploadInfo.collectDate" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import {getGreenInfo, getThreshold, getTypeCount, getRealTimeWeather, consumption, getWeatherOnThe7th, collect} from '@/api/green';
  require('echarts/theme/macarons') // echarts theme

  export default {
    name: 'greenConstruction',
    data() {
      return {
        water:[],
        power:[],
        waterDate: [],
        sevenDays: [],
        showAdd: false,
        uploadInfo: {
          collectDate: '',
          kwh: '',
          mwo: '',
          siteId: '',
          id: ''
        },
        rules: {
          collectDate: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
          kwh: [
            { required: true, message: '请输入用电量', trigger: 'change' }
          ],
          mwo: [
            { required: true, message: '请输入用水量', trigger: 'change' } 
          ]
          
        },
        envFlag: true,
        upLine:[],
        downLine:[],
        yMax:0,
        yMin:0,
        // 环境数据的当前类型
        currentType:'',
        // 环境数据的当前类型
        environmentType:[],
        // 环境数据的当前数据
        environmentData:[],
        environmentDataList:[],
        // 环境数据的当前x轴
        environmentX:[],
        environmentXList:[],

        alarmTypeChart: null,
        alarmTrendChart: null,
        environChart: null,
        qualityChart: null,
        configTable: {
          header: ['报警时间', '报警类型', '处理情况', '报警数值'],
          headerHeight: 44,
          data: [
            ['2019-07-13 13:14:01', '噪音', '<span style="color: #67c23a; ">已处理</span>', 86.5],
            ['2019-08-13 14:14:01', '风速', '<span style="color: #F56C6C; ">未处理</span>', 5],
            ['2020-05-30 15:14:01', '风速', '<span style="color: #67c23a; ">已处理</span>', 7],
            ['2020-01-13 03:14:01', '温度', '<span style="color: #F56C6C; ">未处理</span>', 35],
            ['2019-01-01 08:14:01', '湿度', '<span style="color: #67c23a; ">已处理</span>', 23.5],
            ['2019-12-30 10:14:01', 'PM2.5', '<span style="color: #F56C6C; ">未处理</span>', 87.5],
            ['2020-01-15 12:14:01', 'PM10', '<span style="color: #67c23a; ">已处理</span>', 297],
            ['2020-09-07 03:14:01', '湿度', '<span style="color: #F56C6C; ">未处理</span>', 27.5],
          ],
          rowNum: 6,
          align: ['center', 'center', 'center', 'center', 'center'],
          headerBGC: '',
          evenRowBGC: '',
          columnWidth: [200]
        },
        config: {
          radius: '65%',
          activeRadius: '70%',
          data: [],
          lineWidth: 25,
          digitalFlopStyle: {
            fontSize: 20
          }
          },
        configType: {
          data: [
            {
              name: '风速',
              value: 55,
              // color: 'red'
            },
            {
              name: 'PM2.5',
              value: 120
            },
            {
              name: 'PM10',
              value: 78
            },
            {
              name: '噪音',
              value: 66
            },
            {
              name: '温度',
              value: 80
            },
            {
              name: '湿度',
              value: 80
            }
          ],
          img: [
            'http://datav.jiaminghi.com//img/conicalColumnChart/1st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/2st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/3st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/4st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/5st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/6st.png',
            'http://datav.jiaminghi.com//img/conicalColumnChart/7st.png'
          ],
          columnColor: [ 'rgba(233, 233, 123, 0.5)']
        }
      }
    },
    mounted() {
      this.get7thWrather()
      this.getWater()
      this.getArmCount()
      this.getenvironmentData()
      this.$store.dispatch('changeMsg', '绿色施工');
      this.initEnvironment()
      
      
      // this.initQuality()
    },
    methods: {
      getWater() {
         var id = localStorage.getItem('siteId') 
         collect(id).then((res) => {
           
           var arr = res.data.rows
           for(var i = 0; i < arr.length; i++) {
             this.power.push(arr[i].kwh)
             this.water.push(arr[i].mwo)
             this.waterDate.push(arr[i].collectDate)
           }
           this.initAlarmTrend();
         })
      },
      get7thWrather() {
        var id = localStorage.getItem('siteId')
        getWeatherOnThe7th(id).then((res) => {
          console.log("7天的天气", res.data.data.data)
          var arr = res.data.data.data
          var tmp = []
          for(var i = 0; i < arr.length; i++) {
            var obj = {}
            obj.value = arr[i].air
            obj.name = arr[i].week
            tmp.push(obj)
          }
          this.sevenDays = tmp
          this.initAlarmType();
        })
      },
     addResume() {
        this.showAdd = true
        this.uploadInfo.siteId = localStorage.getItem('siteId')
      },
      
      resetForm(formName) {
      this.$refs[formName].resetFields();
      this.uploadInfo.collectDate = ''
      this.uploadInfo.kwh = ''
      this.uploadInfo.mwo = ''
    },
      submitUpload(formName) {
        
        
        this.$refs[formName].validate((valid) => {
          console.log("提交的信息", this.uploadInfo)
          if(valid) {
            consumption(this.uploadInfo).then(response => {
              if(response.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '上传数据成功！'
                })
                this.showAdd = false;
                this.resetForm('uploadInfo')
              } else {
                this.$message.error(response.data.msg)
              }
            })
          } else {
            this.$message.error('上传失败')
            return false
          }
        });
      },
      // 获取实时天气
      getWeather() {
        var siteId = localStorage.getItem('siteId')
        getRealTimeWeather(siteId).then((res) => {
          this.win_meter = res.data.win_meter
          
        })
      },
      getArmCount() {
        var siteId = localStorage.getItem('siteId')
        getTypeCount(siteId).then((res) => {
          var data = res.data.data
          var arr = []
          for(var i = 0; i < data.length; i++) {
            var obj = {}
            obj.name = data[i].name
            obj.value = data[i].counts
            arr.push(obj)
          }
          this.config = {
            radius: '65%',
          activeRadius: '70%',
          data: arr,
          lineWidth: 25,
          digitalFlopStyle: {
            fontSize: 20
          }
          }
          console.log("报警类型统计", this.config)
        })
      },
      buttonType(index){
        if(this.environmentType[index] === this.currentType){
          return "success"
        }else{
          return "info"
        }
      },
      getenvironmentData(){
        var time= []
        var greenValue = []
        getGreenInfo({
          siteId:localStorage.getItem('siteId')
        }).then(res =>{
          if(res.data.data.length === 0) {
            this.envFlag = false
          }
          console.log("接口数据",res.data.data)
          var Arr1 = []

          if(res.data.data.length>0){
            for(var a in res.data.data){
              for(var b in res.data.data[a]){
                var Arr2 = []
                var Arr3 = []
                this.environmentType.push(b)
                console.log("数组",res.data.data[a][b])
                for(var c in res.data.data[a][b]){
                  Arr2.push(c)
                  Arr3.push(res.data.data[a][b][c])
                }
                this.environmentXList.push(Arr2)
                //console.log("environmentXList",this.environmentXList)
                this.environmentDataList.push(Arr3)
                //console.log("environmentDataList",this.environmentDataList)
              }
            }
          }
          // console.log("environmentType",this.environmentType)
          // console.log("environmentXList",this.environmentXList[0])
          // console.log("environmentDataList",this.environmentDataList[0])

          this.environmentData=[],
          this.environmentX = [],
          this.currentType = this.environmentType[0]
          this.selectType(0)
        })
        //this.environmentType = ['风速','PM2.5','PM10','噪音','温度','湿度'],

      },
      selectType(val){
        this.upLine=[]
        this.downLine=[]
        this.currentType = this.environmentType[val]
        console.log("当前类型",this.environmentType[val])
        getThreshold().then(req=>{
          console.log("阈值信息",req.data.data)
          for(var i=0;i<req.data.data.length;i++){
            if(req.data.data[i].name === this.environmentType[val]){
              console.log(req.data.data[i].name)
              if(req.data.data[i].type === 2){
                console.log("全天")
                for(var l=0;l<24;l++){
                  this.upLine.splice(l,0,req.data.data[i].upThreshold)
                  this.downLine.splice(l,0,req.data.data[i].downThreshold)
                }
              }else if(req.data.data[i].type === 1){
                console.log("白天")
                for(var j=6;j<=21;j++){
                  console.log(j)
                  this.upLine.splice(j,0,req.data.data[i].upThreshold)
                  this.downLine.splice(j,0,req.data.data[i].downThreshold)
                }
              }else if(req.data.data[i].type === 0){
                console.log("晚上")
                for(var k=0;k<24;k++){
                  if(k<6||k>21){
                    console.log(k)
                    this.upLine.splice(k,0,req.data.data[i].upThreshold)
                    this.downLine.splice(k,0,req.data.data[i].downThreshold)
                  }

                }
              }

            }
          }
          console.log("上线",this.upLine)
          console.log("下线",this.downLine)
          this.environmentData = this.environmentDataList[val]
          this.environmentX = this.environmentXList[val]
          this.initEnvironment()
          this.buttonType(val)
        })
        // console.log("shuju",val)
        // console.log("value",this.environmentDataList[val])
        // console.log("x轴",this.environmentXList[val])

      },
      initEnvironment() {
        this.environChart = echarts.init(document.getElementById('environmentChart'), 'macarons')
        this.environChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid:{
            left:'10%',
            top:'30',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.environmentX,
            symbol: ['none', 'arrow'],
            /*改变x轴颜色*/
            axisLine: {
              lineStyle: {
                // type: 'dashed',
                // color: 'red',
                color: '#3FA0C3'
                // width: 1, //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgb(58, 136, 242)'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: 'rgb(58, 136, 242)',
                // width: 1, //这里是为了突出显示加上的
              }
            },
            max: function(value) {
              return Math.round(value.max*1.2)
            },
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: this.currentType,
              data:this.environmentData,
              type: 'line',
              smooth: true,
            },
            {
              name: '阈值上限',
              data:this.upLine,
              type: 'line',
              smooth: true,
              lineStyle:{
                color:'#EFA44E'
              }
            },
            {
              name: '阈值下限',
              data:this.downLine,
              type: 'line',
              smooth: true,
              lineStyle:{
              color:'#EFA44E'
              }
            },
          ],
        });
      },
      initAlarmType() {
        this.alarmTypeChart = echarts.init(document.getElementById('alarmType'));
        this.alarmTypeChart.setOption({
          color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05", "#a5e7f0"],
          
          grid: {
            left: -100,
            top: 50,
            bottom: 10,
            right: 10,
            containLabel: true
          },
          
          tooltip: {
              trigger: 'item',
              formatter: "空气质量统计 <br/>{b}: {c} ({d}%)"
            },
          legend: {
            type: "scroll",
            orient: "vartical",
            top: "center",
            right: "15",
            itemWidth: 12,
            itemHeight: 8,
            itemGap: 12,
            textStyle: {
              color: '#A3E2F4',
              fontSize: 12,
              fontWeight: 0
            },
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
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
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                textStyle: {
                  fontSize: 12,
                },
                position: 'outside'
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 55
              },
              emphasis: {
                show: false
              }
            },
           data: this.sevenDays
          }, ]
        })
      },
     
      initAlarmTrend() {
        this.alarmTrendChart = echarts.init(document.getElementById('alarmTrend'));
        this.alarmTrendChart.setOption({
          color: ['#a5e7f0', '#edafda'],
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['用水情况', '用电情况'],
            textStyle: {
              color: 'white'
            }
          },
          xAxis: {
            type: 'category',
            data: this.waterDate,
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
              name: '用水情况',
              data: this.water,
              type: 'line',
            },
            {
              name: '用电情况',
              data: this.power,
              type: 'line',
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
  .environmentTag {
    padding: 0 200px;
    /* background-color: red; */
    display: flex;
    justify-content: space-between;
  }
  .border-top-left {
    height: 10px;
    background-image: url("../../../src/assets/border/top-center.png");
    background-size: 100% 100%;
    width: 100%;
  }

  .border-top-center {
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
  .addBtn {
    float: right;
    margin-top:-25px;
   margin-right:15px;
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

  .item{
    height: calc(100% - 10px - 0.5rem);
    width: 100%;
  }

  .item table {
    width: 80%;
    height: 80%;
    margin: 0.3rem auto;
    font-size: 0.25rem;
    text-align: center;
    color: #E8FEFF;
  }

  .jian_item .iconfont {
    flex: 1;
    /*margin-left: 0.6rem;*/
    font-size: 0.25rem;
    display: flex;
    justify-content: center;
  }
  .jian_item .item_content {
    color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
  }
  .jian_item .item_final {
    color: #fff;
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .item_content span {
    display: block;
  }

  #alarmTrend {
    width: 100%;
    height: calc(40vh - 10px - 0.5rem);
  }
  .addColor{
    background-color: red;
  }
</style>
