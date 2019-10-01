import React from 'react';
import './Media.css'



const Media = ({ onRouteChange }) => {
	return(
		<div className = {'mediaBox'}>
			<div className = 'mygo mr3 f8 link dim white db pointer' 
			   onClick = {() => onRouteChange('signout')}>
			  {'My Go'}
			</div>
			<div className = 'mygo f8 link dim white db pointer' 
			      onClick = {() => onRouteChange('signinhost')}>
			  {'My Host'}
			</div>
		</div>



		);



}

export default Media;