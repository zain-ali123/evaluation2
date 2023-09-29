import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import RegisterUserView from "../views/userViews/RegisterUserView.vue";
import LoginView from "../views/LoginView.vue";
import CarsView from "../views/userViews/CarsView.vue";
import ReservationView from "../views/userViews/ReservationView.vue";
import CreateUserView from "../views/managerViews/CreateUserView.vue";
import ReadAndDeleteUsersView from "../views/managerViews/ReadAndDeleteUsersView.vue";
import RUDCarsView from "../views/managerViews/RUDCarsView.vue";
import CreateCarView from "../views/managerViews/CreateCarView.vue";
import CarReservationView from "../views/managerViews/CarReservationView.vue";
import ProfileView from "../views/ProfileView.vue";
import ManagerLayout from "../layouts/ManagerLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";
import user from "@/store/modules/user";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    beforeEnter: (to, from, next) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      next();
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUserView,
  },

  {
    path: "/user",
    name: "user",
    component: UserLayout,
    children: [
      {
        path: "carsList",
        name: "carsList",
        component: CarsView,
      },
      {
        path: "reservation",
        name: "reservation",
        component: ReservationView,
      },
      {
        path: "profile",
        name: "profile",
        component: ProfileView,
      },
    ],
  },

  {
    path: "/manager",
    name: "manager",
    component: ManagerLayout,
    beforeEnter: (to, from, next) => {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == "manager"
      ) {
        next();
      } else {
        next("/");
      }
    },
    children: [
      {
        path: "createUser",
        name: "createUser",
        component: CreateUserView,
      },
      {
        path: "allUsers",
        name: "allUsers",
        component: ReadAndDeleteUsersView,
      },
      {
        path: "allCars",
        name: "allCars",
        component: RUDCarsView,
      },
      {
        path: "createCar",
        name: "createCar",
        component: CreateCarView,
      },
      {
        path: "reservations",
        name: "reservations",
        component: CarReservationView,
      },
      {
        path: "profile",
        name: "profileManager",
        component: ProfileView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
