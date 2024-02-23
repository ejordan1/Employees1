import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyPerms.module.scss"

function MyPerms() {


    const [myPerms, setMyPerms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/perms/myperms`);
            setMyPerms(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);

      // might be a bad way to do this but works:
      // button id is set to the shift id, and is grabbed with e.target.id



      
      return (
        <div className = {styles.container}>
            <h1>My Perms</h1>
          {myPerms.map((perm)=>
          <div>
            <p>{perm.starttime}</p>
            <p>{perm.endtime}</p>
            </div>
          )}

        </div>
        
      );
}

export default MyPerms;
