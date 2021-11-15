<template>
  <div class="personalcenter personalcenterBottom">
    <div>
      <div class="personalcenter-message">
        <div class="personalcenter-set" @click="rePersonSet">
          <img src="../assets/c0.png" alt />
        </div>
        <div class="personalcenter-message-img">
          <img :src="useMessage.avatarUrl" v-if="useMessage.avatarUrl">
          <img src="../assets/tx.png" v-if="!useMessage.avatarUrl">
        </div>
        <div class="personalcenter-message-title">{{useMessage.nickName?useMessage.nickName:"问易君"+uid}}</div>
        <div class="personalcenter-message-sex">
          <img src="../assets/cn.png" v-if="useMessage.gender===1">
           <img src="../assets/cnv.png" v-if="useMessage.gender!==1">
        </div>
      </div>
      <div class="tipbox" v-if="orderNum>5&&showtip">
        <div class="dianji">
          <span>温馨提示：您有一次99元咨询金牌老师的机会，请联系
            <span>易君微信号:</span><input value="wenyijunwx" id="weixin" class="weixin">领取
            <button data-clipboard-text="wenyijunwx" data-clipboard-demo="" data-clipboard-action="copy" class="btn" @click="copyText">
              一键复制
            </button>
          </span>
          <div>
            <i class="guanbi weui-icon weui_icon_cancel weui-icon-cancel" @click="cancel"></i>
          </div>
        </div>
      </div>
      <div class="per">
        <div class="personalcenter-nav">
          <div class="personalcenter-nav-title">我的</div>
          <div class="personalcenter-nav-lists">
            <a href="#/followTeacher" class="personalcenter-nav-list">
              <div>
                <img src="../assets/c1.png" alt />
              </div>
              <div>关注老师</div>
            </a>
            <a href="#/personArchives" class="personalcenter-nav-list">
              <div>
                <img src="../assets/c2.png" alt />
              </div>
              <div>八字档案</div>
            </a>
            <a href="#/todayFortune" class="personalcenter-nav-list">
              <div>
                <img src="../assets/c3.png" alt />
              </div>
              <div>每日运势</div>
            </a>
          </div>
        </div>
        <a href="#/order" class="personalcenter-order">
          <div class="personalcenter-bottom-list-left">
            <div class="personalcenter-bottom-left-img">
              <img src="../assets/c4.png" alt />
            </div>
            <div class="ordertext">
              全部订单
              <div class="ordernum" v-if="orderNum">{{orderNum}}</div>
            </div>
          </div>
          <div class="personalcenter-bottom-list-right">
            <img src="../assets/cr.png" alt />
          </div>
        </a>
        <div class="personalcenter-bottom">
          <a href="#/feedback" class="personalcenter-bottom-list">
            <div class="personalcenter-bottom-list-left">
              <div class="personalcenter-bottom-left-img">
                <img src="../assets/c5.png" alt />
              </div>
              <div>意见反馈</div>
            </div>
            <div class="personalcenter-bottom-list-right">
              <img src="../assets/cr.png" alt />
            </div>
          </a>
          <a @click="reAboutUs" class="personalcenter-bottom-list">
            <div class="personalcenter-bottom-list-left">
              <div class="personalcenter-bottom-left-img">
                <img src="../assets/c6.png" alt />
              </div>
              <div>关于我们</div>
            </div>
            <div class="personalcenter-bottom-list-right">
              <img src="../assets/cr.png" alt />
            </div>
          </a>
          <div class="personalcenter-bottom-list">
            <div class="personalcenter-bottom-list-left">
              <div class="personalcenter-bottom-left-img">
                <img src="../assets/c7.png" alt />
              </div>
              <div>分享给好友</div>
              <div class="soshmId"></div>
            </div>
            <div class="personalcenter-bottom-list-right">
              <img src="../assets/cr.png" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="weui-tabbar">
        <a href="javascript:;" class="weui-tabbar__item">
          <div class="weui-tabbar__icon" @click="reHome">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRFRUZDOTdGRDExODExRThCRkM0RDQzRTMxMEFGNjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRFRUZDOTgwRDExODExRThCRkM0RDQzRTMxMEFGNjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REVFRkM5N0REMTE4MTFFOEJGQzRENDNFMzEwQUY2OTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REVFRkM5N0VEMTE4MTFFOEJGQzRENDNFMzEwQUY2OTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6CCcdJAAAMKElEQVR42tSc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" />
          </div>
          <p class="weui-tabbar__label">
            <span icon-class>问易台</span>
          </p>
        </a>
        <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
          <div class="weui-tabbar__icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRGNjZBOEVDRDExODExRThBODVFQUYxQ0M5RTUyODdFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRGNjZBOEVERDExODExRThBODVFQUYxQ0M5RTUyODdFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REY2NkE4RUFEMTE4MTFFOEE4NUVBRjFDQzlFNTI4N0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REY2NkE4RUJEMTE4MTFFOEE4NUVBRjFDQzlFNTI4N0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7e8mzgAAAFuklEQVR42uya+U8cZRjH3z04FspyCVIoFSqlYNFataAharTGo141qdVE4xkTf/I/8hfb9Ac1VaPpofVItd5ajamxtlhQwLZWRIQWYWV9HvczdtzMIsvO7Oyy8yTfsC3L7vt+5nmfaya0fd8J47FFRDHRWtF1os2iLlG7qIHfhUWzot9E46Jh0deiz0RDoinRvJeLjBrvbQMAruJ1p6hF1Ojw3lYA6XvWifoA8ik//ypGEHWiK0X3iO4UbcQ7/s/iSL1mq+ik6KBoPx5ytphAXCLaLnpItIl/h5b5WV0coetFe0Uvi74vBhDq3jtFD4v6cwBgtwZUjbfsEn0rShYqiGbR/aJnRFd4ALlHVCNKiHaLvnPrg8MuLrJctA0IvR7GnjbR46IHAF9QICo4BveSHkPGW1sDiDs4LgUDopmFbTH5sz6+c50b+3ADRIj64GbcNl8WIyMNZKhJ8g6ijYJprcsxZymmhdkgXuE7iF6uSrXJv1VyHHsKAUQHFWTMBxC6/vWsocxPEFHcsy0PmWKxtN1CwA75BWIVPUWl8dfquRhhv0DUAsNvq2YtUb9AVOGaflsZMSriF4hCsVCuMSpXEBdEfxYACF3D+VwGN7l2nzpam8nwO13UsOgYLfTVy4wnw7TcMVLlGof3zLCWhF8g/hBNmNS8MT1z/C46ItpDanuCMjySpce9KXqFOcRjGUAohJ/99IgFc3HYuiHtnE6Zi0PYGYJqO1d1KaZwD4veEL0LzNsywNI1nPUzRhib+8861BgdZBb1nP14x1KGKeriH4teEH1ADFDQlzm87wfRiMlxyh3peeQ5N4JVHXOIVWmpVadJ50xqxniORS/g5uo9SZsSANMr+yHQ9vJ/OgF/VnQTn2vZeQAfxCuMX0dDbUz0EbOBlrTf6RV8Em/Rjf0oel70CY2aNmxNbE6v+inRF6IvRSfYaLfoQdGtJjUEtttp0XsEU+M3CHXJ46J3KHPb7R6HpzzNZg+wQT3z3wCqnkA7x1U9bnPzQQDf7RAkJ0Wfi74CmO8grKj9OjOJnWnVpsahGxierMaNhwmmx9h0kqNSwTGLk24VwlYHTzMAeE006sYG3AKhmzkq2keAHHBoi7vxjFsAoBsZAuIcEFqYLagXbcQL4g7fd4rvOkAMKRgQVnV3mIBZztQqPSs1o14GKmdIrQnAaePUCszyRbLUbjxw0q3Fu31fYwx3tc58pmqylkyQjc2RdfTzdxFrTKGCMKS/PQQ+jRe3c+5zsVky00sciRG3F+3Vvc9fCYoTZAE9BpsIltnYJLFE0+n7wDjjxYK9vBs+bUuTA5THGjcuJZVWEhcitnJ93tZJWhDeoroc87J9zcfzEVpRvk3P0UQg7KLmqAeK9aDIJM3TEO4/zt9Pe73IfICwzvgoOkpb3kggraCGmCeDTHjl/l6AqMKtl/r3SYefvyCnaVO97bXJYvqUAOgFk+UjA9FlALgc91Y3r8atF7Js3S0lbQsO2RTJcvxmNXAzBOoRUu2UmyBqiPi99AbtBLw4AS9bEF6YBWLW1sGOA8OqYqeXCyLGle+n3h+kl4ia4rAknqHV7iGTev7qp0yjxegiR0B7gh2iGzkGcVNcFuJCNnARjzDyO+TkHU4gWvGAHQxC6kxxm/WUXhPzjHpqk9HFQOim7xI9RTVYZlaOxSn3G9nXi/amLZrWCOmDYI+uQAj2/V5LUNUK9lWTmrb/C0Jb3j5GYv0rFIIdxhayy0mC6Jw1L+hgHNZv/jscXalWRf+zjZLgHzo1jNLuI6CUijWxZ729cFo9Qp8/usak7huUmvWw984wL7qKqFByO17onbfNCkIHpZ2mdK3TArGeIqpUTffeHeZFTQmD0EJrdZhaPFzCIHTvjWHjz/ORhWaxcIl7g2WRAAItewAiZckAhC1iBhaACEAEIAIQAYilgwhgCAOFUBtwMLU6oRmiAy1lm/hbgAEAiMgqKTtvZosAAAAASUVORK5CYII=" />
          </div>
          <p class="weui-tabbar__label">
            <span icon-class>个人中心</span>
          </p>
        </a>
      </div>
    </div>
    <div class="personalcenter-black" v-if="!uid">
      <div class="personalcenter-black-login" v-if="!isPhone">
        <div class="personalcenter-black-login-title">需要登录</div>
        <div class="personalcenter-black-login-search"></div>
        <div class="personalcenter-black-login-btn" @click="weiXingLogin">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABXCAYAAAD2+TBqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU1RjQzODlFRDExQzExRTg5NEZEQzZDOTRGN0IwRjZCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU1RjQzODlGRDExQzExRTg5NEZEQzZDOTRGN0IwRjZCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVGNDM4OUNEMTFDMTFFODk0RkRDNkM5NEY3QjBGNkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTVGNDM4OUREMTFDMTFFODk0RkRDNkM5NEY3QjBGNkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ae0LxAAAJKElEQVR42uxd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" alt />
          <span>手机号码快速登录</span>
        </div>
        <div class="personalcenter-black-login-other" @click="webLogin">其他方式登录</div>
      </div>

      <div class="personalcenter-back-phone" v-if="isPhone">
        <div class="personalcenter-back-phone-title">请绑定手机号码</div>
        <div class="personalcenter-back-phone-text"><input type="text" placeholder="请输入手机号码" v-if="phone"></div>
        <div class="phone-input"><input type="text" placeholder="请输入验证码">
          <button class="phone-input-code" @click="getCode">{{timeNum}}</button>
        </div>
        <div class="personalcenter-back-phone-btn" @click="phoneLogin">
          确定
        </div>
      </div>
    </div>
    <div class="personalcenter-share" style="display: none;">
      <div class="personalcenter-share-box">
        <div class="personalcenter-share-box-title">请选择要分享的平台</div>
        <div class="personalcenter-share-box-text">
          <div id="share" sosh-status="initialized" class="soshm">
            <div class="soshm-item weibo" data-site="weibo">
              <span class="soshm-item-icon">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAPFBMVEVHcEz///////////////////////////////////////////////////////////////////////////+PybD1AAAAE3RSTlMAoGAw0PCAEEDAIHDfsJBQ4I+vnt3bXwAAAkdJREFUeF7tVtuCqyAMLAghAfHG///rqW0xwWjd9nHPzgsWyGQgF3r7v/CHzrhSiieau+8I+rKhn8MXBEXCp88JqDRwn4tIkBAtZM8MXwKJGb7E+FBBb3YEa4jI4GlMHwzpVKMpL5ggrdzqdo4bgz8+RFwKYzjIhEcWwKkEKA2EEy9DGKY1o3hRyGyBvDaUCnP/ZdcPldXWlx1Aslu0ptLGdbQ7+7kooPJRJbjnKPFkP7wDvEPs8vcxcypoexkFhOV1/8vjyOP6eR9hT7AUDZ/a2ZUBFQH7v0Sul/AyoM/sW899k2e2/JgAn+GLTSp2P7R3j4iArXcZa/H1aicNAIbIq6BIn3QcgGxFhsbRNFFggHf1J0rXNujmMNV2jFcdm3jHSY24FN8U8HmzjlylHnYaQ2V3Hc+NAKlVY05belLTtrqTTTHUSVVDr4Wp2qOM6SxOcVLknZzTOUmHzS7rE9QUGVVBH0nwgiA3jSN6kYzPkcM2iZpgUKNpkCphJ4EOm7VreicLgHqcngneKBjFjU4WMZe+q8mjCNo4ZhkD3OKZxYXplE8qCpYJUv1ibypA8dbkBzf4sImJ+mkx8mXan6HnY0KbNT5w0YsplYqw7fLYyE26a41szLH3kXU6ckpt0FMMJ4vRtIl8ac+rLqoX2mE9Zq/tNYPfCjKvHG7AugzquVcMz7yh7mgNWNKEF//cymJDaz0aL9zz4htHNFvE+86IaabC8EO8vUdIU9GQ78U1OqCiMRnLzq+BFjIR+TIRkYGE4fbb8Yd/KxZhLtPWraEAAAAASUVORK5CYII=" alt="weibo" />
              </span>
              <span class="soshm-item-text">微博</span>
            </div>
            <div class="soshm-item qq" data-site="qq">
              <span class="soshm-item-icon">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAIGAwgKDwQBDA0FDfsHDgkD+PT2O/b44AAAGsSURBVHhe1dfddqsgEAXgzf8AYmw67/+sPUe7zHLhONjctN9dFHaMCVuCX859/GPwM+5Z+Ft+fuIuO/FB9IQb6sSd6DHsyaeKwxAqLIhpcL7MQdf4QtQTZr5UoDCRr3lcC6yIhCuGVV65ANWEK5F1CbLKAxbIPA/IkGUeARkPMe8GJEjS3w+o7wY0HrJAYGzmEQECT/Rgna9OCgBcGXl/j1M095Xa8xADqtMXVF7HzIQzCzamidMTVqniRHpVtguRO2U2+DZPhA5NzPb1yi6Fd4+8VDq0xiJ0STskm7RyOKB8uqRpu+hYobDbwCaWWU64kLLUKtNI4dgs/p6dXnmfz4lfOIp1nLFJ8769+rA+x+tFfXJt4dYjbupP5FuLmu8HZCnA/ihgLZLHSMA+MPRtaLYTakBO/U206xHL/02WtvsqqWjdho0iFwCFNzkEeX5eh2cc2UAA3Oiz1bUkbfJU9s1dWoAiaPNV5Y2N6l6nshiM8kdBN0PkeYiFgHhMu7NRLlH5DMpXGGD7TIJojn1t1QcfNMIFsm3PKDNhVcOe8VgMVJRW3bGaEuEX+gJWbpMHBa1eygAAAABJRU5ErkJggg==" alt="qq" />
              </span>
              <span class="soshm-item-text">QQ好友</span>
            </div>
            <div class="soshm-item qzone" data-site="qzone">
              <span class="soshm-item-icon">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAP1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////9KjZoYAAAAFHRSTlMAYECgEPAwwH8/4NAgUJCwcM+fr0RbN4IAAAGVSURBVHhe7ZbdkoMgDIUVE2ARf7o97/+s22k7pZmAUJnZq36XmBwPJgGHf+CLQ+zKN8DUJbABXRYi0GdhArosRNy5dhoAzMl8whN3UsADXRaI0WfBA30WGOiyMOKd8XOBIATCGQNdFoghCXSiBAJ/YgoEXJgp+5PjCs1Vh9H9yOjA3gRoVcuzK5KtjHVqu27db/Y0vyLKvtZ35AjOjz+itE74tEPCMBJa5hFKF5EvHdoAiX5XFPkTDRKaUWK7x1oW+YOCJuRZB5lfHoysAo9tsy2idKlGtZZnST7Fpxa9Fgr5aafqU/0qzTI0q62SyHc0HJOajU2mfeCHVoE55vKx1QSC7DTLkFxqAtJp1DPSdJ/yksZs34I6Qw4waXgStHjHjZecKVbKjuvcUIYdYF/GVf+YPGq42k9NDa71URX6SIB3MaH1MkAykb44xnaB8HyZnZvHySLBb5E7N5bBvMVF0Yxb2zgtL/eL0g540tJHng4e2qqAK4TER5GXShvwQZ2WUCmDA9bDTqP1eJz8ZoYKVoX08uUPi2Bapj4cFIsAAAAASUVORK5CYII=" alt="qzone" />
              </span>
              <span class="soshm-item-text">QQ空间</span>
            </div>
          </div>
          <div class="text">
            <!---->
            <!---->
            <div>微博</div>
            <div class="textQQ">QQ</div>
            <div class="textkj">QQ空间</div>
          </div>
        </div>
        <div class="personalcenter-share-box-qu">取消</div>
      </div>
    </div>

  </div>
</template>


<script>
import { wxShare } from "@/static/js/wxshare.js";

import Clipboard from "clipboard";
import soshm from "soshm";
import { Toast } from "mint-ui";
export default {
  components: {
    Toast: Toast
  },
  data() {
    return {
      useMessage: this.$store.state.useMessage,
      liulangqi: localStorage.getItem("liulangqi"),
      phone: "",
      isPhone: false,
      userData: "",
      share: false,
      qqliulangqi: localStorage.getItem("qq"),
      ucqq: true,
      loginCode: "",
      timeNum: "获取验证码",
      currentTime: 61,
      disabled: false,
      code: "",
      orderNum: 0,
      orderid: this.$route.query.orderid,
      orderDetail: null,
      showtip: true
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id || "";
    }
  },
  methods: {
    reAboutUs() {
      this.$router.push({
        name: "aboutUs"
      });
    },
    reHome() {
      this.$router.push({
        name: "home"
      });
    },
    copyText() {
      var that = this;
      if (Clipboard.isSupported()) {
        var clipboardDemos = new Clipboard(
          "[data-clipboard-demo]"
        ); /*创建方法*/
        /*复制成功回调*/
        clipboardDemos.on("success", function(e) {
          e.clearSelection();
          Toast({
            message: "复制成功",
            position: "bottom",
            duration: 2000
          });
          clipboardDemos.destroy();
        });
        /*复制失败回调*/
        clipboardDemos.on("error", function(err) {
          clipboardDemos.destroy();
        });
      } else {
        /*浏览器不支持时，进入手动复制方法*/
        Toast({
          message: "您的浏览器暂不支持此功能！请手动复制",
          position: "bottom",
          duration: 2000
        });
      }
    },
    cancel() {
      this.showtip = false;
    },
    reTiao() {
      if (this.orderDetail.ord_type_name == "大师服务") {
        this.$router.push({
          name: "masterList",
          query: {
            id: this.orderDetail.cate_id,
            name: this.orderDetail.cate_name
          }
        });
      } else if (this.orderDetail.ord_type_name == "快速提问") {
        this.$router.push({
          name: "quickquestion"
        });
      } else if (this.orderDetail.ord_type_name == "话题快测") {
        this.$router.push({
          name: "topic"
        });
      } else {
        this.$router.push({
          name: "shortcutphone"
        });
      }
    },
    doshare() {
      if (this.liulangqi == 2 && this.qqliulangqi == 0) {
        this.share = true;
        return;
      }

      Toast({
        message: "请点击右上角分享",
        position: "bottom",
        duration: 2000
      });
    },
    qushare() {
      this.share = false;
    },
    phoneLogin() {
      var ag_id = 0;
      if (localStorage.getItem("ag_id")) {
        ag_id = localStorage.getItem("ag_id");
      }
      if (!this.phone) {
        Toast({
          message: "请输入手机号码",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      if (!this.code) {
        Toast({
          message: "请输入验证码",
          position: "bottom",
          duration: 2000
        });

        return;
      }
      if (this.code != this.loginCode) {
        Toast({
          message: "验证码输入错误",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.$http
        .post("bind_member", {
          phone: this.phone,
          third_id: this.userData.third_id,
          ag_id: ag_id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.isPhone = false;
            var useMessage = res.data.data;
            this.useMessage = res.data.data;

            localStorage.getItem("useMessage", JSON.stringify(useMessage));
            this.$store.commit("upState", useMessage);
          }
        });
    },
    rePersonSet() {
      this.$router.push({ name: "personSet" });
    },
    weiXingLogin() {
      if (this.liulangqi == 2) {
        this.$router.push({ name: "login" });
      } else {
        this.weixinLogin();
      }
    },
    webLogin() {
      this.$router.push({ name: "login" });
    },

    weixinLogin() {
      var gid = this.$route.query.gid || 1;
      var url = encodeURIComponent(window.location.href);
      var a = window.location.href;
      if (a.indexOf("code") != -1) {
        var num = a.indexOf("code") - 1;
        var cc = a.substring(a.indexOf("code"));
        var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i");
        var r = JSON.stringify(cc)
          .substr(1)
          .match(reg);
        var ggg = unescape(r[2]);
        this.$http
          .post("wechat_login", {
            code: ggg
          })
          .then(res => {
            if (res.data.code == 10002) {
              this.isPhone = true;
            } else if (res.data.code == 200) {
              var useMessage = res.data.data;
              this.useMessage = res.data.data;
              localStorage.getItem("useMessage", JSON.stringify(useMessage));
              this.$store.commit("upState", useMessage);
            }
          });
      } else {
        console.log(url);
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx54fa7941f2145a21&redirect_uri=" +
          url +
          "&response_type=code&scope=snsapi_userinfo&state=" +
          gid +
          "#wechat_redirect";
      }
    },

    getCode() {
      if (this.phone) {
        var interval = setInterval(() => {
          this.currentTime--;
          this.disabled = true;
          this.timeNum = this.currentTime + "秒重新获取";
          if (this.currentTime <= 0) {
            clearInterval(interval);
            this.timeNum = "重新获取";
            this.currentTime = 61;
            this.disabled = false;
          }
        }, 1000);
        this.$http.post("alisms_send", { tel: this.phone }).then(res => {
          if (res.data.ResultCode == 400) {
            Toast({
              message: "同个号码使用次数过多",
              position: "bottom",
              duration: 2000
            });
          } else {
            this.loginCode = res.data.data;
          }
        });
      } else {
        Toast({
          message: "请输入手机号码",
          position: "bottom",
          duration: 2000
        });
      }
    }
  },
  created() {
    if (this.liulangqi == 1) {
      var a = window.location.href;
      if (a.indexOf("code") != -1) {
        var num = a.indexOf("code") - 1;
        var cc = a.substring(a.indexOf("code"));
        var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i");
        var r = JSON.stringify(cc)
          .substr(1)
          .match(reg);
        var ggg = unescape(r[2]);
        this.$http
          .post("wechat_login", {
            code: ggg
          })
          .then(res => {
            if (res.data.code == 10002) {
              this.isPhone = true;
              this.userData = res.data.data;
            } else if (res.data.code == 200) {
              this.useMessage = res.data.data;
              var useMessage = res.data.data;
              localStorage.getItem("useMessage", JSON.stringify(useMessage));
              this.$store.commit("upState", useMessage);
            }
          });
      }
    }

    var shareWxLink =
      window.location.href.split("#")[0] +
      "static/redirect.html?app3Redirect=" +
      encodeURIComponent(window.location.href);
    wxShare(
      {
        title: "个人中心", // 分享标题
        desc:
          "问易台是中国领先的易学文化服务平台，荟聚国内易学精英，致力为易学爱好着提供交流、分享、学习的资源交流平台。问易台作为一个高端易学文化平台，用户可随时向专家提问，寻求答案，专家立即回复，为用户快速解决问题。", // 分享描述
        link: shareWxLink, // 分享链接
        imgUrl:
          "http://cdn.ywhwl.com/images/2/2018/09/EkyIIryKcecKi2ecnCc7r8rEARKr72.jpg", // 分享图标
        debug: false
      },
      function() {}
    );

    if (this.$store.state.useMessage.mem_id) {
      this.$http
        .post("no_order_num", {
          mem_id: this.$store.state.useMessage.mem_id,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.orderNum = res.data.data;
            console.log(this.orderNum);
          }
        });

      this.$http
        .post("order_detail", {
          ord_id: this.orderid,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            this.orderDetail = res.data.data["0"];
          }
        });
    }
  },
  mounted() {
    var setShare = [];
    if (
      navigator.userAgent.indexOf("UCBrowser") > -1 ||
      (navigator.userAgent.toLowerCase().indexOf("mqqbrowser") > -1 &&
        navigator.userAgent.toLowerCase().indexOf(" qq") < 0)
    ) {
      setShare = ["weixin", "weixintimeline", "weibo", "qq", "qzone"];
    } else {
      setShare = ["weibo", "qq", "qzone"];
      this.ucqq = false;
    }
    soshm("#share", {
      url: window.location.href,

      title: "问易台",

      digest: "问易台是个有温度的平台",

      pic: "",

      sites: setShare
    });

    console.log(this.$store.state.useMessage);
  }
};
</script>