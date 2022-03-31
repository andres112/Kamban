<template>
  <q-page class="flex flex-center column">
    <p class="text-center q-mt-none" :class="isMobile ? 'text-h3' : 'text-h1'">
      {{ msg }}
    </p>

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
    <q-dialog v-model="isDialogOpen" @before-hide="cleanDialog">
      <Register
        v-if="isRegister"
        @changeDialog="isRegister = false"
        @closeDialog="isDialogOpen = false"
      />
      <RecoverPassword v-else-if="isReset" />
      <Login
        v-else
        @changeDialog="isRegister = true"
        @resetPassword="isReset = true"
      />
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Login from "@/components/user/Login.vue";
import Register from "@/components/user/Register.vue";
import RecoverPassword from "@/components/user/RecoverPassword.vue";

export default {
  name: "Home",
  props: ["msg"],
  components: {
    Login,
    Register,
    RecoverPassword,
  },
  setup() {
    const store = useStore();
    const isDialogOpen = ref(false);
    const isRegister = ref(false);
    const isReset = ref(false);
    const openDialog = () => {
      isDialogOpen.value = true;
      isRegister.value = false;
    };
    const isMobile = computed(() => {
      return store.state.settings.isMobile;
    });

    const cleanDialog = () => {
      isRegister.value = false;
      isReset.value = false;
      isDialogOpen.value = false;
    };
    return {
      isDialogOpen,
      isRegister,
      isReset,
      openDialog,
      isMobile,
      cleanDialog,
    };
  },
};
</script>
