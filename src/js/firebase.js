// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { all } from "axios";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
// import { getDatabase, ref, set, onValue } from "firebase/database";
// firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc,query, where, orderBy, limit, arrayUnion, arrayRemove } from "firebase/firestore"; 

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
		return loginEmailPassword(inputEmailEl.value, inputPasswordEl.value);
	}
	// Check for empty fields
	if (inputNameEl.value.trim() === "" || inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		return console.log("Use all fields");
	}
	createAccount(inputNameEl.value, inputEmailEl.value, inputPasswordEl.value);
})

const loginEmailPassword = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log("It`s work sign in:" + userCredential.user.uid);
		localStorage.setItem('userIdToLogin', JSON.stringify(userCredential.user.uid));
		findUserAndDatabaseIdToLocalStorage(userCredential.user.uid);
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

const createAccount = async (name, email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		writeToDB(name, email, userCredential.user.uid);
		localStorage.setItem('userIdToLogin', JSON.stringify(userCredential.user.uid));
	} catch (error) {
		if (error.message === "Firebase: Error (auth/email-already-in-use).") {
			// Display email fail
			return console.log("Ця адреса вже існує");
		}
		console.log(error);
	}
}

// WriteNewUserToDB
const writeToDB = async (name, email, userId) => {
	try {
		const docRef = await addDoc(collection(db, "users"), {
		name: name,
		email: email,
		userIdNum: userId,
		booksId: {}
		});
		findUserAndDatabaseIdToLocalStorage(userId);
		console.log("Write User to DB = DONE!");
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

// It`s for write id which use user in DB
function findUserAndDatabaseIdToLocalStorage(userIdInAuth) {
	// console.log(userIdInAuth);
	const userWithId = query(collection(db, "users"), where("userIdNum", "==", userIdInAuth));

	const userData = getDocs(userWithId);
	userData.then(data => {
		data.forEach((doc) => {
			localStorage.setItem('userBooksIdToCategory', JSON.stringify(doc.id));
		})
	})
}

const bookObj = {
	bookId: "333",
	bookName: "Three",
	bookPhotoUrl: "https://Three.com",
	bookAuthor: "Three",
	bookDesc: "Three",
	bookAmazonLink: "amazonThree.com",
}

function testWriteArray(bookObj) {
	const userIdInBase = JSON.parse(localStorage.getItem('userBooksIdToCategory'));
	const userInBaseWithId = doc(db, "users", userIdInBase);

	try {
		updateDoc(userInBaseWithId, {
			booksId: arrayUnion(bookObj),
		})
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}

// testWriteArray(bookObj);



function selectBookFromArray(bookId) {
	const q = query(collection(db, "users"), where("userIdNum", "==", JSON.parse(localStorage.getItem('userIdToLogin'))));
	const querySnapshot = getDocs(q);
	console.log(querySnapshot);

	querySnapshot.then(data => {
		data.forEach((doc) => {
			// console.log(doc.data().booksId);
			const booksArray = doc.data().booksId;
			booksArray.forEach(obj => {
				// console.log(obj);
				if (obj.bookId === bookId) {
					console.log(obj);
					const bookObjForDelete = obj;
					// deleteBookArray(bookObjForDelete);
				}
			})
	})
	})
}
selectBookFromArray("333");

function deleteBookArray(bookObj) {
	const userIdInBase = JSON.parse(localStorage.getItem('userBooksIdToCategory'));
	const userInBaseWithId = doc(db, "users", userIdInBase);
	
	try {
		updateDoc(userInBaseWithId, {
			booksId: arrayRemove(bookObj),
		})
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}



function readData (params) {
	// const q = query(collection(db, "users"), where("capital", "==", true));
	const q = query(collection(db, "users"), where("userIdNum", "==", "xxNneOnqZtUpeO74fcMaFGWmIUf1"));
	const querySnapshot = getDocs(q);
	console.log(querySnapshot);

		// const querySnapshot = getDocs(collection(db, "users"), where("userIdNum", "===", "uYmsI9n9frVa1kuTEmHS9nrJltl2"));
	querySnapshot.then(data => {
		data.forEach((doc) => {
			// console.log(doc.data().booksId);
			const booksArray = doc.data().booksId;
			booksArray.forEach(obj => {
				console.log(obj.bookId);
			})
	})
	})
}

// readData();


