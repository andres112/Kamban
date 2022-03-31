<template>
  <q-card class="login-card">
    <!-- TODO: pending validation of inputs -->
    <q-toolbar class="bg-indigo text-white glossy shadow-2">
      <q-toolbar-title>
        <q-icon name="whatshot" class="q-mr-sm"></q-icon>
        <span class="text-weight-bold">Kamban@pp</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>
    <h5 class="q-mb-none q-mt-sm q-pl-md">Sign Up</h5>
    <q-card-section>
      <q-form @submit.prevent="registerUserWithEmailAndPassword">
        <q-input
          v-model.trim="username"
          label="Username"
          name="username"
          type="text"
          aria-required="true"
          :rules="usernameRules"
          lazy-rules
        >
          <template #append> <q-icon name="face" /></template>
          <template #error> Please use min 3 and max 15 characters. </template>
        </q-input>
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
          :label-color="passwordsMatch ? 'green' : null"
        >
          <template #append>
            <q-icon
              :name="isPswVisible ? 'visibility' : 'visibility_off'"
              :color="passwordsMatch ? 'green' : null"
              class="cursor-pointer"
              @click="isPswVisible = !isPswVisible"
            />
          </template>
        </q-input>
        <q-input
          v-model="rep_password"
          label="Repeat Password"
          :type="isPswVisible ? 'text' : 'password'"
          hint="Ingress password again"
          :rules="repeatPasswordRules"
          :label-color="passwordsMatch ? 'green' : null"
          lazy-rules
        >
          <template #append>
            <q-icon
              :name="isPswVisible ? 'visibility' : 'visibility_off'"
              :color="passwordsMatch ? 'green' : null"
              class="cursor-pointer"
              @click="isPswVisible = !isPswVisible"
            />
          </template>
        </q-input>

        <q-btn color="indigo" class="q-mt-xl" type="submit">
          Create New Account
        </q-btn>
        <span class="q-mt-md q-mx-sm vertical-bottom">
          or
          <span class="text-bold cursor-pointer text-indigo" @click="login">
            Sign In.
          </span>
        </span>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { useUser } from "@/hooks/useUser";
import { ref, computed } from "vue";

export default {
  name: "Login",
  setup(props, { emit }) {
    const userActions = useUser();

    const username = ref("");
    const email = ref(null);
    const password = ref(null);
    const rep_password = ref(null);
    const isPswVisible = ref(false);

    const registerUserWithEmailAndPassword = async () => {
      const response = await userActions.registerUserWithEmailAndPassword(
        email.value,
        password.value
      );
      if (response) {
        // after create user update the display name
        await userActions.updateUser({ displayName: username.value });
        emit("closeDialog");
      }
    };

    const login = () => {
      emit("changeDialog");
    };

    const passwordsMatch = computed(() => {
      return password.value && password.value === rep_password.value;
    });

    // Inputs rules
    const usernameRules = [
      (val) => !!val || "Username is required",
      (val) =>
        (val.length >= 3 && val.length <= 15) || "Min 3 and max 15 characters",
    ];
    const emailRules = [
      (v) => !!v || "Email is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Please enter a valid email",
    ];
    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password must be at least 6 characters",
    ];
    const repeatPasswordRules = [
      (v) => !!v || "Repeat Password is required",
      (v) => v === password.value || "Passwords do not match",
    ];

    return {
      username,
      email,
      password,
      rep_password,
      isPswVisible,
      registerUserWithEmailAndPassword,
      usernameRules,
      emailRules,
      passwordRules,
      repeatPasswordRules,
      login,
      passwordsMatch,
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
