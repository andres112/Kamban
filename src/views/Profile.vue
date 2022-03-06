<template>
  <q-page>
    <h1>Profile</h1>
    <pre>{{ userInfo }}</pre>
    <q-btn to="/settings" label="to Settings"></q-btn>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "Profile",
  setup() {
    const store = useStore();

    // this logic in component

    const userInfo = computed(() => {
      return store.state.user.userInfo;
    });

    return { userInfo };
  },
};
</script>
