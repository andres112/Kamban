<template>
  <q-card class="login-card">
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
          v-model="email"
          label="Email"
          hint="username@correo.com"
          name="email"
          type="email"
          aria-required="true"
        >
          <template #append> <q-icon name="email" /></template>
        </q-input>
        <q-input
          v-model="password"
          label="Password"
          :type="isPswVisible ? 'text' : 'password'"
        >
          <template #append>
            <q-icon
              :name="isPswVisible ? 'visibility' : 'visibility_off'"
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
        >
          <template #append>
            <q-icon
              :name="isPswVisible ? 'visibility' : 'visibility_off'"
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
import { ref } from "vue";

export default {
  name: "Login",
  setup(props, { emit }) {
    const userActions = useUser();

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
        emit("closeDialog");
      }
    };

    const login = () => {
      emit("changeDialog");
    };

    return {
      email,
      password,
      rep_password,
      isPswVisible,
      registerUserWithEmailAndPassword,
      login,
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
