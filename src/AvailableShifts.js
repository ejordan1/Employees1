import React, { useState, useEffect } from "react";
import axios from "axios";

function AvailableShifts() {



    const [avilableShifts, setAvailableShifts] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/shifts/available`);
            setAvailableShifts(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);


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
        <div style = {getStyle()} class = "AvailableShifts">
          <p>hello AvailableShifts</p>
          <p>{avilableShifts}</p>
        </div>
        
      );
}

export default AvailableShifts;
