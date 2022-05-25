<template>
  <div>
    <el-container class="home-container">
      <el-header
        style="
          float: left;
          display: flex;
          height: 7.5vh;
          border: 1px solid #ebeef5;
        "
        ><span
          style="
            line-height: 7.5vh;
            font-size: 26px;
            font-weight: bold;
            margin: 0 20px 0 20px;
          "
          >软件测试工具</span
        >
        <span class="nav-bar" @click="this.$router.push('/')">练习测试</span>
        <span class="nav-bar" @click="this.$router.push('/system')"
          >系统测试</span
        >
      </el-header>
      <el-container>
        <el-aside width="15vw" style="">
          <div
            style="margin: 25px 0 25px 0; font-size: 18px; font-weight: bold"
          >
            测试任务选择
          </div>
          <el-select
            v-model="task_num"
            placeholder="请选择需要测试的任务"
            size="large"
            style="width: 100%"
          >
            <el-option
              v-for="item in exercise_task"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div
            style="margin: 25px 0 25px 0; font-size: 18px; font-weight: bold"
          >
            测试任务介绍
          </div>
          <div v-if="task_num === 1" class="task-introduction">
            判断三角形类型，输入一个三角形的三条边的长度以判断该三条边是否可以构成一个三角形。
          </div>
          <div v-if="task_num === 2" class="task-introduction">万年历问题</div>
          <div v-if="task_num === 4" class="task-introduction">
            电脑销售系统，主机（25￥单位价格，每月最多销售的数量为70），显示器（30￥单位价格，每月最多销售数量为80），
            外设（45￥单位价格，每月最多销售的数量为90）；
            每个销售员每月至少销售一台完整的机器，当系统的主机这个变量接受到-1值的时候，系统自动统计该销售员本月的销售总额。
            当销售额小于等于1000（包括1000）按照10%提佣金，当销售额在1000-1800之间（包括1800）的时候按照15%提佣金，当销售额大于1800时按照20%提佣金。
          </div>
          <div v-if="task_num === 7" class="task-introduction">
            7. 研究一个与我们的生活息息相关的电信收费问题系统，需求描述如下：
            每月的电话总费用=基本月租费+折扣后的实际的通话费，如果没有折扣则按实际通话费计算，基本月租费为25元，每分钟通话费为0.15元。
            实际通话费是否有折扣与当月的通话时间（分钟）和本年度至本月的累计未按时缴费的次数有关。
            当月的通话分钟数和折扣比例及本年度未按时缴费次数之间有直接的对应关系，如果本年度的未按时缴费的次数超过本月通话时间所对应的容许值则免于折扣，并按实际的通话费计算。
            通话时间和折扣比例及未按时缴费次数的关系为：
          </div>
          <img
            v-if="task_num === 7"
            src="../assets/7.png"
            style="width: 15vw; margin: 25px 0 0 0"
          />
          <div v-if="task_num === 14" class="task-introduction">
            某实时的Web系统，服务器端应用程序需要接受客户端发送的不同类型的数据包，为了使系统设计达到最优，使用统一接口，接口（通用包）描述为：接口包的类型：正常交易包、查询包、退货包、换货包、部分退货包、部分换货包；
            涉及的商品种类：1、2、3、4、5、6；支付类型：系统账户余额支付、货到付款、工行账户支付、农行账户支付、建行账户支付、交行账户支付、邮储账户支付、礼品卡支付；发票类型：日用品、电脑配件、鞋、帽、家电、服装、电脑、ipad、手机、化妆品、食品、其他；
            支付金额：货到付款无限制、银行支付不能超出最大限额2万、系统账户余额支付不能超出余额；订单状态：正在处理、正在送货、处理完成、订单取消。用正交实验法设计用例。
          </div>
        </el-aside>
        <el-main style="background-color: #f5f7fa">
          <Task1 v-if="task_num === 1"></Task1>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Task1 from '../components/Task1.vue'
export default {
  components: {
    Task1,
  },
  data() {
    return {
      task_num: 1,
      exercise_task: [
        { label: '1-判断三角形类型', value: 1 },
        { label: '2-万年历问题', value: 2 },
        { label: '4-电脑销售系统', value: 4 },
        { label: '7-电信收费系统', value: 7 },
        { label: '14-实时Web系统', value: 14 },
      ],
    }
  },
}
</script>

<style>
.home-container {
  height: 100vh;
}
.task-introduction {
  margin: 0 20px 0 20px;
  line-height: 30px;
}
.nav-bar {
  line-height: 7.5vh;
  font-size: 18px;
  font-weight: bold;
  margin: 0 20px 0 30px;
}
.nav-bar:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
