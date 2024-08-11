import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";  // Ensure these are imported
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDZcubX3D6yBzT5xyolOzURbSIYnB5TCdU",
  authDomain: "netflix-clone-96e31.firebaseapp.com",
  projectId: "netflix-clone-96e31",
  storageBucket: "netflix-clone-96e31.appspot.com",
  messagingSenderId: "684653486274",
  appId: "1:684653486274:web:1b80b40111de8c207a5b5b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
