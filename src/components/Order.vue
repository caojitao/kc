<template>
    <div class="order" ref="orderBox">
        <div class="order-nav">
            <div class="select">未完成</div>
            <div class="">已完成</div>
        </div>
        <div class="order-unfinished">
            <div class="order-list" v-for="(item,index) in orderNofinshedList" :key="index">
                <div class="order-list-top">
                    <div>{{item.order_type_name}}</div>
                    <div>待答复</div>
                </div>
                <div class="delete">
                    <div class="slider" ref="remove" @touchstart="(e)=>touchStart(e,item.order_id)" @touchmove="(e)=>touchMove(e,item.order_id)" @touchend="(e)=>touchEnd(e,item.order_id)">
                        <div :class="id===item.order_id?'content deleteSlider':'content'">
                            <div class="order-list-center">
                                <div class="order-list-center-img">
                                    <img src="../assets/o1.png" v-if="item.ord_type===1">
                                    <img src="../assets/o2.png" v-if="item.ord_type===0">
                                </div>
                                <div class="order-list-center-text">
                                    <div class="order-list-center-text-title">{{item.show_title}}</div>
                                    <div class="order-list-center-text-type">{{item.link_cate_table.name}}</div>
                                    <div class="order-list-center-text-num">
                                        <span>{{item.created_at}}</span>
                                        <span>￥{{item.ord_price}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="remove" @click="del(item.order_id)">
                            <div class="removebg">
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-list-bottom">
                    <div class="order-list-bottom-btn">
                        <a :href='"#/orderDetail?id="+item.order_id' class="order-list-bottom-btn-right" v-if="item.bazi_id">查看详情</a>
                        <a :href='"#/selectArchives?ord_id"+item.order_id' class="order-list-bottom-btn-right" v-if="!item.bazi_id">填写八字</a>
                    </div>
                </div>
            </div>
        </div>
        <!---->
    </div>
</template>
<script>
export default {
  data() {
    return {
      navValue: 1,
      pageId: 0,
      orderFinshedList: [],
      orderNofinshedList: [],
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0, //移动距离
      deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
      id: -1
    };
  },
  methods: {
    touchStart(ev, id) {
      console.log(ev);
      // this.id = id;
      // console.log(this.id);
      ev = ev || event;
      //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

      if (ev.touches.length == 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev, id) {
      console.log(id);
      ev = ev || event;
      //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      console.log(this.$refs);
      let wd = this.$refs.remove.offsetWidth;
      console.log(ev);
      if (ev.touches.length == 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;

        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        console.log(this.disX);
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX == 0) {
          this.id = -1;
          this.deleteSlider = "transform:translateX(0px)";
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          console.log(111);
          this.id = id;
          //具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = "transform:translateX(-" + this.disX * 5 + "px)";

          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      let wd = this.$refs.remove.offsetWidth;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;

        this.disX = this.startX - endX;
        console.log(this.disX);
        //如果距离小于删除按钮一半,强行回到起点

        if (this.disX * 5 < wd / 2) {
          this.deleteSlider = "transform:translateX(0px)";
          this.id = -1;
        } else {
          //大于一半 滑动到最大值
          this.deleteSlider = "transform:translateX(-" + wd + "px)";
        }
      }
    },
    // 左滑删除
    del(id) {
      console.log(id);
      var that = this;
      MessageBox.confirm("您确认要删除吗")
        .then(action => {
          that.$http
            .post("false_del_order", {
              ord_id: id,
              token: that.$store.state.useMessage.token
            })
            .then(res => {
              if (res.data.code == 200) {
                that.$vux.alert.show({
                  content: "删除成功"
                });
              }
              if (that.navValue == 1) {
                that.orderNofinshedList = that.orderNofinshedList.filter(
                  item => {
                    return item.order_id != id;
                  }
                );
              } else {
                that.orderFinshedList = that.orderFinshedList.filter(item => {
                  return item.order_id != id;
                });
              }
            });
        })
        .catch(() => {});
    },
    toggleNav(i) {
      this.navValue = i;
      this.pageId = 0;
      this.orderFinshedList = [];
      this.orderNofinshedList = [];

      if (this.navValue == 1) {
        this.getNoFinshedOrder(
          this.$store.state.useMessage.mem_id,
          this.pageId,
          this.$store.state.useMessage.token
        );
      } else {
        this.getFinshedOrder(
          this.$store.state.useMessage.mem_id,
          this.pageId,
          this.$store.state.useMessage.token
        );
      }
    },

    // 获取完成的订单
    getFinshedOrder(mem_id, PageId, token) {
      this.$http
        .post("order_list", {
          mem_id: mem_id,
          genre: " reply",
          PageId: PageId,
          token: token
        })
        .then(res => {
          if (res.data.code == 200) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.orderFinshedList.push(element);
            });
          }
        });
    },

    // 获取未完成的订单
    getNoFinshedOrder(men_id, PageId, token) {
      this.$http
        .post("order_list", {
          mem_id: men_id,
          genre: "not_reply",
          PageId: PageId,
          token: token
        })
        .then(res => {
          if (res.data.code == 200) {
            var arr = res.data.data;
            arr.forEach(element => {
              this.orderNofinshedList.push(element);
            });
          }
        });
    }
  },
  created() {
    this.getNoFinshedOrder(
      this.$store.state.useMessage.mem_id,
      this.pageId,
      this.$store.state.useMessage.token
    );

    this.getFinshedOrder(
      this.$store.state.useMessage.mem_id,
      this.pageId,
      this.$store.state.useMessage.token
    );
  },
  mounted() {
    var that = this;
    var box = that.$refs.orderBox;
    // 监听这个dom的scroll事件
    box.addEventListener(
      "scroll",
      () => {
        if (box.offsetHeight + box.scrollTop + 1 > box.scrollHeight) {
          if (that.navValue == 1) {
            that.pageId++;
            that.getNoFinshedOrder(
              that.$store.state.useMessage.mem_id,
              that.pageId,
              that.$store.state.useMessage.token
            );
          } else {
            that.pageId++;
            that.getFinshedOrder(
              that.$store.state.useMessage.mem_id,
              that.pageId,
              that.$store.state.useMessage.token
            );
          }
        }
      },
      false
    );
  }
};
</script>

