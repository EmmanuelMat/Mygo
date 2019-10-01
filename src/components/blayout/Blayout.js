import React, { Component }  from 'react';
import Logo from '../logo/Logo'

import './Blayout.css'

class Blayout extends  Component {



    	render(){
    		return( <div>
    				   	<div className= 'logo-container'>
	    	    		     <Logo onRouteChange = {this.props.onRouteChange} />
	    	    		</div>
 
    	    		 </div>
    	
    	    	)
    	}

    	
    


}


export default Blayout;