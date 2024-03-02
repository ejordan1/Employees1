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

  const handlePickupSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.shift.id,
        starttime: props.shift.startdatetime,
        endtime: props.shift.enddatetime,
        position: props.shift.position
      }
       const res = await axios.put(`/shifts/pickup`, bodyvalues);
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
            
            <button onClick={handlePickupSubmit}>Pickup Shift</button>

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
    shift: PropTypes.object.isRequired
  };
  