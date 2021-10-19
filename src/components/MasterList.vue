<template>
  <div class="masterlist">
    <div class="masterlist-nav">
      <div :class="itemIndex===1?'select':''" @click="toggleNav(1)">人气优先</div>
      <div :class="itemIndex===2?'select':''" @click="toggleNav(2)">
        价格排序
        <img
          v-if="itemIndex!==2"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAvCAYAAAD9/drQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFODE4QkY2RDExQjExRTg5REFEQzc0MkU3OTc2RDIxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFODE4QkY3RDExQjExRTg5REFEQzc0MkU3OTc2RDIxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0U4MThCRjREMTFCMTFFODlEQURDNzQyRTc5NzZEMjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0U4MThCRjVEMTFCMTFFODlEQURDNzQyRTc5NzZEMjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4wbQMFAAAC80lEQVR42ryY208TQRTGt2XBGA2CeAlo1AStigLRF29EFI2J8faCD/oH9F8z0Qc1VKNRQ8XriwhVgWjFSwgBotKAmlRq63eSb81mM+3ObKc9yS/pTnfON3PmzJndjSWTScfANoCroASugW+6HV0DkVUgAY5T6BVYBnnbQlvBeXCE1+/BPPio0zluIHSAQu3kHNscW0Ix0A1Ogz28jvH3AP+L2QhdC0cva9Poa29i2xcwAxarmZE43s+R71TMNMH/9oUNOkxoG9elNzAb/0B6ec/2qEISmmN0sqnCfZvBBd7bZCokIz0ITipCpjK55wSzsNFEqBmcAX2VRhmYfR/7NOsKyYh6wCnN2Xi2i1ugRzUrldBecAl0OeYmfS5yj1UUWg0OgbOgNYJQK/sepi+lUJyp2s+QNUQQamAI++krrqoMGxmyAcMaqIqSZOtX8ImF97/DNb50bneqtw76Ep9rPSGXiyf1rNOxZ530uVtC6nLXH2XjeotCbfQ5BWZdrstlsMOxa3H6HAQFl+eJ7ObvPKJLloS8c2udbGIRug4ecAQly7MSob8gJ0Jppw4Wd+pkdRNyubFaarhGRW+NrrAIdtQo62bBCxF6w/LeXaOoyYbNiNBNVl15ENlicd2KfAy7AW6J0znwHNwNezYztB/gDngmFVyECmASpMC0RaFp+pTQFbwwLfPtIM0ZVmtz9DUKfgb30QK4DYYZ32rWZpi+FlQbVmrSGHjMV5FiRJEsZzPm9xHMsF/gJbgXMTEW2Vd8/A4rQROSjkwQU5tgyCZ1at0KGAePGAZdy7LPOH1oFdUlcJ974I+GiNzzlH2WTKr3ClMzrfmOmmWmjapmE/bGl+cou/igUe7VZZ4bs+Lsw+raZzBULu6+9RziA2Pkg0/K01uGJZgYcpx84H/vyoXM5ITNsTiOBJzJ7ycsxjkbR7mMPAMeskB6h+MU2zI6h6XJl5PXXPQ2XqfYZv1b0AydJziDFNusC+X5/WfElwh53c7/BBgAUNOzFCq1aWsAAAAASUVORK5CYII="
          alt
        />
        <img
          v-if="itemIndex===2&&sortValue"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAvCAYAAAD9/drQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdFMEZEQ0JDRDExQjExRThCMTRGQkY3RDNEQzJBMzhGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdFMEZEQ0JERDExQjExRThCMTRGQkY3RDNEQzJBMzhGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0UwRkRDQkFEMTFCMTFFOEIxNEZCRjdEM0RDMkEzOEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0UwRkRDQkJEMTFCMTFFOEIxNEZCRjdEM0RDMkEzOEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz488rPLAAADB0lEQVR42ryY208TQRTGt2UBjQbFogY0aoJWRQvRB69EBI2J8fqgD/oPmuiDGirRqKHi9UERqgKRipc0BIhIA0pSWbt+x3w1m822u7OddpJfs53unG/mzJkzM41cHpg0FEoLuA5scAN8D9rQVBBpBHFwgkJvwBLI6xbaCs6Do/z+EcyCT0EaRxWEDlColZxjnaFLKAIS4DTYw+8RPvfxt4gO161n72Vu6h31Daz7CrJgoZIRieH97PlOj5HG+ds+v077CW3jvHS5RuPsSBff2R5WSFxznEY2lXlvM7jAdxtUhaSnB0Gvh8u8irxzklFYryLUBM6A7nK9dI2+m22aggpJjzrBqYCjKZZdXAKdXqPyEtoLLoEOQ71Im4tcY2WFVoPD4CxoDiHUzLZHaMtTKMpQ7aHL6kII1dGFPbQV9coMG+myPsUc6OUlidZv4DMT73+Daxzh3GpUXtpoS2yuLQqZnDzJZ+2GvtJOm7vFpSZX/TFWbtAoFKPNCTBtcl6ugh2G3hKlzSvAMq2CneBqnucWbWsSKu5b62QRm5Zt3MTDQ/bA1jwqEfoDcuahllUpowYl8jo7Xwsdw4w1RmsjtGzZvTwXVGuOCv/mCB/XmATbqhR10+ClCL1jek9UyWuyYNMidJtZVw4iWypMqM5S4DHsFrgjRmfACzDgdzZTLD/APfBcMrgIWWAcJMGURqEp2hTXWUU3LfF2kOIIKy0ztDUMfrp32DlwFwzSv5XMzSBtzXlt5ZKTRsATXkUKIUUyHM2I04Y7wn6BV+B+yMBYYFuxsex33BqTcGSAqJYxumw8yLluBYyCx3RD0JJhm1HaCHQkXgQPuAZ+BxCRd56xzaLK2XuFoZkKeEfNMNKGvUbjd+PLs5cdPGiUurrMcmGWHb1fXvsC+kv53TGf/Twwhr7xSXp6T7e4A0O2k0n+9qGUy1Ru5TkmxyGXMXl+ymSc03H9l56nwSMmyOLmOMG6dJDNUuWfk7ec9Bi/J1mn/b+gLI3HOYIk67QL5fn/z5AjEPJBG/8VYAAXKL60dI/c4AAAAABJRU5ErkJggg=="
          alt
        />
        <img
          v-if="itemIndex===2&&!sortValue"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAvCAYAAAD9/drQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdEQTBFQ0FDRDExQjExRThCQTRCOTczQjgwRDdDODA5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdEQTBFQ0FERDExQjExRThCQTRCOTczQjgwRDdDODA5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0RBMEVDQUFEMTFCMTFFOEJBNEI5NzNCODBEN0M4MDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0RBMEVDQUJEMTFCMTFFOEJBNEI5NzNCODBEN0M4MDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7LcljNAAADB0lEQVR42ryY208TQRTGd8uA8RIU8RLQqAlaFS1EX7wRETQmxgsv+qD/oIk+eKEajRoqXmMiQpVLtOKNIBCQBtRYqa3fMV/NZrPt7mynneTXbKc755s5c+bMTO3hr98sjbIOXAJ5cBnMBm2oNESWgSg4SqGXYBFkTAttBmfAIX5/C6bB+yCNIxpC+yjURE6zzjIlZIMYOAF28bvN527+Zptw3Rr2Xuam1lFfx7pPYALMlzMiMbyXPd/uMdIof9vj12k/oS2cl3bXaJwdaec7W8MKiWuO0MiGEu9tBGf5bp2ukPR0P+jycJlXkXeOMQprdYTqwUnQUaqXrtF3sE19UCHpURs4HnA0hbKDS6DNa1ReQrtBD2i19Iu0Occ1VlJoOTgAToGGEEINbHuQtjyFIgzVTrqsJoRQDV3YSVsRr8ywni7r1syBXl6SaP0MPjDx/je40hHOTVb5pZm2xOaqgpDi5Ek+a7HMlRba3CkuVVz1h1m51qBQI22OgUnFebkAtllmS4Q2z4OsUhE7xtU8xy06b0iosG+tlkWslG1dwcM99iBveFQi9Aek1YvZXwmrCkXd/PLDqorQXCZXHaEVyu7iuaBSc5T7N0f4uMgk2FyhqJsEz0ToNdN7rEJekwWbFKFrzLpyENlUZkJ1lhyPYVfBdTE6BZ6C235nM80it4db4IlkcBHKglEQB+MGhcZpU1yXLbhpkbeDBEdYbpmirQHw3b3DzoAboI/+LWdu+mhrxmsrl5w0CB7yKpILKZLiaAadNtwRJvnoObgTMjDm2VZs/PQ7bo1IODJAdMsIXTYa5Fy3BIbAA7ohaEmxzRBtBDoSL4C7XAO/A4jIO4/ZZkHn7L3E0EwEvKOmGGkDXqPxu/Fl2MtWHjSKXV2muTBLjt4vr30EvcX87pjPXh4YQ9/4JD29oVvcgSHbyTv+NlzMZTq38jSTY7/LmDw/YjJOm7j+S8+T4D4TZGFzHGNdMshmqfPPyStOeiO/x1ln/L+gCRqPcgRx1hkXyvD/n35HIGSCNv4rwACBzrzH0eD2ZwAAAABJRU5ErkJggg=="
          alt
        />
      </div>
      <div :class="itemIndex===3?'select':''" @click="toggleNav(3)">新晋老师</div>
    </div>
    <div class="masterlist-lists-box">
      <div class="masterlist-lists" ref="masterBox">
        <a
          v-for="(item,index) in masterList"
          :Key="index"
          @click="reMasterDetail(item)"
          class="masterlist-list"
        >
          <div class="masterlist-list-top">
            <div class="masterlist-list-top-img">
              <img :src="item.headimg" alt />
            </div>
            <div class="masterlist-list-top-text">
              <div class="masterlist-list-top-title">
                <span>{{item.name}}</span>
                <span v-if="item.is_recommend">荐</span>
              </div>
              <div class="masterlist-list-top-label">
                <span v-for="(itemChild,indexChild) in item.gre_tag" :key="indexChild">{{itemChild}}</span>
              </div>
            </div>
          </div>
          <div class="masterlist-list-center">{{item.introduce}}</div>
          <div class="masterlist-list-bottom">
            <div class="masterlist-list-bottom-number">
              <span>已答:{{item.num_all}}</span>
              <span>好评:{{item.dis_num}}</span>
            </div>
            <div class="masterlist-list-bottom-price">¥{{item.phone_price}}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      queryObj: this.$route.query,
      itemIndex: 1,
      sortValue: true,
      PageId: 0,
      masterList: []
    };
  },
  methods: {
    reMasterDetail(item) {
      this.$router.push({
        name: "masterDetail",
        query: {
          serve_id: item.serve_id,
          gre_id: item.gre_id,
          cate_id: item.cate_id,
          name: item.name
        }
      });
    },

    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },
    // 切换导航
    toggleNav(index) {
      if (this.queryObj.id) {
        this.masterList = [];
        this.PageId = 0;
        this.itemIndex = index;
        if (index == 1) {
          this.sortValue = true;
          this.getServeList(this.queryObj.id, "renqi", this.PageId);
          return;
        }
        if (index == 3) {
          this.sortValue = true;
          this.getServeList(this.queryObj.id, "new", this.PageId);
          return;
        }
        if (index == 2) {
          this.sortValue = !this.sortValue;
          if (this.sortValue == false) {
            this.getServeList(this.queryObj.id, "down_price", this.PageId);
          } else {
            this.getServeList(this.queryObj.id, "up_price", this.PageId);
          }
        }
      }
      if (this.queryObj.searchName) {
        this.masterList = [];
        this.PageId = 0;
        this.itemIndex = index;
        if (index == 1) {
          this.sortValue = true;
          this.getServeListMo(this.queryObj.searchName, "renqi", this.PageId);
          return;
        }
        if (index == 3) {
          this.sortValue = true;
          this.getServeListMo(this.queryObj.searchName, "new", this.PageId);
          return;
        }
        if (index == 2) {
          this.sortValue = !this.sortValue;

          if (this.sortValue == false) {
            this.getServeListMo(
              this.queryObj.searchName,
              "down_price",
              this.PageId
            );
          } else {
            this.getServeListMo(
              this.queryObj.searchName,
              "up_price",
              this.PageId
            );
          }
        }
      }
    },
    // 获取大师列表
    getServeList(cate_id, sort_type, PageId) {
      this.$http
        .post("get_serve_list", {
          cate_id: cate_id,
          sort_type: sort_type,
          PageId: PageId
        })
        .then(res => {
          if (res.data.code == 200) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.masterList.push(element);
            });
          }
        });
    },
    // 模糊查询
    getServeListMo(search_name, sort_type, PageId) {
      this.$http
        .post("get_serve_list", {
          search_name: search_name,
          sort_type: sort_type,
          PageId: PageId
        })
        .then(res => {
          if (res.data.code == 200) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.masterList.push(element);
            });
          }
        });
    }
  },
  created() {
    if (this.queryObj.name) {
      document.title = this.queryObj.name;
    }

    if (this.queryObj.id) {
      this.getServeList(this.queryObj.id, "renqi", this.PageId);
    }

    if (this.queryObj.searchName) {
      this.getServeListMo(this.queryObj.searchName, "renqi", this.PageId);
    }
  },
  mounted() {
    var that = this;
    var box = that.$refs.masterBox;
    // 监听这个dom的scroll事件
    document.addEventListener(
      "scroll",
      () => {
        if (
          this.getWindowHeight() + this.getScrollTop() + 1 >
          this.getScrollHeight()
        ) {
          if (that.itemIndex == 1) {
            that.PageId++;
            that.getServeList(that.queryObj.id, "renqi", that.PageId);
          } else if (that.itemIndex == 3) {
            that.PageId++;
            that.getServeList(that.queryObj.id, "new", that.PageId);
          } else {
            if (that.sortValue == false) {
              that.PageId++;
              that.getServeList(that.queryObj.id, "down_price", that.PageId);
            } else {
              that.PageId++;
              that.getServeList(that.queryObj.id, "up_price", that.PageId);
            }
          }
        }
      },
      false
    );
  }
};
</script>