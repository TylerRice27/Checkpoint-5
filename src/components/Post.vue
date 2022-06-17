<template>
  <div class="col-md-6 card text-dark m-3 p-2">
    <h2>
      <img
        class="profile-img selectable me-2"
        @click.stop="goToProfile"
        :src="post.creator.picture"
        alt="User profile pic"
      />
      {{ post.creator.name }}
      <button
        v-show="post.creatorId == account.id"
        class="delete-button btn btn-danger rounded-pill content selectable"
        @click="removePost"
      >
        <i class="mdi mdi-delete-forever"></i>
      </button>
    </h2>
    <h6>{{ post.body }}</h6>
    <img class="img-fluid" :src="post.imgUrl" alt="" />
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
          await postsService.removePost(props.post.id);
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
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 45px;
  object-fit: cover;
}
</style>