// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8X4k_NZ4aKLwsXvB0IViv3c-w6EJv_A0",
  authDomain: "cogeb-property-sale-3f10a.firebaseapp.com",
  projectId: "cogeb-property-sale-3f10a",
  storageBucket: "gs://cojeb-property-sale-3f10a.appspot.com",
  messagingSenderId: "483531472357",
  appId: "1:483531472357:web:b1d4be16d4abbbf5cbc30c",
  measurementId: "G-85NW2J18MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseApp = app;  // Assurez-vous d'exporter l'instance d'application correcte
export const firebaseAnalytics = analytics;  // Exportez l'instance d'Analytics si nécessaire