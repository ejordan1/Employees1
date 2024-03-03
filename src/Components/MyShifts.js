import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift.js";
import SingleAvailableShift from "./SingleAvailableShift.js";
import styles from "./MyShifts.module.scss";
import PickupShiftModal from "./PickupShiftModal.js";
import DropShiftModal from "./DropShiftModal.js";
import {
  createShiftsByDay,
  getThisWeekDates,
  formatDateStringKey,
} from "../Libraries/DataOperations.js";
import {
  format
} from "date-fns";

function MyShifts() {
  const [myShifts, setMyShifts] = useState([]);

  const [myShiftsByDay, setMyShiftsByDay] = useState({});

  const [thisWeekDays, setThisWeekdays] = useState([]);

  const [availableShifts, setAvailableShiftsByDay] = useState([]);

  const [pickupModalVisible, setPickupModalVisible] = useState(false);

  const [dropModalVisible, setDropModalVisible] = useState(false);

  const [modalPickupShift, setModalPickupShift] = useState(null);

  const [modalDropShift, setModalDropShift] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/myshifts`);

        setThisWeekdays(getThisWeekDates());
        setMyShiftsByDay(createShiftsByDay(res.data));

        console.log(myShiftsByDay);
        setMyShifts(res.data);
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
        setAvailableShiftsByDay(createShiftsByDay(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const closePickupModal = () => {
    setPickupModalVisible(false);
  };

  const closeDropModal = () => {
    setDropModalVisible(false);
  };

  const dropModalOpen = () => {
    setDropModalVisible(true);
  };

  const pickupModalOpen = () => {
    setPickupModalVisible(true);
  };

  return (
    <div>
      <PickupShiftModal
        isVisible={pickupModalVisible}
        closeModal={closePickupModal}
        shift={modalPickupShift}
      ></PickupShiftModal>

      <DropShiftModal
        isVisible={dropModalVisible}
        closeModal={closeDropModal}
        shift={modalDropShift}
      ></DropShiftModal>
      <div>
        <h1 className={styles.pageTitle}>Your Active Shifts</h1>
      </div>
      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        {thisWeekDays.map((date) => (
          <div>
            <div>{date}</div>
            {myShiftsByDay && myShiftsByDay[date] ? (
              myShiftsByDay[date].map((shift) => (
                <div>
                  <p>{shift.id}</p>
                  <SingleMyShift
                    shift={shift}
                    openDropModal={dropModalOpen}
                    setModalValues={setModalDropShift}
                  ></SingleMyShift>
                </div>
              ))
            ) : (
              <p>no shifts</p>
            )}
            {availableShifts[date] ? (
              availableShifts[date].map((shift) => (
                <div>
                  <p>{shift.id}</p>
                  <SingleAvailableShift
                    shift={shift}
                    openPickupModal={pickupModalOpen}
                    setPickupModalValues={setModalPickupShift}
                  ></SingleAvailableShift>
                </div>
              ))
            ) : (
              <p>no avaiable shifts</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyShifts;
