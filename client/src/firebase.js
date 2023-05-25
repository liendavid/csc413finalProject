// I will change the rules to private after a week or two
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFhE4vEreJxG57SaT3KuTBHnYWOcqYalY",
  authDomain: "teamlucky.firebaseapp.com",
  projectId: "teamlucky",
  storageBucket: "teamlucky.appspot.com",
  messagingSenderId: "559982895314",
  appId: "1:559982895314:web:bfb74eb76feeebf2f80d0b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);