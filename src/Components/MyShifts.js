import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift.js";
import SingleAvailableShift from "./SingleAvailableShift.js"
import styles from "./MyShifts.module.scss";

function MyShifts() {
  const [myShifts, setMyShifts] = useState([]);

  const [availableShifts, setAvailableShifts] = useState([]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getMyShiftById(id) {
    for (let i = 0; i < myShifts.length; i++) {
      if (myShifts[i].id == id) {
        return myShifts[i];
      }
    }
  }

  function getAvailableShiftById(id)
  {
    for (let i = 0; i <  availableShifts.length; i++)
    {
      if (availableShifts[i].id == id)
      {
        return availableShifts[i];
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/available`);
        setAvailableShifts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDropSubmit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getMyShiftById(e.target.id);
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

  const handlePickupSubmit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getAvailableShiftById(e.target.id);
      const bodyvalues = {
        shiftid: shiftById.id,
        starttime: shiftById.starttime,
        endtime: shiftById.endtime
      }
      console.log(shiftById);
       const res = await axios.put(`/shifts/pickup`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h1 className={styles.pageTitle}>Your Active Shifts</h1>
      </div>

      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        <div >
          <h1 className={styles.weekday}>Sunday 2/9</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Monday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
                <div className = "AvailableShifts">
          {availableShifts.map((availableShift)=>
          <SingleAvailableShift id = {availableShift.id} position={availableShift.position} starttime= {availableShift.starttime}endtime={availableShift.endtime} pickup={handlePickupSubmit}>
            <button id={availableShift.id} onClick={handlePickupSubmit}>Pick Up</button>
            <p>{availableShift.starttime}</p>
            <p>{availableShift.endtime}</p>
            </SingleAvailableShift>
          )}

          <p></p>
        </div>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Tuesday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Wednesday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Thursday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Friday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Saturday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <p></p>
      </div>
      <div className={styles.shiftsContainer}>
        <div>
          <h1 className={styles.weekday}>Sunday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Monday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Tuesday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Wednesday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Thursday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Friday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
                >
                  asdf
                </SingleMyShift>
              </div>
            ))}
          </div>{" "}
        </div>

        <div>
          <h1 className={styles.weekday}>Saturday</h1>{" "}
          <div>
            {" "}
            {myShifts.map((shift) => (
              <div>
                <SingleMyShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  drop={handleDropSubmit}
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
