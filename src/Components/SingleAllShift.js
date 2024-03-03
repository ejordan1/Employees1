import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllShift.module.scss";

function SingleAllShift(props) {

  function handleEditClick()
  {
    props.setModalValues(props.shift)

    // implement this
    //props.openDropModal()
  }
    const getBackgroundColor = props.uid ? styles.filled : styles.empty;

  return (
    <div className={`${styles.container} ${getBackgroundColor}`}>
      <p>{props.shift.position}</p>
      <div className={styles.times}>
        <p>{props.shift.starttime}</p>
        <p>-</p>
        <p>{props.shift.endtime}</p>
      </div>

      <button onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
}

SingleAllShift.propTypes = {
  shift: PropTypes.object.isRequired,
  openEditModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired
  // id: PropTypes.number.isRequired,
  // position: PropTypes.string.isRequired,
  // starttime: PropTypes.number.isRequired,
  // endtime: PropTypes.number.isRequired,
  // uid: PropTypes.number,
  //drop: PropTypes.func.isRequired,
};

export default SingleAllShift;
