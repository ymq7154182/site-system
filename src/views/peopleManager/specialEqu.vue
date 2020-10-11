<template>
  <div class="special-edu">
    <ul>
      <li>
        <el-row>
          <el-col>
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" style="float: left; ">
              <el-form-item label="ID" prop="id" class="fixColor">
                <el-input v-model="queryParams.id" placeholder="请输入用户ID" type="number" min="1" size="small" class="searchBar" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="姓名" prop="userName" class="fixColor">
                <el-input v-model="queryParams.userName" placeholder="请输入姓名" size="small" class="searchBar" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="工种" prop="userType" class="fixColor">
                <el-input v-model="queryParams.userType" placeholder="请输入工种" size="small" class="searchBar" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="年龄" prop="userAge" class="fixColor">
                <el-input v-model="queryParams.userAge" placeholder="请输入年龄" type="number" min="1" size="small" class="searchBar" @keyup.enter.native="handleQuery" />
              </el-form-item>
              <el-form-item label="联系方式" prop="phone" class="fixColor">
                <el-input v-model="queryParams.phone" placeholder="请输入联系方式" size="small" class="searchBar" @keyup.enter.native="handleQuery" />
              </el-form-item>
            </el-form>
            <div style="float: right; ">
              <el-button type="success" icon="el-icon-search" @click="handleQuery">搜索</el-button>
              <el-button type="warning" icon="el-icon-refresh" @click="resetSearch('queryForm')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </li>
      <li>
        <div class="dataTable">
          <el-table
            :data="userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            style="font-size: 0.22rem;"
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
          >
            <el-table-column label="ID" align="center" prop="id" width="50" />
            <el-table-column label="姓名" align="center" prop="userName" />
            <el-table-column label="工种" align="center" prop="userType" />
            <el-table-column label="年龄" align="center" prop="userAge" />
            <el-table-column label="联系方式" align="center" prop="phone" />
            <el-table-column width="150" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-plus" @click="updateImg(scope.row)" style="font-size: 0.22rem; ">补充信息</el-button>
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
            :total="userList.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            background
          />
        </div>
      </li>
    </ul>
    <el-dialog :visible.sync="showUpdate" title="补充信息" width="35%" @close="editClose">
      <table cellspacing="0" class="lesson-table">
        <tr>
          <td class="table-head">ID</td>
          <td>{{ currentInfo.id }}</td>
        </tr>
        <tr>
          <td class="table-head">姓名</td>
          <td>{{ currentInfo.userName }}</td>
        </tr>
        <tr>
          <td class="table-head">工种</td>
          <td>{{ currentInfo.userType }}</td>
        </tr>
        <tr>
          <td class="table-head">年龄</td>
          <td>{{ currentInfo.userAge }}</td>
        </tr>
        <tr>
          <td class="table-head">联系方式</td>
          <td>{{ currentInfo.phone }}</td>
        </tr>
        <tr v-if="currentInfo.checkImg !== null">
          <td class="table-head">资质证书</td>
          <td><a :href="currentInfo.checkImg" target="_blank">查看图片</a></td>
        </tr>
        <tr>
          <td class="table-head">上传图片</td>
          <td>
            <el-upload
              class="upload-demo"
              action="http://121.36.106.18:38080/system/safe/uploadFile"
              :limit="1"
              :on-success="handleSuccess"
              :file-list="fileList"
            >
              <el-button slot="trigger" type="text" icon="el-icon-upload" style="text-align: center; font-size: 14px; ">选取文件</el-button>
            </el-upload>
          </td>
        </tr>
      </table>
      <div style="text-align: center; ">
        <el-button type="primary" @click="confirmEdit">确认修改</el-button>
        <el-button @click="showUpdate = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {retrieveMember, updateMember} from "../../api/specialEqu";

export default {
  name: "kqHistory",
  data() {
    return {
      // 用户表格数据
      userList: [],
      pageSize: 8,
      currentPage: 1,
      showUpdate: false,
      currentInfo: {
        id: 0,
        userName: '',
        userType: '',
        userAge: 0,
        phone: '',
      },
      uploadInfo: {
        id: 0,
        checkImg: ''
      },
      fileList: [],
      queryParams: {
        id: null,
        userName: null,
        userType: null,
        userAge: null,
        phone: null
      }
    };
  },
  mounted() {
    this.refreshTable();
  },
  methods: {
    refreshTable() {
      retrieveMember().then(response => {
        if (response.data.code === 200) {
          this.userList = response.data.rows;
        } else return false;
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    updateImg(row) {
      this.showUpdate = true;
      this.currentInfo = row;
    },
    editClose() {
      this.fileList = [];
    },
    handleSuccess(response, file, fileList) {
      this.uploadInfo.checkImg = response.data
    },
    confirmEdit() {
      this.uploadInfo.id = this.currentInfo.id;
      updateMember(this.uploadInfo).then(response => {
        if (response.data.code === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          this.showUpdate = false;
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    handleQuery() {
      retrieveMember(this.queryParams).then(response => {
        if (response.data.code === 200) {
          this.userList = response.data.rows;
        } else return false;
      });
    },
    resetSearch(formName) {
      this.$refs[formName].resetFields();
      this.refreshTable();
    }
  },
};
</script>

<style scoped>
.special-edu {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.special-edu ul {
  width: 85%;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

/deep/ .el-form-item__label{
  color: white;
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

.lesson-table {
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.lesson-table td {
  height: 40px;
}

.table-head {
  color: #409EFF;
  width: 40%;
  font-weight: bold;
}

.searchBar {
  width: 140px;
}
</style>
