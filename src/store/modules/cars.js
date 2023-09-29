import axios from "axios";
import user from "./user";
export default {
    namespaced: true,
    state: {
      cars:[],
    },
    mutations: {
      SET_CARS(state, payload) {
        state.cars = payload
        }
    },
    actions: {
        async fetchCars({ commit }) {
        const token = localStorage.getItem("token");
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.get("http://localhost:3000/car", config)  
        console.log(data?.data?.cars)
        commit("SET_CARS", data?.data?.cars)   
        
      },
        async fetchCarsById({ commit }) {
          const token = localStorage.getItem("token");
          const id=localStorage.getItem("userId")
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.get(`http://localhost:3000/car/${id}`, config)  
        console.log(data.data.cars)
        commit("SET_CARS", data.data.cars)   
        
      },
      async deleteCarById({ commit }, id) {
          
        const token = localStorage.getItem("token");
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.delete(`http://localhost:3000/car/${id}`, config)  
        console.log(data.data.cars)
        commit("SET_CARS", data.data.cars)   
      },
      async updateCarById({ commit }, payload) {
        console.log("payload in store:", payload)
        const token = localStorage.getItem("token");
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
        const { data } = await axios.put(`http://localhost:3000/car/${payload.id}`, payload.form,config)  
        console.log(data.data.cars)
        commit("SET_CARS", data.data.cars)
        
      },
      async createCar(_, payload) {
        console.log("payload in store:", payload)
        const token = localStorage.getItem("token");
        console.log('token in the fetch----> ', token)
        const config = {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        };
         await axios.post(`http://localhost:3000/car`, payload,config)  
       
        
      }
    },
    getters: {
      getCars(state) {
        return state.cars

      }  
    }
}