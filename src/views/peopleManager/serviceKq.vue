<template>
  <div class="app-container">
    <el-row :gutter="20">

      <el-col :span="4" :xs="24">
          <div class="dm-aside">
              <div class="border-top-left"></div>
            <div class="head-container header_tree">
            <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" default-expand-all @node-click="handleNodeClick" />
            </div>
          </div>
       
      </el-col>
     
      <el-col :span="20" :xs="24">
        <div v-show="showSearch" style="padding: 10px">
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">姓名</span><el-input v-model="queryParams.userSignName" placeholder="请输入姓名" clearable size="small" style="width: 120px;margin-right: 10px" />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">手机号</span><el-input v-model="queryParams.userSignPhone" placeholder="请输入手机号" clearable size="small" style="width: 150px;margin-right: 10px"  />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">班组</span>
          <treeselect v-model="queryParams.teamId" :options="treeData" placeholder="请选择" :clearable="true" :show-count="true"  style="width: 250px;display:inline-block;vertical-align:bottom;" @select="getSelectList" />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">类型</span>
          <el-select v-model="queryParams.userSignType" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
          <!-- <br /> -->
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">岗位/工种</span>
          <el-select v-model="queryParams.userPost" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in postList" :key="dict.postId" :label="dict.postName" :value="dict.postName" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">状态</span>
          <el-select v-model="queryParams.userSignStatus" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in signOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">时间</span>
          <el-date-picker
            style="width: 220px;margin-right: 10px"
            v-model="timeArry"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button  type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
        

        <el-row :gutter="10" class="mb8">
          
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="downloadModel" >下载模版</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="inExport" >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="handleExport" >导出EXCEL</el-button>
          </el-col>
           <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="daka" >补打卡</el-button>
          </el-col>

        </el-row>
        <div class="dataTable">
            <el-table v-loading="loading" 
            :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
            style="font-size: 0.22rem;"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
             @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="50" align="center" /> -->
            <el-table-column label="序号" width="80" type="index" align="center"/>
            <el-table-column label="姓名" align="center" prop="userSignName" />
            <el-table-column label="班组" align="center" prop="userSignClass"  />
            <el-table-column label="岗位/工种" align="center" prop="userSignKind" />
            <el-table-column label="手机号" align="center" prop="userSignPhone"  />
            <el-table-column label="考勤时间" align="center" width="200" prop="userSignTime"  />
            <el-table-column label="类型" align="center" prop="userSignType" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                <el-tag  v-if="scope.row.userSignType===1" >签到</el-tag>
                <el-tag  v-if="scope.row.userSignType===2" type="success">签出</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="userSignStatus" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                <el-tag  v-if="scope.row.userSignStatus===0" type="success">正常</el-tag>
                <el-tag  v-if="scope.row.userSignStatus===1" type="warning">未打卡</el-tag>
                <el-tag  v-if="scope.row.userSignStatus===2" type="danger">补打卡</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view"  @click="handleView(scope.row)" >查看</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-size="pagesize"
            :total="userList.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            background
          />
        </div>
      </el-col>
    </el-row>

    <!-- 查看对话框 -->
    <el-dialog title="查看信息" :visible.sync="viewOpen" width="800px" append-to-body class="addForm">
      <el-form ref="viewForm" :model="viewForm"  label-width="120px">

        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userSignName">
              <el-input type="input" v-model="viewForm.userSignName" readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班组"  prop="userSignClass">
               <el-input type="input" v-model="viewForm.userSignClass" readonly="true"  />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位/工种" prop="userSignKind">
              <el-input type="input" v-model="viewForm.userSignKind" readonly="true"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号"  prop="userSignPhone">
               <el-input type="input" v-model="viewForm.userSignPhone" readonly="true"  />
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="考勤时间" prop="userSignTime">
              <el-input type="input" v-model="viewForm.userSignTime" readonly="true"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="考勤类型" prop="userSignType">
              <el-radio-group v-model="viewForm.userSignType" >
                    <el-radio :label="1">签到</el-radio>
                    <el-radio :label="2">签出</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="userSignStatus">
              <el-radio-group v-model="viewForm.userSignStatus" >
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">未打卡</el-radio>
                    <el-radio :label="2">补打卡</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        
        <el-button @click="cancelView">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 补打卡 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body class="addForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <el-row>
          
          <el-col :span="12">
            <el-form-item label="时间"  prop="userSignTime">
               <el-date-picker
                    v-model="form.userSignTime"
                    
                    type="datetime"
                    @change="getUserSignTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="考勤类型" prop="userSignType">
              <el-radio-group v-model="form.userSignType" @change="getType">
                    <el-radio :label="1">签到</el-radio>
                    <el-radio :label="2">签出</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userSignName">
              <el-select v-model="form.userSignName" placeholder="请选择人名" clearable size="small">
                <el-option v-for="dict in nameList" :key="dict" :label="dict" :value="dict" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="说明" prop="reClockingInfo">
              <el-input type="textarea" v-model="form.reClockingInfo" placeholder="请输入打卡原因" />
            </el-form-item>
          </el-col>
          

        </el-row>





      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <el-dialog :visible.sync="modelOpen" :title="title" width="30%" @close="cancelModel">
      <div style="margin:0 auto; ">
        <el-upload
          style="margin-left:15%;margin-bottom:10px;"
          class="upload-demo"
          action=""
          accept=".xls,.xlsx"
          :limit="1"
          drag
          :on-change="handleChange"
          :file-list="fileList12"
          :auto-upload="false"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.xlsx文件</div>
        </el-upload>
        
        </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitExcel">导入</el-button>
            <el-button @click="cancelModel">取 消</el-button>
          </div>
      </div>
    </el-dialog>

  
        
  </div>
</template>

<script>

import { listDay, getLeftColumn, treeselect, allPeopleName, addDaKaPeople, exportKaoqinExcel, broadsideInfo, getTeamTree, searchDaka, exportDaka, importDaka, listByTime,  profession} from '@/api/peopleManager'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";


export default {
  name: "serviceKq",
  components: { Treeselect },
  
  data() {
    return {
      postList: [],
      pagesize:10,
      currentPage:1,
      fileList12: [],
      modelOpen: false,
      timeArry: [],
      currentUserSignCompanyName: '',
      queryParamsUserclass: '',
      treeData: [],
        selectTime: '',
        selectType: '',
        broadsideList: [],
        nameList: [],
        viewOpen: false,
        banzuOpen: false,
        
        viewForm: {
            userSignName: undefined,
            userSignStatus: undefined,
            userSignClass: undefined,
            userSignPhone: undefined,
            userSignKind: undefined,
            userSignType: undefined,
            userSignTime: undefined,
        },
     
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 用户表格数据
        userList: null,
        // 弹出层标题
        title: "",
        // 部门树选项
        deptOptions: [],
        // 是否显示弹出层
        open: false,

        // 日期范围
        dateRange: [],
        // 状态数据字典
        statusOptions: [
            {
            dictValue: 1,
            dictLabel: '签到'
            },
            {
            dictValue: 2,
            dictLabel: '签出'
            }
        ],
        signOptions: [
          {
            dictValue: 0,
            dictLabel: '正常'
            },
            {
            dictValue: 1,
            dictLabel: '未打卡'
            },
            {
            dictValue: 2,
            dictLabel: '补打卡'
            }
        ],
      
        // 表单参数
        form: {},
        defaultProps: {
            children: "childs",
            label: "name",
        },
      
        // 查询参数
        queryParams: {
            userPost: '',
            userSignPhone: '',
            userSignName: '',
            userSignType: '',
            userSignClass: undefined,
            startTime: '',
            endTime: ''
        },
      // 表单校验
      rules: {
        userSignName: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
        ],
        userSignTime: [
          { required: true, message: "时间不能为空", trigger: "blur" },
        ],
        userSignType: [
          { required: true, message: "考勤类型不能为空", trigger: "blur" },
        ],
        reClockingInfo: [
          { required: true, message: "补打卡原因不能为空", trigger: "blur" },
        ],
        

        
      },
    };
  },
  watch: {
    
  },
  created() {
    
    //this.getTreeselect();
   
  },
  mounted() {
      this.getListDay()
      this.getBanzu()
      this.getBroadsideInfo()
      this.getPofession()
  },
  methods: {
    getPofession() {
      // var id = localStorage.getItem('siteId')
      profession().then((res) => {
        console.log("岗位", res)
        this.postList = res.data.data
      })
    },
    submitExcel() {
      var id = localStorage.getItem('siteId')
      const formData = new FormData()
      formData.append('file', this.fileList12[0].raw)
      importDaka(id, formData).then((res) => {
        console.log("导入的文件res", res)
        if(res.data.code === 200) {
          this.fileList12 = []
          this.modelOpen = false
          this.getListDay()
        }
      })
    },
    handleChange(file, fileList) {
      this.fileList12 = fileList
    },
    cancelModel() {
      this.modelOpen = false
    },
    getSelectList(node, instanceId) {
      this.queryParamsUserclass = node.label
      this.queryParams.userSignClass = node.label
      this.queryParams.teamId = node.id
    },
    getBanzu() {
      var id = localStorage.getItem('siteId')
      getTeamTree(id).then((res) => {
        this.treeData = res.data.data
        
      })
    },
    getUserSignTime(val) {
      console.log("CurrentTime", val)
      this.selectTime = val
      var year = val.split(" ")[0]
      if(this.selectTime !== '' && this.selectType !== '') {
        var data = {
          date: year,
          siteId: localStorage.getItem('siteId'),
          userSignType: this.selectType
        }
        this.getAllName(data)
      }
    },
    getType(val) {
      this.selectType = val
      if(this.selectTime !== '' && this.selectType !== '') {
        var data = {
          date: this.selectTime.split(" ")[0],
          siteId: localStorage.getItem('siteId'),
          userSignType: this.selectType
        }
        this.getAllName(data)
      }
    },
    
    getBroadsideInfo() {
      var id = localStorage.getItem('siteId')
      broadsideInfo(id).then((res) => {
        this.deptOptions = res.data.data
      })
    },
     /** 查询用户列表 */
    getListDay() {
      var params = {
        constructionSiteId: localStorage.getItem('siteId'),
      }
      listDay(params).then((res) => {
          this.userList = res.data.data.userDay
          this.loading = false
      })
    },

    getAllName(data) {
      allPeopleName(data).then((res) => {
        this.nameList = res.data.data
      })
    },
   
   handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
   
    
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data, node, e) {
      
      this.currentUserSignCompanyName = data.name
      if(this.currentUserSignCompanyName.length > 4) {
        var params = {
          constructionSiteId: data.deptId
        }
      } else {
        var params = {
          constructionSiteId: data.deptId,
          deptName: data.name
        }
      }
      
      // this.loading = true;
      searchDaka(params).then(response => {
        this.userList = response.data.rows;
        this.total = response.total;
        this.loading = false;
      });

    },
    
    // 取消按钮
    cancel() {
      this.open = false;
      this.resetForm();
      this.getListDay()
    },
    
    cancelView() {
        this.viewOpen = false;
        this.getListDay()
    },
    // 表单重置
   
    /** 搜索按钮操作 */
    handleQuery() {
      console.log("timeArry", this.timeArry)
      this.queryParams.startTime = this.timeArry[0]
      this.queryParams.endTime = this.timeArry[1]
      if(this.queryParams.startTime !== null && this.queryParams.startTime === this.queryParams.endTime) {
        this.$message({
          type: 'error',
          message: '请选择一个范围时间段!'
        })
        return;
      }
   
      if(this.currentUserSignCompanyName.length > 4) {
        this.queryParams.deptName = ''
      } else {
        this.queryParams.deptName = this.currentUserSignCompanyName
      }
      this.queryParams.constructionSiteId = localStorage.getItem("siteId")
      this.queryParams.userSignClass = this.queryParamsUserclass
      
      this.loading = true;
      listByTime(this.queryParams).then(response => {
        this.userList = response.data.rows
        this.loading = false
        this.queryParamsUserclass = undefined
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.userSignStatus = ''
      this.queryParams.userSignName = ''
      this.queryParams.userSignClass = ''
      this.queryParams.userSignPhone = ''
      this.queryParams.userSignType = ''
      this.queryParams.userSignTime = ''
      this.queryParamsUserclass = undefined
      this.queryParams.startTime = ''
      this.queryParams.endTime = ''
      this.queryParams.userPost = ''
      this.timeArry = []
      
      this.getListDay();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    addBanzu() {
        this.banzuOpen = true
    },

    resetForm() {
      this.form.userSignType = ''
      this.form.userSignTime = ''
      this.form.reClockingInfo = ''
      this.form.constructionSiteId = ''
      this.form.userSignName = ''
      this.nameList = []
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {

        if (valid) {
            var string = this.form.userSignName.split("<")[1]
            this.form.userSignName = this.form.userSignName.split("<")[0]
            
          
            this.form.userSignPhone = string.slice(0, -1)

            this.form.constructionSiteId = localStorage.getItem("siteId")
            
            this.form.userSignStatus = 2
            addDaKaPeople(this.form).then((response) => {
              if (response.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '打卡成功!'
                })
                this.open = false;
                this.getListDay();
                this.resetForm()
              }
            });
          }
        
      });
    },

    downloadModel() {
      window.open('http://121.36.106.18:36082/attend_template.xlsx')
    },
    inExport() {
      this.modelOpen = true;
      this.title = "导入文件"
      this.actionUrl = `http://121.36.106.18:36080/people/info/importData?siteId=${localStorage.getItem('siteId')}`
    },
    handleExport() {
      var params = {
        constructionSiteId: localStorage.getItem('siteId'),
        deptName: this.currentUserSignCompanyName
      }
      exportDaka(params).then((res) => {
        // console.log("导出的文件", res.data.msg)
        window.open(res.data.msg)
      })
     
    },
    daka() {
        this.open = true;
      this.title = "考勤补打卡";
    },
    handleView(row) {
        this.viewOpen = true
        this.viewForm = row
    }

  },
};
</script>
<style lang="css" scoped>
.header_tree {
  overflow:auto;
  height: 400px;
  
}
.header_tree .el-tree {
  min-width: 100%;
  display: inline-block;
  color: white;
  background-color: transparent !important; 
  font-size: 14px; 
}
.header_tree .el-tree >>> .el-tree-node__children >>> .is-current {
    background: red !important;
}
.header_tree .el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: orange !important;
    
  }
.header_tree .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;color:orange;
  }
  .header_tree .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: orange;
    color:green;
  }


  .header_tree .el-tree >>> .el-tree-node:focus>.el-tree-node__content{
      background-color: orange;
      color: white;
    }


/* .header_tree .el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: #66b1ff87 !important;
  }
.header_tree  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;
  }
.header_tree .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
  } */
.addForm >>> .el-form-item--medium .el-form-item_content {
  width:60%;
}
.border-top-left {
  height: 10px;
  background-image: url("../../assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}
.dm-aside {
  background-color: rgba(0, 36, 78, 0.5);
  height: 80vh;
  margin: 0 5px;
  border-radius: 2px;
}
.mb8 {
    margin-bottom: 10px;
}
.dataTable >>> .el-table,
.dataTable >>> .el-table__expanded-cell {
  background-color: transparent !important;
}
/*透明化行、单元格*/
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
</style>
