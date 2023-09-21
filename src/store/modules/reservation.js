import axios from "axios";
import cars from "./cars";

export default {
  namespaced: true,
  state: {
    reservations: [],
    user:null
  },
  mutations: {
    SET_RESERVATIONS(state, payload) {
      state.reservations = payload;
    },
    SET_USER(state, payload) {
      state.user=payload
    }
  },
  actions: {
    async reserveCar(_, payload) {
      const token = localStorage.getItem("token");
      console.log(payload);

      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      };
      await axios.post("http://localhost:3000/reservation", payload, config);
    },
    async getReservationsByUserId({ commit }) {
      const token = localStorage.getItem("token");
      console.log(token);

      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },  
        };
        const userId = localStorage.getItem("userId")
        console.log("userId :",userId)
        const { data } = await axios.get(`http://localhost:3000/reservation/user/${userId}`,config)
        console.log(data)
        commit("SET_RESERVATIONS",data.data.reservations)
      },
      async cancelResevation(_, payload) {
          console.log("Payload in action delete : ", payload)
          const token = localStorage.getItem("token");
          console.log(token);

          const config = {
              headers: {
                  "x-access-token": token,
                  "Content-Type": "application/json",
              },
          };
          const userId = localStorage.getItem("userId")
          console.log("userId :", userId)
          const { data } = await axios.delete("http://localhost:3000/reservation", { headers:config.headers,  data: payload})
        console.log(data)
        // commit("SET_RESERVATIONS",data.data.reservations)
    },
    async fetchAllReservations({ commit }) {
      const token = localStorage.getItem("token");
      console.log(token);

      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },  
        };
        const { data } = await axios.get(`http://localhost:3000/reservation`,config)
        console.log(data)
        commit("SET_RESERVATIONS",data.data.reservations)
    },
    async fetchUserByReservationId({commit},reservationId) {
      const token = localStorage.getItem("token");
      // console.log(token);

      const config = {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },  
        };
        const { data } = await axios.get(`http://localhost:3000/reservation/${reservationId}`,config)
      console.log(data.data.allReservations[0].userId)
      commit("SET_USER",data.data.allReservations[0].userId)
    }
  },
    getters: {
        getReservations(state) {
            return state.reservations
      },
      getUser(state) {
        // console.log(state.user)
        return state.user
      }
  },
};
