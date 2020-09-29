<template>
  <div class="safeRecord">
    <el-row style="margin-top:0.3rem; " >
      <!--用户数据-->
      <el-col :span="24" :xs="24">
<!--        按钮部分-->
        <el-row :gutter="10" style="margin-bottom: 0.3rem;">
          <el-col :span="2">
            <el-button type="success" icon="el-icon-edit" size="mini"  @click="addRecord" >新增</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" >下载</el-button>
          </el-col>
        </el-row>
<!--        表格部分-->
        <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange"  border >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="用户编号" align="center" prop="id" width="100"/>
          <el-table-column label="项目名称" align="center" prop="p_name" :show-overflow-tooltip="true" width="200"/>
          <el-table-column label="施工单位" align="center" prop="p_unit" :show-overflow-tooltip="true" width="200"/>
          <el-table-column label="日期" align="center" prop="p_time" :show-overflow-tooltip="true" width="200"/>
          <el-table-column label="安全员姓名" align="center" prop="p_inspector" width="120" />
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width" >
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
    <!-- 查看对话框 -->
    <el-dialog title="查看" :visible.sync="opencheck" width="960px" append-to-body>
      <el-form ref="form" :model="checkForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="p_name" >
              <el-input v-model="checkForm.p_name" placeholder="请输入项目名称" readOnly='true'/>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="施工单位" prop="p_unit" label-width="100px">
              <el-input v-model="checkForm.p_unit" placeholder="请输入施工单位" readOnly='true'/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期" prop="p_time">
              <el-input v-model="checkForm.p_time" placeholder="请输入日期" readOnly='true'/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全员姓名" prop="p_inspector" label-width="100px">
              <el-input v-model="checkForm.p_inspector" placeholder="请输入安全员姓名" readOnly='true'/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="整改内容" prop="p_content">
              <el-input v-model="checkForm.p_content" placeholder="请输入整改内容" readOnly='true'/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片展示" prop="p_url" >
              <img :src="checkForm.p_url" alt="" style="display:inline-block;background:green; background-color: rgba(60,63,65,0.2)">
            </el-form-item>
          </el-col>
<!--          <el-col :span="12">-->
<!--            <el-form-item label="图片地址" prop="p_url" label-width="100px">-->
<!--              <el-input v-model="form.p_url" placeholder="请输入图片地址" readOnly='true' />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancelcheck">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog title="新增" :visible.sync="openadd" width="960px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="p_name">
              <el-input v-model="form.p_name" placeholder="请输入项目名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="施工单位" prop="p_unit" label-width="100px">
              <el-input v-model="form.p_unit" placeholder="请输入施工单位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期" prop="p_time">
              <el-input v-model="form.p_time" placeholder="请输入日期" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安全员姓名" prop="p_inspector" label-width="100px">
              <el-input v-model="form.p_inspector" placeholder="请输入安全员姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="整改内容" prop="p_content">
              <el-input v-model="form.p_content" placeholder="请输入整改内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
<!--            <el-button @click="addtable">添加检查内容表</el-button>-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片上传" prop="p_url"  style="width: 800px;">
              <el-upload
                :limit="3"
                action="#"
                list-type="picture-card"
                :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
                </div>
              </el-upload>
              <!--              <el-input v-model="form.p_url" placeholder="请输入图片地址" readOnly='true'/>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form  >
          <el-row>
            <el-col :span="12">
              <el-form-item label="区域名称" prop="areaName" label-width="80px">
                <el-input v-model="form.sysSafeCheckList.areaName" placeholder="请输入区域名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查内容" prop="checkContents" label-width="80px">
                <el-input v-model="form.sysSafeCheckList.checkContents" placeholder="请输入检查内容" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="有无隐患" prop="hiddenDanger" label-width="80px">
                <el-input v-model="form.sysSafeCheckList.hiddenDanger" placeholder="请输入有无隐患" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注" prop="remarks" label-width="80px">
                <el-input type="textarea" v-model="form.sysSafeCheckList.remarks" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="canceladd">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "safeRecord",
  data(){
    return{
      // 图片上传的弹出框
      dialogVisible:false,
      dialogImageUrl: '',
      disabled: false,
      // 遮罩层
      loading: true,
      // 用户表格数据
      userList: null,
      // 非单个禁用
      // single: true,
      // 是否显示添加弹出层
      openadd: false,
      // 是否显示查看弹出层
      opencheck: false,
      checkForm:{
        p_name: undefined,
        p_unit: undefined,
        p_time: undefined,
        p_inspector: undefined,
        p_content: undefined,
        p_url: '',
        sysSafeCheckList:[
          {
            areaName:"",
            checkContents:'',
            hiddenDanger:null,
            remarks:'',
          }
        ]
      },
      // 表单参数
      form: {
        p_name: undefined,
        p_unit: undefined,
        p_time: undefined,
        p_inspector: undefined,
        p_content: undefined,
        p_url: '',
        sysSafeCheckList:[
          {
            areaName:"",
            checkContents:'',
            hiddenDanger:null,
            remarks:'',
          }
        ]
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        time: undefined,
        deptId: undefined,
      },
      // 表单校验
      rules: {
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
    /** 查询用户列表 */
    getList() {
      this.loading = true
      var tmplist = [
        {
          id:1,
          p_name:"孔雀新城",
          p_unit:"无",
          p_time:"2020-08-07",
          p_inspector:"张三",
        },
        {
          id:2,
          p_name:"孔雀新城",
          p_unit:"无",
          p_time:"2020-01-07",
          p_inspector:"张三",
        },
        {
          id:3,
          p_name:"孔雀新城",
          p_unit:"无",
          p_time:"2020-08-07",
          p_inspector:"张三",
        },
        {
          id:4,
          p_name:"孔雀新城",
          p_unit:"无",
          p_time:"2020-03-09",
          p_inspector:"张三",
        },
        {
          id:5,
          p_name:"孔雀新城",
          p_unit:"无",
          p_time:"2020-09-01",
          p_inspector:"张三",
        },
      ]
      this.userList = tmplist
      this.total = tmplist.length
      this.loading = false
    },
    // 新增按钮事件
    addRecord(){
      this.openadd = true
      // this.reset()
    },
    // 新增按钮的提交
    submitForm(){
      this.openadd = false
    },
    // 查看按钮事件
    handleView(row){
      this.opencheck = true
      console.log("row",row.p_name)
      this.form.p_name = row.p_name
      this.form.p_unit = row.p_unit
      this.form.p_time = row.p_time
      this.form.p_inspector = row.p_inspector
      // this.form.content = row.content
      // this.form.p_url = row.p_url
    },
    // 表单重置
    reset() {
      this.form = {
        p_name: undefined,
        p_unit: undefined,
        p_time: undefined,
        p_inspector: undefined,
        p_content: undefined,
        p_url: undefined,
      };
      this.resetForm("form");
    },
    /** 导出按钮操作 */
    handleExport(){
      const queryParams = this.queryParams
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportUser(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    // 取消按钮
    canceladd() {
      this.openadd = false;
      // this.reset();
    },
    // 取消按钮
    cancelcheck() {
      console.log("quxiao")
      this.opencheck = false;
      // this.reset();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 图片上传用到的方法
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      // this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
  },

}
</script>

<style scoped>
.safeRecord {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem .3rem;
}
.fixColor .el-form-item__label{
  color: white;
}
</style>
