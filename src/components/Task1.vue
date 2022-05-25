<template>
  <div style="display: flex; float: right; margin: 20px 0 20px 0">
    <el-button type="primary" @click="singleTest">单条测试</el-button>
    <el-button type="primary" @click="multiTest">批量测试</el-button>
    <el-button type="primary" @click="exportData">导出数据</el-button>
  </div>
  <input
    type="file"
    id="fileuploader"
    accept="application/json"
    style="display: none"
    @change="getFileData"
  />
  <el-dialog
    v-model="showSingleTestDialog"
    title="输入测试用例参数"
    width="30%"
    :before-close="handleClose"
  >
    <span style="font-weight: bold; margin: 0 10px 0 10px">a边长度</span>
    <el-input v-model="a_length" placeholder="a边长度" style="width: 10%" />
    <span style="font-weight: bold; margin: 0 10px 0 10px">b边长度</span>
    <el-input v-model="b_length" placeholder="b边长度" style="width: 10%" />
    <span style="font-weight: bold; margin: 0 10px 0 10px">c边长度</span>
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
  <el-table :data="tableData" border style="width: 100%" id="test-table">
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
  <br />
  <el-row :gutter="20">
    <el-col :span="8"> <div id="chart" class="statistic-chart"></div></el-col>
    <el-col :span="8"
      ><div id="test-method-pie" class="statistic-chart"></div>
    </el-col>
    <el-col :span="8"
      ><div id="test-bug-line" class="statistic-chart"></div
    ></el-col>
  </el-row>
</template>

<script>
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      tableData: [
        {
          test_id: 10001,
          a_length: 1,
          b_length: 2,
          c_length: 3,
          test_expected_result: '不构成三角形',
          test_actual_result: '不构成三角形',
          test_time: '2022-05-25 00:22:00',
          test_env: 'JDK 11',
          test_version: 'V1.0',
          test_method: '边界值分析法',
          test_bug: '无',
        },
        {
          test_id: 10002,
          a_length: 1,
          b_length: 2,
          c_length: 3,
          test_expected_result: '不构成三角形',
          test_actual_result: '不构成三角形',
          test_time: '2022-05-25 00:22:00',
          test_env: 'JDK 11',
          test_version: 'V1.0',
          test_method: '边界值分析法',
          test_bug: '无',
        },
      ],
      showSingleTestDialog: false,
      a_length: 0,
      b_length: 0,
      c_length: 0,
    }
  },
  mounted() {
    // 条形统计图的相关内容
    var chartDom = document.getElementById('chart')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      title: {
        text: '等价类测试用例分布',
        subtext: '条形统计图',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }
    option && myChart.setOption(option)
    // 饼图的相关内容
    var chartDom2 = document.getElementById('test-method-pie')
    var testMethodPie = echarts.init(chartDom2)
    var option2
    option2 = {
      title: {
        text: '测试用例通过情况分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1, name: '通过' },
            { value: 1, name: '未通过' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    option2 && testMethodPie.setOption(option2)
    // 可能还会出现折线统计图
    var chartDom3 = document.getElementById('test-bug-line')
    var testBugLine = echarts.init(chartDom3)
    var option3

    option3 = {
      title: {
        text: '测试Bug数量分布图',
        subtext: '折线统计图',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    option3 && testBugLine.setOption(option3)
  },
  methods: {
    singleTest() {
      this.showSingleTestDialog = true
    },
    multiTest() {
      $('#fileuploader').click()
    },
    getFileData(e) {
      const file = e.target.files[0]
      let jsonReader = new FileReader()
      jsonReader.readAsText(file, 'utf8')
      jsonReader.onload = function () {
        const jsonObject = JSON.parse(this.result)
        // 如果上传成功了，那就弹出个模态对话框提示测试了多少条数据即可
      }
    },
    exportData() {
      var wb = XLSX.utils.table_to_book(document.querySelector('#test-table'))
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array',
      })
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: 'application/octet-stream' }),
          'test_data_table.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
  },
}
</script>
<style>
.statistic-chart {
  width: 25vw;
  height: 33vh;
}
</style>
