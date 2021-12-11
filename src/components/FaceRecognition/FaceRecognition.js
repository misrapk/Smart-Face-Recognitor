import React from "react";

const FaceRecognition = ({ imgURL }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img alt="" src={imgURL} width="500px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
