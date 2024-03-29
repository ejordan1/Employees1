import React, { useState, useEffect, useContext } from "react";
import "./AddShiftModal.module.scss";
import axios from "axios";
import styles from "./AddShiftModal.module.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // it suggested module .css
import { format, addDays, isBefore } from "date-fns";
import { Value } from "sass";
import { getAdjustedEndDate } from "../Libraries/DateOperations";
import { DataContext } from "../Contexts/DataContext";

export default function AddShiftModal() {
  const { allEmployeesData, jobTypesData } = useContext(DataContext);

  const [selectedJobType, setSelectedJobType] = useState(-1);

  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient(); // gets the queryclient

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [position, setPosition] = useState("");
  const [uid, setUID] = useState(-1);

  const addShift = async (bodyValues) => {
    const res = await axios.post(`/shifts/admin/add`, bodyValues);
    return res.data;
  };

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

  // const fetchJobs = async () => {
  //   const res = await axios.get(`/jobtypes`);
  //   return res.data;
  // };

  // const {
  //   data: jobTypesData,
  //   error: jobsError, // not tested
  //   isLoading: jobsIsLoading, // not tested
  // } = useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: fetchJobs,
  // });

  const toggleModal = () => {
    
    resetInputValues();
    setModal(!modal);
    console.log("Employee data, " + allEmployeesData);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

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
    setUID(-1);
    setSelectedJobType(-1)
  }

  const handleSelectEmployee = (event) => {
    setUID(event.target.value);
    console.log("selected employee: " + event.target.value);
  };

  function handleSetStart(date) {
    setStartDateTime(date);
    setEndDateTime(getAdjustedEndDate(date, endDateTime));
  }

  function handleSetEnd(date) {
    setEndDateTime(getAdjustedEndDate(startDateTime, date));
  }

  // function getAdjustedEndDate(startDate, endDate) {
  //   let tempDate = new Date();
  //   // need to look at month here
  //   tempDate.setDate(startDate.getDate());
  //   tempDate.setHours(endDate.getHours());
  //   tempDate.setMinutes(endDate.getMinutes());
  //   if (!isBefore(startDate, tempDate)) {
  //     tempDate = addDays(tempDate, 1);
  //   }
  //   console.log("adjusted endate: " + tempDate);
  //   return tempDate;
  // }

  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
    console.log("selected jobtype: " + event.target.value);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        shifts_startdatetime: format(startDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_enddatetime: format(endDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_position: position,
        shifts_uid: uid,
        shifts_jobType: selectedJobType,
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

            <select value={selectedJobType} onChange={handleSelectJobType}>
              <option key={0} value={-1}>
                Job type undetermined
              </option>
              {jobTypesData &&
                jobTypesData.map((jobType) => (
                  <option key={jobType.jobtypes_id} value={jobType.jobtypes_id}>
                    {jobType.jobtypes_title}
                  </option>
                ))}
            </select>

            {/* here add the 0 empty option like in edit */}
            <select value={uid} onChange={handleSelectEmployee}>
            <option key={0} value={-1}>
                            empty
                          </option>
              {allEmployeesData &&
                allEmployeesData.map((employee) => (
                  <option value={employee.id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))}
            </select>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
