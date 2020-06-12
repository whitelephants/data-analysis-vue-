<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row>
          <el-col :span="20">
            <el-input v-model="tableDataName" placeholder="产品名称" style="width:40%"></el-input>
          </el-col>

          <el-col :span="4">
            <el-button type="primary" @click="doFilter" icon="el-icon-search" style="width:90%">搜索</el-button>
          </el-col>
          <!--<el-button v-on:click="counter += 1">Add 1</el-button>
          <p style="float:right"> The button above has been clicked {{ counter }} times.</p>-->
        </el-row>
        <el-row>
          <el-table
            border
            style="width: 100% "
            height="600px"
            v-el-table-infinite-scroll="load"
            :data="tableDataend"
            cell-style="text-align: center"
            header-cell-style="text-align: center"
          >
            <el-table-column fixed prop="product" width="120" label="产品名称"></el-table-column>
            <el-table-column prop="id" label="id" width="90" v-if="false"></el-table-column>
            <el-table-column prop="xiaoshou" label="销售额" width="90"></el-table-column>
            <el-table-column prop="lirun1" label="平均利润" width="90"></el-table-column>
            <el-table-column prop="lirun2" label="利润方差" width="90"></el-table-column>
            <el-table-column prop="update_time" label="更新时间"></el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="12">
        <div>
          <div ref="chartDv" style="width:100%;height: 750px"></div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import echarts from "echarts";
import elTableInfiniteScroll from "el-table-infinite-scroll";
export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll
  },
  data() {
    return {
      tableData: [
        {
          product: "iphone1",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone2",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone3",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone4",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone5",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone6",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone7",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone8",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone9",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone10",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone11",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone12",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone13",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone14",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone15",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone16",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone17",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone18",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone19",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone20",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone21",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone22",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone23",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone24",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone25",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone26",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone27",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone28",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone29",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone30",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        },
        {
          product: "iphone31",
          id: 1,
          xiaoshou: 233,
          lirun1: 300,
          lirun2: 3.2,
          update_time: "2020-6-6"
        }
      ],
      chartDataOne: [
        [655, 850, 940, 980, 1070], //[655, 850, 940, 980, 1070]分别是表示下边缘,下四分位数，中位数，上四位数，上边缘
        [760, 800, 845, 885, 960],
        [780, 840, 855, 880, 940],
        [720, 767.5, 815, 865, 920],
        [740, 807.5, 810, 870, 950]
      ],
      outliers: [
        //异常值数据
        [0, 650],
        [2, 620],
        [2, 720],
        [2, 720],
        [2, 950],
        [2, 970]
      ],
      xAxisData: [1, 2, 3, 4, 5],
      page: 0,
      tableDatas: [],
      tableDataend: [],
      tableDataName: "",
      tableDataout: [],
      filterTableDataEnd: []
    };
  },
  mounted() {
    this.initEchart();
    // let self = this;
    //   this.$axios
    //     .post("action")
    //     .then(response => {
    //       console.log(response.data);
    //       self.creat_tableDatas(response.data.data);
    //       self.load()
    //     })
    //     .catch(error => {
    //       // 请求失败处理
    //       console.log(error);
    //     });
    this.creat_tableDatas(this.tableData);
  },
  methods: {
    doFilter() {
      console.log("doFilter");
      this.filterTableDataEnd = [];
      if (this.tableDataName != "") {
        this.tableData.forEach((value, index) => {
          if (value.product) {
            if (value.product.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value);
            }
          }
        });
        //渲染表格,根据值
        this.tableDataend = this.filterTableDataEnd;
        this.page = 999999;
      } else {
        this.page = 0;
        this.tableDataend = [];
        this.load();
      }
      //页面初始化数据需要判断是否检索过
    },

    creat_tableDatas(e) {
      this.tableDatas = [];
      for (var i = 0; i < e.length; i += 20) {
        this.tableDatas.push(e.slice(i, i + 20));
      }
      console.log(this.tableDatas);
      console.log(this.page);
    },
    // buttom({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex == this.tableData.length - 1) {
    //     if (columnIndex == 0) {
    //       return [1, 5];
    //     }
    //   }
    // },

    // cellStyle({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === this.tableData.length - 1) {
    //     //  if (columnIndex == 5) {
    //     return "color: #ff0000";
    //     // }
    //   }
    // },

    load() {
      if (this.page < this.tableDatas.length) {
        this.tableDataend = this.tableDataend.concat(
          this.tableDatas[this.page]
        );
        this.page = this.page + 1;
      } else {
        // this.$message.warning("没有新数据");
      }
    },

    initEchart() {
      let xAxisData = [
        "华为p30",
        "iphone11",
        "mate30pro",
        "xps15",
        "iphone se"
      ];
      // console.log(xAxisData);
      let chartDv = this.$refs.chartDv;
      let echart = echarts.init(chartDv);

      echart.setOption({
        title: [
          {
            text: "TOP5 利润方差箱线图",
            left: "center"
          }
        ],
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "15%"
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false
          },
          axisLabel: {
            formatter: "{value}"
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          name: "Y轴值",
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: "boxplot",
            type: "boxplot",
            data: this.chartDataOne,
            tooltip: {
              formatter: function(param) {
                return [
                  "Experiment " + param.name + ": ",
                  "上边缘: " + param.data[5],
                  "上四位数: " + param.data[4],
                  "中位数: " + param.data[3],
                  "下四分位数: " + param.data[2],
                  "下边缘: " + param.data[1]
                ].join("<br/>");
              }
            }
          },
          {
            name: "outlier",
            type: "scatter",
            data: this.outliers // 异常值数据
          }
        ]
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.el-input {
  width: 230px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>