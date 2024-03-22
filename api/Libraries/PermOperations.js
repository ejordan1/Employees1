export function createPermDictFromData(userPermsData) {
    let permsDict = {};
    Object.keys(userPermsData).forEach((key) => {
      let dataRow = userPermsData[key];

      // create perm objects if doesn't exist
      if (!permsDict.hasOwnProperty(dataRow.perms_id)) {
        permsDict[dataRow.perms_id] = {
          perms_startdatetime: new Date(dataRow.perms_startdatetime),
          perms_enddatetime: new Date(dataRow.perms_enddatetime),
          perms_position: dataRow.perms_position,
          perms_slots: dataRow.perms_slots,
          permUsers: {},
          perms_id: dataRow.perms_id, // this is both the key, and this data field
        };
      }

      // if it has the user info, add a new entry to the perm.permUsers
      if (dataRow.firstname && dataRow.lastname && dataRow.perms_users_uid) {
        permsDict[dataRow.perms_id].permUsers[dataRow.perms_users_id] = {
          // naming it by the permUser id.
          firstname: dataRow.firstname,
          lastname: dataRow.lastname,
          uid: dataRow.perms_users_uid,
        };
      }
    });
    return permsDict;
  }