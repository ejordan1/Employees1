import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllShift.module.scss";
import { format } from "date-fns";

function SingleAllShift(props) {
  function handleEditClick() {
    props.setModalValues(props.shift);
    props.openEditModal();
  }
  const getBackgroundColor = props.shift && props.shift.shifts_uid != -1 ? styles.filled : styles.empty;

  return (
    <div className={`${styles.container} ${getBackgroundColor}`}>
      <p>{props.shift.shifts_position}</p>
      <div className={styles.times}>
        <p>{format(props.shift.shifts_startdatetime, "HHmm")}</p>
        <p>-</p>
        <p>{format(props.shift.shifts_enddatetime, "HHmm")}</p>
      </div>

      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
}

SingleAllShift.propTypes = {
  shift: PropTypes.object.isRequired,
  openEditModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired,
};

export default SingleAllShift;
