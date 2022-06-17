<template>
  <div class="col-md-6 card selectable">
    <h1>{{ post.name }}</h1>
    <h6>{{ post.body }}</h6>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>