<template>
  <div class="phone" style="margin-top: 0px">
    <div class="phone-input">
      <input type="text" placeholder="请输入手机号码" v-model="phone" />
    </div>
    <div class="phone-input">
      <input type="text" placeholder="请输入验证码" v-model="code" />
      <button class="phone-input-code" @click="getCode">{{timeNum}}</button>
    </div>
    <div class="phone-input">
      <input type="password" placeholder="请设置密码" name="1" v-model="password" />
    </div>
    <div class="phone-input">
      <input type="password" placeholder="再次输入密码" name="2" v-model="repassword" />
    </div>
    <div class="phone-btn">
      <div @click="regist">注册</div>
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
      phone: "",
      code: "",
      password: "",
      repassword: "",
      loginCode: "",
      timeNum: "获取验证码",
      currentTime: 61,
      disabled: false,
      id: ""
    };
  },
  methods: {
    regist() {
      var liulangqi = localStorage.getItem("liulangqi");
      if (liulangqi == 2) {
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
        if (!this.password) {
          Toast({
            message: "请输入密码",
            position: "bottom",
            duration: 2000
          });

          return;
        }
        if (!this.repassword) {
          Toast({
            message: "请输入确认密码",
            position: "bottom",
            duration: 2000
          });

          return;
        }
        if (this.password !== this.repassword) {
          Toast({
            message: "请输入相同的密码",
            position: "bottom",
            duration: 2000
          });

          return;
        }
        var ag_id = localStorage.getItem("ag_id");
        if (localStorage.getItem("ag_id") == "null") {
          ag_id = 0;
        }
        if (this.id) {
          this.$http
            .post("edit_paw", {
              phone: this.phone,
              password: this.repassword
            })
            .then(res => {
              if (res.data.code == "200") {
                var that = this;
                Toast({
                  message: "修改成功",
                  position: "bottom",
                  duration: 2000
                });
                setTimeout(() => {
                  that.$router.go(-1);
                }, 2000);
              }
            });
        } else {
          this.$http
            .post("web_register", {
              phone: this.phone,
              password: this.repassword,
              ag_id: ag_id
            })
            .then(res => {
              if (res.data.code == "200") {
                var that = this;

                Toast({
                  message: "注册成功",
                  position: "bottom",
                  duration: 2000
                });
                setTimeout(() => {
                  that.$router.go(-1);
                }, 2000);
              } else if ((res.data.code = "10008")) {
                var that = this;

                Toast({
                  message: "号码已经注册过",
                  position: "bottom",
                  duration: 2000
                });
              }
            });
        }
      }

      // this.$router.push({ name: "login" });
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
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
  }
};
</script>