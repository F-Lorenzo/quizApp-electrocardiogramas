import { getFirestore, collection, query, where, getDocs, orderBy } from "firebase/firestore";
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
