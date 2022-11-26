import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6lOw_1cr26sk8qxqaKYaj7EcsepQTRuQ",
  authDomain: "todo-9fb94.firebaseapp.com",
  projectId: "todo-9fb94",
  storageBucket: "todo-9fb94.appspot.com",
  messagingSenderId: "444847021177",
  appId: "1:444847021177:web:baabc6e8d7e3e3290f88a8",
  measurementId: "G-0VRP17KJSM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
