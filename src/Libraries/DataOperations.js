import { format, compareAsc } from "date-fns";

function test ()
{
    return (format(new Date(2014, 1, 11), "MM/dd/yyyy"));
}

// takes in an object with key values of the id of the shift as the key, and shift data as the data.
// method that takes in {id: {startdatetime: Date, enddatetime: Date, position: string, uid: number}}
// returns {'2024/10/16': {24: <shift data>, 33: <shift data>}} converting back to string for date, I think it works
// function OrganizeByDay(shifts)
// {
//     for (const [key, value] of Object.entries(shifts``)) {
//         console.log(`${key}: ${value}`);
//       }
// }

// export default OrganizeByDay;

const formatDateStringKey = "yyyy-MM-dd";

function createShiftsByDay(shifts) {
    let shiftsByDay = {};

    shifts.forEach((shift) => {
      let thisDay = format(shift.startdatetime, formatDateStringKey);
      if (!shiftsByDay.hasOwnProperty(thisDay)) {
        shiftsByDay[thisDay] = [];
      }

      shiftsByDay[thisDay].push(shift); // just the id, and should be sorted
    });
    return shiftsByDay;
  }

  export default createShiftsByDay;