import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllPerm.module.scss";
import {
  format
} from "date-fns";

function SingleAllPerm(props) {

  function handleEditClick() {
    props.setModalValues(props.perm)

    props.openEditModal()
  }

  return (
    <div className={`${styles.container}`}>
      <p>id: {props.perm.id}</p>
      <p>position: {props.perm.position}</p>
      <div className={styles.times}>
        <p>st: {format(props.perm.startdatetime,'HHmm')}</p>
        <p>-</p>
        <p>et: {format(props.perm.enddatetime,'HHmm')}</p>
        <p>slots: {props.perm.slots}</p>
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
  // startdatetime: PropTypes.number.isRequired,
  // endtime: PropTypes.number.isRequired,
  // slots: PropTypes.number.isRequired,
};

export default SingleAllPerm;
