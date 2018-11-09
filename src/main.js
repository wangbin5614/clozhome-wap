// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import instance from './axios/index';

import VueAMap from 'vue-amap-foreign';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '879d216e1d5295d18b653eee0577497c',
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'AMap.CircleEditor',
    'MarkerClusterer'
  ],
  uiVersion: '1.0',
  v: '1.4.4'
});

Vue.config.productionTip = false;
Vue.prototype.$post = instance('post');
Vue.prototype.$get = instance('get');

import { AlertPlugin, ToastPlugin } from 'vux';
Vue.use(AlertPlugin);
Vue.use(ToastPlugin, {
  position: 'middle',
  type: 'warn',
  isShowMask: true
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
