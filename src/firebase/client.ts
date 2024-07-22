import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import type { FirebaseApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { FirebaseStorage, StorageReference } from "firebase/storage";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "astro:env/client";

// configuración de Firebase
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
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
  try {
    const storageRef = ref(storage, crypto.randomUUID());

    const snapshot = await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Stack trace:", error.stack);

      // Verificar si el error es de Firebase y tiene un código
      if ("code" in error) {
        console.error("Código de error:", (error as { code: string }).code);
      }
    }

    // Puedes personalizar el mensaje de error según el tipo de error
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string };
      switch (firebaseError.code) {
        case "storage/unauthorized":
          throw new Error("No tienes permiso para subir este archivo.");
        case "storage/canceled":
          throw new Error("La subida del archivo fue cancelada.");
        case "storage/unknown":
          throw new Error("Ocurrió un error desconocido durante la subida.");
        default:
          throw new Error(`Error al subir el archivo: ${error.message}`);
      }
    } else {
      throw new Error(
        "Ocurrió un error inesperado durante la subida del archivo."
      );
    }
  }
}
export default app;
