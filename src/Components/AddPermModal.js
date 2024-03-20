import React, { useState } from "react";
import axios from "axios";
import styles from "./AddPermModal.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdjustedEndDate } from "../Libraries/DateOperations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // it suggested module .css
import { format, addDays, isBefore } from "date-fns";
import { permWeekdaysDays, getFinalStartDate } from "../Libraries/DateOperations";

export default function AddPermModal() {
  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient();

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [position, setPosition] = useState("");
  const [slots, setSlots] = useState(0);

  const [selectedWeekday, setSelectedWeekday] = useState("Sunday"); 


  // map of dates, each select option would point to a key, then when it creates the final date object it would
  // refer to the key, but set the hour and minute according to the inputs, and then put the adjust endtime part

  // const [createPermInputs, setCreatePermInputs] = useState({
  //   startdatetime: 0,
  //   enddatetime: 0,
  //   position: "",
  //   slots: null,
  // });

  function resetInputValues() {
    let tomorrowStart = new Date();
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(7);
    tomorrowStart.setMinutes(0);
    setStartDateTime(tomorrowStart);

    let tomorrowEnd = new Date();
    tomorrowEnd.setDate(tomorrowStart.getDate() + 1);
    tomorrowEnd.setHours(15);
    tomorrowEnd.setMinutes(0);
    setEndDateTime(tomorrowEnd);

    setPosition("");
    setSlots(0);
  }

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (bodyValues) => addPerm(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toggleModal();
    },
  });

  const addPerm = async (bodyValues) => {
    const res = await axios.post(`/perms`, bodyValues);
    return res.data;
  };

  // const handleCreatePermChange = (e) => {
  //   setCreatePermInputs((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleSelectWeekday = (event) => { 
    setSelectedWeekday(event.target.value);
    console.log("selected weekday: " +event.target.value);
  }; 

  const toggleModal = () => {
    resetInputValues();
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      let finalStartDateTime = getFinalStartDate(selectedWeekday, startDateTime);
      let finalEndDateTime = getAdjustedEndDate(finalStartDateTime, endDateTime);
      const bodyValues = {
        startdatetime: format(finalStartDateTime, "yyyy-MM-dd HH:mm:ss"),
        enddatetime: format(finalEndDateTime, "yyyy-MM-dd HH:mm:ss"),
        position: position,
        slots: slots,
      };
      mutate(bodyValues);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btn - modal}>
        Open add
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <div className="createPermForm">
              <h1>Add Perm</h1>
              <form>
                <input
                  required
                  type="number"
                  placeholder="slots"
                  name="slots"
                  onChange={(e) => setSlots(parseInt(e.target.value))}
                />

                <input
                  required
                  type="text"
                  placeholder="position"
                  name="position"
                  onChange={(e) => setPosition(e.target.value)}
                />
                <p>Start Time</p>

                <select value={selectedWeekday} onChange={handleSelectWeekday}>
                  
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>

                <DatePicker
                  selected={startDateTime}
                  onChange={(date) => setStartDateTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <p>End Time</p>
                <DatePicker
                  selected={endDateTime}
                  onChange={(date) => setEndDateTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <button onClick={handleSubmitCreate}>Create Perm</button>
              </form>
            </div>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
