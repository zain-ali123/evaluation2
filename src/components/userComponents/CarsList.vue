<template>
  <div>
    <div class="py-5">
      <select
        v-model="selectedFilter"
        class="border border-gray-300 p-2 rounded-md"
      >
        <option value="name">Filter by Name</option>
        <option value="model">Filter by Model</option>
        <option value="color">Filter by Color</option>
      </select>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="border border-gray-300 p-2 rounded-md ml-2"
      />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
      <div
        v-for="car in filteredCars"
        :key="car.id"
        class="bg-white rounded-lg p-4 shadow-md"
      >
        <p class="text-xl font-semibold">{{ car.name }}</p>
        <p class="text-gray-600">{{ car.model }}</p>
        <p class="text-gray-600">{{ car.color }}</p>
        <p class="text-gray-600">{{ car.booking }}</p>
        <div v-if="car.booking !== 'booked'">
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
          class="bg-gray-100 text-gray-400 px-4 py-2 mt-2 rounded-md disabled"
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
import { computed, onMounted, ref, toRef } from "vue";
const store = useStore();
const cars = ref([]);
const searchQuery = ref("");
const selectedFilter = ref("name");

onMounted(async () => {
  await store.dispatch("cars/fetchCars");
});

cars.value = computed(() => store.getters["cars/getCars"]);
// const cars = computed(() => store.getters["cars/getCars"]);
console.log(cars.value);

const filteredCars = computed(() => {
  const filter = selectedFilter.value;
  const search = searchQuery.value.toLowerCase();
  console.log(Array.isArray(cars.value.value));
  if (Array.isArray(cars.value.value)) {
    return cars.value.value.filter((car) => {
      if (filter == "model") {
        // const str=car.toString
        const carValue = car[filter].toString();
        return carValue.includes(search);
      } else {
        const carValue = car[filter].toLowerCase();
        return carValue.includes(search);
      }
    });
  }
});
console.log(filteredCars.value);

const reserveCar = async (car) => {
  if (car.selectedBookingDays == undefined) {
    alert("Please enter the number of days");
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
</script>
