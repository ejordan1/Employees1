import React, { useState, useEffect } from "react";
import axios from "axios";

function AllPerms() {
  const [allPermsFills, setAllPermFills] = useState([]);

  function getPermById(id) {
    for (let i = 0; i < allPermsFills.length; i++) {
      if (allPermsFills[i].id == id) {
        return allPermsFills[i];
      }
    }
  }

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
        permsDict[dataRow.permid].permUsers[dataRow.id] = {
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

  // might be a bad way to do this but works:
  // button id is set to the shift id, and is grabbed with e.target.id
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getPermById(e.target.id);
      const bodyvalues = {
        // doing this later
        // shiftid: shiftById.id,
        // starttime: shiftById.starttime,
        // endtime: shiftById.endtime

        starttime: 532, // get input values from user
        endtime: 839, // get input values from user
        uid: 3, // get input values from user
        id: 8, // get input values from user
      };
      console.log(shiftById);
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
      let shiftById = getPermById(e.target.id);
      const bodyvalues = {
        // doing this later
        shiftid: shiftById.id,
        starttime: shiftById.starttime,
        endtime: shiftById.endtime,
      };
      console.log(shiftById);
      const res = await axios.put(`/perms/delete`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      //setError(err.response.data);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        starttime: 112,
        endtime: 113,
        position: "permposition",
        slots: 99,
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
          {/* <p>{perm.starttime}</p>
          <p>{perm.endtime}</p> */}
          {/* <p>{perm.position}</p>
            <p>{perm.slots}</p> */}
        </div>
      ))}

      <p>
        <button onClick={handleSubmitAdd}>Create new Perm</button>
      </p>
    </div>
  );
}

export default AllPerms;
