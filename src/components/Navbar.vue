<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="https://toppng.com/uploads/preview/spider-man-spider-symbol-11549788086zodnlvhh03.png"
          height="45"
          class="rounded"
        />
      </div>
      <h2 class="m-2 text-dark">The Network</h2>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="navbar-nav me-auto">
        <Search />
        <!-- <li>
          <router-link
            :to="{ name: 'About' }"
            class="btn text-black lighten-30 fs-5 selectable text-uppercase"
          >
            About
          </router-link>
        </li> -->
      </div>

      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Search from "./Search.vue";
export default {
  components: { Search },
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
