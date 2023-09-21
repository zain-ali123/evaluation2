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

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUserView
  },
    {
    path: '/carsList',
    name: 'carsList',
    component: CarsView
  },
        {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView
  },
  {
    path: '/manager/createUser',
    name: 'createUser',
    component: CreateUserView
  },
    {
    path: '/manager/allUsers',
    name: 'allUsers',
    component: ReadAndDeleteUsersView
  },
  {
    path: '/manager/allCars',
    name: 'allCars',
    component: RUDCarsView
  },
    {
    path: '/manager/createCar',
    name: 'createCar',
    component: CreateCarView
  },
        {
    path: '/manager/reservations',
    name: 'reservations',
    component: CarReservationView
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
