import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllPerms.module.scss";
import SingleAllPerm from "./SingleAllPerm.js";
import EditPermModal from "./EditPermModal.js";
import AddPermModal from "./AddPermModal.js";
import {
  firstWeekDates,
  mapObjectsToDate,
} from "../Libraries/DateOperations.js";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// things to look at: where to call the "getThisWeeksDates? maybe could have that
// as a constant in date operations?"

function AllPerms() {

  // object of perms with key as perm id. May be useful later
  const [allPermsAndPermsUsers, setAllPermsAndPermsUsers] = useState([]);

  const [modalEditPerm, setModalEditPerm] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [permsByDay, setPermsByDay] = useState(null);

  const fetchAllPermsUsers = async () => {
    const res = await axios.get(`/perms`);
    refreshModalPerm(res.data); // not the right place to do this
    return res.data;
    //return mapObjectsToDate(res.data);
  };

  const refreshModalPerm = (permsById) => {
    if (modalEditPerm) // verify that it goes to null in between
    {
      setModalEditPerm(permsById[modalEditPerm.id])
    }
  }

  const {
    data: allPermsData,
    error: allPermsError, // not tested
    isLoading: allPermsIsLoading, // not tested
  } = useQuery({
    queryKey: ["allPermsUsers"],
    queryFn: fetchAllPermsUsers,
    select: (data)=> mapObjectsToDate(Object.values(data)), // does not affect cache (according to docs)
     
    
    // refetchInterval: 50000
  });

  const closeModal = () => {
    // here possibly erase perm data
    setEditModalVisible(false);
  };

  const editModalOpen = () => {
    setEditModalVisible(true);
  };

  return (
    <div>
      <AddPermModal>Create Perm</AddPermModal>
      <div className={styles.AllPerms}>
        <EditPermModal
          isVisible={editModalVisible}
          closeModal={closeModal}
          perm={modalEditPerm}
        ></EditPermModal>
        <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
        <div className={styles.shiftsContainer}>
          {/* I had to include PermsByDay && below, not sure why it reaches there , becaues in myshifts it doesnt */}
          {firstWeekDates.map((date) => (
            <div>
              <div>{date}</div>
              {allPermsData && allPermsData[date] ? (
                allPermsData[date].map((perm) => (
                  <div>
                    <SingleAllPerm
                      openEditModal={editModalOpen}
                      perm={perm}
                      setModalValues={setModalEditPerm}
                    ></SingleAllPerm>

                    <div></div>
                  </div>
                ))
              ) : (
                <p>no perms</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPerms;
