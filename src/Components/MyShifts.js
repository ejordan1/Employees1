import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift";

function MyShifts() {
  const [myShifts, setMyShifts] = useState([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getShiftById(id) {
    for (let i = 0; i < myShifts.length; i++) {
      if (myShifts[i].id == id) {
        return myShifts[i];
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/myshifts`);
        setMyShifts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getShiftById(e.target.id);
      const bodyvalues = {
        shiftid: shiftById.id,
        starttime: shiftById.starttime,
        endtime: shiftById.endtime,
        uid: shiftById.uid,
      };
      console.log(shiftById);
      const res = await axios.put(`/shifts/drop`, bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };

  var getStyle = () => {
    return {
      display: "grid",
      gap: "20px",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    };
  };

  var getTitleStyle = () => {
    return {
      textAlign: "center"
    };
  };

  return (
    <div style={getTitleStyle()}>
            <h1 >Your Active Shifts</h1>
    <div style={getStyle()} className="MyShifts">

      <div>
        <h1>Sunday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Monday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Tuesday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Wednesday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Thrusday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Friday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>

      <div>
        <h1>Saturday</h1>{" "}
        <div>
          {" "}
          {myShifts.map((shift) => (
            <div>
              <SingleMyShift
                id={shift.id}
                position={shift.position}
                starttime={shift.starttime}
                endtime={shift.endtime}
                drop={handleSubmit}
              >
                asdf
              </SingleMyShift>
            </div>
          ))}
        </div>{" "}
      </div>






      <p></p>
    </div>
    </div>
  );
}

export default MyShifts;
