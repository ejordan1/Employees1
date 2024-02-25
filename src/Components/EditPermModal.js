import React, { useState } from "react";
import styles from "./EditPermModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";

export default function EditPermModal(props) {
  //const [modal, setModal] = useState(false);

  const editPermDefaultValues = {
    starttime: 0,
    endtime: 0,
    slots: 0,
    position: ""
  }
  const [editPermInputs, setEditPermInputs] = useState({
    editPermDefaultValues
  });

  const handleEditPermChange = (e) => {
    setEditPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
    //   let shiftById = getShiftById(e.target.id);
      const bodyvalues = {
        // doing this later
        // shiftid: shiftById.id,
        // starttime: shiftById.starttime,
        // endtime: shiftById.endtime
        id: props.id,
        starttime: editPermInputs.starttime,
        endtime: editPermInputs.endtime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
        // id: editPermInputs.id

        // starttime: editPermInputs.starttime, // get input values from user
        // endtime: editPermInputs.endtime, // get input values from user
        // // uid: editPermInputs.uid, // get input values from user
        // id: props.id, // get input values from user
      };

      const res = await axios.put(`/perms/edit`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");

      // I would close modal here
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.id,
        starttime: editPermInputs.starttime,
        endtime: editPermInputs.endtime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };
      const res = await axios.put(`/perms/delete`, bodyvalues);
      // const res = await axios.get(`/shifts/available`);
      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setEditPermInputs(editPermDefaultValues);
    props.closeModal();
  };

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
            <p>position: {props.position} </p>
            <p>slots: {props.position} </p>
          <div className="editPermForm">
        <h1>Edit Perm</h1>
        <form>
          <input
            required
            type="number"
            placeholder={props.starttime}
            name="starttime"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="number"
            placeholder={props.endtime}
            name="endtime"
            onChange={handleEditPermChange}
          /> 
          <input
            required
            type="number"
            placeholder={props.slots}
            name="slots"
            onChange={handleEditPermChange}
          />
          <input
            required
            type="text"
            placeholder={props.position}
            name="position"
            onChange={handleEditPermChange}
          />
          <button onClick={handleSubmitEdit}>Edit  Perm</button>
          <button onClick={handleSubmitDelete}>Delete  Perm</button>
          {/* <button onClick={handleSubmitDelete}>Delete Perm</button> */}
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
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    starttime: PropTypes.number.isRequired,
    endtime: PropTypes.number.isRequired,
    slots: PropTypes.number.isRequired
  };