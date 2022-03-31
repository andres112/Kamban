<template>
  <q-header elevated class="q-px-md q-py-sm bg-indigo" v-if="isVisible">
    <q-toolbar>
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->

      <q-toolbar-title>
        <router-link
          class="text-h5 text-white"
          to="/main"
          style="text-decoration: none"
        >
          Kamban@pp
        </router-link>
      </q-toolbar-title>

      <q-btn round class="float-right">
        <q-avatar size="xl" v-if="avatar">
          <q-img :src="avatar" alt="user avatar" referrerpolicy="no-referrer" />
        </q-avatar>
        <q-avatar icon="face" size="xl" v-else />
        <q-menu fit anchor="bottom left" self="top right">
          <q-list style="min-width: 150px">
            <q-item class="column justify-center items-center">
              <q-avatar size="6rem" v-if="avatar">
                <q-img
                  :src="avatar"
                  alt="user avatar menu"
                  referrerpolicy="no-referrer"
                />
              </q-avatar>
              <q-avatar icon="face" size="6rem" v-else />
              <p class="text-h6 q-pt-none q-mb-none">{{ displayName }}</p>
              <small>{{ email }}</small>
            </q-item>
            <q-item
              v-close-popup
              class="row justify-center column q-gutter-y-xs"
            >
              <q-btn
                color="indigo"
                label="Profile"
                push
                size="md"
                v-close-popup
                to="/profile"
              />
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

    const avatar = computed(() => {
      return store.state.user.userInfo?.photoURL;
    });
    const email = computed(() => {
      return store.state.user.userInfo?.email;
    });
    const displayName = computed(() => {
      return store.state.user.userInfo?.displayName;
    });

    const logout = () => {
      userActions.logout();
    };
    return { isVisible, logout, avatar, email, displayName };
  },
};
</script>

<style></style>
