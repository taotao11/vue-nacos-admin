// 列表组件
<template>
  <div>
    <!-- 动态table -->
    <el-table
      :data="list"
      v-loading="listLoading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-if="list != null"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(key,index) in dataStructures"
        :key="Math.random(index)"
        :label="key.label"
        :prop="key.prop"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="chridHandleSel(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="chridHandleUpd(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="chridHandledel(scope.row)" type="text" size="small" v-if="tdelete">删除</el-button>
          <el-button @click="chridHandleOther(scope.row)" type="text" size="small" v-if="otherDao">{{otherDaoName}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row :gutter="20" v-if="page != null">
      <el-col>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="page.pageSizeArr"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "list-table-component",
  props: {
    otherDaoName: '操作',
    otherDao: false,
    otherDaoFun: {
      type: Function,
      default: null,
    },
    tdelete: false,
    tdeleteFun: {
      type: Function,
      default: null,
    },
    listLoading: true,
    dataStructures: {
      type: Array,
      default: [],
    },
    list: {
      type: Array,
      default: [],
    },
    handleSel: {
      type: Function,
      default: null,
    },
    handleUpd: {
      type: Function,
      default: null,
    },
    handleSizeChange: {
      type: Function,
      default: null,
    },
    handleCurrentChange: {
      type: Function,
      default: null,
    },
    page:{

    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    // 选择改变
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    chridHandleSel(row){
      this.handleSel(row)
    },
    chridHandleUpd(row){
      this.handleUpd(row)
    },
    chridHandledel(row){
      this.tdeleteFun(row)
    },
    chridHandleOther(row){
      this.otherDaoFun(row)
    },
  },
};
</script>