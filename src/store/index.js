import { createStore } from 'vuex'
import user from './modules/user'
import cars from './modules/cars';
import reservation from './modules/reservation';
export default createStore({
 
  modules: {
    user,
    cars,
    reservation,
    
  }
});
