<template>
  <q-card flat square class="q-pt-sm">
    <!-- image section -->
    <q-img
      :src="avatar"
      referrerpolicy="no-referrer"
      class="q-pa-md q-mx-auto"
      fit="contain"
      style="max-width: 750px; height: 500px"
      alt="user avatar"
    >
      <template #loading>
        <div class="text-subtitle1 text-white">Loading...</div>
      </template>
    </q-img>
    <q-card-section>
      <!-- image from url section -->
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
      <!-- image from file section -->
      <!-- TODO: add error notifications  -->
      <q-file
        v-model="imgFile"
        label="Image from file"
        accept=".jpg, .png"
        max-file-size="2048000"
        :multiple="false"
        class="q-mt-md"
        clearable
        hint="Max. 2Mb"
      >
        <template #append> <q-icon name="attach_file" /></template>
      </q-file>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        color="blue"
        @click.prevent="updateAvatar()"
        label="Update Avatar"
        :loading="loading"
      >
        <template #loading>
          <q-spinner color="white" />
        </template>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useStorage } from "@/hooks/useStorage";
import { useUser } from "@/hooks/useUser";

export default {
  name: "AvatarManager",
  setup() {
    const store = useStore();
    const imgUrl = ref(null);
    const imgFile = ref(null);
    const tempImg = ref(null);
    const loading = ref(false);

    const storageActions = useStorage();
    const userActions = useUser();

    const avatar = computed(() => {
      const photo =
        tempImg.value ||
        imgUrl.value || //TODO: check if url is valid
        store.state.user.userInfo?.photoURL ||
        require("@/assets/images/noavatar.svg");
      return photo;
    });

    const updateAvatar = async () => {
      loading.value = true;
      let newImg = null;
      //TODO: check errors before sending, size, format...
      if (imgFile.value) {
        // When image is from file
        // 1. Upload image to firebase storage
        await storageActions.uploadAvatar(imgFile.value);
        const imgUrl = await storageActions.downloadAvatar();
        // 2. Update user avatar
        await userActions.updateUser({ photoURL: imgUrl });
        newImg = imgUrl;
        console.log("update avatar from file: ", imgUrl);
      } else if (imgUrl.value) {
        // When image is from url
        // 1. Update user avatar directly
        await userActions.updateUser({ photoURL: imgUrl.value });
        newImg = imgUrl.value;
        console.log("update avatar from url: ", imgUrl.value);
      }
      store.commit("user/setUserInfo", { photoURL: newImg });
      loading.value = false;
    };

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
      updateAvatar,
      loading,
    };
  },
};
</script>
