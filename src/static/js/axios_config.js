import axios from 'axios';

axios.defaults.baseURL = "http://kc.ywhwl.com/api/";

// withCredentials配置为true表示在ajax请求中携带cookie信息，默认是false，实现服务器状态维持的关键
// axios.defaults.withCredentials = true;

export default axios;


// WEBPACK FOOTER //
// ./src/js/axios_config.js