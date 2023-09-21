<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
      <div
        v-for="car in cars.value"
        :key="car.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <p class="text-xl font-semibold">{{ car.name }}</p>
        <p class="text-gray-600">{{ car.model }}</p>
        <p class="text-gray-600">{{ car.color }}</p>
        <p class="text-gray-600">{{ car.price }}</p>
        <div class="flex justify-between">
          <button
            @click="openUpdateModal(car)"
            class="text-blue-500 bg-white mt-2 rounded-md hover:text-blue-800 hover:px-4 hover:py-2 hover:bg-blue-100"
          >
            Update Car
          </button>
          <!-- <p class="px-4"></p> -->
          <button
            @click="deleteCar(car.id)"
            class="text-red-500 bg-white mt-2 rounded-md hover:text-red-800 hover:px-4 hover:py-2 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
      <div
        v-if="isUpdateModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"
      >
        <div class="bg-white w-1/2 p-4 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-4">Update Car</h2>
          <!-- Update form -->
          <form @submit.prevent="updateCar">
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
            <div class="mb-6">
              <button
                @click="updateCar"
                type="submit"
                class="text-blue-500 bg-white rounded-md hover:text-blue-600"
              >
                Update
              </button>
              <p class="px-4"></p>
              <button
                @click="closeUpdateModal"
                class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
const store = useStore();
const cars = ref([]);
const isUpdateModalOpen = ref(false);
cars.value = computed(() => store.getters["cars/getCars"]);
const formData = ref({
  name: null,
  model: null,
  color: null,
  price: null,
});
const carId = ref(null);

onMounted(async () => {
  await store.dispatch("cars/fetchCarsById");
});
const openUpdateModal = (car) => {
  console.log(car);
  formData.value.name = car?.name;
  formData.value.model = car?.model;
  formData.value.color = car?.color;
  formData.value.price = car?.price;

  carId.value = car.id;

  isUpdateModalOpen.value = true;
};

const closeUpdateModal = () => {
  isUpdateModalOpen.value = false;
};

const updateCar = async () => {
  console.log(formData.value, carId.value);
  const obj = {
    id: carId.value,
    form: formData.value,
  };
  await store.dispatch("cars/updateCarById", obj);

  isUpdateModalOpen.value = false;
};
const deleteCar = async (id) => {
  console.log(id);
  const answer = confirm("Are you sure you want to delete");
  if (answer) {
    await store.dispatch("cars/deleteCarById", id);
  }
};
</script>
