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

export const firstWeekDates = getFirstWeekDates();

export const thisWeekDates = getThisWeekDates();

export const formatDateStringKey = "yyyy-MM-dd";

export function mapObjectsToDate(shift) {
    let shiftByDay = {};

    shift.forEach((shift) => {
      let thisDay = format(shift.startdatetime, formatDateStringKey);
      if (!shiftByDay.hasOwnProperty(thisDay)) {
        shiftByDay[thisDay] = [];
      }
      shift.startdatetime = new Date (shift.startdatetime);
      shift.enddatetime = new Date (shift.enddatetime);
      shiftByDay[thisDay].push(shift); // just the id, and should be sorted
    });
    return shiftByDay;
  }

  function getThisWeekDates() {
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

  export function getFirstWeekDates()
  {
    let firstDay = new Date('Janurary 1, 0997 00:00:00');
    let s = startOfWeek(firstDay);
    let e = endOfWeek(firstDay);
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