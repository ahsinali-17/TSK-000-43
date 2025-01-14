import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";


import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4FAmqPblVDaBS5-eNk9HCSk0YCkEu5vY",
  authDomain: "stripestore-bb99b.firebaseapp.com",
  projectId: "stripestore-bb99b",
  storageBucket: "stripestore-bb99b.firebasestorage.app",
  messagingSenderId: "391295332013",
  appId: "1:391295332013:web:49aafd0676352cce076024",
  measurementId: "G-C9RHKE568V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props ) => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (users) => {
      if (users) {
        setUser(users);
      } else {
        setUser(null);
      }
    });
  }, []);

// Signup method
const signupWithUsernameAndPassword = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  // Login method
  const loginWithUsernameAndPassword = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // Log out
  const logout = () => {
    return signOut(auth);
  };

  // Sign in with Google method
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //set cart
  const emptyCart = async (userID) => {
    const productsCollectionRef = collection(db, `cart/${userID}/products`);
  
    const existingDocs = await getDocs(productsCollectionRef);
    const deletePromises = existingDocs.docs.map((docSnapshot) =>
      deleteDoc(docSnapshot.ref)
    );
    await Promise.all(deletePromises);
  }

  //add to cart
  const addToCart = async(userID,data) => {
    await addDoc(collection(db, `cart/${userID}/products`), data);
  };

  //remove from cart
  const removeFromCart = async(userID,product) => {
    await deleteDoc(doc(db, `cart/${userID}/products/${product.storeid}`));
  };

  //get  from cart
  const getCart = async (userID) => {
  const querySnapShot  = await getDocs(collection(db, `cart/${userID}/products`));
  const data = querySnapShot.docs.map((doc) => ({
    storeid: doc.id, 
    ...doc.data(), 
  }));
  return data;
  }

  //add quantity in cart
  const addQuantity = async(userID,product) => {
    const docRef = doc(db, `cart/${userID}/products/${product.storeid}`);
     const updatedDoc = await updateDoc(docRef, {price: (product.price/(product.quantity || 1))*(product.quantity+1) , quantity: product.quantity + 1});
     return updatedDoc;
  };

  //subtract quantity in cart
  const subQuantity = async(userID,product) => {
    const docRef = doc(db, `cart/${userID}/products/${product.storeid}`);
    const updatedDoc = await updateDoc(docRef, {price: (product.price/(product.quantity || 1))*(product.quantity-1) , quantity: product.quantity - 1});
    return updatedDoc;
  };


  // Checking if user is logged in or not
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
    value={{
        signupWithUsernameAndPassword,
        loginWithUsernameAndPassword,
        logout,
        signInWithGoogle,
        addToCart,
        emptyCart,
        getCart,
        addQuantity,
        subQuantity,
        removeFromCart,
        user,
        isLoggedIn
    }}
    >
    {props.children}
    </FirebaseContext.Provider>
);}