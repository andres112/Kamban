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
        clearable
        aria-required="true"
        lazy-rules
        :disable="!!tempImg"
        :rules="imgUrlRules"
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
        @rejected="onImgFileRejected"
      >
        <template #append> <q-icon name="attach_file" /></template>
      </q-file>
      <small class="text-red">{{ validFile }}</small>
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
import { useDb } from "@/hooks/useDb";

export default {
  name: "AvatarManager",
  setup() {
    let validImage = false;
    const validFile = ref(null);
    const store = useStore();
    const imgUrl = ref(null);
    const imgFile = ref(null);
    const tempImg = ref(null);
    const loading = ref(false);

    const storageActions = useStorage();
    const userDbActions = useDb();

    const avatar = computed(() => {
      const photo =
        tempImg.value ||
        imgUrl.value ||
        store.state.user.userInfo?.photoURL ||
        require("@/assets/images/noavatar.svg");
      return photo;
    });

    const updateAvatar = async () => {
      loading.value = true;
      //TODO: check errors before sending, size, format...
      if (imgFile.value && !validFile.value) {
        // When image is from file
        // 1. Upload image to firebase storage
        await storageActions.uploadAvatar(imgFile.value);
        const imgUrl = await storageActions.downloadAvatar();
        // 2. Update user avatar
        await userDbActions.updateUserProfile({ photoURL: imgUrl });
        store.commit("user/setUserInfo", { photoURL: imgUrl });
      } else if (imgUrl.value && validImage) {
        // When image is from url
        // 1. Update user avatar directly
        await userDbActions.updateUserProfile({ photoURL: imgUrl.value });
        store.commit("user/setUserInfo", { photoURL: imgUrl.value });
      }
      loading.value = false;
    };

    const imgUrlRules = [
      async (v) => (await checkImgUrl(v)) || "Invalid image url",
    ];

    const checkImgUrl = async (url) => {
      try {
        if (url && url.length > 0) {
          const res = await fetch(url);
          const data = await res.blob();
          validImage = data.type.startsWith("image");
        }
      } catch (e) {
        console.log(e);
        validImage = false;
      }
      return validImage;
    };

    const onImgFileRejected = (file) => {
      switch (file[0]?.failedPropValidation) {
        case "max-file-size":
          validFile.value = "File size is too big. Max. 2Mb.";
          break;
        case "accept":
          validFile.value = "Invalid file format. Only png and jpg.";
          break;
        default:
          validFile.value = "Image upload failed.";
          break;
      }
    };

    watch(
      () => imgFile.value,
      (newValue) => {
        validFile.value = null;
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
      imgUrlRules,
      imgFile,
      validFile,
      onImgFileRejected,
      avatar,
      tempImg,
      updateAvatar,
      loading,
    };
  },
};
</script>
