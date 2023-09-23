<template>
  <div
    class="flex flex-col items-center justify-center py-32 h-screen bg-mygrey"
  >
    <div class="shadow-xl rounded-xl h-96 w-80 text-center">
      <h2 class="text-4xl mb-4 text-mygreen">Profile</h2>
      <div class="mb-4 flex gap-4 py-5 justify-center">
        <label for="user name" class="block text-gray-700 font-semibold"
          >Name</label
        >
        <p>{{ user.name }}</p>
      </div>
      <div class="mb-4 flex gap-4 justify-center">
        <label for="Email" class="block text-gray-700 font-semibold"
          >Email</label
        >
        <p>{{ user.email }}</p>
      </div>
      <router-link
        to="/updateProfile"
        class="text-mygreen font-semibold px-4 rounded-md hover:text-white focus:outline-none py-5"
        >Update Profile</router-link
      >
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const user = ref(null);
// user.value = computed(() => store.getters["user/getUser"]);
user.value = store.getters["user/getUser"];
console.log(user.value);
</script>
