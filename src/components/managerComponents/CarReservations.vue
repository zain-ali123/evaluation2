<template>
  <div class="">
    <div
      class="w-full py-6 hidden sm:grid sm:grid-cols-4 border-2 font-extrabold bg-white"
    >
      <div class="col-span-1">NAME</div>
      <div class="col-span-1">COLOR</div>
      <div class="col-span-1">MODEL</div>
      <div class="col-span-1">DAYS</div>
      <!-- <div class="col-span-1">TOTAL</div> -->
    </div>
    <div class="border pt-3" v-for="item in reservations.value" :key="item._id">
      <div class="grid grid-cols-4">
        <p class="col-span-1 font-bold">{{ item.carId.name }}</p>
        <p class="col-span-1">{{ item.carId.color }}</p>
        <p class="col-span-1">{{ item.carId.model }}</p>
        <p class="col-span-1">{{ item.days }}</p>
      </div>
      <div class="">
        <div></div>
        <button
          class=""
          v-if="!showUser[item._id]"
          @click="showUserDetails(item._id)"
        >
          <div class="">User Details</div>
          <span class="material-symbols-rounded">keyboard_arrow_down </span>
        </button>
        <button v-else @click="hideUserDetails(item._id)">
          <span class="material-symbols-rounded"> keyboard_arrow_up </span>
        </button>
        <div v-show="showUser[item._id]">
          <div class="grid justify-center">
            <p>NAME:{{ user?.name }}</p>
            <p>EMAIL:{{ user?.email }}</p>
          </div>
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
const showUser = ref({});
const user = ref(null);

onMounted(async () => {
  await store.dispatch("reservation/fetchAllReservations");
});
reservations.value = computed(
  () => store.getters["reservation/getReservations"]
);

const showUserDetails = async (reservationId) => {
  await store.dispatch("reservation/fetchUserByReservationId", reservationId);
  user.value = store.getters["reservation/getUser"];
  // Set showUser for the clicked reservation to true
  showUser.value[reservationId] = true;
};

const hideUserDetails = (reservationId) => {
  // Set showUser for the clicked reservation to false to hide the user details
  showUser.value[reservationId] = false;
};
</script>
