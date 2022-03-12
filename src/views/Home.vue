<template>
  <q-page>
    <Home msg="Kamban@pp" />
    <small class="fixed-bottom-left q-pa-sm">version 1.0.0</small>
  </q-page>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";

export default {
  name: "HomeView",
  components: {
    Home,
  },
};
</script>
