import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import faceLogo from './faceLogo.png';
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 120, width: 150 }}
      >
        <div className="Tilt-inner"><img style={{paddingTop:'5px'}} src={faceLogo} alt="Logo" /> </div>{" "}
      </Tilt>{" "}
    </div>
  );
};

export default Logo;
