<template>
  <div style="margin: 10px; ">
    <el-row>
      <el-col :span="4">
        <div class="dm-aside">
          <div class="border-top-left"></div>
          <div class="dm-title">设备使用过程管理</div>
          <div class="type-list">
            <ul>
              <li @click="getShow1"><i class="el-icon-document type-icon" />建筑起重机械安装自检记录表</li>
              <li @click="getShow2"><i class="el-icon-document type-icon" />建筑起重机械安装验收记录表</li>
              <li @click="getShow3"><i class="el-icon-document type-icon" />建筑起重机械顶升、加节情况表</li>
              <li @click="getShow4"><i class="el-icon-document type-icon" />建筑起重机械附着情况表</li>
              <li @click="getShow5"><i class="el-icon-document type-icon" />建筑起重机械定期检查记录表</li>
              <li @click="getShow6"><i class="el-icon-document type-icon" />建筑起重机械维护保养记录表</li>
              <!--<li><i class="el-icon-picture-outline type-icon" />图片</li>-->
              <!--<li><i class="el-icon-video-camera-solid type-icon" />视频</li>-->
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="dm-main">
          <div class="border-top-right"></div>
          <div style="padding: 0.13rem;position: relative">
            <el-button type="success" @click="gotoback"><i class="el-icon-d-arrow-left" />返回</el-button>
            <el-button type="primary" @click="showUpload = true"><i class="el-icon-plus" /> 新增</el-button>
            <span style="font-size: 0.2rem;margin-left: 0.1rem;color: white">
               设备编号：
            </span>
           <el-input style="width: 2rem" placeholder="请输入设备编号"></el-input>
            <el-button type="primary" icon="el-icon-search">查询</el-button>
            <div class="titles-style">
              <span>{{titles}}</span>
            </div>
          </div>


          <div v-show="tableShow === 'table1'">
            <div class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
                <!--<el-table-column prop="name" label="设备名称" align="center" />-->
                <!--<el-table-column prop="type" label="设备编号" width="100" align="center" />-->
<!--                <el-table-column prop="devId" label="设备id" />-->
<!--                <el-table-column prop="setupId" label="安装id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>
                <el-table-column prop="checkUser" label="安装单位负责人" align="center" />
                <el-table-column prop="checkContent" label="安装单位自检意见" align="center" />
                <el-table-column prop="checkTime" label="检查时间" align="center" width="100"/>
                <el-table-column prop="checkWriteTime" label="检查填写时间" align="center" width="100"/>
                <el-table-column prop="installUser" label="安装单位技术负责人" align="center" />
                <el-table-column prop="installUserAqjg" label="安装单位安全员、机管" align="center" />
                <el-table-column prop="installUserZc" label="安装班组长" align="center" />
                <el-table-column prop="installUserJzry" label="机组人员" align="center" />
                <el-table-column prop="writeTime" label="填写时间" align="center" width="100"/>
                <el-table-column prop="leftHeight" label="起升高度" align="center"/>
                <el-table-column prop="towerHeight" label="塔高"  align="center" />
                <el-table-column prop="installHeigth" label="安装高度" align="center" />
                <el-table-column prop="maxLoad" label="最大载重量" align="center" />
                <el-table-column prop="maxCapacity" label="最大起重量" align="center" />
                <el-table-column prop="maxRange" label="幅度" align="center" />
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

          <div v-show="tableShow === 'table2'">
            <div  class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
                <!--<el-table-column prop="name" label="设备名称" align="center" />-->
                <!--<el-table-column prop="type" label="设备编号" width="100" align="center" />-->
<!--                <el-table-column prop="devId" label="设备id" />-->
<!--                <el-table-column prop="setupId" label="安装id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>

                <el-table-column prop="opinionSg" label="施工单位意见" align="center" />
                <el-table-column prop="userSg" label="施工单位项目经理签字" align="center" />
                <el-table-column prop="timeSg" label="时间" align="center" width="100"/>
                <el-table-column prop="opinionJl" label="监理单位意见" align="center" />
                <el-table-column prop="userJl" label="监理单位项目经理签字" align="center" />
                <el-table-column prop="timeJl" label="时间" align="center" width="100"/>
                <el-table-column prop="reporttime" label="上报时间时间" align="center" />
                <el-table-column prop="leftHeight" label="起升高度"  align="center"/>
                <el-table-column prop="towerHeight" label="塔高"  align="center" />
                <el-table-column prop="installHeigth" label="安装高度" align="center" />
                <el-table-column prop="maxLoad" label="最大载重量" align="center" />
                <el-table-column prop="maxCapacity" label="最大起重量" align="center" />
                <el-table-column prop="maxRange" label="幅度" align="center" />
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

          <div v-show="tableShow === 'table3'">
            <div class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
<!--                <el-table-column prop="devid" label="设备id" />-->
<!--                <el-table-column prop="installid" label="安装单位id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>
                <el-table-column prop="leftHeight" label="附着道数" align="center"/>
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <el-table-column prop="maxLoad" label="新安装标准节" align="center" />
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="installtime" label="安装时间" align="center" />
                <el-table-column prop="checkTime" label="顶升后高度" align="center" />
                <el-table-column prop="spacing" label="附着间距" align="center" />
                <el-table-column prop="installUserZcs" label="监理单位审核日期" align="center" />
                <el-table-column prop="reporttime" label="上报时间" align="center" />
                <el-table-column prop="maxCapacity" label="与建筑物水平中心距离" align="center" />
                <el-table-column prop="maxRange" label="原安装臂铰点（自由端）高度" align="center" />
                <el-table-column prop="checkUser" label="是否附着" align="center" />
                <el-table-column prop="installmanager" label="安装单位负责人" align="center" />
                <el-table-column prop="installphone" label="联系电话" align="center" />
                <el-table-column prop="checkContent" label="现场专业技术人员" align="center" />
                <el-table-column prop="checkWriteTime" label="施工总承包单位审核意见" align="center" />
                <el-table-column prop="installUserAqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installUser" label="施工总承包审核日期" align="center" />

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

          <div v-show="tableShow === 'table4'">
            <div class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
<!--                <el-table-column prop="devid" label="设备id" />-->
<!--                <el-table-column prop="installid" label="安装单位id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>
                <el-table-column prop="leftHeight" label="附着道数" />
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <el-table-column prop="maxLoad" label="新安装标准节" align="center" />
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="installtime" label="安装时间" align="center" />
                <el-table-column prop="checkTime" label="顶升后高度" align="center" />
                <el-table-column prop="spacing" label="附着间距" align="center" />
                <el-table-column prop="installUserZcs" label="监理单位审核日期" align="center" />
                <el-table-column prop="reporttime" label="上报时间" align="center" />
                <el-table-column prop="maxCapacity" label="与建筑物水平中心距离" align="center" />
                <el-table-column prop="maxRange" label="原安装臂铰点（自由端）高度" align="center" />
                <el-table-column prop="checkUser" label="是否附着" align="center" />
                <el-table-column prop="installmanager" label="安装单位负责人" align="center" />
                <el-table-column prop="installphone" label="联系电话" align="center" />
                <el-table-column prop="checkContent" label="现场专业技术人员" align="center" />
                <el-table-column prop="checkWriteTime" label="施工总承包单位审核意见" align="center" />
                <el-table-column prop="installUserAqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installUser" label="施工总承包审核日期" align="center" />

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

          <div v-show="tableShow === 'table5'">
            <div class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
<!--                <el-table-column prop="devid" label="设备id" />-->
<!--                <el-table-column prop="useId" label="使用id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>
                <el-table-column prop="leftHeight" label="附着道数" />
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <el-table-column prop="maxLoad" label="新安装标准节" align="center" />
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="checkTime" label="检查时间" align="center" />
                <el-table-column prop="maxCapacity" label="最大起重量" align="center" />
                <el-table-column prop="maxRange" label="幅度" align="center" />
                <el-table-column prop="installHeigth" label="安装高度" align="center" />
                <el-table-column prop="channels" label="附着道数" align="center" />
                <el-table-column prop="checkResult" label="与建筑物水平中心距离" align="center" />
                <el-table-column prop="maxRange" label="检查结果代号说明" align="center" />
                <el-table-column prop="userTime" label="使用单位填写时间" align="center" />
                <el-table-column prop="checkUser" label="检查人员" align="center" />
                <el-table-column prop="conclusion" label="结论" align="center" />
                <el-table-column prop="reporttime" label="上报时间" align="center" />
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

          <div v-show="tableShow === 'table6'">
            <div class="data_table">
              <el-table
                :data="fileTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                class="file-table"
                stripe
                :header-row-style="{ color: '#409eff' }"
                :row-style="{ color: 'white' }"
              >
<!--                <el-table-column prop="devid" label="设备id" />-->
<!--                <el-table-column prop="useId" label="使用id" />-->
<!--                <el-table-column prop="userid" label="当前登录人id" />-->
                <el-table-column type="index" label="序号"  align="center"/>
                <el-table-column prop="weibaotime" label="维保时间" />
                <el-table-column prop="maxcapacity" label="运转台时" />
                <el-table-column prop="maxrange" label="更换主要零部件" />
                <!-- <el-table-column prop="leftheight" label="维管负责人" />
                <el-table-column prop="towerheight" label="维保人员" width="150" align="center" />
                <el-table-column prop="installheigth" label="维修（保养）内容" align="center" /> -->
                <el-table-column prop="installuseraqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installuserzc" label="监理单位审核日期" align="center" />
                <el-table-column prop="reporttime" label="上报时间" align="center" />
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
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showUpload" title="新增信息" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="uploadInfo"   label-width="1.5rem" v-show="tableShow === 'table1'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装id" >-->
<!--            <el-input v-model="uploadInfo.setupId" style="width: 50%" placeholder="请输入安装id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="起升高度" >
            <el-input v-model="uploadInfo.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" >
            <el-input v-model="uploadInfo.towerHeight" style="width: 50%" placeholder="请输入塔高"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" >
            <el-input v-model="uploadInfo.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="最大载重量" >
            <el-input v-model="uploadInfo.maxLoad" style="width: 50%" placeholder="请输入最大载重量"></el-input>
          </el-form-item>
          <el-form-item label="检查时间" >
            <el-date-picker v-model="uploadInfo.checkTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="安装单位负责人" >
            <el-input v-model="uploadInfo.checkUser" placeholder="请输入安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位自检意见" >
            <el-input v-model="uploadInfo.checkContent" type="textarea" placeholder="请输入安装单位自检意见" style="width: 70%; "></el-input>
          </el-form-item>
          <el-form-item label="检查填写时间" >
            <el-date-picker v-model="uploadInfo.checkWriteTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="安装单位技术负责人" >
            <el-input v-model="uploadInfo.installUser" placeholder="请输入安装单位技术负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位安全员、机管" >
            <el-input v-model="uploadInfo.installUserAqjg" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装班组长" >
            <el-input v-model="uploadInfo.installUserZc" placeholder="请输入安装班组长" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="机组人员" >
            <el-input v-model="uploadInfo.installUserJzry" placeholder="请输入机组人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="填写时间" >
            <el-date-picker v-model="uploadInfo.writeTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" >
            <el-input v-model="uploadInfo.maxCapacity" placeholder="请输入最大起重量" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="幅度" >
            <el-input v-model="uploadInfo.maxRange" placeholder="请输入幅度" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo2"   label-width="1.5rem" v-show="tableShow === 'table2'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo2.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装id" >-->
<!--            <el-input v-model="uploadInfo2.setupId" style="width: 50%" placeholder="请输入安装id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo2.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="起升高度" >
            <el-input v-model="uploadInfo2.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" >
            <el-input v-model="uploadInfo2.towerHeight" style="width: 50%" placeholder="请输入塔高"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" >
            <el-input v-model="uploadInfo2.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="最大载重量" >
            <el-input v-model="uploadInfo2.maxLoad" style="width: 50%" placeholder="请输入最大载重量"></el-input>
          </el-form-item>
          <el-form-item label="施工单位意见" >
            <el-input v-model="uploadInfo2.opinionSg" style="width: 50%" placeholder="请输入施工单位意见" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="施工单位项目经理签字" >
            <el-input v-model="uploadInfo2.userSg" style="width: 50%" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="时间" >
            <el-date-picker v-model="uploadInfo2.timeSg" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="监理单位意见" >
            <el-input v-model="uploadInfo2.opinionJl" style="width: 50%" placeholder="请输入监理单位意见" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="监理单位项目经理签字" >
            <el-input v-model="uploadInfo2.userJl" style="width: 50%" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="时间" >
            <el-date-picker v-model="uploadInfo2.timeJl" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间">
            <el-date-picker v-model="uploadInfo2.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" >
            <el-input v-model="uploadInfo2.maxCapacity" placeholder="请输入最大起重量" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="幅度" >
            <el-input v-model="uploadInfo2.maxRange" placeholder="请输入幅度" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo3"   label-width="1.5rem" v-show="tableShow === 'table3'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo3.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装单位id" >-->
<!--            <el-input v-model="uploadInfo3.installid" style="width: 50%" placeholder="安装单位id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo3.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="附着道数" >
            <el-input v-model="uploadInfo3.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="当前已安装附着" >
            <el-input v-model="uploadInfo3.towerHeight" style="width: 50%" placeholder="当前已安装附着"></el-input>
          </el-form-item>
          <el-form-item label="当前标准节" >
            <el-input v-model="uploadInfo3.installHeigth" style="width: 50%" placeholder="请输入当前标准节"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" >
            <el-input v-model="uploadInfo3.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
          <el-form-item label="企业id" >
            <el-input v-model="uploadInfo3.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="设备使用ID" >
            <el-input v-model="uploadInfo3.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>
          </el-form-item>
          <el-form-item label="安装时间" >
            <el-date-picker v-model="uploadInfo3.installtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="顶升后高度" >
            <el-input v-model="uploadInfo3.checkTime" style="width: 50%" placeholder="请输入顶升后高度" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="附着间距" >
            <el-input v-model="uploadInfo3.spacing" style="width: 50%" placeholder="请输入附着间距"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" >
            <el-date-picker v-model="uploadInfo3.installUserZcs" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间">
            <el-date-picker v-model="uploadInfo3.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="与建筑物水平中心距离" >
            <el-input v-model="uploadInfo3.maxCapacity" placeholder="请输入与建筑物水平中心距离" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="原安装臂铰点（自由端）高度" >
            <el-input v-model="uploadInfo3.maxRange" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="是否附着" >
            <el-input v-model="uploadInfo3.checkUser" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位负责人" >
            <el-input v-model="uploadInfo3.installmanager" placeholder="安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="联系电话" >
            <el-input v-model="uploadInfo3.installphone" placeholder="请输入联系电话" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="现场专业技术人员" >
            <el-input v-model="uploadInfo3.checkContent" placeholder="请输入现场专业技术人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包单位审核意见" >
            <el-input v-model="uploadInfo3.checkWriteTime" placeholder="请输入施工总承包单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" >
            <el-input v-model="uploadInfo3.installUserAqjg" placeholder="请输入监理单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包审核日期">
            <el-date-picker v-model="uploadInfo3.installUser" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo4"   label-width="1.5rem" v-show="tableShow === 'table4'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo4.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装单位id" >-->
<!--            <el-input v-model="uploadInfo4.installid" style="width: 50%" placeholder="安装单位id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo4.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="附着道数" >
            <el-input v-model="uploadInfo4.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="当前已安装附着" >
            <el-input v-model="uploadInfo4.towerHeight" style="width: 50%" placeholder="当前已安装附着"></el-input>
          </el-form-item>
          <el-form-item label="当前标准节" >
            <el-input v-model="uploadInfo4.installHeigth" style="width: 50%" placeholder="请输入当前标准节"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" >
            <el-input v-model="uploadInfo4.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
          <el-form-item label="企业id" >
            <el-input v-model="uploadInfo4.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="设备使用ID" >
            <el-input v-model="uploadInfo4.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>
          </el-form-item>
          <el-form-item label="安装时间" >
            <el-date-picker v-model="uploadInfo4.installtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="顶升后高度" >
            <el-input v-model="uploadInfo4.checkTime" style="width: 50%" placeholder="请输入顶升后高度" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="附着间距" >
            <el-input v-model="uploadInfo4.spacing" style="width: 50%" placeholder="请输入附着间距"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" >
            <el-date-picker v-model="uploadInfo4.installUserZcs" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间">
            <el-date-picker v-model="uploadInfo4.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="与建筑物水平中心距离" >
            <el-input v-model="uploadInfo4.maxCapacity" placeholder="请输入与建筑物水平中心距离" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="原安装臂铰点（自由端）高度" >
            <el-input v-model="uploadInfo4.maxRange" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="是否附着" >
            <el-input v-model="uploadInfo4.checkUser" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位负责人" >
            <el-input v-model="uploadInfo4.installmanager" placeholder="安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="联系电话" >
            <el-input v-model="uploadInfo4.installphone" placeholder="请输入联系电话" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="现场专业技术人员" >
            <el-input v-model="uploadInfo4.checkContent" placeholder="请输入现场专业技术人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包单位审核意见" >
            <el-input v-model="uploadInfo4.checkWriteTime" placeholder="请输入施工总承包单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" >
            <el-input v-model="uploadInfo4.installUserAqjg" placeholder="请输入监理单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包审核日期">
            <el-date-picker v-model="uploadInfo4.installUser" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo5"   label-width="1.5rem" v-show="tableShow === 'table5'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo5.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo5.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="起升高度" >
            <el-input v-model="uploadInfo5.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" >
            <el-input v-model="uploadInfo5.towerHeight" style="width: 50%" placeholder="塔高"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" >
            <el-input v-model="uploadInfo5.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
<!--          <el-form-item label="企业id" >-->
<!--            <el-input v-model="uploadInfo5.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="设备使用ID" >-->
<!--            <el-input v-model="uploadInfo5.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="检查时间" >
            <el-date-picker v-model="uploadInfo5.checkTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" >
            <el-input v-model="uploadInfo5.maxCapacity" style="width: 50%" placeholder="请输入最大起重量" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="幅度" >
            <el-input v-model="uploadInfo5.maxRange" style="width: 50%" placeholder="请输入幅度"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" >
            <el-input v-model="uploadInfo5.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="附着道数" >
            <el-input v-model="uploadInfo5.channels" style="width: 50%" placeholder="请输入附着道数"></el-input>
          </el-form-item>
          <el-form-item label="检查结果代号说明" >
            <el-input v-model="uploadInfo5.checkResult" style="width: 50%" placeholder="请输入检查结果代号说明"></el-input>
          </el-form-item>
          <el-form-item label="使用单位意见" >
            <el-input v-model="uploadInfo5.userContent" style="width: 50%" placeholder="请输入使用单位意见"></el-input>
          </el-form-item>
          <el-form-item label="使用单位填写时间" >
            <el-date-picker v-model="uploadInfo5.userTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="检查人员" >
            <el-input v-model="uploadInfo5.checkUser" style="width: 50%" placeholder="请输入检查人员"></el-input>
          </el-form-item>
          <el-form-item label="结论" >
            <el-input v-model="uploadInfo5.conclusion" style="width: 50%" placeholder="请输入结论"></el-input>
          </el-form-item>
          <el-form-item label="上报时间">
            <el-date-picker v-model="uploadInfo5.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
            <el-button @click="resetForm('uploadInfo')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo6"   label-width="1.5rem" v-show="tableShow === 'table6'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo6.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="使用id" >-->
<!--            <el-input v-model="uploadInfo6.useId" style="width: 50%" placeholder="请输入使用id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo6.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="维保时间" >
            <el-date-picker v-model="uploadInfo6.weibaotime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="运转台时" >
            <el-input v-model="uploadInfo6.maxcapacity" style="width: 50%" placeholder="请输入运转台时"></el-input>
          </el-form-item>
          <el-form-item label="更换主要零部件" >
            <el-input v-model="uploadInfo6.maxrange" style="width: 50%" placeholder="请输入更换主要零部件"></el-input>
          </el-form-item>

          <el-form-item label="维管负责人" >
            <el-input v-model="uploadInfo6.leftheight" style="width: 50%" placeholder="请输入维管负责人"></el-input>
          </el-form-item>
          <el-form-item label="维保人员" >
            <el-input v-model="uploadInfo6.towerheight" style="width: 50%" placeholder="维保人员"></el-input>
          </el-form-item>
          <el-form-item label="维修（保养）内容" >
            <el-input v-model="uploadInfo6.installheigth" style="width: 50%" placeholder="请输入维修（保养）内容"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" >
            <el-input v-model="uploadInfo6.installuseraqjg" style="width: 50%" placeholder="请输入监理单位审核意见"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" >
            <el-date-picker v-model="uploadInfo6.installuserzc" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间">
            <el-date-picker v-model="uploadInfo6.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd"  style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>
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
            <el-date-picker v-model="currentInfo.uploadTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
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
  import { zijian, addZijian,getSysProData,yanshou, addyanshou,weihu, addweihu, dingqi, adddingqi, dingsheng,adddingsheng,fuzhuo, addfuzhuo } from "@/api/deviceManage";
  // import axios from 'axios'
  export default {
    data() {
      return {
        fileTable: [],
        titles: '建筑起重机械安装自检记录表',
        tableShow: 'table1',
        currentPage: 1,
        pageSize: 10,
        siteId: '',
        showUpload: false,
        uploadInfo: {
          proid: '', // 项目id
          devid: '', // 设备id
          setupId: '', // 安装id
          userid: '', // 当前登录人id
          leftHeight: '', // 起升高度
          towerHeight: '', // 塔高,
          installHeigth: '', // 安装高度
          maxLoad: '', // 最大载重量
          checkTime: '', // 检查时间
          checkUser: '', // 安装单位负责人
          checkContent: '', // 安装单位自检意见
          checkWriteTime: '', // 检查填写时间
          installUser: '', // 安装单位技术负责人
          installUserAqjg: '', // 安装单位安全员、机管
          installUserZc: '', // 安装班组长
          installUserJzry: '', // 机组人员
          writeTime: '', // 填写时间
          maxCapacity: '', // 最大起重量
          maxRange: '', // 幅度
        },
        uploadInfo2: {
          proid: '', // 项目id
          devid: '', // 设备id
          setupId: '', // 安装id
          userid: '', // 当前登录人id
          leftHeight: '', // 起升高度
          towerHeight: '', // 塔高,
          installHeigth: '', // 安装高度
          maxLoad: '', // 最大载重量
          opinionSg: '', // 施工单位意见
          userSg: '', // 施工单位项目经理签字
          timeSg: '', // 时间
          opinionJl: '', // 监理单位意见
          userJl: '', // 监理单位项目经理签字
          timeJl: '', // 时间
          reporttime: '', // 上报时间时间
          maxCapacity: '', // 最大起重量
          maxRange: '', // 幅度
        },
        uploadInfo3: {
          proid: '', // 项目id
          devid: '', // 设备id
          installid: '', // 安装单位id
          userid: '', // 当前登录人id
          leftHeight: '', // 附着道数
          towerHeight: '', // 当前已安装附着
          installHeigth: '', // 当前标准节
          maxLoad: '', // 新安装标准节
          entid: '', // 企业id
          useId: '', // 设备使用ID
          installtime: '', // 安装时间
          checkTime: '', // 顶升后高度
          spacing: '', // 附着间距
          installUserZcs: '', // 监理单位审核日期
          reporttime: '', // 上报时间时间
          maxCapacity: '', // 与建筑物水平中心距离
          maxRange: '', // 原安装臂铰点（自由端）高度
          checkUser: '', // 是否附着0.是 1.否
          installmanager: '', // 安装单位负责人
          installphone: '', // 联系电话
          checkContent: '', // 现场专业技术人员
          checkWriteTime: '', // 施工总承包单位审核意见
          installUserAqjg: '', // 监理单位审核意见
          installUser: '', // 施工总承包审核日期
        },
        uploadInfo4: {
          proid: '', // 项目id
          devid: '', // 设备id
          installid: '', // 安装单位id
          userid: '', // 当前登录人id
          leftHeight: '', // 附着道数
          towerHeight: '', // 当前已安装附着
          installHeigth: '', // 当前标准节
          maxLoad: '', // 新安装标准节
          entid: '', // 企业id
          useId: '', // 设备使用ID
          installtime: '', // 安装时间
          checkTime: '', // 顶升后高度
          spacing: '', // 附着间距
          installUserZcs: '', // 监理单位审核日期
          reporttime: '', // 上报时间时间
          maxCapacity: '', // 与建筑物水平中心距离
          maxRange: '', // 原安装臂铰点（自由端）高度
          checkUser: '', // 是否附着0.是 1.否
          installmanager: '', // 安装单位负责人
          installphone: '', // 联系电话
          checkContent: '', // 现场专业技术人员
          checkWriteTime: '', // 施工总承包单位审核意见
          installUserAqjg: '', // 监理单位审核意见
          installUser: '', // 施工总承包审核日期
        },
        uploadInfo5: {
          proid: '', // 项目id
          devid: '', // 设备id
          // setupId: '', // 安装id
          userid: '', // 当前登录人id
          leftHeight: '',// 起升高度
          towerHeight: '', // 塔高
          installHeigth: '', // 当前标准节
          maxLoad: '', // 新安装标准节
          entid: '', // 企业id
          useId: '', // 设备使用ID
          checkTime: '', // 检查时间
          maxCapacity: '', // 最大起重量
          maxRange: '', // 幅度
          channels: '', // 附着道数
          checkResult: '', // 检查结果代号说明(H、合格 Z、整改后合格 B、不合格 W、无此项)
          userContent: '', // 使用单位意见
          userTime: '', // 使用单位填写时间
          checkUser: '', // 检查人员
          conclusion: '', // 结论(T、同意继续使用 X、限制使用 B、不准使用，整改后二次验收)
          reporttime: '', // 上报时间
        },
        uploadInfo6: {
          proid: '', // 项目id
          devid: '', // 设备id
          useId: '', // 使用id
          userid: '', // 当前登录人id
          weibaotime: '', // 维保时间
          maxcapacity: '', // 运转台时
          maxrange: '', // 更换主要零部件
          leftheight: '', // 维管负责人
          towerheight: '', // 维保人员
          installheigth: '', // 维修（保养）内容
          installuseraqjg: '', // 监理单位审核意见
          installuserzc: '', // 监理单位审核日期
          reporttime: '',  // 上报时间
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
        currentIndex: null
      }
    },
    mounted() {
      // this.getZiJian()
      this.getAllData()
    },
    methods: {
      getAllData() {
        this.siteId = localStorage.getItem('siteId')
        var data = {
          deptId: this.siteId
        }
        getSysProData(data).then((res) => {
          this.uploadInfo.proid = res.data.guid
          this.uploadInfo2.proid = res.data.guid
          this.uploadInfo3.proid = res.data.guid
          this.uploadInfo4.proid = res.data.guid
          this.uploadInfo5.proid = res.data.guid
          this.uploadInfo6.proid = res.data.guid
          this.getZiJian()

        })
      },
      getZiJian() {
        zijian(this.uploadInfo.proid).then((res) => {
          this.fileTable = res.data.data
        })
      },
      getShow1() {
        this.tableShow = 'table1'
        this.titles = '建筑起重机械安装自检记录表'
        this.getZiJian()
      },
      getShow2() {
        this.tableShow = 'table2'
        this.titles = '建筑起重机械安装验收记录表'
        this.getyanshou()
      },
      getShow3() {
        this.tableShow = 'table3'
        this.titles = '建筑起重机械顶升、加节情况表'
        this.getdingsheng()
      },
      getShow4() {
        this.tableShow = 'table4'
        this.titles = '建筑起重机械附着情况表'
        this.getfuzhuo()
      },
      getShow5() {
        this.tableShow = 'table5'
        this.titles = '建筑起重机械定期检查记录表'
        this.getdingqi()
      },
      getShow6() {
        this.tableShow = 'table6'
        this.titles = '建筑起重机械维护保养记录表'
        this.getweihu()
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      submitUpload() {
        // this.$refs[formName].validate((valid) => {
        //   if(valid) {
        //     this.$message({
        //       type: 'success',
        //       message: '上传成功'
        //     });
        //     this.showEdit = false;
        //   } else {
        //     this.$message.error('上传失败')
        //     return false
        //   }
        // });
        if (this.tableShow === 'table1') {
          this.getaddZijian()
        } else if (this.tableShow === 'table2') {
          this.getaddyanshou()
        }else if(this.tableShow === 'table3') {
          this.getadddingsheng()
        }else if(this.tableShow === 'table4') {
          this.getaddfuzhuo()
        }else if(this.tableShow === 'table5') {
          this.getadddingqi()
        }else if(this.tableShow === 'table6') {
          this.getaddweihu()
        }
      },
      getaddZijian() {
        var data = this.uploadInfo
        addZijian(data).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getyanshou()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getyanshou() {
        yanshou(this.uploadInfo2.proid).then((res) => {
          this.fileTable = res.data.data
        })
      },
      getaddyanshou() {
        var data = this.uploadInfo2
        addyanshou(data).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getZiJian()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getweihu() {
        weihu(this.uploadInfo6.proid).then((res) => {
          this.fileTable = res.data.rows
        })
      },
      getaddweihu() {
        var data = this.uploadInfo6
        // var url = 'http://121.36.106.18:38080/device/maintenance'
        // axios.post(url, data).then((res) =>{
        //     if(res.data.code === 200) {
        //       this.$message.success(res.data.msg)
        //       this.getweihu()
        //       this.showUpload = false
        //     } else {
        //       this.$message.error(res.data.msg)
        //     }
        // })
        addweihu(data).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getweihu()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getdingqi() {
        dingqi(this.uploadInfo5.proid).then((res) => {
          this.fileTable = res.data.rows
        })
      },
      getadddingqi() {
        var data = this.uploadInfo5
        adddingqi(data).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getdingqi()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getdingsheng() {
        dingsheng(this.uploadInfo3.proid).then((res) => {
          this.fileTable = res.data.rows
        })
      },
      getadddingsheng() {

        adddingsheng(this.uploadInfo3).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getdingsheng()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getfuzhuo() {
        fuzhuo(this.uploadInfo4.proid).then((res) => {
          this.fileTable = res.data.rows
        })
      },
      getaddfuzhuo() {
        var data = this.uploadInfo4
        addfuzhuo(data).then((res) => {
          if(res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.getfuzhuo()
            this.showUpload = false
          } else {
            this.$message.error(res.data.msg)
          }
        })
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
    font-size: 0.22rem;
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
  .titles-style {
    color: white;
    font-size: 0.3rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

  }
</style>
