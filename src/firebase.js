import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAtP-uAD1iyOXD7P51e0WAs3yJk9xeUetU",
  authDomain: "fb-crud-react-f2039.firebaseapp.com",
  databaseURL: "https://fb-crud-react-f2039.firebaseio.com",
  projectId: "fb-crud-react-f2039",
  storageBucket: "fb-crud-react-f2039.appspot.com",
  messagingSenderId: "453405780519",
  appId: "1:453405780519:web:6f4a179ee01be265983c02"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();