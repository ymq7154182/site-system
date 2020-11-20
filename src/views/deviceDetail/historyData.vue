<template>
  <div style="margin: 10px;padding-left: 0.3rem;padding-right: 0.3rem ">
    <div class="dm-main">
      <div class="border-top-right"></div>
      <div style="padding: 0.13rem;position: relative">
        <el-button type="success" @click="gotoback" size="mini"><i class="el-icon-d-arrow-left" />返回</el-button>
        <!--<el-button type="primary" @click="showUpload = true" size="mini"><i class="el-icon-plus" /> 新增</el-button>-->
        <!--<el-button type="success" @click="showUpload = true" size="mini"><i class="el-icon-edit" /> 修改</el-button>-->
        <!--<el-button type="danger" @click="showUpload = true" size="mini"><i class="el-icon-delete" /> 删除</el-button>-->
        <el-button type="warning" @click="extadiao" size="mini"><i class="el-icon-download" /> 导出</el-button>
        <span class="input-label">设备编号：</span><el-input placeholder="请输入设备编号" v-model="uploadInfo.deviceSn" class="input-style"></el-input>
        <span class="input-label">驾驶人姓名：</span><el-input placeholder="请输入驾驶人姓名" v-model="uploadInfo.uname" class="input-style"></el-input>
        <span class="input-label">传感器状态：</span><el-input placeholder="请输入传感器状态" v-model="uploadInfo.sensorstatus" class="input-style"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 0.2rem" @click="gettadiao">查询</el-button>
        <el-button type="danger" icon="el-icon-refresh" plain @click="resetSumbit">重置</el-button>
        <div class="titleTable">{{'塔式起重机历史记录'}}</div>
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
            <!--<el-table-column prop="name" label="设备名称" align="center" />-->
            <!--<el-table-column prop="type" label="设备编号" width="100" align="center" />-->
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column prop="guid" label="设备标识" />
            <el-table-column prop="deviceSn" label="设备编号" />

            <el-table-column prop="uname" label="驾驶人员姓名" />
            <el-table-column prop="sensorstatus" label="传感器状态" align="center" />
            <el-table-column prop="height" label="高度(单位米)" align="center" />
            <el-table-column prop="amplitude" label="幅度(单位米)" align="center" />
            <el-table-column prop="rotary" label="回转(单位度)" align="center" />
            <el-table-column prop="heavy" label="重量(单位吨)" align="center" />
            <el-table-column prop="windspeed" label="风速(单位 m/s)" align="center" />
            <el-table-column prop="anglex" label="倾角 X(单位度)" align="center" />
            <el-table-column prop="angley" label="倾角 Y(单位度)" align="center" />
            <el-table-column prop="safetorque" label="额定力矩(单位焦耳)" align="center" />
            <el-table-column prop="safeweight" label="倍率" align="center" />
            <el-table-column prop="operationTime" label="更新时间" width="120"/>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="showDetials(scope.row)"><i class="el-icon-goods" /> 查看详情</el-button>
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
    <el-dialog :visible.sync="showUpload" title="详细信息" width="40%">
      <div style="height: 55vh; overflow-y: scroll; ">

        <!--<el-form :model="uploadInfo"  ref="uploadInfo" label-width="1.5rem">-->
          <!--<el-form-item label="设备id" :rules="[{ required: true, message: '内容不能为空'},{ type: 'number', message: 'id必须为数字值'}]" prop="guid">-->
            <!--<el-input v-model.number="uploadInfo.guid" style="width: 50%" placeholder="请输入设备id"   autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="设备编号"  prop="deviceSn">-->
            <!--<el-input v-model="uploadInfo.deviceSn" style="width: 50%" placeholder="请输入设备编号"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="司机工号" prop="idcard">-->
            <!--<el-input v-model="uploadInfo.idcard" style="width: 50%" placeholder="请输入司机工号"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="操作时间" prop="operationTime">-->
            <!--<el-date-picker v-model="uploadInfo.operationTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" value-format="yyyy-MM-dd" style="width: 50%; " />-->
          <!--</el-form-item>-->
          <!--<el-form-item label="经度" prop="lon">-->
            <!--<el-input v-model="uploadInfo.lon" style="width: 50%" placeholder="请输入经度"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="纬度" prop="lat">-->
            <!--<el-input v-model="uploadInfo.lat" style="width: 50%" placeholder="请输入纬度"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="高度(单位米)" prop="height">-->
            <!--<el-input v-model="uploadInfo.height" style="width: 50%" placeholder="请输入高度(单位米)"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="幅度(单位米)" prop="amplitude">-->
            <!--<el-input v-model="uploadInfo.amplitude" style="width: 50%" placeholder="请输入幅度(单位米)"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="回转(单位度)" prop="rotary">-->
            <!--<el-input v-model="uploadInfo.rotary" style="width: 50%" placeholder="请输入幅度(单位米)"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="重量(单位吨)" prop="heavy">-->
            <!--<el-input v-model="uploadInfo.heavy" placeholder="请输入重量(单位吨)" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="风速(单位 m/s)" prop="windspeed">-->
            <!--<el-input v-model="uploadInfo.windspeed" type="textarea" placeholder="请输入风速(单位 m/s)" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="倾角 X(单位度)" prop="anglex">-->
            <!--<el-input v-model="uploadInfo.anglex" type="textarea" placeholder="请输入倾角 X(单位度)" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="倾角 Y(单位度)" prop="angley">-->
            <!--<el-input v-model="uploadInfo.angley" placeholder="请输入倾角 Y(单位度)" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="额定力矩(单位焦耳)" prop="safetorque">-->
            <!--<el-input v-model="uploadInfo.safetorque" placeholder="请输入内容" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="安全起重量(单位吨)" prop="safeweight">-->
            <!--<el-input v-model="uploadInfo.safeweight" placeholder="请输入安全起重量(单位吨)" style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="倍率" prop="currentrate">-->
            <!--<el-input v-model="uploadInfo.currentrate" placeholder="请输入倍率"  style="width: 50%"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="GPRS 信号质量" prop="gprssignal">-->
            <!--<el-input v-model="uploadInfo.gprssignal" placeholder="请输入GPRS 信号质量" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="控制状态" prop="powerstatu">-->
            <!--<el-input v-model="uploadInfo.powerstatu" placeholder="请输入控制状态" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="传感器状态" prop="sensorstatus">-->
            <!--<el-input v-model="uploadInfo.sensorstatus" placeholder="请输入传感器状态" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="预警告码" prop="warntype">-->
            <!--<el-input v-model="uploadInfo.warntype" placeholder="请输入预警告码" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="报警告码" prop="alertflag">-->
            <!--<el-input v-model="uploadInfo.alertflag" placeholder="请输入报警告码" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="备案编号" prop="deviceRegisterSn">-->
            <!--<el-input v-model="uploadInfo.deviceRegisterSn" placeholder="请输入备案编号" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="倾角" prop="angle">-->
            <!--<el-input v-model="uploadInfo.angle" placeholder="请输入倾角" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="有无执法意见" prop="islawopinion">-->
            <!--<el-radio-group v-model="uploadInfo.islawopinion">-->
              <!--<el-radio label="0">无意见</el-radio>-->
              <!--<el-radio label="1">有意见</el-radio>-->
            <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="驾驶人员姓名" prop="uname">-->
            <!--<el-input v-model="uploadInfo.uname" placeholder="请输入驾驶人员姓名" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="驾驶员身份证号码" prop="uIdcardNo">-->
            <!--<el-input v-model="uploadInfo.uIdcardNo" placeholder="请输入驾驶员身份证号码" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="风级" prop="windlevel">-->
            <!--<el-input v-model="uploadInfo.windlevel" placeholder="请输入风级" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="塔机高度" prop="devheight">-->
            <!--<el-input v-model="uploadInfo.devheight" placeholder="请输入塔机高度" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="吊钩高" prop="dgheight">-->
            <!--<el-input v-model="uploadInfo.dgheight" placeholder="请输入吊钩高" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="平衡臂长" prop="balanceArmLength">-->
            <!--<el-input v-model="uploadInfo.balanceArmLength" placeholder="请输入平衡臂长" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="臂长" prop="armLength">-->
            <!--<el-input v-model="uploadInfo.armLength" placeholder="请输入臂长" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="当前力矩" prop="currentTorque">-->
            <!--<el-input v-model="uploadInfo.currentTorque" placeholder="请输入当前力矩" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="最大力矩" prop="maxTorque">-->
            <!--<el-input v-model="uploadInfo.maxTorque" placeholder="请输入最大力矩" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="今日报警次数" prop="todayAlarmCount">-->
            <!--<el-input v-model="uploadInfo.todayAlarmCount" placeholder="请输入今日报警次数" style="width: 50%; "></el-input>-->
          <!--</el-form-item>-->


          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitUpload('uploadInfo')">提交</el-button>-->
            <!--<el-button @click="resetForm('uploadInfo')">重置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <el-form :model="uploadInfo"  ref="uploadInfo" label-width="1.5rem">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备标识:" prop="guid">
                 <el-input v-model="uploadInfo.guid"  readonly='true'/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备编号:" prop="deviceSn">
                 <el-input v-model="uploadInfo.deviceSn"  readonly='true'/>
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
          
          <el-row>
            <el-col :span="24">
              <el-form-item label="最大力矩:" prop="maxTorque">
                 <el-input v-model="uploadInfo.maxTorque"  readonly='true'/>
              </el-form-item>
            </el-col>
            
          </el-row>

  
          
       
         
          
         
          <!--<el-form-item label="今日报警次数:" prop="todayAlarmCount">-->
            <!--&lt;!&ndash;<el-input v-model="uploadInfo.todayAlarmCount" placeholder="请输入今日报警次数" style="width: 50%; "></el-input>&ndash;&gt;-->
            <!--<span>{{uploadInfo.todayAlarmCount}}</span>-->
          <!--</el-form-item>-->


          <!-- <el-form-item>
            <el-button type="primary" @click="showUpload = false">关闭</el-button>
          </el-form-item> -->
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
  </div>
</template>

<script>
  import { tadiao, addtadiao, getSysProData, exporttadiao } from "@/api/deviceManage";
  // import axios from 'axios'
  export default {
    data() {
      return {
        fileTable: [],
        numberValidateForm: {
          age: ''
        },
        tableShow: 'table1',
        currentPage: 1,
        pageSize: 10,
        siteId: '',
        showUpload: false,
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
          this.gettadiao()
        })
      },
      gettadiao() {
        tadiao(this.uploadInfo).then((res) => {
          if (res.data.code === 200) {
            this.fileTable = res.data.rows
            console.log(this.fileTable)
          }
        })
      },
      resetSumbit() {
        this.uploadInfo.deviceSn = ''
        this.uploadInfo.uname = ''
        this.uploadInfo.sensorstatus = ''
        this.gettadiao()
      },
      getaddtadiao() {
        var data = this.uploadInfo
        addtadiao(data).then((res) => {
          if (res.data.code === 200) {
            this.showUpload = false
            this.gettadiao()
            this.$message.success(res.data.msg)
            this.resetForm('uploadInfo')
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      extadiao() {
        var data = {
          proid: this.uploadInfo.proid
        }
        exporttadiao(data).then((res) => {
          if (res.data.code === 200) {
            window.location.href=res.data.msg
          } else {
            this.$message.error('操作失败！')
          }
        })
      },
      showDetials(row) {
        this.uploadInfo = row
        this.showUpload = true
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      submitUpload(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getaddtadiao()
          } else {
            console.log('error submit!!');
            return false;
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
