<template>
  <header class="flex flex-wrap z-50 w-full bg-whitetext-sm py-5 bg-mygrey">
    <nav
      class="w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
      aria-label="Global"
    >
      <div class="flex hover:text-green-400 sm:justify-start justify-center">
        <p class="flex-none text-2xl font-bold">Rentrip</p>
        <span class="material-symbols-rounded"> local_taxi </span>
      </div>

      <div
        v-show="isUserLoggedIn"
        class="flex flex-row items-center gap-3 text-xs md:text-md lg:text-lg sm:gap-5 mt-5 justify-center sm:justify-end sm:mt-0 sm:pl-5 text-white"
      >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/manager/reservations"
          v-if="role == 'manager'"
        >
          Reservations</router-link
        >
        <router-link
          v-if="role == 'manager'"
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/manager/createUser"
          >Register User</router-link
        >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/user/reservation"
          v-if="role == 'user'"
          >Reservations</router-link
        >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/user/carsList"
          v-if="role == 'user'"
          >Cars</router-link
        >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/manager/allUsers"
          v-if="role == 'manager'"
          >Users</router-link
        >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/manager/createCar"
          v-if="role == 'manager'"
          >Register Cars</router-link
        >
        <router-link
          class="sm:font-medium hover:text-gray-400 hover:text-mygreen"
          to="/manager/allCars"
          v-if="role == 'manager'"
          >Cars</router-link
        >
        <button
          @click="logout"
          v-if="(isUserLoggedIn && role == 'manager') || role == 'user'"
          class="block px-4 py-2 hover:scale-110 text-black sm:font-bold"
        >
          Sign Out
        </button>
        <router-link
          :to="accountRoute"
          class="text-mygreen"
          v-if="isUserLoggedIn && (role == 'manager' || role == 'user')"
        >
          Account
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const isUserLoggedIn = ref(false);

isUserLoggedIn.value = localStorage.getItem("isAuthenticated");
const role = computed(() => localStorage.getItem("role"));
console.log("nav", isUserLoggedIn.value);

const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("isAuthenticated");
  isUserLoggedIn.value = false;
  router.push("/");
};

const accountRoute = computed(() => {
  if (role.value === "manager") {
    return "/manager/profile";
  } else if (role.value === "user") {
    return "/user/profile";
  } else {
    return "/";
  }
});
</script>
