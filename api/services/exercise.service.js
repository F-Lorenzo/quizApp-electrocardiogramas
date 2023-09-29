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
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import { app } from "../../config/firebase.config";
import {
  COMPLETAR,
  CONSIDERACIONES,
  INTERPRETACION,
  MULTIPLE_CHOICE,
} from "../../config/exercisesType";

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

export const getExercisesInterpretacion = (level) => {
  return new Promise(async (resolve, reject) => {
    try {
      const exerciseDoc = query(
        collection(db, "Exercises"),
        where("type", "==", INTERPRETACION),
        where("nivel", "==", Number(level)),
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
        status: [status],
        type: exercise.type,
        key: exercise.key,
        respuestas: exercise.respuestas,
      };

      if (
        exercise.type !== COMPLETAR &&
        exercise.type !== MULTIPLE_CHOICE &&
        exercise.type !== CONSIDERACIONES
      ) {
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

export const getInterpretaciones = (level) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = getStorage();

      const listRef = ref(storage, `images/interpretacion/nivel${level}`);

      const imagesList = await listAll(listRef);

      resolve(imagesList.items);
    } catch (error) {
      reject(error);
    }
  });
};

export const getImageExercise = (level, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let images = [];
      const storage = getStorage();

      const listRef = ref(storage, `images/interpretacion/nivel${level}/${key}`);
      const url = await getDownloadURL(listRef);
      console.log(url);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};
