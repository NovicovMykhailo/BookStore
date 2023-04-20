// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
// import { getDatabase, ref, set, onValue } from "firebase/database";
// firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, getDoc, query, where, arrayUnion, arrayRemove } from "firebase/firestore";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

// Notify
const notifyOptions = {
	fontFamily: 'DMSans',
	zindex: 10001,
};

const signInFormEl = document.querySelector(".sigh-in-form");
const inputNameEl = document.querySelector(".input-name");
const labelNameEl = document.querySelector(".form-label-name");
const inputEmailEl = document.querySelector(".input-email");
const inputPasswordEl = document.querySelector(".input-password");

export class useFirebase {
	constructor(test1, test2, array) {
		this.test1 = test1;
		this.test2 = test2;
		this.array = array;
	}

	loginEmailPassword = async (email, password) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			localStorage.setItem('userIdToLogin', JSON.stringify(userCredential.user.uid));
			this.findUserAndDatabaseIdToLocalStorage(userCredential.user.uid);
			Notify.success(`You sign in!`, notifyOptions);
		} catch (error) {
			if (error.message === "Firebase: Error (auth/wrong-password).") {
				// Display email fail
				return Notify.failure(`Wrong password!`, notifyOptions);
			}
			if (error.message === "Firebase: Error (auth/user-not-found).") {
				// Display email fail
				return Notify.failure(`You should sign up before!`, notifyOptions);
			}
			// console.log(error);
		}
	}




	createAccount = async (name, email, password) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			this.writeToDB(name, email, userCredential.user.uid);
			localStorage.setItem('userIdToLogin', JSON.stringify(userCredential.user.uid));
			Notify.success(`You sign in!`, notifyOptions);
		} catch (error) {
			if (error.message === "Firebase: Error (auth/email-already-in-use).") {
				// Display email fail 
				return Notify.failure(`You have already used this email!`, notifyOptions);
			}
			// console.log(error);
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
			Notify.success('Conrgatulation - yoy are registered!', {
        fontFamily: 'DMSans',
      });
			// console.log("Write User to DB = DONE!");
		} catch (e) {
			Notify.warning('Oops something went wrong, Please try again', {
        fontFamily: 'DMSans',
      });
			// console.error("Error adding document: ", e);
		}
	}

	// It`s for write id which use user in DB
	findUserAndDatabaseIdToLocalStorage(userIdInAuth) {

		// Write books array to local storage
		this.findAndAddBooksArrayToLocalStorage();
		// console.log(userIdInAuth);
		const userWithId = query(collection(db, "users"), where("userIdNum", "==", userIdInAuth));

		const userData = getDocs(userWithId);
		userData.then(data => {
			data.forEach((doc) => {
				localStorage.setItem('userBooksIdToCategory', JSON.stringify(doc.id));
			})
		})
		localStorage.setItem('register', true);
	}

	// Receive book obj and write to base use userID to base from localStorage
	async writeBookArrayToDB(bookObj) {
		const userIdInBase = JSON.parse(localStorage.getItem('userBooksIdToCategory'));
		const userInBaseWithId = doc(db, "users", userIdInBase);

		try {
			await updateDoc(userInBaseWithId, {
				booksId: arrayUnion(bookObj),
			})
			this.findAndAddBooksArrayToLocalStorage();
		} catch (e) {
			Notify.failure('oops error writing to host ', {
        fontFamily: 'DMSans',
      });
			// console.error("Error adding document: ", e);
		}
	}

	// Check and reload books from DB to localStorage
	findAndAddBooksArrayToLocalStorage() {
		const booksArrayForLocalStorage = this.readAllBooksDataUser();
		setTimeout(() => {
			let array;
			booksArrayForLocalStorage.forEach(data => {
				array = data.booksId;
			})
			localStorage.setItem('shopping-list', JSON.stringify(array));
		}, 1000);
	}
	findAndAddBooksArrayToLocalStorageAfterDelete() {
		const booksArrayForLocalStorage = this.readAllBooksDataUser();

		let array;
		booksArrayForLocalStorage.forEach(data => {
			array = data.booksId;
		})
		localStorage.setItem('shopping-list', JSON.stringify(array));
	}

	// Fun find book use book id
	selectBookFromArray(bookId) {
		const q = query(collection(db, "users"), where("userIdNum", "==", JSON.parse(localStorage.getItem('userIdToLogin'))));
		const querySnapshot = getDocs(q);

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
	async deleteBookArray(bookObj) {
		const userIdInBase = JSON.parse(localStorage.getItem('userBooksIdToCategory'));
		const userInBaseWithId = doc(db, "users", userIdInBase);

		try {
			await updateDoc(userInBaseWithId, {
				booksId: arrayRemove(bookObj),
			});
			this.findAndAddBooksArrayToLocalStorage();
		} catch (e) {
			Notify.failure('oops error writing to host ', {
        fontFamily: 'DMSans',
      });
			// console.error("Error adding document: ", e);
		}
	}

	// Read all books data
	readAllBooksDataUser() {
		const q = query(collection(db, "users"), where("userIdNum", "==", JSON.parse(localStorage.getItem('userIdToLogin'))));
		const querySnapshot = getDocs(q);
		const array = [];

		querySnapshot.then(data => {

			data.forEach((doc) => {
				const booksArray = doc.data();
				array.push(booksArray);
				// return booksArray.booksId;
			})
		})
		return array;
	}
}

const base = new useFirebase;

signInFormEl.addEventListener("submit", (event) => {
	event.preventDefault();

	// Checking which form we use
	if (labelNameEl.style.display === "none") {
		if (inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
			Notify.failure(`Fill all fields!`, notifyOptions);
		}
		return base.loginEmailPassword(inputEmailEl.value, inputPasswordEl.value);
	}
	// Check for empty fields
	if (inputNameEl.value.trim() === "" || inputEmailEl.value.trim() === "" || inputPasswordEl.value.trim() === "") {
		Notify.failure(`Fill all fields!`, notifyOptions);
		return;
	}
	base.createAccount(inputNameEl.value, inputEmailEl.value, inputPasswordEl.value);
})



