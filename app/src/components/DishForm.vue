<template>
    <div v-if="formModelBus">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter some name" v-model="formModelBus.name"/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="formModelBus.description"></textarea>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlNumber1" class="form-label">Price</label>
            <input v-model="formModelBus.price" type="number" class="form-control" id="exampleFormControlNumber1"/>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlSelect1" class="form-label">Category</label>
            <select v-model="formModelBus.category" class="form-select" aria-label="Default select example">
                <option v-for="(option, index) in categories" :value="option" :key="index" class="form-control" >
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlSelect2" class="form-label">Type</label>
            <select v-model="formModelBus.type" class="form-select" aria-label="Default select example">
                <option v-for="(option, index) in types" :value="option" :key="index" class="form-control" >
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="formModelBus.isActive"  id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Active
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="formModelBus.isGlutenFree"  id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                Is gluten free
            </label>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlNumber2" class="form-label">Preparation time</label>
            <input v-model="formModelBus.preparationTime" type="text" class="form-control" id="exampleFormControlNumber2"/>
        </div>
    </div>
</template>

<script>
import Helpers from '../helper/helper.js';

export default {
    props:{
        dish: {
            type: Object,
            required: true,
        }
    },
     computed: {
        formModelBus: {
            get()
            {
                console.log('value', this.dish);
                return this.dish;
            },
            set(value)
            {
                this.$emit('inputChanged', value);
            },
        },
        categories(){
            return Helpers.getCategories();
        },
        types(){
           return Helpers.getTypes();
        },
     },
}
</script>
