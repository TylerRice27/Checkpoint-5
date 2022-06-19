<template>
  <div class="container-fluid">
    <div class="row">
      <CreatePost v-if="account.id" />
    </div>
    <div class="row">
      <div class="col-md-9 justify-content-center">
        <Post v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <div class="try col-md-3 align-items-center">
        <Ad v-for="ad in ads" :key="ad.title" :ad="ad" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 text-start">
        <button
          :class="`btn btn-${previousPage ? 'primary' : 'danger'}`"
          :disabled="!previousPage"
          @click="changePage(previousPage)"
        >
          Prev
        </button>
      </div>
      <p class="col-3 text-center">Page {{ currentPage }}</p>
      <div class="col-3 text-end">
        <button
          :class="`btn btn-${nextPage ? 'primary' : 'danger'}`"
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
import { adService } from "../services/AdService";
export default {
  name: "Home",

  setup() {
    onMounted(async () => {
      try {
        AppState.posts = [];
        AppState.ads = [];
        await adService.getAds();
        await postsService.getPosts();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });

    return {
      ads: computed(() => AppState.ads),
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
.try {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}
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
