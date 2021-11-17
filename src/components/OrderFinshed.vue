<template>
    <div class="orderfinshed">
        <div class="orderfinshed-message">
            <div class="orderfinshed-message-person">
                <div class="orderfinshed-message-person-img">
                    <img src="../assets/wc.png" />
                </div>
                <div class="orderfinshed-message-person-title">【测算者信息】</div>
                <div class="orderfinshed-message-person-text">
                    <span>测算者：</span>
                    <span>{{orderDetail.bazi_name}}</span>
                </div>
                <div class="orderfinshed-message-person-text">
                    <span>性别：</span>
                    <span>{{orderDetail.bazi_gender===1?'男':"女"}}</span>
                </div>
                <div class="orderfinshed-message-person-text">
                    <span>出生日期：</span>
                    <span>阳历（公历）{{orderDetail.bazi_birthday}}时</span>
                </div>
                <div class="orderfinshed-message-person-text">
                    <span>出生地点：</span>
                    <span>中国 {{orderDetail.bazi_area}}</span>
                </div>
                <div class="orderfinshed-message-person-text" v-if="orderDetail.allow_phone">
                    <span>联系电话：</span>
                    <span>{{orderDetail.allow_phone}}</span>
                </div>
            </div>
            <div class="orderfinshed-message-order">
                <div class="orderfinshed-message-order-title">【订单信息】</div>
                <div class="orderfinshed-message-order-text">
                    <span>服务咨询：</span>
                    <span>{{orderDetail.ord_type_name}}</span>
                </div>
                <div class="orderfinshed-message-order-text" v-if="orderDetail.ord_type===1||orderDetail.ord_type===2">
                    <span>测算老师：</span>
                    <span class="lookdetail" @click="looklaoshi">{{orderDetail.gre_name}}</span>
                    <span class="tianbtn" @click="guanzhu">点击关注</span>
                </div>
                <div class="orderfinshed-message-order-text">
                    <span>提问问题：</span>
                    <span>{{orderDetail.title}}</span>
                </div>
                <div class="orderfinshed-message-order-text">
                    <span>咨询类型：</span>
                    <span>{{orderDetail.cate_name}}</span>
                </div>
                <div class="orderfinshed-message-order-text">
                    <span>订单价格：</span>
                    <span class="orderfinshed-message-order-text-price">{{orderDetail.ord_price}}元</span>
                </div>
                <div class="orderfinshed-message-order-text-num orderfinshed-message-order-text-num-one">
                    <span>下单时间：</span>
                    <span>{{orderDetail.created_at}}</span>
                </div>
                <div class="orderfinshed-message-order-text-num">
                    <span>订单编号：</span>
                    <span>{{orderDetail.ord_number}}</span>
                </div>
                <div class="cha" @click="reKefu(orderDetail.kefu_url)" v-if="orderDetail.kefu_url">
                    查看对话
                </div>
            </div>
        </div>
        <!---->
        <div class="wenziti">温馨提示：如需更深度的解读，点击上方关注按钮,添加为您的专属顾问，为您一对一解答。</div>
        <div class="datishi" @click="reTiao"><img src="../assets/you.png" alt=""></div>
        <div class="orderfinshed-eva" v-if="orderDetail.is_comm">
            <div class="orderfinshed-answer-title">【服务评价】</div>
            <div class="masterdetail-comment-text">
                <div class="masterdetail-comment-text-left"><img :src="orderDetail.dis_content.headimg" alt=""></div>
                <div class="masterdetail-comment-text-right">
                    <div class="masterdetail-comment-text-right-top">
                        <div class="masterdetail-comment-text-right-top-phone">
                            {{orderDetail.dis_content.phone}}
                        </div>
                        <div class="masterdetail-comment-text-right-top-xing">
                            <img src="../assets/hx.png" v-for="(item,index) in orderDetail.dis_content.star" :key="index" />
                        </div>
                    </div>
                    <div class="masterdetail-comment-text-right-center">
                        {{orderDetail.dis_content.content}}
                    </div>
                    <div class="masterdetail-comment-text-right-bottom">
                        <div class="masterdetail-comment-text-right-bottom-type">类型:{{orderDetail.cate_name}}</div>
                        <div class="masterdetail-comment-text-right-bottom-date">{{orderDetail.dis_content.created_at}}</div>
                    </div>
                </div>
            </div>
        </div>
        <a :href='"#/evaluate?id="+orderId' class="orderfinshed-btn" v-if="!orderDetail.dis_content">
            立即评价
        </a>
    </div>
</template>

<script>
// import stopPlayImg from "../assets/img/暂停播放@3x.png";
// import startPlayImg from "../assets/img/播放.gif";
export default {
  data() {
    return {
      //   stopPlay: stopPlayImg,
      //   startPlay: startPlayImg,
      orderDetail: {
        bazi_name: "",
        bazi_gender: "",
        bazi_birthday: "",
        allow_phone: "",
        bazi_area: ""
      },
      orderId: this.$route.query.id,
      //   imgShow: stopPlayImg,
      star: 4
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id || 0;
    }
  },
  methods: {
    guanzhu() {
      console.log(111);
      this.$http
        .post("add_attention", {
          mem_id: this.uid,
          type: 1,
          resource_id: this.orderDetail.goto_gre_id,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          this.orderDetail.is_attention = 1;
        });
    },
    looklaoshi() {
      this.$router.push({
        name: "masterDetail",
        query: {
          serve_id: this.orderDetail.goto_serve_id,
          gre_id: this.orderDetail.goto_gre_id,
          cate_id: this.orderDetail.goto_cate_id,
          name: this.orderDetail.gre_name
        }
      });
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
    reKefu(href) {
      window.location.href = href;
    },
    togglePlay() {
      var audio = document.getElementById("video");
      if (audio.paused) {
        audio.play();
        this.imgShow = this.startPlay;
      } else {
        audio.pause();
        this.imgShow = this.stopPlay;
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
          if (str) {
            if (str.indexOf("value") != -1) {
              this.orderDetail.bazi_area = JSON.parse(
                this.orderDetail.bazi_area
              ).value;
            }
          }
        }
      });
  }
};
</script>

