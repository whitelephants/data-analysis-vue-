<template>
  <div id="app" style="height:100%">
    <el-container style="height:100%">
      <el-aside width="250px" style="background-color:#545c64" v-if="!$route.meta.unShow">
        <el-row class="tac" style="height:100%">
          <el-col :span="24" style="height:100%">
            <el-menu
              unique-opened="true"
              router
              background-color="#545c64"
              text-color="#fff"
              active-background-color="#5B9AFA"
              style="height:100%"
            >
              <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">分析页</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-s-data"></i>
                  <span>多维度统计查询</span>
                </template>
                <el-menu-item index="table">详表查询</el-menu-item>
                <el-menu-item index="heatmap">热力图</el-menu-item>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>利润统计分析</span>
                </template>
                <el-menu-item index="profit_d">区域销售差异</el-menu-item>
                <el-menu-item index="profit_a">销售利润分析</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header style="text-align: center;" v-show="!$route.meta.unShow">
          <span style=" font-size: 22px">数据分析平台</span>
          <el-menu
            style="float: right"
            :default-active="1"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#B3C0D1"
            text-color="#333"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                {{username}}
              </template>
              <el-menu-item @click="logout" style="text-align:center;">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: localStorage.getItem("name")
    };
  },
  beforeUpdate() {
    this.username = localStorage.getItem("name");
    this.$refs.containerhigh.style.height = window.screen.height;
  },
  methods: {
    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("Authorization");
      this.ifShow = false;
      alert("退出登录");
      // this.showSidebar();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.router-link-active {
  text-decoration: none;
  color: black;
}

.el-button {
  color: black;
}
.el-container {
  font-family: simhei;
}
</style>
