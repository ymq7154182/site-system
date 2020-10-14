<template>
  <div style="margin: 10px;padding-left: 0.3rem;padding-right: 0.3rem ">
    <div class="dm-main">
      <div class="border-top-right"></div>
      <div style="padding: 0.13rem;position: relative">
        <el-button type="success" @click="gotoback" size="mini"><i class="el-icon-d-arrow-left"></i>返回</el-button>
        <div class="titleTable">{{'信息记录'}}</div>
      </div>
      <div>
        <div class="data_table">
          <el-table
            :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            class="file-table"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
          >
<!--            <el-table-column type="selection" width="50" align="center" />-->
            <el-table-column prop="constructionSiteName" label="项目名称" width="250"/>
            <el-table-column prop="fromUser" label="发起人"  width="250"/>

            <el-table-column prop="toUser" label="接收人"  width="80" align="center"/>
            <el-table-column prop="ccPeople" label="抄送人" align="center" width="80"/>
<!--            <el-table-column prop="imageUrl" label="图片地址" align="center" />-->
<!--            <el-table-column prop="videoUrl" label="视频地址" align="center" />-->
            <el-table-column prop="riskLevel" label="风险等级" align="center"  width="100"/>
            <el-table-column label="处理过程" align="center"  width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.processStatus === 1">未处理</div>
                <div v-if="scope.row.processStatus === 2">正在处理</div>
                <div v-if="scope.row.processStatus === 3">已经完成</div>
                <div v-if="scope.row.processStatus === 4">预警</div>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="发起时间" align="center" />
            <el-table-column prop="setEndTime" label="结束时间" align="center" />
            <el-table-column prop="checkType" label="一级类型" align="center" />
            <el-table-column label="提交方式" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.flag === 1">手动提交</div>
                <div v-if="scope.row.flag === 2">机器提交</div>
              </template>
            </el-table-column>
            <el-table-column prop="context" label="文件内容" align="center" />
<!--            <el-table-column prop="operationTime" label="更新时间" width="120"/>-->
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="showDetials(scope.row)"><i class="el-icon-goods"></i> 查看详情</el-button>
                <!--<el-button-->
                  <!--type="text"-->
                  <!--@click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete" /> 删除</el-button>-->
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
    </div>
    <el-dialog :visible.sync="showUpload" title="详细记录" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">

        <el-form :model="uploadInfo"  ref="uploadInfo" label-width="2rem">
          <el-form-item label="项目名称:" :rules="[{ required: true, message: '内容不能为空'}]" prop="constructionSiteName">

            <span>{{uploadInfo.constructionSiteName}}</span>
          </el-form-item>
          <el-form-item label="发起人:"  prop="deviceSn">
            <span>{{uploadInfo.fromUser}}</span>
          </el-form-item>
          <el-form-item label="接收人:" prop="idcard">

            <span>{{uploadInfo.toUser}}</span>
          </el-form-item>
          <el-form-item label="抄送人:" prop="operationTime">
            <span>{{uploadInfo.ccPeople}}</span>
          </el-form-item>
          <el-form-item label="风险等级:" prop="lon">
            <span>{{uploadInfo.riskLevel}}</span>
          </el-form-item>
          <el-form-item label="处理过程:" prop="lat">
            <span v-if="uploadInfo.processStatus === 1">未处理</span>
            <span v-if="uploadInfo.processStatus === 2">正在处理</span>
            <span v-if="uploadInfo.processStatus === 3">已经完成</span>
            <span v-if="uploadInfo.processStatus === 4">预警</span>
          </el-form-item>
          <el-form-item label="发起时间:" prop="height">

            <span>{{uploadInfo.startTime}}</span>
          </el-form-item>
          <el-form-item label="结束时间:" prop="amplitude">
            <span>{{uploadInfo.setEndTime}}</span>
          </el-form-item>
          <el-form-item label="一级类型:" prop="rotary">

            <span>{{uploadInfo.checkType}}</span>
          </el-form-item>
          <el-form-item label="一级类型具体分类:" prop="rotary">

            <span>{{uploadInfo.checkTypeOffspring}}</span>
          </el-form-item>
          <el-form-item label="提交方式:" prop="heavy">
            <span v-if="uploadInfo.flag === 1">手动提交</span>
            <span v-if="uploadInfo.flag === 2">机器提交</span>
          </el-form-item>
          <el-form-item label="文件内容:" prop="windspeed">
            <span>{{uploadInfo.context}}</span>
          </el-form-item>
          <el-form-item label="项目过程表:" v-if="uploadInfo.safetyAndQualityProcessList.length > 0">

            <span v-for="(item, index) in uploadInfo.safetyAndQualityProcessList" :key="index">{{item}}</span>
          </el-form-item>
          <el-form-item label="一级进度ID:" prop="windspeed">
            <span>{{uploadInfo.sectionId}}</span>
          </el-form-item>
          <el-form-item label="二级进度ID:" prop="windspeed">
            <span>{{uploadInfo.planId}}</span>
          </el-form-item>
          <el-form-item label="图片:" v-if="uploadInfo.imageUrl !== null">
            <img :src="uploadInfo.imageUrl"/>
          </el-form-item>
          <el-form-item label="视频:" v-if="uploadInfo.videoUrl !== null">
            <video :src="uploadInfo.videoUrl">您的浏览器不支持 video 标签。</video>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showUpload = false">关闭</el-button>
            <!--<el-button @click="resetForm('uploadInfo')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getErrorInfo} from '@/api/scheduleManage'

  export default {
    data() {
      return {
        fileTable: [],
        currentPage: 1,
        pageSize: 10,
        siteId: '',
        showUpload: false,
        uploadInfo: {
          constructionSiteName: '', // 项目名称
          fromUser: '', // 发起人
          toUser: '', // 接收人
          ccPeople: '', // 抄送人
          riskLevel: '', // 风险等级
          processStatus: '', // 处理过程
          startTime: '', // 发起时间,
          setEndTime: '', // 结束时间
          checkType: '', // 一级类型
          checkTypeOffspring: '', // 一级类型下属分类
          flag: '', // 提交方式
          context: '', // 文件内容
          safetyAndQualityProcessList: [], // 项目过程表
          planId: '', // 一级进度ID
          sectionId: '', // 二级进度ID
          imageUrl: '', // 图片地址
          videoUrl: '', // 视频地址
        },
      }
    },
    computed: {
      planId () {
        return this.$route.query.planId
      },
      sectionId () {
        return this.$route.query.sectionId
      },
      sitename () {
        return this.$route.query.sitename
      },
    },
    mounted() {
      this.$store.dispatch('changeMsg', '进度管理');
      this.getErrorInfo()
    },
    methods: {
      getErrorInfo() {
        getErrorInfo({
          planId: this.planId,
          sectionId: this.sectionId,
          sitename: this.sitename
        }).then(res => {
          if (res.data.code === 200) {
            this.fileTable = res.data.rows
          }
          console.log(res.data)
        })
      },
      showDetials(row) {
        this.uploadInfo = row
        this.showUpload = true
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      gotoback() {
        history.go(-1)
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

  .el-pagination__total {
    color: #409eff;
  }

  /*!*透明化整体*!*/
  /*.el-table,*/
  /*.el-table__expanded-cell {*/
  /*background-color: transparent !important;*/
  /*}*/
  /*!*透明化行、单元格*!*/
  /*.el-table th,*/
  /*.el-table tr,*/
  /*.el-table td {*/
  /*background-color: transparent !important;*/
  /*}*/
  /*!*hover时样式*!*/
  /*.el-table tbody tr:hover>td {*/
  /*background-color: #367f7f78 !important*/
  /*}*/

  /*!*偶数行样式*!*/
  /*.el-table__row--striped td {*/
  /*background-color: #45797b33 !important*/
  /*}*/
  /*!*奇数行样式*!*/
  /*.el-table__row:not(.el-table__row--striped) {*/
  /*background: #1439391c !important;*/
  /*}*/

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
  .data_table {
    /*height: 80%;*/
    /*overflow-y: scroll;*/
    /*width: 100%;*/
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
  .titleTable {
    color: white;font-size: 0.3rem;text-align: center;margin-top: 0.1rem;
  }
  .input-label {
    color: white;
    font-size: 0.25rem;
    margin-left: 0.3rem;
  }
  .input-style {
    width: 10vw;
  }
</style>
