<template>
  <div class="feedback">
    <div class="feedback-text">
      <textarea
        v-model="feedBackValue"
        name
        id
        cols="30"
        rows="10"
        placeholder="欢迎吐槽产品,您的每条意见都是我们成长的基石"
      ></textarea>
    </div>
    <div class="feedback-btn">
      <div @click="feedBack">下一步</div>
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
      feedBackValue: ""
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id;
    }
  },
  methods: {
    feedBack() {
      if (!this.feedBackValue) {
        Toast({
          message: "请输入反馈内容",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      this.$http
        .post("add_feedback", {
          mem_id: this.uid,
          content: this.feedBackValue,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.msg == "查询成功") {
            var that = this;
            Toast({
              message: "感谢您的反馈",
              position: "bottom",
              duration: 2000
            });

            setTimeout(() => {
              that.$router.go(-1);
            }, 2000);
          }
        });
    }
  }
};

// WEBPACK FOOTER //
// ./src/
</script>