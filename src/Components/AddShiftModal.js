import React, { useState, useEffect } from "react";
import "./AddShiftModal.module.scss";
import axios from "axios";
import styles from "./AddShiftModal.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // it suggested module .css
import { format, addDays, isBefore } from "date-fns";
import { Value } from "sass";

export default function AddShiftModal() {
  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient(); // gets the queryclient

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [position, setPosition] = useState("");
  const [uid, setUID] = useState(0);

  // const modalNullValues = {
  //   startdatetime: 0,
  //   enddatetime: 0,
  //   position: "",
  //   uid: null,
  // }

  // const [createShiftInputs, setCreateShiftInputs] = useState(modalNullValues);

  const addShift = async (bodyValues) => {
    const res = await axios.post(`/shifts/admin/add`, bodyValues);
    return res.data;
  };

  // function setModalNullValues (){
  //   setCreateShiftInputs(modalNullValues);
  // };

  const {
    mutate: mutateAddShift,
    addShiftIsPending,
    addShiftIsError,
    addShiftIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => addShift(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // const handleCreateShiftChange = (e) => {
  //   setCreateShiftInputs((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  function handleSetStart(date)
  {
    setStartDateTime(date);
    setEndDateTime(getAdjustedEndDate(date, endDateTime));
  }

  function handleSetEnd(date)
  {
    setEndDateTime(getAdjustedEndDate(startDateTime, date));
  }

  function getAdjustedEndDate (startDate, endDate)
  {
    let tempDate = new Date();
    // need to look at month here
    tempDate.setDate(startDate.getDate());
    tempDate.setHours(endDate.getHours());
    tempDate.setMinutes(endDate.getMinutes());
    if (!isBefore(startDate, tempDate))
    {
      tempDate = addDays(tempDate, 1)
    }
    console.log("adjusted endate: " + tempDate);
    return tempDate;
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        startdatetime: format(startDateTime, 'yyyy-MM-dd HH:mm:ss'),
        enddatetime: format(endDateTime, 'yyyy-MM-dd HH:mm:ss'),
        position: position,
        uid: uid
      };
      mutateAddShift(bodyvalues);
      queryClient.invalidateQueries();
      toggleModal();
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
            <div className="createShiftForm">
              <h1>Add Shift</h1>
              <form>
                <input
                  required
                  type="number"
                  placeholder="uid (optional)"
                  name="uid"
                  onChange={(e) => setUID(parseInt(e.target.value))}
                />
                <input
                  required
                  type="text"
                  placeholder="position"
                  name="position"
                  onChange={(e) => setPosition(e.target.value)}
                />
                <button onClick={handleSubmitCreate}>Create Shift</button>
              </form>
            </div>


            <p>Date</p>
            <DatePicker
              selected={startDateTime}
              onChange={(date) => handleSetStart(date)}
              dateFormat="MMMM d, yyyy"
            />
<p>Start Time</p>
            <DatePicker
              selected={startDateTime}
              onChange={(date) => handleSetStart(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
<p>End Time</p>
            <DatePicker
              selected={endDateTime}
              onChange={(date) => handleSetEnd(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />

            <button className="close-modal" onClick={toggleModal}>
              CLOSE add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
