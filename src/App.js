import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
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
      box: {}, //for box on face
      route: "signin",
      isSignedIn: false,
    };
  }

  calculateFaceDimenstion = (data) => {
    //function that calculate the dimension of face box
    const facedim = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: facedim.left_col * width,
      topRow: facedim.top_row * height,
      rightCol: width - facedim.right_col * width,
      bottomRow: height - facedim.bottom_row * height,
    };
  };

  //Function to display the box on face
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imgURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceDimenstion(response))
      )
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesCode} />
        {/* TODO: Navigation */}
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {/* TODO: FaceRecognition */}
            <FaceRecognition box={this.state.box} imgURL={this.state.imgURL} />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}
export default App;
