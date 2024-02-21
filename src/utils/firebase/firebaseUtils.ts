import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { auth } from "../../firebase";
import notify from "../../services/notificationService";
import userStore from "../../stores/userStore";
import { SignUpFormInputs } from "../../components/auth/SignUp/SignUp";
import { LoginFormInputs } from "../../components/auth/Login/Login";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const db = getDatabase();

const alertError = (error: any) => {
  const errorCode: string = error.code;
  const errorMessage = errorCode.slice(4);
  notify(errorMessage, "error");
};

export const registerUser = async (data: SignUpFormInputs) => {
  const name = data.email;
  const password = data.password;
  await sleep(2000);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, name, password);
    const user = userCredential.user;

    if (user) {
      await set(ref(db, "users/" + user.uid), {
        email: data.email,
        name: data.name,
        number: data.number,
        uid: user.uid,
      });

      userStore.setUser({ email: data.email, name: data.name, number: data.number, uid: user.uid });
      return true;
    }
  } catch (error: any) {
    alertError(error);
    return false;
  }
};

export const loginUser = async (data: LoginFormInputs) => {
  const email = data.email;
  const password = data.password;

  await sleep(1000);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    onValue(
      ref(db, "/users/" + user.uid),
      (snapshot) => {
        const userData = snapshot.val();
        const { email, name, number, uid } = userData;
        userStore.setUser({ email, name, number, uid });
      },
      {
        onlyOnce: true,
      }
    );

    return true;
  } catch (error: any) {
    alertError(error);
    return false;
  }
};
