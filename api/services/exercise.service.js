import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../config/firebase.config";

const db = getFirestore(app);

export const getExercises = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerciseDoc = query(collection(db, "Exercises"));
      const exerciseSnap = await getDocs(exerciseDoc);

      if (exerciseSnap.docs.length) {
        const exercises = [];
        exerciseSnap.docs.forEach((element) => exercises.push(element.data()));
        resolve(exercises);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};
