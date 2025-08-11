// import React from 'react' 
// import { useAuth } from "../context/AuthContext"
// import { useNavigate } from 'react-router';

// const Logout = () => {
//     const navigate = useNavigate();
//   const {logout} = useAuth();
//   logout();
//   navigate("/login");
// }

// export default Logout



import React, { useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout(); // logout ka kaam
    navigate("/login"); // login page pe bhejna
  }, [logout, navigate]);

  return null; // kuch render nahi karna
}

export default Logout;
