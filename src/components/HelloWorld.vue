<template>
  <q-page class="flex flex-center">
    <h1 class="text-center">{{ msg }}</h1>
    <img
      alt="Quasar logo"
      src="../assets/logo.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "HelloWorld",
  props: ["msg"],
  setup() {
    return {};
  },
};
</script>
