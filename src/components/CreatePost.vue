<template>
  <form
    class="pb-4 d-flex rounded flex-column bg-dark"
    @submit.prevent="createPost"
  >
    <h3 class="text-center m-2">Create a Post!</h3>
    <!-- <input type="text" placeholder="Title" v-model="postData.title" /> -->
    <input type="text" placeholder="Image Url" v-model="postData.imgUrl" />
    <textarea
      name="postBody"
      id="postBody"
      cols="30"
      rows="4"
      placeholder="Post Content"
      v-model="postData.body"
    >
    ></textarea
    >
    <button class="btn btn-dark text-light border-danger">Create!</button>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const postData = ref({});
    return {
      postData,

      async createPost() {
        try {
          await postsService.createPost(postData.value);
          //   trying to reset form on a post try later
          //   postData = {};
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