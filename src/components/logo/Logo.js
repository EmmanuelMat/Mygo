import React, { Component } from 'react';
import './Logo.css'




const Logo = ({onRouteChange}) =>{
    		return(
    	<div className = 'container'>
        <img onClick = {() => onRouteChange('blayout')} className = 'logo--logo grow' src = 'https://i.ibb.co/z40W7GY/logo.png' />

       </div>


		);


}

export default Logo;