<template>
    <div>
      <div class="header-bg">
        <img src="../../../assets/header/TOP.png" class="header-img">
        <div class="div-tag" style="float: left">
          <!--<ul>-->
            <!--<li>-->
              <!--<div class="li-text">-->
                <!--<img src="../../../assets/header/tagleftcheck.png" class="tag-img">-->
                <!--<div class="li-div">项目概览</div>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="li-text" style="margin-left: 1.7rem">-->
                <!--<img src="../../../assets/header/tagleftcheck.png" class="tag-img">-->
                <!--<div class="li-div">人员管理</div>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="li-text" style="margin-left: 3.4rem">-->
                <!--<img src="../../../assets/header/tagleftcheck.png" class="tag-img">-->
                <!--<div class="li-div">安全管理</div>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="li-text" style="margin-left: 5.1rem">-->
                <!--<img src="../../../assets/header/tagleftcheck.png" class="tag-img">-->
                <!--<div class="li-div">设备管理</div>-->
              <!--</div>-->
            <!--</li>-->
            <!--<li>-->
              <!--<div class="li-text" style="margin-left: 6.8rem">-->
                <!--<img src="../../../assets/header/tagleftcheck.png" class="tag-img">-->
                <!--<div class="li-div">视频监控</div>-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->
          <ul class="ul1">
            <li>
              <div class="li-text2 " :class="{'bg-img1': textStyle=== '项目概览', 'bg-img2': textStyle!== '项目概览'}" @click="gotoPage">
                <span>
                   项目概览
                </span>

              </div>
            </li>
            <li>
              <div class="li-text2 pos-style1 " :class="{'bg-img1': textStyle=== '人员管理', 'bg-img2': textStyle!== '人员管理'}" @click="gotoTest">
                <span>
                   人员管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style2 " :class="{'bg-img1': textStyle=== '安全管理', 'bg-img2': textStyle!== '安全管理'}" @click="securityControl">
                  <span>
                   安全管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style3" :class="{'bg-img1': textStyle=== '设备管理', 'bg-img2': textStyle!== '设备管理'}" @click="gotoDevice">
                  <span>
                   设备管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style4" :class="{'bg-img1': textStyle=== '视频监控', 'bg-img2': textStyle!== '视频监控'}" @click="gotoVideo">
                  <span>
                   视频监控
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="head-text"></div>
        <div class="div-tag right-tag" style="padding-right: 0.15rem;">
          <ul class="ul2">
          <li>
            <div class="li-text2" :class="{'bg-img23': textStyle=== '进入系统', 'bg-img22': textStyle!== '进入系统'}">
                <span>
                   进入系统
                </span>

            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right1" :class="{'bg-img23': textStyle=== '资料管理', 'bg-img22': textStyle!== '资料管理'}">
                <span>
                   资料管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right2" :class="{'bg-img23': textStyle=== '质量管理', 'bg-img22': textStyle!== '质量管理'}" >
                  <span>
                   质量管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right3" :class="{'bg-img23': textStyle=== '生产管理', 'bg-img22': textStyle!== '生产管理'}">
                  <span>
                   生产管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right4" :class="{'bg-img23': textStyle=== '绿色施工', 'bg-img22': textStyle!== '绿色施工'}" @click="gotoGreen">
                  <span>
                   绿色施工
                </span>
            </div>
          </li>
        </ul></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "header",
      // data() {
      //   return {
      //     textStyle: ''
      //   }
      // },
      computed: {
        textStyle() {
          return this.$store.state.textStyle
        }
      },
      mounted() {
        // this.textStyle = this.$store.state.textStyle
      },
      methods: {
        gotoPage() {
          // this.textStyle = '项目概览'

          this.$router.push('/')
          // this.textStyle = this.$store.state.textStyle

        },
        gotoTest() {
          // this.textStyle = '人员管理'
          this.$router.push('/peopleManager')
          // this.textStyle = this.$store.state.textStyle
        },
        gotoDevice() {
          this.$router.push('/device')
        },
        gotoVideo() {
          this.$router.push('/videoManager')
        },
        securityControl() {
          this.$router.push('/qualityControl')
        },
        gotoGreen () {
          this.$router.push('/greenConstruction')
        }
      }
    }
</script>

<style scoped>
  .header-bg {
    width: 100%;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    position: relative;
  }
  .header-img {
    width: 100%;
  }
  .div-tag {
    position: absolute;
    top: 0.5rem;

    /*padding-left: 10px;*/
    padding-left: 0.15rem;

  }

  .right-tag {
    right: 0;
  }


  .div-tag .ul1 li {
    padding:0;margin:0;list-style:none;

    /*left: 1rem;*/
    float: left;
    /*position: relative;*/
    /*font-size: 1rem;*/
    font-size: 1.2em;

    color: #ededed;
  }
  .div-tag .ul2 li {
    padding:0;margin:0;list-style:none;

    /*left: 1rem;*/
    float: right;
    /*position: relative;*/
    /*font-size: 1rem;*/
    font-size: 1.2em;

    color: #ededed;
  }
  .div-tag ul li:hover {
    cursor: pointer;
  }
  .div-tag ul li:hover .bg-img2 {
    background-image: url("../../../assets/header/tagleftcheck.png");
  }
  .div-tag ul li:hover .bg-img22 {
    background-image: url("../../../assets/header/rightcheck.png");
  }
  .tag-img {
    width: 1.9rem;
  }
  .li-text {
    position: absolute;


  }
  .li-div {
    /*background-image: url("../../../assets/header/tagleftcheck.png");*/
    /*background-size: 100% 100%;*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .li-text2 {
    position: relative;
    /*position: absolute;*/
    text-align: center;
    line-height: 0.7rem;
    width: 1.9rem;
    height: 0.7rem;
    background-size: 100% 100%;
    /*padding: 0.18rem 0.5rem 0.18rem .5rem;*/
  }
  .pos-style1 {
       left: -0.2rem;
     }
  .pos-style2 {
    left: -0.4rem;
  }
  .pos-style3 {
    left: -0.6rem;
  }
  .pos-style4 {
    left: -0.8rem;
  }
  .pos-style-right1 {
    left: 0.2rem;
  }
  .pos-style-right2 {
    left: 0.4rem;
  }
  .pos-style-right3 {
    left: 0.6rem;
  }
  .pos-style-right4 {
    left: 0.8rem;
  }
  .bg-img1 {
    background-image: url("../../../assets/header/tagleftcheck.png");
  }
  .bg-img2 {
    background-image: url("../../../assets/header/tagleft.png");
  }
  .bg-img22 {
    background-image: url("../../../assets/header/tagright.png");
  }
  .bg-img23 {
    background-image: url("../../../assets/header/rightcheck.png");
  }
  .head-text {
    width: 4rem;
    height: 0.45rem;
    background-size: 100% 100%;
    /*font-size: 0.4rem;*/
    /*font-family: "Adobe Heiti Std";*/
    /*color: rgb(255, 255, 255);*/
    /*text-transform: uppercase;*/
    /*line-height: 1.934;*/
    /*-moz-transform: matrix( 1.12300210614388,0,0,1.12300210614388,0,0);*/
    /*-webkit-transform: matrix( 1.12300210614388,0,0,1.12300210614388,0,0);*/
    /*-ms-transform: matrix( 1.12300210614388,0,0,1.12300210614388,0,0);*/
    background-image: url("../../../assets/header/titletext.png");
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0.4rem;
    /*z-index: 1103;*/
  }


</style>
