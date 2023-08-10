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
      switch (status) {
        case "destacado": {
          createDestacadoExercise();
        }
        case "correcto": {
          const userExercises = await createCorrectoExercise(user, exercise);
          resolve(userExercises);
        }
        case "incorrecto": {
          createIncorrectoExercise();
        }
        case "realizado": {
          createRealizadoExercise();
        }
        default:
          reject("No se ha proporcionado un tipo de ejercicio valido");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const createCorrectoExercise = async (user, exercise) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerci = {
        status: "correcto",
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
