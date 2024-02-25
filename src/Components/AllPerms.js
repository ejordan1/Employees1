import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllPerms.module.scss";
import SingleAllperm from "./SingleAllPerm.js";
import SingleAllPerm from "./SingleAllPerm.js";
import EditPermModal from "./EditPermModal.js";
import AddPermModal from "./AddPermModal.js";

function AllPerms() {
  const [allPermsAndPermsUsers, setAllPermsAndPermsUsers] = useState([]);

  const [modalEditPerm, setModalEditPerm] = useState({
    id: null,
    position: "",
    starttime: 0,
    endtime: 0,
    slots: 0,
    permUsers: {},
  });

  const [editModalVisible, setEditModalVisible] = useState(false);

  function createPermDictFromData(userPermsData) {
    let permsDict = {};

    Object.keys(userPermsData).forEach((key) => {
      let dataRow = userPermsData[key];

      // create perm objects if doesn't exist
      if (!permsDict.hasOwnProperty(dataRow.id)) {
        permsDict[dataRow.id] = {
          starttime: dataRow.starttime,
          endtime: dataRow.endtime,
          position: dataRow.position,
          slots: dataRow.slots,
          permUsers: {},
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
        setAllPermsAndPermsUsers(createPermDictFromData(res.data));
        console.log("hello");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let permById = allPermsAndPermsUsers[e.target.id];

      setModalEditPerm({
        starttime: permById.starttime,
        endtime: permById.endtime,
        slots: permById.slots,
        id: e.target.id,
        position: permById.position,
        permUsers: permById.permUsers,
      });
      setEditModalVisible(true);

    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setEditModalVisible(false);
  };

  return (
    <div>
      <AddPermModal>Create Perm</AddPermModal>
      <div className={styles.AllPerms}>
        <EditPermModal
          isVisible={editModalVisible}
          closeModal={closeModal}
          id={modalEditPerm.id}
          position={modalEditPerm.position}
          starttime={modalEditPerm.starttime}
          endtime={modalEditPerm.endtime}
          slots={modalEditPerm.slots}
          permUsers={modalEditPerm.permUsers}
        ></EditPermModal>
        <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
        <div className={styles.shiftsContainer}>
          <div>
            <h1 className={styles.weekday}>Sunday 2/9</h1>{" "}
            <div>
              {Object.keys(allPermsAndPermsUsers).map((permKey) => (
                <div>
                  <SingleAllPerm
                    id={permKey}
                    position={allPermsAndPermsUsers[permKey].position}
                    starttime={allPermsAndPermsUsers[permKey].starttime}
                    endtime={allPermsAndPermsUsers[permKey].endtime}
                    slots={allPermsAndPermsUsers[permKey].slots}
                  ></SingleAllPerm>
                  <button id={permKey} onClick={handleSubmitEdit}>
                    {/* shouldn't use same id for two buttons */}
                    Edit Perm
                  </button>

                  <div>

                    {Object.entries(
                      allPermsAndPermsUsers[permKey].permUsers
                    ).map((keyvalue) => (
                      <div>
                        <p>
                          {"perm_userid: " +
                            keyvalue[0] +
                            ", uid: " +
                            keyvalue[1].uid +
                            ", " +
                            keyvalue[1].firstname +
                            ", " +
                            keyvalue[1].lastname}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllPerms;
