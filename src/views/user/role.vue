// 角色 
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="formInline.user" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="formInline.time"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="clearQuery">清空</el-button>
      </el-form-item>
    </el-form>
    <el-button type="warning" @click="dialogIsDisable = true">新增</el-button>
    <el-button type="warning" @click="clearQuery">批量删除</el-button>
    <list-table-component
      :listLoading="false"
      :dataStructures="dataStructures"
      :list="tableData"
      :handleSel="handleClick"
      :handleUpd="handleUpd"
      :page="page"
      :handleSizeChange="handleSizeChange"
      :handleCurrentChange="handleCurrentChange"
    />
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogIsDisable">
      <!-- <user-add :isDisable="isDisable" :form="form" @childFn="parentFn" /> -->
      <form-comp
        :dataStructures="dataStructures"
        :isDisable="isDisable"
        :form="form"
        :butName="formComPName"
        :butFun="add"
      ></form-comp>
    </el-dialog>
  </div>
</template>

<script>
import { getRoutes, addRole } from "@/api/role";
import TableList from "@/components/Data/tableList";
import FormComp from "@/components/Data/formComp";
export default {
  data() {
    return {
      formComPName: "新增",
      // 实体数据结构
      dataStructures: [
        {
          label: "id",
          prop: "rid",
          type: 1,
          show: false,
        },
        {
          label: "角色名称",
          prop: "rname",
          type: 1,
          show: true,
        },
        {
          label: "角色描述",
          prop: "rdescription",
          type: 1,
          show: true,
        },
        {
          label: "角色状态",
          prop: "rstateCd",
          type: 2,
          show: true,
          placeholder: "选择状态",
          option: [
            {
              label: "正常",
              value: "0",
            },
            {
              label: "禁用",
              value: "1",
            },
          ],
        },
        {
          label: "删除状态",
          prop: "deleteFlag",
          type: 1,
          show: false,
        },
        {
          label: "创建时间",
          prop: "createTime",
          type: 1,
          show: false,
        },
        {
          label: "更新时间",
          prop: "updateTime",
          type: 1,
          show: false,
        },
        {
          label: "创建人id",
          prop: "createId",
          type: 1,
          show: false,
        },
        {
          label: "更新人id",
          prop: "updateId",
          type: 1,
          show: false,
        },
      ],
      //表单分页
      page: {
        currentPage: 1,
        total: 0,
        pageSizeArr: [100, 200, 300, 400],
        pageSize: 100,
      },
      dialogIsDisable: false,
      selDialogIsDisable: false,
      updDialogIsDisable: false,
      isDisable: false,
      form: {
        rid: "",
        rname: "",
        rdescription: "",
        rstateCd: ""
      },
      formSel: {
        rid: "",
        rname: "",
        rdescription: "",
        rstateCd: ""
      },
      formUpd: {
        rid: "",
        rname: "",
        rdescription: "",
        rstateCd: ""
      },
      formInline: {
        user: "",
        region: "",
        time: "",
      },
      tableData: [],
      query: {
        queryEntity: {},
      },
      multipleSelection: [],
    };
  },
  created() {
    // 初始化查询
    this.getList();
  },
  // 定义组件
  components: {
    [TableList.name]: TableList,
    [FormComp.name]: FormComp,
  },
  methods: {
    // 每页大小改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 选择改变
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 提交
    onSubmit() {
      console.log(this.formInline.time[0]);
      console.log(this.formInline.time[1]);
    },
    // 清空
    clearQuery() {
      console.log("submit!");
    },
    // 查询列表
    getList() {
      getRoutes(this.query).then((response) => {
        // this.list = response.data.items
        // this.total = response.data.total
        const data = response.data;
        this.tableData = data.records;
        this.page.currentPage = data.current;
        this.page.total = data.total;
        this.page.pageSize = data.size;

        console.log(response);
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    // 查看
    handleClick(row) {
      this.selDialogIsDisable = true;
      this.formSel = row;
      console.log(row);
    },
    //修改
    handleUpd(row) {
      this.updDialogIsDisable = true;
      this.formUpd = row;
    },
    // 新增
    add(form) {
      addRole(form).then((response) => {
        const code = response.code;
        if (code === 200) {
          this.$message({
            message: "新增成功!!!",
            type: "success",
          });
          //1、childFn 组件方法名，父组件中用childFn方法接收子组件中的数据；2、message是传递给父组件的数据
          // this.$emit("childFn", false);
          this.parentFn(false);
        }
        console.log(response);
      });
    },
    //处理子组件返回
    parentFn(childData) {
      console.log("处理子组件返回");
      this.dialogIsDisable = childData;
      // 初始化查询
      this.getList();
    },
  },
};
</script>