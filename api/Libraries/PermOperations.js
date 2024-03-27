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

    // if this is a permuser
    if (dataRow.perms_users_id) {
      if (dataRow.perms_users_uid) { // if it has a user (not empty)
        permsDict[dataRow.perms_id].permUsers[dataRow.perms_users_id] = {
          // naming it by the permUser id.
          firstname: dataRow.firstname,
          lastname: dataRow.lastname,
          uid: dataRow.perms_users_uid,
        };
      } else { // empty permuser
        permsDict[dataRow.perms_id].permUsers[dataRow.perms_users_id] = {
          firstname: "", // possible better to just not include this at all
          lastname: "",
          uid: -1,
        };
      }
    }
  });
  return permsDict;
}

// export function createPermDictFromData(userPermsData) {
//   let permsDict = {};
//   Object.keys(userPermsData).forEach((key) => {
//     let dataRow = userPermsData[key];

//     // create perm objects if doesn't exist
//     if (!permsDict.hasOwnProperty(dataRow.perms_id)) {
//       permsDict[dataRow.perms_id] = {
//         perms_startdatetime: new Date(dataRow.perms_startdatetime),
//         perms_enddatetime: new Date(dataRow.perms_enddatetime),
//         perms_position: dataRow.perms_position,
//         perms_slots: dataRow.perms_slots,
//         permUsers: {},
//         perms_id: dataRow.perms_id, // this is both the key, and this data field
//       };
//     }

//     // if it has the user info, add a new entry to the perm.permUsers
//     if (dataRow.firstname && dataRow.lastname && dataRow.perms_users_uid) {
//       permsDict[dataRow.perms_id].permUsers[dataRow.perms_users_id] = {
//         // naming it by the permUser id.
//         firstname: dataRow.firstname,
//         lastname: dataRow.lastname,
//         uid: dataRow.perms_users_uid,
//       };
//     }
//   });
//   return permsDict;
// }

// a pure perm looks like this:
// firstname:
// null
// lastname:
// null
// perms_enddatetime:
// Wed Jan 04 0997 07:23:44 GMT-0752 (Pacific Standard Time)
// perms_id:
// 56
// perms_position:
// '12'
// perms_slots:
// 11
// perms_startdatetime:
// Wed Jan 04 0997 07:23:44 GMT-0752 (Pacific Standard Time)
// perms_users_id:
// null
// perms_users_uid:
// null

// a permuser with uid filled looks like this:
// firstname:
// '"hello"'
// lastname:
// '"lastname"'
// perms_enddatetime:
// Wed Jan 04 0997 07:23:44 GMT-0752 (Pacific Standard Time)
// perms_id:
// 59
// perms_position:
// '23'
// perms_slots:
// 34
// perms_startdatetime:
// Wed Jan 04 0997 07:23:44 GMT-0752 (Pacific Standard Time)
// perms_users_id:
// 112
// perms_users_uid:
// 3
