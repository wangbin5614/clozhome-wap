import axios from 'axios';
import Qs from 'qs';

const BASE_URL =
  window.document.location.href.indexOf('clozhome') > -1
    ? 'https://www.clozhome.com/'
    : 'http://47.99.101.143:8080/';

const Axios = method => {
  const instance = axios.create({
    method,
    baseURL: BASE_URL,
    timeout: 1000 * 6,
    headers: {}
  });

  //  添加请求拦截器
  instance.interceptors.request.use(
    config => {
      if (config.method.toLowerCase() === 'post') {
        config.data = Qs.stringify(config.data);
      }
      if (config.method.toLowerCase() === 'get') {
        config.params = Object.assign(
          {},
          config.data || {},
          config.params || {}
        );
        delete config.data;
      }
      return config;
    },
    err => {
      alert('请求失败' + err.message);
      return Promise.reject(err);
    }
  );

  //  添加响应拦截器
  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    err => {
      alert('响应失败' + err.message);
      return Promise.reject(err);
    }
  );
  return instance;
};

export default Axios;
