import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { app } from "../../config/firebase.config";

const db = getFirestore(app);

export const getExercises = (exerciceType) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerciseDoc = query(
        collection(db, "Exercises"),
        where("type", "==", exerciceType),
        orderBy("key", "asc")
      );
      const exerciseSnap = await getDocs(exerciseDoc);

      const exercises = [];
      if (exerciseSnap.docs.length) {
        exerciseSnap.docs.forEach((element) => exercises.push(element.data()));
      }
      resolve(exercises);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateExercise = (exercise) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerciseDoc = query(
        collection(db, "Exercises"),
        where("type", "==", exercise.type),
        where("key", "==", exercise.key)
      );
      const exerciseSnap = await getDocs(exerciseDoc);
      const exerciseId = exerciseSnap.docs[0].id;
      console.log(exerciseId);

      const exerciseRef = doc(db, "Exercises", exerciseId);

      await updateDoc(exerciseRef, {
        bienResuelto: exercise.bienResuelto,
        destacado: exercise.destacado,
        malResuelto: exercise.malResuelto,
        realizado: exercise.realizado,
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
