<template>
  <div class="quickquestion">
    <div class="quickquestion-banner">
      <img :src="bannerImg" alt />
    </div>
    <div class="quickquestion-lists">
      <!-- <div class="quickquestion-list">
        <div class="quickquestion-list-left">
          <div class="quickquestion-list-img">
            <img src="http://kccdn.ywhwl.com/img/soEFICD6lSRcjpeQUIqVJkDy3UrRgCMFiTzA3EEF.png" alt />
          </div>
          <div class="quickquestion-list-text">
            <div>情感婚恋</div>
            <div>恋爱、婚姻桃花、脱单等</div>
          </div>
        </div>
        <div class="quickquestion-list-right">
          <i class="weui-icon weui_icon_success weui-icon-success"></i>
        </div>
      </div>
      <div class="quickquestion-list">
        <div class="quickquestion-list-left">
          <div class="quickquestion-list-img">
            <img src="http://kccdn.ywhwl.com/img/PX3J3yFGSyobtyRkzClZYRNSjMAvJwBddYKIgA14.png" alt />
          </div>
          <div class="quickquestion-list-text">
            <div>事业财运</div>
            <div>职场、学业、创业、理财等</div>
          </div>
        </div>
        <div class="quickquestion-list-right">
          <i class="weui-icon weui_icon_circle weui-icon-circle"></i>
        </div>
      </div>-->
      <div
        class="quickquestion-list"
        v-for="(item,index) in tabulation"
        :key="index"
        @click="selectQuestion(item)"
      >
        <div class="quickquestion-list-left">
          <div class="quickquestion-list-img">
            <img :src="item.icon" alt />
          </div>
          <div class="quickquestion-list-text">
            <div>{{item.name}}</div>
            <div>{{item.account}}</div>
          </div>
        </div>
        <div class="quickquestion-list-right">
          <i
            :class="item.id===activeIndex?'weui-icon weui_icon_success weui-icon-success':'weui-icon weui_icon_circle weui-icon-circle'"
          ></i>
        </div>
      </div>
    </div>
    <div class="quickquestion-btn">
      <div @click="reSelectQuestion">下一步</div>
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
      activeIndex: "",
      tabulation: [], //分类列表
      bannerImg: "",
      selectClass: {}
    };
  },
  methods: {
    selectQuestion(index) {
      this.selectClass = index;
      this.activeIndex = index.id;
    },

    reSelectQuestion() {
      if (!this.activeIndex) {
        Toast({
          message: "请选择分类",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      localStorage.setItem("selectClass", JSON.stringify(this.selectClass));
      this.$router.push({
        name: "selectQuestion",
        query: { id: this.activeIndex }
      });
    }
  },
  created() {
    this.$http.post("cate_gre_list").then(res => {
      if (res.data.code == 200) {
        this.tabulation = res.data.data;
      }
    });

    this.$http.post("get_carousel", { name: "快速提问banner图" }).then(res => {
      if (res.data.code == 200) {
        this.bannerImg = res.data.data.picurl;
      }
    });
  }
};
</script>