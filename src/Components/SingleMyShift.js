import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleMyShift.module.scss";
import {
  format
} from "date-fns";

function SingleMyShift(props) {

  return (
    <div className={styles.container}>
      <p>{props.position}</p>
      <div className={styles.times}>
        <p>{format(props.startdatetime,'HHmm')}</p>
        <p>-</p>
        <p>{format(props.enddatetime,'HHmm')}</p>
      </div>

      <button id={props.id} onClick={props.drop}>
        Drop
      </button>
    </div>
  );
}

SingleMyShift.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  startdatetime: PropTypes.any.isRequired,
  enddatetime: PropTypes.any.isRequired,
  openDropModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired
};

export default SingleMyShift;


// so the button click is registered in this class, which then calls the functios passed in