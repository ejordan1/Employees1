import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PickupShiftModal.module.scss"
import PropTypes from "prop-types";

export default function PickupShiftModal(props) {

  if(props.isVisible) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleDropSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.id,
        // starttime: props.startdatetime,
        // endtime: props.enddatetime,
        // position: props.position
      }
       const res = await axios.put(`/shifts/drop`, bodyvalues);
       window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

      {props.isVisible && (
        <div className={styles.modal}>
          <div onClick={props.closeModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            
            <button onClick={handleDropSubmit}>Drop Shift</button>

            <button className="close-modal" onClick={props.closeModal}>
              CLOSE add
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}

PickupShiftModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    starttime: PropTypes.any.isRequired,
    endtime: PropTypes.any.isRequired,
  };
  