<template>
  <q-page class="flex flex-center column">
    <h1 class="text-center q-mt-none">{{ msg }}</h1>

    <!-- Ingress button -->
    <q-btn
      color="indigo"
      label="Ingress"
      push
      size="lg"
      class="q-mt-lg text-bold"
      @click.prevent="openDialog"
    ></q-btn>

    <!-- Dialog for login or register -->
    <q-dialog v-model="isDialogOpen">
      <Register
        v-if="isRegister"
        @changeDialog="isRegister = false"
        @closeDialog="isDialogOpen = false"
      />
      <Login v-else @changeDialog="isRegister = true" />
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
import { ref } from "vue";
import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";

export default {
  name: "HelloWorld",
  props: ["msg"],
  components: {
    Login,
    Register,
  },
  setup() {
    const isDialogOpen = ref(false);
    const isRegister = ref(false);
    const openDialog = () => {
      isDialogOpen.value = true;
      isRegister.value = false;
    };
    return { isDialogOpen, isRegister, openDialog };
  },
};
</script>
