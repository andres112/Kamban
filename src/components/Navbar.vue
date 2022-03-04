<template>
  <q-header elevated class="q-px-md q-py-sm bg-indigo" v-if="isVisible">
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" />

      <q-toolbar-title class="text-h5">Kamban@pp</q-toolbar-title>
      {{ avatar }}

      <q-btn round class="float-right">
        <q-avatar size="xl" v-if="avatar">
          <img :src="avatar" />
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
import { ref, computed, onMounted } from "vue";
import { useUser } from "@/hooks/useUser";

export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const userActions = useUser();
    const currentUser = ref({});

    const isVisible = computed(() => {
      return store.state.settings.navbar?.isVisible;
    });

    onMounted(async () => {
      currentUser.value = await userActions.user();
    });

    // TODO: implement and state for rendering avatar and user info
    const avatar = computed(() => {
      return currentUser.value?.providerData;
    });

    const logout = () => {
      userActions.logout();
    };
    return { isVisible, logout, currentUser, avatar };
  },
};
</script>

<style></style>
