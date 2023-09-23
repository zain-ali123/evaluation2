import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import RegisterUserView from '../views/userViews/RegisterUserView.vue'
import LoginView from '../views/LoginView.vue'
import CarsView from '../views/userViews/CarsView.vue'
import ReservationView from '../views/userViews/ReservationView.vue'
import CreateUserView from '../views/managerViews/CreateUserView.vue'
import ReadAndDeleteUsersView from '../views/managerViews/ReadAndDeleteUsersView.vue'
import RUDCarsView from '../views/managerViews/RUDCarsView.vue'
import CreateCarView from '../views/managerViews/CreateCarView.vue'
import CarReservationView from '../views/managerViews/CarReservationView.vue'
import ProfileView from "../views/ProfileView.vue"
import user from '@/store/modules/user'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
     beforeEnter: (to, from, next) => {
       localStorage.removeItem("userId")
       localStorage.removeItem("role")
       localStorage.removeItem("token")
        next();
      } 
    
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUserView,

  },
    {
    path: '/carsList',
    name: 'carsList',
      component: CarsView,
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="user") {
        next();
      } else {
        next("/");
      }
    },
  },
        {
    path: '/reservation',
    name: 'reservation',
          component: ReservationView,
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="user") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: '/manager/createUser',
    name: 'createUser',
    component: CreateUserView,
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="manager") {
        next();
      } else {
        next("/");
      }
    },
  },
    {
    path: '/manager/allUsers',
    name: 'allUsers',
      component: ReadAndDeleteUsersView,
    
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="manager") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: '/manager/allCars',
    name: 'allCars',
    component: RUDCarsView,
    
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="manager") {
        next();
      } else {
        next("/");
      }
    },
  },
    {
    path: '/manager/createCar',
    name: 'createCar',
      component: CreateCarView,
    
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="manager") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: '/manager/reservations',
    name: 'reservations',
    component: CarReservationView,
    
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")&&localStorage.getItem("role")=="manager") {
        next();
      } else {
        next("/");
      }
    },
  },
    {
    path: '/profile',
    name: 'profile',
      component: ProfileView,
    
        beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") ){
        next();
      } else {
        next("/");
      }
    },
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
