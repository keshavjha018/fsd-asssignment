import { useState, useContext } from 'react';
import styles from './styles/signup.module.css'
import { AiOutlineCloseCircle } from "react-icons/ai"
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Others/LoadingSpinner';
import AuthContext from '../../Contexts/AuthContext';
import GoogleIcon from "../../Assets/google-icon.png"



function Signup({ setRegister, handleGoogleSignin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const { setShowLoginPopup } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(!email || !password) {
      toast.error("Missing Credentials !");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND}/api/user/register`,
        {email, password}
      );

      if(res?.data?.success === true) {
        toast.success(res?.data?.message)
      }
      else {
        toast.error(res?.data?.message)
      }

    }
    catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <AiOutlineCloseCircle className={styles.closeIcon} onClick={()=> setShowLoginPopup(false)}/>
       <h2 className={styles.heading}> Sign Up </h2>

      <label className={styles.label} >Email 🔒</label>
      <input 
        className={styles.emailIn} 
        type="text"
        placeholder="Your email always remains fully encrypted."
        required
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />

      <label className={styles.label}> New Password 🔒 </label>
      <input 
        className={styles.passIn} 
        type="password" 
        placeholder="Not even developer can see who are you"
        required
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
      />

      {!Loading ? 
        <>
          <button className={styles.signupBtn} onClick={handleSubmit}> Sign Up </button>

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
        <LoadingSpinner/>
      }

      <div className={styles.alreadyVerifiedTxt}>Already Verified? 
        <span className={styles.loginBtn} onClick={()=> setRegister(false)}> Login here </span>
      </div>

    </div>
  )
}

export default Signup