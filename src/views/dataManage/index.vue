<template>
  <div style="margin: 10px; ">
    <el-row>
      <el-col :span="4">
        <div class="dm-aside">
          <div class="border-top-left"></div>
          <div class="dm-title">文件类型</div>
          <div class="type-list">
            <ul>
              <li :class="{active: isActive1}" @click="nowActiveOne()"><i class="el-icon-document type-icon" />文字</li>
              <li :class="{active: isActive2}" @click="nowActiveTwo()"><i class="el-icon-picture-outline type-icon" />图片</li>
              <li :class="{active: isActive3}" @click="nowActiveThree()"><i class="el-icon-video-camera-solid type-icon" />视频</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="dm-main">
          <div class="border-top-right"></div>
          <div style="padding: 0.13rem">
            <el-button type="primary" @click="showUpload = true"><i class="el-icon-upload" /> 上传文件</el-button>
          </div>
          <div class="data_table" style="padding: 0 0.2rem">
            <el-table
              :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              class="file-table"
              stripe
              :header-row-style="{ color: '#409eff' }"
              :row-style="{ color: 'white' }"
            >
              <el-table-column prop="id" label="文件ID" width="100" align="center" />
              <el-table-column prop="name" label="文件名称" align="center" />
              <el-table-column prop="format" label="文件类型" width="100" align="center" />
              <el-table-column prop="remark" label="文件描述" align="center" />
              <el-table-column prop="createBy" label="创建人" width="150" align="center" />
              <el-table-column prop="createTime" label="创建时间" width="150" align="center" />
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="editInfo(scope.$index, scope.row)"><i class="el-icon-edit" />修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="fileTable.length"
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next"
              background
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showUpload" title="上传文件" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="uploadInfo" :rules="rules" ref="uploadInfo" label-width="1.5rem">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="uploadInfo.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="format">
            <el-select v-model="uploadInfo.format" placeholder="请选择文件类型" style="width: 50%; ">
              <el-option label="文字" value="文字" />
              <el-option label="图片" value="图片" />
              <el-option label="视频" value="视频" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="remark">
            <el-input type="textarea" v-model="uploadInfo.remark" style="width: 90%; "></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="createBy">
            <el-input v-model="uploadInfo.createBy" placeholder="请输入上传人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              drag
              action="http://121.36.106.18:38080/system/safe/uploadFile"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">上传</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit" title="修改文件" width="40%">
      <div>
        <el-form :model="currentInfo" :rules="rules" ref="currentInfo" label-width="1.5rem">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="currentInfo.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="format">
            <el-select v-model="currentInfo.format" placeholder="请选择文件类型" style="width: 50%; ">
              <el-option label="文字" value="文字" />
              <el-option label="图片" value="图片" />
              <el-option label="视频" value="视频" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="remark">
            <el-input type="textarea" v-model="currentInfo.remark" style="width: 90%; "></el-input>
          </el-form-item>
          <el-form-item label="创建日期" prop="createTime">
            <el-date-picker v-model="currentInfo.createTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="创建人" prop="createBy">
            <el-input v-model="currentInfo.createBy" placeholder="请输入上传人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEdit('currentInfo')">提交修改</el-button>
            <el-button @click="showEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {changeDoc, findDoc, insertDoc} from "../../api/dataManage";

export default {
  data() {
    return {
      alldoc: {},
      fileTable: [],
      currentPage: 1,
      pageSize: 10,
      showUpload: false,
      uploadInfo: {
        constructionSiteId: 0,
        constructionSiteName: 'string',
        createBy: '',
        createTime: '',
        doc_type: '',
        format: '',
        id: 0,
        name: '',
        params: {},
        remark: '',
        searchValue: '',
        updateBy: '',
        updateTime: '',
        update_time: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        format: [
          { required: true, message: '请选择文件类型', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      showEdit: false,
      currentInfo: {
        constructionSiteId: 0,
        constructionSiteName: 'string',
        createBy: '',
        createTime: '',
        doc_type: '',
        format: '',
        id: 0,
        name: '',
        params: {},
        remark: '',
        searchValue: '',
        updateBy: '',
        updateTime: '',
        update_time: '',
        url: ''
      },
      currentIndex: null,
      isActive1: true,
      isActive2: false,
      isActive3: false,
      constructionSiteId: 1
    }
  },
  mounted() {
    this.$store.dispatch('changeMsg', '资料管理');
    findDoc({
      constructionSiteId: this.constructionSiteId
    }).then(response => {
      this.alldoc = response.data
      this.fileTable = this.alldoc.word
    })
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    submitUpload(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          console.log(this.uploadInfo)
          insertDoc({
            docManagement: this.uploadInfo
          }).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功！'
              })
              this.showEdit = false;
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.$message.error('上传失败')
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editInfo(index, row) {
      this.currentInfo = row;
      this.currentIndex = index;
      this.showEdit = true;
    },
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.currentInfo.updateTime = new Date().toString()
          this.currentInfo.update_time = new Date().toString()
          console.log(this.currentInfo);
          changeDoc({
            docManagement: this.currentInfo
          }).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.$message.error('修改失败！')
        }
      })
    },
    nowActiveOne() {
      this.isActive1 = true
      this.isActive2 = false
      this.isActive3 = false
      this.fileTable = this.alldoc.word
    },
    nowActiveTwo() {
      this.isActive1 = false
      this.isActive2 = true
      this.isActive3 = false
      this.fileTable = this.alldoc.picture
    },
    nowActiveThree() {
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = true
      this.fileTable = this.alldoc.video
    }
  }
}
</script>

<style scoped>
.dm-aside {
  background-color: rgba(0, 36, 78, 0.5);
  height: 83vh;
  margin: 0 5px;
  border-radius: 2px;
}

.dm-main {
  background-color: rgba(0, 36, 78, 0.5);
  height: 83vh;
  margin: 0 5px;
  border-radius: 2px;
}

.dm-title {
  font-size: 0.32rem;
  color: #409eff;
  padding: 0.13rem;
}

.border-top-left {
  height: 10px;
  background-image: url("../../assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}

.border-top-right {
  height: 10px;
  background-image: url("../../assets/border/top-center.png");
  background-size: 100% 100%;
  width: 100%;
}

.file-table {
  font-size: 0.22rem;
}

.block {
  margin: 10px 0;
  text-align: center;
}

.block >>> .el-pagination__total {
  color: #409eff;
}

/*透明化整体*/
.data_table >>> .el-table,
.data_table >>> .el-table__expanded-cell {
  background-color: transparent !important;
}
/*透明化行、单元格*/
.data_table >>> .el-table th,
.data_table >>> .el-table tr,
.data_table >>> .el-table td {
  background-color: transparent !important;
}
/*hover时样式*/
.data_table >>> .el-table tbody tr:hover>td {
  background-color: #367f7f78 !important
}

/*偶数行样式*/
.data_table >>> .el-table__row--striped td {
  background-color: #45797b33 !important
}
/*奇数行样式*/
.data_table >>> .el-table__row:not(.el-table__row--striped) {
  background: #1439391c !important;
}

.type-list {
  font-size: 0.26rem;
  color: white;
  cursor: pointer;
}

.type-list ul {
  list-style: none;
  padding: 0;
}

.type-list li {
  height: 0.7rem;
  line-height: 0.7rem;
}

.type-list li:hover {
  background-color: rgba(64, 158, 255, 0.5);
}

.type-icon {
  padding: 0 0.2rem;
}

.active {
  color: #3FA0C3;
}
</style>
