<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 1.4vh; ">
      <el-col :span="6" style="padding-left: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div class="border-top-left">

          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div>

          </div>
        </div>
      </el-col>
      <el-col :span="5"  style="padding-right: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 28vh; width: 100%; ">
          <div>

          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8" style="padding-left: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">

        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">

        </div>
      </el-col>
      <el-col :span="8" style="padding-right: 1vw; ">
        <div style="background-color: rgba(0, 36, 78, 0.5); height: 53vh; width: 100%; ">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Device Manage',
  mounted() {
    this.$store.dispatch('changeMsg', '设备管理')
  }
}
</script>

<style>
.border-top-left {
  height: 10px;
  background-image: url("../../src/assets/border/right-top.png");
  background-size: 100% 100%;
  width: 100%;
}
</style>
