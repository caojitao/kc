<template>
    <div class="followteacher">
        <div class="teach-no" v-if="followList.length===0">
            <div class="teach-no-img"><img src="../assets/f.png" alt=""></div>
            <div class="teach-no-text">没有找到关注信息</div>
        </div>

        <div class="followteacher" v-if="followList.length>0">
            <div class="masterlist-list" v-for="(item,index) in followList" :key="index" @click="reMasterDetail(item.gre_id,item.cate_id)">
                <div class="masterlist-list-top">
                    <div class="masterlist-list-top-img"><img :src="item.headimg" alt=""></div>
                    <div class="masterlist-list-top-text">
                        <div class="masterlist-list-top-title">
                            <span>{{item.gre_name}}</span>
                            <span v-if="item.is_recommend===1">荐</span>
                        </div>
                        <div class="masterlist-list-top-label">
                            <span v-for="(itemChild,indexCild) in item.gre_tag" :key="indexCild">{{itemChild}}</span>
                           
                        </div>
                    </div>
                </div>
                <div class="masterlist-list-center">{{item.introduce}}</div>
                <div class="masterlist-list-bottom">
                    <div class="masterlist-list-bottom-number">
                        <span>已答:{{item.ord_all}}</span>
                        <span>评价:{{item.dis_all}}</span>
                    </div>
                    <div class="masterlist-list-bottom-price">已关注</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pageId: 0,
      followList: []
    };
  },
  computed: {
    uid() {
      return this.$store.state.useMessage.mem_id;
    }
  },
  methods: {
    // 获取关注大师列表
    getAlist(mem_id, pageId) {
      this.$http
        .post("get_my_attention", {
          mem_id: mem_id,
          PageId: pageId,
          token: this.$store.state.useMessage.token
        })
        .then(res => {
          var arr = res.data.data;
          if (arr) {
            arr.forEach(element => {
              this.followList.push(element);
            });
          }
        });
    },
    //跳转到大师详情页
    // query:{serve_id:item.serve_id,gre_id:item.gre_id,cate_id:queryObj.id}}
    reMasterDetail(gre_id, cate_id) {
      this.$router.push({
        name: "masterDetail",
        query: { gre_id: gre_id, cate_id: cate_id, follow: 1 }
      });
    }
  },
  created() {
    this.getAlist(this.uid, this.pageId);
  }
};
</script>



