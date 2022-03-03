<template>
  <q-header elevated class="q-px-md q-py-sm bg-indigo" v-if="isVisible">
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" />

      <q-toolbar-title class="text-h5">Kamban@pp</q-toolbar-title>

      <q-btn round class="float-right">
        <q-avatar size="xl" v-if="userAvatar">
          <img :src="userAvatar" />
        </q-avatar>
        <q-avatar icon="face" size="xl" v-else />
        <q-menu fit anchor="bottom left" self="top right">
          <q-list style="min-width: 150px">
            <q-item v-close-popup class="row justify-center">
              <q-btn
                color="red"
                label="Sing out"
                push
                size="md"
                v-close-popup
                @click.prevent="logout"
              />
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useUser } from "@/hooks/useUser";

export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const userActions = useUser();

    const isVisible = computed(() => {
      return store.state.settings.navbar?.isVisible;
    });

    const logout = () => {
      userActions.logout();
    };
    return { isVisible, logout };
  },
};
</script>

<style></style>
