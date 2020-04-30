<template>
  <div>
    
    <div>

    <b-card-group deck>
      <b-card
        border-variant="primary"
        header="อ่านให้สนุกนะคะ"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
        width="50px"
        >
      <h3>ชื่อนิยาย : {{book.b_name}}</h3>
      <h3>ประเภท: {{book.b_cat}}</h3>
      <h3>โดย : {{book.b_by}}</h3>
      <img :src="`http://localhost:3000/img/${book.b_img}`" />
      <br><br><br>
      <h3>เนื้อเรื่องย่อ :</h3><p> {{book.b_detail}}</p>
      </b-card>
      </b-card-group>

    </div>
    <div>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-form class="form" @submit="onSubmit">
            <b-form-group label="ชื่อ: " label-for="book-name">
              <b-form-input v-model="comment.name" required placeholder="Enter Name " ref="c_name"></b-form-input>
            </b-form-group>

            <b-form-group label="เนื้อหา: " label-for="ingredient">
              <b-form-textarea
              v-model="comment.detail"
                required placeholder="Enter Comment"
            
              ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="success" class="float-right">comment</b-button>
          </b-form>
        </b-col>
        <b-col></b-col>
      </b-row>
    </div>

    <b-row v-for="(comment, index) in datacomment" :key="index">
      <b-col></b-col>
      <b-col cols="6">
        <div class="comment mt-3">
          <p>ชื่อผู้โพสต์ : {{comment.c_name}}</p>
          <p>comment: {{comment.c_detail}}</p>
          <p>เวลา: {{comment.c_date}}</p>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    book: {
      b_id: "",
      b_name: "",
      b_cat: "",
      b_by: "",
      b_detail: "",
      b_img: ""
    },
    comment: {
      name: "",
      detail: ""
    },
    datacomment: []
  }),
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      await axios.post(
        `http://localhost:3000/api/comment/${this.$route.params.id}`,
        {
          c_name: this.comment.name,
          c_detail: this.comment.detail,
          c_book: this.book.b_id
        }
      );
      await axios
        .get(`http://localhost:3000/api/comment/${this.$route.params.id}`)
        .then(res => {
          this.datacomment = res.data;
          this.resetFormComment();
        });
    },
    resetFormComment() {
      this.comment.name = "";
      this.comment.detail = "";
    }
    

  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/book/${this.$route.params.id}`)
      .then(res => {
        this.book = res.data[0];
      });
    axios
      .get(`http://localhost:3000/api/comment/${this.$route.params.id}`)
      .then(res => {
        this.datacomment = res.data;
      });
  }
};
</script>

<style scoped>
.form {
  text-align: start;
}
.comment {
  background-color: darkcyan;
  padding: 5px;
}
.full {
  width: 100%;
  height: auto;
}
img {
  width: 400px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 1s;
}
img:hover {
  cursor: pointer;
}
</style>
