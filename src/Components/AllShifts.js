import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllShifts.module.scss";
import SingleAllShift from "./SingleAllShift";
import EditShiftModal from "./EditShiftModal";
import AddShiftModal from "./AddShiftModal";

function AllShifts() {
  const [allShifts, setAllShifts] = useState([]);

  function getShiftById(id) {
    for (let i = 0; i < allShifts.length; i++) {
      if (allShifts[i].id == id) {
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

  return (
    <div className="AllShifts">
      <div>
        <h1 className={styles.pageTitle}>Admin Schedule</h1>
      </div>
      <p> next is add </p>
      <AddShiftModal></AddShiftModal>
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
                  uid={shift.uid}
                >
                  asdf
                </SingleAllShift>
              </div>
            ))}
          </div>{" "}
        </div>
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
    </div>
  );
}

export default AllShifts;
