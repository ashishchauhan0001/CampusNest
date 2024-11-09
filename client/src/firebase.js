// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmcFaDw57DOMmNX5YTOMy0JzJBcXz3bRc",
  authDomain: "campusnest-346ce.firebaseapp.com",
  projectId: "campusnest-346ce",
  storageBucket: "campusnest-346ce.appspot.com",
  messagingSenderId: "329308652667",
  appId: "1:329308652667:web:5487ea9890b46dde4bcede"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Export storage for image uploads
