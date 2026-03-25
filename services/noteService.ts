import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  getDoc
} from "firebase/firestore";

export function subscribeNotes(userId: string, callback: any) {
  const q = query(collection(db, "notes"), where("userId", "==", userId));

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(data);
  });
}

export async function createNote(userId: string, note: any) {
  await addDoc(collection(db, "notes"), {
    ...note,
    userId
  });
}

export async function deleteNote(id: string) {
  await deleteDoc(doc(db, "notes", id));
}

export async function updateNote(id: string, data: any) {
  await updateDoc(doc(db, "notes", id), data);
}

export async function getNoteById(id: string) {
  const ref = doc(db, "notes", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }

  return null;
}