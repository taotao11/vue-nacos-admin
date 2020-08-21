// 菜单
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="菜单名称">
        <el-input v-model="formInline.user" placeholder="菜单名称"></el-input>
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
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="mid"
      border
      default-expand-all
      :tree-props="{children: 'chidrenMenus', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="mid" label="id" sortable width="180"></el-table-column>
      <el-table-column prop="mparentId" label="父id" sortable width="180"></el-table-column>
      <el-table-column prop="mname" label="菜单名称"></el-table-column>
      <el-table-column prop="mpath" label="路径"></el-table-column>
      <el-table-column prop="mredirect" label="菜单路由"></el-table-column>
      <el-table-column prop="mcomponent" label="菜单组件"></el-table-column>
      <el-table-column prop="mtitle" label="菜单标题"></el-table-column>
      <el-table-column prop="mkeepaliveCd" label="菜单状态"></el-table-column>
      <el-table-column prop="micon" label="图标"></el-table-column>
      <el-table-column prop="deleteFlag" label="删除状态"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="createId" label="创建人id"></el-table-column>
      <el-table-column prop="updateId" label="更新人id"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleAdd(scope.row)" type="text" size="small">新增</el-button>
          <el-button @click="handleUpd(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handledel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="dialogIsDisable">
      <!-- <user-add :isDisable="isDisable" :form="form" @childFn="parentFn" /> -->
      <form-comp
        :dataStructures="dataStructures"
        :isDisable="isDisable"
        :form="form"
        :butName="formComPName"
        :butFun="addMenu"
      ></form-comp>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="updDialogIsDisable">
      <!-- <user-add :isDisable="isDisable" :form="form" @childFn="parentFn" /> -->
      <form-comp
        :dataStructures="dataStructures"
        :isDisable="isDisable"
        :form="formUpd"
        :butName="formComPName"
        :butFun="UpdMenu"
      ></form-comp>
    </el-dialog>
  </div>
</template>

<script>
import { getMenus,add,update,delById } from "@/api/menu";
import TableList from "@/components/Data/tableList";
import FormComp from "@/components/Data/formComp";
export default {
  data() {
    return {
      hasChildren: false,
      formComPName: "新增",
      // 实体数据结构
      dataStructures: [
        {
          label: "id",
          prop: "mid",
          type: 1,
          show: false,
        },
        {
          label: "父id",
          prop: "mparentId",
          type: 1,
          show: true,
        },
        {
          label: "菜单名称",
          prop: "mname",
          type: 1,
          show: true,
        },
        {
          label: "路径",
          prop: "mpath",
          type: 1,
          show: true
        },
        {
          label: "菜单路由",
          prop: "mredirect",
          type: 1,
          show: true
        },
        {
          label: "菜单组件",
          prop: "mcomponent",
          type: 1,
          show: true
        },
        {
          label: "菜单标题",
          prop: "mtitle",
          type: 1,
          show: true
        },
        {
          label: "菜单状态",
          prop: "mkeepaliveCd",
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
          label: "图标",
          prop: "micon",
          type: 1,
          show: true
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
        mid: "",
        mparentId: "000000",
        mpath: "",
        mredirect: '',
        mcomponent: '',
        mtitle: "",
        mkeepaliveCd: "",
        micon: ""
      },
      formSel: {
        mid: "",
        mparentId: "",
        mpath: "",
        mredirect: '',
        mcomponent: '',
        mtitle: "",
        mkeepaliveCd: "",
        micon: ""
      },
      formUpd: {
        mid: "",
        mparentId: "",
        mpath: "",
        mredirect: '',
        mcomponent: '',
        mtitle: "",
        mkeepaliveCd: "",
        micon: ""
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
      getMenus(this.query).then((response) => {
        // this.list = response.data.items
        // this.total = response.data.total
        const data = response.data;
        this.tableData = data;
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
    handleAdd(row) {
      this.dialogIsDisable = true;
      this.form.mparentId = row.mid;
      this.formComPName = '新增'
    },
    //修改
    handleUpd(row) {
      this.updDialogIsDisable = true;
      this.formUpd = row;
      this.formComPName = "修改"
    },
    // 修改
    UpdMenu(form) {
      update(this.formUpd).then((response) => {
        const code = response.code;
        if (code === 200) {
          this.$message({
            message: "修改成功!!!",
            type: "success",
          });
          //1、childFn 组件方法名，父组件中用childFn方法接收子组件中的数据；2、message是传递给父组件的数据
          // this.$emit("childFn", false);
          this.updDialogIsDisable = false;
        }
        console.log(response);
      });
    },
    // 删除
    handledel(row){
      delById({id: row.mid}).then((response) => {
        const code = response.code;
        if (code === 200) {
          this.$message({
            message: "删除成功!!!",
            type: "success",
          });
          //1、childFn 组件方法名，父组件中用childFn方法接收子组件中的数据；2、message是传递给父组件的数据
          // this.$emit("childFn", false);
          this.parentFn(false);
        }
        console.log(response);
      });
    },
    // 新增
    addMenu(form) {
      add(form).then((response) => {
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