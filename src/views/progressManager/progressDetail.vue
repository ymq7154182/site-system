<template>
  <div class="app-container">
    <el-row>
      <p style="font-size:20px; color:white;">项目概况</p>
    </el-row>
    <el-row :gutter="20" type="flex" justify="center" style="margin-top:10px;">

      <el-col :span="7" :xs="24">
         <el-row>
           <el-col :span="7">
             <div class="allTaks">
               <span>全部任务</span>
               <p>{{allTask.one}}项</p>
             </div>
           </el-col>
           <el-col :span="7">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>未开工</span>
                    <p class="red">{{allTask.two}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>进行中</span>
                    <p class="yellow">{{allTask.three}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
           <el-col :span="6">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>已完工</span>
                    <p class="pink">{{allTask.four}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>预警</span>
                    <p class="blue">{{allTask.five}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
       
      </el-col>
      
      <el-col :span="8" :xs="24">
         <el-row>
           <el-col :span="7">
             <div class="allTaks">
               <span>全部节点计划</span>
               <p>{{allNode.one}}项</p>
             </div>
           </el-col>
           <el-col :span="7">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>未开工</span>
                    <p class="red">{{allNode.two}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>进行中</span>
                    <p class="yellow">{{allNode.three}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
           <el-col :span="6">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>已完工</span>
                    <p class="pink">{{allNode.four}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>预警</span>
                    <p class="blue">{{allNode.five}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
       
      </el-col>

      <el-col :span="7" :xs="24">
         <el-row>
           <el-col :span="7">
             <div class="allTaks">
               <span>任务延期</span>
               <p>{{allDelay.one}}项</p>
             </div>
           </el-col>
           <el-col :span="7">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>开工延期</span>
                    <p class="red">{{allDelay.two}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>正常延期</span>
                    <p class="yellow">{{allDelay.three}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
           <el-col :span="6">
             <el-row>
               <el-col :span="24">
                  <div class="allTask2">
                    <span>完工延期</span>
                    <p class="pink">{{allDelay.four}}项</p>
                  </div>
               </el-col>
               <el-col :span="24">
                 <div class="allTask2">
                    <span>异常延期</span>
                    <p class="blue">{{allDelay.five}}项</p>
                  </div>
               </el-col>
             </el-row>
           </el-col>
         </el-row>
       
      </el-col>
     
      
    </el-row>

    <el-row>
      <p style="font-size:20px; color:white;margin-top:10px;margin-bottom: 10px;">任务概况</p>
    </el-row>
    <el-row :gutter="10" class="mb8" style="margin-top:5px;">
      <el-col :span="20">
        <el-button type="primary" size="mini" @click="handleAdd">新增任务</el-button>
      </el-col>
      <el-col :span="4">
        <el-select v-model="selectSortMthd" clearable="true" placeholder="请选择排序方式" @change="selectchange">
              <el-option
                v-for="(item, index) in taList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-col>
    </el-row>
    <div class="dataTable">
      <el-table v-loading="loading"  :data="dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  >

          <el-table-column label="序号" align="center" type="index" />
          <el-table-column label="名称" align="center" prop="label"  />
          <el-table-column label="进度" align="center" prop="progress" :show-overflow-tooltip="true" >
            <template slot-scope="scope">
                <el-tag  v-if="scope.row.progress===0" type="info">未开始</el-tag>
                <el-tag  v-if="scope.row.progress===1" type="danger">进行中</el-tag>
                <el-tag  v-if="scope.row.progress===2" type="success">已完成</el-tag>
            </template>
          </el-table-column>
          
          <el-table-column label="计划开始时间" align="center" prop="planStartTime" :show-overflow-tooltip="true" />
          <el-table-column label="计划结束时间" align="center" prop="planEndTime" :show-overflow-tooltip="true" />
          <el-table-column label="计划工期" align="center" prop="planDays" :show-overflow-tooltip="true" />
          <el-table-column label="实际开始时间" align="center" prop="actualStartTime" :show-overflow-tooltip="true" />
          <el-table-column label="实际结束时间" align="center" prop="actualEndTime" :show-overflow-tooltip="true" />
          
          <el-table-column label="状态" align="center" prop="state" :show-overflow-tooltip="true" >
            <template slot-scope="scope">
                <el-tag  v-if="scope.row.state===0" type="success">正常</el-tag>
                <el-tag  v-if="scope.row.state===1" type="warning">正常延期</el-tag>
                <el-tag  v-if="scope.row.state===2" type="danger">异常延期</el-tag>
            </template>
          </el-table-column>
          
         
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleUpdate(scope.row)" >工作记录</el-button>
            </template>
          </el-table-column>
        </el-table>
       

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10]" 
          :page-size="pagesize"         
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">   
        </el-pagination>

    </div>
    


        <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row>

            <el-col :span="12">
                <el-form-item  label="任务名称" prop="label">
                    <el-input v-model="form.label" placeholder="请输入任务名称" style="width:250px;"/>
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item  label="编号" prop="serialNumber">
                    <el-input v-model="form.serialNumber" placeholder="请输入任务编号" style="width:250px;"/>
                </el-form-item>
            </el-col>
            
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="施工单位">
                <el-select v-model="form.constructionUnit" placeholder="请选择施工单位" style="width:250px;">
                    <el-option v-for="dict in constructionUnitList" :key="dict" :label="dict" :value="dict" ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同款项">
              <el-input v-model="form.contractPayment"  placeholder="请输入合同款项" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item  label="负责人" prop="leadingCadre">
                    <el-input v-model="form.leadingCadre" placeholder="请输入负责人" style="width:250px;"/>
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item  label="联系方式" prop="contactInformation">
                    <el-input v-model="form.contactInformation" placeholder="请输入联系方式" style="width:250px;"/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划开始时间"  prop="planStartTime">
               <el-date-picker
                    v-model="form.planStartTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划结束时间"  prop="planEndTime">
               <el-date-picker
                    v-model="form.planEndTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实际开始时间"  prop="actualStartTime">
               <el-date-picker
                    v-model="form.actualStartTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际结束时间"  prop="actualEndTime">
               <el-date-picker
                    v-model="form.actualEndTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="form.remarks"  type="textarea" placeholder="请输入备注" ></el-input>
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

import { getTaksNum, getNodeNum, getDelayNum, scheduleList } from '@/api/progress'
import { taskList, addTask } from "@/api/processback";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapState } from 'vuex'

export default {
  name: "progressDetail",
  components: { Treeselect },
  computed: {
    ...mapState({ 
      order: state => state.order
    }),
  },
  mounted() {
      this.username = localStorage.getItem('siteName')
  },
  data() {
    return {
      selectSortMthd: '',
      taList: [
        {
          value: 'desc',
          label: '按进度倒叙排序'
        },
        {
          value: 'asc',
          label: '按进度正叙排序'
        }
      ],
      currentPage:1, //初始页
      pagesize:10, 
      currentTaskId: '',
      allTask: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
      },
      allNode: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
      },
      allDelay: {
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
      },
      selectNodeId: '',
      loading: true,
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      dataList: [],
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: [],
      
      
      
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      
      constructionUnitList:["建设方", "监理方", "施工方"],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {
          actualDays: '',
          actualEndTime: '',
          actualStartTime: '',
          constructionUnit: '',
          contactInformation: '',
          contractPayment: '',
          id: '',
          label: '',
          leadingCadre: '',
          planDays: '',
          planEndTime: '',
          planStartTime: '',
          remarks: '',
          serialNumber: '',
          siteId: '',

      },
      defaultProps: {
        children: "childs",
        label: "name",
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        devFactory: '',
        devType: '',
        devModel: '',
        // userName: undefined,
        // phonenumber: undefined,
        // status: undefined,
        // model:undefined,
        // deptId: undefined,
      },
      // 表单校验
      rules: {
        leadingCadre: [
          { required: true, message: "负责人呢不能为空", trigger: "blur" },
        ],
        contactInformation: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
        ],
        planStartTime: [
          { required: true, message: "计划开始时间不能为空", trigger: "blur" },
        ]
      }





     
     
      
      
   
      
    
    
     
     
     
    };
  },
  watch: {
    
  },
  created() {
    this.getAllTaksNum()
    this.getAllNodeNum()
    this.getAllDelayNum()
   
    this.getScheduleList()
   
  },
  methods: {
    selectchange(val) {
      console.log("选择的值", val)
      var params = {
        siteId: localStorage.getItem('siteId'),
        parentId: this.currentTaskId,
        sort: val
      }
      this.loading = true;
      taskList(params).then((res) => {
        console.log("ADASASA", res)
        this.dataList = res.data.rows
        this.total = res.data.total;
        this.loading = false;
      })
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
    },
    getAllTaksNum() {
      var id = localStorage.getItem('siteId')
      getTaksNum(id).then((res) => {
      
        this.allTask.one = res.data.data[0].total
        this.allTask.two = res.data.data[0].incomplete
        this.allTask.three = res.data.data[0].ongoing
        this.allTask.four = res.data.data[0].completed
        this.allTask.five = res.data.data[0].warning
      })
    },

    handleUpdate(row) {
        console.log("chakan",row)
        if(row.nodeFlag === 1) {
          // 是叶子节点
          console.log("是叶子节点")
          this.$store.commit("CHANGE_ORDER", 'third')
          this.$store.commit('CHANGE_ISLEAF', true) 
          this.$store.commit('CHANGE_NODE_ID', row.id) 
        } else {
          // 不是叶子节点
          console.log("不是叶子节点")
          this.$store.commit("CHANGE_ORDER", 'third')
          this.$store.commit('CHANGE_ISLEAF', false) 
          this.$store.commit('CHANGE_NODE_ID', row.id) 
        }
    },

    getAllNodeNum() {
      var id = localStorage.getItem('siteId')
      getNodeNum(id).then((res) => {
      // console.log("全部节点", res.data.data)
        this.allNode.one = res.data.data[0].total
        this.allNode.two = res.data.data[0].incomplete
        this.allNode.three = res.data.data[0].ongoing
        this.allNode.four = res.data.data[0].completed
        this.allNode.five = res.data.data[0].warning
      })
    },
    getAllDelayNum() {
      var id = localStorage.getItem('siteId')
      getDelayNum(id).then((res) => {
      // console.log("延期节点", res.data.data)
        this.allDelay.one = res.data.data[0].delaytotal
        this.allDelay.two = res.data.data[0].plandelay
        this.allDelay.three = res.data.data[0].normaldelay
        this.allDelay.four = res.data.data[0].actualdelay
        this.allDelay.five = res.data.data[0].abnormaldelay
      })
    },
    getScheduleList() {
      var params = {
        siteId: localStorage.getItem('siteId')
      }
      scheduleList(params).then((res) => {
        console.log("打印",res.data.rows)
        
        
        this.currentTaskId = res.data.rows[0].id
        this.getTaskList()
        
       
      })
    },
    getTaskList() {
      // console.log("task", this.selectNodeId)
      // console.log("selectNodeId", localStorage.getItem("selectNodeId"))
      var params = {
        siteId: localStorage.getItem('siteId'),
        parentId: this.currentTaskId
      }
      this.loading = true;
      taskList(params).then((res) => {
        console.log("ADASASA", res)
        this.dataList = res.data.rows
        this.total = res.data.total;
        this.loading = false;
      })
    },
    cancel() {
      this.open = false;
      this.reset();
    },
    reset() {
      this.form = {
          actualDays: '',
          actualEndTime: '',
          actualStartTime: '',
          constructionUnit: '',
          contactInformation: '',
          contractPayment: '',
          id: '',
          label: '',
          leadingCadre: '',
          planDays: '',
          planEndTime: '',
          planStartTime: '',
          remarks: '',
          serialNumber: '',
          siteId: '',

      },
      
      this.resetForm("form");
    },
    handleAdd() {
      this.open = true;
      this.title = "新增任务";
      console.log(this.form)
      this.reset()
      this.form.siteId = localStorage.getItem("siteId")
    },
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.parentId = this.currentTaskId
            addTask(this.form).then((response) => {
              console.log("返回的数据", response.data)
              if (response.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                })
                this.open = false;
                this.reset()
                this.getTaskList();
              }
            });
        }
      });
    },

  },
};
</script>
<style scoped>

.allTaks {
  border: 1px solid white;
  height: 102px;
  color: white;
  font-size: 16px;
}
.allTaks p {
  text-align: center;
  font-size: 25px;
}
.allTask2 {
  border: 1px solid white;
  height: 50px;
  color: white;
  font-size: 12px;
}
.allTask2 p {
  text-align: center;
  font-size: 18px;
}
.red {
  color: red;
}
.yellow {
  color: rgb(187, 187, 71);
}
.pink {
  color:  rgb(255, 0, 242);
}
.blue {
  color: rgb(95, 194, 56);
}
.dataTable {
  margin-top:10px;
}
.dataTable >>> .el-table {
  color: white;
  background-color: transparent;
}
.dataTable >>> .el-table th>.cell {
  color:white;
}
.dataTable >>> .el-table th,
.dataTable >>> .el-table tr,
.dataTable >>> .el-table td {
  background-color: transparent !important;
}
/*hover时样式*/
.dataTable >>> .el-table tbody tr:hover>td {
  background-color: #367f7f78 !important
}

/*偶数行样式*/
.dataTable >>> .el-table__row--striped td {
  background-color: #45797b33 !important
}
/*奇数行样式*/
.dataTable >>> .el-table__row:not(.el-table__row--striped) {
  background: #1439391c !important;
}
.dataTable >>> .el-pagination__jump {
  color: white;
}
.dataTable >>> .el-pagination__total {
  color: white;
}
</style>
