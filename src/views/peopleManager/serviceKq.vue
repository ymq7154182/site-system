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
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">姓名</span><el-input v-model="queryParams.name" placeholder="请输入姓名" clearable size="small" style="width: 120px;margin-right: 10px" />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">身份证号</span><el-input v-model="queryParams.idCard" placeholder="请输入身份证号" clearable size="small" style="width: 150px;margin-right: 10px"  />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">班组</span>
          <el-select v-model="queryParams.status" placeholder="请选择班组" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">状态</span>
          <el-select v-model="queryParams.status" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">时间</span>
          <el-date-picker
            style="width: 120px;margin-right: 10px"
            v-model="queryParams.date"
            type="daterange"
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
            :data="userList"  
            style="font-size: 0.22rem;"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
             @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="序号" width="80" type="index" align="center"/>
            <el-table-column label="姓名" align="center" prop="userSignName" />
            <el-table-column label="班组" align="center" prop="userSignClass"  />
            <el-table-column label="岗位/工种" align="center" prop="userSignKind" />
            <el-table-column label="手机号" align="center" prop="userSignPhone"  />
            <el-table-column label="考勤时间" align="center" width="200" prop="userSignTime"  />
            <el-table-column label="类型" align="center" prop="userSignType" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                <el-tag  v-if="scope.row.userSignType===1" type="danger">签到</el-tag>
                <el-tag  v-if="scope.row.userSignType===2" type="success">签出</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center" prop="userSignStatus" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                <el-tag  v-if="scope.row.userSignStatus===0" type="success">正常</el-tag>
                <el-tag  v-if="scope.row.userSignStatus===1" type="success">未打卡</el-tag>
                <el-tag  v-if="scope.row.userSignStatus===2" type="success">补打卡</el-tag>
                </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view"  @click="handleView(scope.row)" >查看</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="userList.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            background
          />
        </div> -->
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
            <el-form-item label="姓名" prop="userSignName">
              <treeselect v-model="form.userSignName"  :options="deptOptions" placeholder="请选择姓名" :clearable="true" :show-count="true" :disable-branch-nodes="true" />

              <!-- <el-tree v-model="form.userSignName" :data="deptOptions" :props="defaultProps" placeholder="请选择名字" :expand-on-click-node="true" :filter-node-method="filterNode" ref="tree"  @node-click="handleNodeClick" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间"  prop="userSignTime">
               <el-date-picker
                    v-model="form.userSignTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="考勤类型" prop="userSignType">
              <el-radio-group v-model="form.userSignType">
                    <el-radio :label="1">签到</el-radio>
                    <el-radio :label="2">签出</el-radio>
                </el-radio-group>
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

  
        
  </div>
</template>

<script>

import { listDay, getLeftColumn, treeselect, listDev, getDev, delDev, addDev, updateDev, exportDev, getDeparament } from '@/api/peopleManager'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";


export default {
  name: "serviceRealName",
  components: { Treeselect },
  
  mounted() {
      this.username = localStorage.getItem('siteName')
  },
  data() {
    return {
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
            dictValue: 0,
            dictLabel: '未启用'
            },
            {
            dictValue: 1,
            dictLabel: '启用'
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
            pageNum: 1,
            pageSize: 10,
            devFactory: '',
            devName: '',
            status: undefined,
            entryTime: '',


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
    
    this.getList();
    this.getTreeselect();
   
  },
  mounted() {
      this.getListDay()
  },
  methods: {
    getListDay() {
      listDay({
        constructionSiteId: localStorage.getItem('siteId')
      }).then((res) => {
          this.userList = res.data.data.userDay
        // if(res.data.data.userDay.length === 0) {
        //   this.showDayList = false
        // } else {
        //   this.showDayList = true
        //   var tmparr = res.data.data.userDay
        //   var data = []
        //   for(var i = 0; i < tmparr.length; i++) {
        //     var data1 = []
        //     data1.push(tmparr[i].userSignTime)
        //     data1.push(tmparr[i].userSignName)
        //     data1.push(tmparr[i].userSignKind)
        //     if(tmparr[i].userSignType === 1) {
        //       data1.push("<span style='color: #3DE7C9'>签到</span>")
        //     } else if(tmparr[i].userSignType === 2){
        //       data1.push("<span style='color: #eeba2b'>签出</span>")
        //     } else {
        //       data1.push("<span style='color: #e43c13'>无签到信息</span>")
        //     }
        //     data.push(data1)
        //   }
        //   this.configTable = {
        //     header: ['考勤时间', '考勤人员', '工种', '考勤类型'],
        //     headerHeight: 45,
        //     data: data,
        //     rowNum: 4,
        //     align: ['center', 'center', 'center', 'center'],
        //     headerBGC: '',
        //     evenRowBGC: ''
        //   }
        // }
        

      })
    },
    /** 查询用户列表 */
    getList() {
      var deptId = localStorage.getItem("deptId")
      console.log("deptId", deptId)
      var params = {
        constructionSiteId: deptId,
        type: '环境检测设备'
      }
      this.loading = true;
      listDev(params).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });


    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      // console.log(this.username)
      
      var data = {
        username: this.username,
        status: 3
      }
      getLeftColumn(data).then((response) => {
       // this.deptOptions.push(response.data)
        this.deptOptions = [
           {deptId: 101, name: '石家庄宝能中心项目二标段', childs:[
               {deptId: 101, name: '建设单位'},
               {deptId: 101, name: '施工单位'},
               {deptId: 101, name: '监理单位'}
           ]}
        ]
      });
    },
    // getTreeselect() {
    //   // this.deptOptions = [{"id":100,"label":"设备总览","children":[{"id":205,"label":"塔吊"},{"id":101,"label":"起重机"},{"id":102,"label":"升降机"}]}]
    //   treeselect().then((response) => {
    //     this.deptOptions = response.data;
    //   });
    //
    // },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data, node, e) {
      console.log("data",data)
      console.log(node)
      console.log(e)
      if(data.flag === 1) {

        var params = {
          constructionSiteId: data.deptId,
          devType: data.name,
          type: '环境检测设备'

        }

      } else{
        var params = {
          constructionSiteId: data.deptId,

          type: '环境检测设备'

        }
      }


      this.loading = true;
      listDev(params).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });

    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        '确认要"' + text + '""' + row.userName + '"用户吗?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    cancelView() {
        this.viewOpen = false;
        this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        constructionSiteId:undefined,
        constructionSiteName:'',
        devFactory:'',
        devModel: '',
        devName: '',
        devType: '',
        entryTime: '',
        personInCharge: '',
        phone: '',
        status: 0,
        type: "环境检测设备",

      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.queryParams.constructionSiteId = localStorage.getItem("deptId")
      this.queryParams.type = "环境检测设备"
      this.loading = true;
      listDev(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.queryParams.entryTime = ''
      // this.resetForm("queryForm");
      this.queryParams.devName = '';
      this.queryParams.devFactory = ''
      this.queryParams.status = ''
      this.handleQuery();
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

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {

        if (valid) {
          this.form.type = "环境检测设备"
          if (this.form.id != undefined) {
            updateDev(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addDev(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },

    downloadModel() {

    },
    inExport() {},
    handleExport() {},
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
.header_tree .el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: #66b1ff87 !important;
  }
.header_tree  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;
  }
.header_tree .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
  }
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
