import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./LoginPage.module.scss";
import { UserContext } from "../Contexts/UserContext";

function LoginPage() {

  const {username, setUserName} = useContext(UserContext);

    const [id, setId] = useState([]);
    const [password, setPassword] = useState([]);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await axios.get(`/shifts/available`);
    //         setAvailableShifts(res.data);
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     fetchData();
    //   }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setId("9");
          setPassword("password");
        try {
          const res = await axios.post("/auth/login", {id, password});
          setUser(res.data);
          
        } catch (err) {
          console.log(err);
        }
      };

      
      return (
        <div className = {styles.container}>
          <p>Login, current User: {username}</p> 

            <form onSubmit={handleSubmit}>
            <span className="formTitle">Login</span>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submitButton">
              Login
            </button>
          </form>
        </div>
        
      );
}

export default LoginPage;
