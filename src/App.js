import React, { Component } from 'react';
import Title from './components/Title/Title';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import FaceFinder from './components/FaceFinder/FaceFinder';
import SignIn from './components/SignIn/SignIn';
import './App.css';
import Particles from 'react-particles-js';


const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '5835bf370cc44ca3a77661570a8aaad2'
 });

const particleOptions = {
  particles: {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    this.setState({box:{}});
    this.setState({imageUrl: this.state.input});    
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
      this.clearUrl();
  }

  onEnter = (event) => {
    if(event.key === 'Enter'){
      this.setState({box:{}});
      this.setState({imageUrl: this.state.input});    
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(response => this.displayBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
        this.clearUrl();
    }
  }

  onRouteChange = () => {
    this.setState({route: 'home'});
  }

  onSignOut = () => {
    this.setState({route: 'signin'});
  }

  clearUrl = () => {
    this.setState({input: ''});
  }

  render() {
    return (
      <div className="App">
        <div style={{width: '100%', position: 'fixed', zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', backgroundColor: 'royalblue', borderBottom: '1px solid black'}}>
          <Logo />
          <Title />
          {this.state.route !== 'signin'
            ? <div>
                <Navigation onSignOut={this.onSignOut} />
              </div>
            : <div style={{width: '147px'}}></div>
          }
          
        </div>
        {this.state.route === 'signin'
          ? <div>
              <div style={{position: 'relative', height: '300px'}}></div>
              <SignIn style={{position: 'relative', top: '300px'}} className='center' onRouteChange={this.onRouteChange} />
            </div>
          : <div>
              <div style={{position: 'relative', height: '300px'}}></div>
              <div style={{position: 'relative'}}>
                <Particles className='particles' params={particleOptions} />
                <Rank />
                <ImageForm  value={this.state.input} onInputChange={this.onInputChange} onSubmit={this.onSubmit} onEnter={this.onEnter} />
                <FaceFinder box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>
          </div>
        } 
      </div>
    );
  }
}

export default App;
