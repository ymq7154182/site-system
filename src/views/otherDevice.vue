<template>
  <div style="margin: 10px; ">
    <el-row>
      <el-col :span="4">
        <div class="dm-aside">
          <div class="border-top-left"></div>
          <div class="dm-title">设备管理</div>
          <div class="type-list">
              <el-tree :data="treeData" :props="defaultProps" default-expand-all  @node-click="handleNodeClick"></el-tree>
            <!-- <ul>
              <li :class="{active: isActive1}" @click="nowActiveOne()"><i class="el-icon-document type-icon" />文档</li>
              <li :class="{active: isActive2}" @click="nowActiveTwo()"><i class="el-icon-picture-outline type-icon" />图片</li>
              <li :class="{active: isActive3}" @click="nowActiveThree()"><i class="el-icon-video-camera-solid type-icon" />视频</li>
            </ul> -->
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="dm-main">
          <div class="border-top-right"></div>
          <div style="padding: 0.13rem">
            <el-button type="primary" @click="uploadFile"> 新增设备</el-button>
            <el-button type="primary" @click="createFile"> 新增设备种类</el-button>
            <div style="float:right;margin-right:20px;">
                <el-input placeholder="请输入要查找的文件" v-model="searchFile" style="width:300px;margin-right:10px;"></el-input><el-button type="primary" @click="searchFileByName" >搜索</el-button><el-button type="primary" style="margin-left:5px;" @click="resetAll" >重置</el-button>
            </div>
          </div>
          <div style="margin:10px;margin-left:20px;">
              <span style="color:white; font-size:20px;">{{currentName}}</span>
          </div>
          <div class="data_table">
            <el-table
              :data="fileTable"
              class="file-table"
              stripe
              :header-row-style="{ color: '#409eff' }"
              :row-style="{ color: 'white' }"
              :default-sort = "{prop: 'id', order: 'ascending'}"
            >

              
              <el-table-column label="序号" width="80" type="index" align="center"/>
              <el-table-column prop="name" label="名称" width="100" align="center" />
              <el-table-column prop="number" label="编号" width="150" align="center" />
              <el-table-column prop="propertyUnit" label="产权单位"  align="center" />
              <el-table-column prop="phone" label="负责人/电话" width="150" align="center" />
              <el-table-column label="状态" align="center"  width="100" >
                <template slot-scope="scope">
                    <!-- <el-switch v-model="scope.row.flag" :active-value="1" :inactive-value="0" disabled></el-switch> -->
                    <el-tag type="success" v-if="scope.row.flag === 1">在线</el-tag>
                    <el-tag type="danger" v-else>离线</el-tag>
                </template> 
              </el-table-column>

              <el-table-column prop="entryTime" label="进场时间" align="center" />
              <el-table-column label="操作" align="center"  fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini"  @click="editInfo(scope.$index, scope.row)" >修改</el-button>
                  <el-button type="primary" size="mini"  @click="delInfo(scope.$index, scope.row)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="tableLength"
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next"
              background
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showUpload" title="新增设备" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="uploadInfo" :rules="rules" ref="uploadInfo" label-width="1.5rem">
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="uploadInfo.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="设备类别" prop="catalogId">
            <treeselect v-model="uploadInfo.catalogId" :options="treeData2" placeholder="请选择" :clearable="true" :show-count="true"   style="width: 350px" @select="getSelectList" />
          </el-form-item>
          <el-form-item label="设备编号" prop="number">
            <el-input v-model="uploadInfo.number" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="产权单位" prop="propertyUnit">
            <el-input v-model="uploadInfo.propertyUnit" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="负责人" prop="leaderName">
            <el-input v-model="uploadInfo.leaderName" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="联系电话" prop="phone">
            <el-input v-model="uploadInfo.phone" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="进场时间" prop="entryTime">
            <el-date-picker v-model="uploadInfo.entryTime" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="状态" prop="remark">
            <el-switch
              v-model="uploadInfo.flag"
              :active-value="1"
              :inactive-value="0"
              >
            </el-switch>
          </el-form-item>
         <el-form-item label="设备描述" prop="describes">
            <el-input type="textarea" v-model="uploadInfo.describes" style="width: 90%; "></el-input>
          </el-form-item>
           <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="uploadInfo.remarks" style="width: 90%; "></el-input>
          </el-form-item>
          
          <el-form-item label="设备照片">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :on-success="handleSuccess"
              accept=".jpg,.png"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="设备照片">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :on-success="handleSuccess2"
              accept=".jpg,.png"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showEdit" title="修改设备" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="currentInfo" :rules="rules" ref="currentInfo" label-width="1.5rem">
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="currentInfo.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="设备类别" prop="catalogId">
            <treeselect v-model="currentInfo.catalogId" :options="treeData3" placeholder="请选择" :clearable="true" :show-count="true"   style="width: 350px" @select="getSelectList2" />
          </el-form-item>
          <el-form-item label="设备编号" prop="number">
            <el-input v-model="currentInfo.number" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="产权单位" prop="propertyUnit">
            <el-input v-model="currentInfo.propertyUnit" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="负责人" prop="leaderName">
            <el-input v-model="currentInfo.leaderName" style="width: 50%"></el-input>
          </el-form-item>
           <el-form-item label="联系电话" prop="phone">
            <el-input v-model="currentInfo.phone" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="进场时间" prop="entryTime">
            <el-date-picker v-model="currentInfo.entryTime" align="right" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="状态" prop="remark">
            <el-switch
              v-model="currentInfo.flag"
              :active-value="1"
              :inactive-value="0"
              >
            </el-switch>
          </el-form-item>
         <el-form-item label="设备描述" prop="describes">
            <el-input type="textarea" v-model="currentInfo.describes" style="width: 90%; "></el-input>
          </el-form-item>
           <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="currentInfo.remarks" style="width: 90%; "></el-input>
          </el-form-item>
          
          <el-form-item label="设备照片">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :on-success="handleSuccess3"
              accept=".jpg,.png"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="设备照片">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :on-success="handleSuccess4"
              accept=".jpg,.png"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">支持上传jpg/png格式图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEdit('currentInfo')">提交</el-button>
            <el-button @click="showEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    
    <el-dialog :visible.sync="showFolder" title="新增设备种类" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="folderInfo" :rules="folderRles" ref="folderInfo" label-width="1.5rem">
          <el-form-item label="设备类型名称" prop="label">
            <el-input v-model="folderInfo.label" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="上级类型" prop="parentId">
            <treeselect v-model="folderInfo.parentId" :options="treeData4" placeholder="请选择(不选默认创建新的设备种类)" noOptionsText="没有上级类型,请直接在设备类型输入名称创建" :clearable="true" :show-count="true"   style="width: 350px" @select="getSelectList3" />
          </el-form-item>
          <el-form-item label="显示排序" prop="sort">
            <el-input v-model="folderInfo.sort" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFolder('folderInfo')">新建</el-button>
            <el-button @click="resetForm('folderInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {changeDoc, docType, findDoc, getSite, insertDoc, toPdfFile, getFolderInfo, addFolder} from "../api/dataManage";
import { getTree, getAllDevice, devManage, devPutManage, devFolder } from '../api/deviceManage';
export default {
  components: { Treeselect },
  data() {
    return {
        tableLength: 0,
        currentFolder: undefined,
        disbaled: true,
        fileType: '',
        currentNodeId: '',
        currentName: '',
        treeData:[],
        treeData2:[],
        treeData3:[],
        treeData4:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        searchFile: '',
      alldoc: {},
      fileTable: [],
      currentPage: 1,
      pageSize: 7,
      showUpload: false,
      uploadInfo: {
        siteId: undefined,
        constructionSiteName: '',
        describes: '',
        entryTime: '',
        flag: undefined,
        leaderName: '',
        name: '',
        number: '',
        phone: '',
        photo:'',
        propertyUnit: '',
        qualification: '',
        remarks: '',

      },
      currentInfo: {
        id: undefined,
        siteId: undefined,
        constructionSiteName: '',
        describes: '',
        entryTime: '',
        flag: undefined,
        leaderName: '',
        name: '',
        number: '',
        phone: '',
        photo:'',
        propertyUnit: '',
        qualification: '',
        remarks: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        flag: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        catalogId: [
           { required: true, message: '请选择设备类型', trigger: 'change' } 
        ],
        leaderName: [
          { required: true, message: '请填写负责人姓名', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请填写负责人电话', trigger: 'change' }
        ],
        number: [
          { required: true, message: '请填写编号', trigger: 'change' }
        ]
        
      },
      folderRles: {
        label: [
          { required: true, message: '请输入设备类型名称', trigger: 'blur' }
        ],
        // parentId: [
        //   { required: true, message: '请选择类型', trigger: 'blur' }
        // ],
        sort: [
          { required: true, message: '请选择排序', trigger: 'blur' }
        ],

      },
      moveRule: {
        urlId: [
          { required: true, message: '请选择文件路径', trigger: 'change' }
        ]
      },
      
      showEdit: false,
      showMove: false,
      showFolder: false,
      
      moveInfo: {
        constructionSiteId: 0,
        constructionSiteName: '',
        id: ''
      },
      folderInfo: {
        siteId: 0,
        name: '',
        sort: '',
        parentId: undefined
      },
      currentIndex: null,
      isActive1: true,
      isActive2: false,
      isActive3: false,
      constructionSiteId: 1,
      constructionSiteName: '石家庄宝能中心项目二标段',
      docTypeList: [],
      fileList: []
    }
  },
  mounted() {
    
    //this.getListFolder()
    var data = {
        siteId: localStorage.getItem('siteId')
    }
    this.getTreeList()
    this.getDeviceList(data)
    this.constructionSiteId = parseInt(window.localStorage.getItem('siteId'));
    this.getConstructionSiteName(this.constructionSiteId);
    
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    uploadFile() {
      // if()
      this.uploadInfo.siteId = this.constructionSiteId;
      this.showUpload = true
    },
    submitUpload(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("提交的信息", this.uploadInfo)
        if(!valid) {
          devManage(this.uploadInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功！'
              })

              var data = {
                  siteId: localStorage.getItem('siteId')
              }
              this.getDeviceList(data)
              this.showUpload = false;
              this.resetForm('uploadInfo')
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

    submitFolder(formName) {
      console.log("新建的信息1", this.folderInfo)
      if(this.folderInfo.parentId === undefined) {
        this.folderInfo.parentId = 0
      }
      this.$refs[formName].validate((valid) => {
        console.log("新建的信息2", this.folderInfo)
        console.log("valid", valid)
        if(valid) {
          devFolder(this.folderInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功！'
              })
              
              this.getTreeList()
              this.showFolder = false;
              this.resetForm('folderInfo')
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.$message.error('新建失败')
          return false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.uploadInfo.info = ''
      this.uploadInfo.phone = ''
      this.uploadInfo.catalogId = undefined
    },
    editInfo(index, row) {
      console.log("ROW", row)
      this.currentInfo.siteId = this.constructionSiteId;
    
      this.currentInfo.flag = row.flag;
      this.currentInfo.catalogId = row.catalogId;
      this.currentInfo.describes = row.describes;
      this.currentInfo.entryTime = row.entryTime;
      this.currentInfo.name = row.name;
      this.currentInfo.leaderName = row.leaderName;
      this.currentInfo.id = row.id;
      this.currentInfo.number = row.number

      this.currentInfo.phone = row.phone;
      this.currentInfo.photo = row.photo;
      this.currentInfo.propertyUnit = row.propertyUnit;
      this.currentInfo.qualification = row.qualification;
      this.currentInfo.remarks = row.remarks;
  
      this.showEdit = true;
    },
    
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
          console.log("修改信息如下", this.currentInfo)
        if(valid) {
          devPutManage(this.currentInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              var data = {
                  siteId: localStorage.getItem('siteId')
              }
              this.getDeviceList(data)
              this.resetForm('currentInfo')
              this.showEdit = false;
              
            } else {
              this.$message.error(response.data.msg)
            }
          })
        } else {
          this.$message.error('修改失败！')
        }
      })
    },

    
    handleSuccess(response, file, fileList) {
      this.uploadInfo.photo = response.data
      
    },
    handleSuccess2(response, file, fileList) {
      this.uploadInfo.qualification = response.data
    },
    handleSuccess3(response, file, fileList) {
      this.currentInfo.photo = response.data
      
    },
    handleSuccess4(response, file, fileList) {
      this.currentInfo.qualification = response.data
    },
    
    
    getConstructionSiteName(id) {
      getSite({
        siteId: id
      }).then(response => {
        if(response.data.code === 200) {
          this.constructionSiteName = response.data.data.deptName
        }
      })
    },
    
    getTreeList() {
        var deptId = localStorage.getItem('siteId')
        getTree(deptId).then((res) => {
            this.treeData = res.data.data
            this.treeData2 = res.data.data
            this.treeData3 = res.data.data
            this.treeData4 = res.data.data
        })
    },
    
    resetAll() {
      this.searchFile = ''
      var data = {
        siteId: localStorage.getItem('siteId')
        
      }
      getAllDevice(data).then((res) => {
            this.fileTable = res.data.rows
            this.tableLength = res.data.total
        })
    },

    searchFileByName() {
      var data = {
        siteId: localStorage.getItem('siteId'),
        name: this.searchFile
      }
      getAllDevice(data).then((res) => {
            this.fileTable = res.data.rows
            this.tableLength = res.data.total
        })
    },
    
    createFile() {
      this.folderInfo.siteId = this.constructionSiteId;
      
      this.showFolder = true
    },
    handleNodeClick(data) {
        console.log("ceshiceshiceshi",data);
        this.currentName = data.label
        this.currentNodeId = data.id
        var data = {
            catalogId: this.currentNodeId
        }
        this.getDeviceList(data)
    },
    handleNodeClick2() {},
    // getFolderList(id) {
    //     getFolderInfo(this.constructionSiteId, parseInt(id)).then((res) => {
    //         // console.log("SSS",res.data.data)
    //         if(res)
    //         this.fileTable = res.data.data
    //     })
    // },
    getDeviceList(data) {
        getAllDevice(data).then((res) => {
            console.log("ASASASASA", res.data.rows)
            this.fileTable = res.data.rows
            this.tableLength = res.data.total
        })
    },
    getSelectList(node, instanceId) {
      // console.log("Index", index)
      //console.log("Item", node)
      this.uploadInfo.catalogId = node.id
      
    },
    getSelectList2(node, instanceId) {
      console.log("MoveNode", node)
      this.currentFolder = node.label
      this.moveInfo.urlId = node.id
    },
    getSelectList3(node, instanceId) {
      console.log("FolderNode", node)
      this.folderInfo.parentId = node.id
    },
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
  width: 100%;
  margin: 0 5px;
  border-radius: 2px;
  overflow-x: hidden;
}

.dm-title {
  font-size: 0.32rem;
  color: #409eff;
  padding: 0.13rem;
}

.border-top-left {
  height: 10px;
  background-image: url("../assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}

.border-top-right {
  height: 10px;
  background-image: url("../assets/border/top-center.png");
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

.data_table {
  height: 80%;
  overflow-y: scroll;
  width: 100%;
  padding: 0 0.2rem;
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
  
  cursor: pointer;
}
.el-tree {
    position: relative;
    cursor: default;
    background: transparent;
    color: #a1bbee;
}
.el-tree >>> .el-tree-node__children >>> .is-current {
    background: red !important;
}
.el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: #66b1ff87 !important;
    
  }
  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;color:orange;
  }
  .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
    color:green;
  }



.type-icon {
  padding: 0 0.2rem;
}

.active {
  color: #3FA0C3;
}
</style>
