import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleMyShift.module.scss";
import {
  format
} from "date-fns";

function SingleMyShift(props) {

    function handleDropClick()
    {
      props.setModalValues(props.shift)

      props.openDropModal()
    }

  return (
    <div className={styles.container}>
      <p>{props.shift.position}</p>
      <div className={styles.times}>
        <p>{format(props.shift.startdatetime,'HHmm')}</p>
        <p>-</p>
        <p>{format(props.shift.enddatetime,'HHmm')}</p>
      </div>

      <button id={props.shift.id} onClick={handleDropClick}>
        Drop
      </button>
    </div>
  );
}

SingleMyShift.propTypes = {
  shift: PropTypes.object.isRequired,
  openDropModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired
};

export default SingleMyShift;