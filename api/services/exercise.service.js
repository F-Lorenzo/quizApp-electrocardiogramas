import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  setDoc,
  doc,
  updateDoc,
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
        exerciseSnap.docs.forEach((element) => {
          const exercise = {
            id: element.id,
            ...element.data(),
          };
          exercises.push(exercise);
        });
      }
      resolve(exercises);
    } catch (error) {
      reject(error);
    }
  });
};

export const createUserExercise = (user, status, exercise) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userExercises = await createExercise(user, status, exercise);
      resolve(userExercises);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateExercise = async (userId, exercises) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(exercises);
      await updateDoc(doc(db, "Users", userId), {
        exercises: exercises,
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const createExercise = async (user, status, exercise) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerci = {
        status: status,
        type: exercise.type,
        key: exercise.key,
        respuestas: exercise.respuestas,
      };

      if (exercise.type !== "Completar") {
        exerci.level = exercise.level;
      }

      const userExercises = [...(user.exercises ? user.exercises : []), exerci];
      await updateDoc(doc(db, "Users", user.id), {
        exercises: userExercises,
      });

      resolve(userExercises);
    } catch (error) {
      reject(error);
    }
  });
};
