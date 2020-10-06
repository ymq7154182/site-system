<template>
  <div class="upload_first">
    <el-upload
      action="http://121.36.106.18:38080/schedule/putImage"
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :data="obj"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {uploadImage} from '@/api/scheduleManage'
  export default {
    name: 'uploadImage',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        obj: {
          deptId: 0
        }
      };
    },
    computed: {
        deptId () {
          return this.$store.state.deptId
        }
      },
    mounted () {
      this.obj.deptId = this.deptId
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        // console.log('hehh', file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(file) {
        // console.log('啊哈哈哈', file)
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
</style>
