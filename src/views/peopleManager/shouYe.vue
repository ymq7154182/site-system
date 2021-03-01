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
                    <!-- <el-select v-model="responsePeople" placeholder="请选择责任主体" class="item-defer" @change="selectResponsePeople">
                      <el-option
                        v-for="(item, index) in responsePeopleList"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select> -->

                    <el-select v-model="selectValue" placeholder="请选择责任主体" class="item-defer" ref="selectTree" style="width:250px;">
                      <el-option style="height: auto;" :value="optionValue" :label="optionValue">
                        <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick2" />
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
                                <td>{{item.userName}}</td>
                              </tr>
                              <tr>
                                <td>单位:</td>
                                <td>{{item.userSignCompanyName}}</td>
                              </tr>
                              <tr>
                                <td>手机号:</td>
                                <td>{{item.phone}}</td>
                              </tr>
                              <tr>
                                <td>岗位:</td>
                                <td>{{item.userClass}}</td>
                              </tr>
                            </table>
                          </div>
                          <div v-else style="height:80%;margin-top:-110%;" @click="updateInfo(index, item)" v-show="!infohover1">
                            <el-image  :src="require('../../assets/peopleManager/upload.jpg')" fit="fill" style="height: 100%; " />
                          </div>
                          
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ item.userName }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" v-if="item.status === 0" style="margin-top: 1.6%; ">到岗</el-tag>
                                <el-tag type="warninng" effect="dark" v-if="item.status === 1" style="margin-top: 1.6%; ">未打卡</el-tag>
                                <el-tag type="danger" effect="dark" v-if="item.status === 2" style="margin-top: 1.6%; ">补打卡</el-tag>
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
                  <div style="color:white;font-size:16px; margin-left:50%;" v-if="selectDeptName === '施工单位'">施工单位共计{{leaderTotalCount}}人，今日出勤{{attendLeaderCount}}人</div>
                  <div style="color:white;font-size:16px; margin-left:50%;" v-else-if="selectDeptName === '建设单位'">建设单位共计{{leaderTotalCount}}人，今日出勤{{attendLeaderCount}}人</div>
                  <div style="color:white;font-size:16px; margin-left:50%;" v-else-if="selectDeptName === '监理单位'">监理单位共计{{leaderTotalCount}}人，今日出勤{{attendLeaderCount}}人</div>
                  <div style="color:white;font-size:16px; margin-left:50%;" v-else>共计{{leaderTotalCount}}人，今日出勤{{attendLeaderCount}}人</div>

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


     <el-dialog title="修改信息" :visible.sync="open" width="800px" append-to-body class="addForm" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入姓名" disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位主体"  prop="userSignCompanyName">
              <el-input v-model="form.userSignCompanyName" placeholder="请输入单位主体"  disabled="true"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄"  prop="userAge">
              <el-input v-model="form.userAge" placeholder="请输入年龄" disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
              <el-form-item label="照片">
                <el-upload
                  class="upload-demo"
                  action="http://121.36.106.18:36080/system/safe/uploadFile"
                  :limit="1"
                  :on-success="handleSuccess2"
                  accept=".jpg,.png"
                  style="width: 90%; "
                >
                  <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
                </el-upload>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDay, getCount, leaderList, leaderCount, peopleInfo, putPeople, todayAttend, lastWeekCount, typeCount, broadsideInfo } from '@/api/peopleManager'
export default {
  name: "shouYe",
  components: {
    // kqHistory
  },
  data(){
    return{
      deptOptions: [],
      defaultProps: {
        children: "childs",
        label: "name",
      },
      selectValue: undefined,
      optionValue: undefined,
      selectDeptName: '',
      todayAttendTotal: 0,
      todayAttendNum: 0,
      todayAbsentNum: 0,
      open: false,
      form: {
        projectLeader: '',
        userImg: '',
        constructionSiteId: '',
        id : '',
        userName: '',
        userClass : null,
        teamId: null,
        userPost : '',
        userCode : '',
        userVcode : '',
        userSex : '',
        phone : '',
        userNationality : '',
        userAge : '',
        userEducation : '',
        userSignDeptName : '',
        userSignCompanyName : '',
        checkImg : '',
        leader :'',
        flag :'',
        userStatus: ''
      },
      rules: {
        userName: [
          { required: true, message: "名字不能为空", trigger: "blur" },
        ],
        userCode: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
        ],
        userSex: [
          { required: true, message: "性别不能为空", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
        ],
        userClass: [
          { required: true, message: "班组不能为空", trigger: "blur" },
        ],
        leader: [
          { required: true, message: "班组负责人不能为空", trigger: "blur" },
        ],
        userPost: [
          { required: true, message: "岗位/工种不能为空", trigger: "blur" },
        ],
        userStatus: [
          { required: true, message: "状态不能为空", trigger: "blur" },
        ],

        flag: [
          { required: true, message: "特种作业人员不能为空", trigger: "blur" },
        ]
        
      },
      leaderTotalCount: '',
      attendLeaderCount: '',
      leadersList: [],
      selectDate: '',
      deptId: '',
      currentDay: '',
      responsePeople: '',
      responsePeopleList: ['全部', '施工单位', '监理单位', '建设单位'],
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
      deptNames: [],
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
    // this.drawLine();
    //this.changeType();
    this.getListDay()
    this.getLeaderList()
   
    this.getTodayAttend()
    this.getLastWeek()
    this.getBroadsideInfo()
    // this.getPeopleTotal()
  },
  methods:{
    // getPeopleTotal() {
    //   var params = {
    //     constructionSiteId: localStorage.getItem("siteId")
    //   }
    //   peopleInfo(params).then((res) => {
    //     console.log("项目登记人数", res.data)
    //     this.todayAttendTotal = res.data.total
    //   })
    // },

    getBroadsideInfo() {
      var id = localStorage.getItem('siteId')
      broadsideInfo(id).then((res) => {
        console.log("打印deptOptions", res.data.data)
        this.deptOptions = res.data.data
        
      })
    },
    

    handleNodeClick2(data, node, nodeData){
     console.log("打印data", data)
     console.log("打印node", node)
     console.log("打印nodeData", nodeData)
     this.selectValue = data
     this.optionValue = data.name
      setTimeout(() => {
          this.$refs.selectTree.blur()
      }, 50)
      this.selectResponsePeople(data.deptId)
   },
   filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getLastWeek() {
      var id = localStorage.getItem("siteId")
       var lastWeek = []
      lastWeekCount(id).then((res) => {
        console.log("7天信息", res.data.data)
        var arr = res.data.data
       
        var key = ''
        var nameValue = []
        var value = []
        for(var i = 0; i < arr.length; i++) {
          console.log("arr[i]", arr[i])
          
          for(var item in arr[i]) {
            key = item
            value = arr[i][item]
          }
          nameValue.push(key)
          var obj = {
            type: 'bar',
            data: value,
            coordinateSystem: 'polar',
            name: key,
            stack: 'a'
          }
          console.log("obj", obj)
          lastWeek.push(obj)
        }
        console.log("lastWeek", lastWeek)
        let myChart2 = this.$echarts.init(document.getElementById('chart2'))
        myChart2.setOption({

        color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0', '#6495ED', '#98FB98'] ,

        angleAxis: {
          type: 'category',
          data: ['周日','周一', '周二', '周三', '周四', '周五', '周六'],
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
        series: lastWeek,
       
        legend: {
          itemWidth: 13 ,
          show: true,
          right:'right',
          data: nameValue,
          textStyle: {
            fontSize:10,
            color: '#6ac0f0' ,
          },
        },

      });
      })
    },
    handleSuccess2(response, file, fileList) {
      this.form.userImg = response.data
     
    },
    cancel() {
      this.open = false;
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
       
        
        if (valid) {
           
             putPeople(this.form).then((response) => {
          
              if (response.data.code === 200) {
              
                this.$message({
                  type: 'success',
                  message: '更新成功！'
                })
                this.open = false;
                this.getLeaderList()
                this.resetForm('form')
              }
            });
           
            
          }
       
      });
    },
    getTodayAttend() {
      var id = localStorage.getItem("siteId")
      todayAttend(id).then((res) => {
        console.log("今日出勤人数", res.data.data[0])
        if(res.data.data[0].total === null) {
          this.todayAttendTotal = 0
        } else {
          this.todayAttendTotal = res.data.data[0].total
        }
        
        if(res.data.data[0].absent === null) {
          this.todayAttendNum = 0
        } else {
          this.todayAttendNum = res.data.data[0].absent
        }
        
        this.todayAbsentNum = this.todayAttendTotal - this.todayAttendNum
        //console.log("今日出勤总数", typeof this.todayAttendTotal)
        this.drawLine()
      })
    },
    getLeaderCount() {
      var id = localStorage.getItem("siteId")

      leaderCount(id).then((res) => {
          
          this.leaderTotalCount = res.data.data.leaderCount
          this.attendLeaderCount = res.data.data.attendLeaderCount
          
        })
      // if(this.selectDeptName === '' || this.selectDeptName === '全部') {
      //   leaderCount(id).then((res) => {
          
      //     this.leaderTotalCount = res.data.data.leaderCount
      //     this.attendLeaderCount = res.data.data.attendLeaderCount
          
      //   })
      // } else {
      //   var params = {
      //     deptName: this.selectDeptName
      //   }
      //   leaderCount(id).then((res) => {
          
      //     this.leaderTotalCount = res.data.data.leaderCount
      //     this.attendLeaderCount = res.data.data.attendLeaderCount
          
      //   })
      // }

    
      
    },
    updateInfo(index, item) {
      // alert(index)
      this.form = item
      console.log("更新信息", this.form)
      this.open = true

    },
    
    selectType(val) {
      console.log("123")
      console.log("类型改变",val)
      if(val === "类型"){
        var params = {
          siteId: localStorage.getItem('siteId'),
          type: 1
        }
        typeCount(params).then((res) => {
          var arr = res.data.data
          var names = []
          for(var i = 0; i< arr.length; i++) {
            names.push(arr[i].name)
          }
          this.legendData = names
          this.gongzhongData = arr
          this.drawChart3Gongzhong()
        })
        
      } else if(val === "年龄") {
         var params = {
          siteId: localStorage.getItem('siteId'),
          type: 2
        }
        typeCount(params).then((res) => {
          var arr = res.data.data
          var names = []
          for(var i = 0; i< arr.length; i++) {
            names.push(arr[i].name)
          }
           this.legendData = names
           this.gongzhongData = arr
           this.drawChart3Gongzhong()
        })
       
        
      }else if(val === "学历") {
        var params = {
          siteId: localStorage.getItem('siteId'),
          type: 3
        }
        typeCount(params).then((res) => {
          var arr = res.data.data
          var names = []
          for(var i = 0; i< arr.length; i++) {
            names.push(arr[i].name)
          }
          this.legendData = names
          this.gongzhongData = arr
          this.drawChart3Gongzhong()
        })
        
        
      }else if(val === "民族") {
        var params = {
          siteId: localStorage.getItem('siteId'),
          type: 4
        }
        typeCount(params).then((res) => {
          var arr = res.data.data
          var names = []
          for(var i = 0; i< arr.length; i++) {
            names.push(arr[i].name)
          }
          this.legendData = names
          this.gongzhongData = arr
          this.drawChart3Gongzhong()
        })
        
      
      }
      
       
      
    },
    drawChart3Gongzhong() {
      let myChart3 = this.$echarts.init(document.getElementById('chart3'))
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
        // console.log(this.items[j].temperature)
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
            data: this.deptNames,
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
                    position: 'inside'
                },
                data: this.responsePeopleTotal
            },
            
            {
                name: '项目负责人-考勤',
                type: 'bar',
                stack: '考勤',
                label: {
                    show: true,
                    position: 'inside'
                },
                data: this.responsePeopleKq
            },
            {
                name: '劳务人员总数',
                type: 'bar',
                stack: '总数',
                label: {
                    show: true,
                    position: 'inside'
                },
                data: this.servicePeopleTotal
            },
            {
                name: '劳务人员总数考勤',
                type: 'bar',
                stack: '考勤',
                label: {
                    show: true,
                    position: 'inside'
                },
                data: this.servicePeopleKq
            }
        ]
      })
    },
    draw7Days() {},
    drawLine(){
      let myChart1 = this.$echarts.init(document.getElementById('chart1'))
      // let myChart2 = this.$echarts.init(document.getElementById('chart2'))
      // let myChart3 = this.$echarts.init(document.getElementById('chart3'))
     
      // var num1 = this.todayAttendTotal;
      // var num2 = this.todayAbsentNum;
      // var num3 = this.todayAttendNum;
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
          text: this.todayAbsentNum.toString(),
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
          text: this.todayAttendTotal.toString(),
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
          text: this.todayAttendNum.toString(),
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
              value: this.todayAttendTotal,
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
                value: 0,
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
              value: 0,
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
              value: 0,
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
              value: this.todayAbsentNum,
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
                value: this.todayAttendTotal - this.todayAbsentNum,
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
              value:  this.todayAttendTotal - this.todayAttendNum,
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
              value: 100 - this.todayAttendTotal,
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
              value: this.todayAttendNum,
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
                value: this.todayAttendTotal - this.todayAttendNum,
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
              value: 100 - this.todayAttendTotal,
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
              value: 100 - this.todayAttendTotal,
              hoverAnimation: false,
              itemStyle: {
                color: 'rgba(63, 66, 73, .3)',
              },
            }]
          },
        ]

      });
      // myChart2.setOption({

      //   color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0', '#6495ED', '#98FB98'] ,

      //   angleAxis: {
      //     type: 'category',
      //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //     axisLine: { //极坐标轴颜色
      //       lineStyle:{
      //         color:'#6ac0f0',
      //       }
      //     },

      //   },
      //   radiusAxis: { //极坐标的径向轴
      //     //show:false,
      //     axisLine: {
      //       //show:false,
      //       lineStyle:{
      //         color:'#FFEDA7',
      //       },

      //     },
      //     axisTick:{
      //       lineStyle:{
      //         color:'#6ac0f0',
      //         //show:false,
      //       }
      //     }
      //   },
      //   polar: { //极坐标位置
      //     center:['45%','50%'],
      //   },
      //   series: [{
      //     type: 'bar',
      //     data: [1, 2, 3, 4, 3, 5, 1],
      //     coordinateSystem: 'polar',
      //     name: '施工员',
      //     stack: 'a'
      //   }, ],
       
      //   legend: {
      //     itemWidth: 13 ,
      //     show: true,
      //     right:'right',
      //     data: ['施工员', '质量员', '安全员','标准员','材料员','机械员', '劳务员', '资料员'],
      //     textStyle: {
      //       fontSize:10,
      //       color: '#6ac0f0' ,
      //     },
      //   },

      // });
      // myChart3.setOption({
      //   color:['#FF9DB0','#FFC361', '#EED898', '#6ECB99', '#75FFFF','#6AC0F0'] ,

      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b}: {c} ({d}%)'
      //   },

      //   legend: {
      //     itemWidth: 15 ,
      //     orient: 'vertical',
      //     top:10,
      //     left:10,

      //     data: this.legendData,
      //     textStyle: {
      //       color: '#6ac0f0' ,
      //       fontSize: 14,
      //     },
      //   },
      //   series: [
      //     {
      //       name: '现场工种',
      //       type: 'pie',
      //       radius: ['60%', '80%'],
      //       avoidLabelOverlap: false,
      //       emphasis: {
      //         label: {
      //           show: true,
      //           // fontSize: '15',
      //           fontWeight: 'bold'
      //         }
      //       },
      //       labelLine: {
      //         // lineStyle: {
      //         //   color: 'rgba(255, 255, 255, 0.3)'
      //         // },
      //         smooth: 0,
      //         length: 10,
      //         length2: 20
      //       },
      //       data: this.gongzhongData
      //     }
      //   ]
      // });

      
      
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
      var params = {
        constructionSiteId: id,
        projectLeader: 1
      }
      peopleInfo(params).then((res) => {
        // console.log("领导", res.data)
        this.leadersList = res.data.rows
        // console.log("qwert", this.leadersList)
      })
      this.getLeaderCount()
    },
    getPeopleCount(date, id, type) {
      var params = {
        datetime: date,
        id: id,
        type: type
      }
      // console.log("count", params)
      getCount(params).then((res) => {
        // console.log("Counts", res.data.data)
        var obj = res.data.data
        this.responsePeopleTotal = []
        this.responsePeopleKq = []
        this.servicePeopleTotal = []
        this.servicePeopleKq = []
        for(var i = 0; i < obj.length; i++) {

          var tmp = obj[i]
          // console.log("SSSSS", tmp)
          this.deptNames.push(tmp.deptName)
          this.responsePeopleTotal.push(tmp.leaderTotal)
          this.responsePeopleKq.push(tmp.leaderAttend)
          this.servicePeopleTotal.push(tmp.labourTotal)
          this.servicePeopleKq.push(tmp.labourAttend)
        }
         console.log("建设单位项目负责人总数", this.responsePeopleTotal)
         console.log("建设单位劳务人员总数", this.servicePeopleTotal)
         console.log("建设单位项目负责人考勤", this.responsePeopleKq)
         console.log("建设单位劳务人员考勤", this.servicePeopleKq)
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
    getLeaderCountById(id) {
      

      leaderCount(id).then((res) => {
          
          this.leaderTotalCount = res.data.data.leaderCount
          this.attendLeaderCount = res.data.data.attendLeaderCount
          
        })
    },
    selectResponsePeople(id) {
      // this.selectDeptName = val
      
        
        var params = {
          constructionSiteId: id,
        
          projectLeader: 1
        }
        peopleInfo(params).then((res) => {
          this.leadersList = res.data.rows
        })
        this.getLeaderCountById(id)
      
      
  
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
  /* width: 30rem; */
 
  width: 2000rem;


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
  width: 2200rem;
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
