import React, { useState, useEffect, useContext } from "react";
import styles from "./EditShiftModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { format } from "date-fns";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getAdjustedEndDate } from "../Libraries/DateOperations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // it suggested module .css
import { DataContext } from "../Contexts/DataContext";

export default function EditShiftModal(props) {
  const { allEmployeesData } = useContext(DataContext);

  const [selectedJobType, setSelectedJobType] = useState(-1);

  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [position, setPosition] = useState("");
  const [uid, setUID] = useState(0);

  const queryClient = useQueryClient(); // gets the queryclient

  const editShift = async (bodyValues) => {
    const res = await axios.put(`/shifts/admin/edit`, bodyValues);
    return res.data;
  };

  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
    console.log("selected jobtype: " + event.target.value);
  };


  // move this out and into a larger class?
  const fetchJobs = async () => {
    const res = await axios.get(`/jobtypes`);
    return res.data;
  };

  const {
    data: jobTypesData,
    error: jobsError, // not tested
    isLoading: jobsIsLoading, // not tested
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const {
    mutate: mutateEditShift,
    editShiftIsPending,
    editShiftIsError,
    editShiftIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => editShift(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const deleteShift = async (bodyValues) => {
    const res = await axios.put(`/shifts/admin/delete`, bodyValues);
    return res.data;
  };

  const {
    mutate: mutateDeleteShift,
    deleteShiftIsPending,
    deleteShiftIsError,
    deleteShiftIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => deleteShift(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    if (props.isVisible)
    {

    
    const uid =
      props.shift && props.shift.shifts_uid ? props.shift.shifts_uid : -1;

    setStartDateTime(props.shift && props.shift.shifts_startdatetime);
    setEndDateTime(props.shift && props.shift.shifts_enddatetime);
    setPosition(props.shift && props.shift.shifts_position);
    setSelectedJobType(props.shift && props.shift.shifts_jobtype); // confusing situation where db uses not camel case
    setUID(uid);
    } else {
      setInputsToDefault();
    }
  }, [props.isVisible]);

  function setInputsToDefault() {
    setStartDateTime(new Date());
    setEndDateTime(new Date());
    setPosition(0);
    setUID(0);
    setSelectedJobType(-1);
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        shifts_startdatetime: format(startDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_enddatetime: format(endDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_uid: uid,
        shifts_id: props.shift.shifts_id,
        shifts_jobType: selectedJobType,
        shifts_position: position,
      };
      mutateEditShift(bodyvalues);
      toggleModal();
      queryClient.invalidateQueries();
      props.closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setInputsToDefault();
    props.closeModal();
  };

  function handleSetStart(date) {
    setStartDateTime(date);
    setEndDateTime(getAdjustedEndDate(date, endDateTime));
  }

  function handleSetEnd(date) {
    setEndDateTime(getAdjustedEndDate(startDateTime, date));
  }

  const handleSelectEmployee = (event) => {
    setUID(event.target.value);
    console.log("selected employee: " + event.target.value);
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        shifts_startdatetime: format(startDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_enddatetime: format(endDateTime, "yyyy-MM-dd HH:mm:ss"),
        shifts_uid: uid,
        shifts_position: position,
        shifts_jobType: "h",
        shifts_id: props.shift.shifts_id,
      };
      mutateDeleteShift(bodyvalues);
      queryClient.invalidateQueries();
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  //IS THIS IMPORTANT? MAYBE TEST ON MOBILE VERSION
  if (props.isVisible) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      {props.isVisible && (
        <>
          <button onClick={toggleModal} className={styles.btnModal}>
            Open
          </button>

          {
            <div className={styles.modal}>
              <div onClick={toggleModal} className={styles.overlay}></div>
              <div className={styles.modalContent}>
                <p>id: {props.shift.shifts_id} </p>
                <p>
                  starttime: {format(props.shift.shifts_startdatetime, "HHmm")}{" "}
                </p>
                <p>
                  endtime: {format(props.shift.shifts_enddatetime, "HHmm")}{" "}
                </p>
                <p>uid: {props.shift.shifts_uid} </p>
                <p>position: {props.shift.shifts_position} </p>
                <div className="editShiftForm">
                  <h1>Edit Shift</h1>
                  <p>
                    person's name: {props.shift.firstname}{" "}
                    {props.shift.lastname}
                  </p>
                  <form>
                    <input
                      required
                      type="text"
                      defaultValue={props.shift.shifts_position}
                      name="position"
                      onChange={(e) => setPosition(e.target.value)}
                    />

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

                    <select
                      value={selectedJobType}
                      onChange={handleSelectJobType}
                    >
                      <option key={0} value={-1}>
                        Job type undetermined
                      </option>
                      {jobTypesData &&
                        jobTypesData.map((jobType) => (
                          <option
                            key={jobType.jobtypes_id}
                            value={jobType.jobtypes_id}
                          >
                            {jobType.jobtypes_title}
                          </option>
                        ))}
                    </select>

                    <select value={uid} onChange={handleSelectEmployee}>
                      <option key={0} value={-1}>
                        empty
                      </option>
                      {allEmployeesData &&
                        allEmployeesData.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.firstname} {employee.lastname}
                          </option>
                        ))}
                    </select>

                    <button onClick={handleSubmitEdit}>Edit Shift</button>
                    <button onClick={handleSubmitDelete}>Delete Shift</button>
                  </form>
                </div>

                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
}

EditShiftModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  shift: PropTypes.object.isRequired,
};
