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
      <q-card>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>

          <q-toolbar-title
            ><span class="text-weight-bold">Quasar</span>
            Framework</q-toolbar-title
          >

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          Here the login options
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
import { ref } from "vue";

export default {
  name: "HelloWorld",
  props: ["msg"],
  setup() {
    const isDialogOpen = ref(false);
    return { isDialogOpen };
  },
};
</script>
