import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, provider } from "@/firebase.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export const useUser = () => {
  const route = useRouter();
  const store = useStore();

  // get the current user, if null user is not signed in

  const registerUserWithEmailAndPassword = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      sendEmail("One email was sent, please verify. ", "info");
      return true;
    } catch (error) {
      console.error(error.code, error.message);
      return false;
    }
  };

  const updateUser = async (data) => {
    const ALLOWED_PARAMS = ["displayName", "photoURL", "phoneNumber"];
    let cleanData = {};
    for (let key in data) {
      if (ALLOWED_PARAMS.includes(key)) {
        cleanData[key] = data[key];
      }
    }
    try {
      await updateProfile(auth.currentUser, cleanData);
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = await result.user;
      if (!user.emailVerified) {
        sendEmail("The email verification is pending. ", "warning");
      }
      route.push("/main");
    } catch (error) {
      console.error(error.code, "....", error.message);
      if (error.code === "auth/user-not-found") {
        store.commit("settings/setAlertNotification", {
          text: "The user account was not found. ",
          type: "negative",
        });
      }
    }
  };
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = await result.user;
      if (user) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = await GoogleAuthProvider.credentialFromResult(
        //   result
        // );
        // const token = await credential.accessToken;
        route.push("/main");
      }
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.warn(
        `${errorCode}: ${errorMessage} \n ${email} \n ${credential}`
      );
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      route.push("/");
    } catch (error) {
      console.warn(error);
    }
  };

  const sendEmail = async (msgNotification, type) => {
    await sendEmailVerification(auth.currentUser);
    store.commit("settings/setAlertNotification", {
      text: msgNotification,
      type: type,
    });
  };

  return {
    registerUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
    updateUser,
    sendEmail,
  };
};
