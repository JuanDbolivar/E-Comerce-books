// require("dotenv").config();
// const {
//   APIKEY,
//   AUTHDOMAIN,
//   PROJECTID,
//   STORAGEBUCKET,
//   MESSAGEINGSENDERID,
//   APPID,
//   MEASUREMENTID,
// } = process.env;

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyD8YaXo--oOX3q7PTrWxoSPMD4mpj_nwkk",
  authDomain: "pf-libros.firebaseapp.com",
  projectId: "pf-libros",
  storageBucket: "pf-libros.appspot.com",
  messagingSenderId: "601095860784",
  appId: "1=601095860784:web:d164cf8041e58615b833f5",
  measurementId: "G-378VP0SD3W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

export const storage = getStorage(app);

export async function uploadImage(file) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const URL = await getDownloadURL(storageRef);
  return URL;
}
