<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-5">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-6">User Registration</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block text-gray-600">Username:</label>
          <input
            v-model="formData.name"
            type="text"
            id="username"
            name="username"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email:</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            name="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password:</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block text-gray-600">Role:</label>
          <select
            v-model="formData.role"
            id="role"
            name="role"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          >
            <option value="user">user</option>
            <option value="manager">manager</option>
          </select>
        </div>
        <div v-if="msgArray">
          <div
            v-for="(item, index) in msgArray"
            :key="index"
            class="text-red-400"
          >
            <p>{{ item.msg }}</p>
          </div>
        </div>
        <div class="mt-6">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const formData = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});
const msgArray = ref(null);
const registerUser = async () => {
  store.state.responseMessage = null;
  // Handle user registration here using formData
  console.log("User registration data:", formData.value);
  await store.dispatch("user/registerUser", formData.value);
  console.log("store state message : ", store.state.responseMessage);

  if (Array.isArray(store.state.responseMessage)) {
    msgArray.value = store.state.responseMessage;
  }
};

const user = ref(null);
// user.value = computed(() => store.getters["user/getUser"]);
user.value = store.getters["user/getUser"];
console.log(user.value);
</script>

<style scoped>
/* Add your Tailwind CSS classes for styling here */
</style>
