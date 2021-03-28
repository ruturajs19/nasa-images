import React, { useState } from "react";
import "./PictureOfDay.css";

export default function PictureOfDay(props) {
  const { PODDetails, submitHandler } = props;
  const [searchText, setSearchText] = useState(null);

  return (
    <div>
      {PODDetails && (
        <div>
          <div className="pod-header">
            <p className="pod-title">{PODDetails.title}</p>
            <div className="searchbox">
              <input
                type={"text"}
                onBlur={(e) => setSearchText(e.target.value)}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={() => submitHandler(searchText)}>Search</button>
            </div>
          </div>
          <img src={PODDetails.url} alt={"POD"} className="main-image" />
          <div className="main-desc-container">
            <p className="main-desc">{PODDetails.explanation}</p>
          </div>
          <p>{PODDetails.date}</p>
          <p>&copy; NASA</p>
        </div>
      )}
    </div>
  );
}
