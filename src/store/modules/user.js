import axios from "axios";
export default {
   namespaced: true,
  state: {
    responseMessage: null,
    user: [],
    role: null,
    users:[]
  },
  mutations: {
    SET_USER(state, payload) {
      // console.log("payload user MUTATION: ",payload)
      state.user = payload;
      console.log("state User:>>>>>>>>>>>>>>>>>>>>",state.user)
    },
SET_USERS(state, payload) {
      console.log("payload users: ", payload)
      state.users=payload
    }
  },
  actions: {
   async registerUser(_, payload) {
          this.state.responseMessage = null
          console.log(payload)
      
      try {
        console.log('payload in vuex ', payload)
         await axios.post('http://localhost:3000/users/register', payload);
      } catch (error) {
        console.error('Error registering user:', error);
        this.state.responseMessage = error.response.data.errors
        console.log( this.state.responseMessage )
      }
    }, 
    async authenticateUser({ commit }, payload) {
      this.state.userId = null
      this.state.responseMessage = null
      try {
        const { data } = await axios.post('http://localhost:3000/users/authenticate', payload);
        console.log('Data  in response to from api in action auth : ', data)
      
        if (!data.data) {
          
          this.state.responseMessage = data.message
          console.error(data.message)
          return 0 
        }
        console.log("USER ROLE>>>>>>>>>>>>>>>>>>>", data.data.user.role)
        // this.state.user= data.data.user
        this.state.role=data.data.user.role
        this.state.responseMessage = data.message
        this.state.userId = data.data.user._id
        this.state.token = data.data.token
        commit("SET_USER",data.data.user)

        localStorage.setItem("token", data.data.token)
        localStorage.setItem("userId", data.data.user._id)
        localStorage.setItem("role", data.data.user.role)
        localStorage.setItem("isAuthenticated",true)
        
        console.log("token->>>>>>>>>>>>>>>>",this.state.token)
        axios.defaults.headers.common['Authorization'] = this.state.token;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
     

        
      } catch (error) {
        console.error('Error authenticating user:', error);
      }
    },
    async fetchAllUsers({ commit }) {

      const { data } = await axios.get("http://localhost:3000/users")
      console.log(data)
      commit("SET_USERS",data.data.users)
    },
    async deleteUserById({ commit }, userId) {
      const { data } = await axios.delete(`http://localhost:3000/users/${userId}`)
      console.log(data)
      commit("SET_USERS",data.data.users)
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users
    },
    getUser(state) {
      console.log(state.user)
      return state.user
    }
  },
};


