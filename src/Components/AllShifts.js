import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllShifts.module.scss";
import SingleAllShift from "./SingleAllShift";
import EditShiftModal from "./EditShiftModal";
import AddShiftModal from "./AddShiftModal";
import createShiftsByDay from "../Libraries/DataOperations.js";
import { getThisWeekDays } from "../Libraries/DataOperations.js";
import {
  formatDistance,
  subDays,
  addDays,
  getDay,
  startOfWeek,
  lastDayOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
} from "date-fns";

function AllShifts() {
  const [allShiftsByDay, setAllShiftsByDay] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [modalEditShift, setModalEditShift] = useState(null);

  const [thisWeekDays, setThisWeekdays] = useState([]);

  // function getShiftById(id) {
  //   for (let i = 0; i < allShifts.length; i++) {
  //     if (allShifts[i].id == id) {
  //       return allShifts[i];
  //     }
  //   }
  // }
  function setWeekDays()
  {
    const weekDays = getThisWeekDays();

    for (let i = 0; i < weekDays.length; i++) {
      weekDays[i] = format(weekDays[i], "yyyy-MM-dd");
    }
    setThisWeekdays(weekDays);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        // need to call this at the beginning once
        setWeekDays();

        const res = await axios.get(`/shifts/admin/all`);
        setAllShiftsByDay(createShiftsByDay(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // might be a bad way to do this but works:
  // button id is set to the shift id, and is grabbed with e.target.id
  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // let shiftById = getShiftById(e.target.id);

  //     setModalEditShift({
  //       starttime: shiftById.starttime,
  //       endtime: shiftById.endtime,
  //       uid: shiftById.uid,
  //       id: shiftById.id,
  //       position: shiftById.position,
  //     });

  //     setEditModalVisible(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  function openEditModal() {
    setEditModalVisible(true);
  }

  const closeEditModal = () => {
    setEditModalVisible(false);
  };


  // can add styles weekday to weekdays
  return (
    <div className="AllShifts">
      <div>
        <h1 className={styles.pageTitle}>Admin Schedule</h1>
      </div>
      <p> next is add </p>

      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
      {thisWeekDays.map((date) => {
                    <div>date: {date}</div>
                    // {allShiftsByDay[date] ? (
                    //   allShiftsByDay[date].map((shift) => (
                    //     <div>
                    //       <p>{shift.id}</p>
                    //       <SingleAllShift
                    //         shift={shift}
                    //         openDropModal={dropModalOpen}
                    //         setModalValues={setModalDropShift}
                    //       ></SingleAllShift>
                    //     </div>
                    //   ))
                    // ) : (
                    //   <p>no shifts</p>
                    // )}
      })}
      </div>
      <AddShiftModal></AddShiftModal>
      <EditShiftModal
        isVisible={editModalVisible}
        closeModal={closeEditModal}
        shift={modalEditShift}
      ></EditShiftModal>
    </div>
  );
}

export default AllShifts;
