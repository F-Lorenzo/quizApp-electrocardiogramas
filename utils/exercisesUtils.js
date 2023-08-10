export const checkExerciseCompleted = (user, key) => {
  return new Promise((resolve, reject) => {
    try {
      if (user.exercises) {
        const idx = user.exercises.findIndex((exercise) => exercise.key === key);
        resolve(idx !== -1 ? idx : -1);
      } else {
        resolve(-1);
      }
    } catch (error) {
      reject(error);
    }
  });
};
