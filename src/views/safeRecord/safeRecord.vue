<template>
  <div class="safeRecord">
    <ul>
      <li>
        <div>
          <el-button type="success" icon="el-icon-edit" size="mini"  @click="addRecord" >新增</el-button>
          <!--<el-button type="warning" icon="el-icon-download" size="mini" @click="handleExport" >下载</el-button>-->
          <div style="float: right; ">
            <el-date-picker
              v-model="startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期">
            </el-date-picker>
            <el-date-picker
              v-model="endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期">
            </el-date-picker>

            <el-button type="primary" @click="getDataByTime">点击搜索</el-button>
            <el-button type="danger" @click="resetTime" plain>重置</el-button>
          </div>
        </div>
      </li>
      <li>
        <div class="safeTable">
          <!--        表格部分-->
          <el-table
            :data="userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            @selection-change="handleSelectionChange"
            style="font-size: 0.22rem; width: 100%; "
            stripe
            :header-row-style="{ color: '#409eff' }"
            :row-style="{ color: 'white' }"
          >
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column label="项目名称" align="center" prop="proName" />
            <el-table-column label="项目地址" align="center" prop="addressAll" />
            <el-table-column label="综合得分" align="center" width="100" prop="checkCode" />
            <el-table-column label="检查人员" align="center" width="100" prop="checkUser" />
            <el-table-column label="自评结果" align="center" width="100" prop="selfResult" />
            <el-table-column label="检查时间" align="center" width="150" prop="checkTime" />
            <!--            <el-table-column label="检查员姓名" align="center" prop="checkUser" width="120" />-->
            <el-table-column label="操作" align="center" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="text" icon="el-icon-view" style="font-size: 0.22rem; " @click="handleView(scope.row)">详情</el-button>
                <el-button size="mini" type="text" icon="el-icon-refresh" style=" font-size: 0.22rem; " disabled>同步</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </li>
      <li>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userList.length">
          </el-pagination>
        </div>
      </li>
    </ul>
    <!-- 查看对话框 -->
    <el-dialog title="查看" :visible.sync="opencheck" width="80%">
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
                <el-date-picker
                  v-model="checkForm.evaltime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>

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
              <el-form-item label="自评结果" prop="selfResult" label-width="130px">
                <el-select v-model="checkForm.selfResult" placeholder="请选择自评结果">
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
                <el-date-picker
                  v-model="checkForm.checkTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
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
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <!--              <el-date-picker-->
                <!--                v-model="checkForm.rectifytime"-->
                <!--                type="datetime"-->
                <!--                placeholder="请选择整改期限">-->
                <!--              </el-date-picker>-->
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
                <el-date-picker
                  v-model="checkForm.selfTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <!--              <el-input v-model="form.selfTime" placeholder="请输入自评时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业盖章页" prop="affixStamp" label-width="160px">
                <!--                <el-button type="text" @click="openFile(checkForm.affixStamp)" :disabled="false">{{ '查看附件' }}</el-button>-->
                <a :href=" checkForm.affixStamp" target="_blank">{{ '查看附件' }}</a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="附件_企业机构按期检查" prop="affixOrg" label-width="160px">
                <a :href=" checkForm.affixOrg" target="_blank">{{ '查看附件' }}</a>
                <!--              <img src="checkForm.affixOrg" alt="">-->
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
              <el-form-item label="检查时间" prop="jsTime" label-width="130px">
                <el-date-picker
                  v-model="checkForm.jsTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                <!--              <el-input v-model="form.jsTime" placeholder="请输入检查时间" />-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="divider">监理单位:</div>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item label="检查意见" prop="jlRecord" label-width="130px">
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
                <el-date-picker
                  v-model="checkForm.jlTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
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
              :rules="checkForm.checkMonthChildList"
              :inline="true"
              :model="checkForm"
              label-width="80px"
            >
              <div v-for="(item, index) in checkForm.checkMonthChildList" :key="index" style="border-bottom: dashed 1px #DCDFE6;margin-bottom: 20px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="diccode"
                      :prop="'checkForm.checkMonthChildList.' + index + '.diccode'"
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
                      :prop="'checkForm.checkMonthChildList.' + index + '.firstcode'"
                      :rules="{required: true, message: '检查项不能为空', trigger: 'blur'}"
                    >
                      <el-input v-model="item.firstcode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查子项"
                      :prop="'checkForm.checkMonthChildList.' + index + '.secondcode'"
                      :rules="{
              required: true, message: '检查子项不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.secondcode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      label-width="130px"
                      label="检查部位及内容"
                      :prop="'checkForm.checkMonthChildList.' + index + '.threecode'"
                      :rules="{
              required: true, message: '检查部位及内容不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.threecode"></el-input>
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
                      :prop="'checkForm.checkMonthChildList.' + index + '.fourcode'"
                      :rules="{
              required: true, message: '存在的问题不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.fourcode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="所扣分值"
                      :prop="'checkForm.checkMonthChildList.' + index + '.checkcode'"
                      :rules="{
              required: true, message: '所扣分值不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.checkcode"></el-input>
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
    <el-dialog title="新增" :visible.sync="openadd" width="80%">
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
                <!--              <el-date-picker-->
                <!--                v-model="form.rectifytime"-->
                <!--                type="date"-->
                <!--                placeholder="选择日期">-->
                <!--              </el-date-picker>-->
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
                  :limit="1"
                  action="http://121.36.106.18:38080/system/safe/uploadFile"
                  :on-success="saveAffixStampUrl"
                >
                  <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                  <!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                  <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
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
                  :limit="1"
                  action="http://121.36.106.18:38080/system/safe/uploadFile"
                  :on-success="saveAffixOrgUrl"
                >
                  <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
                  <!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
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
                      label="存在的问题"
                      :prop="'form.monthChild.' + index + '.diccode'"
                      :rules="{
                      required: true, message: 'diccode不能为空', trigger: 'blur'
                      }"
                    >
                      <treeselect v-model="item.diccode"  :options="options" placeholder="请选择存在的问题" :clearable="true" :show-count="true" :disable-branch-nodes="true"  style="width: 350px" @input="getSelectList(index, item)" />
                      <!--<el-input v-model="item.diccode"></el-input>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="检查项"
                      :prop="'form.monthChild.' + index + '.firstCode'"
                      :rules="{required: true, message: '检查项不能为空', trigger: 'blur'}"
                    >
                      <el-input v-model="item.firstCode" style="width: 250px"></el-input>
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
                      <el-input v-model="item.secondCode" style="width: 350px"></el-input>
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
                      <el-input v-model="item.threeCode" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(item, index)" ></el-button>
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
                  <el-col :span="12">
                    <el-form-item
                      label-width="130px"
                      label="所扣分值"
                      :prop="'form.monthChild.' + index + '.checkCode'"
                      :rules="{
              required: true, message: '所扣分值不能为空', trigger: 'blur'
              }"
                    >
                      <el-input v-model="item.checkCode" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="float: right; margin-right: 10px; ">
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          <el-button @click="canceladd">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {addCheckMonthChild,addMonthCheck,getAllCheckMonth,getCheckMonthData,getSafeAdminInfo,getCheckRecordByTime, getTree, getTreedict} from '@/api/qualityControl';
  export default {
    name: "safeRecord",
    components: { Treeselect },
    mounted() {
      this.$store.dispatch('changeMsg', '考评月报');
    },
    data(){
      return{
        // 当前每页数据的条数
        pageSize:10,
        // 翻页功能当前页
        currentPage: 1,
        dicCode: '',
        startTime: '',
        endTime: '',
        // 图片上传的弹出框
        dialogVisible:false,
        options: [],
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
          checkMonthChildList:[
            {
              diccode: '',
              firstcode: '',
              secondcode:'',
              threecode:'',
              fourcode:'',
              checkcode:'',
            },
          ],
        },
        // 整改情况选择
        isRectifies:[['1','是'],['-1','否']],
        // 自评结果选择
        selfRecords:['优良','合格','不合格'],
        // 表单参数
        form: {
          proid: 27467,
          addressAll:'',
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
          affixstamp: '',
          affixorg: '',
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
          diccode: null,
          firstCode: '',
          secondCode:'',
          threeCode:'',
          fourCode:'',
          checkCode:'',
        })
        this.getTreeselect()
      },
      getSelectList(index, item) {
        console.log(index)
        console.log(item)
        console.log(item.diccode)
        getTreedict(item.diccode).then((res) => {
          // console.log(res.data.data)
          if (res.data.code === 200) {
            this.form.monthChild[index].diccode = res.data.data.diccode
            this.form.monthChild[index].firstCode = res.data.data.firstcode
            this.form.monthChild[index].secondCode = res.data.data.secondcode
            this.form.monthChild[index].threeCode = res.data.data.threecode
            this.form.monthChild[index].fourCode = res.data.data.fourcode
            this.form.monthChild[index].checkCode = res.data.data.checkcode
          }
          // this.form.monthChild[index] = res.data.data

        })
        // console.log(node)
        // console.log(instanceId)
        // this.dicCode = item.diccode
        // console.log(this.form.monthChild[index].diccode)
        // this.getDict()
      },
      // 月报检查删除一组
      deleteItem (item, index) {
        this.form.monthChild.splice(index, 1)
      },
      getTreeselect() {
        getTree().then((response) => {
          this.options = response.data.data;
        });
      },
      getDataByTime(){
        var prams = {
          start:this.startTime,
          end:this.endTime
        }
        getCheckRecordByTime(prams).then((res) => {
          this.userList = res.data.data
          console.log("时间搜索成功！")
        })
      },
      resetTime() {
        this.startTime = ''
        this.endTime = ''
        this.getList()
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
          console.log("数据总数",this.pageTotal)
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
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid) {
            var p = new Object();
              p.proid= 27467,
              p.addressAll = this.form.addressAll
              p.evaltime= this.form.evaltime
              p.progress= this.form.progress
              p.checkCode= this.form.checkcode
              p.yhNum= this.form.yhnum
              p.selfResult= this.form.selfresult
              p.checkUser= this.form.checkuser
              p.checkTime= this.form.checktime
              p.isRectify= this.form.isrectify
              p.rectifyTime= this.form.rectifytime
              p.situation= this.form.situation
              p.selfRecord= this.form.selfrecord
              p.selfUser= this.form.selfuser
              p.selfTime= this.form.selftime
              p.affixStamp= this.form.affixstamp
              p.affixOrg= this.form.affixorg
              p.jsRecord= this.form.jsrecord
              p.jsUser= this.form.jsuser
              p.jsTime= this.form.jstime
              p.jlRecord= this.form.jlrecord
              p.jlUser= this.form.jluser
              p.jlTime= this.form.jltime
              p.checkMonthChildList= this.form.monthChild
              console.log("p",p)
            addMonthCheck(p).then(response => {
              if (response.data.code === 200) {
                this.getList();
                this.$message({
                  type: 'success',
                  message: '上传成功'

                })
                this.reset()
                this.openadd = false
              } else {
                this.$message.error(response.data.msg)
              }
            })
          } else {
            return false;
          }
        })
        // const prams1 = {
        //   proid:35051,
        //   // addressAll:this.form.addressAll,
        //   addressAll:1,
        //   evaltime:this.form.evaltime,
        //   progress :this.form.progress,
        //   checkCode:this.form.checkcode,
        //   yhNum:this.form.yhnum,
        //   selfResult:this.form.selfresult,
        //   checkUser:this.form.checkuser,
        //   checkTime:this.form.checktime,
        //   isRectify:this.form.isrectify,
        //   rectifyTime:this.form.rectifytime,
        //   situation:this.form.situation,
        //   selfRecord:this.form.selfrecord,
        //   selfUser:this.form.selfuser,
        //   selfTime:this.form.selftime,
        //   affixStamp:this.form.affixstamp,
        //   affixOrg:this.form.affixorg,
        //   jlRecord:this.form.jlrecord,
        //   jsUser:this.form.jsuser,
        //   jsTime:this.form.jstime,
        //   jsRecord:this.form.jsrecord,
        //   jlUser:this.form.jluser,
        //   jlTime:this.form.jltime,
        //   //monthChild:this.form.monthChild,
        // }
        // addMonthCheck(prams1).then((res) => {
        //   if(res.data.code === 200){
        //     this.$message({
        //       message: '表单添加成功！',
        //       type: 'success'
        //     });
        //   }else{
        //     this.$message({
        //       message: '表单添加失败',
        //       type: 'warning'
        //     });
        //   }
        // })
        // console.log("yuepingzixiang",this.form.monthChild)
        // for(var i=0;i<this.form.monthChild.length;i++){
        //   const prams2 = {
        //     // pid = row.id
        //     diccode:this.form.monthChild[i].diccode,
        //     firstCode:this.form.monthChild[i].firstCode,
        //     secondCode:this.form.monthChild[i].secondCode,
        //     threeCode:this.form.monthChild[i].threeCode,
        //     fourCode:this.form.monthChild[i].fourCode,
        //     checkCode:this.form.monthChild[i].checkCode,
        //   }
        //   addCheckMonthChild(prams2).then((res) => {
        //     if(res.data.code === 200){
        //       this.$message({
        //         message: '月报检查记录添加成功！',
        //         type: 'success'
        //       });
        //     }else{
        //       this.$message({
        //         message: '月报检查记录添加失败',
        //         type: 'warning'
        //       });
        //     }
        //   })
        // }
        //
        // this.openadd = false

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
          console.log("详情",this.checkForm)
        })
        this.opencheck = true
      },
      // 表单重置
      reset() {
        this.form.proid= 27467,
        this.form.addressAll='',
        this.form.evaltime='',
        this.form.progress='',
        this.form.checkcode=null,
        this.form.yhnum=null,
        this.form.selfresult='',
        this.form.checkuser='',
        this.form.checktime='',
        this.form.isrectify='',
        this.form.rectifytime='',
        this.form.situation='',
        this.form.selfrecord='',
        this.form.selfuser='',
        this.form.selftime='',
        this.form.affixstamp= '',
        this.form.affixorg= '',
        this.form.jsrecord='',
        this.form.jsuser='',
        this.form.jstime='',
        this.form.jlrecord='',
        this.form.jluser='',
        this.form.jltime='',
        this.form.monthChild=[]
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
      },
      openFile(url) {
        window.open(url);
      },
      saveAffixStampUrl(response, file, fileList) {
        this.form.affixstamp = response.data;
      },
      saveAffixOrgUrl(response, file, fileList) {
        this.form.affixorg = response.data;
      }
    },

  }
</script>

<style scoped>
.safeRecord {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.safeRecord ul {
  width: 85%;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
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
    text-align: center;
  }
  .block >>> .el-pagination__total{
    color: white;
  }

.block >>>.el-pagination__jump{
  color: white;
}

.safeTable {
  width: calc(100% + 20px);
  height: 70vh;
  overflow-y: scroll;
}

.safeTable >>> .el-table,
.safeTable >>> .el-table__expanded-cell {
  background-color: transparent !important;
}
/*透明化行、单元格*/
.safeTable >>> .el-table th,
.safeTable >>> .el-table tr,
.safeTable >>> .el-table td {
  background-color: transparent !important;
}
/*hover时样式*/
.safeTable >>> .el-table tbody tr:hover>td {
  background-color: #367f7f78 !important
}

/*偶数行样式*/
.safeTable >>> .el-table__row--striped td {
  background-color: #45797b33 !important
}
/*奇数行样式*/
.safeTable >>> .el-table__row:not(.el-table__row--striped) {
  background: #1439391c !important;
}
</style>

