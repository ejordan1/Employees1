import React, { useState, useEffect } from "react";
import styles from "./EditShiftModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";

export default function EditShiftModal(props) {
  const editShiftDefaultValues = {
    starttime: 0,
    endtime: 0,
    position: "",
    uid: null,
  };
  const [editShiftInputs, setEditShiftInputs] = useState({
    editShiftDefaultValues,
  });

  useEffect(() => {
    setEditShiftInputs({
      starttime: props.starttime,
      endtime: props.endtime,
      position: props.position,
      uid: props.uid,
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
        starttime: editShiftInputs.starttime,
        endtime: editShiftInputs.endtime,
        uid: editShiftInputs.uid,
        id: props.id,
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
        starttime: editShiftInputs.starttime,
        endtime: editShiftInputs.endtime,
        uid: editShiftInputs.uid,
        id: props.id,
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
                <p>id: {props.id} </p>
                <p>starttime: {props.starttime} </p>
                <p>endtime: {props.endtime} </p>
                <p>uid: {props.uid} </p>
                <p>position: {props.position} </p>
                <div className="editShiftForm">
                  <h1>Edit Shift</h1>
                  <form>
                    <input
                      required
                      type="number"
                      defaultValue={props.starttime}
                      name="starttime"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.endtime}
                      name="endtime"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.uid}
                      name="uid"
                      onChange={handleEditShiftChange}
                    />
                    <input
                      required
                      type="text"
                      defaultValue={props.position}
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
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  uid: PropTypes.number,
};