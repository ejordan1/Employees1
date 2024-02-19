import React from "react";
import PropTypes from "prop-types";

function SingleMyShift(props) {
  var getStyle = () => {
    return {
      width: "100",
      height: "50",
      padding: "5px",
      backgroundColor: "lightGrey",
      border: "5px solid grey",
    };
  };
  return (
    <div style={getStyle()}>
      <p>{props.position}</p>
      <p>Start Time: {props.starttime}</p>
      <p>End Time: {props.endtime}</p>
      <button id={props.id} onClick={props.drop}>
        Drop
      </button>
    </div>
  );
}

SingleMyShift.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  drop: PropTypes.func.isRequired,
};

export default SingleMyShift;
