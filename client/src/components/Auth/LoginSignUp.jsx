import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import styles from "./styles/loginSignup.module.css"
import Login from "./Login"
import Signup from "./Signup"
import AuthContext from '../../Contexts/AuthContext';
import { SignInWithGoogle, RegisterUserLoginViaGoogle } from '../../Firebase/googleAuth'
import toast from "react-hot-toast"


function LoginSignUp() {

  const navigate = useNavigate();
  const [Register, setRegister] = useState(false);
  const { setShowLoginPopup, setUser } = useContext(AuthContext);

  // Sign In/ SignUp via GOOGLE
  async function handleGoogleSignin() {
    SignInWithGoogle().then(async(userDetails) => {
      const res =  await RegisterUserLoginViaGoogle(userDetails);
      
      if(res) {
        // Store User data in LocalStorage
        let userInfoData = {
          id: res.data?.user?._id,
          email: res.data?.user?.email,
          name: res.data?.user?.name
        }

        localStorage.setItem("user", JSON.stringify(userInfoData));
        setUser(userInfoData);
        setShowLoginPopup(false);

        navigate("/");
        toast.success("Login Successful");
      }
      else {
        toast.error("Login Failed !");
        return;
      }
    })
  }

  return (
    <div className={styles.mainPopup}>
      {
        Register ? 
        <Signup 
          setRegister={setRegister} 
          handleGoogleSignin={handleGoogleSignin}
        />
        :
        <Login 
          setRegister={setRegister}
          handleGoogleSignin={handleGoogleSignin}
        />
      }
    </div>
  )
}

export default LoginSignUp