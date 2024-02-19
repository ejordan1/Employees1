import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift";

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
        <div style = {getStyle()} className = "MyShifts">
          {myShifts.map((shift)=>
          <div>
            <SingleMyShift id={shift.id} position={shift.position} starttime={shift.starttime} endtime={shift.endtime} drop={handleSubmit}>asdf</SingleMyShift>
            </div>
          )}

          <p></p>
        </div>
        
      );
}

export default MyShifts;
