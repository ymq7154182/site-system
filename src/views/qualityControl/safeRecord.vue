<template>
  <div class="safeRecord">
    <el-row style="margin-top:0.3rem; " >
      <!--用户数据-->
      <el-col :span="24" :xs="24">
<!--        按钮部分-->
        <el-row :gutter="10" style="margin-bottom: 0.3rem;">
          <el-col :span="2">
            <el-button type="success" icon="el-icon-edit" size="mini"  @click="addRecord" >新增</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" >下载</el-button>
          </el-col>
<!--          搜索框-->
<!--          <el-col :span="6" :offset="12">-->
<!--            <div>-->
<!--              <el-input placeholder="请输入内容" v-model="input2">-->
<!--                <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--              </el-input>-->
<!--            </div>-->
<!--          </el-col>-->
        </el-row>
        <div >
          <!--        表格部分-->
          <el-table style="" v-loading="loading" :data="userList" @selection-change="handleSelectionChange"  border >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="项目名称" align="center" prop="proid" width="100"/>
            <el-table-column label="综合得分" align="center" prop="checkCode" :show-overflow-tooltip="true" width="200"/>
            <el-table-column label="检查人员" align="center" prop="checkUserName" :show-overflow-tooltip="true" width="200"/>
            <el-table-column label="自评结果" align="center" prop="selfResult" :show-overflow-tooltip="true" width="120"/>
            <el-table-column label="检查时间" align="center" prop="checkTime" width="200" />
<!--            <el-table-column label="检查员姓名" align="center" prop="checkUser" width="120" />-->
            <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width" >
              <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)"
                >详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="pageTotal>0" :total="pageTotal" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
        </div>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 查看对话框 -->
    <el-dialog title="查看" :visible.sync="opencheck" width="80%" append-to-body>
      <div style="overflow-y: scroll; height: 60vh; ">
        <el-form ref="checkForm" :model="checkForm"  label-width="80px" :disabled="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="奖惩情况" prop="situation" label-width="130px">
                <el-input v-model="checkForm.situation" placeholder="请输入奖惩情况" />
              </el-form-item>
            </el-col>
            <!--          <el-col :span="12">-->
            <!--            <el-form-item label="项目主键" prop="proid" label-width="130px">-->
            <!--              <el-input v-model="checkForm.proid" placeholder="请输入项目主键" />-->
            <!--            </el-form-item>-->
            <!--          </el-col>-->
            <el-col :span="12">
              <el-form-item label="考评时间" prop="evaltime" label-width="130px">
                <el-time-picker
                  v-model="checkForm.evaltime"
                  :picker-options="{
                selectableRange: '08:30:00 - 20:30:00'
                }"
                  placeholder="请输入考评时间">
                </el-time-picker>
                <!--              <el-input v-model="form.evaltime" placeholder="请输入考评时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目进度" prop="progress" label-width="130px">
                <el-input v-model="checkForm.progress" placeholder="请输入项目进度" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="综合得分" prop="checkCode" label-width="130px">
                <el-input v-model="checkForm.checkcode" placeholder="请输入综合得分" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐患（条数）" prop="yhnum" label-width="130px">
                <el-input v-model="checkForm.yhnum" placeholder="请输入隐患条数" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自评结果" prop="selfresult" label-width="130px">
                <el-select v-model="checkForm.selfresult" placeholder="请选择自评结果">
                  <el-option v-for="(selfRecord,index) in selfRecords" :key="index" :label="selfRecord" :value="index"></el-option>
                </el-select>
                <!--              <el-input type="textarea"  v-model="form.selfRecord" placeholder="请输入自评结果" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人员" prop="checkuser" label-width="130px">
                <el-input v-model="checkForm.checkuser" placeholder="请输入检查人员" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="checktime" label-width="130px">
                <el-time-picker
                  v-model="checkForm.checktime"
                  :picker-options="{
                selectableRange: '08:30:00 - 20:30:00'
                }"
                  placeholder="请输入检查时间">
                </el-time-picker>
                <!--              <el-input v-model="form.checkTime" placeholder="请输入检查时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="整改情况" prop="isrectify" label-width="130px">
                <el-select v-model="checkForm.isrectify" placeholder="请选择整改情况">
                  <el-option v-for="(isRectify,index) in isRectifies" :key="index" :label="isRectify[1]" :value="isRectify[0]"></el-option>
                </el-select>
                <!--              <el-input v-model="form.isRectify" placeholder="请输入整改情况" />-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改期限" prop="rectifytime" label-width="130px">
                <el-date-picker
                  v-model="checkForm.rectifytime"
                  type="datetime"
                  placeholder="请选择整改期限">
                </el-date-picker>
                <!--              <el-input v-model="form.rectifyTime" placeholder="请输入整改期限" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <!--        <el-row>-->
          <!--          <el-col :span="12">-->
          <!--            <el-form-item label="奖惩情况" prop="situation" label-width="130px">-->
          <!--              <el-input v-model="checkForm.situation" placeholder="请输入奖惩情况" />-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <!--        </el-row>-->
          <el-row>
            <el-col :span="21">
              <el-form-item label="项目自评意见" prop="selfrecord" label-width="130px">
                <el-input type="textarea" v-model="checkForm.selfrecord" placeholder="请输入自评意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目负责人" prop="selfuser" label-width="130px">
                <el-input v-model="checkForm.selfuser" placeholder="请输入负责人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自评时间" prop="selftime" label-width="130px">
                <el-time-picker
                  v-model="checkForm.selftime"
                  :picker-options="{
                selectableRange: '08:30:00 - 20:30:00'
                }"
                  placeholder="请输入自评时间">
                </el-time-picker>
                <!--              <el-input v-model="form.selfTime" placeholder="请输入自评时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业盖章页" prop="affixstamp" label-width="160px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="checkForm.affixstamp"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
<!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业机构按期检查" prop="affixorg" label-width="160px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="checkForm.affixorg"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
<!--                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                </el-upload>
                <!--              <el-input v-model="form.affixOrg" placeholder="请输入整改内容" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">建设单位:</div>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="检查意见" prop="jsrecord" label-width="130px">
                <el-input type="textarea" v-model="checkForm.jsrecord" placeholder="请输入检查意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="检查人" prop="jsuser" label-width="130px">
                <el-input v-model="checkForm.jsuser" placeholder="请输入检查人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="jstime" label-width="130px">
                <el-time-picker
                  v-model="checkForm.jstime"
                  :picker-options="{
                selectableRange: '08:30:00 - 20:30:00'
                }"
                  placeholder="请输入检查时间">
                </el-time-picker>
                <!--              <el-input v-model="form.jsTime" placeholder="请输入检查时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">监理单位:</div>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="检查意见" prop="jlrecord" label-width="130px">
                <el-input type="textarea" v-model="checkForm.jlrecord" placeholder="请输入检查意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人" prop="jluser" label-width="130px">
                <el-input v-model="checkForm.jluser" placeholder="请输入监理单位检查人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="jltime" label-width="130px">
                <el-time-picker
                  v-model="checkForm.jltime"
                  :picker-options="{
                selectableRange: '08:30:00 - 20:30:00'
                }"
                  placeholder="请输入检查时间">
                </el-time-picker>
                <!--              <el-input v-model="form.jlTime" placeholder="请输入监理单位检查时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">月报检查记录:</div>
          </el-row>
          <!--        <el-row>-->
          <!--          <el-button @click="addItem" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>-->
          <!--        </el-row>-->
          <el-row>
            <el-form
              :disabled="true"
              ref="checkForm"
              :rules="checkForm.monthChild"
              :inline="true"
              :model="checkForm"
              label-width="80px"
            >
              <div v-for="(item, index) in checkForm.monthChild" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="diccode"
                      :prop="'checkForm.monthChild.' + index + '.diccode'"
                      :rules="{
                      required: true, message: 'diccode不能为空', trigger: 'blur'
                      }"
                    >
                      <el-input v-model="item.diccode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查项"
                      :prop="'checkForm.monthChild.' + index + '.firstCode'"
                      :rules="{required: true, message: '检查项不能为空', trigger: 'blur'}"
                    >
                      <el-input v-model="item.firstCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查子项"
                      :prop="'checkForm.monthChild.' + index + '.secondCode'"
                      :rules="{
              required: true, message: '检查子项不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.secondCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label-width="130px"
                      label="检查部位及内容"
                      :prop="'checkForm.monthChild.' + index + '.threeCode'"
                      :rules="{
              required: true, message: '检查部位及内容不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.threeCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--                <el-col :span="2">-->
                  <!--                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)" ></el-button>-->
                  <!--                </el-col>-->
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="存在的问题"
                      :prop="'checkForm.monthChild.' + index + '.fourCode'"
                      :rules="{
              required: true, message: '存在的问题不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.fourCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="所扣分值"
                      :prop="'checkForm.monthChild.' + index + '.checkCode'"
                      :rules="{
              required: true, message: '所扣分值不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.checkCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="float: right; margin-right: 10px; ">
          <!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
          <el-button @click="cancelcheck">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog title="新增" :visible.sync="openadd" width="80%" append-to-body>
      <div style="overflow-y: scroll; height: 60vh; ">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目进度" prop="progress" label-width="130px">
                <el-input v-model="form.progress" placeholder="请输入项目进度" />
              </el-form-item>
            </el-col>

            <!--          <el-col :span="12">-->
            <!--            <el-form-item label="项目主键" prop="proid" label-width="130px">-->
            <!--              <el-input v-model="form.proid" placeholder="请输入项目主键" />-->
            <!--            </el-form-item>-->
            <!--          </el-col>-->
            <el-col :span="12">
              <el-form-item label="考评时间" prop="evaltime" label-width="130px">
                <el-date-picker
                  v-model="form.evaltime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="奖惩情况" prop="situation" label-width="130px">
                <el-input v-model="form.situation" placeholder="请输入奖惩情况" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="综合得分" prop="checkcode" label-width="130px">
                <el-input v-model="form.checkcode" placeholder="请输入综合得分" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="隐患（条数）" prop="yhnum" label-width="130px">
                <el-input v-model="form.yhnum" placeholder="请输入隐患条数" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自评结果" prop="selfresult" label-width="130px">
                <el-select v-model="form.selfresult" placeholder="请选择自评结果">
                  <el-option v-for="(selfRecord,index) in selfRecords" :key="index" :label="selfRecord" :value="index"></el-option>
                </el-select>
                <!--              <el-input type="textarea"  v-model="form.selfRecord" placeholder="请输入自评结果" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人员" prop="checkuser" label-width="130px">
                <el-input v-model="form.checkuser" placeholder="请输入检查人员" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="checktime" label-width="130px">
                <el-date-picker
                  v-model="form.checktime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="整改情况" prop="isrectify" label-width="130px">
                <el-select v-model="form.isrectify" placeholder="请选择整改情况">
                  <el-option v-for="(isRectify,index) in isRectifies" :key="index" :label="isRectify[1]" :value="isRectify[0]"></el-option>
                </el-select>
                <!--              <el-input v-model="form.isRectify" placeholder="请输入整改情况" />-->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="整改期限" prop="rectifytime" label-width="130px">
                <el-date-picker
                  v-model="form.rectifytime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--        <el-row>-->
          <!--          <el-col :span="12">-->
          <!--            <el-form-item label="奖惩情况" prop="situation" label-width="130px">-->
          <!--              <el-input v-model="form.situation" placeholder="请输入奖惩情况" />-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->
          <!--        </el-row>-->
          <el-row>
            <el-col :span="21">
              <el-form-item label="项目自评意见" prop="selfrecord" label-width="130px">
                <el-input type="textarea" v-model="form.selfrecord" placeholder="请输入自评意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目负责人" prop="selfuser" label-width="130px">
                <el-input v-model="form.selfuser" placeholder="请输入负责人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="自评时间" prop="selftime" label-width="130px">
                <el-date-picker
                  v-model="form.selftime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业盖章页" prop="affixstamp" label-width="160px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="form.affixstamp"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业机构按期检查" prop="affixorg" label-width="160px">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="form.affixorg"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <!--              <el-input v-model="form.affixOrg" placeholder="请输入整改内容" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">建设单位:</div>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="检查意见" prop="jsrecord" label-width="130px">
                <el-input type="textarea" v-model="form.jsrecord" placeholder="请输入检查意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

            <el-col :span="12">
              <el-form-item label="检查人" prop="jsuser" label-width="130px">
                <el-input v-model="form.jsuser" placeholder="请输入检查人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="jstime" label-width="130px">
                <el-date-picker
                  v-model="form.jstime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">监理单位:</div>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="检查意见" prop="jlrecord" label-width="130px">
                <el-input type="textarea" v-model="form.jlrecord" placeholder="请输入检查意见" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人" prop="jluser" label-width="130px">
                <el-input v-model="form.jluser" placeholder="请输入监理单位检查人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查时间" prop="jltime" label-width="130px">
                <el-date-picker
                  v-model="form.jltime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">月报检查记录:</div>
          </el-row>
          <el-row>
            <el-button @click="addItem" type="primary"  style="width: 200px;margin-bottom: 20px">增加</el-button>
          </el-row>
          <el-row>
            <el-form
              ref="form"
              :rules="form.monthChild"
              :inline="true"
              :model="form"
              label-width="80px"
            >
              <div v-for="(item, index) in form.monthChild" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="diccode"
                      :prop="'form.monthChild.' + index + '.diccode'"
                      :rules="{
                      required: true, message: 'diccode不能为空', trigger: 'blur'
                      }"
                    >
                      <el-input v-model="item.diccode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查项"
                      :prop="'form.monthChild.' + index + '.firstCode'"
                      :rules="{required: true, message: '检查项不能为空', trigger: 'blur'}"
                    >
                      <el-input v-model="item.firstCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查子项"
                      :prop="'form.monthChild.' + index + '.secondCode'"
                      :rules="{
              required: true, message: '检查子项不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.secondCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label-width="130px"
                      label="检查部位及内容"
                      :prop="'form.monthChild.' + index + '.threeCode'"
                      :rules="{
              required: true, message: '检查部位及内容不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.threeCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)" ></el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="存在的问题"
                      :prop="'form.monthChild.' + index + '.fourCode'"
                      :rules="{
              required: true, message: '存在的问题不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.fourCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="所扣分值"
                      :prop="'form.monthChild.' + index + '.checkCode'"
                      :rules="{
              required: true, message: '所扣分值不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.checkCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="float: right; margin-right: 10px; ">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="canceladd">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addMonthCheck,getAllCheckMonth,getCheckMonthData,getSafeAdminInfo} from '@/api/qualityControl';
export default {
  name: "safeRecord",
  data(){
    return{

      // 当前每页数据的条数
      pageSize:10,
      // 数据的总条数
      pageTotal:0,
      // 翻页功能当前页
      currentPage: 1,
      // 图片上传的弹出框
      dialogVisible:false,
      dialogImageUrl: '',
      disabled: false,
      // 遮罩层
      loading: true,
      // 用户表格数据
      userList: null,
      // 非单个禁用
      // single: true,
      // 是否显示添加弹出层
      openadd: false,
      // 是否显示查看弹出层
      opencheck: false,
      checkForm:{
        proid:null,
        evaltime:'',
        progress:'',
        checkcode:null,
        yhnum:null,
        selfresult:'',
        checkuser:'',
        checktime:'',
        isrectify:'',
        rectifytime:'',
        situation:'',
        selfrecord:'',
        selfuser:'',
        selftime:'',
        affixstamp:'',
        affixorg:[],
        jsrecord:'',
        jsuser:'',
        jstime:'',
        jlrecord:'',
        jluser:'',
        jltime:'',
        monthChild:[
          {
            diccode: '',
            firstCode: '',
            secondCode:'',
            threeCode:'',
            fourCode:'',
            checkCode:'',
          },
        ],
      },
      // 整改情况选择
      isRectifies:[['1','是'],['-1','否']],
      // 自评结果选择
      selfRecords:['优良','合格','不合格'],
      // 表单参数
      form: {
        proid:null,
        evaltime:'',
        progress:'',
        checkcode:null,
        yhnum:null,
        selfresult:'',
        checkuser:'',
        checktime:'',
        isrectify:'',
        rectifytime:'',
        situation:'',
        selfrecord:'',
        selfuser:'',
        selftime:'',
        affixstamp:'',
        affixorg:[],
        jsrecord:'',
        jsuser:'',
        jstime:'',
        jlrecord:'',
        jluser:'',
        jltime:'',
        monthChild:[],
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        time: undefined,
        deptId: undefined,
      },
      // 表单校验
      rules: {
        proid: [
          { required: true, message: "项目主键不能为空", trigger: "blur" },
        ],
        evaltime: [
          { required: true, message: "考评时间不能为空", trigger: "blur" },
        ],
        progress: [
          { required: true, message: "项目进度不能为空", trigger: "blur" },
        ],
        checkcode: [
          { required: true, message: "综合得分不能为空", trigger: "blur" },
        ],
        yhnum: [
          { required: true, message: "隐患数目不能为空", trigger: "blur" },
        ],
        selfresult: [
          { required: true, message: "自评结果不能为空", trigger: "blur" },
        ],
        checkuser: [
          { required: true, message: "检查人员不能为空", trigger: "blur" },
        ],
        checktime: [
          { required: true, message: "检查时间不能为空", trigger: "blur" },
        ],
        isrectify: [
          { required: true, message: "整改情况不能为空", trigger: "blur" },
        ],
        rectifytime: [
          { required: true, message: "整改期限不能为空", trigger: "blur" },
        ],
        situation: [
          { required: true, message: "奖惩情况不能为空", trigger: "blur" },
        ],
        selfrecord: [
          { required: true, message: "自评意见不能为空", trigger: "blur" },
        ],
        selfuser: [
          { required: true, message: "项目负责人不能为空", trigger: "blur" },
        ],
        selftime: [
          { required: true, message: "自评时间不能为空", trigger: "blur" },
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
    submitUpload(){},
    handlePreview(){},
    // 月报检查添加一组
    addItem () {
      this.form.monthChild.push({
        diccode: '',
        firstCode: '',
        secondCode:'',
        threeCode:'',
        fourCode:'',
        checkCode:'',
      })
    },
    // 月报检查删除一组
    deleteItem (item, index) {
      this.form.monthChild.splice(index, 1)
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true
      // 获取所有的月评信息
      // var total1 = 0
      // var total2 = 0
      getAllCheckMonth().then((res) => {
        this.userList = res.data.rows
        console.log("所有月评",this.userList)
        this.pageTotal += res.data.total
      })
      // 省安监接口
      // var prames={
      //   pageNo:5,
      //   pageSize:10,
      //   proid:35051,
      // }
      // getSafeAdminInfo(prames).then((res) => {
      //   pageTotal += res.data.total
      //   console.log("省安监的数据",res.data.data)
      // })
      // console.log(total1)
      // console.log(total2)
      // this.pageTotal = total1 + total2
      console.log("数据条数s",this.pageTotal)
      this.loading = false
    },
    // 新增按钮事件
    addRecord(){
      //this.reset()
      this.openadd = true
    },
    // 新增按钮的提交
    submitForm(){
      const prams1 = {
        proid:12345,
        evaltime:this.form.evaltime,
        progress :this.form.progress,
        checkcode:this.form.checkcode,
        yhnum:this.form.yhnum,
        selfresult:this.form.selfresult,
        checkuser:this.form.checkuser,
        checktime:this.form.checktime,
        isrectify:this.form.isrectify,
        rectifytime:this.form.rectifytime,
        situation:this.form.situation,
        selfrecord:this.form.selfrecord,
        selfuser:this.form.selfuser,
        selftime:this.form.selftime,
        affixstamp:this.form.affixstamp,
        affixorg:this.form.affixorg,
        jlrecord:this.form.jlrecord,
        jsuser:this.form.jsuser,
        jstime:this.form.jstime,
        jsrecord:this.form.jsrecord,
        jluser:this.form.jluser,
        jltime:this.form.jltime,
        //monthChild:this.form.monthChild,
      }
      addMonthCheck(prams1).then((res) => {
        if(res.data.code === 200){
          this.$message({
            message: '表单添加成功！',
            type: 'success'
          });
        }else{
          this.$message({
            message: '表单添加失败',
            type: 'warning'
          });
        }
      })
      console.log("yuepingzixiang",this.form.monthChild)
      for(var i=0;i<this.form.monthChild.length;i++){
        const prams2 = {
          // pid = row.id
          diccode:this.form.monthChild[i].diccode,
          firstCode:this.form.monthChild[i].firstCode,
          secondCode:this.form.monthChild[i].secondCode,
          threeCode:this.form.monthChild[i].threeCode,
          fourCode:this.form.monthChild[i].fourCode,
          checkCode:this.form.monthChild[i].checkCode,
        }
        addCheckMonthChild(prams2).then((res) => {
          if(res.data.code === 200){
            this.$message({
              message: '月报检查记录添加成功！',
              type: 'success'
            });
          }else{
            this.$message({
              message: '月报检查记录添加失败',
              type: 'warning'
            });
          }
        })
      }

      this.openadd = false

      // const prams = {
      //   proid:this.form.proid,
      //   evaltime:this.form.evaltime,
      //   progress :this.form.progress,
      //   checkCode:this.form.checkCode,
      //   yhNum:this.form.yhNum,
      //   selfResult:this.form.selfResult,
      //   checkUser:this.form.checkUser,
      //   checkTime:this.form.checkTime,
      //   isRectify:this.form.isRectify,
      //   rectifyTime:this.form.rectifyTime,
      //   situation:this.form.situation,
      //   selfRecord:this.form.selfRecord,
      //   selfUser:this.form.selfUser,
      //   selfTime:this.form.selfTime,
      //   affixStamp:this.form.affixStamp,
      //   affixOrg:this.form.affixOrg,
      //   jsRecord:this.form.jsRecord,
      //   jsUser:this.form.jsUser,
      //   jsTime:this.form.jsTime,
      //   jlRecord:this.form.jlRecord,
      //   jlUser:this.form.jlUser,
      //   jlTime:this.form.jlTime,
      //   monthChild:this.form.monthChild,
      // }
      // addMonth(prams).then(respone => {
      //   if(respone.data.code === 200){
      //     this.$message.success('上传成功！')
      //   }else {
      //   this.$message.error('上传失败！')
      // }
     // })
    },
    // 查看按钮事件
    handleView(row){
      console.log("chakan",row)
      var prams = {
        id:row.id
      }
      getCheckMonthData(prams).then((res) => {
        console.log("查看接口返回的数据",res.data.data)
        this.checkForm = res.data.data

      })
      this.opencheck = true
    },
    // 表单重置
    // reset() {
    //   form: {
    //       //proid=null;
    //       evaltime='';
    //       progress='';
    //       checkcode=null;
    //       yhnum=null;
    //       selfresult='';
    //       checkuser='';
    //       checktime='';
    //       isrectify='';
    //       rectifytime='';
    //       situation='';
    //       selfrecord='';
    //       selfuser='';
    //       selftime='';
    //       affixstamp='';
    //       affixorg=[];
    //       jsrecord='';
    //       jsuser='';
    //       jstime='';
    //       jlrecord='';
    //       jluser='';
    //       jltime='';
    //       monthChild=[];
    //   }
    // },
    /** 导出按钮操作 */
    handleExport(){
      const queryParams = this.queryParams
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportUser(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    // 取消按钮
    canceladd() {
      this.openadd = false;
      //this.reset();
    },
    // 取消按钮
    cancelcheck() {
      console.log("quxiao")
      this.opencheck = false;
      // this.reset();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 图片上传用到的方法
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      // this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更改数据条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
    },
    // 更改当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
    }
  },

}
</script>

<style scoped>
.safeRecord {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem .3rem;
}
.fixColor .el-form-item__label{
  color: white;
}
.divider{
  border-bottom: dashed 1px #DCDFE6;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0 20px 10px;
}
/*翻页*/
.block{
  float: right;
  margin-top: 20px;
}
.block >>> .el-pagination__total{
  color: white;
}
.block >>>.el-pagination__jump{
  color: white;
}
</style>

