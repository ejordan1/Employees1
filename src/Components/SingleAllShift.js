import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllShift.module.scss";

function SingleAllShift(props) {


    const getBackgroundColor = props.uid ? styles.filled : styles.empty;

  return (
    <div className={`${styles.container} ${getBackgroundColor}`}>
      <p>{props.position}</p>
      <div className={styles.times}>
        <p>{props.starttime}</p>
        <p>-</p>
        <p>{props.endtime}</p>
      </div>

      <button id={props.id} onClick={props.drop}>
        Edit
      </button>
    </div>
  );
}

SingleAllShift.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  uid: PropTypes.number,
  //drop: PropTypes.func.isRequired,
};

export default SingleAllShift;
