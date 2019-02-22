import axios from 'axios';
import { Toast } from 'antd-mobile';

// axios拦截器
axios.interceptors.request.use(function(config) {
    Toast.loading('请等待...', 10);
    return config;
});

axios.interceptors.response.use(function(config) {
    Toast.hide();
    return config;
});