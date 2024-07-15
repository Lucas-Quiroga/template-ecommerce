import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import type { FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { FirebaseStorage, StorageReference } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENT_ID,
};

let app: FirebaseApp;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

const analytics = getAnalytics(app);

export const storage: FirebaseStorage = getStorage(app);
const uuid: `${string}-${string}-${string}-${string}-${string}` =
  crypto.randomUUID();

/**
 * Uploads an image file to Firebase storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise <String>} The download URL of the uploaded image.
 */
export async function uploadImage(file: File): Promise<string> {
  const storageRef: StorageReference = ref(storage, `products/${uuid}`);
  await uploadBytes(storageRef, file);
  const url: string = await getDownloadURL(storageRef);
  return url;
}

export default app;
