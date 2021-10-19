import Vue from 'vue'

import axios from 'axios'


const wxShare = (obj, callback) => {
  function getUrl() {
    var url = window.location.href;
    var locationurl = url.split('#')[0];

    return locationurl;
  }
  if (obj) {
    var title = obj.title == undefined || obj.title == null ? '问易台' : obj.title;
    var link = obj.link == undefined || obj.link == null ? window.location.href : obj.link;
    var desc = obj.desc == undefined || obj.desc == null ? '问易台' : obj.desc;
    var imgUrl = obj.imgUrl == undefined || obj.imgUrl == null ? '' : obj.imgUrl;
    var debug = obj.debug == true ? true : false;
  } else {

  }
  var urlLink = window.location.href.split('#')[0];



  axios.post("http://kc.ywhwl.com/api/jssdk_config", {
    url: urlLink
  }).then(res => {
    var wxdata = res.data;
    console.log(wxdata.jsApiList);
    Vue.wechat.config({
      'debug': false,
      'appId': wxdata.appId,
      'timestamp': wxdata.timestamp,
      'nonceStr': wxdata.nonceStr,
      'signature': wxdata.signature,
      'jsApiList': wxdata.jsApiList
    });


    Vue.wechat.ready(function () {

      Vue.wechat.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        desc: desc, // 分享描述
        imgUrl: imgUrl, // 分享图标
        success: function () {
          callback && callback();

        },
        cancel: function () {

        }
      });

      Vue.wechat.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {

          callback && callback();
        },
        cancel: function () {

        }
      });

      Vue.wechat.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {

          callback && callback();
        },
        cancel: function () {

        }
      });


      Vue.wechat.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {

          callback && callback();
        },
        cancel: function () {

        }
      });


      Vue.wechat.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {

          callback && callback();
        },
        cancel: function () {

        }
      });
    })
  })
}

export {
  wxShare
}




// WEBPACK FOOTER //
// ./src/js/wxshare.js
