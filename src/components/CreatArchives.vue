<template>
  <div class="creatArchives">
    <div class="creatArchives-top">
      <img style="width: 100%;height: 90px;" src="../assets/da.png" alt="">
    </div>
    <div class="creatArchives-message">
      <div>
        <div>姓名</div>
        <div><input type="text" placeholder="请输入你的姓名" class="shu" v-model="name"></div>
      </div>
      <div>
        <div>性别</div>
        <div>
          <input type="radio" id="nan" name="sex" value="1" @change="sexBtn(1)" :checked="sex===1">
          <label for="nan" class="nan">男</label>
          <input type="radio" id="nv" name="sex" value="2" @change="sexBtn(2)" :checked="sex===2">
          <label for="nv">女</label>
        </div>
      </div>
      <div @click="openPicker">
        <div>出生时间</div>
        <div>
          <div>
            <div class="weui-cells vux-no-group-title">
              <a data-cancel-text="取消" data-confirm-text="确定" href="javascript:" class="vux-datetime weui-cell weui-cell_access" id="vux-datetime-63ite">
                <div>
                  <p class=""></p>
                </div>
                <div class="weui-cell__ft vux-cell-primary vux-datetime-value">
                  <span class="vux-cell-placeholder" v-if="!birthdateValue">{{birthdateValue?birthdateValue:"请选择（阳历）公历出生日期"}}</span>
                  <span class="vux-cell-placeholder" style="color:#000" v-if="birthdateValue">{{birthdateValue?birthdateValue:"请选择（阳历）公历出生日期"}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div @click="addressPicker">
        <div>出生地点</div>
        <div>
          <div>
            <div class="weui-cells vux-no-group-title">
              <div class="vux-cell-box">
                <div class="weui-cell vux-tap-active weui-cell_access">
                  <div class="weui-cell__hd">
                  </div>
                  <div class="vux-cell-primary vux-popup-picker-select-box">
                    <div class="vux-popup-picker-select" style="text-align: right;">
                      <span class="vux-popup-picker-value vux-cell-value" v-if="!addressValue">{{addressValue?addressValue:"请选择出生地点"}}</span>
                      <span class="vux-popup-picker-value vux-cell-value" style="color:#000" v-if="addressValue">{{addressValue?addressValue:"请选择出生地点"}}</span>
                    </div>
                  </div>
                  <div class="weui-cell__ft"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="quickquestion-btn">
      <div @click="addArchives">
        添加
      </div>
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
      myAddressDistrict: "", //最后选中的区或者县
      pickerValue: "",
      maskFlag: false,

      birthdate: "",
      birthdateValue: "",
      address: ["110000", "110100", "110101"],
      addressValue: "",
      showAddress: false,
      sex: 1,
      jidu: "116.416667",
      name: "",
      archiveId: ""
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
    },

    sexBtn(e) {
      this.sex = e;
      console.log(e);
    },

    change(value) {
      this.birthdateValue = this.birthdate + "时";
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

    addArchives() {
      if (this.archiveId) {
        if (!this.name) {
          Toast({
            message: "请输入名字",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        if (!this.birthdate) {
          Toast({
            message: "请选择您的阳历生日",
            position: "bottom",
            duration: 2000
          });
          return;
        }

        var areaObj = {
          key: this.address,
          value: this.addressValue
        };
        var obj = {
          id: this.archiveId,
          name: this.name,
          gender: this.sex,
          birthday: this.birthdate,
          area: JSON.stringify(areaObj),
          jingdu: this.jidu,
          token: this.$store.state.useMessage.token
        };
        this.$http.post("bazi_edit", obj).then(res => {
          if (res.data.code == 200) {
            var that = this;

            Toast({
              message: "修改成功",
              position: "bottom",
              duration: 2000
            });
            setTimeout(() => {
              that.$router.go(-1);
            }, 1000);
          }
        });
      } else {
        var areaObj = {
          key: this.address,
          value: this.addressValue
        };
        if (!this.name) {
          Toast({
            message: "请输入名字",
            position: "bottom",
            duration: 2000
          });
          return;
        }
        if (!this.birthdate) {
          Toast({
            message: "请选择您的阳历生日",
            position: "bottom",
            duration: 2000
          });

          return;
        }
        var obj = {
          mem_id: this.$store.state.useMessage.mem_id,
          name: this.name,
          gender: this.sex,
          birthday: this.birthdate,
          area: JSON.stringify(areaObj),
          jingdu: this.jidu,
          token: this.$store.state.useMessage.token
        };
        this.$http.post("bazi_add", obj).then(res => {
          if (res.data.code == 200) {
            var that = this;

            Toast({
              message: "添加成功",
              position: "bottom",
              duration: 2000
            });
            setTimeout(() => {
              that.$router.go(-1);
            }, 1000);
          }
        });
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.archiveId = this.$route.query.id;
      this.$http
        .post("bazi_details", {
          id: this.archiveId,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            this.birthdate = res.data.data.birthday;
            this.birthdateValue = res.data.data.birthday + "时";
            this.sex = res.data.data.gender;
            this.name = res.data.data.name;
            this.jidu = res.data.data.jingdu;
            var obj = JSON.parse(res.data.data.area);
            this.address = obj.key;
            this.addressValue = obj.value;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
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


