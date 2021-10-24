<template>
  <div class="personarchives">
    <div class="selectarchives-lists">
      <div class="selectarchives-list" v-for="(item,index) in archivesList" :key="index">
        <div class="selectarchives-list-left">
          <div class="selectarchives-list-left-img"><img src="../assets/wyt.png" alt=""></div>
          <div class="selectarchives-list-left-text">
            <div>{{item.name}}
              <span class="sex">{{item.gender===1?'男':'女'}}</span>
            </div>
            <div>
              {{item.birthday}}时
            </div>
          </div>
        </div>
        <div class="selectarchives-list-right">
          <div>
            <i v-if="!item.is_defult" class="weui-icon weui_icon_circle weui-icon-circle" @click="setMore(item.id)"></i>
            <i v-if="item.is_defult" class="weui-icon weui_icon_success weui-icon-success"></i>设为默认档案
          </div>
          <div class="selectarchives-list-right-btn">
            <div class="btn" @click="delArchives(item.id,item.is_defult)">删除档案</div>
            <div class="btn cha" @click="reArchivesDetail(item.id)">查看详情</div>
          </div>
        </div>
      </div>

    </div>
    <div class="selectarchives-add">
      添加新档案
    </div>
  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";

export default {
  data() {
    return {
      archivesList: [],
      selectId: ""
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id;
    }
  },
  methods: {
    reArchivesDetail(i) {
      this.$router.push({
        name: "archivesDetail",
        query: {
          id: i
        }
      });
    },
    reCreatArchives(i) {
      this.$router.push({
        name: "creatArchives"
      });
    },

    delArchives(i, d) {
      if (d == 1) {
        Toast({
          message: "不能删除默认档案",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      var that = this;

      MessageBox.confirm("您确认要删除该档案")
        .then(action => {
          that.$http
            .post("bazi_del", {
              id: i,
              token: that.$store.state.useMessage.token
            })
            .then(res => {
              if (res.data.code == 200) {
                var arr = that.archivesList;
                that.archivesList = arr.filter(item => item.id !== i);
                Toast({
                  message: "删除成功",
                  position: "bottom",
                  duration: 2000
                });
              }
            });
        })
        .catch(() => {});
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
            Toast({
              message: "暂无档案",
              position: "bottom",
              duration: 2000
            });
          }
        });
    },

    setMore(i) {
      this.selectId = i;
      this.$http
        .post("bazi_default", {
          mem_id: this.$store.state.useMessage.mem_id,
          id: i,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          Toast({
            message: "设置成功",
            position: "bottom",
            duration: 2000
          });
          this.getArchives();
        });
    }
  },
  created() {
    this.getArchives();
  }
};
</script>

