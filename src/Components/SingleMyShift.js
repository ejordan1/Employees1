import React from "react";
import PropTypes from "prop-types";

function SingleMyShift(props) {
  var getStyle = () => {
    return {
      width: "100",
      height: "50",
      padding: "5px",
      backgroundColor: "white",
      border: "1px solid green",
      borderRadius: "7px",
      
    };


  };

  var getTimesStyle = () => {
    return {
      display: "flex",
      padding: "5px",
      justifyContent: "space-around"
    };


  };
  return (
    <div style={getStyle()}>
      <p>{props.position}</p>
      <div style={getTimesStyle()}>
        <p>{props.starttime}</p>
        <p>-</p>
        <p>{props.endtime}</p>
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
  starttime: PropTypes.number.isRequired,
  endtime: PropTypes.number.isRequired,
  drop: PropTypes.func.isRequired,
};

export default SingleMyShift;
