import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIuKSP4-8YTuc7_SPhixrGsJuEY6f1Sqw",
  authDomain: "social-media-60ca9.firebaseapp.com",
  projectId: "social-media-60ca9",
  storageBucket: "social-media-60ca9.appspot.com",
  messagingSenderId: "893897109619",
  appId: "1:893897109619:web:52c32a995a5b02c8a73a06"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);