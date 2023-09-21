import axios from "axios";
import cars from "./cars";

export default {
  namespaced: true,
  state: {
    reservations: [],
  },
  mutations: {
    SET_RESERVATIONS(state, payload) {
      state.reservations = payload;
    },
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
  },
    getters: {
        getReservations(state) {
            return state.reservations
      }
  },
};
