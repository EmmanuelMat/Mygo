import React, { Component } from 'react';
import Blayout from './components/blayout/Blayout';
import Media from './components/media/Media';
import Signin from './components/signin/Signin';
import NewUser from './components/newuser/NewUser';
import NewHost from './components/newhost/NewHost';
import HomePage from './components/homepage/HomePage';
import SigninHost from './components/signinhost/SigninHost';
import UserPage from './components/userpage/UserPage';
import Particles from 'react-particles-js';
import './App.css';

const particleOps = {
        particles: {
          number:{
            value: 250,
            density: {
             enable: true,
             value_area:1000
            }
          }
        }
       }

class App extends Component {
  constructor(){
  super()
      this.state = {
           route: 'blayout',
           isSignIn: false,
           user: [],
           host: [],
           infoWanted: [],
           worker: []
      }
  
}


 
 componentDidMount(){

  fetch('http://localhost:3001/infoWanted/infosend')
  .then(res => res.json())
  .then(data =>{
    console.log(data[0]);
    this.setState({infoWanted: data})
  })

  fetch('http://localhost:3001/worker/name')
  .then(res => res.json())
  .then(wokers => this.setState({worker:wokers}))

 }


onLoaduser = (user) => {
  this.setState({user: user})

}


onLoadhost = (host) => {
  this.setState({host: host})

  fetch('http://localhost:3001/workers', {
      method: 'post',
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        placename: this.state.host.placename
      })
    }).then(res =>res.json())
      .then(workers => {
        this.setState({worker: workers})
    console.log(this.state.worker)

      })

}

onLoadInfoWanted = (infoWanted) => {
  this.setState({infoWanted:infoWanted})

}



onRouteChange = (route) =>{

    this.setState({route:route})
}


  render() {


    switch(this.state.route){
      case 'blayout':
      return <div className = 'barber'>
                      <Particles className='particles' 
              params={particleOps}
           />
              <Media onRouteChange = {this.onRouteChange} />
              <Blayout 
                  onRouteChange = {this.onRouteChange}
                  onBgChange = {this.onBgChange}
              />
              <div className = {'media2'}>
              </div>
            </div>;
      case 'home':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
                <HomePage onRouteChange = {this.onRouteChange} 
                   info = {this.state.worker}
                   infoWanted = {this.state.infoWanted}
                   worker = {this.state.worker}
                  />
             </div>;
      case 'signout':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
                <Signin
                   onRouteChange = {this.onRouteChange}
                   onLoaduser = {this.onLoaduser}
               />
              </div>;
      case 'newuser':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
              <NewUser  onRouteChange = {this.onRouteChange} />
            </div>;
      case 'signinhost':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
              <SigninHost onLoadhost = {this.onLoadhost}  onRouteChange = {this.onRouteChange} />
            </div>;
      case 'newhost':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
                <NewHost onRouteChange = {this.onRouteChange} />
             </div>;
      case 'userpage':
      return <div className = 'barber'>
              <Particles className='particles' 
              params={particleOps}
           />
                <UserPage 
                  worker = {this.state.worker}
                  places = {this.state.host}
                  onLoadInfoWanted = {this.onLoadInfoWanted}
                  user = {this.state.user}


                />
             </div>
               }
              
                  }

}

export default App;
