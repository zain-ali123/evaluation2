<template>
  <div class="h-screen flex py-12 justify-center">
    <form
      class="bg-mygrey w-1/4 h-96 border-2 rounded-lg bg-white"
      @submit.prevent="registerUser"
    >
      <h2 class="text-2xl mb-4">User Registration</h2>
      <div class="mb-4 text-left">
        <label for="name" class="block font-semibold">Name</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          class="w-full px-4 py-2 rounded-md focus:outline-none"
          placeholder="Your Name"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block font-semibold">Email</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          class="w-full px-4 py-2 rounded-md focus:outline-none"
          placeholder="example@example.com"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-semibold">Password</label>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          name="password"
          class="w-full px-4 py-2 rounded-md focus:outline-none"
          placeholder="Password"
        />
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
      <!-- <div v-if="msg">
        <div class="text-successgreen">
          <p>{{ msg }}</p>
        </div>
      </div> -->

      <div>
        <button
          type="submit"
          class="text-mygreen font-semibold py-2 px-4 rounded-md hover: focus:outline-none"
        >
          Register
        </button>
      </div>

      <router-link
        to="/"
        class="text-mygreen font-semibold py-2 px-4 rounded-md hover: focus:outline-none"
      >
        Login
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const formData = ref({
  name: "",
  email: "",
  password: "",
});
const msgArray = ref(null);
const msg = ref(null);

const registerUser = async () => {
  await store.dispatch("user/registerUser", formData.value);
  store.state.responseMessage = null;
  if (Array.isArray(store.state.responseMessage)) {
    msgArray.value = store.state.responseMessage;
  } else {
    router.push("/");
  }
};
</script>
