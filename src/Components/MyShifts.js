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
} from "../Libraries/DateOperations.js";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

function MyShifts() {

  const [pickupModalVisible, setPickupModalVisible] = useState(false);

  const [dropModalVisible, setDropModalVisible] = useState(false);

  const [modalPickupShift, setModalPickupShift] = useState(null);

  const [modalDropShift, setModalDropShift] = useState(null);

  const queryClient = useQueryClient();

  const fetchMyShifts = async () => {
    const res = await axios.get(`/shifts/myshifts`);
    return mapObjectsToDate(res.data);
  };

  const {
    data: myShiftsData,
    error: myShiftsError, // not tested
    isLoading: myShiftsIsLoading, // not tested
  } = useQuery({
    queryKey: ["myshifts"],
    queryFn: fetchMyShifts,
  });

  const fetchAvailableShifts = async () => {
    const res = await axios.get(`/shifts/available`);
    return mapObjectsToDate(res.data);
  };

  const {
    data: availableShiftsData,
    error: availableShiftsError, // not tested
    isLoading: availableShiftsIsLoadingError, // not tested
  } = useQuery({
    queryKey: ["availableshifts"],
    queryFn: fetchAvailableShifts,
     // refetchInterval: 50000
  });

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
            {myShiftsData && myShiftsData[date] ? (
              myShiftsData[date].map((shift) => (
                <div>
                  <p>{shift.shifts_id}</p>
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
            {availableShiftsData && availableShiftsData[date] ? (
              availableShiftsData[date].map((shift) => (
                <div>
                  <p>{shift.shifts_id}</p>
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
