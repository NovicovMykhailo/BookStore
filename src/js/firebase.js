// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { getDatabase , ref, set, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJl6Ad8jyFnNkdyvWS-vuWG1MshoteFzQ",
  authDomain: "fir-test-66ebf.firebaseapp.com",
  projectId: "fir-test-66ebf",
  storageBucket: "fir-test-66ebf.appspot.com",
  messagingSenderId: "523632472781",
  appId: "1:523632472781:web:4fa322122471b6e0be2f84",
  measurementId: "G-VSQ4DDXZKJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();

const email = "goit@gmail.com";
const password = "1qaz2wsx";


const loginEmailPassword = async () => {
	const loginEmail = email;
	const loginPassword = password;

	
	try {
		const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		console.log(userCredential);
		console.log("It`s work:" + userCredential.user.email);	
		writeUserData(userCredential.user.uid, "Test", userCredential.user.email, "Hello I work and change", "id45985bookOne");
		readDatabase(userCredential.user.uid);
	} catch (error) {
		console.log(error);
	}
}

const createAccount = async () => {
	const loginEmail = email;
	const loginPassword = password;

	
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
		console.log(userCredential.user);	
	} catch (error) {
		console.log(error);
	}
}
// createAccount();
loginEmailPassword();


// database

const database = getDatabase();


function writeUserData(userId, name, email, information, bookId) {
	const db = getDatabase();
	set(ref(db, 'users/' + userId), {
		username: name,
		email: email,
		interistingInformation: information,
		bookIdDB: bookId
	});
}

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

function readDatabase(userId) {
	get(child(dbRef, `users/${userId}`)).then((snapshot) => {
	if (snapshot.exists()) {
		// console.log(snapshot.val());
		console.log("Read");
		console.log(snapshot.val().bookIdDB);
	} else {
		console.log("No data available");
	}
}).catch((error) => {
	console.error(error);
});
}