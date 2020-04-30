<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col></b-col>
        <b-col cols="8">
          <div class="card">
            <b-form @submit="onSubmit" @reset="onReset">
              <b-form-group label="ชื่อนิยาย: " label-for="book-name">
                <b-form-input
                  ref="name"
                  v-model="form.name"
                  required
                  placeholder="Enter Name book.."
                ></b-form-input>
              </b-form-group>

              <b-form-group label="ประเภท: " label-for="cat">
                <b-form-input
                  ref="cat"
                  v-model="form.cat"
                  type="text"
                  required
                  placeholder="Enter cat.."
                ></b-form-input>
              </b-form-group>

              <b-form-group label="โดย: " label-for="by">
                <b-form-input
                  ref="by"
                  v-model="form.by"
                  type="text"
                  required
                  placeholder="Enter By.."
                ></b-form-input>
              </b-form-group>

              <b-form-group label="เนื้อเรื่อง: " label-for="detail">
                <b-form-textarea
                 ref="detail"
                  v-model="form.detail"
                   type="text"
                  required
                  placeholder="Enter detail..."
                
                ></b-form-textarea>
              </b-form-group>

              <b-form-group label="รูป: " label-for="img">
                <input type="file" ref="img" />
              </b-form-group>

              <b-button type="submit" variant="success" class="float-right">เพิ่ม</b-button>
              <b-button type="reset" variant="danger" class="float-left">ล้าง</b-button>
            </b-form>
          </div>

          <!-- <showAlert ref="showAlert" /> -->
          <b-form-input
            class="mt-3 mb-3"
            type="text"
            required
            placeholder="Search"
            @change="search"
          ></b-form-input>

          <div class="card-header">Fiction List</div>
          <div class="card-body">
            <userTable ref="userTable" />
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import userTable from "@/components/UserTable.vue";

export default {
  components: {
    userTable
  },
  data() {
    return {
      form: {
        name: "",
        cat: "",
        by: "",
        detail: "",
        img:""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form))

      let fd = new FormData();
      fd.append("b_name", this.form.name);
      fd.append("b_cat", this.form.cat);
      fd.append("b_detail", this.form.detail);
      fd.append("b_by", this.form.by);
      fd.append("b_img", this.$refs.img.files[0]);

      axios.post("http://127.0.0.1:3000/api/books", fd).then(res => {
        //this.$refs.showAlert.showAlert();
        this.$refs.userTable.books = res.data;

        this.resetForm();
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.resetForm();
    },
    resetForm() {
      this.form.name = "";
      this.form.cat = "";
      this.form.by = "";
      this.form.detail = "";
      this.$refs.img.values = "";
    },
    async search(e) {
      let data = [];
      await axios.get("http://127.0.0.1:3000/api/books").then(response => {
        data = response.data;
      });

      if (e !== "*" && e !== "") {
        const x = data.filter(n => {
          const regex = new RegExp(`${e}`);
          return regex.test(n.b_cat || n.b_name); 
        });
        // console.log(x);
        this.$refs.userTable.books = x;
      } else {
        await axios.get("http://127.0.0.1:3000/api/books").then(response => {
          this.$refs.userTable.books = response.data;
        });
      }
    }
  }
};
</script>

<style>
.card {
  margin-bottom: 20px;
  border-color: transparent;
  text-align: start;
}
</style>