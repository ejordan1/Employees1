export function createPermDictFromData(userPermsData) {
    let permsDict = {};
    let a = JSON.stringify(userPermsData);
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