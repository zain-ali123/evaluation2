<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="car in cars.value"
      :key="car.id"
      class="bg-white rounded-lg p-4 shadow-md"
    >
      <p class="text-xl font-semibold">{{ car.name }}</p>
      <p class="text-gray-600">{{ car.model }}</p>
      <p class="text-gray-600">{{ car.color }}</p>
      <p class="text-gray-600">{{ car.booking }}</p>
      <div v-if="car.booking !== 'booked'">
        <select name="days" id="" v-model="car.selectedBookingDays">
          <option v-for="(item, index) in options" :key="index">
            {{ item }}
          </option>
        </select>
        <button
          @click="reserveCar(car)"
          class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
        >
          Reserve Car
        </button>
      </div>
      <button
        v-else
        class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md disabled"
        disabled
      >
        Car Booked
      </button>
    </div>

    <router-link
      to="/reservation"
      class="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
      >View Reservations</router-link
    >
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
const store = useStore();
const cars = ref([]);
const options = ref([1, 2, 3, 4, 5, 6, 7]);
cars.value = computed(() => store.getters["cars/getCars"]);

onMounted(async () => {
  await store.dispatch("cars/fetchCars");
});

const reserveCar = async (car) => {
  if (car.selectedBookingDays == undefined) {
    alert("Please select no of days");
  } else {
    console.log(
      `Reserved car: ${car.name} for ${car.selectedBookingDays} days`
    );
    // console.log(store.state);
    // console.log(localStorage.getItem("userId"));
    const obj = {
      carId: car.id,
      userId: localStorage.getItem("userId"),
      days: parseInt(car.selectedBookingDays),
    };
    // console.log(obj);
    await store.dispatch("reservation/reserveCar", obj);
    await store.dispatch("cars/fetchCars");
  }
};
</script>
