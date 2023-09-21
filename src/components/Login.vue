<template>
  <div
    class="pt-20 bg-mygrey grid justify-center items-center"
    @submit.prevent="authenticateUser"
  >
    <form
      class="text-metal bg-white rounded-xl w-80 sm:w-96 text-center sm:h-80"
    >
      <div class="flex justify-center mb-8">
        <h2 class="text-2xl">Login</h2>
        <span class="material-symbols-rounded mt-2"> login </span>
      </div>
      <div class="mb-4 grid">
        <div class="flex justify-center">
          <label for="email" class="block text-metal font-semibold"
            >Email</label
          >
          <span class="material-symbols-rounded text-metal"> mail </span>
        </div>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          class="w-full px-4 py-2 rounded-md"
          placeholder="example@example.com"
        />
      </div>
      <div class="mb-4 grid">
        <div class="flex justify-center">
          <label for="password" class="block text-metal font-semibold"
            >Password</label
          >
          <span class="material-symbols-rounded text-metal"> key </span>
        </div>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          name="password"
          class="w-full px-4 py-2 rounded-md"
          placeholder="Password"
        />
      </div>
      <div>
        <div class="text-red-400">
          <p>{{ msg }}</p>
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="text-metal font-semibold py-2 px-4 rounded-md focus:outline-none hover:scale-110"
        >
          Login
        </button>
      </div>

      <router-link
        to="/register"
        class="text-metal font-semibold py-2 px-4 rounded-md focus:outline-none hover:scale-110 mt-2"
      >
        Register
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "LoginUserView",
  setup() {
    const store = useStore();
    const router = useRouter();

    const formData = ref({
      email: "",
      password: "",
    });

    const msg = ref(null);

    const authenticateUser = async () => {
      await store.dispatch("user/authenticateUser", formData.value);
      if (store.state.responseMessage === "User found!!!") {
        console.log("in if block (LOGIN)");
        console.log(store.state.role);
        if (store.state.role === "user") {
          console.log("user block role :", store.state.role);
          router.push("/carsList");
        }
        if (store.state.role === "manager") {
          console.log("manager block role :", store.state.role);
          router.push("/manager/createUser");
        }
      }
      msg.value = store.state.responseMessage;
      console.log("Authentication data:", formData.value);
    };

    return {
      formData,
      msg,
      authenticateUser,
    };
  },
};
</script>

<!-- <script>
import { mapActions } from "vuex";
import store from "@/store";
import router from "@/router";
export default {
  name: "LoginUserView",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      msg: null,
    };
  },
  methods: {
    ...mapActions({ auth: "authenticateUser" }),
    async authenticateUser() {
      await this.auth(this.formData);
      if (store.state.responseMessage == "User found!!!") {
        store.state.isAuthenticated = true;
        if (store.state.userRole == "user") {
          router.push("/allMovies");
        }
        if (store.state.userRole == "admin") {
          router.push("/admin");
        }
        console.log("in if blovk (LOGIN)");
      }
      this.msg = store.state.responseMessage;
      console.log("Authentication data:", this.formData);
    },
  },
};
</script> -->
