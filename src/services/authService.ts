import app from "@/firebase/client";

import {
  getAuth,
  createUserWithEmailAndPassword,
  type Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import type { UserCredential, User } from "firebase/auth";

const auth: Auth = getAuth();
const db: Firestore = getFirestore(app);

export const registerAdmin = async (
  auth: Auth,
  email: string,
  password: string
): Promise<void> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // agregamos el nuevo usuario

    await setDoc(doc(db, "admin", user.uid), {
      email: user.email,
    });
  } catch (error) {
    throw error;
  }
};

export const loginAdmin = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};
