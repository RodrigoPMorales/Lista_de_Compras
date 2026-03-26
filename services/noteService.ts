import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

function getUserNotesRef(userId: string) {
  return collection(db, "users", userId, "notes");
}

export async function createNote(userId: string, note: any) {
  return await addDoc(getUserNotesRef(userId), {
    ...note,
    createdAt: new Date()
  });
}

export async function getNotes(userId: string) {
  const q = query(getUserNotesRef(userId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export function subscribeNotes(userId: string, callback: any) {
  const q = query(
    getUserNotesRef(userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(data);
  });
}

export async function getNoteById(userId: string, id: string) {
  const ref = doc(db, "users", userId, "notes", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
}

export async function updateNote(userId: string, id: string, data: any) {
  return await updateDoc(doc(db, "users", userId, "notes", id), data);
}

export async function deleteNote(userId: string, id: string) {
  return await deleteDoc(doc(db, "users", userId, "notes", id));
}