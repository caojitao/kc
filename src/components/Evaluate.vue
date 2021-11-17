<template>
  <div class="evalute">
    <div class="evalute-box">
      <div class="evalute-box-top">
        <div class="evalute-top-img"><img :src="valImg" alt=""></div>
        <div class="evalute-top-xing">
          <img v-for="(item,index) in star" :key="index" :src="starVlue>item?hongImg:huiImg" @click="toggleXing(item+1)" />
        </div>
      </div>
      <div class="evalute-box-bottom">
        <textarea v-model="textValue" name="" id="" cols="30" rows="10" placeholder="欢迎吐槽产品,您的每条意见都是我们成长的基石"></textarea>
      </div>
    </div>
    <div class="evalute-btn">
      <div class="btn" @click="evalute">提交</div>
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import hong from "../assets/hx.png";
import hui from "../assets/gx.png";
export default {
  data() {
    return {
      star: [0, 1, 2, 3, 4],
      starVlue: 5,
      hongImg: hong,
      huiImg: hui,
      textValue: "",
      valImg:
        this.$store.state.useMessage.avatarUrl ||
        "http://kccdn.ywhwl.com/img/yqpWrTTVVo7ReytWmFhsemzbS4U5KPA3FjKDLlbW.png"
    };
  },
  methods: {
    toggleXing(i) {
      this.starVlue = i;
    },
    evalute() {
      if (!this.textValue) {
        Toast({
          message: "请输入内容",
          position: "bottom",
          duration: 1000
        });

        return;
      }
      var obj = {
        mem_id: this.$store.state.useMessage.mem_id,
        ord_id: this.$route.query.id,
        star: this.starVlue,
        content: this.textValue,
        headimg:
          this.$store.state.useMessage.avatarUrl ||
          "http://kccdn.ywhwl.com/img/yqpWrTTVVo7ReytWmFhsemzbS4U5KPA3FjKDLlbW.png",
        token: this.$store.state.useMessage.token
      };
      this.$http.post("add_discuss", obj).then(res => {
        if (res.data.code == 200) {
          var that = this;
          Toast({
            message: "感谢您的评价",
            position: "bottom",
            duration: 1000
          });
          setTimeout(() => {
            that.$router.go(-1);
          }, 1000);
        }
      });
    }
  }
};
</script>

