import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleAllPerm.module.scss";
import { format } from "date-fns";

function SingleAllPerm(props) {
  function handleEditClick() {
    props.setModalValues(props.perm);

    props.openEditModal();
  }

  return (
    <div className={`${styles.container}`}>
      <p>id: {props.perm.perms_id}</p>
      <p>position: {props.perm.perms_position}</p>
      <div className={styles.times}>
        <p>st: {format(props.perm.perms_startdatetime, "HHmm")}</p>
        <p>-</p>
        <p>et: {format(props.perm.perms_enddatetime, "HHmm")}</p>
        <p>slots: {props.perm.perms_slots}</p>
      </div>

      {Object.entries(props.perm.permUsers).map((keyvalue) => (
        <div>
          <p>
            {"perm_userid: " +
              keyvalue[0] +
              ", uid: " +
              keyvalue[1].perms_users_uid + // need to look at this
              ", " +
              keyvalue[1].firstname +
              ", " +
              keyvalue[1].lastname}
          </p>
        </div>
      ))}

      <button id={props.perm.perms_id} onClick={handleEditClick}>
        Edit Perm
      </button>
    </div>
  );
}

SingleAllPerm.propTypes = {
  perm: PropTypes.object.isRequired,
  openEditModal: PropTypes.func.isRequired,
  setModalValues: PropTypes.func.isRequired,
};

export default SingleAllPerm;
