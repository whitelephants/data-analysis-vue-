<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">总销售额</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <el-button class="icon-warp" icon="el-icon-warning-outline" circle></el-button>
            </el-tooltip>
            <div class="card-text">￥126,560</div>
            <span>
              周同比12%
              <i class="el-icon-caret-top"></i>
            </span>
            <span>
              日同比11%
              <i class="el-icon-caret-bottom"></i>
            </span>
          </div>
          <div class="text item">日销售额￥ 234.56</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">支付笔数</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <el-button class="icon-warp" icon="el-icon-warning-outline" circle></el-button>
            </el-tooltip>
            <ve-histogram
              :data="chartData"
              :settings="chartSettings"
              :extend="extend"
              :grid="grid"
              height="150px"
              width="100%"
            ></ve-histogram>
          </div>
          <div class="text item">转化率 60%</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">访问量</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <el-button class="icon-warp" icon="el-icon-warning-outline" circle></el-button>
            </el-tooltip>
            <ve-line
              :data="chartData2"
              :settings="chartSettings2"
              :extend="extend2"
              :grid="grid"
              height="150px"
              width="100%"
            ></ve-line>
          </div>
          <div class="text item">日访问量 1,234</div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card-title">运营活动效果</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <el-button class="icon-warp" icon="el-icon-warning-outline" circle></el-button>
            </el-tooltip>
            <div class="progress-circle">
              <el-progress type="circle" :percentage="98" width="120"></el-progress>
            </div>
          </div>
          <div class="text item">运营活动目标 ￥ 10000.00</div>
        </el-card>
      </el-col>
    </el-row>


    <el-row :gutter="20">
      <el-col :span="18">
        <el-tabs type="border-card" class="tabbody">
          <el-tab-pane label="销售额" lazy>
            <ve-histogram :data="chartData_a" :settings="chartSettings_a"></ve-histogram>
          </el-tab-pane>
          <el-tab-pane label="访问量" lazy>
            <ve-histogram :data="chartData_a" :settings="chartSettings_a"></ve-histogram>
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header">
            <span class="card-title">销售额类别占比</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <el-button class="icon-warp" icon="el-icon-warning-outline" circle></el-button>
            </el-tooltip>
          </div>
          <div class="text item clearfix2">
            <ve-radar :data="chartData3"></ve-radar>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="tablehead">
            <span class="table-title">线上热门搜索</span>
            <span class="block" style="float: right;">
              <el-date-picker
                v-model="value1"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </span>
          </div>
          <div class="text item clearfix3">
            <el-table
              height="480"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
            >
              <el-table-column label="日期" prop="date"></el-table-column>
              <el-table-column label="搜索关键词" prop="name"></el-table-column>
              <el-table-column label="用户数" prop="costs"></el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="tablehead">
            <span class="table-title">销售动态分布</span>
            <span class="block" style="float: right;">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions2"
              ></el-date-picker>
            </span>
          </div>
          <div class="text item clearfix3">
            <ve-map
              style="margin:0 auto"
              height="500px"
              width="80%"
              :data="chartData_e"
              :settings="chartSettings_e"
            ></ve-map>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    (this.grid = [
      {
        left: "-30px",
        bottom: "-15px"
      }
    ]),
      (this.extend = {
        legend: {
          show: false
        },
        yAxis: {
          type: "value",
          show: false
        },
        xAxis: {
          type: "category",
          show: false,
          data: ["1月", "2月", "3月", "4月", "5月"]
        }
      }),
      (this.extend2 = {
        legend: {
          show: false
        },
        yAxis: {
          type: "value",
          show: false
        },
        xAxis: {
          type: "category",
          show: false,
          data: [
            "5月1日",
            "5月2日",
            "5月3日",
            "5月4日",
            "5月5日",
            "5月6日",
            "5月7日"
          ]
        }
      }),
      (this.yAxis = {
        type: "value"
      }),
      (this.xAxis = {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      }),
      (this.legend = {
        data: ["东部", "南部", "西部", "北部", "中部"]
      }),
      (this.series = [
        {
          name: "东部",
          type: "bar",
          stack: "总量",
          barWidth: 50,
          data: [320, 302, 301, 334, 390, 330, 320, 101, 134, 90, 230, 210],
          color: ["#1106C1"]
        },
        {
          name: "南部",
          type: "bar",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210, 191, 234, 290, 330, 310],
          color: ["#3822F6"]
        },
        {
          name: "西部",
          type: "bar",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
          color: ["#229BF6"]
        },
        {
          name: "北部",
          type: "bar",
          stack: "总量",
          data: [150, 212, 201, 154, 190, 330, 410, 901, 934, 1290, 1330, 1320],
          color: ["#22F6E7"]
        },
        {
          name: "中部",
          type: "bar",
          stack: "总量",
          data: [820, 832, 901, 934, 1290, 1330, 1320, 301, 334, 390, 330, 320],
          color: ["#12F8C1"]
        }
      ]),
      (this.chartSettings = {
        metrics: ["销售额"],
        dimension: ["时间"]
      }),
      (this.chartSettings2 = {
        metrics: ["访问量"],
        dimension: ["日期"],
        area: true
      }),
      (this.chartSettings_a = {
        stack: { 区域: ["数码", "日用", "食品", "电器", "服装"] }
      }),
      (this.chartSettings_e = {
        position: "province/shanghai",
        label: false,
        labelMap: {
          cost: "销售额"
        }
      });
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",

      tableData: [
        {
          date: "2020-05-01",
          name: "关键词1",
          costs: 231
        },
        {
          date: "2020-05-01",
          name: "关键词2",
          costs: 123
        },
        {
          date: "2020-05-01",
          name: "关键词3",
          costs: 233
        },
        {
          date: "2020-05-01",
          name: "关键词4",
          costs: 423
        },
        {
          date: "2020-05-01",
          name: "关键词5",
          costs: 233
        },
        {
          date: "2020-05-01",
          name: "关键词6",
          costs: 633
        },
        {
          date: "2020-05-01",
          name: "关键词7",
          costs: 234
        },
        {
          date: "2020-05-01",
          name: "关键词8",
          costs: 533
        },
        {
          date: "2020-05-01",
          name: "关键词9",
          costs: 221
        },
        {
          date: "2020-05-01",
          name: "关键词10",
          costs: 212
        }
      ],
      search: "",
      chartData: {
        columns: ["时间", "销售额"],
        rows: [
          { 时间: "1月", 销售额: 1393 },
          { 时间: "2月", 销售额: 3530 },
          { 时间: "3月", 销售额: 2923 },
          { 时间: "4月", 销售额: 1723 },
          { 时间: "5月", 销售额: 2345 },
          { 时间: "6月", 销售额: 1235 },
          { 时间: "7月", 销售额: 3423 },
          { 时间: "8月", 销售额: 3792 },
          { 时间: "9月", 销售额: 2644 },
          { 时间: "10月", 销售额: 2164 },
          { 时间: "11月", 销售额: 1235 },
          { 时间: "12月", 销售额: 1976 }
        ]
      },
      chartData2: {
        columns: ["日期", "访问量"],
        rows: [
          { 日期: "5月1日", 访问量: 1393 },
          { 日期: "5月2日", 访问量: 3530 },
          { 日期: "5月3日", 访问量: 2923 },
          { 日期: "5月4日", 访问量: 1723 },
          { 日期: "5月5日", 访问量: 3792 },
          { 日期: "5月6日", 访问量: 2333 },
          { 日期: "5月7日", 访问量: 1234 }
        ]
      },
      chartData3: {
        columns: ["类别", "销售额", "访问量", "净利润"],
        rows: [
          { 类别: "数码", 销售额: 1393, 访问量: 1093, 净利润: 3230 },
          { 类别: "电器", 销售额: 3530, 访问量: 3230, 净利润: 1723 },
          { 类别: "服装", 销售额: 2923, 访问量: 2623, 净利润: 1393 },
          { 类别: "食品", 销售额: 1723, 访问量: 1423, 净利润: 2623 },
          { 类别: "日用", 销售额: 3792, 访问量: 3492, 净利润: 3492 }
        ]
      },
      chartData_a: {
        columns: ["时间", "数码", "日用", "食品", "电器", "服装"],
        rows: [
          {
            时间: "1月",
            数码: 1393,
            日用: 1093,
            食品: 2923,
            电器: 4593,
            服装: 4293
          },
          {
            时间: "2月",
            数码: 3530,
            日用: 3230,
            食品: 2623,
            电器: 3792,
            服装: 3230
          },
          {
            时间: "3月",
            数码: 2923,
            日用: 2623,
            食品: 1423,
            电器: 1723,
            服装: 1423
          },
          {
            时间: "4月",
            数码: 1723,
            日用: 1423,
            食品: 4293,
            电器: 2923,
            服装: 3492
          },
          {
            时间: "5月",
            数码: 3792,
            日用: 3492,
            食品: 3230,
            电器: 3530,
            服装: 1423
          },
          {
            时间: "6月",
            数码: 4593,
            日用: 4293,
            食品: 3492,
            电器: 1393,
            服装: 1093
          },
          {
            时间: "7月",
            数码: 1393,
            日用: 1093,
            食品: 2923,
            电器: 4593,
            服装: 4293
          },
          {
            时间: "8月",
            数码: 3530,
            日用: 3230,
            食品: 2623,
            电器: 3792,
            服装: 3230
          },
          {
            时间: "9月",
            数码: 2923,
            日用: 2623,
            食品: 1423,
            电器: 1723,
            服装: 1423
          },
          {
            时间: "10月",
            数码: 1723,
            日用: 1423,
            食品: 4293,
            电器: 2923,
            服装: 3492
          },
          {
            时间: "11月",
            数码: 3792,
            日用: 3492,
            食品: 3230,
            电器: 3530,
            服装: 1423
          },
          {
            时间: "12月",
            数码: 4593,
            日用: 4293,
            食品: 3492,
            电器: 1393,
            服装: 1093
          }


        ]
      },

      chartData_b: {
        columns: ["区域", "30天内", "60天内"],
        rows: [
          { 区域: "崇明", "30天内": 1, "60天内": 50 },
          { 区域: "地铁", "30天内": 221, "60天内": 60 },
          { 区域: "嘉定", "30天内": 160, "60天内": 70 },
          { 区域: "金山", "30天内": 2, "60天内": 20 },
          { 区域: "闵行", "30天内": 9, "60天内": 100 },
          { 区域: "南区", "30天内": 6, "60天内": 70 },
          { 区域: "青浦", "30天内": 51, "60天内": 10 },
          { 区域: "西区", "30天内": 28, "60天内": 150 }
        ]
      },
      chartData_e: {
        columns: ["位置", "cost"],
        rows: [
          { 位置: "徐汇区", cost: 123 },
          { 位置: "黄浦区", cost: 1 },
          { 位置: "闵行区", cost: 2 },
          { 位置: "虹口区", cost: 3 }
        ]
      }
    };
  },
  methods: {
    download_contract() {
      let self = this;
      this.$axios
        .post("Warning.action")
        .then(response => {
          console.log(response.data);
          self.chartData_b = response.data.data;
        })
        .catch(error => {
          // 请求失败处理
          console.log(error);
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    contract_info() {
      console.log("contract_info");
    }
  },
  mounted() {
    this.download_contract();
  }
};
</script>


<style scoped>
.progress-circle {
  text-align: center;
  margin: 15px;
}
.tabbody {
  height: 480px;
}
.clearfix2 {
  height: 380px;
  padding: 0px;
}
.clearfix3 {
  height: 500px;
}
.tablehead {
  height: 35px;
}
.clearfix {
  height: 150px;
  padding: 0px;
}
.el-icon-caret-top {
  color: red;
  margin: 10px;
}
.el-icon-caret-bottom {
  color: greenyellow;
  margin: 10px;
}
.table-title {
  font-size: 20px;
}
.card-title {
  font-size: 10px;
  color: darkgray;
}
.card-text {
  font-size: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.icon-warp {
  font-size: 20px;
  float: right;
  padding: 0px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>