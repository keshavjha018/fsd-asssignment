import React, { useContext, useState } from 'react'
import Nav from '../../components/Navbar/Nav'
import styles from "./profile.module.css"
import AuthContext from '../../Contexts/AuthContext'
import userIcon from "../../Assets/userIcon.png"
import EditProfile from './EditProfile'


function Profile() {
  const {User} = useContext(AuthContext);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
    <Nav />
    <div className={styles.profWrapper}>

      <div className={styles.userProf}>

        <div className={styles.profileHead}>
          <img src={userIcon} className={styles.userIcon} alt="" />
          <span className={styles.profileTitle}>{User?.name}'s Profile</span>
        </div>

        {/* Name */}
        <div className={styles.field}>
          <div className={styles.fkey}>Name: </div>
          <div className={styles.fval}> {User?.name} </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <div className={styles.fkey}>Email: </div>
          <div className={styles.fval}> {User?.email} </div>
        </div>

        {/* EDIt */}
        <div className={styles.editBtn} onClick={(e) => setShowDialog(true)}>
          Edit Profile
        </div>

      </div>

      {showDialog && 
      <EditProfile user={User} setShowDialog={setShowDialog} showDialog={showDialog} />}
    </div>
    </>
  )
}

export default Profile