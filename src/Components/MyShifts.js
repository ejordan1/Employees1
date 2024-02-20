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

  const getStyle = () => {
    return {
      display: "grid",
      gap: "5px",
      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      margin: "0px 30px 0px 30px"
    };
  };

  const getTitleStyle = () => {
    return {
      textAlign: "center"
    };
  };

  const getWeekdayStyle = () => {
    return {
      textAlign: "center",
      color: "darkGreen",
      fontSize: "20px"

    };
  };

  const getWeekOfStyle = () => {
    return {
      textAlign: "center",
      color: "lightBlue",
      fontSize: "20px"

    };
  };

  return (
    <div style={getTitleStyle()}>
            <h1 >Your Active Shifts</h1>

    <h1 style={getWeekOfStyle()}>Feburary 9 - Feburary 23</h1>
    <div style={getStyle()} className="MyShifts">

      <div>
        <h1 style={getWeekdayStyle()}>Sunday 2/9</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Monday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Tuesday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Wednesday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Thursday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Friday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Saturday</h1>{" "}
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
    <div style={getStyle()} className="MyShifts">

      <div>
        <h1 style={getWeekdayStyle()}>Sunday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Monday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Tuesday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Wednesday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Thursday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Friday</h1>{" "}
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
        <h1 style={getWeekdayStyle()}>Saturday</h1>{" "}
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
