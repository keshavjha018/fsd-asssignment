import React from 'react'
import styles from "./auth.module.css"
import LoginSignUp from "../../components/Auth/LoginSignUp"
import Nav from '../../components/Navbar/Nav'

function Auth() {
  return (
    <>
    <Nav />
    <div className={styles.wrapper}>
      <LoginSignUp />
    </div>
    </>
  )
}

export default Auth