import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAvailableShift.module.scss";
import {
  format
} from "date-fns";

function SingleAvailableShift(props) {

  function handlePickupClick()
  {
    props.setPickupModalValues(props.shift)

    props.openPickupModal()
  }

  return (
    <div className={styles.container}>
      <p>{props.shift.position}</p>
      <div className={styles.times}>
      <p>{format(props.shift.startdatetime,'HHmm')}</p>
        <p>-</p>
        <p>{format(props.shift.enddatetime,'HHmm')}</p>
      </div>

      <button id={props.shift.id} onClick={handlePickupClick}>
        pickup
      </button>
    </div>
  );
}

SingleAvailableShift.propTypes = {
  shift: PropTypes.object.isRequired,
  openPickupModal: PropTypes.func.isRequired,
  setPickupModalValues: PropTypes.func.isRequired
};

export default SingleAvailableShift;
