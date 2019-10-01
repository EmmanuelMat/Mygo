import React, { Component } from 'react';
import Media from '../media/Media'

class NewHost extends Component{

  constructor(){
    super();
    this.state = {
      signupemail: '',
      signupname: '',
      signuppnumber: '',
      signuppassword: ''
    }
  }

  onNameChange = (e) =>{
    this.setState({signupname: e.target.value}) 
 } 
 onEmailChange = (e) =>{
    this.setState({signupemail: e.target.value}) 
 } 
 onPnumberChange = (e) =>{
    this.setState({signuppnumber: e.target.value}) 
 }
  onPasswordChange = (e) =>{
    this.setState({signuppassword: e.target.value}) 
 } 

  onRegister = () =>{
    fetch('http://localhost:3001/register/place', {
      method: 'post',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        name: this.state.signupname,
        email: this.state.signupemail,
        password: this.state.signuppassword,
        pnumber: this.state.signuppnumber
      })
    })
  }

  render(){ 
    const { onRouteChange } = this.props;
    return(
    <div>
      <Media />
    <article className="br3 ba  --white-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
    <main className="pa4 white-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">New Host</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="Name">Name </label>
        <input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="text" name="name"  id="name"/>
      </div>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email </label>
        <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="email" name="email-address"  id="email-address"/>
      </div>
       <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Phone Number</label>
        <input onChange = {this.onPnumberChange} className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" type="tel" name="phone-number"  id="phone-number"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">PIN</label>
        <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" autoComplete='off' type="password" name="password"  id="password"/>
      </div>     
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm PIN</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100" autoComplete='off' type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input onClick = {this.onRegister}  className="b ph3 pv2 input-reset ba white b--black bg-transparent grow pointer f6 dib" type="submit" value="Create User"/>
    </div>
  </div>
  <div className="lh-copy mt3">
      <p className="f6 link dim white db pointer"
       onClick = {() => onRouteChange('signout')}
      >Create</p>
    </div>
</main>
</article>
</div>




    )}

}
export default NewHost;