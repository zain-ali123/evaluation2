<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">User List</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div v-for="(user, index) in users.value" :key="index">
        <div class="bg-white p-4 rounded shadow-md">
          <h2 class="text-lg font-semibold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.email }}</p>
          <p class="text-gray-600">Role:{{ user.role }}</p>

          <button
            @click="deleteUser(user.id)"
            class="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const users = ref([]);

onMounted(async () => {
  await store.dispatch("user/fetchAllUsers");
});

users.value = computed(() => store.getters["user/getAllUsers"]);
console.log("users", users.value);

const deleteUser = async (userId) => {
  const answer = confirm("Are you sure you want to delete");
  if (answer) {
    await store.dispatch("user/deleteUserById", userId);
  }
};
</script>
