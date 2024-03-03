import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllPerms.module.scss";
import SingleAllperm from "./SingleAllPerm.js";
import SingleAllPerm from "./SingleAllPerm.js";
import EditPermModal from "./EditPermModal.js";
import AddPermModal from "./AddPermModal.js";

function AllPerms() {
  const [allPermsAndPermsUsers, setAllPermsAndPermsUsers] = useState([]);

    // could change this to a single perm like I did in shifts
  const [modalEditPerm, setModalEditPerm] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);

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
          id: dataRow.id // added id inside of it as well
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

  // const handleSubmitEdit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let permById = allPermsAndPermsUsers[e.target.id];

  //     setModalEditPerm({
  //       startdatetime: permById.startdatetime,
  //       enddatetime: permById.enddatetime,
  //       slots: permById.slots,
  //       id: e.target.id,
  //       position: permById.position,
  //       permUsers: permById.permUsers,
  //     });
  //     setEditModalVisible(true);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const closeModal = () => {
    setEditModalVisible(false);
  };

  const editModalOpen = () => {
    setEditModalVisible(true);
  }

  return (
    <div>
      <AddPermModal>Create Perm</AddPermModal>
      <div className={styles.AllPerms}>
        <EditPermModal
          isVisible={editModalVisible}
          closeModal={closeModal}
          perm={modalEditPerm}
          // id={modalEditPerm.perm.id}
          // position={modalEditPerm.perm.position}
          // startdatetime={modalEditPerm.perm.startdatetime}
          // enddatetime={modalEditPerm.perm.enddatetime}
          // slots={modalEditPerm.perm.slots}
          // permUsers={modalEditPerm.perm.permUsers}
        ></EditPermModal>
        <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
        <div className={styles.shiftsContainer}>
          <div>
            <h1 className={styles.weekday}>Sunday 2/9</h1>{" "}
            <div>
              {Object.keys(allPermsAndPermsUsers).map((permKey) => (
                <div>
                  <SingleAllPerm
                    // id={permKey}
                    // position={allPermsAndPermsUsers[permKey].position}
                    // startdatetime={allPermsAndPermsUsers[permKey].startdatetime}
                    // enddatetime={allPermsAndPermsUsers[permKey].enddatetime}
                    // slots={allPermsAndPermsUsers[permKey].slots}
                    openEditModal={editModalOpen}
                    perm={allPermsAndPermsUsers[permKey]}
                  setModalValues={setModalEditPerm}
                  ></SingleAllPerm>

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
