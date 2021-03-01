<template>
  <div class="cr-main">
    <ul>
      <li>
        <div>
          <el-button type="danger" icon="el-icon-back" @click="goBack">返回</el-button>
          <div style="float: right; ">
            <el-form :model="form" ref="form" label-width="80px" :inline="true">
              <el-form-item label="处理情况">
                <el-select v-model="form.processStatus" placeholder="请选择" clearable>
                  <el-option label="未处理" value="1"></el-option>
                  <el-option label="处理中" value="2"></el-option>
                  <el-option label="已完成" value="3"></el-option>
                  <el-option label="逾期" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="success" icon="el-icon-search" @click="sumbitFilter('form')">搜索</el-button>
                <el-button type="warning" icon="el-icon-refresh-right" @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </li>
      <li>
        <div class="dataTable">
          <el-table
            :data="historyRecord.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            style="font-size: 0.22rem;"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
          >
            <el-table-column prop="id" label="序号" align="center" width="60" />
             <el-table-column prop="fromUser" align="center" label="报告人" :show-overflow-tooltip="true" />
             <el-table-column prop="toUser" align="center" label="整改人" :show-overflow-tooltip="true" />
             <el-table-column prop="className" align="center" label="施工班组" :show-overflow-tooltip="true" />

            <el-table-column prop="context" align="center" label="事件详情" :show-overflow-tooltip="true" />
            <el-table-column prop="checkType" align="center" label="事件类型" :show-overflow-tooltip="true" />
            <el-table-column prop="checkTypeOffspring" align="center" label="详细类型" :show-overflow-tooltip="true" />
            <el-table-column prop="startTime" align="center" label="记录时间" :show-overflow-tooltip="true"/>
            
            
            <el-table-column align="center" label="图片" width="100">
              <template slot-scope="scope">
                <a v-if="scope.row.imageUrl" :href="scope.row.imageUrl" target="_blank" class="imageView">查看图片</a>
                <span v-else style="color: #909399; ">查看图片</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="处理情况">
              <template slot-scope="scope">
                <span v-if="scope.row.processStatus === 1" style="color: #3ad7fa; ">未处理</span>
                <span v-else-if="scope.row.processStatus === 2" style="color: rgb(251,200,79); ">处理中</span>
                <span v-else-if="scope.row.processStatus === 3" style="color: rgb(89,180,157); ">已完成</span>
                <span v-else style="color: rgb(232,85,63); ">逾期</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center"  class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button  type="text" icon="el-icon-view" @click="showDetails(scope.row)" >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </li>
      <li>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="historyRecord.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            background
          />
        </div>
      </li>
    </ul>


  <el-dialog :visible.sync="showUpload" title="详细信息" width="60%">
      <div class="divDialog" style="height: 55vh; overflow-y: scroll;">

        <el-form :model="uploadInfo2"  ref="uploadInfo2" label-width="1.5rem">
          <el-row>
            <el-col :span="12">
              <el-form-item label="发起人:" prop="fromUser">
                 <el-input v-model="uploadInfo2.fromUser"  :readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收人:" prop="toUser">
                 <el-input v-model="uploadInfo2.toUser"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="抄送人:" prop="ccPeople">
                 <el-input v-model="uploadInfo2.ccPeople"  :readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="事件类型:" prop="checkType">
                 <el-input v-model="uploadInfo2.checkType"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="详细类型:" prop="checkTypeOffspring">
                 <el-input v-model="uploadInfo2.checkTypeOffspring"  :readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="记录时间:" prop="startTime">
                 <el-input v-model="uploadInfo2.startTime"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="一级进度:" prop="planName">
                 <el-input v-model="uploadInfo2.planName"  :readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级进度:" prop="sectionName">
                 <el-input v-model="uploadInfo2.sectionName"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="事件详情:" prop="context">
                 <el-input type="textarea" v-model="uploadInfo2.context"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="发起问题照片:" prop="imageUrl">
                 <el-image
                  v-if="uploadInfo2.imageUrl !== null"
                :src="uploadInfo2.imageUrl"
                >
                
              </el-image>
              <span v-else>暂无图片</span>
              </el-form-item>
            </el-col>
            
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="发起问题视频:" prop="videoUrl">
                

                 <video  v-if="uploadInfo2.videoUrl !== null" :src="uploadInfo2.videoUrl" controls></video>
                 <span v-else>暂无视频</span>
              </el-form-item>
            </el-col>
            
          </el-row>

          <el-divider></el-divider>

          <el-row>
            <el-col :span="12">
              <el-form-item label="处理时间:" prop="endTime">
                 <el-input v-model="dealDatail.endTime"  :readonly='true'/>
              </el-form-item>
            </el-col>
           
          </el-row>

           <el-row>
            
            <el-col :span="24">
              <el-form-item label="处理结果:" prop="tiltPercentageOne">
                 <el-input type="textarea" v-model="dealDatail.context"  :readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>
         

          <el-row>
            <el-col :span="24">
              <el-form-item label="处理结果照片:" prop="safetyAndQualityProcessList">
                 <el-image
                 v-if="dealDatail.imageUrl !== null"
                :src="dealDatail.imageUrl"
                >
              </el-image>
              <span v-else>暂无图片</span>
              </el-form-item>
            </el-col>
           
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="处理结果视频:" prop="safetyAndQualityProcessList">
                 <video  v-if="dealDatail.videoUrl !== null" :src="dealDatail.videoUrl" controls></video>
                 <span v-else>暂无视频</span>
              </el-image>
              </el-form-item>
            </el-col>
           
          </el-row>

         

         

        </el-form>
      </div>
    </el-dialog>


  </div>


  
</template>

<script>
import {getCheckInfoBySchedule} from "../../api/qualityControl";
import {getSite} from "../../api/dataManage";

export default {
  name: 'Check Record',
  mounted() {
    this.checkCode = this.$route.query.checkCode;
    // this.checkCode = 1;
    this.constructionSiteId = parseInt(window.localStorage.getItem('siteId'));
    this.getConstructionSiteName(this.constructionSiteId);
  },
  data() {
    return {
      dealDatail : {
        context: '',
        endTime: '',
        imageUrl: null,
        videoUrl: null
      },
      uploadInfo2: {
        ccPeople: '',
        checkType: '',
        checkTypeOffspring: '',
        context: '',
        flag: '',
        fromUser: '',
        handingTime:'',
        imageUrl: '',
        toUser: '',
        processStatus: '',
        planName: '',
        sectionName: ''
      },
      showUpload: false,
      constructionSiteId: 1,
      constructionSiteName: '',
      checkCode: null,
      historyRecord: [],
      currentPage: 1,
      pageSize: 10,
      form: {
        processStatus: null
      }
    }
  },
  methods: {

    showDetails(row) {
      console.log("查看详情", row)
      this.showUpload = true
      if(row.safetyAndQualityProcessList.length !== 0) {
        this.dealDatail = row.safetyAndQualityProcessList[0]
      }
      this.uploadInfo2 = row

      
    },
    loadingTable() {
      getCheckInfoBySchedule({
        sitename: this.constructionSiteName
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    refreshTable() {
      getCheckInfoBySchedule({
        sitename: this.constructionSiteName
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    goBack() {
      this.$router.go(-1);
    },
    sumbitFilter(formName) {
      getCheckInfoBySchedule({
        sitename: this.constructionSiteName,
        status: this.form.processStatus
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.form.processStatus = null;
      this.refreshTable();
    },
    getConstructionSiteName(id) {
      getSite({
        siteId: id
      }).then(response => {
        if(response.data.code === 200) {
          this.constructionSiteName = response.data.data.deptName
          this.loadingTable();
        }
      })
    },
  }
}
</script>

<style scoped>
.cr-main {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cr-main ul {
  width: 85%;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.dataTable {
  width: calc(100% + 20px);
  height: 62vh;
  overflow-y: scroll;
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

.block {
  margin: 10px 0;
  text-align: center;
}

.block >>> .el-pagination__total {
  color: #409eff;
}

/deep/ .el-form-item__label{
  color: white;
}

.imageView {
  color: #409eff;
  text-decoration: none;
}

.imageView:hover {
  color: #79bbff;
}
.divDialog >>> .el-form-item__label{
  color: black;
}
</style>
