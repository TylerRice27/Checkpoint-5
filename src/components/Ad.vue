<template>
  <img class="adz img-fluid" :src="ad.tall" alt="" />
</template>


<script>
import { computed } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
// import { adService } from "../services/AdService";
import { AppState } from "../AppState";
export default {
  props: { ad: { type: Object, required: true } },
  setup(props) {
    return {
      ads: computed(() => AppState.ads),
    };
  },
};
</script>


<style lang="scss" scoped>
.ads {
  display: flex;
  justify-content: space-evenly;

  flex-direction: column;
}
.adz {
  width: 220px;
  height: 455px;
  margin-left: -4px;
  margin-top: 55px;
}
</style>