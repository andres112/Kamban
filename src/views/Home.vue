<template>
  <div class="home">
    <HelloWorld msg="Kamban@pp" />
    <small class="fixed-bottom-left q-pa-sm">version 1.0.0</small>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
