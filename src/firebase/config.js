import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyCe5Bu2op72TyOUm3rw6pQxPqWn9RBRUko",
  authDomain: "moneyspent-6a7d4.firebaseapp.com",
  projectId: "moneyspent-6a7d4",
  storageBucket: "moneyspent-6a7d4.appspot.com",
  messagingSenderId: "662491649192",
  appId: "1:662491649192:web:d0029628c5ae17d361de9d"
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore()
const auth = getAuth()

// timestamp


export {db, auth}
