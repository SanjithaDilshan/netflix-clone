import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDSxi9a_aVWiHKsjQEsdn3ucKAj-uqC8sQ",
  authDomain: "netflix-clone-d80e0.firebaseapp.com",
  projectId: "netflix-clone-d80e0",
  storageBucket: "netflix-clone-d80e0.firebasestorage.app",
  messagingSenderId: "407973059412",
  appId: "1:407973059412:web:0bc120c048b34b5e5046c1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    const message =
      error && error.code
        ? error.code.split("/")[1].split("-").join(" ")
        : error && error.message
        ? error.message
        : "Signup failed";
    toast.error(message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
