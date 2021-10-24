<template>
    <div class="todayfortune">
        <div class="todayfortune-date">
            <div class="todayfortune-date-top">
                <img :src="item" v-for="(item,index) in yearImg" :key="index">
            </div>
            <div class="todayfortune-date-bottom">
                <div class="todayfortune-date-bottom-day">

                    <img :src="item" v-for="(item,index) in riImg" :key="index">
                </div>
                <div class="todayfortune-date-bottom-xie"></div>
                <div class="todayfortune-date-bottom-nong">
                    <div class="todayfortune-date-bottom-nong-date">
                        <img :src="item" v-for="(item,index) in noImg" :key="index"></div>
                    <div class="todayfortune-date-bottom-nong-xing">
                        <img :src="xingQiImg" alt=""></div>
                    <div class="todayfortune-date-bottom-jie">
                        <span>{{huangliData.yinli_jieri}}</span>
                    </div>
                </div>
            </div>
            <div class="imgone">
                <img src="../assets/x4.png" alt="">
            </div>
            <div class="imgTwo"><img src="../assets/x3.png" alt=""></div>
        </div>
        <div class="todayfortune-chen">
            <div>
                <span>{{huangliData.hungli['nian']}} |</span>
                <span>{{huangliData.hungli['yue']}} |</span>
                <span>{{huangliData.hungli['ri']}} </span>
            </div>
        </div>
        <div class="todayfortune-wu">
            <div class="todayfortune-wu-text">
                <div>
                    <span>五行:</span>
                    <span>{{huangliData.wuxing}}</span>
                </div>
                <div>
                    <span>九星:</span>
                    <span>{{huangliData.jiuxing}}</span>
                </div>
                <div>
                    <span>星宿:</span>
                    <span>{{huangliData.xingxiu}}</span>
                </div>
            </div>
            <div class="todayfortune-wu-text">
                <div>
                    <span>八卦:</span>
                    <span>{{huangliData.bagua}}</span>
                </div>
                <div>
                    <span>建星:</span>
                    <span>{{huangliData.jianxing}}</span>
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
        </div>
        <div class="todayfortune-yj">
            <div class="todayfortune-yj-y">
                <div class="todayfortune-yj-y-left">
                    <div class="todayfortune-yj-y-left-img"><img src="../assets/y.png" alt=""></div>
                </div>
                <div class="todayfortune-yj-y-right">
                    <div class="todayfortune-yj-y-right-list" v-for="(item,index) in huangliData.yiji['yi']" :key="index">
                        <div class="todayfortune-yj-y-right-f">【</div>
                        <div>{{item}}</div>
                        <div class="todayfortune-yj-y-right-f">】</div>
                    </div>
                </div>
            </div>
            <div class="todayfortune-yj-j">
                <div class="todayfortune-yj-y-left">
                    <div class="todayfortune-yj-y-left-img"><img src="../assets/j.png" alt="">
                        <div class="todayfortune-yj-y-left-poimg"><img src="../assets/x.png" alt=""></div>
                    </div>
                </div>
                <div class="todayfortune-yj-y-right">
                    <div class="todayfortune-yj-y-right-list" v-for="(item,index) in huangliData.yiji['ji']" :key="index">
                        <div class="todayfortune-yj-y-right-f">【</div>
                        <div>{{item}}</div>
                        <div class="todayfortune-yj-y-right-f">】</div>
                    </div>
                </div>
            </div>
            <div class="todayfortune-yj-img"><img src="../assets/x2.png" alt=""></div>
        </div>
        <div class="todayfortune-chenyj">
            <div class="todayfortune-chenyj-left"><img src="../assets/scyj.png" alt=""></div>
            <div class="todayfortune-chenyj-right">
                <div class="todayfortune-chenyj-right-list" v-for="(item,index) in huangliData.shenjiang" :key="index">
                    <div>{{item[0]}}</div>
                    <div class="heng">|</div>
                    <div class="pb">{{item[1]}}</div>
                    <div class="heng">|</div>
                    <div>{{item[2]}}</div>
                </div>

            </div>
        </div>
        <div class="todayfortune-shen">
            <div class="todayfortune-shen-lists">
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/xs.png" alt=""></div>
                    <div>{{huangliData.xishen}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/fs.png" alt=""></div>
                    <div>{{huangliData.fushen}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/cs.png" alt=""></div>
                    <div>{{huangliData.caishen}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/yg.png" alt=""></div>
                    <div>{{huangliData.yanggui}}</div>
                </div>
            </div>
            <div class="todayfortune-shen-lists">
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/xg.png" alt=""></div>
                    <div>{{huangliData.yingui}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/xw.png" alt=""></div>
                    <div>{{huangliData.xiongwei}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/sm.png" alt=""></div>
                    <div>{{huangliData.shengmen}}</div>
                </div>
                <div class="todayfortune-shen-list">
                    <div><img src="../assets/sim.png" alt=""></div>
                    <div>{{huangliData.simen}}</div>
                </div>
            </div>
        </div>
        <div class="todayfortune-yun">
            <div class="todayfortune-yun-title"><img src="../assets/zhys.png" alt=""></div>
            <div class="todayfortune-yun-text" v-html="huangliData.content">
            </div>
        </div>
    </div>
</template>


<script>
import zooe from "../assets/0.png";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";
import five from "../assets/5.png";
import six from "../assets/6.png";
import serve from "../assets/7.png";
import eight from "../assets/8.png";
import nine from "../assets/9.png";
import xzooe from "../assets/00.png";
import xone from "../assets/11.png";
import xtwo from "../assets/22.png";
import xthree from "../assets/33.png";
import xfour from "../assets/44.png";
import xfive from "../assets/55.png";
import xsix from "../assets/66.png";
import xserve from "../assets/77.png";
import xeight from "../assets/88.png";
import xnine from "../assets/99.png";
import xingqiyi from "../assets/星期一.png";
import xingqie from "../assets/星期二.png";
import xingqisan from "../assets/星期三.png";
import xingqisi from "../assets/星期四.png";
import xingqiwu from "../assets/星期五.png";
import xingqiliu from "../assets/星期六.png";
import xingqiri from "../assets/星期日.png";
import done from "../assets/一.png";
import dtwo from "../assets/二.png";
import dthree from "../assets/三.png";
import dfour from "../assets/四.png";
import dfive from "../assets/五.png";
import dsix from "../assets/六.png";
import dserve from "../assets/七.png";
import deight from "../assets/八.png";
import dnine from "../assets/九.png";
import dten from "../assets/十.png";
import dgan from "../assets/廿.png";
import nian from "../assets/年.png";
import yue from "../assets/月.png";
import chu from "../assets/初.png";
export default {
  data() {
    return {
      zooe: zooe,
      one: one,
      two: two,
      three: three,
      four: four,
      five: five,
      six: six,
      serve: serve,
      eight: eight,
      nine: nine,
      xzooe: xzooe,
      xone: xone,
      xtwo: xtwo,
      xthree: xthree,
      xfour: xfour,
      xfive: xfive,
      xsix: xsix,
      xserve: xserve,
      xeight: xeight,
      xnine: xnine,
      done: done,
      dtwo: dtwo,
      dthree: dthree,
      dfour: dfour,
      dfive: dfive,
      dsix: dsix,
      dserve: dserve,
      deight: deight,
      dnine: dnine,
      dten: dten,
      dgan: dgan,
      chu: chu,
      nian: nian,
      yue: yue,
      xingqiyi: xingqiyi,
      xingqie: xingqie,
      xingqisan: xingqisan,
      xingqisi: xingqisi,
      xingqiwu: xingqiwu,
      xingqiliu: xingqiliu,
      xingqiri: xingqiri,
      xingQiImg: "", //星期图片
      yearImg: [],
      riImg: [],
      noImg: [],
      huangliData: {},
      yanlijieri: [],
      nonglijieri: []
    };
  },
  methods: {
    //  获取时间
    getData() {
      var now = new Date();
      var year = String(now.getFullYear()); //得到年份
      var month = now.getMonth() + 1; //得到月份
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      month = month >= 10 ? month + "" : "0" + month;
      date = date >= 10 ? date + "" : "0" + date;

      if (day === 1) {
        this.xingQiImg = this.xingqiyi;
      } else if (day === 2) {
        this.xingQiImg = this.xingqie;
      } else if (day === 3) {
        this.xingQiImg = this.xingqisan;
      } else if (day === 4) {
        this.xingQiImg = this.xingqisi;
      } else if (day === 5) {
        this.xingQiImg = this.xingqiwu;
      } else if (day === 6) {
        this.xingQiImg = this.xingqiliu;
      } else {
        this.xingQiImg = this.xingqiri;
      }

      for (var i = 0; i < year.length; i++) {
        this.yearImg.push(this.setYearImg(year[i]));
      }
      this.yearImg.push(this.nian);
      for (var i = 0; i < month.length; i++) {
        this.yearImg.push(this.setYearImg(month[i]));
      }
      this.yearImg.push(this.yue);

      for (var i = 0; i < date.length; i++) {
        this.riImg.push(this.setRiImg(date[i]));
      }
    },
    // 获取农历
    getNoData() {
      var CalendarData = new Array(100);
      var madd = new Array(12);
      var tgString = "甲乙丙丁戊己庚辛壬癸";
      var dzString = "子丑寅卯辰巳午未申酉戌亥";
      var numString = "一二三四五六七八九十";
      var monString = "正二三四五六七八九十冬腊";
      var weekString = "日一二三四五六";
      var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
      var cYear, cMonth, cDay, TheDate;
      CalendarData = new Array(
        0xa4b,
        0x5164b,
        0x6a5,
        0x6d4,
        0x415b5,
        0x2b6,
        0x957,
        0x2092f,
        0x497,
        0x60c96,
        0xd4a,
        0xea5,
        0x50da9,
        0x5ad,
        0x2b6,
        0x3126e,
        0x92e,
        0x7192d,
        0xc95,
        0xd4a,
        0x61b4a,
        0xb55,
        0x56a,
        0x4155b,
        0x25d,
        0x92d,
        0x2192b,
        0xa95,
        0x71695,
        0x6ca,
        0xb55,
        0x50ab5,
        0x4da,
        0xa5b,
        0x30a57,
        0x52b,
        0x8152a,
        0xe95,
        0x6aa,
        0x615aa,
        0xab5,
        0x4b6,
        0x414ae,
        0xa57,
        0x526,
        0x31d26,
        0xd95,
        0x70b55,
        0x56a,
        0x96d,
        0x5095d,
        0x4ad,
        0xa4d,
        0x41a4d,
        0xd25,
        0x81aa5,
        0xb54,
        0xb6a,
        0x612da,
        0x95b,
        0x49b,
        0x41497,
        0xa4b,
        0xa164b,
        0x6a5,
        0x6d4,
        0x615b4,
        0xab6,
        0x957,
        0x5092f,
        0x497,
        0x64b,
        0x30d4a,
        0xea5,
        0x80d65,
        0x5ac,
        0xab6,
        0x5126d,
        0x92e,
        0xc96,
        0x41a95,
        0xd4a,
        0xda5,
        0x20b55,
        0x56a,
        0x7155b,
        0x25d,
        0x92d,
        0x5192b,
        0xa95,
        0xb4a,
        0x416aa,
        0xad5,
        0x90ab5,
        0x4ba,
        0xa5b,
        0x60a57,
        0x52b,
        0xa93,
        0x40e95
      );
      madd[0] = 0;
      madd[1] = 31;
      madd[2] = 59;
      madd[3] = 90;
      madd[4] = 120;
      madd[5] = 151;
      madd[6] = 181;
      madd[7] = 212;
      madd[8] = 243;
      madd[9] = 273;
      madd[10] = 304;
      madd[11] = 334;

      function GetBit(m, n) {
        return (m >> n) & 1;
      }
      function e2c() {
        TheDate =
          arguments.length != 3
            ? new Date()
            : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
          tmp += 1900;
        }
        total =
          (tmp - 1921) * 365 +
          Math.floor((tmp - 1921) / 4) +
          madd[TheDate.getMonth()] +
          TheDate.getDate() -
          38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
          total++;
        }
        for (m = 0; ; m++) {
          k = CalendarData[m] < 0xfff ? 11 : 12;
          for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
              isEnd = true;
              break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
          }
          if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
          if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
          }
        }
      }

      function GetcDateString() {
        var tmp = "";

        if (cMonth < 1) {
          tmp += monString.charAt(-cMonth - 1);
        } else {
          tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
        if (cDay % 10 != 0 || cDay == 10) {
          tmp += numString.charAt((cDay - 1) % 10);
        }
        return tmp;
      }

      function GetLunarDay(solarYear, solarMonth, solarDay) {
        solarYear = solarYear < 1900 ? 1900 + solarYear : solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
          return "";
        } else {
          solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
          e2c(solarYear, solarMonth, solarDay);
          return GetcDateString();
        }
      }

      var D = new Date();
      var yy = D.getFullYear();
      var mm = D.getMonth() + 1;
      var dd = D.getDate();
      var ww = D.getDay();
      var ss = parseInt(D.getTime() / 1000);
      if (yy < 100) yy = "19" + yy;
      var dddd = GetLunarDay(yy, mm, dd);
      return dddd;
    },
    setNoArr() {
      var dd = this.huangliData.yinli;
      for (var i = 0; i < dd.length; i++) {
        this.noImg.push(this.setNoImg(dd[i]));
      }
    },
    //设置2018年11月图片
    setYearImg(num) {
      if (num == 0) {
        return this.xzooe;
      } else if (num == 1) {
        return this.xone;
      } else if (num == 2) {
        return this.xtwo;
      } else if (num == 3) {
        return this.xthree;
      } else if (num == 4) {
        return this.xfour;
      } else if (num == 5) {
        return this.xfive;
      } else if (num == 6) {
        return this.xsix;
      } else if (num == 7) {
        return this.xserve;
      } else if (num == 8) {
        return this.xeight;
      } else if (num == 9) {
        return this.xnine;
      }
    },
    //设置25图片
    setRiImg(num) {
      if (num == 0) {
        return this.zooe;
      } else if (num == 1) {
        return this.one;
      } else if (num == 2) {
        return this.two;
      } else if (num == 3) {
        return this.three;
      } else if (num == 4) {
        return this.four;
      } else if (num == 5) {
        return this.five;
      } else if (num == 6) {
        return this.six;
      } else if (num == 7) {
        return this.serve;
      } else if (num == 8) {
        return this.eight;
      } else if (num == 9) {
        return this.nine;
      }
    },
    //设置农历日期图片
    setNoImg(num) {
      if (num == "一") {
        return this.done;
      } else if (num == "二") {
        return this.dtwo;
      } else if (num == "三") {
        return this.dthree;
      } else if (num == "四") {
        return this.dfour;
      } else if (num == "五") {
        return this.dfive;
      } else if (num == "六") {
        return this.dsix;
      } else if (num == "七") {
        return this.dserve;
      } else if (num == "八") {
        return this.deight;
      } else if (num == "九") {
        return this.dnine;
      } else if (num == "初") {
        return this.chu;
      } else if (num == "十") {
        return this.dten;
      } else if (num == "廿") {
        return this.dgan;
      } else if (num == "月") {
        return this.yue;
      }
    }
  },
  created() {
    this.getData();

    this.$http
      .post("huangli", { token: this.$store.state.useMessage.token })
      .then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.huangliData = res.data.data;
          this.setNoArr();
          //  yanlijieri:[],
          //  nonglijieri:[],
          if (this.huangliData.yangli_jieri) {
            var str = this.huangliData.yangli_jieri;
            this.yanlijieri = str.split(",");
          }
          if (this.huangliData.yinli_jieri) {
            var str = this.huangliData.yinli_jieri;
            this.nonglijieri = str.split(",");
          }
        }
      });
  }
};
</script>

