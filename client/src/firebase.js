// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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