import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { type Product } from "@/types/types";

//funcion para obtener un producto

export const getProduct = async (
  id: string
): Promise<
  FirebaseFirestore.DocumentSnapshot<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >
> => {
  const db: FirebaseFirestore.Firestore = getFirestore(app);
  const productRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  > = db.collection("products");
  const productSnapshot: FirebaseFirestore.DocumentSnapshot<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  > = await productRef.doc(id).get();

  return productSnapshot;
};
