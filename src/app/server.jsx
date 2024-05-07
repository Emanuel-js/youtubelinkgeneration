import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDocs ,collection, addDoc} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCLtqfltm4lodFFla6Y48daEKLgg1DdUvQ",
  authDomain: "linkgeneration-c4a03.firebaseapp.com",
  projectId: "linkgeneration-c4a03",
  storageBucket: "linkgeneration-c4a03.appspot.com",
  messagingSenderId: "775368900598",
  appId: "1:775368900598:web:6ed7b3a3e6c07b29e451d7",
  measurementId: "G-0ZB170975G"
};

// Initialize Firebase
let firebase_app = initializeApp(firebaseConfig)
const db = getFirestore(firebase_app)

 export async function getData(dbname) {

  const dbInstance = collection(db, dbname);
  const data = []; // Array to hold all documents' data
  try {
    const querySnapshot = await getDocs(dbInstance);
    querySnapshot.forEach((doc) => {
      data.push(doc.data()); // Push each document's data into the array
    });
    return data; // Return the array containing all documents' data
  } catch (e) {
    console.error('Error reading document: ', e);
    return []; // Return an empty array in case of error
  }
}

export  async function addData(dbnmae, data) {
  const dbInstance = collection(db, dbnmae);

  try {
    await addDoc(dbInstance,{
      url: data.url

    });
    console.log('Document successfully written!');
  } catch (e) {
    console.error('Error writing document: ', e);
  }

}

export default firebase_app;
