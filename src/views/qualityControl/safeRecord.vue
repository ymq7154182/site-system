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
        </el-row>
<!--        表格部分-->
        <el-table style="" v-loading="loading" :data="userList" @selection-change="handleSelectionChange"  border >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="考评时间" align="center" prop="id" width="100"/>
          <el-table-column label="项目进度" align="center" prop="progress" :show-overflow-tooltip="true" width="200"/>
          <el-table-column label="综合得分" align="center" prop="checkCode" :show-overflow-tooltip="true" width="200"/>
          <el-table-column label="隐患数目" align="center" prop="yhNum" :show-overflow-tooltip="true" width="120"/>
          <el-table-column label="自评结果" align="center" prop="selfResult" width="120" />
          <el-table-column label="检查员姓名" align="center" prop="checkUser" width="120" />
          <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width" >
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
    <!-- 查看对话框 -->
    <el-dialog title="查看" :visible.sync="opencheck" width="960px" append-to-body>
      <el-form ref="checkForm" :model="checkForm" :rules="rules" label-width="80px" disabled="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目主键" prop="proid" label-width="130px">
              <el-input v-model="checkForm.proid" placeholder="请输入项目主键" />
            </el-form-item>
          </el-col>
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
            <el-form-item label="形象进度" prop="progress" label-width="130px">
              <el-input v-model="checkForm.progress" placeholder="请输入形象进度" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="综合得分" prop="checkCode" label-width="130px">
              <el-input v-model="checkForm.checkCode" placeholder="请输入综合得分" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="隐患（条数）" prop="yhNum" label-width="130px">
              <el-input v-model="checkForm.yhNum" placeholder="请输入隐患条数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自评结果" prop="selfRecord" label-width="130px">
              <el-select v-model="checkForm.selfRecord" placeholder="请选择自评结果">
                <el-option v-for="(selfRecord,index) in selfRecords" :key="index" :label="selfRecord" :value="index"></el-option>
              </el-select>
              <!--              <el-input type="textarea"  v-model="form.selfRecord" placeholder="请输入自评结果" />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查人员" prop="checkUser" label-width="130px">
              <el-input v-model="checkForm.checkUser" placeholder="请输入检查人员" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="checkTime" label-width="130px">
              <el-time-picker
                v-model="checkForm.checkTime"
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
            <el-form-item label="整改情况" prop="isRectify" label-width="130px">
              <el-select v-model="checkForm.isRectify" placeholder="请选择整改情况">
                <el-option v-for="(isRectify,index) in isRectifies" :key="index" :label="isRectify[1]" :value="isRectify[0]"></el-option>
              </el-select>
              <!--              <el-input v-model="form.isRectify" placeholder="请输入整改情况" />-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整改期限" prop="rectifyTime" label-width="130px">
              <el-date-picker
                v-model="checkForm.rectifyTime"
                type="datetime"
                placeholder="请选择整改期限">
              </el-date-picker>
              <!--              <el-input v-model="form.rectifyTime" placeholder="请输入整改期限" />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="奖惩情况" prop="situation" label-width="130px">
              <el-input v-model="checkForm.situation" placeholder="请输入奖惩情况" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="项目自评意见" prop="selfRecord" label-width="130px">
              <el-input type="textarea" v-model="checkForm.selfRecord" placeholder="请输入自评意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目负责人" prop="selfUser" label-width="130px">
              <el-input v-model="checkForm.selfUser" placeholder="请输入负责人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自评时间" prop="selfTime" label-width="130px">
              <el-time-picker
                v-model="checkForm.selfTime"
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
            <el-form-item label="附件_企业盖章页" prop="affixStamp" label-width="160px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="checkForm.affixStamp"
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
            <el-form-item label="附件_企业机构按期检查" prop="affixOrg" label-width="160px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="checkForm.affixOrg"
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
            <el-form-item label="检查意见" prop="jsRecord" label-width="130px">
              <el-input type="textarea" v-model="checkForm.jsRecord" placeholder="请输入检查意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="检查人" prop="jsUser" label-width="130px">
              <el-input v-model="checkForm.jsUser" placeholder="请输入检查人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="p_content" label-width="130px">
              <el-time-picker
                v-model="checkForm.jsTime"
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
            <el-form-item label="检查意见" prop="p_content" label-width="130px">
              <el-input type="textarea" v-model="checkForm.jlRecord" placeholder="请输入检查意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查人" prop="jlUser" label-width="130px">
              <el-input v-model="checkForm.jlUser" placeholder="请输入监理单位检查人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="jlTime" label-width="130px">
              <el-time-picker
                v-model="checkForm.jsTime"
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
            disabled
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
      <div slot="footer" class="dialog-footer">
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
        <el-button @click="cancelcheck">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog title="新增" :visible.sync="openadd" width="960px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目主键" prop="proid" label-width="130px">
              <el-input v-model="form.proid" placeholder="请输入项目主键" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考评时间" prop="evaltime" label-width="130px">
              <el-time-picker
                v-model="form.evaltime"
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
            <el-form-item label="形象进度" prop="progress" label-width="130px">
              <el-input v-model="form.progress" placeholder="请输入形象进度" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="综合得分" prop="checkCode" label-width="130px">
              <el-input v-model="form.checkCode" placeholder="请输入综合得分" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="隐患（条数）" prop="yhNum" label-width="130px">
              <el-input v-model="form.yhNum" placeholder="请输入隐患条数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自评结果" prop="selfRecord" label-width="130px">
              <el-select v-model="form.selfRecord" placeholder="请选择自评结果">
                <el-option v-for="(selfRecord,index) in selfRecords" :key="index" :label="selfRecord" :value="index"></el-option>
              </el-select>
              <!--              <el-input type="textarea"  v-model="form.selfRecord" placeholder="请输入自评结果" />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查人员" prop="checkUser" label-width="130px">
              <el-input v-model="form.checkUser" placeholder="请输入检查人员" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="checkTime" label-width="130px">
              <el-time-picker
                v-model="form.checkTime"
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
            <el-form-item label="整改情况" prop="isRectify" label-width="130px">
              <el-select v-model="form.isRectify" placeholder="请选择整改情况">
                <el-option v-for="(isRectify,index) in isRectifies" :key="index" :label="isRectify[1]" :value="isRectify[0]"></el-option>
              </el-select>
<!--              <el-input v-model="form.isRectify" placeholder="请输入整改情况" />-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整改期限" prop="rectifyTime" label-width="130px">
              <el-date-picker
                v-model="form.rectifyTime"
                type="datetime"
                placeholder="请选择整改期限">
              </el-date-picker>
<!--              <el-input v-model="form.rectifyTime" placeholder="请输入整改期限" />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="奖惩情况" prop="situation" label-width="130px">
              <el-input v-model="form.situation" placeholder="请输入奖惩情况" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item label="项目自评意见" prop="selfRecord" label-width="130px">
              <el-input type="textarea" v-model="form.selfRecord" placeholder="请输入自评意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目负责人" prop="selfUser" label-width="130px">
              <el-input v-model="form.selfUser" placeholder="请输入负责人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="自评时间" prop="selfTime" label-width="130px">
              <el-time-picker
                v-model="form.selfTime"
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
            <el-form-item label="附件_企业盖章页" prop="affixStamp" label-width="160px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="form.affixStamp"
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
            <el-form-item label="附件_企业机构按期检查" prop="affixOrg" label-width="160px">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="form.affixOrg"
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
            <el-form-item label="检查意见" prop="jsRecord" label-width="130px">
              <el-input type="textarea" v-model="form.jsRecord" placeholder="请输入检查意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="12">
            <el-form-item label="检查人" prop="jsUser" label-width="130px">
              <el-input v-model="form.jsUser" placeholder="请输入检查人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="p_content" label-width="130px">
              <el-time-picker
                v-model="form.jsTime"
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
            <el-form-item label="检查意见" prop="p_content" label-width="130px">
              <el-input type="textarea" v-model="form.jlRecord" placeholder="请输入检查意见" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="检查人" prop="jlUser" label-width="130px">
              <el-input v-model="form.jlUser" placeholder="请输入监理单位检查人" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查时间" prop="jlTime" label-width="130px">
              <el-time-picker
                v-model="form.jsTime"
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="canceladd">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "safeRecord",
  data(){
    return{
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
        checkCode:null,
        yhNum:null,
        selfResult:'',
        checkUser:'',
        checkTime:'',
        isRectify:'',
        rectifyTime:'',
        situation:'',
        selfRecord:'',
        selfUser:'',
        selfTime:'',
        affixStamp:'',
        affixOrg:[],
        jsRecord:'',
        jsUser:'',
        jsTime:'',
        jlRecord:'',
        jlUser:'',
        jlTime:'',
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
        checkCode:null,
        yhNum:null,
        selfResult:'',
        checkUser:'',
        checkTime:'',
        isRectify:'',
        rectifyTime:'',
        situation:'',
        selfRecord:'',
        selfUser:'',
        selfTime:'',
        affixStamp:'',
        affixOrg:[],
        jsRecord:'',
        jsUser:'',
        jsTime:'',
        jlRecord:'',
        jlUser:'',
        jlTime:'',
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
          { required: true, message: "形象进度不能为空", trigger: "blur" },
        ],
        checkCode: [
          { required: true, message: "综合得分不能为空", trigger: "blur" },
        ],
        yhNum: [
          { required: true, message: "隐患数目不能为空", trigger: "blur" },
        ],
        selfResult: [
          { required: true, message: "自评结果不能为空", trigger: "blur" },
        ],
        checkUser: [
          { required: true, message: "检查人员不能为空", trigger: "blur" },
        ],
        checkTime: [
          { required: true, message: "检查时间不能为空", trigger: "blur" },
        ],
        isRectify: [
          { required: true, message: "整改情况不能为空", trigger: "blur" },
        ],
        rectifyTime: [
          { required: true, message: "整改期限不能为空", trigger: "blur" },
        ],
        situation: [
          { required: true, message: "奖惩情况不能为空", trigger: "blur" },
        ],
        selfRecord: [
          { required: true, message: "自评意见不能为空", trigger: "blur" },
        ],
        selfUser: [
          { required: true, message: "项目负责人不能为空", trigger: "blur" },
        ],
        selfTime: [
          { required: true, message: "自评时间不能为空", trigger: "blur" },
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  methods:{
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
      var tmplist = [
        {
          id:1,
          progress:"已完成",
          checkCode:"98",
          yhNum:"1",
          selfResult:"优良",
          checkUser:"张三",
        },
        {
          id:2,
          progress:"进行中",
          checkCode:"36",
          yhNum:"1",
          selfResult:"合格",
          checkUser:"李四",
        },
        {
          id:3,
          progress:"已完成",
          checkCode:"95",
          yhNum:"3",
          selfResult:"优良",
          checkUser:"李白",
        },
        {
          id:4,
          progress:"已完成",
          checkCode:"88",
          yhNum:"7",
          selfResult:"合格",
          checkUser:"李丽",
        },
        {
          id:5,
          progress:"已完成",
          checkCode:"100",
          yhNum:"0",
          selfResult:"优良",
          checkUser:"班长",
        },
      ]
      this.userList = tmplist
      this.total = tmplist.length
      this.loading = false
    },
    // 新增按钮事件
    addRecord(){
      this.openadd = true
      // this.reset()
    },
    // 新增按钮的提交
    submitForm(){
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
      this.opencheck = true
      console.log("row",row.p_name)
      this.form.p_name = row.p_name
      this.form.p_unit = row.p_unit
      this.form.p_time = row.p_time
      this.form.p_inspector = row.p_inspector

    },
    // 表单重置
    reset() {
      this.form = {
        p_name: undefined,
        p_unit: undefined,
        p_time: undefined,
        p_inspector: undefined,
        p_content: undefined,
        p_url: undefined,
      };
      this.resetForm("form");
    },
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
      // this.reset();
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
</style>

