<template>
  <div class="container">
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="塔吊" name="first" lazy>
          <div>
            <el-row style="margin-bottom: 1.4vh; ">
              <el-col :span="6" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">塔吊数据</div>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="style-btn" size="mini" @click="gotoTD">七张表</el-button>
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>4</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                    <el-col :span="12">
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>2</li>
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
                  <div class="box-title">塔吊信息</div>
                  <el-button class="style-btn2" size="mini" @click="gotoHistory">历史数据</el-button>
                  <div class="device-data">
                    <ul class="device-list">
                      <li @mouseover="infohover1 = false" @mouseout="infohover1 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover1" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover1" class="device-detail-info">
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '1号塔吊' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                      <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '2号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '3号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '4号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '5号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '1号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '2号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '3号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '4号塔吊' }}&nbsp;
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
                            </table>
                          </div>
                          <div style="height: 18%; width: 100%; ">
                            <el-row>
                              <el-col :span="15">
                                <div class="device-detail-span">
                                  {{ '5号塔吊' }}&nbsp;
                                </div>
                              </el-col>
                              <el-col :span="9">
                                <el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>
                              </el-col>
                            </el-row>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="5" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">处理总览</div>
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
                  <div style="margin-left: 80%; ">
                    <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ chosen }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                      <el-dropdown-menu  style="background-color: rgba(255,255,255,0.5)" slot="dropdown">
                        <el-dropdown-item command="所有设备">所有设备</el-dropdown-item>
                        <el-dropdown-item command="1号塔吊">1号塔吊</el-dropdown-item>
                        <el-dropdown-item command="2号塔吊">2号塔吊</el-dropdown-item>
                        <el-dropdown-item command="3号塔吊">3号塔吊</el-dropdown-item>
                        <el-dropdown-item command="4号塔吊">4号塔吊</el-dropdown-item>
                        <el-dropdown-item command="5号塔吊">5号塔吊</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
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
                  <div class="box-title">报警记录</div>
                  <dv-scroll-board :config="configTable" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="物料提升机" name="second" lazy>-->
          <!--<div>-->
            <!--<el-row style="margin-bottom: 1.4vh; ">-->
              <!--<el-col :span="6" style="padding: 0 0.5vw; ">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">-->
                  <!--<div class="border-top-left"></div>-->
                  <!--<div class="box-title">物料提升机数据</div>-->
                  <!--<el-row>-->
                    <!--<el-col :span="12">-->
                      <!--<el-button class="style-btn" size="mini" @click="gotoTD">七张表</el-button>-->
                      <!--<dv-decoration-9 class="tower-data">-->
                        <!--<ul style="list-style: none; padding: 0; text-align: center; ">-->
                          <!--<li>4</li>-->
                          <!--<li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>-->
                        <!--</ul>-->
                      <!--</dv-decoration-9>-->
                    <!--</el-col>-->
                    <!--<el-col :span="12">-->
                      <!--<dv-decoration-9 class="tower-data">-->
                        <!--<ul style="list-style: none; padding: 0; text-align: center; ">-->
                          <!--<li>2</li>-->
                          <!--<li style="color: #3FA0C3; font-size: 0.25rem; ">离线数</li>-->
                        <!--</ul>-->
                      <!--</dv-decoration-9>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="13">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">-->
                  <!--<div class="border-top-center"></div>-->
                  <!--<div class="box-title">物料提升机信息</div>-->
                  <!--<div class="device-data">-->
                    <!--<ul class="device-list">-->
                      <!--<li @mouseover="infohover1 = false" @mouseout="infohover1 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover1" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover1" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZT520-TJ</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A4栋东南区</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张伟</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '1号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover2 = false" @mouseout="infohover2 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover2" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover2" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZTJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A6栋门口</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张伟</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '2号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover3 = false" @mouseout="infohover3 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover3" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover3" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>三一重工</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>CZ-6910</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>施工区</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>王刚</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '3号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover4 = false" @mouseout="infohover4 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover4" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover4" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZYJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A4栋</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张洲</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '4号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover5 = false" @mouseout="infohover5 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover5" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover5" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZYJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A5栋</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>李华</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '5号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover6 = false" @mouseout="infohover6 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover6" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover6" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZT520-TJ</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A4栋东南区</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张伟</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '1号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover7 = false" @mouseout="infohover7 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover7" :src="require('../../src/assets/tower/tadiao2.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover7" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZTJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A6栋门口</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张伟</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '2号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover8 = false" @mouseout="infohover8 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover8" :src="require('../../src/assets/tower/tadiao3.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover8" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>三一重工</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>CZ-6910</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>施工区</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>王刚</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '3号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover9 = false" @mouseout="infohover9 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover9" :src="require('../../src/assets/tower/tadiao4.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover9" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZYJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A4栋</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>张洲</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '4号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="success" effect="dark" style="margin-top: 1.5%; ">在线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                      <!--<li @mouseover="infohover10 = false" @mouseout="infohover10 = true">-->
                        <!--<div class="device-detail">-->
                          <!--<el-image v-show="infohover10" :src="require('../../src/assets/tower/tadiao5.jpg')" fit="fill" style="height: 80%; " />-->
                          <!--<div v-show="!infohover10" class="device-detail-info">-->
                            <!--<table>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-office-building" /> 生产厂家:</td>-->
                                <!--<td>HAIZHI</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-tools" /> 设备型号:</td>-->
                                <!--<td>HZYJ582-124</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-place" /> 安装位置:</td>-->
                                <!--<td>A5栋</td>-->
                              <!--</tr>-->
                              <!--<tr>-->
                                <!--<td><i class="el-icon-s-custom" /> 责任人:</td>-->
                                <!--<td>李华</td>-->
                              <!--</tr>-->
                            <!--</table>-->
                          <!--</div>-->
                          <!--<div style="height: 18%; width: 100%; ">-->
                            <!--<el-row>-->
                              <!--<el-col :span="15">-->
                                <!--<div class="device-detail-span2">-->
                                  <!--{{ '5号物料提升机' }}&nbsp;-->
                                <!--</div>-->
                              <!--</el-col>-->
                              <!--<el-col :span="9">-->
                                <!--<el-tag type="danger" effect="dark" style="margin-top: 1.5%; ">离线</el-tag>-->
                              <!--</el-col>-->
                            <!--</el-row>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="5" style="padding: 0 0.5vw; ">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">-->
                  <!--<div class="border-top-left"></div>-->
                  <!--<div class="box-title">处理总览</div>-->
                  <!--<div class="solve-view">-->
                    <!--<dv-active-ring-chart :config="configPie" style="width: 3rem; height: 3rem; margin: auto; " />-->
                  <!--</div>-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
              <!--<el-col :span="8" style="padding: 0 0.5vw; ">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">-->
                  <!--<div class="border-top-left"></div>-->
                  <!--<div class="box-title">报警类型</div>-->
                  <!--<div style="margin-left: 80%; ">-->
                    <!--<el-dropdown @command="handleCommand">-->
              <!--<span class="el-dropdown-link">-->
                <!--{{ chosen }}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
                      <!--<el-dropdown-menu  style="background-color: rgba(255,255,255,0.5)" slot="dropdown">-->
                        <!--<el-dropdown-item command="所有设备">所有设备</el-dropdown-item>-->
                        <!--<el-dropdown-item command="1号塔吊">1号物料提升机</el-dropdown-item>-->
                        <!--<el-dropdown-item command="2号塔吊">2号物料提升机</el-dropdown-item>-->
                        <!--<el-dropdown-item command="3号塔吊">3号物料提升机</el-dropdown-item>-->
                        <!--<el-dropdown-item command="4号塔吊">4号物料提升机</el-dropdown-item>-->
                        <!--<el-dropdown-item command="5号塔吊">5号物料提升机</el-dropdown-item>-->
                      <!--</el-dropdown-menu>-->
                    <!--</el-dropdown>-->
                  <!--</div>-->
                  <!--<div id="alarmType2" class="alarm-type"></div>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">-->
                  <!--<div class="border-top-left"></div>-->
                  <!--<div class="box-title">设备维护统计</div>-->
                  <!--<div id="alarmTrend2" class="alarm-trend"></div>-->
                <!--</div>-->
              <!--</el-col>-->
              <!--<el-col :span="8" style="padding: 0 0.5vw; ">-->
                <!--<div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">-->
                  <!--<div class="border-top-left"></div>-->
                  <!--<div class="box-title">报警记录</div>-->
                  <!--<dv-scroll-board :config="configTable2" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />-->
                <!--</div>-->
              <!--</el-col>-->
            <!--</el-row>-->
          <!--</div>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="施工升降机" name="third" lazy>
          <div>
            <el-row style="margin-bottom: 1.4vh; ">
              <el-col :span="6" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">施工升降机数据</div>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="style-btn" size="mini" @click="gotoTD">七张表</el-button>
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>4</li>
                          <li style="color: #3FA0C3; font-size: 0.25rem; ">在线数</li>
                        </ul>
                      </dv-decoration-9>
                    </el-col>
                    <el-col :span="12">
                      <dv-decoration-9 class="tower-data">
                        <ul style="list-style: none; padding: 0; text-align: center; ">
                          <li>2</li>
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
                    <ul class="device-list">
                      <li @mouseover="infohover1 = false" @mouseout="infohover1 = true">
                        <div class="device-detail">
                          <el-image v-show="infohover1" :src="require('../../src/assets/tower/tadiao1.jpg')" fit="fill" style="height: 80%; " />
                          <div v-show="!infohover1" class="device-detail-info">
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
                      <li @mouseover="infohover2 = false" @mouseout="infohover2 = true">
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
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="5" style="padding: 0 0.5vw; ">
                <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
                  <div class="border-top-left"></div>
                  <div class="box-title">处理总览</div>
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
                  <div style="margin-left: 80%; ">
                    <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ chosen }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                      <el-dropdown-menu  style="background-color: rgba(255,255,255,0.5)" slot="dropdown">
                        <el-dropdown-item command="所有设备">所有设备</el-dropdown-item>
                        <el-dropdown-item command="1号塔吊">1号施工升降机</el-dropdown-item>
                        <el-dropdown-item command="2号塔吊">2号施工升降机</el-dropdown-item>
                        <el-dropdown-item command="3号塔吊">3号施工升降机</el-dropdown-item>
                        <el-dropdown-item command="4号塔吊">4号施工升降机</el-dropdown-item>
                        <el-dropdown-item command="5号塔吊">5号施工升降机</el-dropdown-item>
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
                  <div class="box-title">报警记录</div>
                  <dv-scroll-board :config="configTable3" style="width: 100%; height: calc(53vh - 10px - 0.5rem); " />
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="特种设备" name="fourth">-->
          <!--&lt;!&ndash; <span style="color: white">特种设备</span> &ndash;&gt;-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="视频设备" name="five">-->
          <!--&lt;!&ndash; <span style="color: white">视频设备</span> &ndash;&gt;-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>



  </div>
</template>

<script>
import echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme

export default {
  created() {

  },
  mounted() {
    this.$store.dispatch('changeMsg', '设备管理');
    this.initAlarmType()
    this.initAlarmTrend()

  },
  data() {
    return {
      alarmTypeChart: null,
      alarmTypeChart2: null,
      alarmTrendChart: null,
      alarmTrendChart2: null,
      alarmTypeChart3: null,
      showEchart: false,
      configPie: {
        data: [
          {
            name: '红色报警',
            value: 55
          },
          {
            name: '已处理',
            value: 120
          },
          {
            name: '黄色报警',
            value: 78
          }
        ],
        digitalFlopStyle: {
          fontSize: 17
        },
        color: ['#f56c6c', '#67c23a', '#e6a23c'],
        showOriginValue: true
      },
      configTable: {
        header: ['设备名称', '报警时间', '报警类型', '处理情况', '报警数值'],
        headerHeight: 45,
        data: [
          ['1号塔吊', '2019-10-13 13:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 53.5],
          ['2号塔吊', '2019-10-13 14:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 54.5],
          ['3号塔吊', '2019-10-15 15:14:01', '风速限位', '<span style="color: #67c23a; ">已处理</span>', 57.5],
          ['4号塔吊', '2020-01-13 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
          ['2号塔吊', '2019-01-01 08:14:01', '高度限位', '<span style="color: #67c23a; ">已处理</span>', 56.5],
          ['5号塔吊', '2019-12-30 10:14:01', '幅度限位', '<span style="color: #f56c6c; ">红色报警</span>', 87.5],
          ['3号塔吊', '2020-01-15 12:14:01', '风速限位', '<span style="color: #f56c6c; ">红色报警</span>', 97],
          ['1号塔吊', '2020-05-07 03:14:01', '角度限位', '<span style="color: #e6a23c; ">黄色报警</span>', 123.5],
        ],
        rowNum: 7,
        align: ['center', 'center', 'center', 'center', 'center'],
        headerBGC: '',
        evenRowBGC: '',
        columnWidth: [ , 200]
      },
      configTable2: {
        header: ['设备名称', '报警时间', '报警类型', '处理情况', '报警数值'],
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
        header: ['设备名称', '报警时间', '报警类型', '处理情况', '报警数值'],
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
          data: ['风速', '角度', '幅度', '高度'],
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
            data: [310, 270, 110, 105]
          },
          {
            name: '今天',
            type: 'bar',
            data: [300, 250, 100, 100]
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
          data: ['风速', '角度', '幅度', '高度'],
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
            data: [310, 270, 110, 105]
          },
          {
            name: '今天',
            type: 'bar',
            data: [300, 250, 100, 100]
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
          data: ['风速', '角度', '幅度', '高度'],
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
            data: [310, 270, 110, 105]
          },
          {
            name: '今天',
            type: 'bar',
            data: [300, 250, 100, 100]
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
          data: ['一号塔吊', '二号塔吊', '三号塔吊', '四号塔吊'],
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
          data: ['一号施工升降机', '二号施工升降机', '三号施工升降机', '四号施工升降机'],
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
    refresh() {
      this.alarmTypeChart.dispose();
      this.alarmTrendChart.dispose();
      this.initAlarmType();
      this.initAlarmTrend();
    },
    handleCommand(command) {
      this.chosen = command;
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
    gotoTD() {
      this.$router.push('/deviceOne')
    },
    gotoHistory() {
      this.$router.push('/historyData')
    },
    gotoHistory2() {
      this.$router.push('/historySJ')
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
  font-size: 0.25rem;
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
  animation: moving 12s linear infinite;
  width: 35rem;
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
