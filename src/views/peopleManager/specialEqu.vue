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
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">姓名</span><el-input v-model="queryParams.userName" placeholder="请输入姓名" clearable size="small" style="width: 120px;margin-right: 10px" />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">身份证号</span><el-input v-model="queryParams.userCode" placeholder="请输入身份证号" clearable size="small" style="width: 150px;margin-right: 10px"  />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">班组</span>
          <el-select v-model="queryParams.userClass" placeholder="请选择班组" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in userClassList" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select><span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">岗位/工种</span>
          <el-select v-model="queryParams.userPost" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in userPostList" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">状态</span>
          <el-select v-model="queryParams.userStatus" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in userStatusList" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
        

        <el-row :gutter="10" class="mb8">
          
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="addPeople" >添加人员</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="downloadModel" >下载模版</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="handleImport" >导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="handleExport" >导出EXCEL</el-button>
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
            <el-table-column label="姓名" align="center" prop="userName" />
            <el-table-column label="班组" align="center" prop="userClass"  />
            <el-table-column label="岗位/工种" align="center" prop="userPost" />
            <el-table-column label="手机号" align="center" prop="phone"  />
            <el-table-column label="民族" align="center" prop="userNationality"  />
            <el-table-column label="年龄" align="center" prop="userAge"  />
            <el-table-column label="学历" align="center" prop="userEducation"  />
            <el-table-column label="状态" align="center" prop="userStatus" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                <el-tag  v-if="scope.row.userStatus===0" type="danger">离职</el-tag>
                <el-tag  v-if="scope.row.userStatus===1" type="success">在职</el-tag>
                </template>
            </el-table-column>
            
            
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" >修改</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="historyRecord.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            background
          />
        </div> -->
      </el-col>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog title="劳务实名制新增页面" :visible.sync="open" width="800px" append-to-body class="addForm">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="选择单位" prop="devFactory">
              <!-- <el-select v-model="form.devType" placeholder="请选择" clearable size="small" style="width: 240px">
                <el-option v-for="dict in danweiList" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictLabel" />
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="devFactory">
              <el-input v-model="form.devFactory" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号"  prop="devName">
              <el-input v-model="form.devName" placeholder="设备名称"  />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备型号" prop="devModel">
              <el-input v-model="form.devModel" placeholder="设备型号"  />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工地名称" >
               <!-- <el-select v-model="form.constructionSiteId" placeholder="请选择工地名称" clearable size="small" style="width: 240px">
                <el-option v-for="item in departmentList" :key="item.deptId" :label="item.name" :value="item.deptId" />
              </el-select> -->
            </el-form-item>
          </el-col>


        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="personInCharge">
              <el-input v-model="form.personInCharge" placeholder="请输入负责人名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" >
              <el-input v-model="form.phone" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传输状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">未启用</el-radio>
                <el-radio :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="进厂时间" >
              <el-date-picker v-model="form.entryTime" size="small" style="width: 240px" value-format="yyyy-MM-dd" type="date"  placeholder="进厂时间" ></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="设备类型" >
               <!-- <el-select v-model="form.devType" placeholder="请选择设备类型" clearable size="small" style="width: 240px">
                <el-option v-for="dict in deviceStatusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictLabel" />
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

   <!-- 班组新增页面 -->
    <el-dialog :visible.sync="banzuOpen" title="班组新增页面" width="40%" >
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="banzuForm" :rules="banzuRules" ref="uploadInfo" label-width="1.5rem">
          <el-row>
            <div style="font-size:16px;color:red;">班组信息</div>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="班组名称:" prop="deviceSn">
                 <el-input v-model="banzuForm.deviceSn"  />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级班组:" prop="maxTorque">
                <el-input v-model="banzuForm.maxTorque" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider> 
          <el-row>
            <div style="font-size:16px;color:red;">班组负责人信息</div>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="负责人:" prop="idcard">
                 <el-input v-model="banzuForm.idcard"  />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号:" prop="operationTime">
                 <el-input v-model="banzuForm.operationTime"  />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="status">
                <el-radio-group v-model="banzuForm.status">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
               </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="学历" prop="userid">
                <el-select v-model="banzuForm.userid" placeholder="请选择学历" style="width: 50%">
                    <el-option
                        v-for="item in xueliOptions"
                        :key="item.guid"
                        :label="item.pname"
                        :value="item.guid">
                    </el-option>
                </el-select>
             </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="手机号:" prop="height">
                 <el-input v-model="banzuForm.height"  />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职业资格(岗位)证书编号:" prop="amplitude">
                 <el-input v-model="banzuForm.amplitude"  />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位/工种" prop="userid">
                <el-select v-model="banzuForm.userid" placeholder="请选择" style="width: 50%">
                    <el-option
                        v-for="item in gangweiOptions"
                        :key="item.guid"
                        :label="item.pname"
                        :value="item.guid">
                    </el-option>
                </el-select>
             </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="banzuForm.status">
                    <el-radio :label="0">在职</el-radio>
                    <el-radio :label="1">离职</el-radio>
                </el-radio-group>
               </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="特种作业人员" prop="status">
                <el-radio-group v-model="banzuForm.status">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
               </el-form-item>
            </el-col>
           
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="照片:" >
                <el-upload
                  class="upload-demo"
                  action="http://121.36.106.18:36080/system/safe/uploadFile"
                  :limit="1"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                >
                  <el-button slot="trigger" type="text" icon="el-icon-upload" style="text-align: center; font-size: 14px; ">选取文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="执业资格(岗位)证书:" >
                <el-upload
                  class="upload-demo"
                  action="http://121.36.106.18:36080/system/safe/uploadFile"
                  :limit="1"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                >
                  <el-button slot="trigger" type="text" icon="el-icon-upload" style="text-align: center; font-size: 14px; ">选取文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          
          
          

  
          
      
          </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormPeople">确 定</el-button>
            <el-button @click="cancelPeople">取 消</el-button>
          </div>
      </div>
    </el-dialog>
        
  </div>
</template>

<script>

import { peopleInfo, getLeftColumn, treeselect,   addDev, updateDev } from '@/api/peopleManager'
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
      currentSanfang: '',
      userClassList: [],
      userPostList: [],
      userStatusList: [
        {
          label: '在职',
          value: 1
        },
        {
          label: '离职',
          value: 2
        }
      ],
      banzuForm: {},
      banzuOpen: false,
      fileList:[],
      xueliOptions: [],
      gangweiOptions: [],
      
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
      
      // 默认密码
      initPassword: undefined,
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
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
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
        userName: '',
        userCode: '',
        userClass: '',
        userPost: '',
        userStatus: '',
        constructionSiteId: localStorage.getItem("deptId")


      },
      // 表单校验
      rules: {
        devFactory: [
          { required: true, message: "产权单位不能为空", trigger: "blur" },
        ],
        devName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
        ],
        repairCycle: [
          { required: true, message: "维修周期不能为空", trigger: "blur" },
        ],
        devModel: [
          { required: true, message: "设备型号不能为空", trigger: "blur" },
        ],
        personInCharge: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ],
        proTime: [
          { required: true, message: "进厂时间不能为空", trigger: "blur" },
        ],

        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        deptId: [
          { required: true, message: "归属部门不能为空", trigger: "blur" },
        ],

        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        tel: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      banzuRules: {
        devFactory: [
          { required: true, message: "产权单位不能为空", trigger: "blur" },
        ],
        devName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
        ],
        repairCycle: [
          { required: true, message: "维修周期不能为空", trigger: "blur" },
        ],
        devModel: [
          { required: true, message: "设备型号不能为空", trigger: "blur" },
        ],
        personInCharge: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ],
        proTime: [
          { required: true, message: "进厂时间不能为空", trigger: "blur" },
        ],

        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        deptId: [
          { required: true, message: "归属部门不能为空", trigger: "blur" },
        ],

        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        tel: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    
  },
  created() {
    this.getPeopleInfo()
    
    this.getTreeselect();
    // this.getDicts("sys_normal_disable").then((response) => {
    //   this.statusOptions = response.data;
    // });
    // this.getDicts("sys_user_sex").then((response) => {
    //   this.sexOptions = response.data;
    // });
    // this.getConfigKey("sys.user.initPassword").then((response) => {
    //   this.initPassword = response.msg;
    // });
  },
  methods: {
    getPeopleInfo() {
      var params = {
        constructionSiteId: localStorage.getItem("deptId"),
        flag: 1
      }
      peopleInfo(params).then((res) => {
        this.userList = res.data.rows
        this.loading = false
        this.total = res.data.total
      })
    },
   
    /** 查询部门下拉树结构 */
    getTreeselect() {
      var data = {
        // username: this.username,
        // status: 3
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

      var params = {
        constructionSiteId: data.deptId,
        userSignCompanyName: data.name,
        flag: 1
      }
      // this.loading = true;
      peopleInfo(params).then(response => {
        this.userList = response.data.rows;
        this.total = response.total;
        this.loading = false;
      });

    },
    
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    cancelPeople() {
      this.banzuOpen = false
      this.resetPeople()
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
    resetPeople() {},
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.queryParams.constructionSiteId = localStorage.getItem("deptId")
      this.queryParams.flag = 1
     
      this.loading = true;
      peopleInfo(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      // this.queryParams.entryTime = ''
      // this.resetForm("queryForm");
      this.queryParams.userName = '';
      this.queryParams.userCode = ''
      this.queryParams.userStatus = ''
      this.queryParams.userClass = '';
      this.queryParams.userPost = ''

      this.getPeopleInfo();
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
    
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.form = row
      this.open = true;
      this.title = "修改设备";
      
      console.log(row)
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
                
                this.getPeopleInfo()
              }
            });
          } else {
            addDev(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getPeopleInfo()
              }
            });
          }
        }
      });
    },

    submitFormPeople: function () {
      this.$refs["form"].validate((valid) => {

        if (valid) {
          this.form.type = "环境检测设备"
          if (this.form.id != undefined) {
            updateDev(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                 this.getPeopleInfo()
              }
            });
          } else {
            addDev(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                 this.getPeopleInfo()
              }
            });
          }
        }
      });
    },
   
    /** 导出按钮操作 */
    handleExport() {
      
    },
    /** 导入按钮操作 */
    handleImport() {
      
    },
    downloadModel() {},

    addPeople() {},
    handleSuccess(response, file, fileList) {
      this.uploadInfo.checkImg = response.data
      this.currentInfo.checkImg = response.data
    },
   

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
.dialog-footer {
  margin-left:50%;
}
</style>
