import { createWebHistory, createRouter } from "vue-router";
import DishesList from "@/components/DishesList.vue";
import UpdateDish from "@/components/UpdateDish.vue";
import CreateNewDish from "@/components/CreateNewDish.vue";
import NotFound from '@/components/NotFound.vue';

const routes = [
  {
    path: "/",
    alias: "/dishes",
    name: "Dishes",
    component: DishesList,
  },
  {
    path: "/dishes/:id",
    name: "Edit",
    component: UpdateDish,
    props: (route) => ({ id: route.params.id })
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
  {
    path: "/add",
    name: "Create",
    component: CreateNewDish,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;