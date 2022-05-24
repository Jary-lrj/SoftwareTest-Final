<template>
  <div style="display: flex; float: right; margin: 20px 0 20px 0">
    <el-button type="primary" @click="singleTest">单条测试</el-button>
    <el-button type="primary">批量测试</el-button>
    <el-button type="primary">导出数据</el-button>
    <el-button type="primary">生成图表</el-button>
  </div>
  <el-dialog
    v-model="showSingleTestDialog"
    title="输入测试用例参数"
    width="30%"
    :before-close="handleClose"
  >
    <span style="font-weight:bold;margin:0 10px 0 10px">a边长度</span>
    <el-input v-model="a_length" placeholder="a边长度" style="width: 10%" />
    <span style="font-weight:bold;margin:0 10px 0 10px">b边长度</span>
    <el-input v-model="b_length" placeholder="b边长度" style="width: 10%" />
   <span style="font-weight:bold;margin:0 10px 0 10px">c边长度</span>
    <el-input v-model="c_length" placeholder="c边长度" style="width: 10%" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showSingleTestDialog = false">取消</el-button>
        <el-button type="primary" @click="showSingleTestDialog = false"
          >提交</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      prop="test_id"
      label="测试用例编号"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="a_length"
      label="a边边长"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="b_length"
      label="b边边长"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="c_length"
      label="c边边长"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_expected_result"
      label="测试期望结果"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_actual_result"
      label="测试实际结果"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_time"
      label="测试时间"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_env"
      label="测试环境"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_version"
      label="测试版本"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_method"
      label="测试方法"
      width="150"
    ></el-table-column>
    <el-table-column
      prop="test_bug"
      label="测试BUG"
      width="150"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          test_id: 10001,
          a_length: 1,
          b_length: 2,
          c_length: 3,
          test_expected_result: "不构成三角形",
          test_actual_result: "不构成三角形",
          test_time: "2022-05-25 00:22:00",
          test_env: "JDK 11",
          test_version: "V1.0",
          test_method: "边界值分析法",
          test_bug: "无",
        },
      ],
      showSingleTestDialog: false,
      a_length: 0,
      b_length: 0,
      c_length: 0,
    };
  },
  methods: {
    singleTest() {
      this.showSingleTestDialog = true;
    },
  },
};
</script>

<style></style>
