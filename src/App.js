import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import Particles from "react-particles-js";

import "./App.css";

const particlesCode = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    move: {
      enable: true,
      direction: "bottom",
      speed: 1,
      out_mode: "out",
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesCode} />

        {/* TODO: Navigation */}
        <Navigation />

        {/* TODO: LOGO */}
        <Logo />

        {/* TODO: Rank */}
        <Rank />
        {/* TODO: ImageLInkForm */}
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />

        {/* TODO: FaceRecognition */}
      </div>
    );
  }
}
export default App;
