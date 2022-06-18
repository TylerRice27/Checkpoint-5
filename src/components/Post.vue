<template>
  <div class="col-md-6 card text-dark m-3 p-2">
    <h2>
      {{ post.creator.title }}
      <img
        class="profile-img selectable me-2"
        @click.stop="goToProfile"
        :src="post.creator.picture"
        alt="User profile pic"
      />
      {{ post.creator.name }}
      <button
        v-show="post.creatorId == account.id"
        class="delete-button btn trash col-2 btn-danger rounded-pill selectable"
        @click="removePost"
      >
        <i class="mdi mdi-delete-forever"></i>
      </button>
    </h2>
    <!-- change this to smaller create at time -->
    <p>{{ post.creator.createdAt }}</p>
    <h5>{{ post.body }}</h5>
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <i @click="like" class="mdi mdi-heart text-end text-danger">{{
      post.likes.length
    }}</i>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      goToProfile() {
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      account: computed(() => AppState.account),

      async removePost() {
        try {
          if (await Pop.confirm("Do you Want to Delete?")) {
            await postsService.removePost(props.post.id);
            Pop.toast("Post Deleted", "error");
          }
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },

      async like() {
        await postsService.like(props.post.id);
        await postsService.getPosts();
      },

      //   timeSince(date) {
      //     var seconds = Math.floor((new Date() - date) / 1000);

      //     var interval = seconds / 31536000;

      //     if (interval > 1) {
      //       return Math.floor(interval) + " years";
      //     }
      //     interval = seconds / 2592000;
      //     if (interval > 1) {
      //       return Math.floor(interval) + " months";
      //     }
      //     interval = seconds / 86400;
      //     if (interval > 1) {
      //       return Math.floor(interval) + " days";
      //     }
      //     interval = seconds / 3600;
      //     if (interval > 1) {
      //       return Math.floor(interval) + " hours";
      //     }
      //     interval = seconds / 60;
      //     if (interval > 1) {
      //       return Math.floor(interval) + " minutes";
      //     }
      //     return Math.floor(seconds) + " seconds";
      //     let aDay = 24 * 60 * 60 * 1000;
      //   },
    };
  },
};
</script>


<style lang="scss" scoped>
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 45px;
  object-fit: cover;
}
.trash {
  margin-left: 130px;
}
</style>