<template>
  <div><br>

  <b-card-group deck>
      <b-form-input
            class="mt-3 mb-3"
            type="text"
            required
            placeholder="Search"
            @change="search"
          ></b-form-input>
        <div v-for="(book, index) in books" v-bind:key="index">
         <router-link :to="`/api/${book.b_id}`"> <b-card

          class="mb-2"
          style=" width: 24rem;"
          :img-src="`http://localhost:3000/img/${book.b_img}`"
          img-alt="Image"
          tag="article"
        >
            <router-link :to="`/api/${book.b_id}`">{{book.b_name}}</router-link>
          <br>
           {{book.b_cat}}
          
           </b-card>
           </router-link>
            <br>
             <br>
        </div>
         </b-card-group>
       
      
  

    <Aboutas ref="Aboutas" :loadData="loadData" />
  </div>
</template>

<script>
import axios from "axios";
import Aboutas from "@/components/Aboutas.vue";

export default {
  components: {
    Aboutas
  },
  data() {
    return {
      books: []
    };
  },
  methods: {
async search(a) {
      let data = [];
      await axios.get("http://127.0.0.1:3000/api/books").then(response => {
        data = response.data;
      });

      if (a !== "*" && a !== "") {
        const x = data.filter(n => {
          const regex = new RegExp(`${a}`);
          return regex.test(n.b_cat || n.b_name); 
        });
        // console.log(x);
        this.$refs.Aboutas.books = x;
      } else {
        await axios.get("http://127.0.0.1:3000/api/books").then(response => {
          this.$refs.Aboutas.books = response.data;
        });
      }
    }


  
  },
  mounted() {
    axios.get("http://127.0.0.1:3000/api/books").then(response => {
      this.books = response.data;
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
  height: 500px;
  border-radius: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  transition: width 1s;
}
img:hover {
  cursor: pointer;
}
</style>
