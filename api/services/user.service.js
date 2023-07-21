import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, updateDoc } from "firebase/firestore";

export const login = (email, pwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authenticated = await signInWithEmailAndPassword(email, pwd);
      if (authenticated.user) {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const register = (email, pwd, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authenticated = await createUserWithEmailAndPassword(email, pwd);
      if (authenticated.user) {
        const createdUserInfo = createExtraInformation(user);
        if (createdUserInfo) {
          resolve(true);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const update = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(db, `Users/${user.id}`);
      await updateDoc(userRef, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const createExtraInformation = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userSnapshot = await addDoc("Users", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
      });

      if (userSnapshot.id) {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};
