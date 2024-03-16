import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getComplitionIndex } from "./helper";
import { HabitAPI } from "./types";

export const initializeAPI = () => {
  initializeApp({
    apiKey: "AIzaSyB-44Rf6Q1KQGU3XEJJ1pgO9_z8EgcOMtA",
    authDomain: "habits-tracker-13e9b.firebaseapp.com",
    projectId: "habits-tracker-13e9b",
    storageBucket: "habits-tracker-13e9b.appspot.com",
    messagingSenderId: "828922072297",
    appId: "1:828922072297:web:a84271b12c99044ea5b478",
  });

  getFirestore();
};

export const apiGetHabit = async (id: string): Promise<HabitAPI | null> => {
  const db = getFirestore();

  try {
    const querySnapshot = await getDoc(doc(db, "habits", id));

    if (querySnapshot.exists()) {
      const data = querySnapshot.data() as Omit<HabitAPI, "id">;

      return {
        id: querySnapshot.id,
        ...data,
      };
    } else {
      return null;
    }
  } catch (error) {}

  return null;
};

export const apiGetHabits = async (): Promise<HabitAPI[]> => {
  const result: HabitAPI[] = [];
  const db = getFirestore();
  try {
    const q = query(collection(db, "habits"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<HabitAPI, "id">;
      result.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

export interface HabitSaveData {
  name: string;
}

export const apiSaveNewHabit = async (
  data: HabitSaveData
): Promise<HabitAPI | null> => {
  const newDoc: Omit<HabitAPI, "id"> = {
    ...data,
    createdAt: Timestamp.now(),
    completionHistory: [],
  };
  const db = getFirestore();

  try {
    const docRef = await addDoc(collection(db, "habits"), newDoc);
    const doc = await apiGetHabit(docRef.id);

    if (doc !== null) {
      return doc;
    }
  } catch (error) {}

  return null;
};

export const apiUpdateHabit = async (
  id: string,
  data: Partial<HabitSaveData>
): Promise<HabitAPI | null> => {
  const db = getFirestore();

  try {
    await updateDoc(doc(db, "habits", id), {
      ...data,
    });
    const updatedDoc = await apiGetHabit(id);
    if (updatedDoc !== null) {
      return updatedDoc;
    }
  } catch (error) {}

  return null;
};

export const apiDeleteHabit = async (id: string): Promise<void> => {
  const db = getFirestore();

  try {
    await deleteDoc(doc(db, "habits", id));
  } catch (error) {}
};

export const apiUpdateHabitCompletion = async (
  id: string,
  checked: boolean
): Promise<HabitAPI | null> => {
  const db = getFirestore();

  try {
    const habit = await apiGetHabit(id);
    if (!habit) {
      return null;
    }

    const completionIndex = getComplitionIndex(habit);

    if (checked) {
      if (completionIndex === -1) {
        (habit.completionHistory as Timestamp[]).push(Timestamp.now());
        await updateDoc(doc(db, "habits", id), {
          completionHistory: habit.completionHistory,
        });
        return await apiGetHabit(id);
      }
    } else {
      if (completionIndex !== -1) {
        habit.completionHistory.splice(completionIndex, 1);
        await updateDoc(doc(db, "habits", id), {
          completionHistory: habit.completionHistory,
        });
        return await apiGetHabit(id);
      }
    }
  } catch (error) {
    console.error("Error updating habit completion:", error);
  }

  return null;
};
