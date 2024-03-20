import React, { useState, useEffect } from "react";
import styles from "./EditPermModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // it suggested module .css
import { getAdjustedEndDate, getFinalStartDate } from "../Libraries/DateOperations";

export default function EditPermModal(props) {
  const queryClient = useQueryClient();
  
  const [selectedWeekday, setSelectedWeekday] = useState(null); // start as null?

  // this has these in an object with helper methods, in addPermModal they are separate useState hooks
  const editPermDefaultValues = {
    startdatetime: null,
    enddatetime: null,
    slots: 0,
    position: "",
    permUsers: {},
  };

  const [editPermInputs, setEditPermInputs] = useState({
    editPermDefaultValues,
  });

  const [createUserPermInputs, setCreateUserPermInputs] = useState({
    uid: 0,
  });

  const handleEditPermChange = (e) => {
    setEditPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSetStartTimePerm = (startTime) => {
    setEditPermInputs((prev) => ({
      ...prev,
      startdatetime: startTime,
    }));
  };

  const handleSetEndTimePerm = (endTime) => {
    setEditPermInputs((prev) => ({
      ...prev,
      enddatetime: endTime,
    }));
  };

  const handleCreateUserPermChange = (e) => {
    setCreateUserPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addPermUser = async (bodyValues) => {
    const res = await axios.post(`/perms_users/add`, bodyValues);
    return res.data;
  };

  const deletePermUser = async (bodyValues) => {
    const res = await axios.put(`/perms_users/delete`, bodyValues);
    return res.data;
  };

  const deletePerm = async (bodyValues) => {
    const res = await axios.put(`/perms/delete`, bodyValues);
    return res.data;
  };

  const editPerm = async (bodyValues) => {
    const res = await axios.put(`/perms/edit`, bodyValues);
    return res.data;
  };

  const {
    mutate: mutateAddPU,
    addPUIsPending,
    addPIIsError,
    addPUIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => addPermUser(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const {
    mutate: mutateDeletePerm,
    deletePermIsPending,
    deletePermIsError,
    deletePermIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => deletePerm(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const {
    mutate: mutateDeletePU,
    deletePUIsPending,
    deletePUisError,
    deletePUisSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => deletePermUser(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const {
    mutate: mutateEditPerm,
    editPermIsPending,
    editPermIsError,
    editPermIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => editPerm(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    if (props.isVisible) {
      setEditPermInputs({
        id: props.perm.id,
        position: props.perm.position,
        startdatetime: props.perm.startdatetime,
        enddatetime: props.perm.enddatetime,
        slots: props.perm.slots,
        permUsers: props.perm.permUsers,
      });
      setSelectedWeekday(format(props.perm.startdatetime, "EEEE"));
    }
  }, [props.isVisible]);

  const handleSubmitCreateUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        permid: props.perm.id,
        uid: createUserPermInputs.uid,
      };
      mutateAddPU(bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDeleteUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        perm_userid: e.target.id,
      };
      mutateDeletePU(bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      let finalStartDateTime = getFinalStartDate(selectedWeekday, editPermInputs.startdatetime);
      let finalEndDateTime = getAdjustedEndDate(finalStartDateTime, editPermInputs.enddatetime);


      const bodyvalues = {
        id: props.perm.id,
        startdatetime: format(finalStartDateTime, "yyyy-MM-dd HH:mm:ss"), // editPermInputs.startdatetime,
        enddatetime: format(finalEndDateTime, "yyyy-MM-dd HH:mm:ss"), // editPermInputs.enddatetime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };

      mutateEditPerm(bodyvalues);
      queryClient.invalidateQueries();
      // toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.perm.id,
        startdatetime: "0997-01-04 07:23:44", //editShiftInputs.startdatetime,
        enddatetime: "0997-01-04 07:23:44", //editShiftInputs.enddatetime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };
      mutateDeletePerm(bodyvalues);
      queryClient.invalidateQueries();
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectWeekday = (event) => {
    setSelectedWeekday(event.target.value);
    console.log("selected weekday: " + event.target.value);
  };

  const toggleModal = () => {
    setEditPermInputs(editPermDefaultValues);
    props.closeModal();
  };

  // function getFinalStartDate()
  // {
  //   let tempDate = new Date(permWeekdaysDays.get(selectedWeekday));
  //   tempDate.setHours(startDateTime.getHours());
  //   tempDate.setMinutes(startDateTime.getMinutes());
  //   return tempDate;
  // }

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
                <p>id: {props.perm.id} </p>
                <p>
                  startdatetime: {format(props.perm.startdatetime, "HHmm")}{" "}
                </p>
                <p>enddatetime: {format(props.perm.enddatetime, "HHmm")} </p>
                <p>position: {props.perm.position} </p>
                <p>slots: {props.perm.slots} </p>
                {props.perm.permUsers &&
                  Object.entries(props.perm.permUsers).map((keyvalue) => (
                    <div>
                      <p>
                        {"perm_userid: " +
                          keyvalue[0] +
                          ", uid: " +
                          keyvalue[1].uid +
                          ", " +
                          keyvalue[1].firstname +
                          ", " +
                          keyvalue[1].lastname}
                      </p>
                      <button
                        id={keyvalue[0]}
                        onClick={handleSubmitDeleteUserPerm}
                      >
                        Delete User Perm
                      </button>
                    </div>
                  ))}

                <div className="createUserPermForm">
                  <h1>Create UserPerm</h1>
                  <form>
                    <input
                      required
                      type="number"
                      placeholder="uid"
                      name="uid"
                      onChange={handleCreateUserPermChange}
                    />
                    <button onClick={handleSubmitCreateUserPerm}>
                      Create User Perm
                    </button>
                  </form>
                </div>

                {/* initial values */}
                <div className="editPermForm">
                  <h1>Edit Perm</h1>
                  <form>
                    {/* <input
                      required
                      type="number"
                      defaultValue={format(props.perm.startdatetime, "HHmm")}
                      name="startdatetime"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={format(props.perm.enddatetime, "HHmm")}
                      name="enddatetime"
                      onChange={handleEditPermChange}
                    /> */}
                    <DatePicker
                      selected={editPermInputs.startdatetime}
                      onChange={(date) => handleSetStartTimePerm(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                    <p>End Time</p>
                    <DatePicker
                      selected={editPermInputs.enddatetime}
                      onChange={(date) => handleSetEndTimePerm(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.perm.slots}
                      name="slots"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="text"
                      defaultValue={props.perm.position}
                      name="position"
                      onChange={handleEditPermChange}
                    />
                    <select
                      value={selectedWeekday}
                      onChange={handleSelectWeekday}
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>

                    <button onClick={handleSubmitEdit}>Edit Perm</button>
                    <button onClick={handleSubmitDelete}>Delete Perm</button>
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

EditPermModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  perm: PropTypes.object.isRequired,
};
