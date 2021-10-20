<template>
  <div class="topic" ref="topicBox">
    <div class="topic-search">
      <input type="text" placeholder="搜索话题" v-model="inputValue" />
      <div class="search-icon" @click="searchList">
        <svg
          type="ios-search"
          size="25"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 512 512"
          class="vux-x-icon vux-x-icon-ios-search"
        >
          <path
            d="M448.3 424.7L335 311.3c20.8-26 33.3-59.1 33.3-95.1 0-84.1-68.1-152.2-152-152.2-84 0-152 68.2-152 152.2s68.1 152.2 152 152.2c36.2 0 69.4-12.7 95.5-33.8L425 448l23.3-23.3zM120.1 312.6c-25.7-25.7-39.8-59.9-39.8-96.3s14.2-70.6 39.8-96.3 59.9-40 96.2-40c36.3 0 70.5 14.2 96.2 39.9s39.8 59.9 39.8 96.3-14.2 70.6-39.8 96.3c-25.7 25.7-59.9 39.9-96.2 39.9-36.3.1-70.5-14.1-96.2-39.8z"
          />
        </svg>
      </div>
    </div>
    <div class="topic-banner">
      <img :src="bannerImg" alt />
    </div>
    <div class="topic-lists">
      <a
        @click="reTopicDetail(item)"
        class="topic-list"
        v-for="(item,index) in topicList"
        :key="index"
      >
        <div class="topic-list-img">
          <img :src="item.thumb" alt />
        </div>
        <div class="topic-list-text">
          <div class="topic-list-text-title">
            {{item.title}}
            <span class="hot" v-if="item.is_rem===1">热</span>
          </div>
          <div class="topic-list-text-num">今日{{item.virtual_people}}人已测</div>
        </div>
        <div class="topic-list-price">{{item.price}}元</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PageId: 0,
      topicList: [],
      bannerImg: "",
      inputValue: "",
      flag: false
    };
  },
  watch: {
    inputValue() {
      if (this.inputValue == "") {
        this.getTopicList(this.PageId, this.inputValue);
      }
    }
  },
  methods: {
    reTopicDetail(item) {
      this.$router.push({
        name: "topicDetail",
        query: {
          topicid: item.id
        }
      });
    },
    getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    },
    //文档的总高度
    getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    },
    getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    },

    // 获取话题列表
    getTopicList(PageId, search_name) {
      this.$http
        .post("topic_list", { PageId: PageId, search_name: search_name })
        .then(res => {
          if (res.data.data.length) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.topicList.push(element);
            });
          } else {
            // this.$vux.alert.show({
            //   content: "没有跟多话题"
            // });
          }
        });
    },
    // 搜索
    searchList() {
      // 获取话题列表
      this.PageId == 0;
      this.flag = true;
      this.topicList = [];
      this.getTopicList(this.PageId, this.inputValue);
    }
  },
  created() {
    // 获取话题列表
    this.getTopicList(this.PageId);
    //banner
    this.$http
      .post("get_carousel", { name: "话题快测列表banner" })
      .then(res => {
        if (res.data.code == 200) {
          this.bannerImg = res.data.data.picurl;
        }
      });
  },
  mounted() {
    var that = this;
    var box = that.$refs.topicBox;
    // 监听这个dom的scroll事件
    box.addEventListener(
      "scroll",
      () => {
        if (box.offsetHeight + box.scrollTop + 1 > box.scrollHeight) {
          that.PageId++;
          that.getTopicList(that.PageId);
        }
      },
      false
    );
  }
};
</script>