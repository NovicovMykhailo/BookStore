// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
// import { getDatabase, ref, set, onValue } from "firebase/database";
// firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc,query, where, arrayUnion, arrayRemove } from "firebase/firestore"; 

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

class useFirebase {
	constructor(test1, test2) {
		this.test1 = test1;
		this.test2 = test2;
	}

	loginEmailPassword = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			console.log("It`s work sign in:" + userCredential.user.uid);
			localStorage.setItem('userIdToLogin', JSON.stringify(userCredential.user.uid));
			this.findUserAndDatabaseIdToLocalStorage(userCredential.user.uid);
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

	createAccount = async (name, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			this.writeToDB(name, email, userCredential.user.uid);
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
	writeToDB = async (name, email, userId) => {
		try {
			const docRef = await addDoc(collection(db, "users"), {
			name: name,
			email: email,
			userIdNum: userId,
			booksId: []
			});
			this.findUserAndDatabaseIdToLocalStorage(userId);
			console.log("Write User to DB = DONE!");
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	// It`s for write id which use user in DB
	findUserAndDatabaseIdToLocalStorage(userIdInAuth) {
		// console.log(userIdInAuth);
		const userWithId = query(collection(db, "users"), where("userIdNum", "==", userIdInAuth));

		const userData = getDocs(userWithId);
		userData.then(data => {
			data.forEach((doc) => {
				localStorage.setItem('userBooksIdToCategory', JSON.stringify(doc.id));
			})
		})
	}

	// Receive book obj and write to base use userID to base from localStorage
	writeBookArrayToDB(bookObj) {
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

	// Fun find book use book id
	selectBookFromArray(bookId) {
		const q = query(collection(db, "users"), where("userIdNum", "==", JSON.parse(localStorage.getItem('userIdToLogin'))));
		const querySnapshot = getDocs(q);
		console.log(querySnapshot);

		querySnapshot.then(data => {
			data.forEach((doc) => {
				// console.log(doc.data().booksId);
				const booksArray = doc.data().booksId;
				booksArray.forEach(obj => {
					// console.log(obj);
					if (obj._id === bookId) {
						console.log(obj);
						const bookObjForDelete = obj;
						this.deleteBookArray(bookObjForDelete);
					}
				})
		})
		})
	}
	
	// fun which delete book array from DB use 
	deleteBookArray(bookObj) {
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

	// Read all books data
	readAllBooksDataUser() {
		const q = query(collection(db, "users"), where("userIdNum", "==", JSON.parse(localStorage.getItem('userIdToLogin'))));
		const querySnapshot = getDocs(q);

		querySnapshot.then(data => {
			data.forEach((doc) => {
				// console.log(doc.data());
				const booksArray = doc.data().booksId;
				console.log(booksArray);
			})
		})
	}
}




const bookObj = {
		author: "Shannon Bream",
		book_image: "https://storage.googleapis.com/du-prd/books/images/9780063226050.jpg",	
		buy_links: [
			{name: "Amazon", url: "https://www.amazon.com/dp/0063226057?tag=NYTBSREV-20"},
			{ name: "Apple Books", url: "https://goto.applebooks.apple/9780063226050?at=10lIEQ" },
			{ name: "Barnes and Noble", url: "https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9780063226050" }
		],
		description: "",
		title: "THE LOVE STORIES OF THE BIBLE SPEAK",
		_id: "643282b1e85766588626a0ba",
	}

const base = new useFirebase;
// base.selectBookFromArray("111");
// base.testWriteArray(bookObj);
// base.readAllBooksDataUser();
// base.selectBookFromArray("643282b1e85766588626a0ba");

signInFormEl.addEventListener("submit", (event) => {
	event.preventDefault();

	if (inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		return console.log("Use all fields");
	}
	// Checking which form we use
	if (labelNameEl.style.display === "none") {
		return base.loginEmailPassword(inputEmailEl.value, inputPasswordEl.value);
	}
	// Check for empty fields
	if (inputNameEl.value.trim() === "" || inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		return console.log("Use all fields");
	}
	base.createAccount(inputNameEl.value, inputEmailEl.value, inputPasswordEl.value);
})