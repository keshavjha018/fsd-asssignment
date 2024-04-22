import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './styles/login.module.css'
import { AiOutlineCloseCircle } from "react-icons/ai"
import toast from "react-hot-toast"
import LoadingSpinner from '../Others/LoadingSpinner';
import AuthContext from '../../Contexts/AuthContext';
import GoogleIcon from "../../Assets/google-icon.png"


function Login({ setRegister, handleGoogleSignin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowLoginPopup, setUser } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Missing Credentials !");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/login`,
        { email, password }
      );

      if (res?.data?.success) {
        // Store User data in LocalStorage
        let userInfoData = {
          id: res.data.userId,
          email: res.data.email
        }
        localStorage.setItem("user", JSON.stringify(userInfoData));
        setUser(userInfoData);
        setShowLoginPopup(false);

        navigate("/");
        toast.success("Login Successful")
      }
      else {
        toast.error(res?.data?.message);
      }

    } catch (err) {
      toast.error("Server error")
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <AiOutlineCloseCircle className={styles.closeIcon} onClick={() => setShowLoginPopup(false)} />
      <h2 className={styles.heading}> Welcome Back! </h2>

      <label className={styles.label} > Email</label>
      <input
        className={styles.emailIn}
        type="text"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className={styles.label}> Password 🔒</label>
      <input
        className={styles.passIn}
        type="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!Loading ?
        <>
          <button className={styles.loginBtn} onClick={(e) => handleSubmit(e)} > Sign In </button>

          <div className={styles.alternative}>
            <span className={styles.alt_line}></span>
            <span> OR </span>
            <span className={styles.alt_line}></span>
          </div>

          {/* Google Login Btn */}
          <div className={styles.google_btn} onClick={handleGoogleSignin}>
            <img className={styles.google_icon_svg} src={GoogleIcon} />
            <div className={styles.btn_text}> Continue with Google </div>
          </div>
        </>
        :
        <LoadingSpinner />
      }
      
      <div className={styles.alreadyVerifiedTxt}> New User?
        <span className={styles.signupBtn} onClick={() => setRegister(true)}> Verify Email </span>
      </div>

    </div>
  )
}

export default Login