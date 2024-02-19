import React, { useState, useEffect } from "react";
import axios from "axios";

function AvailableShifts() {



    const [availableShifts, setAvailableShifts] = useState([]);

    function getShiftById(id)
    {
      for (let i = 0; i <  availableShifts.length; i++)
      {
        if (availableShifts[i].id == id)
        {
          return availableShifts[i];
        }
      }
      // availableShifts.forEach((shift) => {
      //   if (shift.id == id)
      //   {
      //     return shift.starttime;
      //   }
      // })
    }


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

      // might be a bad way to do this but works:
      // button id is set to the shift id, and is grabbed with e.target.id
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let shiftById = getShiftById(e.target.id);
          const bodyvalues = {
            shiftid: shiftById.id,
            starttime: shiftById.starttime,
            endtime: shiftById.endtime
          }
          console.log(shiftById);
           const res = await axios.put(`/shifts/pickup`, bodyvalues);
          // const res = await axios.get(`/shifts/available`);
          //navigate("/");
        } catch (err) {
          console.log(err);
        }
      };


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
          {availableShifts.map((shift)=>
          <div>
            <button id={shift.id} onClick={handleSubmit}>Pick Up</button>
            <p>{shift.starttime}</p>
            <p>{shift.endtime}</p>
            </div>
          )}

          <p></p>
        </div>
        
      );
}

export default AvailableShifts;
