// Import the functions you need from the SDKs you need
import { all } from "axios";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
// firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc,query, where, orderBy, limit, arrayUnion, arrayRemove } from "firebase/firestore"; 
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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
const auth = getAuth();

const signInFormEl = document.querySelector(".sigh-in-form");
const inputNameEl = document.querySelector(".input-name");
const labelNameEl = document.querySelector(".form-label-name");

const inputEmailEl = document.querySelector(".input-email");
const inputPasswordEl = document.querySelector(".input-password");

signInFormEl.addEventListener("submit", (event) => {
	event.preventDefault();

	if (inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		return console.log("Use all fields");
	}
	// Checking which form we use
	if (labelNameEl.style.display === "none") {
		loginEmailPassword(inputEmailEl.value, inputPasswordEl.value)
		return console.log("Sign in!!!");
	}
	// Check for empty fields
	if (inputNameEl.value.trim() === "" || inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		return console.log("Use all fields");
	}
	createAccount(inputNameEl.value, inputEmailEl.value, inputPasswordEl.value);
})

const createAccount = async (name, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		writetoDB(name, email, userCredential.user.uid);
	} catch (error) {
		if (error.message === "Firebase: Error (auth/email-already-in-use).") {
			// Display email fail
			return console.log("Ця адреса вже існує");
		}
		console.log(error);
	}
}

const loginEmailPassword = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log("It`s work:" + userCredential.user.uid);
	} catch (error) {
		if (error.message === "Firebase: Error (auth/wrong-password).") {
			// Display email fail
			return console.log("НЕВІРНИЙ ПАРОЛЬ");
		}
		if (error.message === "Firebase: Error (auth/user-not-found).") {
			// Display email fail
			return console.log("Ви ще не зареєструвались");
		}
		console.log(error);
	}
}

const writetoDB = (name, email, userId) => {
	try {
		const docRef = addDoc(collection(db, "users"), {
		name: name,
		email: email,
		userIdNum: userId,
		booksId: []
		});
		console.log("Document written with ID: ", docRef.id);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

function readData (params) {
	// const q = query(collection(db, "users"), where("capital", "==", true));
	const q = query(collection(db, "users"), where("userIdNum", "==", "zRrq5yaA6uVILi87Jtd7sC4T6s52"));
	const querySnapshot = getDocs(q);
	console.log(querySnapshot);

		// const querySnapshot = getDocs(collection(db, "users"), where("userIdNum", "===", "uYmsI9n9frVa1kuTEmHS9nrJltl2"));
	querySnapshot.then(data => {
		data.forEach((doc) => {
		console.log(doc.data());
	})
	})
}


function findUserAndWriteBook() {
	const userWithId = query(collection(db, "users"), where("userIdNum", "==", "qYLPbWN7oeVXUpb30olg4r7BEas2"));
	
	const userData = getDocs(userWithId);
	userData.then(data => {
		data.forEach((doc) => {
			console.log(doc.data());
			console.log(doc.id);
			testWriteArray(doc.id, "work");
		})
	})
}

findUserAndWriteBook();

function testWriteArray(userIdInBase, bookId) {
	console.log(userIdInBase);
	const userInBaseWithId = doc(db, "users", userIdInBase);
	
	try {
		updateDoc(userInBaseWithId, {
		booksId: arrayRemove(all)
		})
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}