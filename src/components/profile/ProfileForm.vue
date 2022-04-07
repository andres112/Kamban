<template>
  <q-card flat square>
    <q-card-section class="q-mb-md">
      <h3 class="q-mb-none">
        Profile
        <q-btn
          flat
          color="primary"
          size="1.2rem"
          icon="create"
          @click="edit = !edit"
        >
          <q-tooltip> Edit profile </q-tooltip>
        </q-btn>
      </h3>
      <small class="text-grey">User ID: {{ userId }}</small>
    </q-card-section>
    <q-card-section>
      <!-- Display name -->
      <q-input
        v-model="displayName"
        label="User name"
        name="display_name"
        type="text"
        aria-required="true"
        lazy-rules
        :readonly="!edit"
        :hint="
          edit
            ? 'Type your user name. It will be displayed in the profile page.'
            : null
        "
      >
      </q-input>
      <!-- Email -->
      <q-input
        v-model="email"
        label="Email"
        name="email"
        type="email"
        aria-required="true"
        lazy-rules
        :readonly="!edit"
        :hint="
          edit
            ? 'Type your email. It will be used to login to the system.'
            : null
        "
      >
      </q-input>
      <!-- Phone -->
      <q-input
        v-model="phone"
        label="Phone Number"
        name="phone"
        type="phone"
        aria-required="true"
        lazy-rules
        :readonly="!edit"
        :hint="
          edit
            ? 'Ingress your phone number. '
            : null
        "
      >
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const edit = ref(false);
    const userId = computed(() => store.state.user.userId);
    const displayName = computed(() => store.state.user.userInfo?.displayName);
    const email = computed(() => store.state.user.userInfo?.email);
    const phone = computed(
      () => store.state.user.userInfo?.phoneNumber || "No phone"
    );
    return { userId, displayName, email, phone, edit };
  },
};
</script>

<style></style>
