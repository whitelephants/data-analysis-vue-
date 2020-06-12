<template>
  <div>
 
   <el-row type="flex" class="row-bg" justify="right">
     <el-col :span="6">
        <el-select clearable  v-model="input" placeholder="分析类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="13">
       <el-upload style="float: right; margin-left:20px;"
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <el-button type="primary">文件上传</el-button>
        </el-upload>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="float: right; width:100px" @click="audit">一键分析</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="float: right; width:70px" @click="download">导出</el-button>
      </el-col>
    </el-row>
    <hr />
    
    <!--下面是一个表格-->
    <el-table :data="tableDataEnd" height="400" stripe style="width: 100%">
      <el-table-column fixed prop="s_g" label="分析结果" width="100"></el-table-column>
      <el-table-column fixed prop="s_g" label="原因分析" width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
      <el-table-column prop="s_name" label="        " width="100"></el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
    data() {
     
      return {
        input: "",
        options: [
        { value: "账单重复支付分析", label: "账单重复支付分析" },
        { value: "销售类型分析", label: "销售类型分析" },
        { value: "产品、配套类型分析", label: "产品、配套类型分析" },
        { value: "购买人群分析", label: "购买人群分析" },
        { value: "运行状态分析", label: "运行状态分析" },
        { value: "产品造价分析", label: "产品造价分析" },
        { value: "维护费分析", label: "维护费分析" },
        { value: "场租分析", label: "场租分析" },
        { value: "共享优惠分析", label: "共享优惠分析" }
      ],

      }

    }
}
</script>

<style>

</style>