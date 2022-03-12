<template>
  <div class="home">
    <Home msg="Kamban@pp" />
    <small class="fixed-bottom-left q-pa-sm">version 1.0.0</small>
  </div>
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
