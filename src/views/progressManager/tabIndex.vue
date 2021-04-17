<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门数据-->
      <el-col :span="4" :xs="24">
        <div class="head-container header_tree">
          <el-tree :data="deptOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" default-expand-all @node-click="handleNodeClick" />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <div v-if="leafNode === false ">  
          <task :selectNode="propData"   @updateTree="updateTree" ></task>
        </div>
        <div v-else>
          <node :selectNode="propData"  @updateTree="updateTree"></node>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>


import { getLeftTree } from "@/api/processback";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { mapGetters, mapState } from "vuex";
import Task from './task';
import Node from './tabs';

export default {
  name: "Porcess",
  components: { Task, Node },
  computed: {
    ...mapState({ 
      isLeaf: state => state.isLeaf,
      nodeState: state => state.nodeState,
      nodeStateId: state => state.nodeStateId
    }),
  },
  data() {
    return {
      propData: {},
      propData1: {},
      leafNode: false,
      deptOptions: [],
      currentDeptName: '',
      defaultProps: {
        children: "children",
        label: "label",

      },
    };
  },
  watch: {
    
  "$store.state.nodeStateId"(old, newd) {
      console.log("旧的", old)
      console.log("新的", newd)
      console.log("当前页面是否是叶子节点", this.$store.state.isLeaf)
      this.leafNode = this.$store.state.isLeaf
    }
    
  },
  mounted() {
    
  },
  created() {
    
    
    this.getTree();
    
  },
  methods: {
    
    getTree() {
      var id = localStorage.getItem("siteId")
      getLeftTree(id).then((res) => {
        console.log("传输节点", res.data)
        this.deptOptions = res.data.data
        this.propData = res.data.data[0]
         this.$store.commit('CHANGE_NODE_ID', res.data.data[0].id) 
        // console.log("初始的propData", this.propData)
      })
    },
    updateTree(val) {
      if(val === 'updateTree') {
        this.getTree()
      }
    },

    

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
   
    // 节点单击事件
    handleNodeClick(data, node, e) {
      
      console.log("进度Index",data)
      
      this.currentDeptName = data.name
      this.propData = data
      

      this.$store.commit('CHANGE_NODE', data)  
      this.$store.commit('CHANGE_NODE_ID', data.id) 
      console.log("立即获取", this.$store.state.nodeStateId)
      
      
      if(data.display === 1) {
        this.$store.commit('CHANGE_ISLEAF', true) 
        this.leafNode = true
       
      } else {
        this.$store.commit('CHANGE_ISLEAF', false) 
        this.leafNode = false
      }
     
      

    },
  
  
  },
};
</script>
<style scoped>
.header_tree {
  overflow:scroll;
  height: 800px;
  
}
.header_tree .el-tree {
  min-width: 100%;
  display: inline-block;
  color: white;
  background-color: transparent !important; 
  font-size: 14px; 
}
.el-tree {
    position: relative;
    cursor: default;
    background: transparent;
    color: #a1bbee;
}
.el-tree >>> .el-tree-node__children >>> .is-current {
    background: red !important;
}
.el-tree >>> .el-tree-node:focus >>> .el-tree-node__content {
    background-color: orange !important;
    
  }
  .el-tree >>> .el-tree-node__content:hover {    background-color: #66b1ff87;color:orange;
  }
  .el-tree >>> .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: orange;
    color:green;
  }


  .el-tree >>> .el-tree-node:focus>.el-tree-node__content{
      background-color: rgb(240, 107, 107);
      color: white;
    }

</style>

