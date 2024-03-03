import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift.js";
import SingleAvailableShift from "./SingleAvailableShift.js";
import styles from "./MyShifts.module.scss";
import PickupShiftModal from "./PickupShiftModal.js";
import DropShiftModal from "./DropShiftModal.js";
import {
  mapObjectsToDate,
  thisWeekDates,
} from "../Libraries/DataOperations.js";

function MyShifts() {

  const [myShiftsByDay, setMyShiftsByDay] = useState({});

  const [availableShifts, setAvailableShiftsByDay] = useState([]);

  const [pickupModalVisible, setPickupModalVisible] = useState(false);

  const [dropModalVisible, setDropModalVisible] = useState(false);

  const [modalPickupShift, setModalPickupShift] = useState(null);

  const [modalDropShift, setModalDropShift] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/myshifts`);

        setMyShiftsByDay(mapObjectsToDate(res.data));

        console.log(myShiftsByDay);
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
        setAvailableShiftsByDay(mapObjectsToDate(res.data));
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
        {thisWeekDates.map((date) => (
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
