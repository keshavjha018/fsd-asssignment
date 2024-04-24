import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginSignUp from '../Auth/LoginSignUp';
import './Nav.css'
import Logo from "../../Assets/logo.png"
import { HiOutlineHome } from 'react-icons/hi';
import { GoProjectSymlink } from "react-icons/go";
import { GoInfo } from 'react-icons/go';
import { IoMdExit } from "react-icons/io";
import { LiaUserSecretSolid } from 'react-icons/lia';
import toast from "react-hot-toast"
import AuthContext from '../../Contexts/AuthContext';


function Nav() {

  const navigate = useNavigate();
  const { showLoginPopup, setShowLoginPopup, User, setUser } = useContext(AuthContext);

  function handleClick(e) {
    e.preventDefault();
    navigate(`/`);
  }

  function handleLogout(e) {
    e.preventDefault();
    
    //Clear Local Storage
    localStorage.clear();
    setUser(null);
    navigate(`/`);
    toast.success("Logged Out Successfully !")
  }

  return (
    <>
    <div id='NavBar' className='navbarWrapper' >

      <div className="navbarLeft" onClick={(e) => handleClick(e)}>
        <img src={Logo} alt="logo" className='navMainLogo' />
      </div>

      <div className="navbarRight">

        <NavLink to="/" className="navBtn" > 
          Home <HiOutlineHome className='navBtnIcon' /> 
        </NavLink>

        <NavLink to="/project" className="navBtn" > 
          Projects <GoProjectSymlink className='navBtnIcon' /> 
        </NavLink>

        <NavLink to="/profile" className="navBtn" > 
          Profile <GoInfo className='navBtnIcon' />
        </NavLink>

        { !User ?
          <div onClick={()=>setShowLoginPopup(!showLoginPopup)} className="navBtn" > 
            Login <LiaUserSecretSolid className='navBtnIcon' /> 
          </div>
          :
          <div onClick={(e)=> handleLogout(e)} className="navBtn" > 
            Logout <IoMdExit className='navBtnIcon' /> 
          </div>
        }

      </div>
    </div>

    { showLoginPopup && 
      <LoginSignUp />
    }

    </>
  )
}

export default Nav