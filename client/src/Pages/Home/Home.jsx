import React from 'react'
import styles from "./home.module.css"
import Nav from '../../components/Navbar/Nav'
import Typewriter from "typewriter-effect";
import "./typewriter.css"

function Home() {
  return (
    <>
      <Nav />
      <div className={styles.homeWrapper}>

        <div className={styles.ContainerHeading} >
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome")
                .pauseFor(1000)
                .deleteAll()
                .typeString("नमस्ते")
                .pauseFor(1000)
                .pauseFor(1000)
                .deleteAll()
                .typeString("Hola")
                .pauseFor(1000)
                .start();
            }}
            options={{
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        <div className={styles.desc}>
          This is a Full-Stack web application <b>Assignment</b>, developed By <b>Keshav Jha</b>
        </div>

        <div className={styles.projBtn}>
          Get Started
        </div>

      </div>
    </>
  )
}

export default Home