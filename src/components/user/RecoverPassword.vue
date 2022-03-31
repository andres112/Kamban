<template>
  <q-card class="login-card">
    <q-toolbar class="bg-indigo text-white glossy shadow-2">
      <q-toolbar-title>
        <q-icon name="whatshot" class="q-mr-sm"></q-icon>
        <span class="text-weight-bold">Kamban@pp</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>
    <h5 class="q-mb-none q-mt-sm q-pl-md">Sign In</h5>
    <q-card-section>
      <q-form @submit.prevent="resetPassword">
        <q-input
          v-model="email"
          label="Email"
          hint="username@correo.com"
          name="email"
          type="email"
          aria-required="true"
          :rules="emailRules"
          lazy-rules
        >
          <template #append> <q-icon name="email" /></template>
        </q-input>
        <q-btn color="indigo" class="q-mt-lg" type="submit">Send email</q-btn>
      </q-form>
    </q-card-section>

    <q-card-section class="text-center q-mt-sm">
      <q-btn color="blue" @click.prevent="loginWithGoogle()">
        <i class="fab fa-google"></i>
        <span class="q-pl-sm">Continue with Google</span>
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { useUser } from "@/hooks/useUser";
import { ref } from "vue";

export default {
  name: "RecoverPassword",
  setup() {
    const userActions = useUser();

    const email = ref(null);

    const resetPassword = () => {
      userActions.resetPassword(email.value);
    };

    // rules for validating the form
    const emailRules = [
      (v) => !!v || "Email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Please enter a valid email",
    ];
    return {
      email,
      emailRules,
      resetPassword,
    };
  },
};
</script>
<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 500px
  margin: 0 auto
  border-radius: 1%
</style>
