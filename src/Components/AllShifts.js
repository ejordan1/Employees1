import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllShifts.module.scss";
import SingleAllShift from "./SingleAllShift";
import EditShiftModal from "./EditShiftModal";
import AddShiftModal from "./AddShiftModal";
import {
  mapObjectsToDate,
  thisWeekDates,
} from "../Libraries/DateOperations.js";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

function AllShifts() {

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [modalEditShift, setModalEditShift] = useState(null);

  const queryClient = useQueryClient(); // gets the queryclient

  const fetchAllShifts = async () => {
    const res = await axios.get(`/shifts/admin/all`);
    return mapObjectsToDate(res.data);
  };

  const {
    data: allShiftsData,
    error: allShiftsError, // not tested
    isLoading: allShiftsIsLoading, // not tested
  } = useQuery({
    queryKey: ["allshifts"],
    queryFn: fetchAllShifts,
    // select: (shiftsData)=> {mapObjectsToDate(shiftsData)}. Also an option, but doing it here wont affect the cache.
     // refetchInterval: 50000
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/shifts/admin/all`);
  //       setAllShiftsByDay(mapObjectsToDate(res.data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  function openEditModal() {
    setEditModalVisible(true);
  }

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <div className="AllShifts">
      <div>
        <h1 className={styles.pageTitle}>Admin Schedule</h1>
      </div>
      <p> next is add </p>

      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        {thisWeekDates.map((date) => (
          <div>
            <p>{date}</p>
            {allShiftsData && allShiftsData[date] ? (
              allShiftsData[date].map((shift) => (
                <div>
                  <p>{shift.id}</p>
                  <SingleAllShift
                    shift={shift}
                    openEditModal={openEditModal}
                    setModalValues={setModalEditShift}
                  ></SingleAllShift>
                </div>
              ))
            ) : (
              <p>no shifts</p>
            )}
          </div>
        ))}
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
