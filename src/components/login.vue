<template>
<div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 250px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>欢迎登录数据分析平台</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="loginForm.username" placeholder="请输入用户名（admin）"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码（123）" @keydown.enter.native="doLogin"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <td>验证码</td>
            <td>
              <el-input style="width:60%; float: left;" v-model="code" placeholder="请输入验证码" @keydown.enter.native="doLogin">123</el-input>
              <div class="ValidCode disabled-select" :style="`width:${width}; height:${height}`" @click="refreshCode">
                <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{item.code}}</span>
              </div>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <el-button style="width: 100%" type="primary" @click="doLogin">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>

</template>
 
<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '40px'
    },
    length: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      userToken: '',
      codeList: [],
      code:""
    };
  },
 
  mounted () {
    this.createdCode()
  },

  methods: {
    ...mapMutations(['changeLogin','changeAuthorization']),
    doLogin () {
      let _this = this;
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空');
      } else if(this.code.toLowerCase() != (this.codeList.map(item => item.code).join('')).toLowerCase()){
        alert('验证码输入错误');
      }else {
        _this.userToken = "测试";
        _this.userAuthorization = "测试";
        _this.changeLogin({ name: _this.userToken });
        _this.changeAuthorization({ Authorization: _this.userAuthorization });
        alert('登录成功');
        _this.$router.push({ path: '/home' });
        // this.$axios
        // .post('',
        //   { "username": this.loginForm.username, "password":this.loginForm.password,}
        // )
        // .then(res => {
        //   _this.userToken = res.data.info.userInfo.userName;
        //   _this.userAuthorization = res.data.info.userInfo.permittedAppIdsRole[11];
        //   // 将用户usernane保存到vuex中
        //   _this.changeLogin({ name: _this.userToken });
        //   _this.changeAuthorization({ Authorization: _this.userAuthorization });
        //   alert('登录成功');
        //   _this.$router.push({ path: '/' });
        // }).catch(error => {
        //   alert('账号或密码错误');
        //   console.log(error);
        // });
      }
    },
    
    refreshCode () {
      this.createdCode()
    },
    createdCode () {
      let len = this.length,
        codeList = [],
        chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
        charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
        })
      }
      // 指向
      this.codeList = codeList
      console.log("code")
      console.log(codeList.map(item => item.code).join(''))
      // 将当前数据派发出去
      // this.$emit('update:value', codeList.map(item => item.code).join(''))
    },
    getStyle (data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    },
  }
};
</script>

<style scoped lang="scss">
  .ValidCode{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
      display: inline-block;
    }
  }
  .login{
      line-height:300%;
      margin-top: 40%; 
      background-color:white;
      padding:15px;
} 
.login-button{
      margin-top: 15px; 
      text-align:right;
}
.login-title{
      font-size:18px;
}
.login-tip{
      font-size:15px;
}
.box img{
    width: 100%;
}
</style>