import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlKHBKTzSDP_GZTWSDmSlrORET793N5GY",
  authDomain: "quizapp-ca661.firebaseapp.com",
  projectId: "quizapp-ca661",
  storageBucket: "quizapp-ca661.appspot.com",
  messagingSenderId: "213854345850",
  appId: "1:213854345850:web:3ffe141a3c1d7ded3c79c3",
  measurementId: "G-TCMW7Z59W4",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
