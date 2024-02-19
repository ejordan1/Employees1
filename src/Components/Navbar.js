import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { currentUser, logout } = useContext(AuthContext);

  return (
    <div >
      <h1 >Nav Bar</h1>
      <div >
      <Link to="/">Home</Link> | <Link to="/available">About Me</Link>
      </div>
      
    </div>
    
  );
};

export default Navbar;