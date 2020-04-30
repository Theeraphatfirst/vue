<template>
  <b-modal id="modalEdit" :title="title" hide-footer>
    <div>
      <b-form>
        <b-form-group label="ชื่อนิยาย: " label-for="book-name">
          <b-form-input ref="name" v-model="form.b_name" required placeholder="Enter Name book.."></b-form-input>
        </b-form-group>

        <b-form-group label="ประเภท: " label-for="cat">
          <b-form-input
            ref="cat"
            v-model="form.b_cat"
            type="text"
            required
            placeholder="Enter cat.."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="โดย: " label-for="by">
          <b-form-input
            ref="by"
            v-model="form.b_by"
            type="text"
            required
            placeholder="Enter By.."
          ></b-form-input>
        </b-form-group>

        <b-form-group label="เนื้อเรื่องย่อ: " label-for="detail">
          <b-form-textarea
            v-model="form.b_detail"
            type="text"
            placeholder="Enter detail..."
          ></b-form-textarea>
        </b-form-group>
              <b-form-group label="รูป: " label-for="img">
               <input type="file" ref="img" />
              </b-form-group>

        <b-button type="submit" variant="success" class="float-right" @click="update">แก้ไข</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  name: "modalEdit",
  data() {
    return {
      title: "",
      form: {
        b_id: "",
        b_name: "",
        b_cat: "",
        b_by: "",
        b_detail: "",
        img: ""
        
      }
    };
  },
  props: {
    loadData: Function
  },
  methods: {
    showModalEdit(id) {
      axios.get(`http://127.0.0.1:3000/api/book/${id}`).then(response => {
        this.form = response.data[0];
        
        this.$bvModal.show("modalEdit");
        this.title = `UPDATING ID: ${this.form.b_id}`;
      });
    },
    update(e) {
      e.preventDefault();
      
      axios.put(`http://127.0.0.1:3000/api/book/${this.form.b_id}`, this.form).then(response => {
        
        // console.log(response.data);
        this.$props.loadData(response.data);
        this.$bvModal.hide("modalEdit");
      });
    }
  },
};
</script>