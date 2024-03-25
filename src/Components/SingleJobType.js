import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleJobType.module.scss";

function SingleJobType(props) {


  return (
    <div className={styles.container}>
      <p>{props.title}</p>
      <div className={styles.descriptionBox}>
        <p>{props.description ? props.description : "no description"}</p>

      {/* <button id={props.shift.shifts_id} onClick={handlePickupClick}>
        pickup
      </button> */}
    </div>
    </div>
  );
}

SingleJobType.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default SingleJobType;
