<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleTabs" >
        <el-tab-pane label="人员管理" name="first" :key="'first'" class="label_top">
          <shou-ye v-if="shouye"></shou-ye>
           <!-- <shou-ye ></shou-ye> -->
        </el-tab-pane>
        <el-tab-pane label="劳务实名制" name="second" :key="'second'" class="label_top">
          <service-real-name v-if="service"></service-real-name>
           <!-- <service-real-name ></service-real-name> -->
        </el-tab-pane>
       
        <el-tab-pane label="特种作业人员" name="third" :key="'third'" class="label_top">
          <special-equ v-if="equPeople"> </special-equ>
          <!-- <special-equ> </special-equ> -->
        </el-tab-pane>
        <el-tab-pane label="劳务考勤" name="fourth" :key="'fourth'" class="label_top">
          <service-kq v-if="serviceKq"></service-kq>
           <!-- <service-kq></service-kq> -->
        </el-tab-pane>

      </el-tabs>
    </div>


  </div>
</template>

<script>
import kqHistory from './kqHistory'
import shouYe from './shouYe'
import specialEqu from "./specialEqu";
import serviceRealName from './serviceRealName';
import serviceKq from './serviceKq';
export default {
  name: "peopleManager",
  components: {
    kqHistory,
    shouYe,
    specialEqu,
    serviceRealName,
    serviceKq
  },
  data(){
    return{
      activeName: 'first',
      shouye: true,
      service: false,
      equPeople: false,
      serviceKq: false
    }

  },
  mounted() {
    this.$store.dispatch('changeMsg', '人员管理')

  },
  methods:{
    handleTabs(tab, event) {
      console.log("TAB", tab)
       if(tab.name === 'first') {
         this.shouye = true
         this.service = false
         this.equPeople = false
         this.serviceKq = false
       } else if(tab.name === 'second') {
         this.shouye = false
         this.service = true
         this.equPeople = false
         this.serviceKq = false
       } else if(tab.name === 'third') {
         this.shouye = false
         this.service = false
         this.equPeople = true
         this.serviceKq = false
       } else {
         this.shouye = false
         this.service = false
         this.equPeople = false
         this.serviceKq = true
       }
    },
  }

}
</script>

<style scoped>
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
  background-image: url("../../assets/homepage/notice_bg.png");
  padding-left: 0.3rem;
}
</style>

