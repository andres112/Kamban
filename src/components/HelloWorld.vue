<template>
  <q-page class="flex flex-center column">
    <h1 class="text-center q-mt-none">{{ msg }}</h1>

    <!-- Ingress button -->
    <q-btn
      color="indigo"
      label="ingress"
      push
      size="lg"
      class="q-mt-lg text-bold"
      @click.prevent="isDialogOpen = true"
    ></q-btn>

    <!-- Dialog for login or register -->
    <q-dialog v-model="isDialogOpen">
      <Login />
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
import { ref } from "vue";
import Login from "@/components/user/Login.vue";

export default {
  name: "HelloWorld",
  props: ["msg"],
  components: {
    Login,
  },
  setup() {
    const isDialogOpen = ref(false);
    return { isDialogOpen };
  },
};
</script>
