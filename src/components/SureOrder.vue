<template>
  <div class="sureorder">
    <div class="sureorder-procedure">
      <div class="sureorder-procedure-text">
        <div class="select-text select-text-one">选择问题</div>
        <div class="select-text select-text-two">确定订单</div>
        <div>完成支付</div>
        <div>选择档案</div>
        <div>等待回复</div>
      </div>
    </div>
    <div class="sureorder-server" v-if="treatment_type===2">
      <div class="sureorder-server-title">服务类型</div>
      <div class="sureorder-server-type">
        <!---->
        <div class="select-type">聊天回复</div>
      </div>
      <div class="sureorder-server-text">
        <span>温馨提示:</span> 该订单将以
        <!---->
        <span>聊天的形式进行,支付成功后,请您到订单详情页主动联系老师，老师将及时给予您答复</span>
      </div>
    </div>
    <div class="sureorder-ordermessage">
      <div class="sureorder-ordermessage-title">订单信息</div>
      <div class="sureorder-ordermessage-text">
        <div class="sureorder-ordermessage-text-t">
          <div>{{leftShow}}</div>
          <div>{{rightShow}}</div>
        </div>
        <!---->
        <div class="sureorder-ordermessage-text-c">
          <div>订单编号</div>
          <div>{{timestamp}}</div>
        </div>
        <div class="sureorder-ordermessage-text-b">
          <div>下单时间</div>
          <div>{{currentdate}}</div>
        </div>
      </div>
    </div>
    <div class="sureorder-ordermessage">
      <div class="sureorder-ordermessage-title">支付信息</div>
      <div class="sureorder-ordermessage-text">
        <div class="sureorder-ordermessage-text-t">
          <div>订单价格</div>
          <div class="money">¥29.90</div>
        </div>
        <div class="sureorder-ordermessage-text-b">
          <div>实付金额</div>
          <div class="money">¥{{relPrice}}</div>
        </div>
      </div>
    </div>
    <!---->
    <div class="quickquestion-btn">
      <form method="post" action="http://kc.ywhwl.com/api/wap_pay" @submit="setOrdNumber">
        <input type="hidden" name="cate_id" v-model="classifyId" />
        <input type="hidden" name="mem_id" v-model="men_id" />
        <input type="hidden" name="ord_type" v-model="ord_type" />
        <input type="hidden" name="ord_number" v-model="timestamp" />
        <input type="hidden" name="treatment_type" v-model="treatment_type" />
        <input type="hidden" name="allow_phone" v-model="allow_phone" />
        <input type="hidden" name="type_id" v-model="type_id" />
        <input type="hidden" name="gre_id" v-model="gre_id" />
        <input type="hidden" name="question" v-model="question" />
        <input type="hidden" name="token" v-model="token" />
        <input type="submit" value="确认支付" class="order-sure" />
      </form>
    </div>
  </div>
</template>



<script>
import { MessageBox } from "mint-ui";
export default {
  components: {
    MessageBox: MessageBox
  },
  data() {
    return {
      orderMessage: {},
      currentdate: "",
      timestamp: "",
      serverType: 2,
      relPrice: 0,
      leftShow: "",
      rightShow: "",
      classifyId: "",
      men_id: this.$store.state.useMessage.mem_id,
      token: this.$store.state.useMessage.token,
      ord_type: "",
      treatment_type: "",
      allow_phone: "",
      type_id: "",
      gre_id: "",
      question: "",
      liulangqi: localStorage.getItem("liulangqi"),
      num: 0
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id;
    }
  },

  methods: {
   

    // 验证登陆
    checkLogin: function(e) {
      this.num++;
      if (this.num > 1) {
        e.preventDefault();
      }
      if (this.men_id) {
        return true;
      }
      if (!this.men_id) {
        var that = this;
        MessageBox.confirm("未登录,无法下单,请到个人中心登陆?").then(action => {
          that.$router.push({ name: "personalCenter" });
        });
      }

      e.preventDefault();
    },
    // 保存订单
    setOrdNumber: function(e) {
      this.num++;
      if (this.num > 1) {
        e.preventDefault();
        return;
      }
      if (this.men_id) {
        console.log(11)
        localStorage.setItem("ord_number", this.timestamp);
        return true;
      }
      if (!this.men_id) {
        clearInterval(this.setInt);
        var that = this;
        MessageBox.confirm("未登录,无法下单,请到个人中心登陆?").then(action => {
          that.$router.push({ name: "personalCenter" });
        });
      }
      e.preventDefault();
    },
    // 获取时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var fen = date.getMinutes();
      if (fen >= 0 && fen <= 9) {
        fen = "0" + fen;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        fen;
      return currentdate;
    },
    //获取时间戳
    getTimeStamp() {
      return new Date().getTime();
    },
    //选择方式
    selectServerType(index) {
      this.serverType = index;
      if (this.orderMessage.type == "快速提问") {
        if (this.serverType == 2) {
          this.relPrice = this.orderMessage.fast_phone;
        } else {
          this.relPrice = this.orderMessage.fast_text;
        }
      }
    }
    //web支付
    // doSure() {
    //   this.currentdate = this.getNowFormatDate();
    //   this.timestamp = this.getTimeStamp();
    //   var order = JSON.parse(localStorage.getItem("orderMessage"));
    //   if (order.type == "快速提问") {
    //     this.serverType = 3;
    //     this.orderMessage = order;
    //     this.relPrice = this.orderMessage.fast_phone;
    //     this.classifyId = this.orderMessage.classifyId;
    //     this.leftShow = "测算类型";
    //     this.rightShow = this.orderMessage.className;
    //     this.ord_type = 2;
    //     this.treatment_type = 1;
    //     this.gre_id = order.gre_id;
    //     this.question = order.customProblem;
    //   } else if (order.type == "找大师") {
    //     this.orderMessage = order;
    //     this.relPrice = this.orderMessage.price;
    //     this.leftShow = "测算类型";
    //     this.rightShow = this.orderMessage.name;
    //     this.classifyId = this.orderMessage.classifyId;
    //     this.ord_type = 1;
    //     this.gre_id = order.gre_id;
    //     this.type_id = order.serve_id;
    //     if (order.serverType == "预约电话") {
    //       this.treatment_type = 2;
    //       this.allow_phone = this.$store.state.useMessage.phone;
    //     } else {
    //       this.treatment_type = 1;
    //     }
    //   } else if (order.type == "话题快测") {
    //     this.orderMessage = order;
    //     this.relPrice = this.orderMessage.price;
    //     this.leftShow = "话题名称";
    //     this.rightShow = this.orderMessage.title;
    //     this.classifyId = this.orderMessage.cate_id;
    //     this.ord_type = 0;
    //     this.type_id = order.topicId;
    //     this.treatment_type = 0;
    //   } else if ((order.type = "快捷电话")) {
    //     this.orderMessage = order;
    //     this.relPrice = this.orderMessage.price;
    //     this.leftShow = "快捷电话";
    //     this.rightShow = this.orderMessage.name;
    //     this.classifyId = this.orderMessage.classifyId;
    //     this.ord_type = 3;
    //     this.treatment_type = 2;
    //     this.allow_phone = order.phone;
    //   }
    //   var postObj = {
    //     cate_id: this.classifyId,
    //     mem_id: this.men_id,
    //     ord_type: this.ord_type,
    //     ord_number: this.timestamp,
    //     treatment_type: this.treatment_type,
    //     allow_phone: this.allow_phone,
    //     type_id: this.type_id,
    //     gre_id: this.gre_id,
    //     question: this.question,
    //     token: this.token
    //   };
    //   console.log(postObj);
    //   this.$http.post("http://kc.foodjars.top/api/wap_pay",postObj)
    //   .then(res=>{
    //     console.log(res);
    //   });
    // }
  },
  created() {
    this.currentdate = this.getNowFormatDate();
    this.timestamp = this.getTimeStamp();
    var order = JSON.parse(localStorage.getItem("orderMessage"));
    console.log(order);
    if (order.type === "快速提问") {
      this.serverType = 3;
      this.orderMessage = order;
      this.relPrice = this.orderMessage.fast_text;
      this.classifyId = this.orderMessage.classifyId;
      this.leftShow = "测算类型";
      this.rightShow = this.orderMessage.className;
      this.ord_type = 2;
      this.treatment_type = 1;
      this.gre_id = order.gre_id;
      this.question = order.customProblem;
    } else if (order.type === "找大师") {
      this.orderMessage = order;
      this.relPrice = this.orderMessage.price;
      this.leftShow = "大师名称";
      this.rightShow = this.orderMessage.name;
      this.classifyId = this.orderMessage.classifyId;
      this.ord_type = 1;
      this.gre_id = order.gre_id;
      this.type_id = order.serve_id;
      if (order.serverType == "预约电话") {
        this.treatment_type = 2;
        this.allow_phone = this.$store.state.useMessage.phone;
      } else {
        this.treatment_type = 1;
      }
    } else if (order.type === "话题快测") {
      this.orderMessage = order;
      this.relPrice = this.orderMessage.price;
      this.leftShow = "话题名称";
      this.rightShow = this.orderMessage.title;
      this.classifyId = this.orderMessage.cate_id;
      this.ord_type = 0;
      this.type_id = order.topicId;
      this.treatment_type = 0;
    } else if (order.type === "快捷电话") {
      this.orderMessage = order;
      this.relPrice = this.orderMessage.price;
      this.leftShow = "快捷电话";
      this.rightShow = this.orderMessage.name;
      this.classifyId = this.orderMessage.classifyId;
      this.ord_type = 3;
      this.treatment_type = 2;
      this.allow_phone = order.phone;
    }
  },
  mounted() {
    if (this.liulangqi == 2) {
      this.setInt = setInterval(() => {
        this.$http
          .post("order_number", {
            ord_number: localStorage.getItem("ord_number"),
            token: this.$store.state.useMessage.token
          })
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.status != 0) {
                clearInterval(this.setInt);
                this.$router.push({
                  name: "paySuccess",
                  query: { ord_id: res.data.data.ord_id }
                });
              }
            }
          });
      }, 2000);
    }
    var that = this;
    if (window.history && window.history.pushState) {
      window.addEventListener("popstate", function() {
        clearInterval(that.setInt);
      });
    }
  },
  // activated() {

  // },
  beforeDestroy() {
    // clearInterval(this.setInt)
  }
};
</script>