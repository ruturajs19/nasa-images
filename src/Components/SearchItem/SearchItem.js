import React from "react";
import Avatar from "../Avatar/Avatar";
import "./SearchItem.css";

export default function SearchItem(props) {
  const { imageUrl, imageTitle, dateOfCreation } = props;

  return (
    <div className={"searchItem"}>
      <div>
        <Avatar image={imageUrl} alt={imageTitle} />
      </div>
      <div className={"searchItem-details"}>
        {imageTitle && (
          <>
            <p className={"searchItem-text"}>
              {imageTitle ? imageTitle : "Invalid Data"}
            </p>
            <p className={"searchItem-text"}>
              {imageTitle && new Date(dateOfCreation).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
