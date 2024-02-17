import React, { useState, useEffect } from "react";
import axios from "axios";

function AllShifts() {



    const [allShifts, setAllShifts] = useState([]);

    function getShiftById(id)
    {
      for (let i = 0; i <  allShifts.length; i++)
      {
        if (allShifts[i].id == id)
        {
          return allShifts[i];
        }
      }
    }


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/shifts/admin/all`);
            setAllShifts(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);

      // might be a bad way to do this but works:
      // button id is set to the shift id, and is grabbed with e.target.id
      const handleSubmitEdit = async (e) => {
        e.preventDefault();
        try {
          let shiftById = getShiftById(e.target.id);
          const bodyvalues = {
            // doing this later
            // shiftid: shiftById.id,
            // starttime: shiftById.starttime,
            // endtime: shiftById.endtime

            starttime: 532, // get input values from user
            endtime: 839, // get input values from user
            uid: 3, // get input values from user
            id: 8 // get input values from user
          }
          console.log(shiftById);
           const res = await axios.put(`/shifts/admin/edit`, bodyvalues);
          // const res = await axios.get(`/shifts/available`);
          //navigate("/");
        } catch (err) {
          //setError(err.response.data);
        }
      };

      const handleSubmitDelete = async (e) => {
        e.preventDefault();
        try {
          let shiftById = getShiftById(e.target.id);
          const bodyvalues = {
            // doing this later
             shiftid: shiftById.id,
             starttime: shiftById.starttime,
             endtime: shiftById.endtime

          }
          console.log(shiftById);
           const res = await axios.put(`/shifts/admin/delete`, bodyvalues);
          // const res = await axios.get(`/shifts/available`);
          //navigate("/");
        } catch (err) {
          //setError(err.response.data);
        }
      };

      const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
          const bodyvalues = {
            // doing this later
             starttime: 112,
             endtime: 113,
             position: "housekeeping",
             uid: 9
          }
           const res = await axios.post(`/shifts/admin/add`, bodyvalues);
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
        <div style = {getStyle()} className = "AllShifts">
          {allShifts.map((shift)=>
          <div>
            <button id={shift.id} onClick={handleSubmitEdit}>Edit Shift</button>
            <button id={shift.id} onClick={handleSubmitDelete}>Delete Shift</button>
            <p>{shift.starttime}</p>
            <p>{shift.endtime}</p>
            </div>
          )}

          <p><button onClick={handleSubmitAdd}>Add Shift</button></p>
        </div>
        
      );
}

export default AllShifts;