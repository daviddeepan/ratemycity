import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
	apiKey: "AIzaSyAcR0l9jSOQn-k38KSc-zFm3TbdOb4vuFc",
	authDomain: "ratemycity-c5fff.firebaseapp.com",
	projectId: "ratemycity-c5fff",
	storageBucket: "ratemycity-c5fff.appspot.com",
	messagingSenderId: "858220098356",
	appId: "1:858220098356:web:a160fd82704b39d6636b61",
	measurementId: "G-CDD4YNMEHC",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseapp = initializeApp(firebaseConfig);
const firebaseauth = getAuth(firebaseapp);
const firestore = getFirestore(firebaseapp);

export const FirebaseProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		//checking auth status
		onAuthStateChanged(firebaseauth, (user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	}, []);

	const signupWithEmailAndPassword = (email, password) => {
		return createUserWithEmailAndPassword(firebaseauth, email, password); // register context
	};

	const signinUserWithEmailAndPassword = (email, password) => {
		return signInWithEmailAndPassword(firebaseauth, email, password); //login context
	};

	const signOutUser = () => {
		return signOut(firebaseauth).then(() => {
			setUser(null);
		}); //signout context
	};
	const putUserProfile = async (firstName, lastName, city, userName) => {
		//user-profile
		try {
			return await addDoc(collection(firestore, "user-profile"), {
				userId: user.uid,
				email: user.email,
				firstName,
				lastName,
				city,
				userName,
			});
		} catch (error) {
			console.log("Error during data put,", error);
		}
	};

	//get users
	const getUserProfile = async () => {
		return await getDocs(collection(firestore, "user-profile"));
	};

	//validate username
	async function validateUserName(username) {
		const userRef = collection(firestore, "user-profile");
		const q = query(userRef, where("userName" == username));

		const querySnapshot = await getDocs(q);
		if (querySnapshot.size > 0) {
			return "Username is already in use";
		}

		return "Username is available";
	}

	const isLoggedIn = user ? true : false;
	return (
		<FirebaseContext.Provider
			value={{
				signupWithEmailAndPassword,
				signinUserWithEmailAndPassword,
				isLoggedIn,
				signOutUser,
				putUserProfile,
				getUserProfile,
				validateUserName,
			}}
		>
			{props.children}
		</FirebaseContext.Provider>
	);
};
