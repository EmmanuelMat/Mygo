import React from 'react';
 import './menu.css'
class Settingsmenu extends React.Component {
  constructor() {
    super();
    this.state = {
        dpSelecte: 'Barber',
        show: false
    }
  }
 
    onSelect = (e) =>{
        this.setState({dpSelecte: e.target.outerText})
        this.onShow()
        this.props.onGetBarberName(e.target.outerText)
    }

    onShow = () => {
       this.setState(  (prevState => {
           return {show: !prevState.show}
        }))
  }


 
  render() {
    return (
         <div>
             <div className = 'd-box' onClick ={this.onShow}>{this.state.dpSelecte}  </div>
             <div className ={this.state.show ? 'show' : 'none'}>
                 {
                     this.props.worker.map((workers, i)=>{
                        return <div key = {i} className = 'n-selected' onClick = {this.onSelect}>{workers.name}</div>
                     })
                 }
                
             </div>
        </div>
    );
  }
}
 
export default Settingsmenu;