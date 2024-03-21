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
    isBefore
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
      let thisDay = format(shift.shifts_startdatetime, formatDateStringKey);
      if (!shiftByDay.hasOwnProperty(thisDay)) {
        shiftByDay[thisDay] = [];
      }
      shift.shifts_startdatetime = new Date (shift.shifts_startdatetime);
      shift.shifts_enddatetime = new Date (shift.shifts_enddatetime);
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

  function getFirstWeekDates()
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

  export function getAdjustedEndDate(startDate, endDate) {
    let tempDate = new Date();
    // need to look at month here
    tempDate.setFullYear(startDate.getFullYear());
    tempDate.setMonth(startDate.getMonth())
    tempDate.setDate(startDate.getDate());
    tempDate.setHours(endDate.getHours());
    tempDate.setMinutes(endDate.getMinutes());
    if (!isBefore(startDate, tempDate)) {
      tempDate = addDays(tempDate, 1);
    }
    console.log("adjusted endate: " + tempDate);
    return tempDate;
  }

  export const permWeekdaysDays = new Map();
  permWeekdaysDays.set("Sunday", new Date("Janurary 1, 0997"));
  permWeekdaysDays.set("Monday", new Date("Janurary 2, 0997"));
  permWeekdaysDays.set("Tuesday", new Date("Janurary 3, 0997"));
  permWeekdaysDays.set("Wednesday", new Date("Janurary 4, 0997"));
  permWeekdaysDays.set("Thursday", new Date("Janurary 5, 0997"));
  permWeekdaysDays.set("Friday", new Date("Janurary 6, 0997"));
  permWeekdaysDays.set("Saturday", new Date("Janurary 7, 0997"));


  export function getFinalStartDate(dayOfWeek, startDate)
  {
    let tempDate = new Date(permWeekdaysDays.get(dayOfWeek));
    tempDate.setHours(startDate.getHours());
    tempDate.setMinutes(startDate.getMinutes());
    return tempDate;
  }

  // I had to put export default as something
//   export default test;