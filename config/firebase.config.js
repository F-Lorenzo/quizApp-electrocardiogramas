import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAgvfdfqg3JS7eROLmDeLJSBjSZ1WZtxX8",
  authDomain: "quizapp-electrocardiogramas.firebaseapp.com",
  projectId: "quizapp-electrocardiogramas",
  storageBucket: "quizapp-electrocardiogramas.appspot.com",
  messagingSenderId: "748239632161",
  appId: "1:748239632161:web:6e1a4008a7df9b03833060",
  measurementId: "G-TVBE0F6ZM4",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
