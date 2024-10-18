
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js"
  import { getFirestore, collection, addDoc, getDocs, onSnapshot} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCNkwB40bZxwy7Q1URDcyUXLZLwJDgkgT4",
    authDomain: "repaso-d5ee8.firebaseapp.com",
    projectId: "repaso-d5ee8",
    storageBucket: "repaso-d5ee8.appspot.com",
    messagingSenderId: "634672466389",
    appId: "1:634672466389:web:9a69bb2d80e895d3e0155c"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
export const db = getFirestore();
export const saveTask = (title, description, userMail) => {
  addDoc(collection(db,"tasks"), {title,description,userMail})
}
export const getTasks = () => getDocs(collection(db,"tasks")); 
export const onGetTasks = (callback) => onSnapshot(collection(db,"tasks"), callback);