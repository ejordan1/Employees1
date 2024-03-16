import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PickupShiftModal.module.scss";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  useQueryClient,
  useMutation
} from "@tanstack/react-query";

export default function PickupShiftModal(props) {
  if (props.isVisible) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const queryClient = useQueryClient(); // gets the queryclient

  const dropShift = async (bodyValues) => {
    const res = await axios.put(`/shifts/drop`, bodyValues);
    return res.data;
  };

  const {mutate: mutateDropShift, dropShiftIsPending, dropShiftIsError, dropShiftIsSuccess} = useMutation({
    mutationFn: (bodyValues) => dropShift(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
  });

  const handleDropSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.shift.id,
      };
      mutateDropShift(bodyvalues);
      queryClient.invalidateQueries();
      props.closeModal();
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
            <p>drop shiftid: {props.shift.id}</p>
            <p>position: {props.position}</p>
            <p>start: {format(props.shift.startdatetime, "HHmm")}</p>
            <p>end: {format(props.shift.enddatetime, "HHmm")}</p>
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
  shift: PropTypes.object.isRequired,
};
