<template>
  <div class="selectmaster">
    <div class="selectmaster-text">建议您选择多位老师听取意见</div>
    <div class="selectmaster-lists">
      <div
        class="selectmaster-list"
        v-for="(item,index) in masterList"
        :key="index"
        @click="selectMaster(item)"
      >
        <div class="selectmaster-list-left">
          <img :src="item.headimg" alt />
        </div>
        <div class="selectmaster-list-right">
          <div class="selectmaster-list-right-top">
            <div>
              <span>{{item.name}}</span>
              <span v-if="item.is_recommend">火</span>
            </div>
            <div>¥{{item.fast_text}}</div>
          </div>
          <div class="selectmaster-list-right-center">{{item.introduce}}</div>
          <div class="selectmaster-list-right-bottom">
            <div class="selectmaster-list-right-bottom-num">
              <div class="selectmaster-list-right-bottom-num-order">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwRDQxODkwRDExQTExRTg5Q0EwODhDMTU0NEJENDdCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwRDQxODkxRDExQTExRTg5Q0EwODhDMTU0NEJENDdCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzBENDE4OEVEMTFBMTFFODlDQTA4OEMxNTQ0QkQ0N0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzBENDE4OEZEMTFBMTFFODlDQTA4OEMxNTQ0QkQ0N0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7nnU3kAAACrElEQVR42uyYvWsUQRiHZ9dNDuN3EkgT0SKoREGxSCEIIsRgE8HGwv5s0tj4P1hLGnsrRYiVCIL4gdHGRvRySozoSYKJ0Rjvcre5HX+v+S03LpG93Iy5FPvCcwe3t7PPzse+746Xz+cPKqVOg4vgCNgFPNWIArgOHoI6f7sCroI9Kj1CcBPcAD+AD4bBNV4vDg1+grfgLnga4OMMOAeOggr4wAYktoHPPEkbDS2BEv/vJY7FEd/gClikpCkh7e4wbjgCu8ExthuI3CXewRSY4LfPxkXuGyjy5DiegwX2sp84ZsoJZZ5fMeTegHHQTTnNNg6DC+CUHAv4Q5li98DXRONy8mriwp/ALOXTImKvmb0rw/uK52vj2BS/x8RL5LaDOd5dSTUXdWM4WglN4TDxe4keMm264yGRHuoAOdXeyNFDfCJ/nTnSzvjLwVdbODK5TG6zI2jyBnL8r3ZwzYjPyFpae2lykp5OghHQ40hO2pgGt8AXG7lOIFXLWdBvKecZci+ZKq2GdYkNSQ7stUxZZur7aOTwluVC1lcFx3MucrEgZDF0gb1cFJGjhVhhyRXazjkp/s6D/aBq0Xtm3n4N7rAasuo5WaXHwSDrPhdyIUs1q2FdZY31hMu/5kBOcw7/crEgiqx6Ox3OOXmv+G4rpzl5fRaBNnKesVqrzTyW0uQ6+PIjD+G+dd4lWpETqffgPpi3kdsJToDL4ICjnpPRmOTDfd52zk0z1exzWHDMMPtYDesyeEayei6Ty+QyuSbktKNi0vb9Qifl6nzgVtssV6XHnz27gDWa7CgOqLVNvYV/1GD/s7fi6KGH+JRF7h2T+yj/UFSNTcHNlJPeOkQP2Y4tiNxttbYnPMTkvtimhRIxf0uF/AI8ELlHqrFZPOg4wW80apxaUk49/i3AAHvDuIIRTHTsAAAAAElFTkSuQmCC"
                  alt
                />
                <span>{{item.ord_num}}个订单</span>
              </div>
              <div class="selectmaster-list-right-bottom-num-evl">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwNUU0QTk3RDExQTExRTg4OEY1RDBEQTFEMURCOTcxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwNUU0QTk4RDExQTExRTg4OEY1RDBEQTFEMURCOTcxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzA1RTRBOTVEMTFBMTFFODg4RjVEMERBMUQxREI5NzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzA1RTRBOTZEMTFBMTFFODg4RjVEMERBMUQxREI5NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5eSG9pAAAFEUlEQVR42syY628UZRTGZ3anrb0LbRGrIBoBtYCoUaghsRIVEq/xA2n5Iom6H/2D/CJ4QUOtlxg1ahQwoi0aUNAqtdpQqUVtuRTawm7b9TnJb5LJODM722yJJ3ky2+7Mvs97Ls8577i5XM5JadVCk3Cr0CHcxecVwjKhTnCFeWFWuCCMCseFz4STTnqz3/K8lDfXCpuFTq5tQhFcFM4H/nZBVqgXbhSayyDWImwTlpciVyXcAqmHhLvx3pjwgzAk/CFMCFPCAs804NEb8OTllMTs/seFZ+25JHK2+/uFbqGLRfqFI8IpYVK4JMwIV4W5wLP2u9eBjDCd0mNPCC+y9udx5BqFx4Rdwh3kzpfCIeFYiEiUzeGty2WE0tbazcbeFT6OImdhe1TIkfCHhVeFb1KQWoxZ+J+EWCNr9QpnwuQsBDtwrSXy+8I+wrgUxFqFp4QXKKDXhLfJY8cLScV9uPc2XLtX+MlZGmtjrW6c0icc8ImFya0WeoT15FYUsSzPZAKyEbRCSg9bVT7NenWE0jx2xglVlYMebRUehrmF8ucIYbRQ38Tn+VA6GNlx4TRVXEzIMSP2PJuLJOaTy6L221nEpGIAzQraKvLRNG858hHUwzkq+SPh+9D3UaF0IdWLbjpR5JahyKb8RwlpPuLeGjxcw3MLIXIunaSOTcaFspt79kFuLBSddtrfhEfyb2bhw+w+ykaEN4UPI8i5hHEacc4nhNKJIWa2RnhJ+FN4zyOkbcT8R1hH2SWwGB3rBg5h7IVA2KyjrCOFRjJ0AIepYbLCcrGSPtnDwm8I+2OIOQwRg0RmQ4awLiC0UxUkZjn2DKHMIk19CcT86AyhBGs8dnee/jlbYsZqBdUR1ewExqZaZGknVdxHKMdLbMh68a9MQK0es9a5mEQOy8AWiqc55l5f2xroNraBV+g24ym8bfIzzPSzwqNKi7g0Sd0bme0sR6+HXDFGnlzSxKr/g5TEHMJpIv66RccXYSdF2zHPfif8RdjmY8hl+W6EIvunzFzN+5vxAm2o1FQ8XoYHKmL+lOoSNs/5/1jGQ1tcptHqJZrb0loNA67ltWvkziITq8ilmYSjYT33ZBOmjji7giMKCfc00OdtCJnySNxNsG1K6BLWhu4R7iQFCikIuQGJGeb8mlQgzXCxqWfUY27bCFog68ScLW4X7g1ISVpy/jn2SIqDzkbq4KRHL5tAYDuYfqM6xTQa5Id3rgxyVni/Edo485v+Sg5Tg0bud4bDDZxPh2N2eBZRHQhMvmnNhdiFhHvswP4g3cpeYZz26Ktf4c4H6G1HI3Lqasx0WwmrxjGdgYP7xQwibKE8iDe2QTJzDbV2C83ew1G/GK9MIJ++huDNwh6q8lqYrfMc6x4iajNOyDujjOGnGHf2MCUvpXWwTheqsR8e/+mneeJ9AL3ZSZj3koeFCpKyylyLx3ZQhL2s7zgxzd7mr0+45jiUNPOaoL9Cra2WvN7N1Tb+svBF1OwVNhvVP+XzLpK1PfSWaX4RpKoQ8EdI/nZ+6y06x3Qacv4s/w4jUg8/1kNTXsucf46NzMa8n6uhZzei/OvRsa18f5Ac64/TzKQRyR74VvibaxcSs51j5InAm81JiBbwUBOEVkNqU+CsMoCO9dNxYsW81PxWIFnHuHai5C0MCusCE3GRXC0GJuIqFOEKEnEMUidKtLJU5HybZUQfSnibXk+bygcO4BMMEoMI/Qj/TzM0OP8KMAAum2f8dsdBWQAAAABJRU5ErkJggg=="
                  alt
                />
                <span>{{item.dis_num}}人评价</span>
              </div>
            </div>
            <div class="selectmaster-list-right-bottom-icon">
              <i
                :class="selectMasterId===item.gre_id?'weui-icon weui_icon_success weui-icon-success':'weui-icon weui_icon_circle weui-icon-circle'"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="quickquestion-btn">
      <div @click="sureOrder">提问</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  components: {
    Toast: Toast
  },
  data() {
    return {
      masterList: [],
      questionObj: {},
      pageNum: 0,
      selectMasterId: -1,
      selectMasterMessage: {}
    };
  },

  methods: {
    getMasterList(cate_id, PageId) {
      this.$http
        .post("great_list", { cate_id: cate_id, PageId: PageId })
        .then(res => {
          if (res.data.code == 200) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.masterList.push(element);
            });
          }
        });
    },

    selectMaster(selectMasterList) {
      this.selectMasterMessage = selectMasterList;
      this.selectMasterId = selectMasterList.gre_id;
    },

    sureOrder() {
      if (this.selectMasterId == -1) {
        Toast({
          message: "请选择老师",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      var orderMessage = {
        ...this.questionObj,
        ...this.selectMasterMessage,
        type: "快速提问"
      };
      localStorage.setItem("orderMessage", JSON.stringify(orderMessage));
      this.$router.push({ name: "sureOrder" });
    }
  },
  created() {
    this.questionObj = JSON.parse(localStorage.getItem("questionObj"));
    console.log(this.questionObj);
    this.getMasterList(this.questionObj.classifyId, this.pageNum);
    let _this = this;
    window.onscroll = function() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        _this.pageNum++;
        //写后台加载数据的函数
        _this.getMasterList(_this.questionObj.classifyId, _this.pageNum);
        console.log(
          "距顶部" +
            scrollTop +
            "可视区高度" +
            windowHeight +
            "滚动条总高度" +
            scrollHeight
        );
      }
    };
  }
};
</script>