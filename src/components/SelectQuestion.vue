<template>
  <div class="selectquestion">
    <div class="selectquestion-title">
      <div>您可能会问以下问题：</div>
      <div @click="refreshQuestion">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFERDlENzU0RDI4MzExRTg4ODA3OUZENTVCQjMzOEI4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFERDlENzU1RDI4MzExRTg4ODA3OUZENTVCQjMzOEI4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUREOUQ3NTJEMjgzMTFFODg4MDc5RkQ1NUJCMzM4QjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUREOUQ3NTNEMjgzMTFFODg4MDc5RkQ1NUJCMzM4QjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4PDiV0AAACrUlEQVR42rSXW2iPYRzHn8lmiuYY/TeRcuGszGEltrakrJxGWrhxRXLIboQWSeGOXPxv3IhdkByG5LBFtOjvP3MIcyizmzmEbeTUfJ76vnp6/df/zZ73V5+e933ew/N9n99z+L45yWTSRIzRUAnlMBUSMAS+QAc8gVtwFl5GfWn/CPdMg12wFHIzXC8QE2AJHIKbsAcafAhYByuhB27DRbgLb+CjGi+C2RJQAgvgBpyCDfCht5fnREzBXGiHtgj3FkINbNIHtil1LZlu7pehbizsh+lOXVPExo2EboOZ8BTGKCWzsgmwuT4OrbADFpq+hf3iOWq8QKkrzCRgHlyGZljjDLRc0/ewM2QxpGAknLBpDws4CIvCF4jBxk90aRB3aXCuDQuYD1vhR+jBfOMvXsNeHde6s88K+AWX1OU9zkMDjN84Cu9hvDu+gkG4XCm4BhUavfmeBXyFkzquCgsoVXkBrmtG1Bj/Ua+yLCxgisp7Kn9qlfMdwfvHBYM8EFCk8pWJNz5Bp44TgQB3un038cdnlXmBgM6Ypl5vMcJZpP6moN3JTZwxzPnIDlfAY5XFMTRq21ilVJeo7hl8cwU0qqyMQcBAzX/bywdU1xCehqe1ClZoO/YZ3fBcPTDZ8Rer7eobCGjVAmTX6J0x9EIqdD4D6iDt+oFa9cJ6bdE+ozlDXRqqXQF34JjSUucsTj7ivnNsd93d8pAtYUu2RTPCNn5FO5ePSGvXTcmq7dP5P56wW+bEOt5Jcr/lnpbgYg2+R9lM6VuNgYcwHK7CGZgYsbFRsmF5ofoHwVdnE2DkgK3aI/Ablkm59frbZa3sdB0qo2nv3Qjn9Gx92Hr9z4+JNRCb4bBs+grt42UR3tsoo+vl1+yFltKERJTKP9jzQRo379RD1oKf11IbKf4IMACGy42Qi9nB3AAAAABJRU5ErkJggg=="
          alt
        />
      </div>
    </div>
    <div class="selectquestion-lists">
      <!-- <a class="selectquestion-list">
        <div>今年适合结婚吗？</div>
        <div>
          <svg
            type="ios-checkmark-empty"
            size="30"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
            class="vux-x-icon vux-x-icon-ios-checkmark-empty"
          >
            <path
              d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"
            />
          </svg>
        </div>
      </a>
      <a class="selectquestion-list-no">
        <div>我的桃花运何时会旺？</div>
      </a>-->
      <a
        @click="selectQuestion(item.id)"
        :class="selectId===item.id?'selectquestion-list':'selectquestion-list-no'"
        v-for="(item,index) in problemlist"
        :key="index"
      >
        <div>{{item.content}}</div>
        <div v-if="selectId===item.id">
          <svg
            type="ios-checkmark-empty"
            size="30"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
            class="vux-x-icon vux-x-icon-ios-checkmark-empty"
          >
            <path
              d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"
            />
          </svg>
        </div>
      </a>
    </div>
    <div class="selectquestion-zhu">
      <div>以上没有我想问的问题，我想提问：</div>
      <div>注:仅限提出单个问题,多个问题老师会选择其中一个问题作答！</div>
    </div>
    <div class="selectquestion-textarea">
      <textarea
        v-model="customProblem"
        cols="30"
        rows="10"
        placeholder="请详细描述您的情感状态、背景信息以及具体问题。48小时内无人回答，将按支付路径全额退款。"
      ></textarea>
    </div>
    <div class="quickquestion-btn">
      <div @click="selectMaster">下一步</div>
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
      classifyId: this.$route.query.id, //分类id
      problemlist: [], //问题列表
      selectId: -1,
      customProblem: "" //自定义问题
    };
  },
  methods: {
    // 选择问题
    selectQuestion(id) {
      this.selectId = id;
      var arr = this.problemlist;
      arr.forEach(element => {
        if (element.id == id) {
          this.customProblem = element.content;
        }
      });
    },
    // 获取推荐问题
    getProblemlist() {
      this.$http
        .post("recommend_list", { cate_id: this.classifyId })
        .then(res => {
          if (res.data.code == 200) {
            this.problemlist = res.data.data;
          }
        });
    },
    //刷新问题
    refreshQuestion() {
      this.getProblemlist();
    },
    //下一步
    selectMaster() {
      if (this.selectId == -1 && !this.customProblem) {
        Toast({
          message: "请选择要提问的问题或输入自己要提问的问题",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      var selectClass = JSON.parse(localStorage.getItem("selectClass"));
      var questionObj = {
        classifyId: this.classifyId,
        selectId: this.selectId,
        customProblem: this.customProblem,
        className: selectClass.name,
        account: selectClass.account
      };
      localStorage.setItem("questionObj", JSON.stringify(questionObj));
      this.$router.push({ name: "selectMaster" });
    }
  },
  created() {
    // 获取推荐问题
    this.getProblemlist();
  }
};
</script>