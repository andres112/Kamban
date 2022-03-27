<template>
  <q-layout view="lHh Lpr lFf" @resize="trackDisplaySize">
    <navbar />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { useNotification } from "@/hooks/useNotification";
import { watch, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "LayoutDefault",
  components: {
    Navbar,
  },

  setup() {
    const store = useStore();
    const notificator = useNotification();
    onBeforeMount;

    onBeforeMount(() => {
      trackDisplaySize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    const trackDisplaySize = (size) => {
      console.log(size);
      store.commit("settings/setMobile", size.width < 1024);
    };

    watch(
      () => store.state.settings.alertNotification,
      () => {
        notificator.notify();
      },
      {
        deep: true,
      }
    );
    return { trackDisplaySize };
  },
};
</script>
