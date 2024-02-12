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
        <div style = {getStyle()} className = "AvailableShifts">
          <p>{avilableShifts.map((shift)=>
          <div>
            <p>{shift.starttime}</p>
            <p>{shift.endtime}</p>
            </div>
          )}</p>

          <p></p>
        </div>
        
      );
}

export default AvailableShifts;
