<template>
  <q-layout view="lHh Lpr lFf">
    <navbar />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "LayoutDefault",
  components: {
    Navbar
  },

  setup() {
    return {};
  },
};
</script>
