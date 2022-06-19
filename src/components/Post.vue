<template>
  <div class="col-md-6 card text-dark m-3 p-2">
    <h2 class="d-flex text-end">
      <img
        class="profile-img selectable me-2"
        @click.stop="goToProfile"
        :src="post.creator.picture"
        alt="User profile pic"
      />
      {{ post.creator.name }}
      <i
        v-if="post.creator.graduated"
        class="mdi-18px mdi mdi-account-circle"
      ></i>
    </h2>

    <!-- <button
        v-show="post.creatorId == account.id"
        class="
          btn
          trash
          col-1
          btn-warning
          rounded-pill
          justify-content-end
          selectable
        "
        @click="editPost"
      >
        <i class="mdi mdi-pencil"></i>
      </button> -->

    <h6>{{ post.body }}</h6>
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <div class="d-flex justify-content-between col-md-12">
      <p>{{ moment(`${post.createdAt}`).fromNow() }}</p>
      <i @click="like" class="heart mdi mdi-heart text-end text-danger">{{
        post.likes.length
      }}</i>
    </div>
    <button
      v-show="post.creatorId == account.id"
      class="
        delete-button
        col-md-1
        btn
        trash
        btn-danger
        rounded-pill
        selectable
      "
      @click="removePost"
    >
      <i class="mdi mdi-delete-forever"></i>
    </button>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import moment from "moment";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      moment: moment,
      goToProfile() {
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      account: computed(() => AppState.account),

      // come back to this later and write a function for your edit button
      //   editPost(){

      //   }

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

      time() {
        moment().endof("day").fromNow();
        // moment().endof(post.creator.createAt).fromNow();
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
  //   display: flex;

  //   margin-left: 250px;
}
</style>