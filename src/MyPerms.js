import React, { useState, useEffect } from "react";
import axios from "axios";

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


    var getStyle = () => {
        return  {
          display: "flex",
          gap: "20px",
            flexWrap: "wrap",
            margin: "50px",
            justifyContent: "space-around",
        };
      };

      
      return (
        <div style = {getStyle()} className = "MyPerms">
            <h1>My Perms</h1>
          {myPerms.map((perm)=>
          <div>
            <p>{perm.starttime}</p>
            <p>{perm.endtime}</p>
            </div>
          )}

          <p></p>
        </div>
        
      );
}

export default MyPerms;
