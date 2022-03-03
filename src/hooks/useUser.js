import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "@/firebase.js";
import { useRouter } from "vue-router";

export const useUser = () => {
  const route = useRouter();

  // get the current user, if null user is not signed in
  const currentUser = auth.currentUser;

  const registerUserWithEmailAndPassword = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await result.user;
      console.dir(user);
      return true;
      // TODO: Send email verification
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
      if (user) {
        //TODO: redirect to kamban page
        route.push("/profile");
      }
    } catch (error) {
      console.error(error.code, error.message);
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
        route.push("/profile");
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

  return {
    registerUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
    updateUser,
    currentUser,
  };
};
