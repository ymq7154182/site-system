<template>
  <div class="cr-main">
    <ul>
      <li>
        <div>
          <el-button type="danger" icon="el-icon-back" @click="goBack">返回</el-button>
          <div style="float: right; ">
            <el-form :model="form" ref="form" label-width="80px" :inline="true">
              <el-form-item label="报警类型" >
                <el-select v-model="selectWarnType" placeholder="请选择" clearable @change="getType">
                  <el-option label="风速预警" value="风速预警"></el-option>
                  <el-option label="力矩预警" value="力矩预警"></el-option>
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
            <el-table-column prop="deviceId" label="设备编号" align="center" />
            <el-table-column prop="warnTime" align="center" label="报警时间"  />
            <el-table-column prop="warnType" align="center" label="报警类型" />
            <el-table-column prop="driverName" align="center" label="驾驶人" />
            <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
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

  
    <el-dialog :visible.sync="showUpload" title="详细信息" width="40%" >
      <div style="height: 55vh; overflow-y: scroll; ">

        <!-- <el-form :model="uploadInfo"  ref="uploadInfo" label-width="1.5rem">
          <el-form-item label="项目id:" :rules="[{ required: true, message: '内容不能为空'},{ type: 'number', message: 'id必须为数字值'}]" prop="proid">

            <span>{{uploadInfo.proid}}</span>
          </el-form-item>
           <el-form-item label="设备ID:"  prop="guid">
            <span>{{uploadInfo.guid}}</span>
          </el-form-item>
          <el-form-item label="设备编号:"  prop="deviceSn">
            <span>{{uploadInfo.deviceSn}}</span>
          </el-form-item>
          <el-form-item label="司机工号:" prop="idcard">

            <span>{{uploadInfo.idcard}}</span>
          </el-form-item>
          <el-form-item label="操作时间:" prop="operationTime">
            <span>{{uploadInfo.operationTime}}</span>
          </el-form-item>
          <el-form-item label="经度:" prop="lon">
            <span>{{uploadInfo.lon}}</span>
          </el-form-item>
          <el-form-item label="纬度:" prop="lat">
            <span>{{uploadInfo.lat}}</span>
          </el-form-item>
          <el-form-item label="高度(单位米):" prop="height">

            <span>{{uploadInfo.height}}</span>
          </el-form-item>
          <el-form-item label="幅度(单位米):" prop="amplitude">
            <span>{{uploadInfo.amplitude}}</span>
          </el-form-item>
          <el-form-item label="回转(单位度):" prop="rotary">

            <span>{{uploadInfo.rotary}}</span>
          </el-form-item>
          <el-form-item label="重量(单位吨):" prop="heavy">

            <span>{{uploadInfo.heavy}}</span>
          </el-form-item>
          <el-form-item label="风速(单位 m/s):" prop="windspeed">
            <span>{{uploadInfo.windspeed}}</span>
          </el-form-item>
          <el-form-item label="倾角 X(单位度):" prop="anglex">

            <span>{{uploadInfo.anglex}}</span>
          </el-form-item>
          <el-form-item label="倾角 Y(单位度):" prop="angley">

            <span>{{uploadInfo.angley}}</span>
          </el-form-item>
          <el-form-item label="额定力矩(单位焦耳):" prop="safetorque">

            <span>{{uploadInfo.safetorque}}</span>
          </el-form-item>
          <el-form-item label="安全起重量(单位吨):" prop="safeweight">

            <span>{{uploadInfo.safeweight}}</span>
          </el-form-item>
          <el-form-item label="倍率:" prop="currentrate">

            <span>{{uploadInfo.currentrate}}</span>
          </el-form-item>
          <el-form-item label="GPRS 信号质量:" prop="gprssignal">
            <span>{{uploadInfo.gprssignal}}</span>
          </el-form-item>
          <el-form-item label="控制状态:" prop="powerstatu">

            <span>{{uploadInfo.powerstatu}}</span>
          </el-form-item>
          <el-form-item label="传感器状态:" prop="sensorstatus">

            <span>{{uploadInfo.sensorstatus}}</span>
          </el-form-item>
          <el-form-item label="预警告码:" prop="warntype">

            <span>{{uploadInfo.warntype}}</span>
          </el-form-item>
          <el-form-item label="报警告码:" prop="alertflag">

            <span>{{uploadInfo.alertflag}}</span>
          </el-form-item>
          <el-form-item label="备案编号:" prop="deviceRegisterSn">
            <span>{{uploadInfo.deviceRegisterSn}}</span>
          </el-form-item>
          <el-form-item label="倾角:" prop="angle">
            <span>{{uploadInfo.angle}}</span>
          </el-form-item>
          <el-form-item label="有无执法意见:" prop="islawopinion">
            <span>{{uploadInfo.islawopinion}}</span>
          </el-form-item>
          <el-form-item label="驾驶人员姓名:" prop="uname">
            <span>{{uploadInfo.uname}}</span>
          </el-form-item>
          <el-form-item label="驾驶员身份证号码:" prop="uIdcardNo">
            <span>{{uploadInfo.uIdcardNo}}</span>
          </el-form-item>
          <el-form-item label="风级:" prop="windlevel">
            <span>{{uploadInfo.windlevel}}</span>
          </el-form-item>
          <el-form-item label="塔机高度:" prop="devheight">
            <span>{{uploadInfo.devheight}}</span>
          </el-form-item>
          <el-form-item label="吊钩高:" prop="dgheight">
            <span>{{uploadInfo.dgheight}}</span>
          </el-form-item>
          <el-form-item label="平衡臂长:" prop="balanceArmLength">
            <span>{{uploadInfo.balanceArmLength}}</span>
          </el-form-item>
          <el-form-item label="臂长:" prop="armLength">
            <span>{{uploadInfo.armLength}}</span>
          </el-form-item>
          <el-form-item label="当前力矩:" prop="currentTorque">
            <span>{{uploadInfo.currentTorque}}</span>
          </el-form-item>
          <el-form-item label="最大力矩:" prop="maxTorque">
            <span>{{uploadInfo.maxTorque}}</span>
          </el-form-item>
          
         


         
        </el-form> -->
        <el-form :model="uploadInfo"  ref="uploadInfo" label-width="1.5rem">
          <el-row>
            <!-- <el-col :span="12">
              <el-form-item label="设备id:" prop="guid">
                 <el-input v-model="uploadInfo.guid"  readonly='true'/>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="设备编号:" prop="deviceSn">
                 <el-input v-model="uploadInfo.deviceSn"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="最大力矩:" prop="maxTorque">
                 <el-input v-model="uploadInfo.maxTorque"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="司机工号:" prop="idcard">
                 <el-input v-model="uploadInfo.idcard"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作时间:" prop="operationTime">
                 <el-input v-model="uploadInfo.operationTime"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="经度:" prop="lon">
                 <el-input v-model="uploadInfo.lon"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纬度:" prop="lat">
                 <el-input v-model="uploadInfo.lat"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="高度(单位米):" prop="height">
                 <el-input v-model="uploadInfo.height"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="幅度(单位米):" prop="amplitude">
                 <el-input v-model="uploadInfo.amplitude"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="回转(单位度):" prop="rotary">
                 <el-input v-model="uploadInfo.rotary"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重量(单位吨):" prop="heavy">
                 <el-input v-model="uploadInfo.heavy"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="风速(单位 m/s):" prop="windspeed">
                 <el-input v-model="uploadInfo.windspeed"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="倾角 X(单位度):" prop="anglex">
                 <el-input v-model="uploadInfo.anglex"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="额定力矩(单位焦耳):" prop="safetorque">
                 <el-input v-model="uploadInfo.safetorque"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="倾角 Y(单位度):" prop="angley">
                 <el-input v-model="uploadInfo.angley"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="12">
              <el-form-item label="GPRS 信号质量:" prop="gprssignal">
                 <el-input v-model="uploadInfo.gprssignal"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="控制状态:" prop="powerstatu">
                 <el-input v-model="uploadInfo.powerstatu"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="传感器状态:" prop="sensorstatus">
                 <el-input v-model="uploadInfo.sensorstatus"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警告码:" prop="warntype">
                 <el-input v-model="uploadInfo.warntype"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="报警告码:" prop="alertflag">
                 <el-input v-model="uploadInfo.alertflag"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备案编号:" prop="deviceRegisterSn">
                 <el-input v-model="uploadInfo.deviceRegisterSn"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="倾角:" prop="angle">
                 <el-input v-model="uploadInfo.angle"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有无执法意见:" prop="islawopinion">
                 <el-input v-model="uploadInfo.islawopinion"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

           <el-row>
            <el-col :span="12">
              <el-form-item label="驾驶人员姓名:" prop="uname">
                 <el-input v-model="uploadInfo.uname"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶员身份证号码:" prop="uIdcardNo">
                 <el-input v-model="uploadInfo.uIdcardNo"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="风级:" prop="windlevel">
                 <el-input v-model="uploadInfo.windlevel"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="塔机高度:" prop="devheight">
                 <el-input v-model="uploadInfo.devheight"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="吊钩高:" prop="dgheight">
                 <el-input v-model="uploadInfo.dgheight"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="平衡臂长:" prop="balanceArmLength">
                 <el-input v-model="uploadInfo.balanceArmLength"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="臂长:" prop="armLength">
                 <el-input v-model="uploadInfo.armLength"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="当前力矩:" prop="currentTorque">
                 <el-input v-model="uploadInfo.currentTorque"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>
          
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item label="最大力矩:" prop="maxTorque">
                 <el-input v-model="uploadInfo.maxTorque"  readonly='true'/>
              </el-form-item>
            </el-col>
            
          </el-row> -->

  
          
      
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>



    <el-dialog :visible.sync="showUpload2" title="详细信息" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">

                
       
        
        <el-form :model="uploadInfo2"  ref="uploadInfo2" label-width="1.5rem">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备id:" prop="guid">
                 <el-input v-model="uploadInfo2.guid"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="黑匣子厂商编号:" prop="fsn">
                 <el-input v-model="uploadInfo2.fsn"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="接口请求key:" prop="reqkey">
                 <el-input v-model="uploadInfo2.reqkey"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="黑匣子出厂编号:" prop="hoistBoxId">
                 <el-input v-model="uploadInfo2.hoistBoxId"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="黑匣子备案编号:" prop="recordNumber">
                 <el-input v-model="uploadInfo2.recordNumber"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="轿厢后门门锁状态:" prop="beforeLockState">
                 <el-input v-model="uploadInfo2.beforeLockState"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="轿厢后门门锁状态:" prop="afterLockState">
                 <el-input v-model="uploadInfo2.afterLockState"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="倾角1（倾斜度1）:" prop="realTimeGradientOne">
                 <el-input v-model="uploadInfo2.realTimeGradientOne"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="倾角2（倾斜度2）:" prop="realTimeGradientTwo">
                 <el-input v-model="uploadInfo2.realTimeGradientTwo"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="倾角1（倾斜百分比1）:" prop="tiltPercentageOne">
                 <el-input v-model="uploadInfo2.tiltPercentageOne"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="倾角2（倾斜百分比1）:" prop="tiltPercentageTne">
                 <el-input v-model="uploadInfo2.tiltPercentageTne"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备运行轿厢内人数:" prop="realTimeNumberOfPeople">
                 <el-input v-model="uploadInfo2.realTimeNumberOfPeople"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="运行速度:" prop="windSpeed">
                 <el-input v-model="uploadInfo2.windSpeed"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运行方向:" prop="realTimeSpeedDirection">
                 <el-input v-model="uploadInfo2.realTimeSpeedDirection"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="实时数据产生时间:" prop="happenTime">
                 <el-input v-model="uploadInfo2.happenTime"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="轿厢运行高度（m）:" prop="realTimeHeight">
                 <el-input v-model="uploadInfo2.realTimeHeight"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="轿厢运行高度百分比（%）:" prop="heightPercentage">
                 <el-input v-model="uploadInfo2.heightPercentage"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="轿厢当前运行重量百分比（%）:" prop="weightPercentage">
                 <el-input v-model="uploadInfo2.weightPercentage"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="轿厢当前运行重量（t）:" prop="realTimeLiftingWeight">
                 <el-input v-model="uploadInfo2.realTimeLiftingWeight"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备运行状态:" prop="windState">
                 <el-input v-model="uploadInfo2.windState"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="报警原因:" prop="hoistAlarmReason">
                 <el-input v-model="uploadInfo2.hoistAlarmReason"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="报警级别:" prop="hoistLevel">
                 <el-input v-model="uploadInfo2.hoistLevel"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="驾驶人员姓名:" prop="driverName">
                 <el-input v-model="uploadInfo2.driverName"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶人员公民身份号码:" prop="driverIdcard">
                 <el-input v-model="uploadInfo2.driverIdcard"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="驾驶人员作业证编号:" prop="driverCertificateNumber">
                 <el-input v-model="uploadInfo2.driverCertificateNumber"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶人员身份认证结果:" prop="driverIdentificationState">
                 <el-input v-model="uploadInfo2.driverIdentificationState"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="驾驶人员作业证编号:" prop="driverCertificateNumber">
                 <el-input v-model="uploadInfo2.driverCertificateNumber"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶人员身份认证结果:" prop="driverIdentificationState">
                 <el-input v-model="uploadInfo2.driverIdentificationState"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="本次作业时间区间段:" prop="thisJobtime">
                 <el-input v-model="uploadInfo2.thisJobtime"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抓拍图片的URL:" prop="takeAPhotoUrl">
                 <el-input v-model="uploadInfo2.takeAPhotoUrl"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="本次作业时间区间段:" prop="thisJobtime">
                 <el-input v-model="uploadInfo2.thisJobtime"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抓拍图片的URL:" prop="takeAPhotoUrl">
                 <el-input v-model="uploadInfo2.takeAPhotoUrl"  readonly='true'/>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </el-dialog>


    
  </div>
</template>

<script>
import {getInfoByWarnType} from "../../api/qualityControl";
import {getSite} from "../../api/dataManage";
import { getHistroy, getCheckDetailById } from "@/api/deviceManage";

export default {
  name: 'greenHistory',
  mounted() {
    this.siteId = localStorage.getItem('siteId')
    this.devName = this.$route.params.devName
    if(this.devName === '塔式起重机') {
      this.showDialog = true
    } else {
      this.showDialog = false
    }
    this.getDevHistory()
   
  },
  data() {
    return {
      selectWarnType: '',
      showUpload2: false,
      showUpload: false,
      siteId: '',
      devName: '',
      constructionSiteId: 1,
      constructionSiteName: '',
      checkCode: null,
      historyRecord: [],
      currentPage: 1,
      pageSize: 10,
      form: {
        processStatus: null
      },

      uploadInfo: {
          proid: '', // 项目id
          guid: '', // 设备id
          createtime: '', // 创建时间
          deviceSn: '', // 设备编号
          idcard: '', // 司机工号
          operationTime: '', // 操作时间
          lon: '', // 经度,
          lat: '', // 纬度
          height: '', // 高度(单位米)
          amplitude: '', // 幅度(单位米)
          rotary: '', // 回转(单位度)
          heavy: '', // 重量(单位吨)
          windspeed: '', // 风速(单位 m/s)
          anglex: '', // 倾角 X(单位度)
          angley: '', // 倾角 Y(单位度)
          safetorque: '', // 额定力矩(单位焦耳)
          safeweight: '', // 安全起重量(单位吨)
          currentrate: '', // 倍率
          gprssignal: '', // GPRS 信号质量
          powerstatu: '', // 控制状态
          sensorstatus: '', // 传感器状态
          warntype: '', // 预警告码
          alertflag: '', // 报警告码
          deviceRegisterSn: '', // 备案编号
          angle: '', // 倾角
          islawopinion: '', // 有无执法意见 0无意见，1有意见,默认为0
          uname: '', // 驾驶人员姓名
          uIdcardNo: '', // 驾驶员身份证号码
          windlevel: '', // 风级
          devheight: '', // 塔机高度
          dgheight: '', // 吊钩高
          balanceArmLength: '', // 平衡臂长
          armLength: '', // 臂长
          currentTorque: '', // 当前力矩
          maxTorque: '', // 最大力矩
          todayAlarmCount: '', // 今日报警次数
        },
        uploadInfo2: {
          proid: '', // 项目id
          guid: '', // 设备id
          createtime: '', // 创建时间
          fsn: '', // 黑匣子厂商编号
          reqkey: '', // 接口请求key
          hoistBoxId: '', // 黑匣子出厂编号
          recordNumber: '', // 黑匣子备案编号,
          beforeLockState: '', // 轿厢后门门锁状态
          afterLockState: '', // 轿厢后门门锁状态
          realTimeGradientOne: '', // 倾角1（倾斜度1）
          realTimeGradientTwo: '', // 倾角2（倾斜度2）
          tiltPercentageOne: '', // 倾角1（倾斜百分比1）
          tiltPercentageTne: '', // 倾角2（倾斜百分比1）
          realTimeNumberOfPeople: '', // 设备运行轿厢内人数
          windSpeed: '', // 运行速度
          realTimeSpeedDirection: '', // 运行方向
          happenTime: '', // 实时数据产生时间
          realTimeHeight: '', // 轿厢运行高度（m）
          heightPercentage: '', // 轿厢运行高度百分比（%）
          weightPercentage: '', // 轿厢当前运行重量百分比（%）
          realTimeLiftingWeight: '', // 轿厢当前运行重量（t）
          windState: '', // 设备运行状态
          hoistAlarmReason: '', // 报警原因
          hoistLevel: '', // 报警级别
          driverName: '', // 驾驶人员姓名
          driverIdcard: '', // 驾驶人员公民身份号码
          driverCertificateNumber: '', // 驾驶人员作业证编号
          driverIdentificationState: '', // 驾驶人员身份认证结果
          thisJobtime: '', // 本次作业时间区间段
          takeAPhotoUrl: '', // 抓拍图片的URL
        },
    }
  },
  methods: {
    loadingTable() {
      getInfoByWarnType({
        warnType: this.selectWarnType
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    refreshTable() {
      getInfoByWarnType({
        warnType: this.selectWarnType
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getType(e) {
      this.selectWarnType = e
    },
    goBack() {
      this.$router.go(-1);
    },
    sumbitFilter(formName) {
      getInfoByWarnType({
        warnType: this.selectWarnType
      }).then(response => {
        if(response.data.code === 200) {
          this.historyRecord = response.data.rows;
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.selectWarnType = ''
      this.getDevHistory();
    },
    
    getDevHistory() {
      var params = {
        constructionSiteId: this.siteId,
        deviceType: this.devName
      }
      getHistroy(params).then((res) => {
        console.log(res)
        this.historyRecord = res.data.rows;
      })
    },
    
    showDetails(row) {
      console.log(row)
      var id = row.id
      if(this.devName === '塔式起重机') {
        this.showUpload = true
        this.showUpload2 = false
      } else {
        this.showUpload2 = true
        this.showUpload = false
      }
      
      this.getDeatilsInfo(id)
      
    },
    getDeatilsInfo(id) {
      getCheckDetailById(id).then((res) => {
        console.log("1233211234567", res.data.data.deviceTowerCrane)
        if(res.data.data.deviceTowerCrane !== null) {
          this.uploadInfo = res.data.data.deviceTowerCrane
        } else {
          this.uploadInfo2 = res.data.data.dcDeviceElevator
        }
        
      })
    }
    
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



.imageView {
  color: #409eff;
  text-decoration: none;
}

.imageView:hover {
  color: #79bbff;
}
</style>
