import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllPerm.module.scss";

function SingleAllPerm(props) {



  return (
    <div className={`${styles.container}`}>
      <p>{props.position}</p>
      <div className={styles.times}>
        <p>{props.starttime}</p>
        <p>-</p>
        <p>{props.endtime}</p>
        <p>slots: {props.slots}</p>
      </div>

      <button id={props.id} onClick={props.drop}>
        Edit
      </button>
    </div>
  );
}

SingleAllPerm.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  slots: PropTypes.number.isRequired,
  //drop: PropTypes.func.isRequired,
};

export default SingleAllPerm;
