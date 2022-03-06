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
import { useNotification } from "@/hooks/useNotification";
import { watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    Navbar,
  },

  setup() {
    const store = useStore();
    const notificator = useNotification();

    watch(
      () => store.state.settings.alertNotification,
      () => {
        notificator.notify();
      },
      {
        deep: true,
      }
    );
    return {};
  },
};
</script>
