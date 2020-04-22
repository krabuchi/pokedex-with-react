import React from "react";

function Button(props) {
  return (
    <div className="btn-con">
      <button
        className="btn"
        disabled={!props.prevUrl ? true : false}
        onClick={props.handleClick}
        value="prev"
      >
        Previous
      </button>
      <button className="btn" onClick={props.handleClick} value="next">
        Next
      </button>
    </div>
  );
}

export default Button;
