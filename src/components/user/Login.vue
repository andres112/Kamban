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
      <q-form @submit.prevent="loginWithEmailAndPassword">
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
        <q-input
          v-model="password"
          label="Password"
          :type="isPswVisible ? 'text' : 'password'"
          :rules="passwordRules"
        >
          <template #append>
            <q-icon
              :name="isPswVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPswVisible = !isPswVisible"
            />
          </template>
        </q-input>
        <q-btn flat dense color="grey" class="row" @click="resetPassword"
          >Forgot password?</q-btn
        >
        <q-btn color="indigo" class="q-mt-lg" type="submit">Sign In</q-btn>
        <span class="q-mt-md q-mx-sm vertical-bottom">
          New here?
          <span class="text-bold cursor-pointer text-indigo" @click="register">
            Sign Up
          </span>
        </span>
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
  name: "Login",
  setup(props, { emit }) {
    const userActions = useUser();

    const email = ref(null);
    const password = ref(null);
    const isPswVisible = ref(false);

    // rules for validating the form
    const emailRules = [
      (v) => !!v || "Email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Please enter a valid email",
    ];
    const passwordRules = [(v) => !!v || "Password is required"];

    const loginWithGoogle = () => {
      userActions.loginWithGoogle();
    };
    const loginWithEmailAndPassword = () => {
      userActions.loginWithEmailAndPassword(email.value, password.value);
    };

    const register = () => {
      emit("changeDialog");
    };

    const resetPassword = () => {
      emit("resetPassword");
    };
    return {
      email,
      password,
      isPswVisible,
      register,
      loginWithGoogle,
      loginWithEmailAndPassword,
      emailRules,
      passwordRules,
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
