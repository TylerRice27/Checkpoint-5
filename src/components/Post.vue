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
    </h2>
    <h6>{{ post.body }}</h6>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
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
        // account: computed(() => AppState.account);
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