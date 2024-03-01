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
        <p>{format(props.starttime,'HHmm')}</p>
        <p>-</p>
        <p>{format(props.endtime,'HHmm')}</p>
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
  starttime: PropTypes.any.isRequired,
  endtime: PropTypes.any.isRequired,
  drop: PropTypes.func.isRequired,
};

export default SingleMyShift;
