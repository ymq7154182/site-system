<template>
  <div>
    <div style="padding: 0.11rem">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleTabs" >
        <el-tab-pane label="进度管理" name="first" :key="'first'" class="label_top">
          <shou-ye v-if="shouye"></shou-ye>
           
        </el-tab-pane>
        <el-tab-pane label="进度情况" name="second" :key="'second'" class="label_top">
          <progress-detail v-if="detail"></progress-detail>
           
        </el-tab-pane>

         <el-tab-pane label="工作记录" name="third" :key="'third'" class="label_top">
          <tab-index v-if="work"></tab-index>
           
        </el-tab-pane>
       
      </el-tabs>
    </div>


  </div>
</template>

<script>
import shouYe from './shouYe'
import progressDetail from "./progressDetail";
import tabIndex from "./tabIndex"
import { mapState } from 'vuex'

export default {
  name: "progressController",
  components: {
    shouYe,
    progressDetail,
    tabIndex
  },
  computed: {
    ...mapState({ 
      order: state => state.order
    }),
  },
  watch: {
    // 根据名称筛选部门树
    // nodeStateId(val){
    //   console.log("node-val", val)
    //   // console.log("node-oldVal", oldVal)
    //   // if(val.label !== oldVal.label) {
    //   //   this.getNodeList()
    //   // }
    // },
   "$store.state.order"(newd, old) {
      console.log("旧的tab", old)
      console.log("新的tab", newd)
      if(newd === 'first') {
        this.activeName = 'first'
          this.shouye = true
         this.detail = false
         this.work = false
      } else if(newd === 'second') {
        this.activeName = 'second'
        this.shouye = false
         this.detail = true
         this.work = false
      } else {
        this.activeName = 'third'
        this.shouye = false
         this.detail = false
         this.work = true
      }
    }
    
  },
  data(){
    return{
      activeName: 'first',
      shouye: true,
      detail: false,
      work: false
    }

  },
  mounted() {
    this.$store.dispatch('changeMsg', '进度管理')

  },
  methods:{
    handleTabs(tab, event) {
      console.log("TAB", tab)
       if(tab.name === 'first') {
         this.$store.commit("CHANGE_ORDER", 'first')
         this.shouye = true
         this.detail = false
         this.work = false
       } else if(tab.name === 'second'){
         this.$store.commit("CHANGE_ORDER", 'second')
         this.shouye = false
         this.detail = true
         this.work = false
       } else {
         this.$store.commit("CHANGE_ORDER", 'third')
         this.shouye = false
         this.detail = false
         this.work = true
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

