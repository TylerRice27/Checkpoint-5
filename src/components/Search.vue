<template>
  <div class="row">
    <form @submit.prevent="searchPosts">
      <input
        v-model="search"
        type="text"
        class="col-md-8"
        placeholder="search posts"
      />
      <button class="col-md-2 ms-4 btn btn-primary">
        <i class="mdi mdi-magnify"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const search = ref("");
    return {
      search,
      async searchPosts() {
        try {
          logger.log("searching", search.value);
          await postsService.searchPosts(`query=${search.value}`);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },

      async searchProfile() {
        try {
          logger.log("searching", search.value);
          await postsService.searchProfile(`query=${search.value}`);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>