import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllPerm.module.scss";

function SingleAllPerm(props) {

  function handleEditClick() {
    // props.setModalValues(props.shift)

    // props.openDropModal()
  }

  return (
    <div className={`${styles.container}`}>
      <p>id: {props.id}</p>
      <p>position: {props.position}</p>
      <div className={styles.times}>
        <p>st: {props.starttime}</p>
        <p>-</p>
        <p>et: {props.endtime}</p>
        <p>slots: {props.slots}</p>
      </div>
      <button id={props.perm.id} onClick={handleEditClick}>
        Edit Perm
      </button>
    </div>
  );
}

SingleAllPerm.propTypes = {
  perm: PropTypes.object.isRequired,
  //create openEditModal
  openEditModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired
  //create setModalValues


  // id: PropTypes.number.isRequired,
  // position: PropTypes.string.isRequired,
  // starttime: PropTypes.number.isRequired,
  // endtime: PropTypes.number.isRequired,
  // slots: PropTypes.number.isRequired,
};

export default SingleAllPerm;
