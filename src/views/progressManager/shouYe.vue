<template>
  <div class="progressManager">

    <el-row >
      <el-col :span="12" >
        <div style="color:white;font-size:18px;margin-left:10px;">
          任务甘特图
        </div>
      </el-col>
      <el-col :span="6">
         <div class="tishi">
           <div class="tishi mr20">
            <div class="mr8">计划时间 </div><div class="jihua"></div>
          </div>
          <div class="tishi">
            <div class="mr8">实际时间 </div><div class="shiji"></div>
          </div>
         </div>
      </el-col>
      <el-col :span="6">
       
        <div>
          <el-input v-model="searchValue" placeholder="请输入关键字"  clearable style="width:200px;margin-right:5px;"></el-input><el-button size="mini" type="primary" @click="queryValue" >搜索</el-button><el-button size="mini" type="primary" @click="clearValue" >重置</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <!-- <el-col :span="10">
        <div class="treeTable">
          <vxe-table
            border
            show-overflow
            row-id="id"
            :data="tableData3"
            :tree-config="{children: 'children', expandRowKeys: defaultExpandRowKeys}">
            <vxe-table-column type="seq"  title="序号" tree-node></vxe-table-column>
            <vxe-table-column field="label" title="任务名称" width="145"></vxe-table-column>
            <vxe-table-column title="状态" field="progress" width="80">
              <template v-slot="{ row }" >
                <el-tag  v-if="row.progress===0" type="info">未开工</el-tag>
                <el-tag  v-if="row.progress===1" type="danger">已开工</el-tag>
                <el-tag  v-if="row.progress===2" type="success">已完工</el-tag>
              </template>
            </vxe-table-column>
            <vxe-table-column field="planStartTime" title="开始时间" width="108"></vxe-table-column>
            <vxe-table-column field="planEndTime" title="结束时间" width="108"></vxe-table-column>
          
          </vxe-table>
        </div>
        
      </el-col>
      <el-col :span="14">
        <div class="wl-gantt" id="wl-gantt">
         
        
        </div>
      </el-col> -->
        <div class="wl-gantt-demo">
          <wlGantt
            class="cardUl"
            ref="wl-gantt-demo"
            :useCard="true"
            
            :useRealTime="true"
            :default-expand-all="true"
            :startDate="startDate"
            :endDate="endDate"
           
            date-type="monthAndDay"
            :edit="false"
            :data="ganttList"
            :columns="columns"
            :contextMenuOptions="contextMenuOptions"
            
          >
            <template slot="">
              <el-table-column fixed type="state" width="65" label="状态">
                <template slot-scope="scope">
                  <el-tag type="info" v-if="scope.row.state === 0 ">未开工</el-tag>
                  <el-tag type="danger" v-if="scope.row.state === 1 ">已开工</el-tag>
                  <el-tag type="success" v-if="scope.row.state === 2 ">已完工</el-tag>
                </template>
              </el-table-column>
            </template>
            <template #info-card="{ row }">
              <ul class="hoverCard">
                <li>
                  <label for="name">阶段名称：</label><span id="name">{{ row.name }}</span>
                </li>
                <li>
                  <label for="startDate">计划开始日期：</label><span id="startDate">{{ row.startDate }}</span>
                </li>
                <li>
                  <label for="endDate">计划结束日期：</label><span id="endDate">{{ row.endDate }}</span>
                </li>
                <li>
                  <label for="realStartDate">实际开始日期：</label><span id="realStartDate">{{ row.realStartDate }}</span>
                </li>
                <li>
                  <label for="realEndDate">实际结束日期：</label><span id="realEndDate">{{ row.realEndDate }}</span>
                </li>
                <!-- <li>
                  <label for="state">状态</label><span id="state" v-if="row.state === '0' ">未开工</span>
                  <span id="state" v-if="row.state === '1' ">已开工</span>
                  <span id="state" v-if="row.state === '2' ">已完工</span>
                </li> -->
              </ul>
            </template>
          </wlGantt>
        </div>

    </el-row>

    <el-row style="margin-top:15px;">
      <el-col :span="2">
        <div class="totalDayClass">
          <p>总工期</p>
          <p>{{totalDays}}天</p>
        </div>
      </el-col>
      <el-col :span="18">
        <div style="margin-top: 20px;" class="drawStep">
          <el-steps align-center :active="nodeTimeList.length">
            <el-step 
              v-for="(item, index) in nodeTimeList" 
              :key="index" 
              :title="item.label"  
              :description="item.value"
              @click.native="modifyPostLevel(item, index)"
              >
              </el-step>
          </el-steps>
        </div>
       
      </el-col>
      <el-col :span="2">
        <el-progress type="circle" :percentage="dayPercentage" :format="setItemText">以施工</el-progress>
      </el-col>
      <el-col :span="2">
        <div class="addBtn">
           <el-button size="mini" type="primary" @click="addNode">新增节点</el-button>
        </div>
       
      </el-col>
    </el-row>


    <el-dialog title="新增节点" :visible.sync="open" width="800px" append-to-body class="addForm" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        
        <el-row>
          <el-col :span="12">
            <el-form-item label="节点名称" prop="timeNodeName">
              <el-input v-model="form.timeNodeName" placeholder="请输入节点名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
           <el-form-item label="是否停工" prop="isStop">
              <el-radio-group v-model="form.isStop" >
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
                  
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.isStop === 1 ">
          <el-col :span="12">
            <el-form-item label="异常延期" prop="isAbnormalDelay">
              <el-radio-group v-model="form.isAbnormalDelay">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
                  
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="停工时间" prop="stopTime">
              <el-date-picker v-model="form.stopTime" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-if="form.isStop === 0 ">
          <el-col :span="12">
            <el-form-item label="恢复施工" prop="isResumeConstruction">
              <el-radio-group v-model="form.isResumeConstruction">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
                  
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-if="form.isStop === 0 ">
          <el-col :span="12">
            <el-form-item label="复工时间" prop="returnToWorkTime">
              <el-date-picker v-model="form.returnToWorkTime" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="延期时间" prop="delayTime">
              <el-date-picker v-model="form.delayTime" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-col> -->
        </el-row>
        
        <el-row v-if="form.isStop === 1 ">
          <el-col :span="24">
            <el-form-item label="停工说明" prop="stopContent">
              <el-input type="textarea" v-model="form.stopContent" placeholder="请输入停工说明" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.isStop === 1 ">

          <el-col :span="12">
            
              <el-form-item label="停工照片">
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
         <el-row v-if="form.isStop === 1 && form.stopImgUrl !== ''">

          <el-col :span="12">
            <el-form-item label="停工照片">
                 <el-image :src="form.stopImgUrl"></el-image>
              </el-form-item>
            
              
          </el-col>
        </el-row>


        <el-row v-if="form.isStop === 0 ">
          <el-col :span="24">
            <el-form-item label="复工说明" prop="returnToWorkContent">
              <el-input type="textarea" v-model="form.returnToWorkContent" placeholder="请输入复工说明" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.isStop === 0 ">

          <el-col :span="12">
            
              <el-form-item label="复工照片">
                <el-upload
                  class="upload-demo"
                  action="http://121.36.106.18:36080/system/safe/uploadFile"
                  :limit="1"
                  :on-success="handleSuccess"
                  accept=".jpg,.png"
                  style="width: 90%; "
                >
                  <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
                </el-upload>
              </el-form-item>
              

            
          </el-col>
        </el-row>
        <el-row v-if="form.isStop === 0 && form.returnToWorkImgUrl !== '' ">

          <el-col :span="12">
            
              <el-form-item label="复工照片">
                 <el-image :src="form.returnToWorkImgUrl"></el-image>
              </el-form-item>
              

            
          </el-col>
        </el-row>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="this.form.id !== ''" @click="delNode">删 除</el-button>
        <el-button type="primary" v-if="this.form.id !== ''" @click="submitForm">修 改</el-button>
        <el-button type="primary" v-else @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
      





  
  </div>
</template>

<script>

import { scheduleList, scheduleGantt, totalDay, addNode, putNode, delNodeById, getNodeById } from '@/api/progress'
export default {
  name: "progress",
  components: {
    // kqHistory
  },
  data(){
    return{
      startDate: '',
      endDate: '',
      totalStartTime: '',
      totalEndTime: '',
      form: {
        delayTime: '',
        id: '',
        isResumeConstruction: '',
        isStop: '',
        returnToWorkContent: '',
        returnToWorkImgUrl: '',
        returnToWorkTime: '',
        stopContent: '',
        stopImgUrl: '',
        stopTime: '',
        taskId: '',
        timeNodeName: ''
      },
      rules: {
        timeNodeName: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        // delayTime: [
        //   { required: true, message: '请选择延期时间', trigger: 'change' }
        // ],
        isAbnormalDelay: [
           { required: true, message: '请选择是否延期', trigger: 'change' } 
        ],
        isResumeConstruction: [
          { required: true, message: '请选择是否恢复施工', trigger: 'change' }
        ],
        isStop: [
          { required: true, message: '请选择是否停工', trigger: 'change' }
        ],
        returnToWorkTime: [
          { required: true, message: '请选择复工时间', trigger: 'change' }
        ],
        stopContent: [
          { required: true, message: '请填写说明', trigger: 'change' }
        ],
        stopTime: [
          { required: true, message: '请选择停工时间', trigger: 'change' }
        ],
        returnToWorkContent: [
          { required: true, message: '请填写复工说明', trigger: 'change' }
        ]
        
      },
      open: false,
      selectIsStop: '',
      nodeTimeList: [],
      dayPercentage: undefined,
      totalDays: '',
      actualDay: '',
      searchValue: '',
      tableData3: [],
      defaultExpandRowKeys: [1],
      siteName: '',
      currentTaskId: '',
      ganttList: [],
      data: [], // 数据
     
      contextMenuOptions: [
        { label: "任务名称", prop: "name" },
        { label: "开始时间", prop: "startDate" },
        { label: "结束时间", prop: "endDate" },
        { label: "实际开始时间", prop: "realStartDate" },
        { label: "实际结束时间", prop: "realEndDate" }
      ],
      columns: [{ type: "name", maxWidth: 200, colType: "expand" }], 
    }
  },
 
  created() {
    this.startDate = '2019-01-01'
    this.endDate = '2022-12-30'
    // this.getSyncTime()

   
    

  
  },
  mounted() {
    
   this.getScheduleList()
  //  this.getScheduleGantt()
   this.getTotalDay()
  },
  methods:{
    delNode() {
      console.log("当前id", this.form.id)
      delNodeById(this.form.id).then((res) => {
         if (res.data.code === 200) {
              
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.open = false;
            this.getTotalDay()
            this.resetForm('form')
          }
      })
      
    },
    
    modifyPostLevel(step, id) {
      console.log("step", step.id)
      console.log("id", id)
      if(step.id === undefined) {
        this.$message({
          type: 'warning',
          message: '默认节点不可修改'
        })
      } else {
        this.getInfoById(step.id)
      }
      

    },
    getInfoById(id) {
      getNodeById(id).then((res) => {
        console.log("获取信息", res.data.data)
        var obj = res.data.data
        this.form.id = obj.id
        this.form.delayTime = obj.delayTime
        this.form.isResumeConstruction = obj.isResumeConstruction
        this.form.isStop = obj.isStop
        this.form.returnToWorkContent = obj.returnToWorkContent
        this.form.returnToWorkImgUrl = obj.returnToWorkImgUrl
        this.form.returnToWorkTime = obj.returnToWorkTime
        this.form.stopContent = obj.stopContent
        this.form.stopImgUrl = obj.stopImgUrl
        this.form.stopTime = obj.stopTime
        this.form.taskId = obj.taskId
        this.form.timeNodeName = obj.timeNodeName
        this.form.isAbnormalDelay = obj.isAbnormalDelay

        this.open = true
      })
    },
    handleSuccess2(response, file, fileList) {
      this.form.stopImgUrl = response.data
    },
    handleSuccess(response, file, fileList) {
      this.form.returnToWorkImgUrl = response.data
    },

    submitForm: function () {
      this.$refs["form"].validate((valid) => {
       this.form.taskId = this.currentTaskId
        console.log("提交的数据", this.form)
        if (valid) {

          if(this.form.id === '') {
            addNode(this.form).then((response) => {
              if (response.data.code === 200) {
              
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                })
                this.open = false;
                this.getTotalDay()
                this.resetForm('form')
              }
            });
          } else {
            putNode(this.form).then((response) => {
              if (response.data.code === 200) {
              
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.open = false;
                this.getTotalDay()
                this.resetForm('form')
              }
            });
          }
             
          
            
          }
       
      });
    },
    resetForm() {
      this.form = {
        delayTime: '',
        id: '',
        isResumeConstruction: '',
        isStop: '',
        returnToWorkContent: '',
        returnToWorkImgUrl: '',
        returnToWorkTime: '',
        stopContent: '',
        stopImgUrl: '',
        stopTime: '',
        taskId: '',
        timeNodeName: '',
        isAbnormalDelay: ''
      }
    },
   addNode() {
     this.open = true
   },
   cancel() {
      this.open = false;
      this.resetForm()
    },
    queryValue() {
      // var params = {
      //   name: this.searchValue,
      //   siteId: localStorage.getItem('siteId')
      // }
      // scheduleList(params).then((res) => {
      //   console.log("打印",res.data.rows)
      //   this.data = res.data.rows
        
      //   this.siteName = res.data.rows[0].name
      //   this.currentTaskId = res.data.rows[0].id
      //   this.totalStartTime = res.data.rows[0].startDate
      //   this.totalEndTime = res.data.rows[0].endDate
      //   console.log("siteName", this.siteName)
        
      // })
    },
    
    clearValue() {},
    getSyncTime() {
      var params = {
        siteId: localStorage.getItem('siteId')
      }
      scheduleList(params).then((res) => {
        this.startDate = res.data.rows[0].startDate
        this.endDate = res.data.rows[0].endDate
      })
    },
    
    getScheduleList() {
      var params = {
        siteId: localStorage.getItem('siteId')
      }
      scheduleList(params).then((res) => {
        console.log("打印",res.data.rows)
        
        // this.startDate = res.data.rows[0].startDate
        // this.endDate = res.data.rows[0].endDate
        this.ganttList = res.data.rows
        
        this.siteName = res.data.rows[0].name
        this.currentTaskId = res.data.rows[0].id
        this.totalStartTime = res.data.rows[0].startDate
        this.totalEndTime = res.data.rows[0].endDate
       
        
        console.log("siteName", this.siteName)
       
      
        
      })
    },
    
    getScheduleGantt() {
      var siteId = localStorage.getItem('siteId')
      scheduleGantt(siteId).then((res) => {
        console.log("gantt", res.data)
        console.log("开始时间", this.startDate)
        console.log("结束时间", this.endDate)
        this.ganttList = res.data.data
      })
    },
   
    getTotalDay() {
      this.nodeTimeList = []
      var siteId = localStorage.getItem('siteId')
      totalDay(siteId).then((res) => {
        console.log("总空间", res.data)
        this.totalDays = res.data.data.total_plan_days
        this.actualDay = res.data.data.construction_days
        var arr = res.data.data.time_node
        
        for(var i = 0; i < arr.length; i++) {
          var obj = {}
          obj.id = arr[i].id
          obj.label = arr[i].label
          obj.value = arr[i].value.split('T')[0]
          this.nodeTimeList.push(obj)
        }
        //this.nodeTimeList = res.data.data.time_node
        this.dayPercentage = Math.round((this.actualDay / this.totalDays) * 100)
      })
    },
    setItemText() {
      return `已施工${this.actualDay}天`
    },

   
  }
}
</script>

<style scoped>
.treeTable {
  margin-top: 11px;
  height: 800px;
  overflow-y: scroll;
}
.treeTable >>> .vxe-table {
  color: white;
}
.treeTable >>> .vxe-table--header-wrapper {
  background-color: transparent; 
}
.treeTable >>> .vxe-table--body-wrapper {
  background-color: transparent; 
}
#container {
	
	height: 1800px;
	margin: 1em auto;
  overflow-x: scroll;
  overflow-y: scroll;
  /* -webkit-overflow-scrolling: touch; */
}
.wl-gantt-demo {
  height: 500px;
}
.cardUl {
  max-height: 500px;
  overflow-y: scroll;
}
.totalDayClass {
  height: 90px;
  
  text-align: center;
  border: 1px solid rgb(136, 219, 230);
  box-shadow: 5px 5px 5px rgb(136, 219, 230);
  padding-top:30%; 
  color: white;
  font-size: 15px; 
  background-color: transparent;
}
.addBtn {
  height: 100px;
  line-height: 100px;

}
.hoverCard {
  list-style: none;
  width: 200px;
  font-size: 14px;
}
/* .drawStep >>> .el-step__main {
  color: #fff
} */
.drawStep >>> .el-step__title.is-finish {
  color: white;
}
.drawStep >>> .el-step__description.is-finish {
  color: white;
}
.tishi {
  display: flex;
  color: white;
  font-size: 14px;
  justify-content: center;
  align-items: center;
}
.jihua {
    width: 50px;
    height: 20px;
    background: rgb(88, 157, 246);
}
.shiji {
  width: 50px;
    height: 20px;
    background: rgb(238, 171, 150)
}
.mr20 {
  margin-right: 20px;
}
.mr8 {
  margin-right: 8px;
}

</style>
