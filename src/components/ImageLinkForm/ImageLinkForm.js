import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 white b ">
        {" "}
        {"This Face Recognitor will detect faces in your Pictures"}{" "}
        {"Paste the Image URL Below"}{" "}
      </p>{" "}
      <div className="center">
        <div className=" form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />{" "}
          <button
            className="w-30 grow f4 link ph3 pv2 dib black bg-light-blue"
            onClick={onButtonSubmit}
          >
            See Magic{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ImageLinkForm;
