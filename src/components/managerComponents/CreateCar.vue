<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-5">
    <div class="container mx-auto p-4 w-full max-w-md bg-white">
      <h1 class="text-2xl font-semibold mb-4">Create Car</h1>
      <form @submit.prevent="createCar" class="">
        <div class="mb-4">
          <label for="name" class="block text-gray-600">Name:</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="model" class="block text-gray-600">Model:</label>
          <input
            v-model="formData.model"
            type="number"
            id="model"
            name="model"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="color" class="block text-gray-600">Color:</label>
          <input
            v-model="formData.color"
            type="text"
            id="color"
            name="color"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-600">Price:</label>
          <input
            v-model="formData.price"
            type="number"
            id="price"
            name="price"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            required
          />
        </div>
        <div class="mt-6">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Car
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();
const formData = ref({
  name: "",
  model: "",
  color: "",
  price: null,
  ownerId: localStorage.getItem("userId"),
});

const createCar = async () => {
  await store.dispatch("cars/createCar", formData.value);
  alert("Car created sucessfully");
  formData.value.name = "";
  formData.value.model = "";
  formData.value.color = "";
  formData.value.price = null;
};
</script>
