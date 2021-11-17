<template>
    <div class="orderdetail">
        <div class="orderdetail-top">
            <div class="orderdetail-img"><img src="../assets/sucess.png" alt=""></div>
            <div class="orderdetail-text">
                <div class="orderdetail-text-top">订单已提交,等待老师答复中！</div>
                <div class="orderdetail-text-bottom">
                    老师已接收到该订单，10分钟内将会与您联系,请您耐心等待。
                </div>
            </div>
        </div>
        <div class="orderdetail-message">
            <div class="orderdetail-message-person">
                <div class="orderdetail-message-person-title">测算者信息</div>
                <div class="orderdetail-message-person-text">
                    <span>测算者：</span>
                    <span>{{orderDetail.bazi_name}}</span>
                </div>
                <div class="orderdetail-message-person-text">
                    <span>性别：</span>
                    <span>{{orderDetail.bazi_gender===1?'男':"女"}}</span>
                </div>
                <div class="orderdetail-message-person-text">
                    <span>出生日期：</span>
                    <span>阳历（公历）{{orderDetail.bazi_birthday}}时</span>
                </div>
                <div class="orderdetail-message-person-text">
                    <span>出生地点：</span>
                    <span>中国 {{orderDetail.bazi_area}}</span>
                </div>
                 <div class="orderfinshed-message-person-text" v-if="orderDetail.allow_phone">
                    <span>联系电话：</span>
                    <span>{{orderDetail.allow_phone}}</span>
                </div>
            </div>
            <div class="orderdetail-message-order">
                <div class="orderdetail-message-order-title">订单信息</div>
                <div class="orderdetail-message-order-text">
                    <span>服务咨询：</span>
                    <span>{{orderDetail.ord_type_name}}</span>
                </div>
                <div class="orderdetail-message-order-text">
                    <span>咨询类型：</span>
                    <span>{{orderDetail.cate_name}}</span>
                </div>
                <div class="orderdetail-message-order-text">
                    <span>提问问题：</span>
                    <span>{{orderDetail.title}}</span>
                </div>
                <div class="orderdetail-message-order-text-num orderdetail-message-order-text-num-one">
                    <span>下单时间：</span>
                    <span>{{orderDetail.created_at}}</span>
                </div>
                <div class="orderdetail-message-order-text-num">
                    <span>订单编号：</span>
                    <span>{{orderDetail.ord_number}}</span>
                </div>
                <div class="orderdetail-message-order-text-price">
                    <span>￥</span>{{orderDetail.ord_price}}
                </div>
            </div>
        </div>
        <div class="orderdetail-btn">
            <div class="liaotian" @click="liantian(orderDetail.kefu_url)" v-if="orderDetail.kefu_url">联系老师</div>
            <div @click="tanBlack">取消订单</div>
        </div>
        <div class="orderdetail-tip">
            <div class="orderdetail-tip-box">
                <div class="orderdetail-tip-box-title">提示</div>
                <div class="orderdetail-tip-box-text">
                    <div>请添加问易君微信号:<input type="text" value="wenyijunwx" id="weixin" class="weixin">
                        <button data-clipboard-text="wenyijunwx" data-clipboard-demo="" data-clipboard-action="copy" class="btn" @click="copyText">
                            一键复制
                        </button>
                    </div>
                    <div>我们将为您取消订单并退款！</div>
                </div>
                <div class="orderdetail-tip-box-btn">
                    <div @click="yin">完成</div>
                    <div class="orderdetail-tip-box-btn-qu" @click="yin">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Clipboard from "clipboard";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      orderId: this.$route.query.id,
      orderDetail: ""
    };
  },
  methods: {
    tanBlack() {
      document.getElementsByClassName("orderdetail-tip")[0].style.display =
        "block";
    },

    yin() {
      document.getElementsByClassName("orderdetail-tip")[0].style.display =
        "none";
    },
    liantian(e) {
      window.location.href = e;
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
    }
  },
  created() {
    this.$http
      .post("order_detail", {
        ord_id: this.orderId,
        token: this.$store.state.useMessage.token
      })
      .then(res => {
        if (res.data.code == 200) {
          this.orderDetail = res.data.data["0"];
          var str = this.orderDetail.bazi_area;
          if (str.indexOf("value") != -1) {
            this.orderDetail.bazi_area = JSON.parse(
              this.orderDetail.bazi_area
            ).value;
          }
        }
      });
  },
  mounted() {
    // const clipboard = new Clipboard(".btn");
    this.copyText();
  }
};
</script>

