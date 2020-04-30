<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" v-bind:key="index">
          <td>{{book.b_id}}</td>
          <td>
            <router-link :to="`/api/${book.b_id}`">{{book.b_name}}</router-link>
          </td>
           <td>{{book.b_cat}}</td>
          <td>
            <b-link @click="edit(book.b_id)">
              <b-icon icon="pencil"></b-icon>
            </b-link>
          </td>
          <td>
            <b-link @click="del(book.b_id)">
              <b-icon icon="trash"></b-icon>
            </b-link>
          </td>
        </tr>
      </tbody>
    </table>

    <modalEdit ref="modalEdit" :loadData="loadData" />
  </div>
</template>

<script>
import axios from "axios";
import modalEdit from "@/components/ModalEdit.vue";

export default {
  name: "userTable",
  components: {
    modalEdit
  },
  data() {
    return {
      books: []
    };
  },
  methods: {
    del(id) {
      this.$bvModal
        .msgBoxConfirm(`DELETE ID : ${id}`, {
          title: "Confirmation"
        })
        .then(value => {
          if (value) {
            axios.delete(`http://127.0.0.1:3000/api/book/${id}`).then(res => {
              // console.log(res.data);
              this.books = res.data;
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(id) {
      this.$refs.modalEdit.showModalEdit(id);
    },
    loadData(data) {
      this.books = data;
    }
  },
  mounted() {
    axios.get("http://127.0.0.1:3000/api/books").then(response => {
      this.books = response.data;
    });
  }
};
</script>
