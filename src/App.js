import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import Rank from "./components/Rank/Rank.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import Particles from "react-particles-js";
import "./App.css";

//particles BG Code
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

//initial values for each user
const initialState = {
  input: "",
  imgURL: "",
  box: {}, //for box on face
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

//app class
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imgURL: "",
      box: {}, //for box on face
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  addUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  //TODO: connect with backend
  // componentDidMount() {
  //   fetch("http://localhost:3000")
  //     .then((response) => response.json())
  //     .then(console.log);
  // }

  //function to calculate the dimesnsion of face box
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
    // console.log(box);
    this.setState({ box: box });
  };

  //input change
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  //code for submit button
  onButtonSubmit = () => {
    console.log(this.state.user.id);
    this.setState({ imgURL: this.state.input });
    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceDimenstion(response));
      })
      .catch((err) => console.log(err));
  };

  //functionality on changing route
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  //render function
  render() {
    const { isSignedIn, imgURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesCode} />
        {/* TODO: Navigation */}
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {/* TODO: FaceRecognition */}
            <FaceRecognition box={box} imgURL={imgURL} />
          </div>
        ) : route === "signin" ? (
          <Signin addUser={this.addUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register addUser={this.addUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}
export default App;
