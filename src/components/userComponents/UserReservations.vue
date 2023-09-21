<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-semibold mb-4">My Reservations</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div v-for="(reservation, index) in reservations.value" :key="index">
        <div class="bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-2">
            {{ reservation.carId.name }}
          </h2>
          <p class="text-gray-600 mb-2">Model:{{ reservation.carId.model }}</p>
          <p class="text-gray-600">Color: {{ reservation.carId.color }}</p>
          <p class="text-gray-600">
            Price Per Day: {{ reservation.carId.price }}
          </p>
          <p class="text-gray-600">Days: {{ reservation.days }}</p>
          <button
            class="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600"
            @click="cancelReservation(reservation)"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const reservations = ref([]);

onMounted(async () => {
  await store.dispatch("reservation/getReservationsByUserId");
});
reservations.value = computed(
  () => store.getters["reservation/getReservations"]
);

const cancelReservation = async (reservation) => {
  //   console.log(reservation.carId._id);
  const answer = confirm("Are you sure you want to concel reservation");
  if (answer) {
    {
      const obj = {
        carId: reservation.carId._id,
        userId: localStorage.getItem("userId"),
      };
      console.log(obj);
      await store.dispatch("reservation/cancelResevation", obj);
      await store.dispatch("reservation/getReservationsByUserId");
    }
  }
};
</script>
