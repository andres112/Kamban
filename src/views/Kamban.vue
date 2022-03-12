<template>
  <q-page class="q-px-none">
    <dashboard />
  </q-page>
</template>

<script>
import Dashboard from "@/components/kamban/Dashboard.vue";
export default {
  name: "Kamban",
  components: {
    Dashboard,
  },
};
</script>

<style></style>
