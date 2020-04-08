import React from "react";

function Button(props) {
  return props.prevUrl ? (
    <div className="btn-con">
      <button className="btn" onClick={props.handleClick} value="prev">
        Previous
      </button>
      <button className="btn" onClick={props.handleClick} value="next">
        Next
      </button>
    </div>
  ) : (
    <div>
      <button className="btn" onClick={props.handleClick} value="next">
        Next
      </button>
    </div>
  );
}

export default Button;
