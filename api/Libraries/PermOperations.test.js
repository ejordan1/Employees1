import { createPermDictFromData } from "./PermOperations.js";

// three chucks of "PermUser" data (where you can extract with perm, and permUser)
// followed by one that is just the perm
let samplePermsPermUsersData = [
  {
    enddatetime: "0997-01-04T15:16:42.000Z",
    firstname: "thisisfirstnameof9",
    id: 38,
    lastname: "lastnameof9",
    perm_userid: 28,
    permid: 38,
    position: "testpos222222",
    slots: 43,
    startdatetime: "0997-01-04T15:16:42.000Z",
    uid: 9,
  },
  {
    enddatetime: "2024-01-04T21:24:44.000Z",
    firstname: "Harry",
    id: 42,
    lastname: "Potter",
    perm_userid: 32,
    permid: 42,
    position: "permposition333",
    slots: 99,
    startdatetime: "2024-01-04T21:23:44.000Z",
    uid: 7,
  },
  {
    enddatetime: "2024-01-04T21:24:44.000Z",
    firstname: "Kim",
    id: 42,
    lastname: "Jacobs",
    perm_userid: 34,
    permid: 42,
    position: "permposition333",
    slots: 99,
    startdatetime: "2024-01-04T21:23:44.000Z",
    uid: 5,
  },
  {
    enddatetime: "0997-01-04T21:16:42.000Z",
    firstname: null,
    id: 51,
    lastname: null,
    perm_userid: null,
    permid: null,
    position: "halloh",
    slots: 323,
    startdatetime: "0997-01-04T21:16:42.000Z",
    uid: null,
  },
];

const resultExpected =
'{"38":{"startdatetime":"0997-01-04T15:16:42.000Z","enddatetime":"0997-01-04T15:16:42.000Z","position":"testpos222222","slots":43,"permUsers":{"28":{"firstname":"thisisfirstnameof9","lastname":"lastnameof9","uid":9}},"id":38},"42":{"startdatetime":"2024-01-04T21:23:44.000Z","enddatetime":"2024-01-04T21:24:44.000Z","position":"permposition333","slots":99,"permUsers":{"32":{"firstname":"Harry","lastname":"Potter","uid":7},"34":{"firstname":"Kim","lastname":"Jacobs","uid":5}},"id":42},"51":{"startdatetime":"0997-01-04T21:16:42.000Z","enddatetime":"0997-01-04T21:16:42.000Z","position":"halloh","slots":323,"permUsers":{},"id":51}}';

test("createPermDictFromData", () => {
  // the object comes in as a combination of perms and permusers
  let permsAndPermUsers = createPermDictFromData(samplePermsPermUsersData);
  let stringOfResult = JSON.stringify(permsAndPermUsers);
  expect(JSON.stringify(permsAndPermUsers)).toBe(resultExpected);
});
