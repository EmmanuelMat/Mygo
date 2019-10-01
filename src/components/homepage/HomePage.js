import React, { Component } from 'react';
import Logo from '../logo/Logo'
import ServerProfile from '../serverprofile/ServerProfile';
import AppModal from '../modal/AppModal'
import Scroll from '../Scroll'
import './HomePage.css'




class HomePage extends Component {

	constructor(props){
		super(props)
		this.state = {
				turns: [],
				showBtn: false,
				toDelete: '',
				index:'',
				addTurn: '',
        infoWanted: [],
        newturn: '',
        tab: 'emma',

		}
	}

  componentDidMount(){
    fetch('http://localhost:3001/turns' , {
        method: 'get',
        Headers: {"Content-Type" : "aplication/json"}
      }).then(res => res.json()).then(turns =>{
        this.setState({turns: turns})
      });


    fetch('http://localhost:3001/infoWanted/infosend')
    .then(res => res.json())
    .then(data => {
      this.setState({infoWanted: data})
      console.log(data)})
  }
  onNameChange = (e) =>{
    this.setState({addTurn: e.target.value})
    console.log(this.state.addTurn)

  }



   onShowBtn = (e) =>{
   	 this.setState({showBtn:true, toDelete: e.target.outerText, index: e.target.id});
     console.log(this.state.toDelete)
   }

   onDeleteHandler = (e) => {
       
      if(!this.state.toDeleteTurn){
         fetch('http://localhost:3001/deleteturns', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          toDeleteTurn: this.state.toDelete
        })
       }).then(res => res.json())
         .then(data =>{
          this.setState({turns: data})
          this.setState({infoWanted: []})
          console.log(data)})

     }else{
      console.log('nothing to delete');
     }

   }

   onTurnChange = (e) =>{this.setState({addTurn: e.target.value}) 
   console.log(this.state.addTurn)
}

   
   onAddTurns = () =>{
    const newturn = this.state.turns.map((name) =>{
      return name.name
    });

    console.log(newturn.slice(-1)[0])
      
    if(this.state.addTurn && this.state.tab && newturn.slice(-1)[0] != this.state.addTurn){
   	fetch('http://localhost:3001/addturns', {
   		method : 'post',
   		headers : {'Content-Type': 'application/json'},
   		body : JSON.stringify({
         turn : this.state.addTurn,
         barber: this.state.tab
   		})
   	}).then(res => res.json())
   	  .then(newturn => {     console.log(this.state.tab)

   	  	this.setState({turns: newturn})
        console.log(newturn);
      });
    }else{
      console.log('no data');
    }

   }
 

   onTabChange = (e) =>{
     this.setState({tab:e.target.outerText})
   }


    render()
    { 
      const wanted = this.state.infoWanted.map((wanted, i) =>{
                         if(this.state.toDelete === wanted.userinfo){
                                return (
                                  <div key= {i}>
                                      <div key ={1}>{wanted.userinfo}</div>
                                      <div key ={2}>{wanted.typeinfo}</div>
                                      <div key ={3}>{wanted.beinginfo}</div>
                                      <div key ={4}>{wanted.vipinfo}</div>
                                  </div>
                                  );
                                 }
                     })

    	const turns = this.state.turns;
    	const { onDeleteHandler } = this;
    		return(
    	
    	<div className = 'container'>
    		   <div className = 'nav'>
    		      <div className = 'profile'>
    		      <div className = 'profile-box'>
    		      <ServerProfile info = {this.props.info}  tab ={this.state.tab}/>
    		      </div>
    		   </div>
    		   <div className = 'logo'>
    		      <Logo onRouteChange = {this.props.onRouteChange} />
    		   </div>
		       </div>
		<div className = 'home'>
        
				<div className = 'coments'>
                 <div className = 'addturns'>
                      
                      <AppModal 
                      info = {this.props.info} 
                      onNameChange = {this.onNameChange} 
                      onAddTurns = {this.onAddTurns} 
                      onGetModalData = {this.onGetModalData}
                      onDeleteHandler ={this.onDeleteHandler}
                      turns ={this.state.turns}
                       />
                 </div>    
                     <div className = 'toshow'>
                       {wanted}
                     </div>
				</div>	
			
				<div className = 'turns-container'>
        <div className = 'tab-box'>
               {this.props.worker.map((worker, i) =>{
                 return <div onClick = {this.onTabChange} className = {this.state.tab === worker.name ? 'tab-selected': 'tab'} key ={i}>{worker.name}</div>
               })}
        </div>
          <div> 
            <Scroll> 
                <div className = 'turns'>
                    { turns.map((turn,i)  =>
                      {if(turn.barber === this.state.tab)
                        { return (<div  className = 'turn' key = {i}>
                          <div 
                          className = {this.state.toDelete === turn.name ? 'selected-turn' : 'turn'}
                          id = {i} 
                          onClick = {this.onShowBtn}>
                          {turn.name}
                          </div>
                      </div>)
                        }
                      })
                           
                      }
                    </div>  
            </Scroll>
         </div>               
		        <div className = 'none'>
                             <button className = 'myButton' onClick = {() => onDeleteHandler(turns)}>...</button>  
                             <button className = 'myButton-2' onClick = {() => onDeleteHandler(turns)}>...</button>  
             </div>



           
				</div>
				
	    </div>
     </div>


		);
    }




}

export default HomePage;


