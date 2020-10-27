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
            <el-button type="primary" @click="showAdd"><i class="el-icon-plus" /> 新增</el-button>
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
                <el-table-column prop="devId" label="设备编号" align="center" />
                <el-table-column prop="checkUser" label="安装单位负责人" align="center" />
                <el-table-column prop="checkContent" label="安装单位自检意见" align="center" />
                <el-table-column prop="checkTime" label="检查时间" align="center" width="100"/>
                <el-table-column prop="checkWriteTime" label="检查填写时间" align="center" width="100"/>
                <el-table-column prop="installUser" label="安装单位技术负责人" align="center" />
                <!--<el-table-column prop="installUserAqjg" label="安装单位安全员、机管" align="center" />-->
                <el-table-column prop="installUserZc" label="安装班组长" align="center" />
                <!--<el-table-column prop="installUserJzry" label="机组人员" align="center" />-->
                <el-table-column prop="writeTime" label="填写时间" align="center" width="100"/>
                <el-table-column prop="leftHeight" label="起升高度" align="center"/>
                <!--<el-table-column prop="towerHeight" label="塔高"  align="center" />-->
                <!--<el-table-column prop="installHeigth" label="安装高度" align="center" />-->
                <!--<el-table-column prop="maxLoad" label="最大载重量" align="center" />-->
                <!--<el-table-column prop="maxCapacity" label="最大起重量" align="center" />-->
                <el-table-column prop="maxRange" label="幅度" align="center" />
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail1(scope.row)">查看</el-button>
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
                <el-table-column prop="devId" label="设备编号" align="center" />
                <el-table-column prop="opinionSg" label="施工单位意见" align="center" />
                <el-table-column prop="userSg" label="施工单位项目经理签字" align="center" />
                <el-table-column prop="timeSg" label="时间" align="center" width="100"/>
                <el-table-column prop="opinionJl" label="监理单位意见" align="center" />
                <el-table-column prop="userJl" label="监理单位项目经理签字" align="center" />
                <el-table-column prop="timeJl" label="时间" align="center" width="100"/>
                <el-table-column prop="reporttime" label="上报时间时间" align="center" width="100"/>
                <el-table-column prop="leftHeight" label="起升高度"  align="center"/>
                <el-table-column prop="towerHeight" label="塔高"  align="center" />
                <el-table-column prop="installHeigth" label="安装高度" align="center" />
                <el-table-column prop="maxLoad" label="最大载重量" align="center" />
                <el-table-column prop="maxCapacity" label="最大起重量" align="center" />
                <el-table-column prop="maxRange" label="幅度" align="center" />
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail2(scope.row)">查看</el-button>
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
                <el-table-column prop="devid" label="设备编号" align="center" />
                <el-table-column prop="leftHeight" label="附着道数" align="center"/>
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <!--<el-table-column prop="maxLoad" label="新安装标准节" align="center" />-->
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="installtime" label="安装时间" align="center" width="100"/>
                <!--<el-table-column prop="checkTime" label="顶升后高度" align="center" />-->
                <!--<el-table-column prop="spacing" label="附着间距" align="center" />-->
                <el-table-column prop="installUserZcs" label="监理单位审核日期" align="center" width="100"/>
                <el-table-column prop="reporttime" label="上报时间" align="center" width="100"/>
                <!--<el-table-column prop="maxCapacity" label="与建筑物水平中心距离" align="center" />-->
                <!--<el-table-column prop="maxRange" label="原安装臂铰点（自由端）高度" align="center" />-->
                <!--<el-table-column prop="checkUser" label="是否附着" align="center" />-->
                <el-table-column prop="installmanager" label="安装单位负责人" align="center" />
                <el-table-column prop="installphone" label="联系电话" align="center" />
                <!--<el-table-column prop="checkContent" label="现场专业技术人员" align="center" />-->
                <el-table-column prop="checkWriteTime" label="施工总承包单位审核意见" align="center" />
                <el-table-column prop="installUserAqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installUser" label="施工总承包审核日期" align="center" width="100"/>
                <el-table-column label="顶升加节自检" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" @click="checkDetail3(scope.row)">自检</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail3(scope.row)">查看</el-button>
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
                <el-table-column prop="devid" label="设备编号" align="center" />
                <el-table-column prop="leftHeight" label="附着道数" />
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <!--<el-table-column prop="maxLoad" label="新安装标准节" align="center" />-->
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="installtime" label="安装时间" align="center" width="100"/>
                <el-table-column prop="checkTime" label="顶升后高度" align="center" />
                <!--<el-table-column prop="spacing" label="附着间距" align="center" />-->
                <el-table-column prop="installUserZcs" label="监理单位审核日期" align="center" width="100"/>
                <!--<el-table-column prop="reporttime" label="上报时间" align="center" />-->
                <!--<el-table-column prop="maxCapacity" label="与建筑物水平中心距离" align="center" />-->
                <!--<el-table-column prop="maxRange" label="原安装臂铰点（自由端）高度" align="center" />-->
                <!--<el-table-column prop="checkUser" label="是否附着" align="center" />-->
                <el-table-column prop="installmanager" label="安装单位负责人" align="center" />
                <el-table-column prop="installphone" label="联系电话" align="center" />
                <!--<el-table-column prop="checkContent" label="现场专业技术人员" align="center" />-->
                <!--<el-table-column prop="checkWriteTime" label="施工总承包单位审核意见" align="center" />-->
                <el-table-column prop="installUserAqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installUser" label="施工总承包审核日期" align="center" width="100"/>
                <el-table-column label="附着验收" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-circle-check" @click="checkDetail4(scope.row)">验收</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail4(scope.row)">查看</el-button>
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
                <el-table-column prop="devid" label="设备编号" align="center" />
                <el-table-column prop="leftHeight" label="附着道数" />
                <el-table-column prop="towerHeight" label="当前已安装附着" width="150" align="center" />
                <el-table-column prop="installHeigth" label="当前标准节" align="center" />
                <!--<el-table-column prop="maxLoad" label="新安装标准节" align="center" />-->
<!--                <el-table-column prop="entid" label="企业id" align="center" />-->
<!--                <el-table-column prop="useId" label="设备使用ID" align="center" />-->
                <el-table-column prop="checkTime" label="检查时间" align="center" width="100"/>
                <el-table-column prop="maxCapacity" label="最大起重量" align="center" />
                <el-table-column prop="maxRange" label="幅度" align="center" />
                <el-table-column prop="installHeigth" label="安装高度" align="center" />
                <el-table-column prop="channels" label="附着道数" align="center" />
                <!--<el-table-column prop="checkResult" label="与建筑物水平中心距离" align="center" />-->
                <!--<el-table-column prop="maxRange" label="检查结果代号说明" align="center" />-->
                <el-table-column prop="userTime" label="使用单位填写时间" align="center" width="100"/>
                <el-table-column prop="checkUser" label="检查人员" align="center" />
                <el-table-column prop="conclusion" label="结论" align="center" />
                <el-table-column prop="reporttime" label="上报时间" align="center" width="100"/>
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail5(scope.row)">查看</el-button>
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
                <el-table-column prop="devid" label="设备编号" align="center" />
                <el-table-column prop="weibaotime" label="维保时间" width="200"/>
                <el-table-column prop="maxcapacity" label="运转台时" />
                <el-table-column prop="maxrange" label="更换主要零部件" />
                <!-- <el-table-column prop="leftheight" label="维管负责人" />
                <el-table-column prop="towerheight" label="维保人员" width="150" align="center" />
                <el-table-column prop="installheigth" label="维修（保养）内容" align="center" /> -->
                <el-table-column prop="installuseraqjg" label="监理单位审核意见" align="center" />
                <el-table-column prop="installuserzc" label="监理单位审核日期" align="center" width="200"/>
                <el-table-column prop="reporttime" label="上报时间" align="center" width="200"/>
                <el-table-column label="查看详情" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-view" @click="viewDetail6(scope.row)">查看</el-button>
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
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showUpload" :title="titles" width="60%">
      <div style="height: 55vh; overflow-y: scroll; ">
        <el-form :model="uploadInfo"  ref="uploadInfo" :rules="rules" label-width="1.5rem" v-show="tableShow === 'table1'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装id" >-->
<!--            <el-input v-model="uploadInfo.setupId" style="width: 50%" placeholder="请输入安装id"></el-input>-->
<!--          </el-form-item>-->
           <el-form-item label="设备编号" prop="devId">
            <el-select v-model="uploadInfo.devId" placeholder="请选择设备编号" style="width: 50%" @change="getItemInfo1">
              <el-option
                v-for="item in idsList"
                :key="item.devId"
                :label="`${item.devId}-${item.devName}`"
                :value="item.devId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工单位负责人" prop="userid">
            <el-select v-model="uploadInfo.userid" placeholder="请选择施工单位负责人" style="width: 50%">
              <el-option
                v-for="item in userOptions"
                :key="item.guid"
                :label="item.pname"
                :value="item.guid">
              </el-option>
            </el-select>
            <!--<el-input v-model="uploadInfo.userid" style="width: 50%" placeholder="请选择施工单位负责人"></el-input>-->
          </el-form-item>
          <el-form-item label="起升高度" prop="leftHeight">
            <el-input v-model="uploadInfo.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" prop="towerHeight">
            <el-input v-model="uploadInfo.towerHeight" style="width: 50%" placeholder="请输入塔高"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" prop="installHeigth">
            <el-input v-model="uploadInfo.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="最大载重量" prop="maxLoad">
            <el-input v-model="uploadInfo.maxLoad" style="width: 50%" placeholder="请输入最大载重量"></el-input>
          </el-form-item>
          <el-form-item label="检查时间" prop="checkTime">
            <el-date-picker v-model="uploadInfo.checkTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="安装单位负责人" prop="checkUser">
            <el-input v-model="uploadInfo.checkUser" placeholder="请输入安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位自检意见" prop="checkContent">
            <el-input v-model="uploadInfo.checkContent" type="textarea" placeholder="请输入安装单位自检意见" style="width: 70%; "></el-input>
          </el-form-item>
          <el-form-item label="检查填写时间" prop="checkWriteTime">
            <el-date-picker v-model="uploadInfo.checkWriteTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="安装单位技术负责人" prop="installUser">
            <el-input v-model="uploadInfo.installUser" placeholder="请输入安装单位技术负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位安全员、机管" prop="installUserAqjg">
            <el-input v-model="uploadInfo.installUserAqjg" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装班组长" prop="installUserZc">
            <el-input v-model="uploadInfo.installUserZc" placeholder="请输入安装班组长" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="机组人员" prop="installUserJzry">
            <el-input v-model="uploadInfo.installUserJzry" placeholder="请输入机组人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="填写时间" prop="writeTime">
            <el-date-picker v-model="uploadInfo.writeTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" prop="maxCapacity">
            <el-input v-model="uploadInfo.maxCapacity" placeholder="请输入最大起重量" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="幅度" prop="maxRange">
            <el-input v-model="uploadInfo.maxRange" placeholder="请输入幅度" style="width: 50%; "></el-input>
          </el-form-item>
          <el-row>
            <div class="divider">添加子项:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <!--<el-form-->
              <!--ref="uploadInfo"-->
              <!--:rules="uploadInfo.childData"-->
              <!--:inline="true"-->
              <!--:model="uploadInfo"-->
              <!--label-width="80px"-->
            <!--&gt;-->
              <!---->
            <!--</el-form>-->
            <div v-for="(item, index) in uploadInfo.childData" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px;padding-right: 20px">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="设备情况"
                    :prop="'uploadInfo.childData.' + index + '.dicid'"
                    :rules="{
                      required: true, message: 'ddicid不能为空', trigger: 'blur'
                      }"
                  >
                    <treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true" />
                    <!--<el-input v-model="item.diccode"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="测试结果"
                    :prop="'uploadInfo.childData.' + index + '.result'"
                    :rules="{required: true, message: '测试结果', trigger: 'blur'}"
                  >
                    <el-input v-model="item.result"  placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="检查人"
                    :prop="'uploadInfo.childData.' + index + '.checkUser'"
                    :rules="{
              required: true, message: '检查人', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.checkUser" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)" class="delButton"></el-button>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="12">
                  <el-form-item
                    label-width="130px"
                    label="存在的问题"
                    :prop="'form.monthChild.' + index + '.fourCode'"
                    :rules="{
            required: true, message: '存在的问题不能为空', trigger: 'blur'
            }"
                  >
                    <el-input v-model="item.fourCode" style="width: 350px"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-row>
          <el-form-item >
            <div style="float: right; margin-right: 10px; ">
              <el-button type="primary" @click="submitUpload('uploadInfo')" >提交</el-button>
              <el-button @click="resetForm('uploadInfo')">重置</el-button>
            </div>

          </el-form-item>

        </el-form>
        <el-form :model="uploadInfo2" ref="uploadInfo2" :rules="rules"  label-width="1.5rem" v-show="tableShow === 'table2'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo2.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装id" >-->
<!--            <el-input v-model="uploadInfo2.setupId" style="width: 50%" placeholder="请输入安装id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo2.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="设备编号" prop="devId">
            <el-select v-model="uploadInfo2.devId" placeholder="请选择设备编号" style="width: 50%" @change="getItemInfo2">
              <el-option
                v-for="item in idsList"
                :key="item.devId"
                :label="`${item.devId}-${item.devName}`"
                :value="item.devId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="施工单位负责人" prop="userid">
            <el-select v-model="uploadInfo2.userid" placeholder="请选择施工单位负责人" style="width: 50%">
              <el-option
                v-for="item in userOptions"
                :key="item.guid"
                :label="item.pname"
                :value="item.guid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起升高度" prop="leftHeight">
            <el-input v-model="uploadInfo2.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" prop="towerHeight">
            <el-input v-model="uploadInfo2.towerHeight" style="width: 50%" placeholder="请输入塔高"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" prop="installHeigth">
            <el-input v-model="uploadInfo2.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="最大载重量" prop="maxLoad">
            <el-input v-model="uploadInfo2.maxLoad" style="width: 50%" placeholder="请输入最大载重量"></el-input>
          </el-form-item>
          <el-form-item label="施工单位意见" prop="opinionSg">
            <el-input v-model="uploadInfo2.opinionSg" style="width: 50%" placeholder="请输入施工单位意见" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="施工单位项目经理签字" prop="userSg">
            <el-input v-model="uploadInfo2.userSg" style="width: 50%" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="时间"  prop="timeSg">
            <el-date-picker v-model="uploadInfo2.timeSg" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="监理单位意见" prop="opinionJl">
            <el-input v-model="uploadInfo2.opinionJl" style="width: 50%" placeholder="请输入监理单位意见" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="监理单位项目经理签字" prop="userJl">
            <el-input v-model="uploadInfo2.userJl" style="width: 50%" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="timeJl">
            <el-date-picker v-model="uploadInfo2.timeJl" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间" prop="reporttime">
            <el-date-picker v-model="uploadInfo2.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" prop="maxCapacity">
            <el-input v-model="uploadInfo2.maxCapacity" placeholder="请输入最大起重量" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="幅度" prop="maxRange">
            <el-input v-model="uploadInfo2.maxRange" placeholder="请输入幅度" style="width: 50%; "></el-input>
          </el-form-item>
          <el-row>
            <div class="divider">添加子项:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem2" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <div v-for="(item, index) in uploadInfo2.childData" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px;padding-right: 20px">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="设备情况"
                    :prop="'uploadInfo2.childData.' + index + '.dicid'"
                    :rules="{
                      required: true, message: 'ddicid不能为空', trigger: 'blur'
                      }"
                  >
                    <treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true" />
                    <!--<el-input v-model="item.diccode"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="测试结果"
                    :prop="'uploadInfo2.childData.' + index + '.result'"
                    :rules="{required: true, message: '测试结果', trigger: 'blur'}"
                  >
                    <el-input v-model="item.result"  placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="测试数据"
                    :prop="'uploadInfo2.childData.' + index + '.remarks'"
                    :rules="{
              required: true, message: '测试数据', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.remarks" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem2(item, index)"  class="delButton"></el-button>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="12">
                  <el-form-item
                    label-width="130px"
                    label="存在的问题"
                    :prop="'form.monthChild.' + index + '.fourCode'"
                    :rules="{
            required: true, message: '存在的问题不能为空', trigger: 'blur'
            }"
                  >
                    <el-input v-model="item.fourCode" style="width: 350px"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-row>
          <el-form-item>
            <div style="float: right; margin-right: 10px; ">
              <el-button type="primary" @click="submitUpload('uploadInfo2')">提交</el-button>
              <el-button @click="resetForm('uploadInfo2')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo3" ref="uploadInfo3" :rules="rules"  label-width="1.5rem" v-show="tableShow === 'table3'">

<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo3.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装单位id" >-->
<!--            <el-input v-model="uploadInfo3.installid" style="width: 50%" placeholder="安装单位id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo3.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="设备编号" prop="selectName">
            <el-select v-model="table3select" style="width: 50%" @change="table3UseId">
              <el-option
                v-for="(item, index) in idsList"
                :key="index"
                :label="`${item.devId}-${item.devName}`"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工单位负责人"  prop="selectUser">
            <el-select v-model="table3entSelect" placeholder="请选择施工单位负责人" @change="table3EntId" style="width: 50%">
              <el-option
                v-for="(item, index) in userOptions"
                :key="index"
                :label="item.pname"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附着道数" prop="leftHeight">
            <el-input v-model="uploadInfo3.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="当前已安装附着" prop="towerHeight">
            <el-input v-model="uploadInfo3.towerHeight" style="width: 50%" placeholder="当前已安装附着"></el-input>
          </el-form-item>
          <el-form-item label="当前标准节" prop="installHeigth">
            <el-input v-model="uploadInfo3.installHeigth" style="width: 50%" placeholder="请输入当前标准节"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" prop="maxLoad">
            <el-input v-model="uploadInfo3.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
<!--          <el-form-item label="企业id" prop="entid">-->
<!--            <el-input v-model="uploadInfo3.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="设备使用ID" prop="useId">-->
<!--            <el-input v-model="uploadInfo3.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="安装时间" prop="installtime">
            <el-date-picker v-model="uploadInfo3.installtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="顶升后高度" prop="checkTime">
            <el-input v-model="uploadInfo3.checkTime" style="width: 50%" placeholder="请输入顶升后高度" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="附着间距" prop="spacing">
            <el-input v-model="uploadInfo3.spacing" style="width: 50%" placeholder="请输入附着间距"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" prop="installUserZcs">
            <el-date-picker v-model="uploadInfo3.installUserZcs" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间" prop="reporttime">
            <el-date-picker v-model="uploadInfo3.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="与建筑物水平中心距离" prop="maxCapacity">
            <el-input v-model="uploadInfo3.maxCapacity" placeholder="请输入与建筑物水平中心距离" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="原安装臂铰点（自由端）高度" prop="maxRange">
            <el-input v-model="uploadInfo3.maxRange" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="是否附着" prop="checkUser">
            <el-input v-model="uploadInfo3.checkUser" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位负责人" prop="installmanager">
            <el-input v-model="uploadInfo3.installmanager" placeholder="安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="installphone">
            <el-input v-model="uploadInfo3.installphone" placeholder="请输入联系电话" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="现场专业技术人员" prop="checkContent">
            <el-input v-model="uploadInfo3.checkContent" placeholder="请输入现场专业技术人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包单位审核意见" prop="checkWriteTime">
            <el-input v-model="uploadInfo3.checkWriteTime" placeholder="请输入施工总承包单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" prop="installUserAqjg">
            <el-input v-model="uploadInfo3.installUserAqjg" placeholder="请输入监理单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包审核日期" prop="installUser">
            <el-date-picker v-model="uploadInfo3.installUser" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-row>
            <div class="divider">添加子项:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem3" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <div v-for="(item, index) in uploadInfo3.childData" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px;padding-right: 20px">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="人员列表"
                  >
                    <el-select v-model="selectValue3[index].select" placeholder="请选择" @change="selectPeople3(index)">
                      <el-option
                        v-for="(item, i) in peopleDetail3"
                        :key="index"
                        :label="`${item.pname}-${item.guid}`"
                        :value="i"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
<!--                  <el-form-item-->
<!--                    label-width="100px"-->
<!--                    label="人员id"-->
<!--                    :prop="'uploadInfo3.childData.' + index + '.personid'"-->
<!--                    :rules="{-->
<!--                      required: true, message: '人员id', trigger: 'blur'-->
<!--                    }"-->
<!--                  >-->
<!--                    &lt;!&ndash;<treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 200px"/>&ndash;&gt;-->
<!--                    <el-input v-model="item.personid"></el-input>-->
<!--                  </el-form-item>-->
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="姓名"
                    :prop="'uploadInfo3.childData.' + index + '.name'"
                    :rules="{required: true, message: '姓名', trigger: 'blur'}"
                  >
                    <el-input v-model="item.name"  placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="作业工种"
                    :prop="'uploadInfo3.childData.' + index + '.pspec'"
                    :rules="{
              required: true, message: '作业工种', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.pspec" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="身份证"
                    :prop="'uploadInfo3.childData.' + index + '.pcode'"
                    :rules="{
              required: true, message: '身份证', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.pcode" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="作业证号"
                    :prop="'uploadInfo3.childData.' + index + '.qualifiCode'"
                    :rules="{
              required: true, message: '作业证号', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.qualifiCode" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem3(item, index)" class="delButton"></el-button>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item
                    label-width="130px"
                    label="存在的问题"
                    :prop="'form.monthChild.' + index + '.fourCode'"
                    :rules="{
            required: true, message: '存在的问题不能为空', trigger: 'blur'
            }"
                  >
                    <el-input v-model="item.fourCode" style="width: 350px"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-row>
          <el-form-item>
            <div style="float: right; margin-right: 10px; ">
              <el-button type="primary" @click="submitUpload('uploadInfo3')">提交</el-button>
              <el-button @click="resetForm('uploadInfo3')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo4" ref="uploadInfo4" :rules="rules"  label-width="1.5rem" v-show="tableShow === 'table4'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo4.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="安装单位id" >-->
<!--            <el-input v-model="uploadInfo4.installid" style="width: 50%" placeholder="安装单位id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo4.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="设备名称" prop="selectName">
            <el-select v-model="table4select" style="width: 50%" @change="table4UseId">
              <el-option
                v-for="(item, index) in idsList"
                :key="index"
                :label="`${item.devId}-${item.devName}`"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工单位负责人"  prop="selectUser">
            <el-select v-model="table4entSelect" placeholder="请选择施工单位负责人" @change="table4EntId" style="width: 50%">
              <el-option
                v-for="(item, index) in userOptions"
                :key="index"
                :label="item.pname"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附着道数" prop="leftHeight">
            <el-input v-model="uploadInfo4.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="当前已安装附着" prop="towerHeight">
            <el-input v-model="uploadInfo4.towerHeight" style="width: 50%" placeholder="当前已安装附着"></el-input>
          </el-form-item>
          <el-form-item label="当前标准节" prop="installHeigth">
            <el-input v-model="uploadInfo4.installHeigth" style="width: 50%" placeholder="请输入当前标准节"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" prop="maxLoad">
            <el-input v-model="uploadInfo4.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
<!--          <el-form-item label="企业id" prop="entid">-->
<!--            <el-input v-model="uploadInfo4.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="设备使用ID" prop="useId">-->
<!--            <el-input v-model="uploadInfo4.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="安装时间" prop="installtime">
            <el-date-picker v-model="uploadInfo4.installtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="顶升后高度" prop="checkTime">
            <el-input v-model="uploadInfo4.checkTime" style="width: 50%" placeholder="请输入顶升后高度" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="附着间距" prop="spacing">
            <el-input v-model="uploadInfo4.spacing" style="width: 50%" placeholder="请输入附着间距"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" prop="installUserZcs">
            <el-date-picker v-model="uploadInfo4.installUserZcs" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间时间" prop="reporttime">
            <el-date-picker v-model="uploadInfo4.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="与建筑物水平中心距离" prop="maxCapacity">
            <el-input v-model="uploadInfo4.maxCapacity" placeholder="请输入与建筑物水平中心距离" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="原安装臂铰点（自由端）高度" prop="maxRange">
            <el-input v-model="uploadInfo4.maxRange" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="是否附着" prop="checkUser">
            <el-input v-model="uploadInfo4.checkUser" placeholder="请输入内容" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="安装单位负责人" prop="installmanager">
            <el-input v-model="uploadInfo4.installmanager" placeholder="安装单位负责人" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="installphone">
            <el-input v-model="uploadInfo4.installphone" placeholder="请输入联系电话" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="现场专业技术人员" prop="checkContent">
            <el-input v-model="uploadInfo4.checkContent" placeholder="请输入现场专业技术人员" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包单位审核意见" prop="checkWriteTime">
            <el-input v-model="uploadInfo4.checkWriteTime" placeholder="请输入施工总承包单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" prop="installUserAqjg">
            <el-input v-model="uploadInfo4.installUserAqjg" placeholder="请输入监理单位审核意见" style="width: 50%; "></el-input>
          </el-form-item>
          <el-form-item label="施工总承包审核日期" prop="installUser">
            <el-date-picker v-model="uploadInfo4.installUser" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-row>
            <div class="divider">添加子项:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem4" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <div v-for="(item, index) in uploadInfo4.childData" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px;padding-right: 20px">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="人员列表"
                  >
                    <el-select v-model="selectValue4[index].select" placeholder="请选择" @change="selectPeople4(index)">
                      <el-option
                        v-for="(item, i) in peopleDetail4"
                        :key="index"
                        :label="`${item.pname}-${item.guid}`"
                        :value="i"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
<!--                  <el-form-item-->
<!--                    label-width="100px"-->
<!--                    label="人员id"-->
<!--                    :prop="'uploadInfo4.childData.' + index + '.personid'"-->
<!--                    :rules="{-->
<!--                      required: true, message: '人员id', trigger: 'blur'-->
<!--                      }"-->
<!--                  >-->
<!--                    &lt;!&ndash;<treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 200px"/>&ndash;&gt;-->
<!--                    <el-input v-model="item.personid"></el-input>-->
<!--                  </el-form-item>-->
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="姓名"
                    :prop="'uploadInfo4.childData.' + index + '.name'"
                    :rules="{required: true, message: '姓名', trigger: 'blur'}"
                  >
                    <el-input v-model="item.name"  placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="作业工种"
                    :prop="'uploadInfo4.childData.' + index + '.pspec'"
                    :rules="{
              required: true, message: '作业工种', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.pspec" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="身份证"
                    :prop="'uploadInfo4.childData.' + index + '.pcode'"
                    :rules="{
              required: true, message: '身份证', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.pcode" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="作业证号"
                    :prop="'uploadInfo4.childData.' + index + '.qualifiCode'"
                    :rules="{
              required: true, message: '作业证号', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.qualifiCode" placeholder="请输入内容" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem4(item, index)" class="delButton"></el-button>
                </el-col>
                <!-- <el-col :span="12">
                  <el-form-item
                    label-width="130px"
                    label="存在的问题"
                    :prop="'form.monthChild.' + index + '.fourCode'"
                    :rules="{
            required: true, message: '存在的问题不能为空', trigger: 'blur'
            }"
                  >
                    <el-input v-model="item.fourCode" style="width: 350px"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-row>
          <el-form-item>
            <div style="float: right; margin-right: 10px; ">
              <el-button type="primary" @click="submitUpload('uploadInfo4')">提交</el-button>
              <el-button @click="resetForm('uploadInfo4')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo5"  ref="uploadInfo5" :rules="rules" label-width="1.5rem" v-show="tableShow === 'table5'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo5.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo5.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="设备名称" prop="selectName">
            <el-select v-model="table5select" style="width: 50%" @change="table5UseId">
              <el-option
                v-for="(item, index) in idsList"
                :key="index"
                :label="`${item.devId}-${item.devName}`"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工单位负责人"  prop="selectUser">
            <el-select v-model="table5entSelect" placeholder="请选择施工单位负责人" @change="table5EntId" style="width: 50%">
              <el-option
                v-for="(item, index) in userOptions"
                :key="index"
                :label="item.pname"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起升高度" prop="leftHeight">
            <el-input v-model="uploadInfo5.leftHeight" style="width: 50%" placeholder="请输入起升高度"></el-input>
          </el-form-item>
          <el-form-item label="塔高" prop="towerHeight">
            <el-input v-model="uploadInfo5.towerHeight" style="width: 50%" placeholder="塔高"></el-input>
          </el-form-item>
          <el-form-item label="新安装标准节" prop="maxLoad">
            <el-input v-model="uploadInfo5.maxLoad" style="width: 50%" placeholder="请输入新安装标准节"></el-input>
          </el-form-item>
<!--          <el-form-item label="企业id" >-->
<!--            <el-input v-model="uploadInfo5.entid" style="width: 50%" placeholder="请输入企业id" type="textarea"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="设备使用ID" >-->
<!--            <el-input v-model="uploadInfo5.useId" style="width: 50%" placeholder="请输入内容设备使用ID"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="检查时间" prop="checkTime">
            <el-date-picker v-model="uploadInfo5.checkTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="最大起重量" prop="maxCapacity">
            <el-input v-model="uploadInfo5.maxCapacity" style="width: 50%" placeholder="请输入最大起重量" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="幅度" prop="maxRange">
            <el-input v-model="uploadInfo5.maxRange" style="width: 50%" placeholder="请输入幅度"></el-input>
          </el-form-item>
          <el-form-item label="安装高度" prop="installHeigth">
            <el-input v-model="uploadInfo5.installHeigth" style="width: 50%" placeholder="请输入安装高度"></el-input>
          </el-form-item>
          <el-form-item label="附着道数" prop="channels">
            <el-input v-model="uploadInfo5.channels" style="width: 50%" placeholder="请输入附着道数"></el-input>
          </el-form-item>
          <el-form-item label="检查结果代号说明" prop="checkResult">
            <el-input v-model="uploadInfo5.checkResult" style="width: 50%" placeholder="请输入检查结果代号说明"></el-input>
          </el-form-item>
          <el-form-item label="使用单位意见" prop="userContent">
            <el-input v-model="uploadInfo5.userContent" style="width: 50%" placeholder="请输入使用单位意见"></el-input>
          </el-form-item>
          <el-form-item label="使用单位填写时间" prop="userTime">
            <el-date-picker v-model="uploadInfo5.userTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="检查人员" prop="checkUser">
            <el-input v-model="uploadInfo5.checkUser" style="width: 50%" placeholder="请输入检查人员"></el-input>
          </el-form-item>
          <el-form-item label="结论" prop="conclusion">
            <el-input v-model="uploadInfo5.conclusion" style="width: 50%" placeholder="请输入结论"></el-input>
          </el-form-item>
          <el-form-item label="上报时间" prop="reporttime">
            <el-date-picker v-model="uploadInfo5.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-row>
            <div class="divider">添加子项:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem5" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <div v-for="(item, index) in uploadInfo5.childData" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px;padding-right: 20px">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="110px"
                    label="定期检查数据"
                    :prop="'uploadInfo5.childData.' + index + '.dicid'"
                    :rules="{
                      required: true, message: '定期检查数据', trigger: 'blur'
                      }"
                  >
                    <treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true"   @input="getSelectList(index, item)"/>
                    <!--<el-input v-model="item.diccode"></el-input>-->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="结果"
                    :prop="'uploadInfo5.childData.' + index + '.result'"
                    :rules="{required: true, message: '结果', trigger: 'blur'}"
                  >
                    <el-input v-model="item.result" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label-width="100px"
                    label="备注"
                    :prop="'uploadInfo5.childData.' + index + '.remarks'"
                    :rules="{
              required: true, message: '备注', trigger: 'blur'
              }"
                  >
                    <el-input v-model="item.remarks" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem5(item, index)" class="delButton" ></el-button>
                </el-col>
              </el-row>
              <el-row>
                <!-- <el-col :span="12">
                  <el-form-item
                    label-width="130px"
                    label="存在的问题"
                    :prop="'form.monthChild.' + index + '.fourCode'"
                    :rules="{
            required: true, message: '存在的问题不能为空', trigger: 'blur'
            }"
                  >
                    <el-input v-model="item.fourCode" style="width: 350px"></el-input>
                  </el-form-item>
                </el-col> -->
              </el-row>
            </div>
          </el-row>
          <el-form-item>
            <div style="float: right; margin-right: 10px; ">
              <el-button type="primary" @click="submitUpload('uploadInfo5')">提交</el-button>
              <el-button @click="resetForm('uploadInfo5')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-form :model="uploadInfo6" ref="uploadInfo6" :rules="rules"  label-width="1.5rem" v-show="tableShow === 'table6'">
<!--          <el-form-item label="设备id" >-->
<!--            <el-input v-model="uploadInfo6.devid" style="width: 50%" placeholder="请输入设备id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="使用id" >-->
<!--            <el-input v-model="uploadInfo6.useId" style="width: 50%" placeholder="请输入使用id"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="当前登录人id" >-->
<!--            <el-input v-model="uploadInfo6.userid" style="width: 50%" placeholder="请输入当前登录人id"></el-input>-->
<!--          </el-form-item>-->

          <el-form-item label="设备编号" prop="devid">
            <el-select v-model="uploadInfo6.devid" placeholder="请选择设备编号" style="width: 50%" @change="getItemInfo6">
              <el-option
                v-for="item in idsList"
                :key="item.devId"
                :label="`${item.devId}-${item.devName}`"
                :value="item.devId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工单位负责人"  prop="userid">
            <el-select v-model="uploadInfo6.userid" placeholder="请选择施工单位负责人" style="width: 50%">
              <el-option
                v-for="item in userOptions"
                :key="item.guid"
                :label="item.pname"
                :value="item.guid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维保时间" prop="weibaotime">
            <el-date-picker v-model="uploadInfo6.weibaotime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="运转台时" prop="maxcapacity">
            <el-input v-model="uploadInfo6.maxcapacity" style="width: 50%" placeholder="请输入运转台时"></el-input>
          </el-form-item>
          <el-form-item label="更换主要零部件" prop="maxrange">
            <el-input v-model="uploadInfo6.maxrange" style="width: 50%" placeholder="请输入更换主要零部件"></el-input>
          </el-form-item>

          <el-form-item label="维管负责人" prop="leftheight">
            <el-input v-model="uploadInfo6.leftheight" style="width: 50%" placeholder="请输入维管负责人"></el-input>
          </el-form-item>
          <el-form-item label="维保人员" prop="towerheight">
            <el-input v-model="uploadInfo6.towerheight" style="width: 50%" placeholder="维保人员"></el-input>
          </el-form-item>
          <el-form-item label="维修（保养）内容" prop="installheigth">
            <el-input v-model="uploadInfo6.installheigth" style="width: 50%" placeholder="请输入维修（保养）内容"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核意见" prop="installuseraqjg">
            <el-input v-model="uploadInfo6.installuseraqjg" style="width: 50%" placeholder="请输入监理单位审核意见"></el-input>
          </el-form-item>
          <el-form-item label="监理单位审核日期" prop="installuserzc">
            <el-date-picker v-model="uploadInfo6.installuserzc" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />
          </el-form-item>
          <el-form-item label="上报时间" prop="reporttime">
            <el-date-picker v-model="uploadInfo6.reporttime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd"  style="width: 50%; " />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpload('uploadInfo6')">提交</el-button>
            <el-button @click="resetForm('uploadInfo6')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--<el-dialog :visible.sync="showEdit" title="修改文件" width="40%">-->
      <!--<div>-->
        <!--<el-form :model="currentInfo" :rules="rules" ref="currentInfo" label-width="1.5rem">-->
          <!--<el-form-item label="文件名称" prop="name">-->
            <!--<el-input v-model="currentInfo.name" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="文件类型" prop="type">-->
            <!--<el-select v-model="currentInfo.type" placeholder="请选择文件类型" style="width: 50%; ">-->
              <!--<el-option label="文件" value="文件" />-->
              <!--<el-option label="图片" value="图片" />-->
              <!--<el-option label="视频" value="视频" />-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="文件描述" prop="description">-->
            <!--<el-input type="textarea" v-model="currentInfo.description" style="width: 90%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="上传日期" prop="uploadTime">-->
            <!--<el-date-picker v-model="currentInfo.uploadTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />-->
          <!--</el-form-item>-->
          <!--<el-form-item label="上传人" prop="uploader">-->
            <!--<el-input v-model="currentInfo.uploader" placeholder="请输入上传人" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitEdit('currentInfo')">提交修改</el-button>-->
            <!--<el-button @click="showEdit = false">取消</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <el-dialog :visible.sync="view1" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail1.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位负责人
          </td>
          <td>
            {{ detail1.checkUser }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位自检意见
          </td>
          <td>
            {{ detail1.checkContent }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            检查时间
          </td>
          <td>
            {{ detail1.checkTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            检查填写时间
          </td>
          <td>
            {{ detail1.checkWriteTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位技术负责人
          </td>
          <td>
            {{ detail1.installUser }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位安全员、机管
          </td>
          <td>
            {{ detail1.installUserAqjg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装班组长
          </td>
          <td>
            {{ detail1.installUserZc }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            机组人员
          </td>
          <td>
            {{ detail1.installUserJzry }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            填写时间
          </td>
          <td>
            {{ detail1.writeTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            起升高度
          </td>
          <td>
            {{ detail1.leftHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            塔高
          </td>
          <td>
            {{ detail1.towerHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装高度
          </td>
          <td>
            {{ detail1.installHeigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大载重量
          </td>
          <td>
            {{ detail1.maxLoad }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大起重量
          </td>
          <td>
            {{ detail1.maxCapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            幅度
          </td>
          <td>
            {{ detail1.maxRange }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="view2" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail2.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工单位意见
          </td>
          <td>
            {{ detail2.opinionSg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工单位项目经理签字
          </td>
          <td>
            {{ detail2.userSg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            时间
          </td>
          <td>
            {{ detail2.timeSg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位意见
          </td>
          <td>
            {{ detail2.opinionJl }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位项目经理签字
          </td>
          <td>
            {{ detail2.userJl }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            上报时间时间
          </td>
          <td>
            {{ detail2.reporttime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            起升高度
          </td>
          <td>
            {{ detail2.leftHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            塔高
          </td>
          <td>
            {{ detail2.towerHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装高度
          </td>
          <td>
            {{ detail2.installHeigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大载重量
          </td>
          <td>
            {{ detail2.maxLoad }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大起重量
          </td>
          <td>
            {{ detail2.maxCapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            幅度
          </td>
          <td>
            {{ detail2.maxRange }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="view3" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail3.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            附着道数
          </td>
          <td>
            {{ detail3.leftHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            当前已安装附着
          </td>
          <td>
            {{ detail3.towerHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            当前标准节
          </td>
          <td>
            {{ detail3.installHeigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            新安装标准节
          </td>
          <td>
            {{ detail3.maxLoad }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            企业id
          </td>
          <td>
            {{ detail3.entid }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            设备使用ID
          </td>
          <td>
            {{ detail3.useId }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装时间
          </td>
          <td>
            {{ detail3.installtime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            顶升后高度
          </td>
          <td>
            {{ detail3.checkTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            附着间距
          </td>
          <td>
            {{ detail3.spacing }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核日期
          </td>
          <td>
            {{ detail3.installUserZcs }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            上报时间
          </td>
          <td>
            {{ detail3.reporttime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            与建筑物水平中心距离
          </td>
          <td>
            {{ detail3.maxCapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            原安装臂铰点（自由端）高度
          </td>
          <td>
            {{ detail3.maxRange }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            是否附着
          </td>
          <td>
            {{ detail3.checkUser }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位负责人
          </td>
          <td>
            {{ detail3.installmanager }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            联系电话
          </td>
          <td>
            {{ detail3.installphone }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            现场专业技术人员
          </td>
          <td>
            {{ detail3.checkContent }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工总承包单位审核意见
          </td>
          <td>
            {{ detail3.checkWriteTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核意见
          </td>
          <td>
            {{ detail3.installUserAqjg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工总承包审核日期
          </td>
          <td>
            {{ detail3.installUser }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="view4" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail4.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            附着道数
          </td>
          <td>
            {{ detail4.leftHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            当前已安装附着
          </td>
          <td>
            {{ detail4.towerHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            原附着点处高度
          </td>
          <td>
            {{ detail4.installHeigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            新安装附着
          </td>
          <td>
            {{ detail4.maxLoad }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装时间
          </td>
          <td>
            {{ detail4.installtime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            新附着点处高度
          </td>
          <td>
            {{ detail4.checkTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            附着间距
          </td>
          <td>
            {{ detail4.spacing }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核日期
          </td>
          <td>
            {{ detail4.installUserZcs }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            上报时间
          </td>
          <td>
            {{ detail4.reporttime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            与建筑物水平中心距离
          </td>
          <td>
            {{ detail4.maxCapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            原安装臂铰点（自由端）高度
          </td>
          <td>
            {{ detail4.maxRange }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            是否原厂附着
          </td>
          <td>
            {{ detail4.checkUser }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装单位负责人
          </td>
          <td>
            {{ detail4.installmanager }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            联系电话
          </td>
          <td>
            {{ detail4.installphone }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            现场专业技术人员
          </td>
          <td>
            {{ detail4.checkContent }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工总承包单位审核意见
          </td>
          <td>
            {{ detail4.checkWriteTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核意见
          </td>
          <td>
            {{ detail4.installUserAqjg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            施工总承包审核日期
          </td>
          <td>
            {{ detail4.installUser }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="view5" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail5.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            起升高度
          </td>
          <td>
            {{ detail5.leftHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            塔高
          </td>
          <td>
            {{ detail5.towerHeight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            安装高度
          </td>
          <td>
            {{ detail5.installHeigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大载重量
          </td>
          <td>
            {{ detail5.maxLoad }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            检查时间
          </td>
          <td>
            {{ detail5.checkTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            最大起重量
          </td>
          <td>
            {{ detail5.maxCapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            幅度
          </td>
          <td>
            {{ detail5.maxRange }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            附着道数
          </td>
          <td>
            {{ detail5.channels }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            检查结果代号说明
          </td>
          <td>
            {{ detail5.checkResult }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            使用单位意见
          </td>
          <td>
            {{ detail5.userContent }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            使用单位填写时间
          </td>
          <td>
            {{ detail5.userTime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            检查人员
          </td>
          <td>
            {{ detail5.checkUser }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            结论
          </td>
          <td>
            {{ detail5.conclusion }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            上报时间
          </td>
          <td>
            {{ detail5.reporttime }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="view6" title="查看详情">
      <table class="tableClass">
        <tr>
          <td class="tableHead">
            ID
          </td>
          <td>
            {{ detail6.id }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            维保时间
          </td>
          <td>
            {{ detail6.weibaotime }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            运转台时
          </td>
          <td>
            {{ detail6.maxcapacity }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            更换主要零部件
          </td>
          <td>
            {{ detail6.maxrange }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            维管负责人
          </td>
          <td>
            {{ detail6.leftheight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            维保人员
          </td>
          <td>
            {{ detail6.towerheight }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            维修（保养）内容
          </td>
          <td>
            {{ detail6.installheigth }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核意见
          </td>
          <td>
            {{ detail6.installuseraqjg }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            监理单位审核日期
          </td>
          <td>
            {{ detail6.installuserzc }}
          </td>
        </tr>
        <tr>
          <td class="tableHead">
            上报时间
          </td>
          <td>
            {{ detail6.reporttime }}
          </td>
        </tr>
      </table>
    </el-dialog>
    <el-dialog :visible.sync="showAdd3" title="顶升加节自检" width="60%">
      <el-form v-model="addForm3.dsData" ref="addForm3" label-width="200px">
        <el-form-item label="检查时间" prop="checkTime">
          <el-date-picker
            v-model="addForm3.dsData.checkTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装单位自检意见" prop="opinionAz">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm3.dsData.opinionAz">
          </el-input>
        </el-form-item>
        <el-form-item label="自检负责人" prop="userAz">
          <el-input placeholder="请输入自检负责人" v-model="addForm3.dsData.userAz"></el-input>
        </el-form-item>
        <el-form-item label="自检日期" prop="timeAz">
          <el-date-picker
            v-model="addForm3.dsData.timeAz"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装单位技术负责人" prop="installUser">
          <el-input placeholder="请输入安装单位技术负责人" v-model="addForm3.dsData.installUser"></el-input>
        </el-form-item>
        <el-form-item label="安装单位安全员、机管员" prop="installUserAqjg">
          <el-input placeholder="请输入安装单位安全员、机管员" v-model="addForm3.dsData.installUserAqjg"></el-input>
        </el-form-item>
        <el-form-item label="安装班组长" prop="installUserZc">
          <el-input placeholder="请输入安装班组长" v-model="addForm3.dsData.installUserZc"></el-input>
        </el-form-item>
        <el-form-item label="机组人员" prop="installUserJzry">
          <el-input placeholder="请输入机组人员" v-model="addForm3.dsData.installUserJzry"></el-input>
        </el-form-item>
        <el-form-item label="填写日期" prop="writeTime">
          <el-date-picker
            v-model="addForm3.dsData.writeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div>
        <span style="font-size: 18px; ">顶升加节自检子项</span>
        <el-button @click="addForm3childData" type="primary" icon="el-icon-plus" round style="margin-left: 20px; ">增加</el-button>
      </div>
      <el-form v-model="addForm3.dsData.childData" ref="form3childData" :inline="true" style="width:100%;">
        <div v-for="(item, index) in addForm3.childData" :key="index" style="margin-top: 10px; ">
          <el-row>
            <el-form-item
            label="检查项"
            :prop="'addForm3.childData.' + index + '.dicid'"
          >
            <treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 486px; "  />
          </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
               <el-form-item
                label="检查结果"
                :prop="'addForm3.childData.' + index + '.result'"
              >
                <el-input v-model="item.result" placeholder="请输入检查结果"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="检查人"
                :prop="'addForm3.childData.' + index + '.checkUser'"
              >
                <el-input v-model="item.checkUser" placeholder="请输入检查人"></el-input>
              </el-form-item>
            </el-col>
           
          </el-row>
          
          
          <el-form-item>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteChildData3(item, index)"></el-button>
          </el-form-item>
          <el-divider></el-divider>
        </div>
      </el-form>
      <div style="text-align: right;">
        <el-button type="primary" @click="submitAddForm3('addForm3')">提交</el-button>
        <el-button @click="cancelAdd">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showAdd4" title="附着验收" width="60%">
      <el-form v-model="addForm4.fzData" ref="addForm4" label-width="200px">
        <el-form-item label="安装单位验收意见" prop="opinionAz">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm4.fzData.opinionAz">
          </el-input>
        </el-form-item>
        <el-form-item label="安装单位验收人" prop="userAz">
          <el-input placeholder="请输入安装单位验收人" v-model="addForm4.fzData.userAz"></el-input>
        </el-form-item>
        <el-form-item label="安装单位日期" prop="timeAz">
          <el-date-picker
            v-model="addForm4.fzData.timeAz"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用单位验收意见" prop="opinionSy">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm4.fzData.opinionSy">
          </el-input>
        </el-form-item>
        <el-form-item label="使用单位验收人" prop="userSy">
          <el-input placeholder="请输入使用单位验收人" v-model="addForm4.fzData.userSy"></el-input>
        </el-form-item>
        <el-form-item label="使用单位日期" prop="timeSy">
          <el-date-picker
            v-model="addForm4.fzData.timeSy"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产权单位验收意见" prop="opinionCq">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm4.fzData.opinionCq">
          </el-input>
        </el-form-item>
        <el-form-item label="产权单位验收人" prop="userCq">
          <el-input placeholder="请输入产权单位验收人" v-model="addForm4.fzData.userCq"></el-input>
        </el-form-item>
        <el-form-item label="产权单位日期" prop="timeCq">
          <el-date-picker
            v-model="addForm4.fzData.timeCq"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="施工单位验收意见" prop="opinionSg">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm4.fzData.opinionSg">
          </el-input>
        </el-form-item>
        <el-form-item label="施工单位验收人" prop="userSg">
          <el-input placeholder="请输入施工单位验收人" v-model="addForm4.fzData.userSg"></el-input>
        </el-form-item>
        <el-form-item label="施工单位日期" prop="timeSg">
          <el-date-picker
            v-model="addForm4.fzData.timeSg"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="监理单位验收意见" prop="opinionJl">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addForm4.fzData.opinionJl">
          </el-input>
        </el-form-item>
        <el-form-item label="监理单位验收人" prop="userJl">
          <el-input placeholder="请输入监理单位验收人" v-model="addForm4.fzData.userJl"></el-input>
        </el-form-item>
        <el-form-item label="监理单位日期" prop="timeJl">
          <el-date-picker
            v-model="addForm4.fzData.timeJl"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div>
        <span style="font-size: 18px; ">附着验收子项</span>
        <el-button @click="addForm4childData" type="primary" icon="el-icon-plus" round style="margin-left: 20px; ">增加</el-button>
      </div>
      <el-form v-model="addForm4.childData" ref="form4childData" :inline="true">
        <div v-for="(item, i) in addForm4.childData" :key="i" style="margin-top: 10px; ">
          <el-row>
            <el-form-item
              label="检查项"
              :prop="'addForm4.childData.' + i + '.dicid'"
            >
              <treeselect v-model="item.dicid"  :options="options" :clearable="true" :show-count="true" :disable-branch-nodes="true" style="width: 486px; " />
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="检查结果"
                :prop="'addForm4.childData.' + i + '.result'"
              >
                <el-input v-model="item.result" placeholder="请输入检查结果"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="结论"
                :prop="'addForm3.childData.' + i + '.remarks'"
              >
                <el-input v-model="item.remarks" placeholder="请输入结论"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          
          
          <el-form-item>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteChildData4(item, index)"></el-button>
          </el-form-item>
          <el-divider></el-divider>
        </div>
      </el-form>
      <div style="text-align: right;">
        <el-button type="primary" @click="submitAddForm4('addForm4')">提交</el-button>
        <el-button @click="cancelAdd">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { zijian, addZijian,getSysProData,yanshou, addyanshou,weihu, addweihu, dingqi, adddingqi, dingsheng,adddingsheng,fuzhuo, addfuzhuo, devTreeSelect, getProid, getIds, getDevInfoByDevId } from "@/api/deviceManage";
  // import { getSysProData } from "@/api/qualityControl"
  import axios from 'axios'
  import {absyncAttachRecordCheckData, inJackingPlusRecordCheck} from "../../api/deviceManage";

  export default {
    components: { Treeselect },
    name: 'deviceOne',
    data() {
      return {
        idsList: [],
        siteId: '',
        proId: '',
        devName: '',
        fileTable: [],
        options: [],
        typeCode: '',
        titles: '建筑起重机械安装自检记录表',
        tableShow: 'table1',
        currentPage: 1,
        pageSize: 10,
        showUpload: false,
        userOptions: [],
        uploadInfo: {
          proid: '', // 项目id
          devid: undefined, // 设备id
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
          childData: []
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
          childData: []
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
          childData: []
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
          childData: []
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
          childData: [],
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
          // userid: [
          //   { required: true, message: '请选择施工单位负责人', trigger: 'change' }
          // ],
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
        detail1: {},
        detail2: {},
        detail3: {},
        detail4: {},
        detail5: {},
        detail6: {},
        view1: false,
        view2: false,
        view3: false,
        view4: false,
        view5: false,
        view6: false,
        entid: '',
        showAdd3: false,
        showAdd4: false,
        addForm3: {
          dsData: {
            testid: null,
            checkTime: null,
            opinionAz: '',
            userAz: '',
            timeAz: null,
            installUser: '',
            installUserAqjg: '',
            installUserZc: '',
            installUserJzry: '',
            writeTime: null,
          },
          childData: []
        },
        addForm4: {
          fzData: {
            fuid: null,  // 附着ID
            opinionAz: '',  // 安装单位验收意见
            userAz: '',  // 安装单位验收人
            timeAz: null,  // 安装单位日期
            opinionSy: '',  // 使用单位验收意见
            userSy: '',  // 使用单位验收人
            timeSy: null,  // 使用单位日期
            opinionCq: '',  // 产权单位验收意见
            userCq: '',  // 产权单位验收人
            timeCq: null,  // 产权单位日期
            opinionSg: '',  // 施工单位验收意见
            userSg: '',  // 施工单位验收人
            timeSg: null,  // 施工单位日期
            opinionJl: '',  // 监理单位验收意见
            userJl: '',  // 监理单位验收人
            timeJl: null,  // 监理单位日期
          },
          childData: []
        },
        table3select: null,
        table4select: null,
        table5select: null,
        table3entSelect: null,
        table4entSelect: null,
        table5entSelect: null,
        peopleDetail3: null,
        peopleDetail4: null,
        selectValue3: [],
        selectValue4: []
      }
    },
    mounted() {
      // this.getZiJian()
      var id = localStorage.getItem("siteId")
      this.siteId = id
      this.getAllData()
      this.devName = this.$route.params.devName
      this.getProidBySiteId()
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
          this.entid = res.data.guid
          this.getPeople()
          this.getZiJian()
        })
      },
      getZiJian() {
        zijian(this.uploadInfo.proid).then((res) => {
          if(res.data.code === 200) {
            this.fileTable = res.data.data.data
          } else {
            this.fileTable = []
          }

        })
      },
      getPeople() {
        var url = 'http://211.90.39.2:39912/WinsdomSite/Project/winsdomSite_QueryProjectPerson?proid=' + this.entid
        axios.get(url).then((res) => {
          if (res.data.code === 200) {
            this.userOptions = res.data.data
          } else {
            this.userOptions = []
          }
        })
      },
      getPeopleDetail3(entid) {
        var url = 'http://211.90.39.2:39912/newAj/device/queryPerson?entid=' + entid
        axios.get(url).then(res => {
          if (res.data.code === 200) {
            this.peopleDetail3 = res.data.data
          } else {
            this.$message.error(res.data.msg)
            return false
          }
        })
      },
      getPeopleDetail4(entid) {
        var url = 'http://211.90.39.2:39912/newAj/device/queryPerson?entid=' + entid
        axios.get(url).then(res => {
          if (res.data.code === 200) {
            this.peopleDetail4 = res.data.data
          } else {
            this.$message.error(res.data.msg)
            return false
          }
        })
      },
      getPeopleDetail5(entid) {
        var url = 'http://211.90.39.2:39912/newAj/device/queryPerson?entid=' + entid
        axios.get(url).then(res => {
          if (res.data.code === 200) {
            this.peopleDetail5 = res.data.data
          } else {
            this.$message.error(res.data.msg)
            return false
          }
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
        console.log("data", data)
        if(data.userid === null || data.userid == '') {
          this.$message.error('userid为空，提交错误');
          return;
        } 
        if(data.setupId === null || data.setupId === '') {
          this.$message.error('setupId为空，提交错误');
          return;
        }
        
        addZijian(data).then((res) => {
          if(res.data.code === 200) {
            console.log("测试",this.showUpload)
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
          if(res.data.code === 200) {
            this.fileTable = res.data.data.data
          } else {
            this.fileTable = []
          }
        })
      },
      getaddyanshou() {
        var data = this.uploadInfo2
        if(data.userid === null || data.userid == '') {
          this.$message.error('userid为空，提交错误');
          return;
        } 
        if(data.setupId === null || data.setupId === '') {
          this.$message.error('setupId为空，提交错误');
          return;
        }
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
        if(data.userid === null || data.userid == '') {
          this.$message.error('userid为空，提交错误');
          return;
        } 
        if(data.setupId === null || data.setupId === '') {
          this.$message.error('setupId为空，提交错误');
          return;
        }
        if(data.useId === null || data.useId === '') {
          this.$message.error('useId为空，提交错误');
          return;
        }
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
          if (res.data.code === 200) {
            this.fileTable = res.data.rows
          }else {
            this.fileTable = []
          }
        })
      },
      getadddingqi() {
        var data = this.uploadInfo5
        if (this.uploadInfo5.devid) {
          if (this.uploadInfo5.entid) {
            if (this.uploadInfo5.proid) {
              if (this.uploadInfo5.useId) {
                adddingqi(data).then((res) => {
                  if(res.data.code === 200) {
                    this.$message.success(res.data.msg)
                    this.getdingqi()
                    this.showUpload = false
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
              } else {
                this.$message.error('设备使用ID不能为空');
                return false;
              }
            } else {
              this.$message.error('项目ID不能为空');
              return false;
            }
          } else {
            this.$message.error('企业ID不能为空');
            return false;
          }
        } else {
          this.$message.error('设备ID不能为空');
          return false;
        }
      },
      getdingsheng() {
        dingsheng(this.uploadInfo3.proid).then((res) => {
          let rows = res.data.rows;
          let format_row = []
          for(let i=0;i<rows.length;i++) {
            format_row.push(rows[i].data)
          }
          for(let j=0;j<format_row.length;j++) {
            format_row[j]["devid"] = rows[j].devid;
            format_row[j]["devName"] = rows[j].devName;
          }
          this.fileTable = format_row;
        })
      },
      getadddingsheng() {
        if (this.uploadInfo3.devid) {
          if (this.uploadInfo3.entid) {
            if (this.uploadInfo3.proid) {
              if (this.uploadInfo3.useId) {
                adddingsheng(this.uploadInfo3).then((res) => {
                  if(res.data.code === 200) {
                    this.$message.success(res.data.msg)
                    this.getdingsheng()
                    this.showUpload = false
                  } else {
                    this.$message.error(res.data.msg);
                    return false;
                  }
                })
              } else {
                this.$message.error('设备使用ID不能为空');
                return false;
              }
            } else {
              this.$message.error('项目ID不能为空');
              return false;
            }
          } else {
            this.$message.error('企业ID不能为空');
            return false;
          }
        } else {
          this.$message.error('设备ID不能为空');
          return false;
        }

      },
      getfuzhuo() {
        fuzhuo(this.uploadInfo4.proid).then((res) => {
          this.fileTable = res.data.rows
        })
      },
      getaddfuzhuo() {
        var data = this.uploadInfo4
        if (this.uploadInfo4.devid) {
          if (this.uploadInfo4.entid) {
            if (this.uploadInfo4.proid) {
              if (this.uploadInfo4.useId) {
                addfuzhuo(data).then((res) => {
                  if(res.data.code === 200) {
                    this.$message.success(res.data.msg)
                    this.getfuzhuo()
                    this.showUpload = false
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
              } else {
                this.$message.error('设备使用ID不能为空');
                return false;
              }
            } else {
              this.$message.error('项目ID不能为空');
              return false;
            }
          } else {
            this.$message.error('企业ID不能为空');
            return false;
          }
        } else {
          this.$message.error('设备ID不能为空');
          return false;
        }
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
      },
      showAdd() {
        this.showUpload = true
        this.getKindsId()
      },
      viewDetail1(row) {
        this.detail1 = row;
        this.view1 = true;
      },
      viewDetail2(row) {
        this.detail2 = row;
        this.view2 = true;

      },
      viewDetail3(row) {
        this.detail3 = row;
        this.view3 = true;

      },
      viewDetail4(row) {
        this.detail4 = row;
        this.view4 = true;

      },
      viewDetail5(row) {
        this.detail5 = row;
        this.view5 = true;

      },
      viewDetail6(row) {
        this.detail6 = row;
        this.view6 = true;
      },
      getTreeselect() {
        var data = {
          typeCode: this.typeCode
        }
        devTreeSelect(data).then((response) => {
          if (response.data.code === 200) {
            this.options = response.data.data
          }
        });
      },
      addItem () {
        this.uploadInfo.childData.push({
          dicid: null,
          result: '', // 测试结果
          checkUser:'',  // 检查人
        })
        this.typeCode = 'AJB_DEV_INSTALLATION_RECORD'
        this.getTreeselect()
      },
      deleteItem (item, index) {
        this.uploadInfo.childData.splice(index, 1)
      },
      addItem2() {
        this.uploadInfo2.childData.push({
          dicid: null,
          result: '', // 测试结果
          remarks:'',  // 测试数据
        })
        this.typeCode = 'AJB_DEV_INSTALLATION_RECORD'
        this.getTreeselect()
      },
      addItem3() {
        this.uploadInfo3.childData.push({
          personid: null, // 人员ID
          name: '', // 姓名
          pspec: '',  // 作业工种
          pcode: '',  // 身份证号
          qualifiCode: ''  // 作业证号
        })
        this.selectValue3.push({select: ''})
        if (this.uploadInfo3.entid !== '') {
          this.getPeopleDetail3(this.uploadInfo3.entid);
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择施工单位负责人'
          })
        }
        // this.typeCode = 'AJB_DEV_INSTALLATION_RECORD'
        // this.getTreeselect()
      },
      deleteItem3(item, index) {
        this.uploadInfo3.childData.splice(index, 1)
      },
      deleteItem2 (item, index) {
        this.uploadInfo2.childData.splice(index, 1)
      },
      addItem4() {
        this.uploadInfo4.childData.push({
          personid: null, // 人员ID
          name: '', // 姓名
          pspec:'',  // 作业工种
          pcode:'',  // 身份证号
          qualifiCode:''  // 作业证号
        });
        this.selectValue4.push({select: ''})
        if (this.uploadInfo4.entid !== '') {
          this.getPeopleDetail4(this.uploadInfo4.entid);
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择施工单位负责人'
          })
        }
      },
      deleteItem4(item, index) {
        this.uploadInfo4.childData.splice(index, 1)
      },
      addItem5() {
        this.uploadInfo5.childData.push({
          dicid: null,
          result: '', // 测试结果
          remarks:'',  // 测试数据
        })
        this.typeCode = 'AJB_DEV_REGULAR_CHECK'
        this.getTreeselect()
      },
      deleteItem5 (item, index) {
        this.uploadInfo5.childData.splice(index, 1)
      },
      checkDetail3(row) {
        this.showAdd3 = true;
        this.addForm3.dsData.testid = row.id
      },
      checkDetail4(row) {
        this.showAdd4 = true;
        this.addForm4.fzData.fuid = row.id
      },
      submitAddForm3(formName) {
        inJackingPlusRecordCheck({
          dataJson: JSON.stringify(this.addForm3)
        }).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.cancelAdd();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      submitAddForm4(formName) {
        absyncAttachRecordCheckData({
          dataJson: JSON.stringify(this.addForm4)
        }).then(res => {
          if(res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.cancelAdd();
          } else {
            this.$message.error(res.data.msg);
          }
        })
      },
      cancelAdd() {
        this.showAdd3 = false
        this.addForm3 = {
          dsData: {
            testid: null,
            checkTime: null,
            opinionAz: '',
            userAz: '',
            timeAz: null,
            installUser: '',
            installUserAqjg: '',
            installUserZc: '',
            installUserJzry: '',
            writeTime: null,
          },
          childData: []
        }
        this.showAdd4 = false
        this.addForm4 = {
          fzData: {
            fuid: null,  // 附着ID
            opinionAz: '',  // 安装单位验收意见
            userAz: '',  // 安装单位验收人
            timeAz: null,  // 安装单位日期
            opinionSy: '',  // 使用单位验收意见
            userSy: '',  // 使用单位验收人
            timeSy: null,  // 使用单位日期
            opinionCq: '',  // 产权单位验收意见
            userCq: '',  // 产权单位验收人
            timeCq: null,  // 产权单位日期
            opinionSg: '',  // 施工单位验收意见
            userSg: '',  // 施工单位验收人
            timeSg: null,  // 施工单位日期
            opinionJl: '',  // 监理单位验收意见
            userJl: '',  // 监理单位验收人
            timeJl: null,  // 监理单位日期
          },
          childData: []
        }
      },
      addForm3childData() {
        this.addForm3.childData.push({
          dicid: null,
          result: '',
          checkUser: ''
        })
        this.typeCode = 'AJB_DEV_SELF_TEST'
        this.getTreeselect()
      },
      addForm4childData() {
        this.addForm4.childData.push({
          dicid: null,
          result: '',
          remarks: ''
        })
        this.typeCode = 'AJB_DEV_ATTACHED_ACCEPT'
        this.getTreeselect()
      },
      deleteChildData3 (item, index) {
        this.addForm3.childData.splice(index, 1)
      },
      deleteChildData4 (item, index) {
        this.addForm4.childData.splice(index, 1)
      },
      table3UseId() {
        this.uploadInfo3.devid = this.idsList[this.table3select].devId
        this.uploadInfo3.useId = this.idsList[this.table3select].useId
      },
      table3EntId() {
        this.uploadInfo3.entid = this.userOptions[this.table3entSelect].entid
        this.uploadInfo3.userid = this.userOptions[this.table3entSelect].guid
        if (this.uploadInfo3.entid !== '') {
          this.getPeopleDetail3(this.uploadInfo3.entid);
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择施工单位负责人'
          })
        }
      },
      table4UseId() {
        this.uploadInfo4.devid = this.idsList[this.table4select].devId
        this.uploadInfo4.useId = this.idsList[this.table4select].useId
      },
      table4EntId() {
        this.uploadInfo4.entid = this.userOptions[this.table4entSelect].entid
        this.uploadInfo4.userid = this.userOptions[this.table4entSelect].guid
        if (this.uploadInfo4.entid !== '') {
          this.getPeopleDetail4(this.uploadInfo4.entid);
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择施工单位负责人'
          })
        }
      },
      table5UseId() {
        this.uploadInfo5.devid = this.idsList[this.table5select].devId
        this.uploadInfo5.useId = this.idsList[this.table5select].useId
      },
      table5EntId() {
        this.uploadInfo5.entid = this.userOptions[this.table5entSelect].entid
        this.uploadInfo5.userid = this.userOptions[this.table5entSelect].guid
      },
      selectPeople3(index) {
        let currentPeople = this.peopleDetail3[this.selectValue3[index].select]
        this.uploadInfo3.childData[index].name = currentPeople.pname
        this.uploadInfo3.childData[index].personid = currentPeople.guid
        this.uploadInfo3.childData[index].pspec = currentPeople.pspec
        this.uploadInfo3.childData[index].pcode = currentPeople.pcode
        this.uploadInfo3.childData[index].qualifiCode = currentPeople.pcode
      },
      selectPeople4(index) {
        let currentPeople = this.peopleDetail4[this.selectValue4[index].select]
        this.uploadInfo4.childData[index].name = currentPeople.pname
        this.uploadInfo4.childData[index].personid = currentPeople.guid
        this.uploadInfo4.childData[index].pspec = currentPeople.pspec
        this.uploadInfo4.childData[index].pcode = currentPeople.pcode
        this.uploadInfo4.childData[index].qualifiCode = currentPeople.pcode
      },

      // 通过设备编号获取信息
      getProidBySiteId() {

        var params = {
          deptId: this.siteId
        }
        getProid(params).then((res) => {
          this.proId = res.data.guid
        })

      },

      getKindsId() {
        var params = {
          deptId: this.siteId,
          deviceName: this.devName
        }
        getIds(params).then((res) => {
          this.idsList = res.data.data.devData
        })
        
      },

      getItemInfo1(id) {
        
        this.getDetailInfo1(id)
        
      },
      getItemInfo2(id) {
        
        this.getDetailInfo2(id)
        
      },
      getItemInfo6(id) {
        
        this.getDetailInfo6(id)
        
      },
      getDetailInfo1(id) {
        getDevInfoByDevId(id).then((res) => {
          this.uploadInfo.proId = this.entid
          // this.uploadInfo.devId = res.data.data.guid
          this.uploadInfo.setupId = res.data.data.orgid
        })
      },
      getDetailInfo2(id) {
        getDevInfoByDevId(id).then((res) => {
          console.log("res2", res.data.data)
          this.uploadInfo2.proId = this.entid
          // this.uploadInfo.devId = res.data.data.guid
          this.uploadInfo2.setupId = res.data.data.orgid
        })
      },
      getDetailInfo6(id) {
        getDevInfoByDevId(id).then((res) => {
          console.log("res2", res.data.data)
          this.uploadInfo6.proId = this.entid
          // this.uploadInfo.devId = res.data.data.guid
          this.uploadInfo6.setupId = res.data.data.orgid
          this.uploadInfo6.useId = res.data.data.useId
        })
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

  .tableClass {
    width: 100%;
  }

  .tableClass td {
    width: 50%;
    text-align: center;
  }

  .tableClass tr {
    height: 30px;
  }

  .tableHead {
    color: #409eff;
  }
  .divider{
    border-bottom: dashed 1px #DCDFE6;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 16px;
    margin: 10px 0 20px 10px;
  }
  .delButton {
   float: right;
  }
</style>
