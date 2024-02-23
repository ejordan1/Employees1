import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss"

const Navbar = () => {
  // const { currentUser, logout } = useContext(AuthContext);


  return (
    <div className={styles.bar}>
      <div className={styles.title}>Employees1 Schedule Management</div>
      <div className={styles.nav}>
      <Link to="/myshifts">My Shifts</Link> | <Link to="/available">Available Shifts</Link>
      </div>
      
    </div>
    
  );
};

export default Navbar;