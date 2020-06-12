<template>
  <div style="height:96%">
    <el-select style="margin-bottom:5px" v-model="value" placeholder="请选择"  @change="switchmap">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <ve-heatmap :data="chartData" height="100%" :settings="chartSettings"></ve-heatmap>
  </div>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
        bmap: {
          center: [121.47322240845, 31.236064370321],
          zoom: 12,
          roam: true,
        },
        type: 'bmap',
        pointSize:10,
      }
      return {
        chartData: {
          columns: ['s_longitude', 's_latitude','sales'],
          rows: [
            { 's_longitude': 121.416, 's_latitude': 31.1978 ,'sales':3000.1,'profit':4300.1 },
            { 's_longitude': 121.47322240845, 's_latitude': 31.236064370321 ,'sales':4000.1 ,'profit':4000.1},
            { 's_longitude': 121.47322240845, 's_latitude': 31.236064370321 ,'sales':8000.1 ,'profit':3001.1},
            { 's_longitude': 121.456, 's_latitude': 31.1978 ,'sales':7000.1 ,'profit':3000.1},
            { 's_longitude': 121.446, 's_latitude': 31.1978 ,'sales':6000.1 ,'profit':3002.1},
            { 's_longitude': 121.436, 's_latitude': 31.1978 ,'sales':5000.1 ,'profit':4003.1},
            { 's_longitude': 121.426, 's_latitude': 31.1978 ,'sales':4000.1 ,'profit':5004.1},
            { 's_longitude': 121.416, 's_latitude': 31.1978 ,'sales':3000.1 ,'profit':8005.1},
            { 's_longitude': 121.416, 's_latitude': 31.1978 ,'sales':2000.1 ,'profit':6006.1},
            { 's_longitude': 121.416, 's_latitude': 31.1978 ,'sales':1000.1 ,'profit':7007.1}
          ],
        
        },
         options: [{
          value: '销售额',
          label: '销售额'
        }, {
          value: '净利润',
          label: '净利润'
        }, ],
        value: '销售额'
      }
    },

  methods: {
    refresh() {
      let self = this;
      this.$axios
        .post("hitmaprecord.action")
        .then(response => {
          console.log(response.data.data);
          self.chartData.rows=response.data.data;
        })
        .catch(error => {
          // 请求失败处理
          console.log(error);
        });
    },
    switchmap(e){
      if(e=='销售额'){
        this.chartData.columns=['s_longitude', 's_latitude','sales']
      }else if(e=='净利润'){
        this.chartData.columns=['s_longitude', 's_latitude','profit']
      }

    },
  },
  

  mounted() {
    // this.refresh();
  },
}
</script>

