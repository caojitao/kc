<template>
    <div class="paysuccess">
        <div class="paysuccess-top">
            <div class="paysuccess-img"><img src="../assets/sucess.png" alt="">
            </div>
            <div class="paysuccess-text">
                <div class="paysuccess-text-top">订单支付成功！</div>
                <div class="paysuccess-text-bottom">该订单已生成，请点击下一步添加或者选择您的八字信息
                </div>
            </div>
        </div>
        <a href="#/selectArchives" class="quickquestion-btn">
            <div>
                下一步
            </div>
        </a>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ord_id: this.$route.query.ord_id,
      liulangqi: localStorage.getItem("liulangqi")
    };
  },
  methods: {},
  created() {
    if (this.liulangqi == 2) {
      localStorage.removeItem("ord_number");
    }
  },
  mounted() {}
};
</script>

