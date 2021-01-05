<template>
  <div class="container">
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="塔式起重机" name="first" lazy>
          <div>
            <el-row style="margin-bottom: 1.4vh; ">
              <el-col :span="6" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">塔式起重机数据</div>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="style-btn" size="mini" @click="gotoTD('塔式起重机')">设备使用过程</el-button>
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>{{qizhongjiOnlineNum}}</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                    <el-col :span="12">
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>{{qizhongjiDisNum}}</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">离线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="13">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%;position: relative">
                  <div class="border-top-center"></div>
                  <div class="box-title">塔式起重机信息</div>
                  <el-button class="style-btn2" size="mini" @click="gotoHistory">历史数据</el-button>
                  <div class="device-data">
                    <ul :class="moving === true ? 'device-list moving' : 'device-list'  "  >
                      <li @mouseover="mouseoverMthd(index)" @mouseout="infohover = true" v-for="(item, index) in taInfoList">
                        <div class="device-detail">
                          <el-image v-show="hoverIndex !== index" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="hoverIndex === index" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>{{item.makefactory}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>{{item.deviceType}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 设备编号:</td>
                                <td>{{item.deviceCode}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>{{item.personInCharge}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 手机号:</td>
                                <td>{{item.phone}}</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{item.devName  }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag v-if="item.status === 1" type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                                <el-tag v-else type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <!-- <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover2" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover2" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZTJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A6栋门口</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '2号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover3 = false" @mouseout="infohover3 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover3" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover3" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>三一重工</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>CZ-6910</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>施工区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>王刚</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '3号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover4 = false" @mouseout="infohover4 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover4" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover4" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张洲</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '4号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover5 = false" @mouseout="infohover5 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover5" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover5" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A5栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>李华</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '5号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover6 = false" @mouseout="infohover6 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover6" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover6" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZT520-TJ</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋东南区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '1号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover7 = false" @mouseout="infohover7 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover7" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover7" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZTJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A6栋门口</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '2号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover8 = false" @mouseout="infohover8 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover8" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover8" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>三一重工</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>CZ-6910</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>施工区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>王刚</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '3号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover9 = false" @mouseout="infohover9 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover9" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover9" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张洲</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '4号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover10 = false" @mouseout="infohover10 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover10" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover10" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A5栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>李华</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '5号塔式起重机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="5" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">预警总览</div>
                  <div class="solve-view">
                    <dv-active-ring-chart :config="configPie" style="width: 3rem; height: 3rem; margin: auto; " />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">报警类型</div>
                  <div style="height: 36px; ">
                    <div style="float:right; margin-right: 15px; ">
                      <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        {{ chosen }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu  style="background-color: rgba(255,255,255,0.5)" slot="dropdown">
                          <el-dropdown-item v-for="(item, index) in taDiaoList" :key="index" v-text="item" :command="item"></el-dropdown-item>
                          <!-- <el-dropdown-item command="所有设备">所有设备</el-dropdown-item>
                          <el-dropdown-item command="1号塔式起重机">1号塔式起重机</el-dropdown-item>
                          <el-dropdown-item command="2号塔式起重机">2号塔式起重机</el-dropdown-item>
                          <el-dropdown-item command="3号塔式起重机">3号塔式起重机</el-dropdown-item>
                          <el-dropdown-item command="4号塔式起重机">4号塔式起重机</el-dropdown-item>
                          <el-dropdown-item command="5号塔式起重机">5号塔式起重机</el-dropdown-item> -->
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div id="alarmType" class="alarm-type"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">设备维护统计</div>
                  <div id="alarmTrend" class="alarm-trend"></div>
                </div>
              </el-col>
              <el-col :span="8" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">预警记录</div>
                  <div style="float:right;margin-top: -32px; margin-right:10px;">
                    <el-button type="text" style="text-decoration: underline; " @click="gotoCheckRecord('塔式起重机')">历史数据</el-button>
                  </div>
                  <dv-scroll-board :config="configTable" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      
        <el-tab-pane label="施工升降机" name="third" lazy>
          <div>
            <el-row style="margin-bottom: 1.4vh; ">
              <el-col :span="6" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">施工升降机数据</div>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="style-btn" size="mini" @click="gotoTD('施工升降机')">设备使用过程</el-button>
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>{{shengjiangjiOnlineNum}}</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                    <el-col :span="12">
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>{{shengjiangjiDisNum}}</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">离线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="13">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%;position: relative ">
                  <div class="border-top-center"></div>
                  <div class="box-title">施工升降机信息</div>
                  <el-button class="style-btn2" size="mini" @click="gotoHistory2">历史数据</el-button>
                  <div class="device-data">
                    <ul :class="moving2 === true ? 'device-list moving' : 'device-list'  ">
                      <li @mouseover="mouseoverMthd2(index)" @mouseout="infohover1 = true" v-for="(item, index) in shigongInfoList">
                        <div class="device-detail">
                          <el-image v-show="hoverIndex2 !== index" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="hoverIndex2 === index" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>{{item.makefactory}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>{{item.deviceType}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 设备编号:</td>
                                <td>{{item.deviceCode}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                 <td>{{item.personInCharge}}</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" />手机号:</td>
                                 <td>{{item.phone}}</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ item.devName }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag v-if="item.status === 1" type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                                <el-tag v-else type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <!-- <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover2" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover2" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZTJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A6栋门口</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '2号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover3 = false" @mouseout="infohover3 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover3" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover3" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>三一重工</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>CZ-6910</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>施工区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>王刚</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '3号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li> -->
                      <!-- <li @mouseover="infohover4 = false" @mouseout="infohover4 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover4" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover4" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张洲</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '4号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover5 = false" @mouseout="infohover5 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover5" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover5" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A5栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>李华</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '5号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover6 = false" @mouseout="infohover6 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover6" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover6" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZT520-TJ</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋东南区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '1号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover7 = false" @mouseout="infohover7 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover7" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover7" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZTJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A6栋门口</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张伟</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '2号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover8 = false" @mouseout="infohover8 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover8" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover8" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>三一重工</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>CZ-6910</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>施工区</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>王刚</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '3号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover9 = false" @mouseout="infohover9 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover9" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover9" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A4栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>张洲</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '4号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover10 = false" @mouseout="infohover10 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover10" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover10" class="device-detail-info">
                            <table>
                              <tr>
                                <td><i class="el-icon-office-building" /> 生产厂家:</td>
                                <td>HAIZHI</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-tools" /> 设备型号:</td>
                                <td>HZYJ582-124</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-place" /> 安装位置:</td>
                                <td>A5栋</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-s-custom" /> 责任人:</td>
                                <td>李华</td>
                              </tr>
                              <tr>
                                <td><i class="el-icon-phone-outline" /> 联系人:</td>
                                <td>13634532236</td>
                              </tr>
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span2">
                                  {{ '5号施工升降机' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li> -->
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="5" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">预警总览</div>
                  <div class="solve-view">
                    <dv-active-ring-chart :config="configPie1" style="width: 3rem; height: 3rem; margin: auto; " />
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">报警类型</div>
                  <div style="margin-left: 80%; ">
                    <el-dropdown @command="handleCommand2">
              <span class="el-dropdown-link">
                {{ chosen2 }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                      <el-dropdown-menu  style="background-color: rgba(255,255,255,0.5)" slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in shigongList" :key="index" v-text="item" :command="item"></el-dropdown-item>
                       
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div id="alarmType3" class="alarm-type"></div>
                </div>
              </el-col>
              <el-col :span="8">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">设备维护统计</div>
                  <div id="alarmTrend3" class="alarm-trend"></div>
                </div>
              </el-col>
              <el-col :span="8" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">预警记录</div>
                  <div style="float:right;margin-top: -32px; margin-right:10px;">
                    <el-button type="text" style="text-decoration: underline; " @click="gotoCheckRecord('施工升降机')">历史数据</el-button>
                  </div>
                  <dv-scroll-board :config="configTable3" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="其他设备" name="forth" lazy>
          <other-device></other-device>
        </el-tab-pane>
      </el-tabs>
    </div>



  </div>
</template>

<script>
import { getHistroy, getAllDevName, getCountsByType, getDevInfo, getQizhongji, getShengjiangji } from "@/api/deviceManage";
import echarts from 'echarts';
import otherDevice from '@/views/otherDevice.vue';
require('echarts/theme/macarons'); // echarts theme



export default {
  components: {
    otherDevice
  },
  created() {

  },
  mounted() {
    this.siteId = localStorage.getItem('siteId')
    this.$store.dispatch('changeMsg', '设备管理');
    this.initAlarmType()
    this.initAlarmTrend()
    this.getAllDevInfo()
    this.getDevHistory()
    this.getDevHistory2()
    this.getAllTaDevList()
    this.getAllShiGongList()
    this.getCounts()
    this.getCounts3()
    //this.getQizhongjiNum()
    //this.getShengjiangjiNum()

  },
  data() {
    return {
      taTotal: 0,
      shigongTotal: 0,
      qizhongjiOnlineNum: 0,
      qizhongjiDisNum: 0,
      shengjiangjiOnlineNum: 0,
      shengjiangjiDisNum: 0,
      moving: false,
      moving2: false,
      hoverIndex: undefined,
      hoverIndex2: undefined,
      taInfoList: [],
      shigongInfoList: [],
      armTypes: [],
      recentWeekList: [],
      toDayList: [],
      armTypes3: [],
      recentWeekList3: [],
      toDayList3: [],
      taDiaoList: [],
      shigongList: [],
      siteId: '',
      myChart100: '',
      myChart10: '',
      alarmTypeChart: null,
      alarmTypeChart2: null,
      alarmTrendChart: null,
      alarmTrendChart2: null,
      alarmTypeChart3: null,
      showEchart: false,
      configPie: {
        data: [
          {
            name: '预警总览',
            value: 0
          },


        ],
        digitalFlopStyle: {
          fontSize: 17
        },
        color: ['#f56c6c'],
        showOriginValue: true
      },
      configPie1: {
        data: [
          {
            name: '预警总览',
            value: 0
          },


        ],
        digitalFlopStyle: {
          fontSize: 17
        },
        color: ['#f56c6c'],
        showOriginValue: true
      },
      configTable: {
        header: ['设备编号', '报警时间', '报警类型', '驾驶人'],
        headerHeight: 45,
        data: [
          // ['1号塔式起重机', '2019-10-13 13:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 53.5],
          // ['2号塔式起重机', '2019-10-13 14:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 54.5],
          // ['3号塔式起重机', '2019-10-15 15:14:01', '风速限位', '<span style="color: #67c23a; ">已处理</span>', 57.5],
          // ['4号塔式起重机', '2020-01-13 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
          // ['2号塔式起重机', '2019-01-01 08:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 56.5],
          // ['5号塔式起重机', '2019-12-30 10:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 87.5],
          // ['3号塔式起重机', '2020-01-15 12:14:01', '风速限位', '<span style="color: #f56c6c; ">红色报警</span>', 97],
          // ['1号塔式起重机', '2020-05-07 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
        ],
        rowNum: 7,
        align: ['center', 'center', 'right', 'right'],
        headerBGC: '',
        evenRowBGC: '',
        columnWidth: [100, 300, 200, 200]
      },
      configTable2: {
        header: ['设备编号', '报警时间', '报警类型', '驾驶人'],
        headerHeight: 45,
        data: [
          ['1号物料提升机', '2019-10-13 13:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 53.5],
          ['2号物料提升机', '2019-10-13 14:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 54.5],
          ['3号物料提升机', '2019-10-15 15:14:01', '风速限位', '<span style="color: #67c23a; ">已处理</span>', 57.5],
          ['4号物料提升机', '2020-01-13 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
          ['2号物料提升机', '2019-01-01 08:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 56.5],
          ['5号物料提升机', '2019-12-30 10:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 87.5],
          ['3号物料提升机', '2020-01-15 12:14:01', '风速限位', '<span style="color: #f56c6c; ">红色报警</span>', 97],
          ['1号物料提升机', '2020-05-07 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
        ],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        headerBGC: '',
        evenRowBGC: '',
        columnWidth: [ , 200]
      },
      configTable3: {
        header: ['设备编号', '报警时间', '报警类型', '驾驶人'],
        headerHeight: 45,
        data: [
          ['1号施工升降机', '2019-10-13 13:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 53.5],
          ['2号施工升降机', '2019-10-13 14:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 54.5],
          ['3号施工升降机', '2019-10-15 15:14:01', '风速限位', '<span style="color: #67c23a; ">已处理</span>', 57.5],
          ['4号施工升降机', '2020-01-13 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
          ['2号施工升降机', '2019-01-01 08:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 56.5],
          ['5号施工升降机', '2019-12-30 10:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 87.5],
          ['3号施工升降机', '2020-01-15 12:14:01', '风速限位', '<span style="color: #f56c6c; ">红色报警</span>', 97],
          ['1号施工升降机', '2020-05-07 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
        ],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        headerBGC: '',
        evenRowBGC: '',
        columnWidth: [ , 200]
      },

      chosen: '所有设备',
      chosen2: '所有设备',
      infohover1: true,
      infohover2: true,
      infohover3: true,
      infohover4: true,
      infohover5: true,
      infohover6: true,
      infohover7: true,
      infohover8: true,
      infohover9: true,
      infohover10: true,
      activeName: 'first'
    }
  },
  methods: {
    inchart100() {
      this.myChart100 = this.$echarts.init(document.getElementById('mychart100'),'macarons')
      var option = {
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c}'
        // },
        angleAxis: {
          type: 'category',
          data: ['塔式起重机', '物料提升机', '施工升降机', '特种设备', '视频设备'],
          textStyle:{
            fontSize:16,
            color:'#544bfc'
          }
        },
        radiusAxis: {
        },
        polar: {
          radius: ['10%', '50%'],
          center: ["50%", "50%"],
        },
        label:{
          normal:{
            show:true,
            position:'top',
            textStyle:{
              fontSize:16,
              color:'#B0CEFC'
            }
          }
        },
        series: [{
          radius: ['20%', '70%'],
          center: ["20%", "20%"],
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: '异常',
          stack: 'a',
        }, {
          radius: ['20%', '70%'],
          center: ["90%", "90%"],
          type: 'bar',
          data: [15, 24, 16, 33, 23, 22, 21],
          coordinateSystem: 'polar',
          name: '总数',
          stack: 'a'
        }],
        legend: {
          show: true,
          data: ['异常', '总数'],
          left: 'right',
          textStyle: {
            color: '#2CABE3',
            fontSize: 12,
          },
        }
      }
      this.myChart100.setOption(option)
    },
    initAlarmType() {
      this.alarmTypeChart = echarts.init(document.getElementById('alarmType'), 'macarons');
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['近一周', '今天'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: this.armTypes,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '近一周',
            type: 'bar',
            data: this.recentWeekList
          },
          {
            name: '今天',
            type: 'bar',
            data: this.toDayList
          }
        ]
      }
      this.alarmTypeChart.setOption(option);
    },
    initAlarmType2() {
      this.alarmTypeChart2 = echarts.init(document.getElementById('alarmType2'), 'macarons');
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['近一周', '今天'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: this.armTypes,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '近一周',
            type: 'bar',
            data: this.recentWeekList
          },
          {
            name: '今天',
            type: 'bar',
            data: this.toDayList
          }
        ]
      }
      this.alarmTypeChart2.setOption(option)
    },
    initAlarmType3() {
      this.alarmTypeChart3 = echarts.init(document.getElementById('alarmType3'), 'macarons');
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['近一周', '今天'],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          data: this.armTypes3,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '近一周',
            type: 'bar',
            data: this.recentWeekList3
          },
          {
            name: '今天',
            type: 'bar',
            data: this.toDayList3
          }
        ]
      }
      this.alarmTypeChart3.setOption(option)
    },
    initAlarmTrend() {
      this.alarmTrendChart = echarts.init(document.getElementById('alarmTrend'));
      this.alarmTrendChart.setOption({
        color: ['#fe8463', '#22c3aa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
        },
        legend: {
          data: ['距离下次维修时间（天）', '距离租赁到期时间（天）'],
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['一号塔式起重机', '二号塔式起重机', '三号塔式起重机', '四号塔式起重机', '五号塔式起重机'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
        {
            name: '距离下次维修时间（天）',
            type: 'bar',
            data: [20, 18, 15, 10,12]
        },
        {
            name: '距离租赁到期时间（天）',
            type: 'bar',
            data: [180, 201, 167, 138,154]
        }
        ]



      });
    },
    initAlarmTrend2() {
      this.alarmTrendChart2 = echarts.init(document.getElementById('alarmTrend2'));
      this.alarmTrendChart2.setOption({
        color: ['#fe8463', '#22c3aa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['距离下次维修时间（天）', '距离租赁到期时间（天）'],
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['一号物料提升机', '二号物料提升机', '三号物料提升机', '四号物料提升机'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '距离下次维修时间（天）',
            type: 'bar',
            data: [20, 18, 15, 10]
          },
          {
            name: '距离租赁到期时间（天）',
            type: 'bar',
            data: [180, 201, 167, 138]
          }
        ]



      });
    },
    initAlarmTrend3() {
      this.alarmTrendChart3 = echarts.init(document.getElementById('alarmTrend3'));
      this.alarmTrendChart3.setOption({
        color: ['#fe8463', '#22c3aa'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['距离下次维修时间（天）', '距离租赁到期时间（天）'],
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['一号施工升降机', '二号施工升降机', '三号施工升降机', '四号施工升降机','五号施工升降机'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#3FA0C3'
            }
          }
        },
        series: [
          {
            name: '距离下次维修时间（天）',
            type: 'bar',
            data: [20, 18, 15, 10,12]
          },
          {
            name: '距离租赁到期时间（天）',
            type: 'bar',
            data: [180, 201, 167, 138,143]
          }
        ]



      });
    },
    refresh() {
      this.alarmTypeChart.dispose();
      this.alarmTrendChart.dispose();
      this.initAlarmType();
      this.initAlarmTrend();
    },
    handleCommand(command) {
      console.log("Command:", command)
      this.chosen = command;
      this.getCounts(command)
    },
    handleCommand2(command) {
      console.log("Command:", command)
      this.chosen2 = command;
      this.getCounts3(command)
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if(this.activeName === 'first') {
        this.$nextTick(() => {
          this.initAlarmType();
          this.initAlarmTrend();
        })

      }else if(this.activeName === 'second') {
        this.$nextTick(() => {
          this.initAlarmType2()
          this.initAlarmTrend2()
        })
      } else if (this.activeName === 'third') {
        this.$nextTick(() => {
          this.initAlarmType3()
          this.initAlarmTrend3()
        })
      }

    },
    gotoTD(name) {
      this.$router.push({
        name: 'deviceOne',
        params: {
          devName: name
        }
      })
    },
    gotoHistory() {
      this.$router.push('/historyData')
    },
    gotoHistory2() {
      this.$router.push('/historySJ')
    },
    gotoCheckRecord(name) {
      console.log("name", name)
      this.$router.push({
        name: 'deviceHistory',
        params: {
          devName: name
        }
      });
    },
    getDevHistory() {
      console.log("AAA")
      var params = {
        constructionSiteId: this.siteId,
        deviceType: '塔式起重机'
      }
      getHistroy(params).then((res) => {
        console.log(res)
        var data2 = []
        var list = res.data.rows

         this.configPie = {
          data: [
            {
              name: '预警总览',
              value: list.length
            }
          ],
          digitalFlopStyle: {
            fontSize: 17
          },
          color: ['#22c3aa'],
          showOriginValue: true
        }
        for(var i = 0 ;i < list.length;i++ ){
          var data1 = []
          data1.push(list[i].deviceId)
          data1.push(list[i].warnTime)
          data1.push(list[i].warnType)
          data1.push(list[i].driverName)
          data2.push(data1)

        }

        this.configTable = {
          header: ['设备编号', '报警时间', '报警类型', '驾驶人'],
          headerHeight: 45,
          data: data2,
          rowNum: 7,
          align: ['center', 'center', 'center', 'center'],
          headerBGC: '',
          evenRowBGC: '',
          columnWidth: [120, 250, 120, 100]
        }
      })
    },
    getDevHistory2() {
      console.log("AAA")
      var params = {
        constructionSiteId: this.siteId,
        deviceType: '施工升降机'
      }
      getHistroy(params).then((res) => {

        console.log(res)
        var data2 = []
        var list = res.data.rows
        this.configPie1 = {
          data: [
            {
              name: '预警总览',
              value: list.length
            }
          ],
          digitalFlopStyle: {
            fontSize: 17
          },
          color: ['#22c3aa'],
          showOriginValue: true
        }

        for(var i = 0 ;i < list.length;i++ ){
          var data1 = []
          data1.push(list[i].deviceId)
          data1.push(list[i].warnTime)
          data1.push(list[i].warnType)
          data1.push(list[i].driverName)
          data2.push(data1)

        }

        this.configTable3 = {
          header: ['设备编号', '报警时间', '报警类型', '驾驶人'],
          headerHeight: 45,
          data: data2,
          rowNum: 7,
          align: ['center', 'center', 'center', 'center', 'center'],
          headerBGC: '',
          evenRowBGC: '',
          columnWidth: [120, 250, 120, 100]
        }
      })
    },

    getAllTaDevList() {
      var params = {
        siteId: this.siteId,
        deviceType: '塔式起重机'
      }
      getAllDevName(params).then((res) => {
        this.taDiaoList = res.data.data
      })
    },
    getAllShiGongList() {
      var params = {
        siteId: this.siteId,
        deviceType: '施工升降机'
      }
      getAllDevName(params).then((res) => {
        this.shigongList = res.data.data
      })
    },
    getCounts(name) {
      if(name === '所有设备') {
        var params = {
          siteId: this.siteId
        }
      } else {
        var params = {
          siteId: this.siteId,
          deviceName: name
        }
      }
      getCountsByType(params).then((res) => {
        console.log(res.data.data)
        var arr = res.data.data
        if(arr.recentWeek.length !== 0 ) {
          this.armTypes = arr.recentWeek.map((item) => {return item.warn_type})
          this.recentWeekList = arr.recentWeek.map((item) => {return item.counts})
        }
        if(arr.today.length !== 0) {
          this.toDayList = arr.today.map((item) => {return item.counts})
        }
        if(arr.recentWeek.length === 0) {
          this.recentWeekList = []
        }
        if(arr.today.length === 0) {
          this.toDayList = []
        }
        this.initAlarmType()
      })

    },

    getCounts3(name) {
      if(name === '所有设备') {
        var params = {
          siteId: this.siteId
        }
      } else {
        var params = {
          siteId: this.siteId,
          deviceName: name
        }
      }
      getCountsByType(params).then((res) => {
        console.log(res.data.data)
        var arr = res.data.data
        if(arr.recentWeek.length !== 0 ) {
          this.armTypes3 = arr.recentWeek.map((item) => {return item.warn_type})
          this.recentWeekList3= arr.recentWeek.map((item) => {return item.counts})
        }
        if(arr.today.length !== 0) {
          this.toDayList3 = arr.today.map((item) => {return item.counts})
        }
        if(arr.recentWeek.length === 0) {
          this.recentWeekList3 = []
        }
        if(arr.today.length === 0) {
          this.toDayList3 = []
        }
        this.initAlarmType3()
      })

    },

    getAllDevInfo() {
      
      var params1 = {
        deptId: this.siteId,
        deviceName: '塔式起重机'
      }
      getDevInfo(params1).then((res) => {
        if(res.data.data.devData.length >= 5) {
          this.moving = true
        } else {
          this.moving = false
        }
        
        this.taInfoList = res.data.data.devData
        this.taTotal = res.data.data.devData.length
        this.getQizhongjiNum()
        
      })
    
      var params2 = {
        deptId: this.siteId,
        deviceName: '施工升降机'
      }
      getDevInfo(params2).then((res) => {
        if(res.data.data.devData.lenngth >= 5) {
          this.moving2 = true
        } else {
          this.moving2 = false
        }
        this.shigongInfoList = res.data.data.devData
        this.shigongTotal = res.data.data.devData.length
        this.getShengjiangjiNum()
      })
    
      
     
    },
    mouseoverMthd(index) {
      this.hoverIndex = index
      
    },
    mouseoverMthd2(index) {
      this.hoverIndex2 = index
      
    },
    getQizhongjiNum() {
      getQizhongji(this.siteId).then(res => {
        console.log("lixianshu", res)
        this.qizhongjiOnlineNum = res.data.data.online
        this.qizhongjiDisNum = this.taTotal - this.qizhongjiOnlineNum 
      })
    },
    getShengjiangjiNum() {
      getShengjiangji(this.siteId).then(res => {
        this.shengjiangjiOnlineNum = res.data.data.online
        this.shengjiangjiDisNum = this.shigongTotal - this.shengjiangjiOnlineNum
      })
    }


  }
}
</script>

<style scoped>
.border-top-left {
  height: 10px;
  background-image: url("../../src/assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}

.border-top-center {
  height: 10px;
  background-image: url("../../src/assets/border/top-center.png");
  background-size: 100% 100%;
  width: 100%;
}

.box-title {
  color: #FFA454;
  font-size: 0.27rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.25rem;
}

.alarm-type {
  height: calc(53vh - 10px - 0.5rem - 20px);
  width: calc(100% - 0.34rem);
  margin: 0 0.17rem;
}

.el-button--text {
  color: #3FA0C3;
}

.el-button--small {
  font-size: 0.2rem;
}

.alarm-trend {
  height: calc(53vh - 10px - 0.5rem);
  width: calc(100% - 0.34rem);
  margin: 0 0.17rem;
}

.solve-view {
  height: calc(28vh - 10px - 0.5rem);
  width: 100%;
}

.device-data {
  height: calc(28vh - 10px - 0.5rem - 0.3rem);
  margin: 0.15rem;
  width: calc(100% - 0.3rem);
  overflow: hidden;
}

.device-detail {
  width: 2.5rem;
  height: calc(28vh - 10px - 0.5rem - 0.4rem);
  margin: 0 0.05rem;
  border: 1px solid #3FA0C3;;
  border-radius: 4px;
  background-size: 100% 100%;
  background-color: rgba(0 ,0 ,0 , 0.35);
}

.device-detail-info {
  float: top;
  height: 80%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #E8FEFF;
  font-size: 0.18rem;
}

.device-detail-info table {
  height: 90%;
  margin: 3px 4px;
}

.device-detail-span {
  font-size: 0.2rem;
  color: #E8FEFF;
  text-align: right;
  margin: 0 auto;
}
.device-detail-span2 {
  font-size: 0.1rem;
  color: #E8FEFF;
  text-align: right;
  margin: 0 auto;
}

.tower-data {
  width: 2.3rem;
  height: 2.3rem;
  margin: 0.15rem auto 0 auto;
  font-size: 0.39rem;
  color: #FFA454;
}

.device-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  width: 35rem;
}
.moving {
  animation: moving 12s linear infinite;
}

.device-list li {
  float: left;
}

@keyframes moving {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-13.21rem);
  }
}

.device-list:hover {
  animation-play-state: paused;
}

.el-dropdown-link {
  cursor: pointer;
  color: #E8FEFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.container {
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
  .tabs >>> .el-tabs__nav-wrap::after {
    height: 0;
  }
.tabs  >>>.el-tabs__item{
  color: #fff;
}
.tabs >>>.el-tabs__item.is-active {
  color: #409EFF;
}
.tabs >>> .el-tabs__item:hover {
  color: #409EFF;
}
.tabs >>> .el-tabs__nav-wrap::after {
  height: 0;
}
/*.tabs >>> .el-tabs__active-bar {*/
  /*height: 1px;*/
/*}*/
.tabs >>> .el-tabs__nav-wrap {
  background-image: url("../assets/homepage/notice_bg.png");
  padding-left: 0.3rem;
}
  .style-btn {
    position: absolute;
    right: 3%;
    top: -15%;
    background-color: rgba(33,146,163,0.3);
    color: white;
  }
  .style-btn2 {
    position: absolute;
    right: 1%;
    top: 6%;
    background-color: rgba(33,146,163,0.3);
    color: white;
  }
</style>
