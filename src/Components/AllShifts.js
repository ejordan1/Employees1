import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllShifts.module.scss";
import SingleAllShift from "./SingleAllShift";

function AllShifts() {
  const [allShifts, setAllShifts] = useState([]);

  function getShiftById(id) {
    for (let i = 0; i < allShifts.length; i++) {
      if (allShifts[i].id == id) {
        return allShifts[i];
      }
    }
  }

  const [createShiftInputs, setCreateShiftInputs] = useState({
    starttime: 0,
    endtime: 0,
    position: "",
    uid: null,
  });

  const handleCreateShiftChange = (e) => {
    setCreateShiftInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
        id: 8, // get input values from user
      };
      console.log(shiftById);
      const res = await axios.put(`/shifts/admin/edit`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      console.log(err);
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
        endtime: shiftById.endtime,
      };
      console.log(shiftById);
      const res = await axios.put(`/shifts/admin/delete`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        starttime: createShiftInputs.starttime,
        endtime: createShiftInputs.endtime,
        position: createShiftInputs.position,
        uid: createShiftInputs.uid,
      };
      const res = await axios.post(`/shifts/admin/add`, bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="AllShifts">
      <div>
        <h1 className={styles.pageTitle}>Your Active Shifts</h1>
      </div>

      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        <div>
          <h1 className={styles.weekday}>Sunday 2/9</h1>{" "}
          <div>
            {" "}
            {allShifts.map((shift) => (
              <div>
                <SingleAllShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  
                >
                  asdf
                </SingleAllShift>
              </div>
            ))}
          </div>{" "}
        </div>




        <p></p>
      </div>

      {/* {allShifts.map((shift) => (
        <div>
          <button id={shift.id} onClick={handleSubmitEdit}>
            Edit Shift
          </button>
          <button id={shift.id} onClick={handleSubmitDelete}>
            Delete Shift
          </button>
          <p>{shift.starttime}</p>
          <p>{shift.endtime}</p>
          <p>{"uid: " + shift.uid}</p>
        </div>
      ))} */}

      <div className="createShiftForm">
        <h1>Create Shift</h1>
        <form>
          <input
            required
            type="number"
            placeholder="starttime"
            name="starttime"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="number"
            placeholder="endtime"
            name="endtime"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="number"
            placeholder="uid (optional)"
            name="uid"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="text"
            placeholder="position"
            name="position"
            onChange={handleCreateShiftChange}
          />
          <button onClick={handleSubmitCreate}>Create Shift</button>
        </form>
      </div>
    </div>
  );
}

export default AllShifts;
