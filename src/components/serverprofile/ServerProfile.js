import React from 'react';
import './serverprofile.css'



const ServerProfile = ({ info,  tab }) => {


	return(
		<div className = 'server-profile'>
		 <img src = 'https://c8.alamy.com/comp/MJHJTB/emmanuel-jean-michel-frdric-macron-face-profile-french-politician-serving-as-president-of-france-and-ex-officio-co-prince-of-andorra-hand-drawn-MJHJTB.jpg' width = '100px' height = '130px'/>
	        { info.map((info, i )=>{
				if(tab === info.name){ 
					return( 
						<div key = {i}> 
							<ul>
								<li>{info.name}</li>
								<li>{info.age}</li>
								<li>{info.rating}</li>
							</ul>
						</div>)}
			})}
		</div>



		);



}

export default ServerProfile;