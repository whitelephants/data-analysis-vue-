import axios from 'axios';

// axios 配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = 'http://10.9.27.146:8000/';
axios.defaults.baseURL = 'http://10.9.27.146:8001/';

// 取消请求
var cancelToken = axios.CancelToken;
var cancel;

var comm=['conn_check/','add_driving_test/','add_hardware_replace/']
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let url = config.url;
    let Authorization = localStorage.getItem('Authorization')
    config.cancelToken = new cancelToken((c)=>{
        cancel = c;
        });
    console.log("Authorization=",Authorization);
    console.log("url=",url);
    if (Authorization<1 &&  comm.includes(url)) { 
      alert("没有权限");
      cancel("没有权限");
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


export default axios;

