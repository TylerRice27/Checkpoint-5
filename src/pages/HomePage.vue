<template>
  <div class="container-fluid">
    <div class="row">
      <CreatePost />
    </div>
    <div class="row justify-content-center">
      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="row justify-content-center">
      <div class="col-3 text-start">
        <button
          :class="`btn btn-${previousPage ? 'danger' : 'info'}`"
          :disabled="!previousPage"
          @click="changePage(previousPage)"
        >
          Prev
        </button>
      </div>
      <p class="col-3 text-center">
        Page {{ currentPage }}
        <!-- of {{ totalPages }} -->
      </p>
      <div class="col-3 text-end">
        <button
          class="btn btn-danger"
          :disabled="!nextPage"
          @click="changePage(nextPage)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger";
export default {
  name: "Home",

  setup() {
    onMounted(async () => {
      try {
        AppState.posts = [];
        await postsService.getPosts();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });

    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      currentPage: computed(() => AppState.currentPage),

      async changePage(url) {
        try {
          await postsService.changePage(url);
          scrollTo(0, 0);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
