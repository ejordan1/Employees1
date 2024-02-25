import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllPerms.module.scss";
import SingleAllperm from "./SingleAllPerm.js";
import SingleAllPerm from "./SingleAllPerm.js";
import EditPermModal from "./EditPermModal.js";
import AddPermModal from "./AddPermModal.js"

function AllPerms() {
  const [allPermsAndPermsUsers, setAllPermsAndPermsUsers] = useState([]);

  const [modalEditPerm, setModalEditPerm] = useState({
    id: null,
    position: "",
    starttime: 0,
    endtime: 0,
    slots: 0,
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

  const [createUserPermInputs, setCreateUserPermInputs] = useState({
    permid: 0,
    uid: 0,
  });



  const handleCreateUserPermChange = (e) => {
    setCreateUserPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitCreateUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        permid: createUserPermInputs.permid,
        uid: createUserPermInputs.uid,
      };
      const res = await axios.post(`/perms_users/add`, bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let permById = allPermsAndPermsUsers[e.target.id];

      setModalEditPerm({
        starttime: permById.starttime, // get input values from user
        endtime: permById.endtime, // get input values from user
        slots: permById.slots, // get input values from user
        id: e.target.id, // get input values from user
        position: permById.position,
      });
      setEditModalVisible(true);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDeleteUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        perm_userid: e.target.id,
      };
      const res = await axios.put(`/perms_users/delete`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
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

      {editModalVisible && (<EditPermModal
        closeModal={closeModal}
        id={modalEditPerm.id}
        position={modalEditPerm.position}
        starttime={modalEditPerm.starttime}
        endtime={modalEditPerm.endtime}
        slots={modalEditPerm.slots}
      ></EditPermModal>)}
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
                  {/* {Object.keys(allPermsFills[permKey].permUsers).map((permUserKey) => (
            <p>{permUserKey}</p>
          ))} */}

                  {Object.entries(allPermsAndPermsUsers[permKey].permUsers).map(
                    (keyvalue) => (
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
                    )
                  )}
                </div>
              </div>
            ))}

            {/* {" "}
            {allShifts.map((perm) => (
              <div>
                <SingleAllPerm
                  id={perm.id}
                  position={perm.position}
                  starttime={perm.starttime}
                  endtime={perm.endtime}
                >
                  asdf
                </SingleAllPerm>
              </div>
            ))} */}
          </div>{" "}
        </div>
      </div>

      <div className="createUserPermForm">
        <h1>Create UserPerm</h1>
        <form>
          <input
            required
            type="number"
            placeholder="permid"
            name="permid"
            onChange={handleCreateUserPermChange}
          />
          <input
            required
            type="number"
            placeholder="uid"
            name="uid"
            onChange={handleCreateUserPermChange}
          />
          <button onClick={handleSubmitCreateUserPerm}>Create User Perm</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AllPerms;
