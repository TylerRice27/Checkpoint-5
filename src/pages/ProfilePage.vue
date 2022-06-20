<template>
  <div class="container-fluid">
    <div
      class="row bg-img"
      :style="`background-image: url(${profile.coverImg})`"
    ></div>
    <div class="row justify-content-center profile">
      <div
        class="
          col-md-4
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img class="profile-img" :src="profile.picture" alt="" />
        <i
          v-if="profile.graduated"
          class="spill mdi-18px mdi mdi-account-circle"
        ></i>
        <h3 class="col-md-12 text-center">
          {{ profile.name }}
        </h3>
        <div class="col-md-12 text-center mt-3 mb-3">
          <a
            v-if="profile.github"
            :href="profile.github"
            target="_blank"
            class="mdi-36px mdi mdi-github m-4"
          ></a>
          <a
            v-if="profile.linkedin"
            :href="profile.linkedin"
            target="_blank"
            class="mdi-36px mdi mdi-linkedin m-4"
          ></a>
          <a
            v-if="profile.resume"
            :href="profile.resume"
            target="_blank"
            class="mobile mdi-36px mdi mdi-note m-4"
          ></a>
        </div>

        <p><b>Class: </b>{{ profile.class }}</p>

        <p class="mt-2">{{ profile.bio }}</p>
      </div>
    </div>
    <!-- come back here later and put in create blog for account user only -->
    <div class="row">
      <div class="col-md-9 justify-content-center">
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="try col-md-3 align-items-center">
        <Ad v-for="ad in ads" :key="ad.title" :ad="ad" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 text-start">
        <!-- come back here later for profile posts to change page -->
        <button
          :class="`btn btn-${previousPage ? 'primary' : 'danger'}`"
          @click="changePage(previousPage)"
        >
          Prev
        </button>
      </div>
      <p class="col-3 text-center">Page {{ currentPage }}</p>
      <div class="col-3 text-end">
        <button
          :class="`btn btn-${nextPage ? 'primary' : 'danger'}`"
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
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
import { adService } from "../services/AdService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];
        await profilesService.getProfile(route.params.id);
        await postsService.getPostsByProfile(route.params.id);
        await adService.getAds();
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),
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


<style lang="scss" scoped>
.bg-img {
  height: 20vh;
  background-size: cover;
  background-position: center;
  background-color: var(--bs-primary);
}
.profile {
  transform: translateY(-10vh);
}
.profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50em;
}
.spill {
  position: relative;
  transform: scale(1.5);
  top: -15px;
  right: -2em;
  color: whitesmoke;
}

// .mobile {
// }
</style>