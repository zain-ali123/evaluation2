<template>
  <div>
    <div class="py-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="border border-gray-300 p-2 rounded-md"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
      <div
        v-for="car in filteredData.value"
        :key="car.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <p class="text-xl font-semibold">{{ car.name }}</p>
        <p class="text-gray-600">{{ car.model }}</p>
        <p class="text-gray-600">{{ car.color }}</p>
        <p class="text-gray-600">{{ car.booking }}</p>
        <div v-if="car.booking !== 'booked'">
          <!-- <select name="days" id="" v-model="car.selectedBookingDays">
            <option v-for="(item, index) in options" :key="index">
              {{ item }}
            </option>
          </select> -->
          <div class="grid gap-2">
            <p class="pt-3">Enter Number Of Days</p>
            <input
              v-model="car.selectedBookingDays"
              type="number"
              id="days"
              name="days"
              class="px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            @click="reserveCar(car)"
            class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
          >
            Reserve Car
          </button>
        </div>
        <button
          v-else
          class="bg-gray-400 text-white px-4 py-2 mt-2 rounded-md disabled"
          disabled
        >
          Car Booked
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
const store = useStore();
const cars = ref([]);
const searchQuery = ref("");

cars.value = computed(() => store.getters["cars/getCars"]);

onMounted(async () => {
  await store.dispatch("cars/fetchCars");
});
const reserveCar = async (car) => {
  if (car.selectedBookingDays == undefined) {
    alert("Please select the number of days");
  } else {
    console.log(
      `Reserved car: ${car.name} for ${car.selectedBookingDays} days`
    );
    const obj = {
      carId: car.id,
      userId: localStorage.getItem("userId"),
      days: parseInt(car.selectedBookingDays),
    };
    await store.dispatch("reservation/reserveCar", obj);
    await store.dispatch("cars/fetchCars");
  }
};

const filteredData = computed(() => {
  console.log(cars.value.value);
  const query = searchQuery.value.toLowerCase().trim();
  console.log(query);
  if (!query) return cars.value;

  return cars.value.value.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query)
    // ||
    // item.model.includes(query) ||
  );
});
</script>
