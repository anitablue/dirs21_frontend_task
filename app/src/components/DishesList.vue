<template>
  <div class="list row" v-if="dataLoaded">
    <h1>List of all dishes</h1>
    <div v-for="(item, index) in dishes" :key="index">
        <div class="row py-3">
            <div class="col-4">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col">
                                <img :src="'./assets/'+ item.img" alt="Card image cap" class="img-thumbnail"/>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-8">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col">
                                <h5 class="card-title">{{item.name}}</h5>
                                <p class="card-text">Price: <small class="text-muted">{{item.price}} EUR</small></p>
                                <p class="card-text">Category: <small class="text-muted">{{item.category}}</small></p>
                                <p class="card-text">Day time: <small class="text-muted">{{item.type}}</small></p>
                                <p class="card-text">Active: <small class="text-muted">{{item.isActive ? 'Yes' : 'No'}}</small></p>
                                <p class="card-text">Gluten free: <small class="text-muted">{{item.isGlutenFree ? 'Yes' : 'No'}}</small></p>
                                <p class="card-text">Preparation time: <small class="text-muted">{{item.preparationTime}}</small></p>
                            </div>
                            <div class="col">
                                    <p class="text-right">
                                        <a href="#" @click="goToEdit(item._id)" class="btn btn-link">Edit</a>
                                    </p>
                                    <p>
                                        <a href="#" class="card-link" @click="changeStatus(item)" v-if="!item.isActive">Enable</a>
                                        <a href="#" class="card-link" @click="changeStatus(item)" v-if="item.isActive">Disable</a>
                                    </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import DataService from "../service/DataService";

export default {
    data(){
        return{
            dataLoaded: false,
            dishes: [],
        }
    },
    methods:{
        loadDishes() {
            this.dataLoaded = false;
            DataService.getAll()
                .then(response => {
                    this.dishes = response.data.data;
                    this.dataLoaded = true;
                    console.log('data', response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        goToEdit(id){
            this.$router.push({name: 'Edit', params: { id: id }});
        },
        changeStatus(item){
          const dishIndex = this.dishes.findIndex(x => x._id === item._id);
          const dish = this.dishes[dishIndex];
          dish.isActive = !dish.isActive;
           DataService.create(dish)
                .then(response => {
                console.log(response.data);
                })
                .catch(e => {
                console.log(e);
                });
        },
        removeDish(id){
          DataService.delete(id)
            .then(response => {
                console.log(response.data);
                this.$router.go();
                })
                 .catch(e => {
                   console.log(e);
               });
        }
    },
    mounted(){
        this.loadDishes();
    }
}
</script>