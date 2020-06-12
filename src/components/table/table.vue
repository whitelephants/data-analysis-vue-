<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input v-model="s_name" placeholder="产品名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="s_property" placeholder="产品类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="s_grid" multiple collapse-tags placeholder="区域">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="c_shuxin" placeholder="产品属性">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="c_starttime" align="right" type="date" placeholder="上架开始日期"></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker v-model="c_endtime" align="right" type="date" placeholder="上架结束日期"></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="c_name" placeholder="上架名称"></el-input>
      </el-col>
      <el-col :span="6">
        <el-input v-model="c_number" placeholder="采购订单号"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-select clearable v-model="s_attribute" placeholder="产品归属">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="s_stype" placeholder="上架类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="c_endtime2" placeholder="保质期">
          <el-option
            v-for="item in options6"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select clearable v-model="c_annrent" placeholder="产品租金">
          <el-option
            v-for="item in options7"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-input v-model="a_number" placeholder="表单号"></el-input>
      </el-col>
      <el-col :span="6" style="float:right">
        <el-button
          type="primary"
          style="float: left; width:30%"
          @click="search"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button type="primary" style="float: left; width:70px" @click="download">导出</el-button>
        <el-upload
          style="float: left; margin-left:10px;"
          class="upload"
          name="upload"
          action="uploadExcel.action"
          filename="uploadfile"
          multiple
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-col>
    </el-row>

    <hr />
    <!--下面是一个表格-->
    <el-table :data="tableDataEnd" height="550" stripe style="width: 100%">
      <el-table-column fixed prop="s_grid" label="区域" width="200"></el-table-column>
      <el-table-column fixed prop="s_name" label="产品名称" width="200"></el-table-column>
      <el-table-column prop="s_property" label="产品类别" width="200"></el-table-column>
      <el-table-column prop="c_shuxin" label="产品属性" width="200"></el-table-column>
      <el-table-column prop="c_starttime" label="上架开始日期" width="200"></el-table-column>
      <el-table-column prop="c_endtime" label="上架结束日期" width="200"></el-table-column>
      <el-table-column prop="c_name" label="上架名称" width="200"></el-table-column>
      <el-table-column prop="c_number" label="采购订单号" width="200"></el-table-column>
      <el-table-column prop="s_attribute" label="产品归属" width="200"></el-table-column>
      <el-table-column prop="s_stype" label="上架类型" width="200"></el-table-column>
      <el-table-column prop="c_endtime2" label="保质期" width="200"></el-table-column>
      <el-table-column prop="c_annrent" label="产品租金" width="200"></el-table-column>
      <el-table-column prop="a_number" label="表单号" width="200"></el-table-column>
    </el-table>
    <div style="text-align: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableDataBegin: [],
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      s_name: "",
      s_property: "",
      s_grid: "",
      c_shuxin: "",
      c_starttime: "",
      c_endtime: "",
      c_name: "",
      c_number: "",
      a_number: "",
      s_attribute: "",
      s_stype: "",
      c_endtime2: "",
      c_annrent: "",
      options: [
        { value: "电器", label: "电器" },
        { value: "数码", label: "数码" },
        { value: "食品", label: "食品" },
        { value: "服装", label: "服装" },
        { value: "汽车", label: "汽车" }
      ],
      options1: [
        { value: "崇明", label: "崇明" },
        { value: "嘉定", label: "嘉定" },
        { value: "金山", label: "金山" },
        { value: "闵行", label: "闵行" },
        { value: "青浦", label: "青浦" },
        { value: "南区", label: "南区" },
        { value: "西区", label: "西区" },
        { value: "地铁", label: "地铁" }
      ],
      options2: [
        { value: "第一方", label: "第一方" },
        { value: "第三方", label: "第三方" }
      ],
      options6: [
        { value: "<=30天", label: "<=30天" },
        { value: "<=60天", label: "<=60天" }
      ],
      options7: [{ value: ">10万", label: ">10万" }],
      tableData: [
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        },
        {
          s_name: "数据",
          s_property: "数据",
          s_grid: "数据",
          c_shuxin: "数据",
          c_starttime: "数据",
          c_endtime: "数据",
          c_name: "数据",
          c_number: "数据",
          s_attribute: "数据",
          s_stype: "数据",
          c_endtime2: "数据",
          c_annrent: "数据",
          a_number: "数据"
        }
      ]
    };
  },

  methods: {
    time_change(chinaStandard) {
      var date = new Date(chinaStandard);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var time = y + "-" + m + "-" + d + " " + h + ":" + minute;
      return time;
    },
    handleAvatarSuccess(res, file) {
      console.log(res.check);
      if (res.check == true) {
        this.$message({
          message: file.name + "上传成功",
          type: "success"
        });
      } else if (res.check == false) {
        this.$alert(res.message, "文件错误", {
          confirmButtonText: "确定",
          callback: action => {}
        });
      }
    },
    search() {
      console.log("search");
      // var params = new URLSearchParams();
      // params.append("s_name", this.s_name);
      // let self = this;
      // this.$axios
      //   .post("tableSearch.action", params)
      //   .then(response => {
      //     console.log(response.data);
      //     self.updateTable(response.data.data);
      //   })
      //   .catch(error => {
      //     // 请求失败处理
      //     console.log(error);
      //   });
    },

    download() {
      console.log("download");
      // var params = new URLSearchParams();
      // params.append("s_name", this.s_name);
      // this.$axios
      //   .post("${pageContext.request.contextPath}/ExportExcel.action", params, {
      //     responseType: "arraybuffer"
      //   })
      //   .then(response => {
      //     const blob = new Blob([response.data], {
      //       type:
      //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      //     });
      //     const a = document.createElement("a");
      //     // 生成文件路径
      //     let href = window.URL.createObjectURL(blob);
      //     a.href = href;
      //     let _fileName = response.headers["content-disposition"]
      //       .split(";")[1]
      //       .split("=")[1]
      //       .split(".")[0];
      //     // 文件名中有中文 则对文件名进行转码
      //     a.download = decodeURIComponent(_fileName);
      //     // 利用a标签做下载
      //     document.body.appendChild(a);
      //     a.click();
      //     document.body.removeChild(a);
      //     window.URL.revokeObjectURL(href);
      //   })
      //   .catch(error => {
      //     // 请求失败处理
      //     console.log(error);
      //   });
    },

    refresh() {
      console.log("refresh");
      // let self = this;
      // this.$axios
      //   .post("chargesysrecord.action")
      //   .then(response => {
      //     console.log(response.data.data);
      //     self.updateTable(response.data.data);
      //   })
      //   .catch(error => {
      //     // 请求失败处理
      //     console.log(error);
      //   });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin);
        console.log(this.tableDataEnd);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
        console.log(this.tableDataEnd);
      }
    }, //组件自带监控当前页码
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },
    updateTable(tableData) {
      this.tableDataEnd = [];
      this.filterTableDataEnd = [];
      //每次手动将数据置空
      this.tableDataBegin = tableData;
      this.totalItems = tableData.length;
      if (this.totalItems > this.pageSize) {
        for (let index = 0; index < this.pageSize; index++) {
          this.tableDataEnd.push(tableData[index]);
        }
      } else {
        this.tableDataEnd = tableData;
      }
    }
  },
  mounted() {
    this.updateTable(this.tableData);
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
.el-select {
  width: 230px;
}
</style>
