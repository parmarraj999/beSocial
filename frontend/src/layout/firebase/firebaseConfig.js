import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPvwiDtY5tzeVqYXPgWeSrZHH7oK_w-cc",
  authDomain: "besocial-b3064.firebaseapp.com",
  projectId: "besocial-b3064",
  storageBucket: "besocial-b3064.appspot.com",
  messagingSenderId: "917802026320",
  appId: "1:917802026320:web:65a350a82467d758799855"
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage();

export {firebaseStorage};