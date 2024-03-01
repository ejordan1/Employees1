import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift.js";
import SingleAvailableShift from "./SingleAvailableShift.js";
import styles from "./MyShifts.module.scss";
import PickupShiftModal from "./PickupShiftModal.js";
import OrganizeByDay from "../Libraries/DataOperations.js";
import createShiftsByDay from "../Libraries/DataOperations.js";
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

function MyShifts() {
  const formatDateStringKey = "yyyy-MM-dd";
  const [myShifts, setMyShifts] = useState([]);

  const [shifts, setShifts] = useState({});

  const [shiftsByDay, setShiftsByDay] = useState({});

  const [thisWeekDays, setThisWeekdays] = useState([]);

  const [availableShifts, setAvailableShifts] = useState([]);

  const [pickupModalVisible, setPickupModalVisible] = useState(false);

  const [modalPickupShift, setModalPickupShift] = useState({
    id: null,
    position: "",
    starttime: 0,
    endtime: 0,
  });

  function getMyShiftById(id) {
    for (let i = 0; i < myShifts.length; i++) {
      if (myShifts[i].id == id) {
        return myShifts[i];
      }
    }
  }

  function getAvailableShiftById(id) {
    for (let i = 0; i < availableShifts.length; i++) {
      if (availableShifts[i].id == id) {
        return availableShifts[i];
      }
    }
  }

  function getThisWeekDays() {
    let s = startOfWeek(new Date());
    let e = endOfWeek(new Date());
    let datesOfThisWeek = eachDayOfInterval({
      start: s,
      end: e,
    });
    return datesOfThisWeek;
  }

  // creates map of dates, and the id's of the shifts that start on that date
  // was created based on the key value pairs
  // function createShiftsByDay(shifts) {
  //   let shiftsByDay = {};

  //   shifts.forEach((shift) => {
  //     let thisDay = format(shift.startdatetime, formatDateStringKey);
  //     if (!shiftsByDay.hasOwnProperty(thisDay)) {
  //       shiftsByDay[thisDay] = [];
  //     }

  //     shiftsByDay[thisDay].push(shift); // just the id, and should be sorted
  //   });
  //   return shiftsByDay;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/myshifts`);
        const weekDays = getThisWeekDays();

        for (let i = 0; i < weekDays.length; i++) {
          weekDays[i] = format(weekDays[i], formatDateStringKey);
        }
        setThisWeekdays(weekDays);
        setShiftsByDay(createShiftsByDay(res.data));

        console.log(shiftsByDay);
        setMyShifts(res.data);

        // console.log("from date operations:" + OrganizeByDay);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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

  const closeModal = () => {
    setPickupModalVisible(false);
  };

  const handleDropSubmit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getMyShiftById(e.target.id);
      const bodyvalues = {
        id: shiftById.id,
        starttime: shiftById.starttime,
        endtime: shiftById.endtime,
        uid: shiftById.uid,
      };
      console.log(shiftById);
      const res = await axios.put(`/shifts/drop`, bodyvalues);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePickupSubmit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getAvailableShiftById(e.target.id);
      const values = {
        id: shiftById.id,
        starttime: shiftById.starttime,
        endtime: shiftById.endtime,
        position: shiftById.position,
      };
      setModalPickupShift(values);
      setPickupModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <PickupShiftModal
        isVisible={pickupModalVisible}
        closeModal={closeModal}
        id={modalPickupShift.id}
        position={modalPickupShift.position}
        starttime={modalPickupShift.starttime}
        endtime={modalPickupShift.endtime}
      ></PickupShiftModal>
      <div>
        <h1 className={styles.pageTitle}>Your Active Shifts</h1>
      </div>
      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        {thisWeekDays.map((date) => (
          <div>
            <div>{date}</div>
            {shiftsByDay[date] ? (
              shiftsByDay[date].map((shift) => (
                <div>
                  <p>{shift.id}</p>
                  <SingleMyShift id={shift.id} position={shift.position} starttime={shift.startdatetime} endtime={shift.enddatetime} drop={handleDropSubmit}></SingleMyShift>
                </div>
              ))
            ) : (
              <p>no shifts</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyShifts;
