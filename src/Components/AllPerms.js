import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllPerms.module.scss";
import SingleAllPerm from "./SingleAllPerm.js";
import EditPermModal from "./EditPermModal.js";
import AddPermModal from "./AddPermModal.js";
import {
  firstWeekDates,
  mapObjectsToDate,
} from "../Libraries/DataOperations.js";

// things to look at: where to call the "getThisWeeksDates? maybe could have that
// as a constant in date operations?"

function AllPerms() {

  // object of perms with key as perm id. May be useful later
  const [allPermsAndPermsUsers, setAllPermsAndPermsUsers] = useState([]);

  const [modalEditPerm, setModalEditPerm] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [permsByDay, setPermsByDay] = useState(null);

  function createPermDictFromData(userPermsData) {
    let permsDict = {};

    Object.keys(userPermsData).forEach((key) => {
      let dataRow = userPermsData[key];

      // create perm objects if doesn't exist
      if (!permsDict.hasOwnProperty(dataRow.id)) {
        permsDict[dataRow.id] = {
          startdatetime: new Date(dataRow.startdatetime),
          enddatetime: new Date(dataRow.enddatetime),
          position: dataRow.position,
          slots: dataRow.slots,
          permUsers: {},
          id: dataRow.id, // this is both the key, and this data field
        };
      }

      // if it has the user info, add a new entry to the perm.permUsers
      if (dataRow.firstname && dataRow.lastname && dataRow.uid) {
        permsDict[dataRow.id].permUsers[dataRow.perm_userid] = {
          // naming it by the permUser id.
          firstname: dataRow.firstname,
          lastname: dataRow.lastname,
          uid: dataRow.uid,
        };
      }
    });
    return permsDict;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/perms`);
        let permDict = createPermDictFromData(res.data);
        setAllPermsAndPermsUsers(permDict);
        
        let permsByDayTest = mapObjectsToDate(Object.values(permDict));
        setPermsByDay(permsByDayTest);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const closeModal = () => {
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
              {permsByDay && permsByDay[date] ? (
                permsByDay[date].map((perm) => (
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
