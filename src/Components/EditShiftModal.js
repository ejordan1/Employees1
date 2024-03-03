import React, { useState, useEffect } from "react";
import styles from "./EditShiftModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";
import {
  format
} from "date-fns";

export default function EditShiftModal(props) {
  const editShiftDefaultValues = {
    startdatetime: 0,
    enddatetime: 0,
    position: "",
    uid: null,
  };
  const [editShiftInputs, setEditShiftInputs] = useState({
    editShiftDefaultValues,
  });

  useEffect(() => {
    // this is just for now, until I figure out how the real input is going to work
    setEditShiftInputs({
      startdatetime: props.shift && format(props.shift.startdatetime,'HHmm'),
      enddatetime: props.shift && format(props.shift.enddatetime,'HHmm'),
      position: props.shift && props.shift.position,
      uid: props.shift && props.shift.uid,
    });
  }, [props.isVisible]);

  const handleEditShiftChange = (e) => {
    setEditShiftInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        startdatetime: "2024-03-04 13:23:44", //editShiftInputs.startdatetime,
        enddatetime: "2024-03-04 13:24:44", //editShiftInputs.enddatetime,
        uid: editShiftInputs.uid,
        id: props.shift.id,
        position: editShiftInputs.position,
      };

      const res = await axios.put(`/shifts/admin/edit`, bodyvalues);
      toggleModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setEditShiftInputs(editShiftDefaultValues);
    props.closeModal();
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        startdatetime: "2024-03-04 13:23:44", //editShiftInputs.startdatetime,
        enddatetime: "2024-03-04 13:24:44", //editShiftInputs.enddatetime,
        uid: editShiftInputs.uid,
        id: props.shift.id,
      };
      const res = await axios.put(`/shifts/admin/delete`, bodyvalues);
      toggleModal();
      window.location.reload();
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
                <p>id: {props.shift.id} </p>
                <p>starttime: {format(props.shift.startdatetime,'HHmm')} </p>
                <p>endtime: {format(props.shift.enddatetime,'HHmm')} </p>
                <p>uid: {props.shift.uid} </p>
                <p>position: {props.shift.position} </p>
                <div className="editShiftForm">
                  <h1>Edit Shift</h1>
                  <form>
                    <input
                      required
                      type="number"
                      defaultValue={format(props.shift.startdatetime,'HHmm')}
                      name="starttime"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={format(props.shift.enddatetime,'HHmm')}
                      name="endtime"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.shift.uid}
                      name="uid"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="text"
                      defaultValue={props.shift.position}
                      name="position"
                      onChange={handleEditShiftChange}
                    />
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
  // id: PropTypes.number.isRequired,
  // position: PropTypes.string.isRequired,
  // starttime: PropTypes.number.isRequired,
  // endtime: PropTypes.number.isRequired,
  // uid: PropTypes.number,
  shift: PropTypes.object.isRequired
};
