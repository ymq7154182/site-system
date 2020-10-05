<template>
  <div style="margin: 10px; ">
    <el-row>
      <el-col :span="4">
        <div class="dm-aside">
          <div class="border-top-left"></div>
          <div class="dm-title">文件类型</div>
          <div class="type-list">
            <ul>
              <li :class="{active: isActive1}" @click="nowActiveOne()"><i class="el-icon-document type-icon" />文件</li>
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
              <el-table-column prop="name" label="文件名称" align="center" />
              <el-table-column prop="type" label="文件类型" width="100" align="center" />
              <el-table-column prop="description" label="文件描述" />
              <el-table-column prop="uploader" label="上传人" width="150" align="center" />
              <el-table-column prop="uploadTime" label="上传时间" width="150" align="center" />
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
          <el-form-item label="文件类型" prop="type">
            <el-select v-model="uploadInfo.type" placeholder="请选择文件类型" style="width: 50%; ">
              <el-option label="文件" value="文件" />
              <el-option label="图片" value="图片" />
              <el-option label="视频" value="视频" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="description">
            <el-input type="textarea" v-model="uploadInfo.description" style="width: 90%; "></el-input>
          </el-form-item>
          <el-form-item label="上传日期" prop="uploadTime">
            <el-date-picker v-model="uploadInfo.uploadTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上传人" prop="uploader">
            <el-input v-model="uploadInfo.uploader" placeholder="请输入上传人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              drag
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
          <el-form-item label="文件类型" prop="type">
            <el-select v-model="currentInfo.type" placeholder="请选择文件类型" style="width: 50%; ">
              <el-option label="文件" value="文件" />
              <el-option label="图片" value="图片" />
              <el-option label="视频" value="视频" />
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="description">
            <el-input type="textarea" v-model="currentInfo.description" style="width: 90%; "></el-input>
          </el-form-item>
          <el-form-item label="上传日期" prop="uploadTime">
            <el-date-picker v-model="currentInfo.uploadTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上传人" prop="uploader">
            <el-input v-model="currentInfo.uploader" placeholder="请输入上传人" style="width: 50%; "></el-input>
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
export default {
  data() {
    return {
      fileTable: [
        {
          name: '工地合同文件',
          type: '文件',
          description: '签署的合同文件',
          uploader: '史杨',
          uploadTime: '2020-01-01'
        },
        {
          name: '工地图片文件',
          type: '图片',
          description: '拍摄的图片文件',
          uploader: '张珊',
          uploadTime: '2020-01-02'
        },
        {
          name: '工地视频文件',
          type: '视频',
          description: '拍摄的视频文件',
          uploader: '史杨',
          uploadTime: '2020-01-03'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      showUpload: false,
      uploadInfo: {
        name: '',
        type: '',
        description: '',
        uploadTime: '',
        uploader: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文件类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入文件描述', trigger: 'blur' }
        ],
        uploadTime: [
          { required: true, message: '请选择上传日期', trigger: 'change' }
        ],
        uploader: [
          { required: true, message: '请输入文件描述', trigger: 'blur' }
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
        name: '',
        type: '',
        description: '',
        uploader: '',
        uploadTime: ''
      },
      currentIndex: null,
      isActive1: true,
      isActive2: false,
      isActive3: false
    }
  },
  mounted() {
    this.$store.dispatch('changeMsg', '资料管理')
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    submitUpload(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$message({
            type: 'success',
            message: '上传成功'
          });
          this.showEdit = false;
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
          this.fileTable[this.currentIndex] = this.currentInfo;
          this.$message({
            type: 'success',
            message: '修改成功！'
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
    },
    nowActiveTwo() {
      this.isActive1 = false
      this.isActive2 = true
      this.isActive3 = false
    },
    nowActiveThree() {
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = true
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
