import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import "./App.css";

//TODO: Face Recognition API

const app = new Clarifai.App({
  apiKey: "ec68244019ce4422a4a8ebc94611d442",
});

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
      imgURL: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imgURL: this.state.input });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );
      },
      function (err) {}
    );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesCode} />
        {/* TODO: Navigation */} <Navigation />
        {/* TODO: LOGO */} <Logo />
        {/* TODO: Rank */} <Rank />
        {/* TODO: ImageLInkForm */}
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        {/* TODO: FaceRecognition */}
        <FaceRecognition imgURL={this.state.imgURL} />
      </div>
    );
  }
}
export default App;
