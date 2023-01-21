import React from "react";

function Popup({ message, ...props }) {
  return (
    <div {...props}>
      <p>{message}</p>
    </div>
  );
}

export default Popup;
