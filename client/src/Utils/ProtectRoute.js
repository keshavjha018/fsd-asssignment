import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext"
import Navbar from "../components/Navbar/Nav"


function ProtectRoute({ children }) {

  const navigate = useNavigate();
  const { User } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkUserToken() {
    const session = localStorage.getItem('user');

    if (!session || session == 'undefined') {
      setIsLoggedIn(false);
      navigate("/auth");
      return;
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, User]);

  return (
    <>
    {
      isLoggedIn ? children : <Navbar />
    }
    </>
  )
}

export { ProtectRoute }