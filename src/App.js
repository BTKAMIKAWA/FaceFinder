import React, { Component } from 'react';
import Title from './components/Title/Title';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import FaceFinder from './components/FaceFinder/FaceFinder';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

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

const app = new Clarifai.App({
  apiKey: '5835bf370cc44ca3a77661570a8aaad2'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayBox = (boxes) => {
    this.setState({boxes: boxes});
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
      .then((response) => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
            
          })
        }
        this.displayBox(this.calculateFaceLocation(response))
      })
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
          .then((response) => {
            if(response) {
              fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
                
              })
            }
            this.displayBox(this.calculateFaceLocation(response))
          })
        .catch(err => console.log(err));
        this.clearUrl();
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
    console.log(route);
    console.log(this.state.user.name)
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
          <div>
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} route={this.state.route}/>
          </div>
        </div>
        {this.state.route ==='home'
            ? <div>
                <div style={{position: 'relative', height: '300px'}}></div>
                <div style={{position: 'relative'}}>
                  <Particles className='particles' params={particleOptions} />
                  <Rank name={this.state.user.name} entries={this.state.user.entries} />
                  <ImageForm   onRouteChange={this.onRouteChange} value={this.state.input} onInputChange={this.onInputChange} onSubmit={this.onSubmit} onEnter={this.onEnter} />
                  <FaceFinder boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
                </div>
              </div>
            : ( this.state.route === 'register'
              ? <div>
                  <div style={{position: 'relative', height: '300px'}}></div>
                  <div>
                    <Particles className='particles' params={particleOptions} />
                    <Register style={{position: 'relative', top: '300px'}} className='center' onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                  </div>
                </div>
                : ( this.state.route === 'profile'
                  ? <div>
                      <div style={{position: 'relative', height: '300px'}}></div>
                        <Particles className='particles' params={particleOptions} />    
                        <Profile user={this.state.user} onRouteChange={this.onRouteChange} />
                    </div>
                  : <div>
                      <div style={{position: 'relative', height: '300px'}}></div>
                      <div>
                        <Particles className='particles' params={particleOptions} />
                        <SignIn loadUser={this.loadUser} className='center' onRouteChange={this.onRouteChange} />
                      </div> 
                    </div>
                  ))
        } 
      </div>
    );
  }
}

export default App;
