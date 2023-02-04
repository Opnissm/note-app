import React from "react";

function Banner({ message, ...props }) {
  return (
    <div {...props}>
      <p>{message}</p>
    </div>
  );
}

export default Banner;
