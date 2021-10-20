<template>
  <div class="phone" style="margin-top: 0px">
    <div class="phone-input">
      <input type="text" placeholder="请输入手机号码" v-model="phone" />
    </div>
    <div class="phone-input">
      <input placeholder="请输入密码" v-model="password" :type="!yin?'text':'password'" />
      <div class="phone-input-code">
        <span @click="rePhone">忘记密码</span>
        <div class="phone-input-forget">
          <img
            @click="reYin"
            :src="!yin?'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3OEU4ODFERDFCQjExRTg5QzgxQ0RENzYwRDhGRDMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3OEU4ODFFRDFCQjExRTg5QzgxQ0RENzYwRDhGRDMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODc4RTg4MUJEMUJCMTFFODlDODFDREQ3NjBEOEZEMzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODc4RTg4MUNEMUJCMTFFODlDODFDREQ3NjBEOEZEMzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BdzQlAAADqUlEQVR42syXWW9NURiGT08nWqSKKmpquVBTUKVRarwR1YSIKcQQ8YtcNCJIxJAG0ZjnKeZWqSGCooOhKKVoTynvlzxNVnb2PrZwYSdP0vSsvda7vnknlJeXR0I8SSJdDBcFYrwYIQaLvqIH69rFB/FSPBe14pZ4Ib6I72EOCvOMFdPFFDFGDBRR0QVfnbUmsB/vFPBelbghbv+NoASRzaalYpbIEh/FK/EM3mKZCJYaIEbCEISViEviEBZ7w0VCC7LbjxNLRZkYJprZ8IJ4KFpwg4n5wXuJiDL3ZmJNE1MklnA522O/uOcnyk9Qb1Eslot5WOqUOMvtbKOOkK6uIY6uiblihtjABfeJy6ItnqA+YoFYJ6aJ19ymQjzwcekAYiaF/8UIanPjT4RXgblsGVZfSJylcdnPfoJ6sXAT7qoWu8RphLlPMpm2CHcM5P8WG1fFYSzT6bxjF7KUfipWc+GehMfxbkslOcFoG6/nINt0O+q/eMSkitliBS4Y7fk9j4DeK8573GsXOyg+4QXLwI2iFQu2JyFqgliJmJtiC8Hb4WMZs94q1if7xM1oapTd/J2467GUXfAEbrIkKMRiJrLaxIwSiwk6y56d4mJA4Gbi1pkBYlzhtuaJaMSV7mN7XxH9CZW5FNPPUcTMpr7sJmbaAw7KwMw5ITIsh7UZAb+bqDOcaYkwx0qMCZpPGtYgpiXOISkUx+QQgpJZmxJnTQtnWgUfalqikf/siaKwXkzCWplx1ncQD7EQe8fIqnhFNJMz7ewG02KCKknPDLJnvtO9vU8rwVgfQlAD5aM14PdUOsEqius5aytRMqGSALPes5YMSfXZ5L04Ss3ojCOmk0w9xjt+Yqw9rRH5tCXrcY8TS0tLu3jJ6kAuI8ZgKmej5+AuAvETf6eRuu7zSBwRe+h9XuHptKfNVGtLpq2MJ7EkZ7Ay825jYRG36O3TOmK42PpVHWuznNZxDUH3fcRkExJWCCdTNLcRBu3eXtZGBe2ihRQyz+T5NFeb/O4wF1U47u2gnjX7uCnfaa7W+66LHbSntqBub+X8pPiGG+fRbPMDxo/mgMPdWBnHHNQ9fvwkDkONH66lmpiFy/D5RNzqDmhtiHMHtFTagXdAyyI7/3hA6w7eWuKkivZSzChb4oywdQEjbC4dfxDlxNYc+JsRNoJpX1ESGsiCyczI2VDoWCfiWCmRA5tIin8y5LtPLYOVuWwq40r3Z1CG5zPoo+cz6KbzGfTb55cAAwChIhouYFN92wAAAABJRU5ErkJggg==':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAASCAYAAAAzI3woAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3MTFEQzM5RDFCQjExRThBNjdBQTAxMDlFOEQwN0EyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3MTFEQzNBRDFCQjExRThBNjdBQTAxMDlFOEQwN0EyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODcxMURDMzdEMUJCMTFFOEE2N0FBMDEwOUU4RDA3QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODcxMURDMzhEMUJCMTFFOEE2N0FBMDEwOUU4RDA3QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz61PDq1AAACtUlEQVR42ryW60uTYRiHX9fb6DS1zMwMKiiwE6Szk3SiDxWdKMSib0X0Ifp/gn2MqD6YdCDsDEF0goIVYaWWm9OkpTS3rHTN9bvhemFI6lbqA5eT972f5/7dp2crCoVCLY7jlInb4oLodKZ3LRcnxQHR5+rPSrFKZMQnkbIX0yRmgdgm9og60WGCXogSsUWkRVbcEt+mWIz53CtOiU0iblpMUEj088JE2bM5onkKM1UqDlOqepEUl8Q1c/6MMllmjmFgzwNk6v0ki1kh9ovjZKZXNImLotWld16L86JInMBwkVgoroo2ovifNZcGbsBHtfiCGPMdcciEt6yhH4r1YjebT4u1bLpPNP+y5otdVGCnqOR5Gz3c7RnmClqMmCWUL06WDooKhL0Ubzgom4eQZWIDE2RCtoshEcOPCdso3ooPnqAZOG4UZxD2HCqILChqEHNPPOW+SuEgQ7ntPL+YJarEVvqlhvcRMh1HYB3DlKaHInbAUjado0yPqak1+zwRRmyQaM3+iPgsPooe8ZPASgiuisDKwUQ/YXIfiGGyclbsIBE/xHUTtFkc5YJsFZe5tQdIe4L+qqXZ63FaTZT2/pfwEUAgp2Q2CC1kNEy/JHh3hwDKaId9IuqS3iT90TRKjEMGminVISJfR7n6SbefnrJzZpKVAL1m99xdypq7EogKMHnW2BmXEtn0zCaK2BgNmsLOHI+IR+IGospx2EvEDYh3cZwZ48wucUW8EoPm26U5Y6R8eIJ7pJLPPpr+pvhKlCMcWkoP2a1fzKSF6ZHRK0sFerwHPj5/TyDGoZmD3ClRxnQwJ3ve/0Pc7lFsa9mb1/IVcLlZ1Kv5nuvE6d+itol7h43ZrmHvpAsq5udCmui7xrHtRlCS68CfrxO3AEFWlg5G3Kbn+zi2lrl2xry9kJ8yfwQYAEyjwzkcfXVIAAAAAElFTkSuQmCC'"
            alt
          />
        </div>
      </div>
    </div>
    <div class="phone-btn">
      <div>登录</div>
    </div>
    <div class="phone-re" @click="reSet">
      <span>注册账号</span>
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
      yin: true,
      phone: "",
      password: ""
    };
  },
  methods: {
    reYin() {
      this.yin = !this.yin;
    },
    rePhone() {
      this.$router.push({ name: "phone", query: { id: "no" } });
    },
    reSet() {
      this.$router.push({ name: "phone" });
    },
    login() {
      var liulangqi = localStorage.getItem("liulangqi");
      if (!this.phone) {
        Toast({
          message: "请输入手机号码",
          position: "bottom",
          duration: 2000
        });
        return;
      }
      if (!this.password) {
        Toast({
          message: "请输入密码",
          position: "bottom",
          duration: 2000
        });

        return;
      }
      this.$http
        .post("web_login", { phone: this.phone, password: this.password })
        .then(res => {
          if (res.data.code == "200") {
            var useMessage = res.data.data;
            localStorage.getItem("useMessage", JSON.stringify(useMessage));
            this.$store.commit("upState", useMessage);
            this.$router.go(-1);
          } else {
            var value = res.data.msg;
            Toast({
              message: value,
              position: "bottom",
              duration: 2000
            });
          }
        });
    }
  },
  created() {}
};
</script>