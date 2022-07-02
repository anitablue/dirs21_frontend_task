<template>
    <div v-if="dish">
        <h1>Editing</h1>
        
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>

        <DishForm :dish="dish" @inputChanged="updatedModel"></DishForm>
        
        <div class="row col-6 px-3 py-3">
            <button @click.prevent="saveDish" class="btn btn-success">Submit</button>
        </div> 
    </div>
</template>

<script>
import DataService from "../service/DataService";
import DishForm from './DishForm.vue';

export default {
    components:{
        DishForm
    },
    props:{
        id:{
            type: Number,
            required: true,
        }
    },
    data(){
        return{
            dish: undefined,
            errors: [],
        }
    },
    methods:{
        loadDish(id) {
            this.dataLoaded = false;
            DataService.get(id)
                .then(response => {
                    this.dish = response.data.data;
                    this.dataLoaded = true;
                    console.log('data', response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
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
        console.log('Dish before send:',this.dish);
            DataService.create(this.dish)
                .then(response => {
                console.log(response.data);
                this.$router.push({name: 'Dishes'});
                })
                .catch(e => {
                console.log(e);
                });
    },
    updatedModel(data){
            this.dish = data;
         }
    },
    created(){
        this.loadDish(this.id);
    }
}
</script>