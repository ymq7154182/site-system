<template>
  <div class="app-container">
    <el-row :gutter="20">

      <!-- <el-col :span="4" :xs="24">
          <div class="dm-aside">
              <div class="border-top-left"></div>
            <div class="head-container header_tree">
            <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" default-expand-all @node-click="handleNodeClick" />
            </div>
          </div>
       
      </el-col> -->
     
      <el-col :span="24" :xs="24">
        <div v-show="showSearch" style="padding: 10px">
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">姓名</span><el-input v-model="queryParams.userName" placeholder="请输入姓名" clearable size="small" style="width: 120px;margin-right: 10px" />
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">身份证号</span><el-input v-model="queryParams.userCode" placeholder="请输入身份证号" clearable size="small" style="width: 190px;margin-right: 10px"  />
          
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">岗位/工种</span>
          <el-select v-model="queryParams.userPost" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in postList" :key="dict.id" :label="dict.professionName" :value="dict.professionName" />
          </el-select>
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">状态</span>
          <el-select v-model="queryParams.userStatus" placeholder="请选择" clearable size="small" style="width: 120px;margin-right: 10px">
            <el-option v-for="dict in userStatusList" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
          
          <span style="font-size: 14px;color: white;font-weight: 700;margin-right: 10px">班组</span>
          <treeselect v-model="queryParams.teamId" :options="treeData" placeholder="请选择" :clearable="true" :show-count="true"  style="width: 250px;display:inline-block;vertical-align:bottom;" @select="getSelectList" />
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
        

        <el-row :gutter="10" class="mb8">
          
          <el-col :span="1.5">
            <el-button type="primary"  size="mini" @click="addPeopleBtn" >添加人员</el-button>
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
            :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  
            style="font-size: 0.22rem;"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
             @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="50" align="center" /> -->
            <el-table-column label="序号" width="80" type="index" align="center"/>
            <el-table-column label="姓名" align="center" prop="userName" />
            <!-- <el-table-column label="班组" align="center" prop="userClass"  /> -->
            <el-table-column label="岗位/工种" align="center" prop="userPost" />
            <el-table-column label="联系方式" align="center" prop="phone"  />
            <el-table-column label="身份证号" align="center" prop="userCode"  />
            <el-table-column label="年龄" align="center" prop="userAge"  />
             <el-table-column label="证书编号" align="center" prop="userVcode"  />
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

    <!-- 添加人员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body class="addForm" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <!-- <el-col :span="24">

            <el-form-item label="选择单位" prop="userSignCompanyName">
              <el-select v-model="selectValue" placeholder="请选择" clearable size="small" style="width: 240px" ref="selectTree">
                <el-option style="height: auto;" :value="optionValue" :label="optionValue">
                  <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick2" />
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row> 
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号"  prop="userCode">
              <el-input v-model="form.userCode" placeholder="请输入身份证号"  />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别" prop="userSex">
              <el-radio-group v-model="form.userSex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历" >
               <el-select v-model="form.userEducation" placeholder="请选择学历" clearable size="small" style="width: 240px">
                <el-option v-for="item in educationList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执业资格(岗位)证书编号" >
              <el-input v-model="form.userVcode" placeholder="请输入" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="民族" prop="userNationality">
              <el-input v-model="form.userNationality" placeholder="请输入民族" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="userAge">
              <el-input v-model="form.userAge" placeholder="请输入年龄" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="班组" prop="teamId">
              <treeselect v-model="form.teamId" :options="treeData3" placeholder="请选择" :clearable="true" :show-count="true"  style="display:inline-block;vertical-align:bottom;" @select="getSelectList3" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="班组负责人" prop="leader">
              <el-radio-group v-model="form.leader">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位/工种" prop="userPost">
              <el-select v-model="form.userPost" placeholder="请选择" clearable size="small" style="width: 240px">
                <el-option v-for="dict in postList" :key="dict.id" :label="dict.professionName" :value="dict.professionName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="userStatus">
              <el-radio-group v-model="form.userStatus">
                <el-radio :label="1">在职</el-radio>
                <el-radio :label="0">离职</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="特种作业人员" prop="flag">
              <el-radio-group v-model="form.flag">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>

          <el-col :span="12">
            
              <el-form-item label="照片">
                <el-upload
                  class="upload-demo"
                  action="http://121.36.106.18:38080/system/safe/uploadFile"
                  :limit="1"
                  :on-success="handleSuccess2"
                  accept=".jpg,.png"
                  style="width: 90%; "
                >
                  <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
                </el-upload>
              </el-form-item>
              <el-image
                style="margin-left:30px;"
                v-if="title === '修改人员'"
                :src="form.userImg"
                >
              </el-image>
              
            
          </el-col>
        </el-row>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    
    <!--  -->

    <!-- 导入信息 -->
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

import { peopleInfo, getLeftColumn, treeselect, updateDev, getTeamTree, addBanzu, addPeople, putPeople, exportExcel, importExcel, profession, broadsideInfo } from '@/api/peopleManager'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";


export default {
  name: "specialEqu",
  components: { Treeselect },
  
  mounted() {
  },
  data() {
    return {
      selectValue: undefined,
      optionValue: undefined,
      pagesize:10,
      currentPage:1,
      queryParamsUserClass: undefined,
      fileList12: [],
      file: null,
      actionUrl: '',
      modelOpen: false,
      currentUserSignCompanyName: '',
      postList: [],
      educationList: ['小学', '初中', '高中', '专科', '本科', '研究生'],
      danweiList: ['建设单位', '施工单位', '监理单位'],
      currentSanfang: '',
      userClassList: [],
      treeData: [],
      treeData2: [],
      treeData3: [],
      userPostList: [],
      userStatusList: [
        {
          label: '在职',
          value: 1
        },
        {
          label: '离职',
          value: 0
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
        
        userName: '',
        userCode: '',
        userClass: null,
        teamId: null,
        userPost: '',
        userStatus: '',
        constructionSiteId: localStorage.getItem("siteId")


      },
      // 表单校验
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
      
      banzuRules: {
        label: [
          { required: true, message: "班组姓名不能为空", trigger: "blur" },
        ],
        parentId: [
          { required: true, message: "上级班组不能为空", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "负责人不能为空", trigger: "blur" },
        ],
        userCode: [
          { required: true, message: "身份证不能为空", trigger: "blur" },
        ],
        userVcode: [
          { required: true, message: "证书编号不能为空", trigger: "blur" },
        ],
        userStatus: [
          { required: true, message: "状态不能为空", trigger: "blur" },
        ],

        phone: [
          { required: true, message: "联系方式不能为空", trigger: "blur" },
        ],
        checkImg: [
          { required: true, message: "资质证书不能为空", trigger: "blur" },
        ],
        userImg: [
          { required: true, message: "照片不能为空", trigger: "blur" },
        ],
        userSex: [
          { required: true, message: "性别不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    
  },
  created() {
    this.getPeopleInfo()
    this.getBanzu()
    this.getTreeselect();
    this.getPofession();
    this.getBroadsideInfo()
  },
  methods: {

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
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
     getBroadsideInfo() {
      var id = localStorage.getItem('siteId')
      broadsideInfo(id).then((res) => {
        this.deptOptions = res.data.data
        var arr = res.data.data[0].childs
        var tmp = []
        for(let i = 0; i < arr.length; i++) {
          tmp.push(arr[i].name)
        }
        this.danweiList = [...new Set(tmp)]
      })
    },
    getPofession() {
      var id = localStorage.getItem('siteId')
      profession(id).then((res) => {
        console.log("岗位", res)
        this.postList = res.data.rows
      })
    },
    getSelectList(node, instanceId) {
      
      this.queryParamsUserclass = node.label
      this.queryParams.userClass = node.label
      this.queryParams.teamId = node.id
    },
    getSelectList2(node, instanceId) {
      // console.log("node", node)
      // console.log("instanceId", instanceId)
      this.banzuForm.userClass = node.label
      this.banzuForm.teamId = node.id
    },
    getSelectList3(node, instanceId) {
      // console.log("node", node)
      // console.log("instanceId", instanceId)
      this.form.userClass = node.label
      this.form.teamId = node.id
    },
    getBanzu() {
      var id = localStorage.getItem('siteId')
      getTeamTree(id).then((res) => {
        this.treeData = res.data.data
        this.treeData2 = res.data.data
        this.treeData3 = res.data.data
      })
    },
    getPeopleInfo() {
      var params = {
        constructionSiteId: localStorage.getItem("siteId"),
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
      // console.log("data",data)
      // console.log(node)
      // console.log(e)
      this.currentUserSignCompanyName = data.name
      if(this.currentUserSignCompanyName.length > 4) {
        var params = {
          constructionSiteId: data.deptId,
          flag: 1
        }
      } else {
        var params = {
          constructionSiteId: data.deptId,
          userSignCompanyName: data.name,
          flag: 1
        }
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
      this.getPeopleInfo()
      
    },
    
    cancelModel() {
      this.modelOpen = false
     
    },
    submitExcel() {
      var id = localStorage.getItem('siteId')
      const formData = new FormData()
      formData.append('file', this.fileList12[0].raw)
      importExcel(id, formData).then((res) => {
        console.log("导入的文件res", res)
        if(res.data.code === 200) {
          this.fileList12 = []
          this.modelOpen = false
          this.getPeopleInfo()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    handleChange(file, fileList) {
      this.fileList12 = fileList
    },
    
    // 表单重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.form.userImg = ''
      this.form.constructionSiteId = ''
      this.form.id = ''
      this.form.userName = ''
      this.form.userClass = null
      this.form.teamId = null
      this.form.userPost = ''
      this.form.userCode = ''
      this.form.userVcode = ''
      this.form.userSex = ''
      this.form.phone = ''
      this.form.userNationality = ''
      this.form.userAge = ''
      this.form.userEducation = ''
      this.form.userSignDeptName = ''
      this.form.userSignCompanyName = ''
      this.form.checkImg = ''
      this.form.leader = ''
      this.form.flag = ''
      this.form.userStatus = ''
     
      this.fileList = []
      
    },
    resetForm2(formName) {
      this.$refs[formName].resetFields();
      this.banzuForm.userImg = ''
      this.banzuForm.constructionSiteId = ''
      this.banzuForm.id = ''
      this.banzuForm.userName = ''
      this.banzuForm.userClass = null
      this.banzuForm.teamId = null
      this.banzuForm.userPost = ''
      this.banzuForm.userCode = ''
      this.banzuForm.userVcode = ''
      this.banzuForm.userSex = ''
      this.banzuForm.phone = ''
      this.banzuForm.userNationality = ''
      this.banzuForm.userAge = ''
      this.banzuForm.userEducation = ''
      this.banzuForm.userSignDeptName = ''
      this.banzuForm.userSignCompanyName = ''
      this.banzuForm.checkImg = ''
      this.banzuForm.leader = ''
      this.banzuForm.flag = ''
      this.banzuForm.userStatus = ''
      this.banzuForm.teamId = ''
      this.banzuForm.label = ''
      this.banzuForm.parentId = undefined
      this.fileList = []
      
    },
    
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.constructionSiteId = localStorage.getItem("siteId")
      if(this.currentUserSignCompanyName.length > 4) {
        this.queryParams.userSignCompanyName = ''
      } else {
        this.queryParams.userSignCompanyName = this.currentUserSignCompanyName
      }
      this.queryParams.flag = 1
      
      
     
      this.loading = true;
      peopleInfo(this.queryParams).then(response => {
        this.userList = response.data.rows;
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
      this.queryParams.userClass = null;
      this.queryParams.userPost = ''
      this.queryParams.phone = ''
      this.queryParams.teamId = null
      this.queryParamsUserClass = ''
      this.currentUserSignCompanyName = ''
      this.getPeopleInfo();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    addBanzuBtn() {
        this.banzuOpen = true
        this.title = '新增班组'

    },
    
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log("AAA", row)
      // this.optionValue = row.userSignCompanyName
      // this.selectValue = {
      //   deptId: row.constructionSiteId,
      //   name: row.userSignCompanyName
      // }
      this.form = row
      this.open = true;
      this.title = "修改人员";
      
      // console.log(row)
    },
   
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
      //  this.form.userSignCompanyName = this.optionValue
       this.form.userStatus = parseInt(this.form.userStatusStr)
        this.form.constructionSiteId = localStorage.getItem('siteId')
       console.log("提交信息", this.form)
        
        if (valid) {
           if(this.form.id === '') {
             addPeople(this.form).then((response) => {
              if (response.data.code === 200) {
              
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                })
                this.open = false;
                this.getPeopleInfo()
                this.resetForm('form')
              } else {
                this.$message({
                  type: 'error',
                  message: response.data.msg
                })
              }
            });
           } else {
             putPeople(this.form).then((response) => {
          
              if (response.data.code === 200) {
              
                this.$message({
                  type: 'success',
                  message: '更新成功！'
                })
                this.open = false;
                this.getPeopleInfo()
                this.resetForm('form')
              } else {
                this.$message({
                  type: 'error',
                  message: response.data.msg
                })
              }
            });
           }
            
          }
       
      });
    },

    submitFormPeople: function () {
      this.$refs["banzuForm"].validate((valid) => {
        if (valid) {
          var obj = {
            siteId: localStorage.getItem('siteId'),
            label: this.banzuForm.label,
            parentId: this.banzuForm.parentId
          }
          var obj2 = {
            checkImg: this.banzuForm.checkImg,
            constructionSiteId: localStorage.getItem('siteId'),
            flag: this.banzuForm.flag,
            leader: this.banzuForm.leader,
            phone: this.banzuForm.phone,
            userCode: this.banzuForm.userCode,
            userEducation: this.banzuForm.userEducation,
            userImg: this.banzuForm.userImg,
            userName: this.banzuForm.userName,
            userPost: this.banzuForm.userPost,
            userSex: this.banzuForm.userSex,
            userStatus: this.banzuForm.userStatus,
            userVcode: this.banzuForm.userVcode,
            userClass: this.banzuForm.label,
            userNationality: this.banzuForm.userNationality,
            userAge: this.banzuForm.userAge,
            userSignCompanyName: this.currentUserSignCompanyName
          }
          var tijiaoForm = {
            siteUserInfo: obj2,
            teams: obj
          }
          // console.log("班组提交的信息",tijiaoForm)
          addBanzu(tijiaoForm).then((response) => {
            // console.log("SASAS",response.data)
            if (response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.banzuOpen = false;
              this.getPeopleInfo()
              this.resetForm2('banzuForm')
            }
          });
          
          
        }
      });
    },
   
    /** 导出按钮操作 */
    handleExport() {
      var params = {
        constructionSiteId: localStorage.getItem('siteId'),
        userSignCompanyName: this.currentUserSignCompanyName
      }
      exportExcel(params).then((res) => {
        // console.log("导出的文件", res.data.msg)
        window.open(res.data.msg)
      })
    },
    /** 导入按钮操作 */
    handleImport() {
      this.modelOpen = true;
      this.title = "导入文件"
      this.actionUrl = `http://121.36.106.18:38080/people/info/importData?siteId=${localStorage.getItem('siteId')}`
    },
    downloadModel() {
      window.open('http://121.36.106.18:38082/labor_template.xlsx')
    },

    addPeopleBtn() {
      console.log("工地id", localStorage.getItem('siteId'))
      this.open = true
      this.title = '新增人员'
      this.form.id = ''
     
      this.resetForm("form");
    },
    handleSuccess(response, file, fileList) {
      this.banzuForm.userImg = response.data
      
    },
    handleSuccess2(response, file, fileList) {
      this.form.userImg = response.data
     
    },
     handleSuccess3(response, file, fileList) {
      this.banzuForm.checkImg = response.data
      
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
  margin-left:30%;
}
.block >>> .el-pagination__total {
  color: white;
}
</style>
