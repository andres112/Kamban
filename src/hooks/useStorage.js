import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.js";
import { useStore } from "vuex";

export const useStorage = () => {
  const store = useStore();

  const uploadAvatar = async (file) => {
    try {
      // create the reference for the file
      const imgRef = ref(storage, `users/${store.state.user.userId}/avatar`);
      // send as blob or file type
      const snapshot = await uploadBytes(imgRef, file);
      console.log(snapshot);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const downloadAvatar = async () => {
    try {
      const imgRef = ref(storage, `users/${store.state.user.userId}/avatar`);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      console.error(error.code, error.message);
      return null;
    }
  };

  return { uploadAvatar, downloadAvatar };
};
