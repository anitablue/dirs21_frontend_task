<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Acquaintance task - DIRS 21</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/dishes" class="nav-link">List of all dishes</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li class="nav-item">
          <a href="#" @click="removeAll()"  class="nav-link">Remove all dishes</a>
        </li>
      </div>
    </nav>
    
     <div class="container mt-3">
        <router-view />
     </div>
  </div>
 
</template>

<script>
import DataService from "./service/DataService";

export default {
  name: "App",
  methods:{
    removeAll(){
      DataService.removeAll()
      .then(response => {
        console.log(response.data);
        this.$router.go();
        })
        .catch(e => {
          console.log(e);
          });
     },
  }
}
</script>