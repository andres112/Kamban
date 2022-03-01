<template>
  <q-page>
    <h1>Profile</h1>
    <pre>{{ user }}</pre>
    <q-btn to="/settings" label="to Settings"></q-btn>
  </q-page>
</template>

<script>
import { useUser } from "@/hooks/useUser";
import { computed } from "vue";

export default {
  name: "Profile",
  setup() {
    const userActions = useUser();
    const user = computed(() => userActions.user);
    return { user };
  },
};
</script>
