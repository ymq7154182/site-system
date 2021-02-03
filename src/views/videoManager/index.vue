<template>

    <div class="videoManager">
        <el-row>
            <el-col :span="18">

                <!-- 只有一个视频 -->
                <div class="videoArea" v-if="videoOne">
                    <div class="oneArea" id="one" >

                        <img src="../../assets/videoManager/v_3.png" />
                        <div class="btns"> 
                            <el-button size="mini" type="primary">关注</el-button>
                            <el-button size="mini" type="success">放大</el-button>
                            <el-button size="mini" type="info">回放</el-button>
                            <el-button size="mini" type="warning">抓拍</el-button>
                            <el-button size="mini" type="danger">录制</el-button>
                        </div>

                    </div>
                </div>

                <!-- 两个视频 -->
                <div class="twoVideoArea" v-if="videoTwo">
                    <!-- <dv-border-box-8> -->
                        <div class="twoArea" id="two1" >
                            <img src="../../assets/videoManager/v_2.png" />
                            <div class="btns"> 
                                <el-button size="mini" type="primary">关注</el-button>
                                <el-button size="mini" type="success">放大</el-button>
                                <el-button size="mini" type="info">回放</el-button>
                                <el-button size="mini" type="warning">抓拍</el-button>
                                <el-button size="mini" type="danger">录制</el-button>
                            </div>
                        </div>
                    <!-- </dv-border-box-8>
                     <dv-border-box-8> -->
                        <div class="twoArea" id="two2" >
                            <img src="../../assets/videoManager/v_3.png" />
                            <div class="btns"> 
                                <el-button size="mini" type="primary">关注</el-button>
                                <el-button size="mini" type="success">放大</el-button>
                                <el-button size="mini" type="info">回放</el-button>
                                <el-button size="mini" type="warning">抓拍</el-button>
                                <el-button size="mini" type="danger">录制</el-button>
                            </div>
                        </div>
                    <!-- </dv-border-box-8>  -->

                </div>

                 <!-- 三个视频 -->
                <div class="fourVideoArea" v-if="videoThree">
                    <div class="fourVideoArea_1">
                        
                            <div class="fourArea" id="four1" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        
                            <div class="fourArea" id="four2" >
                                <img src="../../assets/videoManager/v_2.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                    </div>
                    <div class="fourVideoArea_1">
                            <div class="fourArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        
                            <!-- <div class="fourArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" style="width:81%;"/>
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div> -->
                    </div>
                   <div class="shengluehao">...</div>


                </div>

                <!-- 四个视频 -->
                <div class="fourVideoArea" v-if="videoFour">
                    <div class="fourVideoArea_1">
                        <!-- <dv-border-box-8> -->
                            <div class="fourArea" id="four1" >
                               
                                <!-- <img src="../../assets/videoManager/v_1.png" /> -->
                                <video style="width:100%; height:100%; object-fit: fill" controls autoplay muted id="video1" src=""></video>
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        <!-- </dv-border-box-8>
                        <dv-border-box-8> -->
                            <div class="fourArea" id="four2" >
                                <!-- <img src="../../assets/videoManager/v_2.png" /> -->
                                <video style="width:100%; height:100%; object-fit: fill" controls autoplay muted id="video2" src=""></video>
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        <!-- </dv-border-box-8>  -->
                    </div>
                    <div class="fourVideoArea_1">
                        <!-- <dv-border-box-8> -->
                            <div class="fourArea" id="four3" >
                                <!-- <img src="../../assets/videoManager/v_3.png" /> -->
                                 <video style="width:100%; height:100%; object-fit: fill" controls autoplay muted id="video3" src=""></video>
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        <!-- </dv-border-box-8>
                        <dv-border-box-8> -->
                            <div class="fourArea" id="four4" >
                                <!-- <img src="../../assets/videoManager/v_4.png" /> -->
                                 <video style="width:100%; height:100%; object-fit: fill" controls autoplay muted id="video4" src=""></video>
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>
                        <!-- </dv-border-box-8>  -->
                    </div>
                   <div class="shengluehao">...</div>


                </div>

                <!-- 六个视频 -->
                <div class="sixVideoArea" v-if="videoSix">
                    <div class="sixVideoArea_1">
                            <div class="sixArea" id="four1" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                            <div class="sixArea" id="four2" >
                                <img src="../../assets/videoManager/v_2.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>

                            <div class="sixArea" id="four5" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                    </div>
                    <div class="sixVideoArea_1">
                       
                            <div class="sixArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                      
                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>

                            <div class="sixArea" id="four6" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        
                    </div>
                   <div class="shengluehao">...</div>


                </div>


                <!-- 八个视频 -->
                <div class="sixVideoArea" v-if="videoEight">
                    <div class="sixVideoArea_1">
                            <div class="sixArea" id="four1" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                            <div class="sixArea" id="four2" >
                                <img src="../../assets/videoManager/v_2.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>

                            <div class="sixArea" id="four5" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                    </div>
                    <div class="sixVideoArea_1">
                       
                            <div class="sixArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                      
                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>

                            <div class="sixArea" id="four6" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="sixVideoArea_1">
                       
                            <div class="sixArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                      
                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>
                    </div>
                   <div class="shengluehao">...</div>


                </div>
               

                <!-- 九个视频 -->
                <div class="sixVideoArea" v-if="videoNine">
                    <div class="sixVideoArea_1">
                            <div class="sixArea" id="four1" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                            <div class="sixArea" id="four2" >
                                <img src="../../assets/videoManager/v_2.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>

                            <div class="sixArea" id="four5" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                       
                    </div>
                    <div class="sixVideoArea_1">
                       
                            <div class="sixArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                      
                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>

                            <div class="sixArea" id="four6" >
                               
                                <img src="../../assets/videoManager/v_1.png" />
                                <div class="btns"> 
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                        
                    </div>
                    <div class="sixVideoArea_1">
                       
                            <div class="sixArea" id="four3" >
                                <img src="../../assets/videoManager/v_3.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            </div>
                      
                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>

                            <div class="sixArea" id="four4" >
                                <img src="../../assets/videoManager/v_4.png" />
                                 <div class="btns">
                                    <el-button size="mini" type="primary">关注</el-button>
                                    <el-button size="mini" type="success">放大</el-button>
                                    <el-button size="mini" type="info">回放</el-button>
                                    <el-button size="mini" type="warning">抓拍</el-button>
                                    <el-button size="mini" type="danger">录制</el-button>
                                </div>
                            
                            </div>
                    </div>
                   <div class="shengluehao">...</div>


                </div>

            </el-col>
            <el-col :span="1"><div class="fenge"></div></el-col>

            <el-col :span="5">
                <el-row>
                    <div class="controllerArea">
                        <div class="box-txt">
                            <span>视频控制</span>
                        </div>
                        <div class="controllerIcon">
                            <div class="oneIcon" @click="selectOne">
                                <span :class="[!videoOne ? 'sp_1': 'sp_1_select']"></span>
                                <p>一栏</p>
                            </div>
                            <div class="twoIcon" @click="selectTwo">
                                <span :class="[!videoTwo? 'sp_2': 'sp_2_select']"></span>
                                <p>二栏</p>
                            </div>
                            <div class="twoIcon" @click="selectThree">
                                <span :class="[!videoThree? 'sp_3': 'sp_3_select']"></span>
                                <p>三栏</p>
                            </div>
                            <div class="fourIcon" @click="selectFour">
                                <span :class="[!videoFour ? 'sp_4': 'sp_4_select']"></span>
                                <p>四栏</p>
                            </div>
                        </div>
                        <div class="controllerIcon1">
                            <div class="oneIcon" @click="selectSix">
                                <span :class="[!videoSix ? 'sp_6': 'sp_6_select']"></span>
                                <p>六栏</p>
                            </div>
                            <div class="twoIcon" @click="selectEight">
                                <span :class="[!videoEight? 'sp_8': 'sp_8_select']"></span>
                                <p>八栏</p>
                            </div>
                            <div class="twoIcon" @click="selectNine">
                                <span :class="[!videoNine? 'sp_9': 'sp_9_select']"></span>
                                <p>九栏</p>
                            </div>
                           
                        </div>
                        
                    </div>
                </el-row>
                <el-row>
                    <div class="fenleiController">
                        <dv-border-box-7>
                            <div class="treeController">
                                <!-- <el-tree :data="treeData"  @node-click="handleNodeClick"></el-tree> -->
                                <el-tree :data="treeData" node-key="id" default-expand-all @node-click="handleNodeClick">
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>
                                            <i :class="data.icon"></i>{{ node.label }}
                                        </span>
                                    </span>
                                </el-tree>
                            </div>
                        </dv-border-box-7>
                    </div>


                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "videoManager",
    data() {
        return {
            video1: null,
            hls1: null,
            video2: null,
            hls2: null,
            video3: null,
            hls3: null,
            video4: null,
            hls4: null,
            videoOne: false,
            videoTwo: false,
            videoThree: false,
            videoFour: true,
            videoSix: false,
            videoEight: false,
            videoNie: false,
            treeData: [{
                label: '石家庄宝能中心项目二标段',
                children: [
                    {
                        id: 1,
                        label: '石家庄宝能中心项目二标段-大门-枪机',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 2,
                        label: '人行通道',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 3,
                        label: '大门口',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 4,
                        label: '东南角',
                        icon: 'el-icon-video-camera'
                    },

                    {
                        id: 5,
                        label: '西南角',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 6,
                        label: '钢筋加工区',
                        icon: 'el-icon-video-camera'
                    },

                    {
                        id: 7,
                        label: '南大门外',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 8,
                        label: '中间通道',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 9,
                        label: '南侧大门内',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 10,
                        label: '西侧大门',
                        icon: 'el-icon-video-camera'
                    },
                    {
                        id: 11,
                        label: '东侧大门',
                        icon: 'el-icon-video-camera'
                    }


                    ]
                }],




        }
    },
    mounted() {
        this.$store.dispatch('changeMsg', '视频管理')
        this.playVideo1('http://218.11.12.60:30001/live/1616.m3u8')
        this.playVideo2('http://218.11.12.60:30001/live/1617.m3u8')
        this.playVideo3('http://218.11.12.60:30001/live/1618.m3u8')
        this.playVideo4('http://218.11.12.60:30001/live/1619.m3u8')
        
// 218.11.12.60:30001/live/1909.m3u8
// 218.11.12.60:30001/live/1895.m3u8
// 218.11.12.60:30001/live/1894.m3u8
    },
    methods: {
        playVideo1(videoUrl) {
            var video = document.getElementById('video1');
            this.video1 = video
            var Hls = window.Hls
            if (Hls.isSupported()) {
                var hls = new Hls()
                this.hls1 = hls
                hls.loadSource(videoUrl)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play()
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl
                video.addEventListener('loadedmetadata', function () {
                video.play()
                })
            }
        },
        playVideo2(videoUrl) {
            var video = document.getElementById('video2');
            this.video2 = video
            var Hls = window.Hls
            if (Hls.isSupported()) {
                var hls = new Hls()
                this.hls2 = hls
                hls.loadSource(videoUrl)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play()
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl
                video.addEventListener('loadedmetadata', function () {
                video.play()
                })
            }
        },
        playVideo3(videoUrl) {
            var video = document.getElementById('video3');
            this.video3 = video
            var Hls = window.Hls
            if (Hls.isSupported()) {
                var hls = new Hls()
                this.hls3 = hls
                hls.loadSource(videoUrl)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play()
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl
                video.addEventListener('loadedmetadata', function () {
                video.play()
                })
            }
        },
        playVideo4(videoUrl) {
            var video = document.getElementById('video4');
            this.video4 = video
            var Hls = window.Hls
            if (Hls.isSupported()) {
                var hls = new Hls()
                this.hls4 = hls
                hls.loadSource(videoUrl)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play()
                })
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoUrl
                video.addEventListener('loadedmetadata', function () {
                video.play()
                })
            }
        },
        selectOne() {
            this.videoOne = true;
            this.videoTwo = false;
            this.videoThree = false;
            this.videoFour = false;
            this.videoSix = false;
            this.videoEight = false;
            this.videoNine = false;
        },
        selectTwo() {
            this.videoOne = false;
            this.videoTwo = true;
            this.videoThree = false;
            this.videoFour = false;
            this.videoSix = false;
            this.videoEight = false;
            this.videoNine = false;
        },
        selectThree() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoThree = true;
            this.videoFour = false;
            this.videoSix = false;
            this.videoEight = false;
            this.videoNine = false;
        },
        selectFour() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoThree = false;
            this.videoFour = true;
            this.videoSix = false;
            this.videoEight = false;
            this.videoNine = false;
        },
        selectSix() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoThree = false;
            this.videoFour = false;
            this.videoSix = true;
            this.videoEight = false;
            this.videoNine = false;
        },
        selectEight() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoThree = false;
            this.videoFour = false;
            this.videoSix = false;
            this.videoEight = true;
            this.videoNine = false;
        },
        selectNine() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoThree = false;
            this.videoFour = false;
            this.videoSix = false;
            this.videoEight = false;
            this.videoNine = true;
        },
        handleNodeClick(data) {
            console.log(data);
        }
    }
}
</script>

<style scoped>
.videoManager {
    margin: 0.1667rem;

}
.videoArea {

    display: flex;
    justify-content: center;
    align-items: center;
    height: 10rem;
    /* animation: daxiao_1 1s linear; */
    margin: 0 auto;

}
@keyframes daxiao_1 {
	from {
		transform: scale(0,0);
		transform-origin: left top;
	}

	to {
		transform: scale(1,1);
		transform-origin: left top;
	}
}
.oneArea {
    width:80%;
    height: 80%;
    /* background-image: url("../../assets/videoManager/bg_chang.png");
    background-size: 100% 100%;
    background-repeat: no-repeat; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
   margin: 0 auto;
   margin-right: 0.6rem;
    margin-left: 0.5rem;
   /* border:1px solid rgb(223, 187, 187); */
   animation: daxiao_1 1s linear;

}

.twoVideoArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 9rem;
    animation: daxiao_1 1s linear;

}
.twoArea {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80%;
    width: 80%;
    margin: 0 auto;
    margin-right: 0.6rem;
    margin-left: 0.5rem;
   /* border:1px solid rgb(223, 187, 187); */

}
.fourVideoArea {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    height: 9rem;
    animation: daxiao_1 1s linear;
}
.sixVideoArea {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    height: 9rem;
    animation: daxiao_1 1s linear;
}
.shengluehao {
    margin: 0 auto;
    margin-top: -0.5rem;
    font-size: 38px;
    color: white;
}
.fourVideoArea_1 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
}
.sixVideoArea_1 {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
}

.fourArea {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80%;
    width: 80%;
    margin: 0 auto;
    margin-right: 0.6rem;
    margin-left: 0.5rem;
    /* border:1px solid rgb(223, 187, 187); */
}
.sixArea {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80%;
    width: 100%;
    margin: 0 auto;
    margin-right: 0.1rem;
    margin-left: 0.1rem;
    /* border:1px solid rgb(223, 187, 187); */
}

.btns {
    margin-top:10px;
}
.fenge {
    background: transparent;
    height: 10rem;
}
.controllerArea {

    background-image: url("../../assets/videoManager/bg_chang.png");
    background-size:  100% 70%;
    background-repeat: no-repeat;
    height: 4.7rem;
}
.box-txt {
    color: #ffa454;
    font-size: 0.3rem;
    position: absolute;
    top: 5%;
    left: 1%;
  }
.controllerIcon {
    display: flex;
    /* flex: 1; */
    padding-top:1rem;
    padding-left:0.5rem;
    color: white;
    text-align: center;
}
.controllerIcon1 {
    display: flex;
    /* flex: 1; */
    padding-top:0.4rem;
    padding-left:0.5rem;
    color: white;
    text-align: center;
}

.controllerIcon span {
    display: block;
    width: 38px;
    height: 38px;
    margin: 0 auto;
}
.controllerIcon1 span {
    display: block;
    width: 38px;
    height: 38px;
    margin: 0 auto;
}
.oneIcon {

    margin: 0 auto;
}
.twoIcon {

    margin: 0 auto;
}
.fourIcon {

    margin: 0 auto;
}
.sp_1 {
    background: url("../../assets/videoManager/one.png") no-repeat;
}
.sp_2 {
    background: url("../../assets/videoManager/two.png") no-repeat;
}
.sp_3 {
    background: url("../../assets/videoManager/three.png") no-repeat;
}
.sp_4 {
    background: url("../../assets/videoManager/four.png") no-repeat;
}
.sp_6 {
    background: url("../../assets/videoManager/six.png") no-repeat;
}
.sp_8 {
    background: url("../../assets/videoManager/eight.png") no-repeat;
}
.sp_9 {
    background: url("../../assets/videoManager/nine.png") no-repeat;
}
.sp_1_select {
    background: url("../../assets/videoManager/one_select.png") no-repeat;
}
.sp_2_select {
    background: url("../../assets/videoManager/two_select.png") no-repeat;
}
.sp_3_select {
    background: url("../../assets/videoManager/three_select.png") no-repeat;
}
.sp_4_select {
    background: url("../../assets/videoManager/four_select.png") no-repeat;
}
.sp_6_select {
    background: url("../../assets/videoManager/six_select.png") no-repeat;
}
.sp_8_select {
    background: url("../../assets/videoManager/eight_select.png") no-repeat;
}
.sp_9_select {
    background: url("../../assets/videoManager/nine_select.png") no-repeat;
}
.fenleiController {
    margin-top: -0.5rem;

}
.treeController {
    /* background-image: url("../../assets/videoManager/bg_chang.png");  */
    /* background-size:  50% 100%;  */
    /* background-repeat: no-repeat; */
     height: 6rem;


}
 .el-tree {
    position: relative;
    cursor: default;
    background: transparent;
    color: #a1bbee;
}
.el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: #66b1ff87 !important;
  }
  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;
  }
  .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
  }
  .el-icon-video-camera {
      color: rgb(230, 92, 92);
      font-size: 13px;
      padding-right:8px;
  }
  img {
      width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>

