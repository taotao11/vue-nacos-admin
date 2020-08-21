<template>
  <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm" v-if="form != null">
    <el-form-item label="用户账号">
      <el-input v-model="form.uname" :disabled="isDisable"></el-input>
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="form.upwd" :disabled="isDisable"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱">
      <el-input v-model="form.uemil" :disabled="isDisable"></el-input>
    </el-form-item>
    <el-form-item label="用户手机号码">
      <el-input v-model="form.uphoneNumber" :disabled="isDisable"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.usexCd" placeholder="请选择性别" :disabled="isDisable">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="form.ustateCd" placeholder="请选择状态" :disabled="isDisable">
        <el-option label="正常" value="0"></el-option>
        <el-option label="禁用" value="1"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-show="!isDisable">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { getList } from '@/api/table'
import { add } from "@/api/user";

export default {
  name: "user-add",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  props: {
    isDisable: false,
    form: {
      uname: "",
      upwd: "",
      uemil: "",
      uphoneNumber: "",
      usexCd: "",
      ustateCd: "",
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      add(this.form).then((response) => {
        const code = response.code;
        if (code === 200) {
          this.$message({
            message: "新增成功!!!",
            type: "success",
          });
          //1、childFn 组件方法名，父组件中用childFn方法接收子组件中的数据；2、message是传递给父组件的数据
          this.$emit("childFn", false);
        }
        console.log(response);
      });
    },
  },
};
</script>
