<template>
  <div class="upload_first">
    <div>
      <el-image
        :src="item"
        :preview-src-list="imageList"
        v-for="(item, index) in imageList" :key="index" class="img_item"
      >
      </el-image>
<!--      <img :src="item" alt="" v-for="(item, index) in imageList" :key="index" class="img_item">-->
    </div>
    <el-upload
      action="http://121.36.106.18:38080/schedule/putImage"
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :data="obj"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {getImageList} from '@/api/scheduleManage'
  export default {
    name: 'uploadImage',
    data() {
      return {
        imageList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        obj: {
          deptId: 0
        },
        
      };
    },
    computed: {
        deptId () {
          return this.$store.state.deptId
        }
      },
    mounted () {
      
      this.obj.deptId = localStorage.getItem('siteId')
      
      this.getImageList()
    },
    methods: {
      getImageList () { // 获取所有图片
      this.imageList = []
        getImageList({
          deptId: localStorage.getItem('siteId')
        }).then(res => {
          let imgs = res.data.scheduleImgUrl
          let list = imgs.split(';').slice(1)
          for (let i in list) {
            this.imageList.push('http://121.36.106.18:38082' + list[i])
          }
          console.log('所有图片：', list, this.imageList)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        // console.log('hehh', file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(file) {

        console.log('啊哈哈哈', file)
        this.getImageList()
      }
    }
  }
</script>
<style scoped>
  .upload_first {
    text-align: center;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: 5vh;
  }
  .img_item {
    width: 5rem;
    height: 5rem;
    border-radius: 0.1rem;
    margin-right: 0.1rem;
  }
</style>
<style>
  .el-upload-list--picture-card .el-upload-list__item {
    width: 5rem;
    height: 5rem;
  }
  .el-upload--picture-card {
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
  }
  .el-image-viewer__btn .el-icon-circle-close {
    color: #fff;
  }
</style>
