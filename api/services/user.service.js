import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDoc, getFirestore, updateDoc, doc, collection } from "firebase/firestore";
import { app, auth } from "../../config/firebase.config";
import { UserModel } from "../../common/models/user.model";

const db = getFirestore(app);

export const authenticate = (email, pwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authenticated = await signInWithEmailAndPassword(auth, email, pwd);
      if (authenticated.user) {
        const userRef = doc(db, `Users/${authenticated.user.uid}`);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          resolve(userSnap.data());
        } else {
          resolve(null);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const createAccount = (email, pwd, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authenticated = await createUserWithEmailAndPassword(auth, email, pwd);
      if (authenticated.user) {
        const createdUserInfo = await createExtraInformation(user);
        if (createdUserInfo) {
          resolve(authenticated.user.uid);
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
      const userSnapshot = await addDoc(collection(db, "Users"), {
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
