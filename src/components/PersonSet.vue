<template>
  <div class="creatArchives">
    <div class="creatArchives-top">
      <div>
        <img :src="src" alt />
      </div>
      <div class="creatArchives-input">
        <input type="file" id="file" @change="getFile" />
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
          <input @change="sexBtn(1)" type="radio" id="nan" name="sex" value="1" :checked="sex===1" />
          <label for="nan" class="nan">男</label>
          <input @change="sexBtn(2)" type="radio" id="nv" name="sex" value="2" :checked="sex===2" />
          <label for="nv">女</label>
        </div>
      </div>
      <div @click="openPicker">
        <div>出生日期</div>
        <div>
          <div class="weui-cells vux-no-group-title">
            <div class="vux-datetime weui-cell weui-cell_access" id="vux-datetime-aajxt">
              <div class="weui-cell__ft vux-cell-primary vux-datetime-value">
                <span class="vux-cell-value">{{birthdateValue}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div @click="addressPicker">
        <div>所在地</div>
        <div>
          <div>
            <div class="weui-cells vux-no-group-title">
              <div class="vux-cell-box">
                <div class="weui-cell vux-tap-active weui-cell_access">
                  <div class="weui-cell__hd">
                  </div>
                  <div class="vux-cell-primary vux-popup-picker-select-box">
                    <div class="vux-popup-picker-select" style="text-align: right;">
                      <span class="vux-popup-picker-value vux-cell-value">{{addressValue}}</span>
                    </div>
                  </div>
                  <div class="weui-cell__ft"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>手机号</div>
        <div>
          <input type="text" placeholder="请输入你的电话" class="shu" v-model="phone" />
          <span class="gen" @click="doEditPhone">更改</span>
        </div>
      </div>
      <div class="phone-input">
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button class="phone-input-code">获取验证码</button>
      </div>
    </div>
    <div class="quickquestion-btn">
      <div @click="modifyMessage">完成</div>
    </div>

    <mt-datetime-picker @confirm="handleConfirm" year-format="{value}" month-format="{value}" date-format="{value}" hour-format="{value}" ref="picker" type="datetime" v-model="pickerValue">
    </mt-datetime-picker>
    <div class="mask" v-if="maskFlag">
      <div class="address-box">
        <div class="a-btn">
          <div class="btn" @click="addressCancal">取消</div>
          <div class="btn" @click="addressSure">确认</div>
        </div>
        <div class="location_container">
          <mt-picker :slots="myAddressSlots" @change="onAddressChange"></mt-picker>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { DatetimePicker, MessageBox, Toast, Picker } from "mint-ui";

import {
  city,
  privinceList,
  cityList,
  districtList
} from "@/static/js/address";
import moment from "moment";
export default {
  components: {
    mtDatetimePicker: DatetimePicker,
    mtPicker: Picker
  },

  data() {
    return {
      pickerValue: "",
      maskFlag: false,

      src:
        "http://kccdn.ywhwl.com/img/yqpWrTTVVo7ReytWmFhsemzbS4U5KPA3FjKDLlbW.png", //先设置一个默认图片
      birthdate: "2018-10-25 10",
      birthdateValue: "",
      address: ["110000", "110100", "110101"],
      addressValue: "",
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
      disabled: false,

      city,
      privinceList,
      cityList,
      districtList,

      myprivinceList: [], //省的数组
      mycityList: [], //省对应城市的数组
      mydistrictList: [], //区或者县的数组
      areapicker: "",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: privinceList, //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: cityList,
          className: "slot3",
          textAlign: "center"
        },
        {
          pider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: districtList,
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressPrivince: "", //最后选中的省或直辖市
      myAddressCity: "", //最后选中的城市
      myAddressDistrict: "" //最后选中的区或者县
    };
  },
  watch: {
    myAddressPrivince(oldval, newval) {
      //省数据变化后，更新市的显示数据
      this.areapicker.setSlotValues(2, this.mycityList);
      this.areapicker.setSlotValue(2, this.mycityList[0]);
      console.log("选中的省是" + this.myAddressPrivince);
    },
    myAddressCity(oldval, newval) {
      //城市的值改变后，重置区县的数据
      this.areapicker.setSlotValues(4, this.mydistrictList);
      this.areapicker.setSlotValue(4, this.mydistrictList[0]);
      console.log("选中的市是" + this.myAddressCity);
    },
    myAddressDistrict(oldval, newval) {
      console.log("选中的区是" + this.myAddressDistrict);
    }
  },

  methods: {
    onAddressChange: function(picker, values) {
      this.areapicker = picker;
      this.mycityList = [];
      this.mydistrictList = [];
      var chooseList = city.filter(function(item) {
        return item.name == values[0];
      });
      if (chooseList[0].sub) {
        for (var item of chooseList[0].sub) {
          this.mycityList.push(item.name);
        }
        //获取非直辖市数据
        if (chooseList[0].sub.length > 1) {
          var choosedisList = [];
          if (this.mycityList.indexOf(values[2]) > -1 && values[2] != "其他") {
            choosedisList = chooseList[0].sub.filter(function(item) {
              return item.name == values[2];
            });
            for (var item of choosedisList[0].sub) {
              this.mydistrictList.push(item.name);
            }
          } else {
            this.mydistrictList = [];
          }
        } else {
          //获取直辖市数据
          for (var item of chooseList[0].sub[0].sub) {
            this.mydistrictList.push(item.name);
          }
        }
      }
      this.myAddressPrivince = values[0];
      this.myAddressCity = values[2];
      this.myAddressDistrict = values[4];

      console.log(this.myAddressPrivince);
      console.log(this.myAddressCity);
      console.log(this.myAddressDistrict);
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm() {
      if (this.pickerValue) {
        this.birthdate = moment(this.pickerValue).format("YYYY-MM-DD HH");
        MessageBox.confirm("阳历  " + this.birthdate + "时")
          .then(action => {
            this.birthdateValue = this.birthdate + "时";
          })
          .catch(() => {
            Toast({
              message: "请选择您的阳历生日",
              position: "bottom",
              duration: 2000
            });
          });
      } else {
        Toast({
          message: "请选择您的阳历生日",
          position: "bottom",
          duration: 2000
        });
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
    },
    doEditPhone() {
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
        .post("edit_phone", {
          phone: this.phone,
          third_id: this.$store.state.useMessage.third_id,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$store.commit("upStatePhone", this.phone);
            Toast({
              message: "更改成功",
              position: "bottom",
              duration: 2000
            });
          }
        });
    },

    getFile(e) {
      console.log(e);
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

    modifyMessage() {
      if (!this.name) {
        Toast({
          message: "请输入名字",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      if (!this.birthdateValue) {
        Toast({
          message: "请选择您的阳历生日",
          position: "bottom",
          duration: 2000
        });
        return;
      }

      var provinceValue = JSON.stringify({
        key: this.address["0"],
        value: this.myAddressPrivince
      });
      var cityValue = JSON.stringify({
        key: this.address["1"],
        value: this.myAddressCity
      });
      var districtValue = JSON.stringify({
        key: this.address["2"],
        value: this.myAddressDistrict
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

          Toast({
            message: "设置成功",
            position: "bottom",
            duration: 2000
          });

          setTimeout(() => {
            that.$router.go(-1);
          }, 1000);
        });
    },

    addressPicker() {
      this.maskFlag = true;
    },
    addressCancal() {
      this.maskFlag = false;
    },
    addressSure() {
      console.log(this.myAddressPrivince);
      console.log(this.myAddressCity);
      console.log(this.myAddressDistrict);
      this.maskFlag = false;
      this.addressValue =
        this.myAddressPrivince + this.myAddressCity + this.myAddressDistrict;
    }
  },
  created() {
    if (this.$store.state.useMessage.birthday) {
      this.birthdateValue = this.$store.state.useMessage.birthday;
      this.birthday = this.$store.state.useMessage.birthday;
      // this.birthdate = birthday.substring(0, birthday.length - 1);
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

      this.address.push(JSON.parse(this.$store.state.useMessage.province).key);
      this.address.push(JSON.parse(this.$store.state.useMessage.city).key);
      this.address.push(JSON.parse(this.$store.state.useMessage.district).key);

      this.myAddressPrivince = JSON.parse(
        this.$store.state.useMessage.province
      ).value;
      this.myAddressCity = JSON.parse(this.$store.state.useMessage.city).value;
      this.myAddressDistrict = JSON.parse(
        this.$store.state.useMessage.district
      ).value;
      this.addressValue =
        this.myAddressPrivince + this.myAddressCity + this.myAddressDistrict;
    }
    if (this.$store.state.useMessage.gender) {
      this.sex = this.$store.state.useMessage.gender;
    }
    if (this.$store.state.useMessage.avatarUrl) {
      this.src = this.$store.state.useMessage.avatarUrl;
    }
  },

  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
    });
  }
};
</script>

<style scoped lang="less">
.showPicker {
  display: block !important;
}
.hidePicker {
  display: none !important;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .address-box {
    position: absolute;
    bottom: 0px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 3px 10px 0 rgba(27, 27, 78, 0.08);

    .a-btn {
      display: flex;
      justify-content: space-between;
      border-bottom: solid 1px #eaeaea;
      .btn {
        display: inline-block;
        width: 50%;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #26a2ff;
      }
    }
  }
  .location_container {
    height: 220px;
  }
}
</style>