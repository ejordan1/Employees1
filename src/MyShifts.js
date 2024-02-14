import React, { useState, useEffect } from "react";
import axios from "axios";

function MyShifts() {



    const [myShifts, setMyShifts] = useState([]);

    function getShiftById(id)
    {
      for (let i = 0; i <  myShifts.length; i++)
      {
        if (myShifts[i].id == id)
        {
          return myShifts[i];
        }
      }
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/shifts/myshifts`);
            setMyShifts(res.data);
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
            endtime: shiftById.endtime,
            uid: shiftById.uid
          }
          console.log(shiftById);
           const res = await axios.put(`/shifts/drop`, bodyvalues);
          // const res = await axios.get(`/shifts/available`);
          //navigate("/");
        } catch (err) {
          //setError(err.response.data);
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
        <div style = {getStyle()} className = "MyShifts">
          {myShifts.map((shift)=>
          <div>
            <button id={shift.id} onClick={handleSubmit}>Drop</button>
            <p>{shift.starttime}</p>
            <p>{shift.endtime}</p>
            </div>
          )}

          <p></p>
        </div>
        
      );
}

export default MyShifts;
