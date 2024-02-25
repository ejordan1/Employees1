import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyPerms.module.scss";

function MyPerms() {
  const [myPerms, setMyPerms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {}
        const res = await axios.get(`/perms/myperms`);
        setMyPerms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>My Perms</h1>
      {myPerms.map((perm) => (
        <div>
          <p>starttime: {perm.starttime}</p>
          <p>endtime: {perm.endtime}</p>
          <p>position: {perm.position}</p>
          
        </div>
      ))}
    </div>
  );
}

export default MyPerms;
