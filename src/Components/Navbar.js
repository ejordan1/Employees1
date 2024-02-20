import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { currentUser, logout } = useContext(AuthContext);


  var getStyleBar = () => {
    return {
      // display: "flex",
      // gap: "10%",
      // padding: "15px 0px 10px 40px"
      height: "30px",
      backgroundColor: "lightBlue",
      border: "1px solid blue"
    };
  };

  var getStyleNav = () => {
    return {
      float: "right",
      padding: "5px 30px 10px 40px"
    };
  };

  var getWebsiteTitle = () => {
    return {
      float: "left",
      padding: "5px 30px 10px 40px",
      fontFamily: "cursive"
      
    };
  };

  return (
    <div style={getStyleBar()}>
      <div style={getWebsiteTitle()}>Employees1 Schedule Management</div>
      <div style={getStyleNav()}>
      <Link to="/myshifts">My Shifts</Link> | <Link to="/available">Available Shifts</Link>
      </div>
      
    </div>
    
  );
};

export default Navbar;