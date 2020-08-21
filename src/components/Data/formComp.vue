// 自定义表单组件
<template>
  <el-form
    ref="form"
    v-model="form"
    label-width="100px"
    class="demo-ruleForm"
    v-if="form != null && dataStructures != null"
  >
    <div v-for="(key,index) in dataStructures" :key="index">
      <el-form-item :label="key.label" v-if="key.show === true">
        <!-- // 普通输入框 -->
        <template v-if="key.type === 1">
          <el-input v-model="form[key.prop]" :disabled="isDisable"></el-input>
        </template>
        <!-- 选择框 -->
        <template v-else-if="key.type === 2">
          <el-select v-model="form[key.prop]" :placeholder="key.placeholder" :disabled="isDisable">
            <el-option
              v-for="(item,oIndex) in key.option"
              :key="Math.random(oIndex)"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
    </div>
    <el-form-item v-show="!isDisable">
      <el-button type="primary" @click="onSubmit">{{butName}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { getList } from '@/api/table'

export default {
  name: "form-comp",
  filters: {},
  props: {
    dataStructures: {
      type: Array,
      default: [],
    },
    isDisable: false,
    form: {},
    butName: "",
    butFun: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
    };
  },
  created() {
    // 初始化
    console.log(this.dataStructures)
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.butFun(this.form);
    },
  },
};
</script>
