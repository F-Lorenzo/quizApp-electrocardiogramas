import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  getDoc,
  getFirestore,
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { app, auth } from "../../config/firebase.config";
import store from "../../redux/store";
import { updateUser } from "../../redux/reducers/user.reducer";

const db = getFirestore(app);

export const authenticate = (email, pwd) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authenticated = await signInWithEmailAndPassword(auth, email, pwd);
      if (authenticated.user) {
        const findUser = await findUserById(authenticated.user.uid);

        if (findUser) {
          const user = {
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            userPwd: pwd,
            userEmail: email,
          };
          resolve(user);
        } else {
          await logout();
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
        user.id = authenticated.user.uid;
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
        email: user.newEmail,
      });

      console.log(user.originalPassword);

      await reauthenticateWithCredential(
        auth.currentUser,
        EmailAuthProvider.credential(user.originalEmail, user.originalPassword)
      );
      await updateEmail(auth.currentUser, user.newEmail);
      if (user.newPassword.length != 0) {
        await updatePassword(auth.currentUser, user.newPassword);
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const createExtraInformation = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(doc(db, "Users", user.id), {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const findUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDoc = query(collection(db, "Users"), where("id", "==", id));
      const userSnap = await getDocs(userDoc);

      if (userSnap.docs.length) {
        resolve(userSnap.docs[0].data());
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await auth.signOut();
      store.dispatch(updateUser(null));
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
