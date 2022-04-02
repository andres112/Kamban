<template>
  <q-card flat square class="q-pt-sm">
    <img
      :src="avatar"
      referrerpolicy="no-referrer"
      class="q-pa-md q-mx-auto"
      fit="contain"
      style="max-width: 750px; height: 500px;"
      alt="user avatar"
    />
    <q-card-section>
      <q-input
        v-model="imgUrl"
        label="Image from url"
        hint="Type or paste image url"
        name="img_url"
        type="url"
        aria-required="true"
        :disable="!!tempImg"
      >
        <template #append> <q-icon name="link" /></template>
      </q-input>
      <q-file
        v-model="imgFile"
        label="Image from file"
        accept=".jpg, .png"
        max-file-size="2048000"
        :multiple="false"
        class="q-mt-md"
        clearable
      >
        <template #append> <q-icon name="attach_file" /></template>
      </q-file>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn color="blue" @click.prevent="updateAvatar()" label="Update Avatar">
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "AvatarManager",
  setup() {
    const store = useStore();
    const imgUrl = ref(null);
    const imgFile = ref(null);
    const tempImg = ref(null);

    const avatar = computed(() => {
      const photo =
        tempImg.value ||
        store.state.user.userInfo?.photoURL ||
        require("@/assets/images/noavatar.svg");
      return photo;
    });

    watch(
      () => imgFile.value,
      (newValue) => {
        if (!newValue) {
          tempImg.value = null;
          return;
        }
        // get the temporal url of the image
        const reader = new FileReader();
        reader.readAsDataURL(imgFile.value);
        reader.onload = () => {
          console.log(reader.result);
          tempImg.value = reader.result;
        };
      },
      { deep: true }
    );

    return {
      imgUrl,
      imgFile,
      avatar,
      tempImg,
    };
  },
};
</script>
