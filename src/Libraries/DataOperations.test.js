 import { mapObjectsToDate } from "./DataOperations.js";

let sampleshifts = [
    {
      enddatetime: "2024-03-03T04:00:00.000Z",
      endtime: "66",
      id: 24,
      position: "Position 1",
      startdatetime: "2024-03-02T17:00:00.000Z",
      starttime: "455",
      uid: 9,
    },
    {
      enddatetime: "2024-03-02T04:00:00.000Z",
      endtime: "66",
      id: 25,
      position: "Position 2",
      startdatetime: "2024-03-01T17:00:00.000Z",
      starttime: "455",
      uid: 9,
    },
    {
      enddatetime: "2024-03-02T04:00:00.000Z",
      endtime: "66",
      id: 26,
      position: "Position 3",
      startdatetime: "2024-03-01T17:00:00.000Z",
      starttime: "455",
      uid: 9,
    },
    {
      enddatetime: "2024-03-03T04:00:00.000Z",
      endtime: "66",
      id: 27,
      position: "Position 4",
      startdatetime: "2024-03-03T17:00:00.000Z",
      starttime: "455",
      uid: 2,
    },
    {
      enddatetime: "2024-03-02T04:00:00.000Z",
      endtime: "66",
      id: 28,
      position: "Position 5",
      startdatetime: "2024-03-01T17:00:00.000Z",
      starttime: "455",
      uid: 5,
    },
  ];

const resultingObj = '{"2024-03-02":[{"enddatetime":"2024-03-03T04:00:00.000Z","endtime":"66","id":24,"position":"Position 1","startdatetime":"2024-03-02T17:00:00.000Z","starttime":"455","uid":9}],"2024-03-01":[{"enddatetime":"2024-03-02T04:00:00.000Z","endtime":"66","id":25,"position":"Position 2","startdatetime":"2024-03-01T17:00:00.000Z","starttime":"455","uid":9},{"enddatetime":"2024-03-02T04:00:00.000Z","endtime":"66","id":26,"position":"Position 3","startdatetime":"2024-03-01T17:00:00.000Z","starttime":"455","uid":9},{"enddatetime":"2024-03-02T04:00:00.000Z","endtime":"66","id":28,"position":"Position 5","startdatetime":"2024-03-01T17:00:00.000Z","starttime":"455","uid":5}],"2024-03-03":[{"enddatetime":"2024-03-03T04:00:00.000Z","endtime":"66","id":27,"position":"Position 4","startdatetime":"2024-03-03T17:00:00.000Z","starttime":"455","uid":2}]}';



test("mapObjectsToDate", () => {
  let shiftsByDay = mapObjectsToDate(sampleshifts);
  let stringOfObject = JSON.stringify(shiftsByDay);
  expect(stringOfObject).toBe(resultingObj);
});



