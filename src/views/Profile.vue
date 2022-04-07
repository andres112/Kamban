<template>
  <q-page>
    <div class="row justify-center q-col-gutter-md">
      <div class="col-11 col-md-5">
        <avatar-manager />
      </div>
      <div class="col-11 col-md-6">
        <profile-form />
        <!-- <pre>{{ userInfo }}</pre> -->
        <q-btn to="/settings" label="Settings"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AvatarManager from "@/components/profile/AvatarManager.vue";
import ProfileForm from "@/components/profile/ProfileForm.vue";

export default {
  name: "Profile",
  components: { AvatarManager, ProfileForm },
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
