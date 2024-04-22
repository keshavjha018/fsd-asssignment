// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth = getAuth(app);

const Provider = new GoogleAuthProvider();

// Verify User & Collect Data
const SignInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, Provider)
      .then((res) => {
        const userDetails = {
          email: res.user.email,
          photoURL: res.user.photoURL
        };
        resolve(userDetails);
      })
      .catch((e) => {
        console.log(e.message);
        reject(e);
      });
  })
};

// Store in Database
const RegisterUserLoginViaGoogle = async (userDetails) => {

  try {
    const { email, photoURL } = userDetails
    const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/googlelogin`,
      { email, photoURL }
    );

    return res;
  }
  catch(err) {
    console.log(err);
    return null;
  }
}

export { SignInWithGoogle, RegisterUserLoginViaGoogle }