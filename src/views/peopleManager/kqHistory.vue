<template>
  <div class="lskq">
    <el-row style="margin-top:0.3rem; " >


      <!--用户数据-->
      <el-col :span="24" :xs="24">
        <el-row>
<!--          <el-col :span="6">-->
<!--            <el-button type="success" icon="el-icon-edit" size="mini"  @click="handleUpdate()" >修改</el-button>-->
<!--            <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate()" >修改</el-button>-->
<!--                <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" >下载</el-button>-->
<!--          </el-col>-->
          <el-col :span="24">
            <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
              <el-form-item label="用户名" prop="userSignName" class="fixColor">
                <el-input v-model="queryParams.userSignName" placeholder="请输入用户名" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="打卡状态" prop="userSignStatus" class="fixColor">
                <el-input v-model="queryParams.userSignStatus" placeholder="请输入打卡状态" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />
              </el-form-item>
<!--              <el-form-item label="更新时间" prop="userSignTime" class="fixColor">-->
<!--                <el-input v-model="queryParams.userSignTime" placeholder="请输入更新时间" clearable size="small" style="width: 240px" @keyup.enter.native="handleQuery" />-->
<!--              </el-form-item>-->
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="dataTable">
          <el-table v-loading="loading" :data="userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)" @selection-change="handleSelectionChange" style="font-size: 0.20rem;"
                    stripe
                    :cell-style="cellStyle"
                    :header-row-style="{ color: '#409eff' }"
                    :row-style="{ color: 'white' }">
            <!--          <el-table-column type="selection" width="50" align="center" />-->
            <!--          <el-table-column label="项目序号" align="center" prop="id" width="200"/>-->
            <el-table-column label="工地编号" align="center" prop="id" width="120"/>
            <el-table-column label="用户名" align="center" prop="userSignName" :show-overflow-tooltip="true" width="180"/>
            <!--          <el-table-column label="用户昵称" align="center" prop="nickName" :show-overflow-tooltip="true" />-->
            <el-table-column label="工种" align="center" prop="userType" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="年龄" align="center" prop="userAge" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="手机号码" align="center" prop="phone" width="160" />
            <el-table-column label="打卡状态" align="center" prop="userSignStatus" width="120">
              <!--            <template slot-scope="scope">-->
              <!--              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>-->
              <!--            </template>-->
            </el-table-column>
            <el-table-column label="更新时间" align="center" prop="userSignTime" width="240">
              <!--            <template slot-scope="scope">-->
              <!--              <span>{{ parseTime(scope.row.createTime) }}</span>-->
              <!--            </template>-->
            </el-table-column>
            <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button v-if="scope.row.userSignStatus=='未打卡'||scope.row.userSignStatus==''" type="text" icon="el-icon-edit" style="font-size: 0.22rem; " @click="handleUpdate(scope.row)"
                >补打卡</el-button>
                <el-button v-else type="text" icon="el-icon-edit" style="color: #7c7c7c; font-size: 0.22rem; "
                >补打卡</el-button>
                <!--              <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)"-->
                <!--              >查看</el-button>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
<!--        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />-->
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="userListTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="960px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工地编号" prop="id">
              <el-input v-model="form.id" placeholder="请输入工地编号" readonly='true'/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="userSignName">
              <el-input v-model="form.userSignName" placeholder="请输入工地名称" />
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">-->
<!--            <el-form-item label="工地名称" prop="constructionSiteName">-->
<!--              <el-input v-model="form.constructionSiteName" placeholder="请输入工地名称" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="工种" prop="userType">
              <el-input v-model="form.userType" placeholder="请输入工种" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="userAge">
              <el-input v-model="form.userAge" placeholder="请输入年龄" maxlength="50" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入手机号码" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打卡状态" prop="userSignStatus">
              <el-select v-model="form.userSignStatus" placeholder="请选择打卡状态">
                <el-option v-for="(statu,index) in status" :key="index" :label="statu.value" :value="statu.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="更新时间" prop="userSignTime">
              <el-input v-model="form.userSignTime" placeholder="请输入更新时间" maxlength="11" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

// import {
//   listUser,
//   getUser,
//   delUser,
//   addUser,
//   updateUser,
//   exportUser,
//   resetUserPwd,
//   changeUserStatus,
//   importTemplate,
// } from "@/api/system/user";
// import { getToken } from "@/utils/auth";
// import { treeselect } from "@/api/system/dept";
// import Treeselect from "@riophae/vue-treeselect";
// import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {list,getById,manage} from '@/api/peopleManager';
import {getSysProData} from  '@/api/qualityControl';
export default {
  name: "kqHistory",

  data() {
    return {
      status:[{key:0, value:'已打卡'},{key:2,value:'迟到'},{key:3,value:'补打卡'}],
      // 当前每页数据的条数
      pageSize:10,
      // 数据的总条数
      pageTotal:0,
      // 翻页功能当前页
      currentPage: 1,
      // 根据工地id获取的工地名称
      proName:'',
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
      userListTotal: 0,
      // 用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
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
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
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
        // headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      },
      // 查询参数
      queryParams: {
        userSignName:'',
        constructionSiteName:'',
        userSignStatus:'',
        userSignTime:'',
      },
      // 表单校验
      rules:{
        userSignName:[
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        userSignStatus:[
          { required: true, message: "用户状态不能为空", trigger: "change" },
        ],
        userType:[
             { required: true, message: "工种不能为空", trigger: "blur" },
           ],
        userAge:[
          { required: true, message: "年龄不能为空", trigger: "blur" },
        ],
        phone:[
          { required: true, message: "手机号不能为空", trigger: "blur" },
        ],
        userSignTime:[
          { required: true, message: "更新时间不能为空", trigger: "blur" },
        ],
      },
      // rules: {
      //   userName: [
      //     { required: true, message: "用户名称不能为空", trigger: "blur" },
      //   ],
      //   nickName: [
      //     { required: true, message: "用户昵称不能为空", trigger: "blur" },
      //   ],
      //   deptId: [
      //     { required: true, message: "归属部门不能为空", trigger: "blur" },
      //   ],
      //   password: [
      //     { required: true, message: "用户密码不能为空", trigger: "blur" },
      //   ],
      //   email: [
      //     { required: true, message: "邮箱地址不能为空", trigger: "blur" },
      //     {
      //       type: "email",
      //       message: "'请输入正确的邮箱地址",
      //       trigger: ["blur", "change"],
      //     },
      //   ],
      //   phonenumber: [
      //     { required: true, message: "手机号码不能为空", trigger: "blur" },
      //     {
      //       pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      //       message: "请输入正确的手机号码",
      //       trigger: "blur",
      //     },
      //   ],
      // },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getConstructionSiteName(localStorage.getItem('siteId'))
    console.log("siteId",localStorage.getItem('siteId'))
    // this.getList();

  },
  methods: {
    // 根据工地id获取
    getConstructionSiteName(id) {
      getSysProData({
        deptId: id
        // deptId: 1031
      }).then(response => {
        console.log(response.data)
        console.log("根据工地id获取工地名")
        this.proName = response.data.proName
        console.log("拿到的proname",this.proName)
        this.getList()
      })
    },
    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      list({
        constructionSiteName:this.proName,
        //constructionSiteName: '石家庄宝能中心项目二标段',
        //id:100,
        //userSignCode:'',
        //userSignName:'',
        //userSignStatus:'',
        //userSignTime:'',
      }).then(response => {
        console.log("1数据获取成功",response.data.rows[1].constructionSiteName)
        if(response.data.rows.length>0){
          this.userList = response.data.rows.map(item =>{
            return{
              id:item.id,
              constructionSiteName:item.constructionSiteName,
              userType:item.userType,
              userAge:item.userAge,
              userSignName:item.userSignName,
              phone:item.phone,
              userSignStatus:item.userSignStatus,
              userSignTime:item.userSignTime,
            }
          })
        }
        this.userList.reverse()
        this.userListTotal = response.data.total
        for(var i = 0;i<this.userListTotal;i++){
          if(this.userList[i].userSignStatus === 0){
            this.userList[i].userSignStatus = "已打卡"
          } else if (this.userList[i].userSignStatus === 1){
            this.userList[i].userSignStatus = "未打卡"
          }else if (this.userList[i].userSignStatus === 2){
            this.userList[i].userSignStatus = "迟到"
          }else if (this.userList[i].userSignStatus === 3){
            this.userList[i].userSignStatus = "补打卡"
          }
        }

      })
      this.loading = false;
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    // handleNodeClick(data) {
    //   this.queryParams.deptId = data.id;
    //   this.getList();
    // },
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
    // 表单重置
    reset() {
      this.getList()
    },
    /** 搜索按钮操作 */
    handleQuery() {
      var sousuo = this.queryParams.userSignStatus
      if(this.queryParams.userSignStatus === "已打卡"){
        sousuo = 0
      }else if(this.queryParams.userSignStatus === "未打卡"){
        sousuo = 1
      }else if(this.queryParams.userSignStatus === "迟到"){
        sousuo = 2
      }else if(this.queryParams.userSignStatus === "补打卡"){
        sousuo = 3
      }
      this.loading = true;
      list({
        constructionSiteName:this.proName,
        //constructionSiteName: '石家庄宝能中心项目二标段',
        //id:100,
        //userSignCode:'',
        userSignName:this.queryParams.userSignName,
        userSignStatus:sousuo,
        userSignTime: this.queryParams.userSignTime,
      }).then(response => {
        console.log("搜索返回的结果",response.data.rows)
        if(response.data.rows.length>0){
          this.userList = response.data.rows.map(item =>{
            return{
              id:item.id,
              userSignName:item.userSignName,
              constructionSiteName:item.constructionSiteName,
              userType:item.userType,
              userAge:item.userAge,
              phone:item.phone,
              userSignStatus:item.userSignStatus,
              userSignTime:item.userSignTime,
            }
          })
        }else if(response.data.rows.length === 0){
          this.userList=[]
        }
        // console.log("cishid",this.userList)
        this.userList.reverse()
        this.userListTotal = response.data.total
        for(var i = 0;i<this.userListTotal;i++){
          if(this.userList[i].userSignStatus === 0){
            this.userList[i].userSignStatus = "已打卡"
          } else if (this.userList[i].userSignStatus === 1){
            this.userList[i].userSignStatus = "未打卡"
          }else if (this.userList[i].userSignStatus === 2){
            this.userList[i].userSignStatus = "迟到"
          }else if (this.userList[i].userSignStatus === 3){
            this.userList[i].userSignStatus = "补打卡"
          }
        }
      })
      this.loading = false;
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
     handleSelectionChange(selection) {
    //   this.ids = selection.map((item) => item.userId);
    //   this.single = selection.length != 1;
    //   this.multiple = !selection.length;
     },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      console.log("补打卡按钮生效")
      console.log(typeof(row.id))
      this.open = true;
      this.form = row
      this.form.userSignStatus = ''
      // getById({
      //   id:row.id
      // }).then(response => {
      //   if(response.data.code === 200){
      //     console.log("补打卡",response.data.msg)
      //     if(response.data.rows.length>0){
      //       this.form = response.data.rows.map(item => {
      //         return{
      //           id:item.id,
      //           constructionSiteName:item.constructionSiteName,
      //           userSignCode:item.userSignCode,
      //           userSignName:item.userSignName,
      //           userSignStatus:item.userSignStatus,
      //           userSignTime:item.userSignTime,
      //         }
      //       })
      //     }
      //   }
      // })

      //const userId = row.userId || this.ids;
    },
    // 查看按钮操作
    handleView(row){

    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            if (response.code === 200) {
              this.msgSuccess("修改成功，新密码是：" + value);
            }
          });
        })
        .catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
         // this.form.id = 2
          //let Statu = null
          console.log("status",this.form.userSignStatus)
          // if(this.form.userSignStatus == "已打卡" ){
          //   Statu = 0
          // }else if (this.form.userSignStatus == "迟到"){
          //   Statu = 2
          // }else if (this.form.userSignStatus == "补打卡"){
          //   Statu = 3
          // }
          let Arr = {
            constructionSiteName:this.form.constructionSiteName,
            id:this.form.id,
            userSignStatus:this.form.userSignStatus
          }
          manage(Arr).then(response => {
            if(response.data.code === 200){
              this.$message.success(response.data.msg)
            }else {
              this.$message.error("修改失败！")
            }
            console.log(response.data.msg)
            this.open = false;
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const userIds = row.userId || this.ids;
    //   this.$confirm(
    //     '是否确认删除用户编号为"' + userIds + '"的数据项?',
    //     "警告",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     }
    //   )
    //     .then(function () {
    //       return delUser(userIds);
    //     })
    //     .then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     })
    //     .catch(function () {});
    // },
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm("是否确认导出所有用户数据项?", "警告", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(function () {
    //       return exportUser(queryParams);
    //     })
    //     .then((response) => {
    //       this.download(response.msg);
    //     })
    //     .catch(function () {});
    // },
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
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    cellStyle({row, column, rowIndex, columnIndex}) {
      // console.log(row)
      if (row.userSignStatus === "已打卡" && columnIndex === 5) {
        return 'color:rgb(1,179,251)'
      } else if (row.userSignStatus === "未打卡" && columnIndex === 5) {
        return 'color: rgb(255,198,108)'
      } else if (row.userSignStatus === "补打卡" && columnIndex === 5) {
        return 'color:rgb(0,210,219)'
      } else if (row.userSignStatus === "迟到" && columnIndex === 5) {
        return 'color: rgb(227,79,66)'
      }
    }
  },
};
</script>

<style scoped>
.lskq {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem .3rem;
}

 .fixColor >>> .el-form-item__label{
  color: white;
}

/*翻页*/
.block{
  float: right;
  margin-top: 20px;
}
.block >>> .el-pagination__total{
  color: white;
}
.block >>>.el-pagination__jump{
  color: white;
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
