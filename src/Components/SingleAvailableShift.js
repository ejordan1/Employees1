import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAvailableShift.module.scss";

function SingleAvailableShift(props) {

  return (
    <div className={styles.container}>
      <p>{props.position}</p>
      <div className={styles.times}>
        <p>{props.starttime}</p>
        <p>-</p>
        <p>{props.endtime}</p>
      </div>

      <button id={props.id} onClick={props.pickup}>
        pickup
      </button>
    </div>
  );
}

SingleAvailableShift.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  pickup: PropTypes.func.isRequired,
};

export default SingleAvailableShift;
