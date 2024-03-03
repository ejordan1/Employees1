import {
    formatDistance,
    subDays,
    addDays,
    getDay,
    startOfWeek,
    lastDayOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    compareAsc,
  } from "date-fns";

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

export function createShiftsByDay(shifts) {
    let shiftsByDay = {};

    shifts.forEach((shift) => {
      let thisDay = format(shift.startdatetime, formatDateStringKey);
      if (!shiftsByDay.hasOwnProperty(thisDay)) {
        shiftsByDay[thisDay] = [];
      }
      shift.startdatetime = new Date (shift.startdatetime);
      shift.enddatetime = new Date (shift.enddatetime);
      shiftsByDay[thisDay].push(shift); // just the id, and should be sorted
    });
    return shiftsByDay;
  }

  // takes in an object with keys of perm id, and values of perms, ignores the keys...
  // could also delete this method and simply pass in the object.values, and have it as a generic method to sort anything by date
  export function createPermsByDay(perms) {
    let permsByDay = {};

    Object.values(perms).forEach((perm) => {
      let thisDay = format(perm.startdatetime, formatDateStringKey);
      if (!permsByDay.hasOwnProperty(thisDay)) {
        permsByDay[thisDay] = [];
      }
      perm.startdatetime = new Date (perm.startdatetime);
      perm.enddatetime = new Date (perm.enddatetime);
      permsByDay[thisDay].push(perm); // just the id, and should be sorted
    });
    return permsByDay;
  }

  export function getThisWeekDates() {
    let s = startOfWeek(new Date());
    let e = endOfWeek(new Date());
    let datesOfThisWeek = eachDayOfInterval({
      start: s,
      end: e,
    });
    for (let i = 0; i < datesOfThisWeek.length; i++) {
      datesOfThisWeek[i] = format(datesOfThisWeek[i], "yyyy-MM-dd");
    }
    return datesOfThisWeek;
  }

  // I had to put export default as something
//   export default test;