<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form
          class="d-flex flex-column"
          action=""
          @submit.prevent="saveAccount"
        >
          <label for="">Account Name</label>
          <input type="text" v-model="editable.name" />

          <label for="">Account Picture</label>
          <input type="text" v-model="editable.picture" />

          <label for="">Account Cover Image</label>
          <input type="text" v-model="editable.coverImg" />
          <button class="btn btn-primary">Save Changes!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  name: "Account",
  setup() {
    const editable = ref({});
    watchEffect(() => {
      AppState.account;
      logger.log("account updated", AppState.account, editable.value);
      editable.value = { ...AppState.account };
    });

    return {
      editable,
      account: computed(() => AppState.account),

      async saveAccount() {
        try {
          await accountService.editAccount(editable.value);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
