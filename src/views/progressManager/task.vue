<template>
  <div class="app-container">
    <el-row :gutter="20">
        <div >
          <span style="color:red; font-size:20px;">{{selectNode.label}}</span>
        </div>
        <!-- <div style="float:right;margin-right:10px">
          <el-input v-model="queryParams.devModel" placeholder="请输入关键字" clearable size="small" style="width: 200px;margin-right: 10px"/>
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div> -->
       

        <el-row :gutter="10" class="mb8" style="margin-top:5px;">
          <el-col :span="14">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" >新增任务</el-button>
          </el-col>
          <el-col :span="10">
            <div style="margin-right:10px">
              <el-input v-model="searchValue" placeholder="请输入任务名称" clearable size="small" style="width: 200px;margin-right: 10px"/>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </div>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="10" class="mb8" style="margin-top:5px;margin-bottom: 6px;">
          <el-col :span="1.5" style="color:white;">
           {{totalInfo}}
          </el-col>
        </el-row> -->



        <div class="dataTable">
          <el-table v-loading="loading"  :data="dataList.slice((currentPage-1)*pagesize,currentPage*pagesize)" >

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
                  <el-tag  v-if="scope.row.state=== 1" type="success">正常</el-tag>
                  <el-tag  v-if="scope.row.state=== 0" type="warning">异常</el-tag>
              </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleEdit(scope.row)" >修改</el-button>
                <el-button size="mini" type="text" @click="handleDel(scope.row)" >删除</el-button>
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
       
        
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
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
            <!-- <el-form-item label="选择单位">
                <el-select v-model="form.constructionUnit" placeholder="请选择施工单位" style="width:250px;">
                    <el-option v-for="dict in constructionUnitList" :key="dict" :label="dict" :value="dict" ></el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item label="选择单位" >
              <el-select v-model="selectValue" placeholder="请选择" clearable size="small" style="width: 250px" ref="selectTree">
                <el-option style="height: auto;" :value="optionValue" :label="optionValue">
                  <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick2" />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同款项" prop="contractPayment">
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
        <el-row v-if="xiugai === true">
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
          <el-col :span="12">
            <el-form-item label="任务计划"  prop="nodeFlag">
              <el-radio-group v-model="form.nodeFlag">
                <el-radio :label="1">节点计划</el-radio>
                <el-radio :label="0">子任务</el-radio>
              </el-radio-group>
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

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers" :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading" :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


import { taskList, addTask, putTask, delTask, getInfo, getProjectInfo } from "@/api/processback";
import { broadsideInfo } from '@/api/peopleManager'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapState } from 'vuex'


export default {
  name: "Formwork",
  props: {
        selectNode: {
            type: Object,
            default: {}
        }
    },
  components: { Treeselect },
  computed: {
    ...mapState({ 
      nodeState: state => state.nodeState,
      nodeStateId: state => state.nodeStateId
    }),
  },

    
  data() {
    return {
      xiugai: false,
      disabled: true,
      selectValue: undefined,
      optionValue: undefined,
       currentPage:1, //初始页
      pagesize:10, 
      searchValue: '',
        selectNodeId: '',
        projectTotal: 4,
        noStart: 2,
        doing: 1,
        complete: 1,
        currentDeptName: '',
        totalInfo: '',





      // 遮罩层
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
          nodeFlag: ''

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
        // siteId: undefined,
      },
      // 表单校验
      rules: {
        label: [
          { required: true, message: "项目名称不能为空", trigger: "blur" },
        ],
        // serialNumber: [
        //   { required: true, message: "编号不能为空", trigger: "blur" },
        // ],
        
        leadingCadre: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ],
        // contractPayment: [
        //   { required: true, message: "合同款项不能为空", trigger: "blur" },
        // ],
        contactInformation: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
        ],
        planStartTime: [
          { required: true, message: "计划开始时间不能为空", trigger: "blur" },
        ],
        planEndTime: [
          { required: true, message: "计划结束时间不能为空", trigger: "blur" },
        ],
        nodeFlag: [
          { required: true, message: "计划结束时间不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    "$store.state.nodeStateId"(old, newd) {
      console.log("旧的nodeId", old)
      console.log("新的nodeId", newd)
      if(this.$store.state.isLeaf === false) {
        this.getTaskList()
      }
      
    }
  },
  mounted() {
      console.log("任务nodeId", this.$store.state.nodeStateId)
      
      if(this.$store.state.isLeaf === false) {
        console.log("任务isleaf", this.$store.state.isLeaf)
         this.getBroadsideInfo()
         this.getTaskList()
          this.getInfo()
      }
      
     
  },
  created() {
    // if(this.$store.state.isLeaf === false) {
      
    // }
   
    
  },
  methods: {

     getBroadsideInfo() {
      var id = localStorage.getItem('siteId')
      broadsideInfo(id).then((res) => {
        console.log("打印deptOptions", res.data.data)
        this.deptOptions = res.data.data
        // var arr = res.data.data[0].childs
        // var tmp = []
        // for(let i = 0; i < arr.length; i++) {
        //   tmp.push(arr[i].name)
        // }
        // this.constructionUnitList = [...new Set(tmp)]
        
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
   },
   filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getInfo() {
      var params = {
        siteId: localStorage.getItem('siteId'),
        parentId: this.$store.state.nodeStateId
      }
      getProjectInfo(params).then((res) => {
        // console.log("一句话", res.data)
        this.totalInfo = res.data.data
      })
    },
    
    getTaskList() {
      // console.log("task", this.selectNodeId)
      // console.log("selectNodeId", localStorage.getItem("selectNodeId"))
      var params = {
        siteId: localStorage.getItem('siteId'),
        parentId: this.$store.state.nodeStateId
      }
      this.loading = true;
      taskList(params).then((res) => {
        this.dataList = res.data.rows
        this.total = res.data.total;
        this.loading = false;
      })
    },

    
    
   


   
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
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

    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
    },
    /** 搜索按钮操作 */
    handleQuery() {
      var params = {
        label: this.searchValue,
        parentId: this.$store.state.nodeStateId
      }
       this.loading = true;
      taskList(params).then((res) => {
        this.dataList = res.data.rows
        this.total = res.data.total;
        this.loading = false;
      })

    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.dateRange = [];
      // this.resetForm("queryForm");
      this.searchValue = ''
      this.getTaskList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
        this.open = true;
        this.title = "新增任务";
        console.log(this.form)
        this.reset()
        this.form.siteId = localStorage.getItem("siteId")
        this.xiugai = false

    },
    /** 修改按钮操作 */
    handleEdit(row) {
      console.log("编辑", row)
      
      getInfo(row.id).then((res) => {
        console.log("编辑数据", res.data.data)
        this.form = res.data.data
        this.selectValue = res.data.data.constructionUnit
        this.optionValue = res.data.data.constructionUnit
        this.title = '编辑'
        this.open = true
        this.xiugai = true

      })
    },
    handleDel(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delTask(row.id).then((res) => {
            if(res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.getTaskList();
              this.$emit('updateTree','updateTree');
            } else {
              this.$message({
                type: 'error',
                message: '删除失败！'
              })
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      
    },
    handleUpdate(row) {
        console.log("chakan",row)
        if(row.nodeFlag === 1) {
          // 是叶子节点
          console.log("是叶子节点")
          this.$store.commit('CHANGE_ISLEAF', true) 
          this.$store.commit('CHANGE_NODE_ID', row.id) 
        } else {
          // 不是叶子节点
          console.log("不是叶子节点")
          this.$store.commit('CHANGE_ISLEAF', false) 
          this.$store.commit('CHANGE_NODE_ID', row.id) 
        }
    },
    /** 重置密码按钮操作 */

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.parentId = this.$store.state.nodeStateId
          this.form.constructionUnit = this.optionValue
          if(this.form.id === '') {
            addTask(this.form).then((response) => {
              if (response.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                })
                this.open = false;
                this.reset()
                this.getTaskList();
                this.$emit('updateTree','updateTree');
              }
            });
          } else {
             if(this.form.actualEndTime !== null && this.form.actualStartTime === null) {
             
              this.$message.error('请先选择实际开始时间');

              return;
            } else {
              putTask(this.form).then((response) => {
                if (response.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  })
                  this.open = false;
                  this.reset()
                  this.getTaskList();
                  this.$emit('updateTree','updateTree');
                }
              });
            }
            
          }
            
        }
      });
    },
  
   
   
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then((response) => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
<style scoped>
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

