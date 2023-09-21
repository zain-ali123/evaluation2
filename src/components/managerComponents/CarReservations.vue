<template>
  <div>
    <div v-for="item in reservations.value" :key="item._id">
      <div>
        <p>{{ item.carId.name }}</p>
        <p>{{ item.carId.color }}</p>
        <p>{{ item.carId.model }}</p>
        <p>{{ item.days }}</p>
      </div>
      <button @click="getUserDetails(item._id)">View user</button>
      <div v-show="showUser[item._id]">
        <div>
          <p>{{ user?.name }}</p>
          <p>{{ user?.email }}</p>
        </div>
        <button @click="closeUserDetails(item._id)">Close</button>
      </div>
      <p class="py-6"></p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const reservations = ref([]);
const showUser = ref({});
const user = ref(null);

onMounted(async () => {
  await store.dispatch("reservation/fetchAllReservations");
});
reservations.value = computed(
  () => store.getters["reservation/getReservations"]
);

const getUserDetails = async (reservationId) => {
  await store.dispatch("reservation/fetchUserByReservationId", reservationId);
  user.value = store.getters["reservation/getUser"];
  console.log("user>>>", user.value);
  // Set showUser for the clicked reservation to true
  showUser.value[reservationId] = true;
};

const closeUserDetails = (reservationId) => {
  // Set showUser for the clicked reservation to false to hide the user details
  showUser.value[reservationId] = false;
};
</script>
