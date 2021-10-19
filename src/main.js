import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import router from './router'
import App from './App'
import Vuex from 'vuex'

import '@/static/css/common.css'


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {
  name: 'v-touch'
})


Vue.use(Vuex)
Vue.use(VueRouter)

import axios from '@/static/js/axios_config';
Vue.prototype.$http = axios;
Vue.config.productionTip = false

var storeConfig = {
  state: {
    useMessage: JSON.parse(localStorage.getItem("useMessage")) || {},
  },

  mutations: {
    upState(state, params) {
      state.useMessage = params;
      localStorage.setItem("useMessage", JSON.stringify(params));
    },
    upStatePhone(state, params) {
      state.useMessage.phone = params;
      localStorage.setItem("useMessage", JSON.stringify(state.useMessage));
    }
  },

  actions: {},

  getters: {



  }
}


window.onbeforeunload = function () {}
if (JSON.parse(localStorage.getItem("useMessage"))) {
  axios.post("token_verify", {
      'token': JSON.parse(localStorage.getItem("useMessage")).token
    })
    .then(res => {
      if (res.data.code == 400) {
        localStorage.removeItem("useMessage");
        storeConfig.state.useMessage = {};
      }
    })

}

FastClick.attach(document.body)

Vue.config.productionTip = false

function plusReady() {

  var type = plus.os.name;
  if (type == "iOS") {
    plus.navigator.setStatusBarBackground("#50B6DB");
  } else {
    plus.navigator.setStatusBarBackground("#50B6DB");
  }
}
if (window.plus) {
  plusReady();
} else {
  document.addEventListener("plusready", plusReady, false);
}


function getQueryString(name) {
  var url = window.location.href;
  if (url.indexOf("ag_id") != -1) {
    var num = url.indexOf("ag_id") - 1;
    var cc = url.substring(url.indexOf("ag_id"));
    console.log(cc);
    var reg = new RegExp("(^|&)" + "ag_id" + "=([^&]*)(&|$)", "i");
    var r = JSON.stringify(cc)
      .substr(1)
      .match(reg);
    console.log(r)
    var ggg = unescape(r[2]);
    return ggg[0]
  } else {
    if (localStorage.getItem("ag_id")) {
      var agid = localStorage.getItem("ag_id");
      return agid
    }
  }
}


var is_weixin = (function () {
  return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
})();

var is_qq = (function () {
  if (navigator.userAgent.toLowerCase().indexOf(' qq') > -1 && navigator.userAgent.toLowerCase().indexOf('mqqbrowser') < 0)
    return true
})();
if (is_qq) {
  localStorage.setItem("qq", 1)
} else {
  localStorage.setItem("qq", 0)
}
if (is_weixin) {
  var ag_id = getQueryString("ag_id")
  localStorage.setItem("liulangqi", 1)
  localStorage.setItem("ag_id", ag_id)
} else {
  var ag_id = getQueryString("ag_id")
  localStorage.setItem("liulangqi", 2);
  localStorage.setItem("ag_id", ag_id)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(storeConfig),
  router,
  render: h => h(App)
})
