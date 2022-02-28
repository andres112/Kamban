<template>
  <q-card>
    <q-toolbar color="indigo">
      <q-toolbar-title>
        <span class="text-weight-bold">Kamban@pp</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <q-card-section>
      <q-btn color="indigo-7" @click.prevent="loginWithGoogle()">
        <i class="fab fa-google"></i>
        <span class="q-pl-sm">Login with Google</span>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { useUser } from "@/hooks/useUser";

export default {
  name: "Login",
  setup() {
    const userActions = useUser();
    const loginWithGoogle = () => {
      userActions.loginWithGoogle();
    };
    return { loginWithGoogle };
  },
};
</script>
