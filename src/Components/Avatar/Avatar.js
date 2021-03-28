import React from "react";

import "./Avatar.css";

const Avatar = (props) => {
  return (
    <div
      data-test={`avatar-container-${props.name}`}
      className={`avatar ${props.className}`}
      style={props.style}
    >
      <img
        data-test={`avatar-image-${props.name}`}
        src={props.image}
        alt={props.alt}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};

export default Avatar;
