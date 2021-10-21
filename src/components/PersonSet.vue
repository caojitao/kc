<template>
  <div class="creatArchives">
    <div class="creatArchives-top">
      <div>
        <img src="http://kccdn.ywhwl.com/img/yqpWrTTVVo7ReytWmFhsemzbS4U5KPA3FjKDLlbW.png" alt />
      </div>
      <div class="creatArchives-input">
        <input type="file" id="file" />
        <label for="file">上传头像</label>
      </div>
    </div>
    <div class="creatArchives-message">
      <div>
        <div>昵称</div>
        <div>
          <input type="text" placeholder="请输入你的姓名" class="shu" v-model="name" />
        </div>
      </div>
      <div>
        <div>性别</div>
        <div>
          <input @change="sexBtn" type="radio" id="nan" name="sex" value="1" :checked="sex===1" />
          <label for="nan" class="nan">男</label>
          <input @change="sexBtn" type="radio" id="nv" name="sex" value="2" :checked="sex===2" />
          <label for="nv">女</label>
        </div>
      </div>
      <div>
        <div>出生日期</div>
        <div @click="setDateTime">
          <div class="weui-cells vux-no-group-title">
            <div class="vux-datetime weui-cell weui-cell_access" id="vux-datetime-aajxt">
              <div class="weui-cell__ft vux-cell-primary vux-datetime-value">
                <span class="vux-cell-value">2018-10-25 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>所在地</div>
        <div>
          <div>
            <!---->
            <div class="weui-cells vux-no-group-title">
              <div class="vux-cell-box">
                <div class="weui-cell vux-tap-active weui-cell_access">
                  <div class="weui-cell__hd">
                    <!---->
                    <!---->
                  </div>
                  <div class="vux-cell-primary vux-popup-picker-select-box">
                    <div class="vux-popup-picker-select" style="text-align: right;">
                      <!---->
                      <!---->
                      <span class="vux-popup-picker-value vux-cell-value">北京市 市辖区 东城区</span>
                      <!---->
                    </div>
                  </div>
                  <div class="weui-cell__ft"></div>
                </div>
                <!---->
              </div>
            </div>
            <!---->
          </div>
        </div>
      </div>
      <div>
        <div>手机号</div>
        <div>
          <input type="text" placeholder="请输入你的电话" class="shu" />
          <span class="gen">更改</span>
        </div>
      </div>
      <div class="phone-input">
        <input type="text" placeholder="请输入验证码" />
        <button class="phone-input-code">获取验证码</button>
      </div>
    </div>
    <div class="quickquestion-btn">
      <div>完成</div>
    </div>
  </div>
</template>

<script>
import Group from "vux/src/components/group/index.vue";
import Datetime from "vux/src/components/datetime/index.vue";
import XAddress from "vux/src/components/x-address/index.vue";
import ChinaAddressV4Data from "vux/src/datas/china_address_v4.json";
import value2name from "vux/src/filters/value2name.js";
import Alert from "vux/src/components/alert/index.vue";

export default {
  components: {
    Group,
    Datetime,
    XAddress,
    Alert
  },

  data() {
    return {
      src:
        "http://kccdn.ywhwl.com/img/yqpWrTTVVo7ReytWmFhsemzbS4U5KPA3FjKDLlbW.png", //先设置一个默认图片
      birthdate: "2018-10-25 10",
      birthdateValue: "",
      address: ["110000", "110100", "110101"],
      addressValue: "",
      addressData: ChinaAddressV4Data,
      showAddress: false,
      sex: 1,
      phone: this.$store.state.useMessage.phone,
      name: this.$store.state.useMessage.nickName,
      fileValue: {},
      shang: false,
      files: "",
      code: "",
      loginCode: "",
      timeNum: "获取验证码",
      currentTime: 61,
      disabled: false
    };
  },
  methods: {
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
            this.$vux.alert.show({
              content: "同个号码使用次数过多"
            });
          } else {
            this.loginCode = res.data.data;
          }
        });
      } else {
        this.$vux.alert.show({
          content: "请输入手机号码"
        });
      }
    },
    doEditPhone() {
      if (!this.phone) {
        this.$vux.alert.show({
          content: "请输入手机号码"
        });
        return;
      }
      if (!this.code) {
        this.$vux.alert.show({
          content: "请输入验证码"
        });
        return;
      }
      if (this.code != this.loginCode) {
        this.$vux.alert.show({
          content: "验证码输入错误"
        });
        return;
      }
      this.$http
        .post("edit_phone", {
          phone: this.phone,
          third_id: this.$store.state.useMessage.third_id,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$store.commit("upStatePhone", this.phone);
            this.$vux.alert.show({
              content: "更改成功"
            });
          }
        });
    },

    getFile(e) {
      let _this = this;
      _this.files = e.target.files[0];
      this.shang = true;
      if (!e || !window.FileReader) return;
      let reader = new FileReader();
      reader.readAsDataURL(_this.files);
      reader.onloadend = function() {
        _this.src = this.result;
      };
    },

    sexBtn(e) {
      this.sex = e;
    },

    change(value) {},

    computeHoursFunction(date, isToday, generateRange) {
      if (isToday) {
        return generateRange(new Date().getHours(), 23);
      } else {
        return generateRange(0, 23);
      }
    },
    onShadowChange(ids, names) {
      console.log(ids, names);
      this.addressValue = names;
      this.address = ids;
    },
    logHide(str) {},
    logShow(str) {},
    confirmDate(e) {
      var that = this;
      that.$vux.confirm.show({
        content: "阳历  " + that.birthdate + "时",
        onCancel() {
          that.birthdate = "";
          that.birthdateValue = "";
          that.$vux.alert.show({
            content: "请选择您的阳历生日"
          });
        },
        onConfirm() {
          that.birthdateValue = that.birthdate + "时";
        }
      });
    },

    modifyMessage() {
      if (!this.name) {
        this.$vux.alert.show({
          content: "请输入名字"
        });
        return;
      }
      if (!this.birthdateValue) {
        this.$vux.alert.show({
          content: "请选择您的阳历生日"
        });
        return;
      }

      var provinceValue = JSON.stringify({
        key: this.address["0"],
        value: this.addressValue["0"]
      });
      var cityValue = JSON.stringify({
        key: this.address["1"],
        value: this.addressValue["1"]
      });
      var districtValue = JSON.stringify({
        key: this.address["2"],
        value: this.addressValue["2"]
      });

      var formdata = new FormData();
      if (this.files) {
        console.log(this.files);
        formdata.append("img", this.files);
      } else {
        formdata.append("src", this.src);
      }
      this.fileValue = formdata;
      this.fileValue.append("nickName", this.name);
      this.fileValue.append("birthday", this.birthdateValue);
      this.fileValue.append("province", provinceValue);
      this.fileValue.append("gender", this.sex);
      this.fileValue.append("city", cityValue);
      this.fileValue.append("district", districtValue);
      this.fileValue.append("third_id", this.$store.state.useMessage.third_id);
      this.fileValue.append("mem_id", this.$store.state.useMessage.mem_id);

      this.fileValue.append("token", this.$store.state.useMessage.token);

      this.$http
        .post("edit_member", this.fileValue, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          var arr = res.data.data;
          var obj = this.$store.state.useMessage;
          arr["mem_id"] = obj["mem_id"];
          arr["phone"] = obj["phone"];
          arr["third_id"] = obj["third_id"];
          arr["token"] = obj["token"];
          this.$store.commit("upState", arr);

          var that = this;
          that.$vux.alert.show({
            content: "设置成功",
            onHide() {
              that.$router.go(-1);
            }
          });
        });
    }
  },
  created() {
    if (this.$store.state.useMessage.birthday) {
      this.birthdateValue = this.$store.state.useMessage.birthday;
      var birthday = this.$store.state.useMessage.birthday;
      this.birthdate = birthday.substring(0, birthday.length - 1);
    }
    if (this.$store.state.useMessage.avatarUrl) {
      this.src = this.$store.state.useMessage.avatarUrl;
    }
    if (this.$store.state.useMessage.name) {
      this.src = this.$store.state.useMessage.nickName;
    }
    if (
      this.$store.state.useMessage.province &&
      this.$store.state.useMessage.city &&
      this.$store.state.useMessage.district
    ) {
      this.address = [];
      this.addressValue = [];
      this.address.push(JSON.parse(this.$store.state.useMessage.province).key);
      this.address.push(JSON.parse(this.$store.state.useMessage.city).key);
      this.address.push(JSON.parse(this.$store.state.useMessage.district).key);
      this.addressValue.push(
        JSON.parse(this.$store.state.useMessage.province).value
      );
      this.addressValue.push(
        JSON.parse(this.$store.state.useMessage.city).value
      );
      this.addressValue.push(
        JSON.parse(this.$store.state.useMessage.district).value
      );
    }
    if (this.$store.state.useMessage.gender) {
      this.sex = this.$store.state.useMessage.gender;
    }
    if (this.$store.state.useMessage.avatarUrl) {
      this.src = this.$store.state.useMessage.avatarUrl;
    }
  }
};
</script>

<style scoped>
.showPicker {
  display: block !important;
}
.hidePicker {
  display: none !important;
}
</style>