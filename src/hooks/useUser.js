import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "@/firebase.js";
import { useRouter } from "vue-router";

const route = useRouter();

export const useUser = () => {
  const registerUserWithEmailAndPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = await result.user;
    if (user) {
      // await sendEmailVerification(auth.currentUser);
      route.push("/");
      // TODO: send email verification and the notification in the bottom of the screen
    }
  };
  const loginWithEmailAndPassword = async (email, password) => {};
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = await result.user;
      if (user) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await GoogleAuthProvider.credentialFromResult(
          result
        );
        const token = await credential.accessToken;
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

  return {
    registerUserWithEmailAndPassword,
    loginWithEmailAndPassword,
    loginWithGoogle,
  };
};
