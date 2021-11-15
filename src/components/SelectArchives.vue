<template>
  <div class="selectarchives">
    <div class="sureorder-procedure">
      <div class="sureorder-procedure-text">
        <div class="select-text select-text-one">选择问题</div>
        <div class="select-text select-text-one">确定订单</div>
        <div class="select-text select-text-one">完成支付</div>
        <div class="select-text select-text-two">选择档案</div>
        <div>等待回复</div>
      </div>
    </div>
    <div class="selectarchives-title">
      <div>选择为谁提问</div>
    </div>
    <div class="selectarchives-lists">
      <div class="selectarchives-list" v-for="(item,index) in archivesList" :key="index">
        <div class="selectarchives-list-left">
          <div class="selectarchives-list-left-img"><img src="../assets/tx.png" alt=""></div>
          <div class="selectarchives-list-left-text">
            <div>{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="sex">{{item.gender===1?'男':'女'}}</span>
            </div>
            <div>
              {{item.birthday}}时
            </div>
          </div>
        </div>
        <div class="selectarchives-list-right">
          <div v-if="selectId===item.id">
            <i class="weui-icon weui_icon_success weui-icon-success"></i>
          </div>
          <div v-if="selectId!==item.id">
            <i class="weui-icon weui_icon_circle weui-icon-circle"></i>
          </div>
          <div @click="reArchivesDetail">查看详情</div>
        </div>
      </div>

    </div>
    <div class="selectarchives-add" @click="reCreatArchives">
      添加新档案
    </div>
    <div class="quickquestion-btn">
      <div @click="doOrder">
        完成
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      archivesList: [],
      selectId: "",
      ord_id: this.$route.query.ord_id
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id;
    }
  },
  methods: {
    reCreatArchives() {
      this.$router.push({ name: "creatArchives" });
    },
    reArchivesDetail(i) {
      this.$router.push({
        name: "archivesDetail",
        query: {
          id: i
        }
      });
    },

    doOrder() {
      this.$http
        .post("order_bazi", {
          ord_id: this.ord_id,
          bazi_id: this.selectId,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            var that = this;

            Toast({
              message: "已成功",
              position: "bottom",
              duration: 1000
            });
            setTimeout(() => {
              that.$router.push({
                name: "personalCenter",
                query: { orderid: that.ord_id }
              });
            }, 1000);
          }
        });
    },

    getArchives() {
      this.$http
        .post("bazi_list", {
          mem_id: this.uid,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          if (res.data.code == 200) {
            res.data.data.forEach(element => {
              if (element.is_defult == 1) {
                this.selectId = element.id;
              }
            });
            this.archivesList = res.data.data;
          } else {
            this.$router.push({ name: "creatArchives" });
          }
        });
    },

    setMore(i) {
      this.selectId = i;
    }
  },
  created() {
    this.getArchives();
  }
};
</script>
