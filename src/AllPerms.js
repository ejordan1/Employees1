import React, { useState, useEffect } from "react";
import axios from "axios";

function AllPerms() {
  const [allPermsFills, setAllPermFills] = useState([]);

  // function getPermById(id) {
  //   for (let i = 0; i < allPermsFills.length; i++) {
  //     if (allPermsFills[i].id == id) {
  //       return allPermsFills[i];
  //     }
  //   }
  // }

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
        permsDict[dataRow.id].permUsers[dataRow.fillid] = {
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
        setAllPermFills(createPermDictFromData(res.data));
        console.log("hello");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [editPermInputs, setEditPermInputs] = useState({
    id: 0,
    starttime: 0,
    endtime: 0,
    slots: 0,
    position: ""
  });

  const [createPermInputs, setCreatePermInputs] = useState({
    starttime: 0,
    endtime: 0,
    slots: 0,
    position: ""
  });

  const handleEditPermChange = (e) => {
    setEditPermInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreatePermChange = (e) => {
    setCreatePermInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // might be a bad way to do this but works:
  // button id is set to the shift id, and is grabbed with e.target.id
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        // shiftid: shiftById.id,
        // starttime: shiftById.starttime,
        // endtime: shiftById.endtime

        starttime: editPermInputs.starttime,
        endtime: editPermInputs.endtime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
        id: editPermInputs.id,
      };
      const res = await axios.put(`/perms/edit`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      //setError(err.response.data);
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        id: e.target.id
      };
      const res = await axios.put(`/perms/delete`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      //setError(err.response.data);
    }
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        starttime: createPermInputs.starttime,
        endtime: createPermInputs.endtime,
        position: createPermInputs.position,
        slots: createPermInputs.slots,
      };
      const res = await axios.post(`/perms`, bodyvalues);
    } catch (err) {
      //setError(err.response.data);
    }
  };

  var getStyle = () => {
    return {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      margin: "50px",
      justifyContent: "space-around",
    };
  };

  return (
    <div style={getStyle()} className="AllShifts">
      {Object.keys(allPermsFills).map((permKey) => (
        <div>
          <p>PermId: {permKey}</p>
          <p>Position {allPermsFills[permKey].position}</p>
          <p>Starttime {allPermsFills[permKey].starttime}</p>
          <p>EndTime {allPermsFills[permKey].endtime}</p>
          <p>Slots: {allPermsFills[permKey].starttime}</p>
          <button id={permKey} onClick={handleSubmitEdit}>
            Edit Perm
          </button>
          <button id={permKey} onClick={handleSubmitDelete}>
            {/* shouldn't use same id for two buttons */}
            Delete Perm
          </button>

          <div>
            {/* {Object.keys(allPermsFills[permKey].permUsers).map((permUserKey) => (
            <p>{permUserKey}</p>
          ))} */}

            {Object.entries(allPermsFills[permKey].permUsers).map(
              (keyvalue) => (
                <div>
                  <p>
                    {"fillId: " +
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

      <div className="editPermForm">
        <h1>Edit Perm</h1>
        <form>
          <input
            required
            type="number"
            placeholder="id"
            name="id"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="number"
            placeholder="starttime"
            name="starttime"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="number"
            placeholder="endtime"
            name="endtime"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="number"
            placeholder="slots"
            name="slots"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="text"
            placeholder="position"
            name="position"
            onChange={handleEditPermChange}
          />
          <button onClick={handleSubmitEdit}>Edit Perm</button>
        </form>
      </div>
      

      <div className="createPermForm">
        <h1>Create Perm</h1>
        <form>
          <input
            required
            type="number"
            placeholder="starttime"
            name="starttime"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="number"
            placeholder="endtime"
            name="endtime"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="number"
            placeholder="slots"
            name="slots"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="text"
            placeholder="position"
            name="position"
            onChange={handleCreatePermChange}
          />
          <button onClick={handleSubmitCreate}>Create Perm</button>
        </form>
      </div>
    </div>
  );
}

export default AllPerms;
