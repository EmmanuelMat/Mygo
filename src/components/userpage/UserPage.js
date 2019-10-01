import React, { Component } from 'react';
import Logo from '../logo/Logo';
import './userpage.css'
import SettingsMenu from '../dropdown/SettingsMenu';

class UserPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			types: [],
			vip: [],
			being:[],
			typetoaddType: '',
			typetoaddbeing: '',
			typetoaddvip: '',
			description: '',
			discribed: false,
			barber: '',

		}
	}

	componentDidMount(){
		  fetch('http://localhost:3001/type')
		  .then(res => res.json())
		  .then(types => {
		  	this.setState({types:types});


		  });
            fetch('http://localhost:3001/being')
		  .then(res => res.json())
		  .then(being => {
		  	this.setState({being:being});
		  });

		    fetch('http://localhost:3001/vip')
		  .then(res => res.json())
		  .then(vip => {
		  	this.setState({vip:vip});
		  });

	}

onGetBarberName = (data) =>{
		this.setState({barber: data})
}

	onSendingWantedData = () => {
		fetch('http://localhost:3001/wanteddata' , {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				barber: this.state.barber,
				emailInfo: this.props.user.email,
				userInfo: this.props.user.name,
				typeInfo: this.state.typetoaddType,
				beingInfo: this.state.typetoaddbeing,
				vipInfo: this.state.typetoaddvip,
				descriptionInfo: this.state.descrition
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.setState({ discribed : false});
			// this.props.onLoadInfoWanted(data);

		})

	}


		onChangeSelectionType = (e) =>{
			this.setState({
							typetoaddType: e.target.outerText
						});

		}

		onChangeSelectionbeing = (e) =>{
			this.setState({
							typetoaddbeing: e.target.outerText
						});

		}

		onChangeSelectionvip = (e) =>{
			this.setState({
							typetoaddvip: e.target.outerText
						});

		}

		onChangeInput = (e) =>{
			this.setState({descrition: e.target.value})
		}

		onSwitch = () =>{
			if(this.state.typetoaddType){
						this.setState((prevState)=> {
							   return {discribed: !prevState.discribed}
							})}						
		}



	render(){
		const  types = this.state.types;
		return(
			<div className = 'upage'>
			   <div className = 'nav'>
					<div className = 'user'>
						<div className = 'log'>
							<Logo />
						</div>
					</div>
				</div>

				<div className = 'selection'>
				    <div className = ' selection-box'>
				      <div>
							  {
							  	this.state.types.map((type, i) =><li className = 'type' key={i}>
							  		<div  onClick = {this.onChangeSelectionType}
							  		className = {this.state.typetoaddType === type.value ? 'selected' : 'type'}
							 		>
						  		{type.value}
							  		</div>
							  		</li>)
							  }
		                </div>
		                <div>
						    {
							  	this.state.being.map((being, i) =><li className = 'type' key={i}>
							  		<div onClick = {this.onChangeSelectionbeing} 
							  		className = {this.state.typetoaddbeing === being.value ? 'selected' : 'type'}>
							  		{being.value}
							  		</div>
							  		</li>)
							}
						</div>
					    <div>
						    {
							  	this.state.vip.map((vip, i) =><li className = 'type' key={i}>
							  		<div onClick = {this.onChangeSelectionvip} 
							  		className = {this.state.typetoaddvip === vip.value ? 'selected' : 'type'}>
							  		{vip.value}
							  		</div>
							  		</li>)
							}
						</div>
									<div>
	                <SettingsMenu  worker = {this.props.worker} onGetBarberName = {this.onGetBarberName}/>
								</div>
					</div>

					<div className = 'submit'>
					   <input type = 'submit' onClick = {this.onSendingWantedData} className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f6 dib"/>
					   <input type = 'submit' onClick = {this.onSwitch} className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f6 dib" value = 'add'/>
					</div>
				</div>

				<div className = 'coments-box'>
				<div>
							<input className = 'input b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f6 dib' 
				       type = 'text' placeholder = 'This where you will dicribe your decided hair cut'
				       onChange = {this.onChangeInput} />
						</div>
								<div className ={ this.state.discribed ? 'descrition' : 'none'}>
										<div>{this.state.typetoaddType}</div>
										<div>{this.state.typetoaddbeing}</div> 
										<div>{this.state.typetoaddvip}</div> 
										<div>{this.state.descrition}</div>
								</div>
							
					</div>
			</div>
			);
	}
}
export default UserPage;