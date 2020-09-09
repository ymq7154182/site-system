<template>
    <div class="videoManager">
        <el-row>
            <el-col :span="18">

                <!-- 只有一个视频 -->
                <div class="videoArea" v-if="videoOne">
                    
                    
                    <!-- <dv-border-box-8> -->
                        <div class="oneArea" id="one" >
                            
                            <img src="../../assets/videoManager/1.png" />
                            
                        </div>
                    <!-- </dv-border-box-8>  -->
                </div>

                <!-- 两个视频 -->
                <div class="twoVideoArea" v-if="videoTwo">
                    <!-- <dv-border-box-8> -->
                        <div class="twoArea" id="two1" >
                            <img src="../../assets/videoManager/1.png" />
                        </div>
                    <!-- </dv-border-box-8> 
                     <dv-border-box-8> -->
                        <div class="twoArea" id="two2" >
                            <img src="../../assets/videoManager/2.png" />
                        </div>
                    <!-- </dv-border-box-8>  -->
                </div>

                <!-- 四个视频 -->
                <div class="fourVideoArea" v-if="videoFour">
                    <div class="fourVideoArea_1">
                        <!-- <dv-border-box-8> -->
                            <div class="fourArea" id="four1" >
                                <img src="../../assets/videoManager/1.png" />
                            </div>
                        <!-- </dv-border-box-8> 
                        <dv-border-box-8> -->
                            <div class="fourArea" id="four2" >
                                <img src="../../assets/videoManager/2.png" />
                            </div>
                        <!-- </dv-border-box-8>  -->
                    </div>
                    <div class="fourVideoArea_1">
                        <!-- <dv-border-box-8> -->
                            <div class="fourArea" id="four3" >
                                <img src="../../assets/videoManager/3.png" />
                            </div>
                        <!-- </dv-border-box-8> 
                        <dv-border-box-8> -->
                            <div class="fourArea" id="four4" >
                                <img src="../../assets/videoManager/4.png" />
                            </div>
                        <!-- </dv-border-box-8>  -->
                    </div>
                    
                    
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
                            <div class="fourIcon" @click="selectFour">
                                <span :class="[!videoFour ? 'sp_4': 'sp_4_select']"></span>
                                <p>四栏</p>
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
            videoOne: false,
            videoTwo: false,
            videoFour: true,
            treeData: [{
                label: '石家庄智慧工地项目一期',
                children: [
                    {
                        id: 1,
                        label: '大门',
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
        this.$store.dispatch('changeMsg', '视频监控')
    },
    methods: {
        selectOne() {
           
            this.videoOne = true;
            this.videoTwo = false;
            this.videoFour = false;

        },
        selectTwo() {
            this.videoOne = false;
            this.videoTwo = true;
            this.videoFour = false;
        },
        selectFour() {
            this.videoOne = false;
            this.videoTwo = false;
            this.videoFour = true;
        },
        handleNodeClick(data) {
            console.log(data);
        }
    }
}
</script>

<style >
.videoManager {
    margin: 0.1667rem;
   
}
.videoArea {
    
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 10rem;
    animation: daxiao_1 1s linear;
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
    width:100%;
    height: 100%;
    /* background-image: url("../../assets/videoManager/bg_chang.png"); 
    background-size: 100% 100%; 
    background-repeat: no-repeat; */
    display: flex;
    justify-content: center;
    align-items: center; 
   margin: 0 auto;
   margin-right: 0.6rem;
    margin-left: 0.5rem;
   border:1px solid rgb(223, 187, 187); 
    
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
    height: 100%;
    width: 100%;
    margin: 0 auto;
    margin-right: 0.6rem;
    margin-left: 0.5rem;
   border:1px solid rgb(223, 187, 187); 

}
.fourVideoArea {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
   
    height: 10rem;
    animation: daxiao_1 1s linear;
}
.fourVideoArea_1 {
    flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
.fourArea {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;
    margin: 0 auto;
    margin-right: 0.6rem;
    margin-left: 0.5rem;
    border:1px solid rgb(223, 187, 187); 
}
.fenge {
    background: transparent;
    height: 10rem;
}
.controllerArea {
    
    background-image: url("../../assets/videoManager/bg_chang.png"); 
    background-size:  100% 70%; 
    background-repeat: no-repeat;
    height: 3rem;
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
.controllerIcon span {
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
.sp_4 {
    background: url("../../assets/videoManager/four.png") no-repeat;
}
.sp_1_select {
    background: url("../../assets/videoManager/one_select.png") no-repeat;
}
.sp_2_select {
    background: url("../../assets/videoManager/two_select.png") no-repeat;
}
.sp_4_select {
    background: url("../../assets/videoManager/four_select.png") no-repeat;
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
.el-tree-node:focus > .el-tree-node__content {
    background-color: #66b1ff87 !important;
  }
  .el-tree-node__content:hover {    background-color: #66b1ff87;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #66b1ff87;
  }
  .el-icon-video-camera {
      color: rgb(230, 92, 92);
      font-size: 13px;
      padding-right:8px; 
  }
</style>

