import createPermDictFromData from "./PermOperations.js"

// string wasnt working
// let samplePermsPermUsers = '[{"id":38,"startdatetime":"0997-01-04T15:16:42.000Z","enddatetime":"0997-01-04T15:16:42.000Z","position":"testpos222222","perm_userid":28,"permid":38,"uid":9,"firstname":"thisisfirstnameof9","lastname":"lastnameof9","slots":43},{"id":42,"startdatetime":"2024-01-04T21:23:44.000Z","enddatetime":"2024-01-04T21:24:44.000Z","position":"permposition333","perm_userid":32,"permid":42,"uid":7,"firstname":"Harry","lastname":"Potter","slots":99},{"id":42,"startdatetime":"2024-01-04T21:23:44.000Z","enddate…pos","perm_userid":20,"permid":49,"uid":5,"firstname":"Kim","lastname":"Jacobs","slots":13},{"id":50,"startdatetime":"0997-01-04T21:16:42.000Z","enddatetime":"0997-01-04T21:16:42.000Z","position":"halloh","perm_userid":null,"permid":null,"uid":null,"firstname":null,"lastname":null,"slots":323},{"id":51,"startdatetime":"0997-01-04T21:16:42.000Z","enddatetime":"0997-01-04T21:16:42.000Z","position":"halloh","perm_userid":null,"permid":null,"uid":null,"firstname":null,"lastname":null,"slots":323}]'
// let sampleExpectedResult = '{"38":{"startdatetime":"0997-01-04T15:16:42.000Z","enddatetime":"0997-01-04T15:16:42.000Z","position":"testpos222222","slots":43,"permUsers":{"28":{"firstname":"thisisfirstnameof9","lastname":"lastnameof9","uid":9}},"id":38},"42":{"startdatetime":"2024-01-04T21:23:44.000Z","enddatetime":"2024-01-04T21:24:44.000Z","position":"permposition333","slots":99,"permUsers":{"32":{"firstname":"Harry","lastname":"Potter","uid":7},"34":{"firstname":"Kim","lastname":"Jacobs","uid":5}},"id":42},"44":{"startd…tion":"14pos","slots":13,"permUsers":{"18":{"firstname":"Tom","lastname":"jones","uid":4},"19":{"firstname":"Nancy","lastname":"Drew","uid":6},"20":{"firstname":"Kim","lastname":"Jacobs","uid":5}},"id":49},"50":{"startdatetime":"0997-01-04T21:16:42.000Z","enddatetime":"0997-01-04T21:16:42.000Z","position":"halloh","slots":323,"permUsers":{},"id":50},"51":{"startdatetime":"0997-01-04T21:16:42.000Z","enddatetime":"0997-01-04T21:16:42.000Z","position":"halloh","slots":323,"permUsers":{},"id":51}}'

// test("createPermDictFromData", () => {
//     // the object comes in as a combination of perms and permusers
//     let rawData = JSON.parse(samplePermsPermUsers);
//     let permsAndPermUsers = createPermDictFromData(rawData);
//     expect(JSON.stringify(permsAndPermUsers)).toBe(sampleExpectedResult);
//   });
  