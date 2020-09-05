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
              <div class="li-text2 bg-img1" @click="gotoPage">
                <span>
                   项目概览
                </span>

              </div>
            </li>
            <li>
              <div class="li-text2 pos-style1 bg-img2" @click="gotoTest">
                <span>
                   人员管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style2 bg-img2" >
                  <span>
                   安全管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style3 bg-img2">
                  <span>
                   设备管理
                </span>
              </div>
            </li>
            <li>
              <div class="li-text2 pos-style4 bg-img2">
                  <span>
                   视频监控
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div class="div-tag right-tag" style="padding-right: 0.15rem;">
          <ul class="ul2">
          <li>
            <div class="li-text2 bg-img22">
                <span>
                   项目概览
                </span>

            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right1 bg-img22" >
                <span>
                   人员管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right2 bg-img22" >
                  <span>
                   安全管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right3 bg-img22">
                  <span>
                   设备管理
                </span>
            </div>
          </li>
          <li>
            <div class="li-text2 pos-style-right4 bg-img22">
                  <span>
                   视频监控
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
      methods: {
        gotoPage() {
          this.$router.push('/')
        },
        gotoTest() {
          this.$router.push('/test')
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
    background-image: url("../../../assets/header/tagleftcheck.png");
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

    background-size: 100% 100%;
    padding: 0.18rem 0.5rem 0.18rem .5rem;
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
</style>
