<template>
  <div v-if="dish">
    <h1>Create new dish</h1>

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
    </p>
    <div v-if="!submitted">
        <DishForm :dish="dish" @inputChanged="updatedModel"></DishForm>
        <div class="row col-6 px-3 py-3">
            <button @click="saveDish" class="btn btn-success">Submit</button>
            </div> 
        </div>
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="$router.go()">Add</button>
        </div>
  </div>
</template>

<script>
import DataService from "../service/DataService";
import DishForm from './DishForm.vue';
import Helpers from '../helper/helper.js';

export default {
    components:{
        DishForm
    },
    props:{
        id:{
            type: Number,
            default: undefined
        }
    },
  data() {
    return {
      dish: undefined,
      types: [],
      submitted: false,
      errors: [],
    };
  },
  created(){
     this.initDefaultModel();  
  },
  methods: {
    saveDish() {
      this.errors = [];

      if (!this.dish.name) {
        this.errors.push('Name required.');
      }
      if (!this.dish.price) {
        this.errors.push('Price required.');
      }

      if (this.dish.name == '' || this.dish.price == '') {
            return true;
      }

      this.dish.img = Helpers.getRandomImage();
        DataService.create(this.dish)
            .then(response => {
                console.log(response.data);
                if(response.data.status === 'OK'){
                    this.submitted = true;
                }
            })
            .catch(e => {
            console.log(e);
        });
    },
    initDefaultModel(){
        this.dish = {
          name: '',
          description: '',
          price: '',
          type: '',
          category: '',
          isActivate: false,
          preparationTime: '',
          image: '',
        }
    }
  },
  updatedModel(data){
    this.dish = data;
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>