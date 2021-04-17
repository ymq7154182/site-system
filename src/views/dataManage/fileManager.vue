<template>
  <div style="margin: 10px; ">
    <el-row>
      <el-col :span="4">
        <div class="dm-aside">
          <div class="border-top-left"></div>
          <div class="dm-title">文件位置</div>
          <div class="type-list">
              <el-tree :data="treeData" :props="defaultProps" default-expand-all  @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="dm-main">
          <div class="border-top-right"></div>
          <div style="padding: 0.13rem">
            <el-button type="primary" @click="uploadFile"> 上传文件</el-button>
            <el-button type="primary" @click="createFile"> 新建文件夹</el-button>
            <div style="float:right;margin-right:20px;">
                <el-input placeholder="请输入要查找的文件" v-model="searchFile" style="width:300px;margin-right:10px;"></el-input><el-button type="primary" @click="searchFileByName">搜索</el-button><el-button type="primary" style="margi-left:5px;" @click="resetAll">重置</el-button>
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
              <el-table-column label="文件名称" align="center" prop="name">
              </el-table-column>
              <!-- <el-table-column prop="userName" label="更新者" width="200" align="center" /> -->
              <el-table-column label="首页轮播" align="center"  width="150" >
                <template slot-scope="scope">
                    <!-- <el-switch v-model="scope.row.statuss" active-value="1" inactive-value="0" disabled></el-switch> -->
                    <el-tag type="danger" v-if="scope.row.statuss === '1'">是</el-tag>
                    <el-tag type="success" v-else>否</el-tag>
                </template> 
                
              </el-table-column>

              <el-table-column prop="updateTime" label="更新时间" align="center" />
              <el-table-column label="操作" align="center"  fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini"  @click="editInfo(scope.$index, scope.row)" >编辑</el-button>
                  <el-button type="info" size="mini"  @click="delInfo(scope.$index, scope.row)" >删除</el-button>
                  <el-button type="success" size="mini"  @click="downloadFile(scope.row.lookUrl)" >下载</el-button>
                  <el-button type="danger" size="mini"  @click="moveFile(scope.$index, scope.row)" >移动</el-button>
                  <el-button type="warning" size="mini"  @click="downloadFile(scope.row.lookUrl)" >分享</el-button>

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
    <el-dialog :visible.sync="showUpload" title="上传文件" width="40%" @close="closeDialog">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="uploadInfo" :rules="rules" ref="uploadInfo" label-width="1.5rem">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="uploadInfo.name" style="width: 50%" ></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="urlId">
            <treeselect v-model="uploadInfo.urlId" :options="treeData2" placeholder="请选择" noOptionsText="没有文件夹,请先创建文件夹" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 350px" @select="getSelectList" />
          </el-form-item>
          <el-form-item label="进度绑定" prop="taskId">
              <treeselect v-model="uploadInfo.taskId" :options="progressTreeData" placeholder="请选择进度" noOptionsText="没有进度,请先去进度管理中创建进度" :clearable="true" :show-count="true" style="width: 350px" @select="getSelectTask" />
          </el-form-item>
          <el-form-item label="轮播展示" prop="statuss">
            <el-switch
              v-model="uploadInfo.statuss"
              active-value="1"
              inactive-value="0"
              
              >
            </el-switch>
          </el-form-item>
          <el-form-item label="顺序" prop="orders" v-if="uploadInfo.statuss === '1'">
            <el-input v-model="uploadInfo.orders" ></el-input>
          </el-form-item>
          <el-form-item label="文件描述" prop="info">
            <el-input type="textarea" v-model="uploadInfo.info" style="width: 90%; "></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :file-list="upLoadFileList"
              :on-success="handleFileSuccess"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
            </el-upload>
            
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">上传</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showEdit" title="修改" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="currentInfo" :rules="rules" ref="currentInfo" label-width="1.5rem">
          <el-form-item label="文件名称" prop="name">
            <el-input v-model="currentInfo.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="urlId" >
            <treeselect v-model="currentInfo.urlId" :options="treeData2" placeholder="请选择" noOptionsText="没有文件夹,请先创建文件夹"  :clearable="true"  :show-count="true" :disable-branch-nodes="true"  style="width: 350px" />
          </el-form-item>
           <el-form-item label="进度绑定" prop="taskId">
              <treeselect v-model="currentInfo.taskId" :options="progressTreeData" placeholder="请选择进度" noOptionsText="没有进度,请先去进度管理中创建进度"  :clearable="true" :show-count="true" style="width: 350px" @select="getSelectTask" />
          </el-form-item>
          <el-form-item label="首页轮播" prop="statuss">
            <el-switch
              v-model="currentInfo.statuss"
              :active-value="'1'"
              :inactive-value="'0'"
              >
            </el-switch>
          </el-form-item>
          <el-form-item label="顺序" prop="orders" v-if="currentInfo.statuss === '1' ">
            <el-input v-model="currentInfo.orders"></el-input>
          </el-form-item>
          <el-form-item label="文件描述" prop="info">
            <el-input type="textarea" v-model="currentInfo.info" style="width: 90%; " ></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:36080/system/safe/uploadFile"
              :limit="1"
              :file-list="upLoadFileList"
              :on-success="handleFileSuccess1"
              style="width: 90%; "
            >
              <el-button slot="trigger" size="small" type="primary" icon="el-icon-plus">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片" prop="lookUrl" v-if="currentInfo.format === '图片'">
            <el-image  :src="currentInfo.lookUrl"></el-image>
          </el-form-item>
          <el-form-item label="视频" prop="lookUrl" v-if="currentInfo.format === '视频'">
             <video  :src="currentInfo.lookUrl" controls></video>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEdit('currentInfo')">修改</el-button>
            <el-button @click="showEdit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showMove" title="移动文件" width="40%" >
      <div>
        <el-form :model="moveInfo"  ref="moveInfo" label-width="1.5rem">
           
            <el-form-item label="选择文件夹" prop="urlId" style="margin-bottom:10px;">
              <treeselect v-model="moveInfo.urlId" :options="treeData3" placeholder="请选择" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 350px" @select="getSelectList2" />
            </el-form-item>
            <el-tag type="success">当前选择移动的文件为：{{currentFolder}}</el-tag>
          <el-form-item  style="margin-top:10px;">
            <el-button type="primary" @click="submitMove('moveInfo')">移动</el-button>
            <el-button @click="showMove = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showFolder" title="新增文件夹" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="folderInfo" :rules="folderRles" ref="folderInfo" label-width="1.5rem">
          <el-form-item label="文件夹名称" prop="folderName">
            <el-input v-model="folderInfo.folderName" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="urlId">
            <treeselect v-model="folderInfo.urlId" :options="treeData4" placeholder="请选择" :clearable="true" :show-count="true"   style="width: 350px" @select="getSelectList3" />
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
import {changeDoc, docType, findDoc, getSite, insertDoc, toPdfFile, listFolder, getFolderInfo, addFolder, getFolderContent, delFile } from "../../api/dataManage";
import { scheduleInfo, treeTask } from '@/api/progress'

export default {
  components: { Treeselect },
  data() {
    return {
      upLoadFileList: [],
      selectTaskId: undefined,
        progressTreeData: [],
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
        constructionSiteId: 0,
        constructionSiteName: '',
        doc_type: '其他',
        format: undefined,
        info: '',
        name: '',
        url: '',
        lookUrl: '',
        orders:'',
        taskId: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
        format: [
          { required: true, message: '请选择文件类型', trigger: 'change' }
        ],
        order: [
           { required: true, message: '请输入轮播顺序', trigger: 'change' } 
        ],
        urlId: [
          { required: true, message: '请选择文件路径', trigger: 'change' }
        ]
      },
      folderRles: {
        folderName: [
          { required: true, message: '请输入文件名称', trigger: 'blur' }
        ],
       
        urlId: [
          { required: true, message: '请选择文件路径', trigger: 'change' }
        ]
      },
      moveRule: {
        urlId: [
          { required: true, message: '请选择文件路径', trigger: 'change' }
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
      showMove: false,
      showFolder: false,
      currentInfo: {
        constructionSiteId: 0,
        constructionSiteName: '',
        doc_type: '',
        format: '',
        info: '',
        name: '',
        id: '',
        url: '',
        lookUrl: '',
        taskId: undefined,
        urlId: undefined,
        statuss: '',
        orders: ''
      },
      moveInfo: {
        constructionSiteId: 0,
        constructionSiteName: '',
        id: ''
      },
      folderInfo: {
        constructionSiteId: 0,
        constructionSiteName: '',
        id: ''
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
    this.$store.dispatch('changeMsg', '资料管理');
    this.getListFolder()
    this.constructionSiteId = parseInt(window.localStorage.getItem('siteId'));
    this.getConstructionSiteName(this.constructionSiteId);
    this.refreshTable();
    this.getTreeTask()
    docType().then(response => {
      for(var i=0;i<response.data.rows.length;i++) {
        this.docTypeList.push(response.data.rows[i].name)
      }
    })
  },
  methods: {

    closeDialog() {
      this.resetForm('uploadInfo')
    },

    getTreeTask() {
      var id = localStorage.getItem('siteId')
      treeTask(id).then((res) => {
        console.log("123", res.data)
        this.progressTreeData = res.data.data
      })
    },

    getSelectTask(node, instanceId) {
      console.log("instanceId", instanceId)
      console.log("node", node)
      this.selectTaskId = node.id
      
  
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    uploadFile() {
      // if()
      this.uploadInfo.constructionSiteId = this.constructionSiteId;
      this.uploadInfo.constructionSiteName = this.constructionSiteName;
      this.showUpload = true
      // this.getTreeTask()
    },
    submitUpload(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("提交的信息", this.uploadInfo)
        this.uploadInfo.userName = localStorage.getItem('userName')
        this.uploadInfo.taskId = this.selectTaskId
      
          insertDoc(this.uploadInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功！'
              })
              this.refreshTable();
              this.showUpload = false;
              this.resetForm('uploadInfo')
            } else {
              this.$message.error(response.data.msg)
            }
          })
        
      });
    },

    submitFolder(formName) {
      console.log("新建的信息1", this.folderInfo)
      this.$refs[formName].validate((valid) => {
        console.log("新建的信息2", this.folderInfo)
        console.log("valid", valid)
        if(valid) {
          addFolder(this.folderInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '上传成功！'
              })
              this.refreshTable();
              this.getListFolder()
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
      this.uploadInfo = {
        format: undefined,
        info: '',
        name: '',
        lookUrl: '',
        orders:'',
        taskId: undefined
      }
      this.upLoadFileList = []
    },
    editInfo(index, row) {
      
      console.log("ROW", row)
      this.currentInfo.constructionSiteId = this.constructionSiteId;
      this.currentInfo.constructionSiteName = this.constructionSiteName;
     
      this.currentInfo.statuss = row.statuss;
      this.currentInfo.orders = row.orders;
      this.currentInfo.format = row.format;
      this.currentInfo.info = row.info;
      this.currentInfo.name = row.name;
      this.currentInfo.lookUrl = row.lookUrl;
      this.currentInfo.id = row.id;
      this.currentInfo.urlId = row.urlId
      this.currentInfo.taskId = row.taskId
      this.fileList = [{
        name: row.name,
        url: row.url
      }]
      // this.currentIndex = index;
      this.showEdit = true;
    },
    delInfo(index, row) {
      
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          
          delFile(row.id).then((res) => {
            console.log("删除文件",res.data.code)
            if(res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.getListFolder()
            } else {
              this.$message({
                type: 'success',
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




      // delFile(row.id).then((res) => {
      //   console.log("删除文件",res.data.code)
      //   if(res.data.code === 200) {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功！'
      //     })
      //     this.getListFolder()
      //   } else {
      //     this.$message({
      //       type: 'success',
      //       message: '删除失败！'
      //     })
      //   }
      // })
    },
    moveFile(index, row) {
      console.log("MoveInfo", row)
      this.moveInfo.constructionSiteId = this.constructionSiteId;
      this.moveInfo.constructionSiteName = this.constructionSiteName;
      this.moveInfo.id = row.id;
      this.showMove = true;
    },
    editClose() {
      this.fileList = [];
    },
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {

        if(valid) {
          changeDoc(this.currentInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
              this.refreshTable();
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

    submitMove(formName) {
      console.log("提交的MoveInfo是",this.moveInfo)
      if(this.moveInfo.urlId === null || this.moveInfo.urlId === undefined || this.moveInfo.urlId === '') {
        this.$message.error('请先选择文件夹')
        return;
      } else {
        changeDoc(this.moveInfo).then(response => {
            if(response.data.code === 200) {
              this.$message({
                type: 'success',
                message: '移动成功！'
              })
              this.refreshTable();
              this.showMove = false;
            } else {
              this.$message.error(response.data.msg)
            }
          })
      }
      
    },
    openUrl(url) {
      window.open(url);
    },
    handleFileSuccess(response, file, fileList) {
      
      this.uploadInfo.lookUrl = response.data
      if(response.msg.includes('文件')) {
        this.uploadInfo.format = '文字'
      } else if(response.msg.includes('图片')) {
        this.uploadInfo.format = '图片'
      } else {
        this.uploadInfo.format = '视频'
      }
      this.uploadInfo.format
    },
    handleFileSuccess1(response, file, fileList) {
      this.currentInfo.lookUrl = response.data
    },
   
    refreshTable() {
      this.getFolderList(this.currentNodeId)
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
    downloadFile(url) {
      window.open(url);
    },
    
    getListFolder() {
        var deptId = localStorage.getItem('siteId')
        listFolder(deptId).then((res) => {
            console.log("Folder", res.data.data)
            this.treeData = res.data.data
            this.treeData2 = res.data.data
            this.treeData3 = res.data.data
            this.treeData4 = res.data.data
            // console.log("初始ID", this.treeData[0].id)
            var id = this.treeData[0].id
            this.currentNodeId = id
            this.getFolderList(id)
        })
    },
    searchFileByName() {
      var params = {
        fileName: this.searchFile,
        siteId: localStorage.getItem('siteId')
      }
      getFolderContent(params).then((res) => {
         this.fileTable = res.data.data
      })
    },
    resetAll() {
      this.searchFile = '',
      this.getListFolder()
    },
    
    createFile() {
      this.folderInfo.constructionSiteId = this.constructionSiteId;
      this.folderInfo.constructionSiteName = this.constructionSiteName;
      this.showFolder = true
    },
    handleNodeClick(data) {
        // console.log(data);
        this.currentName = data.label
        this.currentNodeId = data.id
        this.getFolderList(data.id)
    },
    handleNodeClick2() {},
    getFolderList(id) {
        getFolderInfo(this.constructionSiteId, parseInt(id)).then((res) => {
            // console.log("SSS",res.data.data)
            if(res)
            this.fileTable = res.data.data
        })
    },
    getSelectList(node, instanceId) {
      // console.log("Index", index)
      //console.log("Item", node)
      this.uploadInfo.urlId = node.id
      this.fileType = node.label
     
    },
    getSelectList2(node, instanceId) {
      console.log("MoveNode", node)
      this.currentFolder = node.label
      this.moveInfo.urlId = node.id
    },
    getSelectList3(node, instanceId) {
      console.log("FolderNode", node)
      this.folderInfo.folderParentId = node.id
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
    background-color: orange !important;
    
  }
  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;color:orange;
  }
  .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: orange;
    color:green;
  }


  .el-tree >>> .el-tree-node:focus>.el-tree-node__content{
      background-color: rgb(240, 107, 107);
      color: white;
    }



.type-icon {
  padding: 0 0.2rem;
}

.active {
  color: #3FA0C3;
}
</style>
