import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwxna-4ZE08WkFCA_5IUqvxTDfkEzgaDI",
  authDomain: "sociogram-world.firebaseapp.com",
  databaseURL: "https://sociogram-world.firebaseio.com",
  projectId: "sociogram-world",
  storageBucket: "sociogram-world.appspot.com",
  messagingSenderId: "598795257178",
  appId: "1:598795257178:web:1fedc61b897958bbe51f63",
  measurementId: "G-41LM849Y5K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const persistence = firebase.auth.Auth.Persistence.LOCAL;

export { db, storage, auth, provider, persistence };
