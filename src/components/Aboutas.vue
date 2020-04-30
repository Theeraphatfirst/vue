<template>

<div> 
 
    <center>

    <b-card-group deck>
      
      <div v-for="(book, index) in books" v-bind:key="index">
        <b-card

          class="mb-2"
          style=" width: 28rem;"
          :img-src="`http://localhost:3000/img/${book.b_img}`"
        
          img-alt="Image"
          tag="article"
        >
         <router-link :to="`/api/${book.b_id}`">{{book.b_name}}</router-link>
          
        
          <p></p>
           
          <br />
          <br />
          <hr />
        </b-card>
      </div>
    </b-card-group> </center>
 
    <modalEdit ref="modalEdit" />
  </div>
</template>

<script>
import axios from "axios";
import modalEdit from "@/components/ModalEdit.vue";

export default {
  name: "Aboutas",
  components: {
    modalEdit
  },
  data() {
    return {
      books: []
    };
  },
  methods: {
  },
  mounted() {
    axios.get("http://127.0.0.1:3000/api/book").then(response => {
      this.books = response.data;
      console.log(JSON.stringify(this.books))
    });
  }
};
</script>
<style>
.card {
  margin-bottom: 20px;
  border-color: transparent;

}
img {
  height: 600px;
  width: 150px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 1s;
}
</style>