import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift";
import styles from "./MyShifts.module.scss";

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

    };
  };


  const getWeekdayStyle = () => {
    return {

    };
  };

  const getWeekOfStyle = () => {
    return {

    };
  };

  return (
    <div>
      <div>
        <h1 className={styles.pageTitle}>Your Active Shifts</h1>
      </div>

      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.gridContainer}>
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
      <div className={styles.gridContainer}>
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
                  drop={handleSubmit}
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
