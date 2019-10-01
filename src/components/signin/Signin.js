import React, { Component } from 'react';
import Media from '../media/Media'
class Signin extends Component{
 constructor(props){
     super(props);
     this.state = {
         signinEmail: '',
         signinPassword: ''
     }

 }

 onEmailChange = (e) =>{
    this.setState({signinEmail: e.target.value}) 
 } 

 onPasswordChange = (e) =>{
    this.setState({signinPassword: e.target.value})
 }


  onSubmit = () =>{
    fetch('http://localhost:3001/signin/user', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signinEmail,
        password: this.state.signinPassword
      })
    }).then(res => res.json())
      .then(user =>{
    if(user.name){
      this.props.onRouteChange('userpage');
      this.props.onLoaduser(user);
      console.log(user);

    }
  })
  }

  render(){ 
      const { onRouteChange } = this.props;
    return(
      <div>
      <Media onRouteChange = {this.props.onRouteChange} />
    <article className="br3 ba  --black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
    <main className="pa4 white-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Get a go</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email or Phone Number</label>
        <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">PIN</label>
        <input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" autoComplete='off' type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <input  className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f6 dib" type="submit" value="Sign in" onClick = {this.onSubmit}/>
    </div>
    <div className="lh-copy mt3">
      <p className="f6 link dim white db pointer"
       onClick = {() => onRouteChange('newuser')}>
       New User
       </p>     
    </div>
  </div>
</main>
</article>
</div>



    )}

}
export default Signin;