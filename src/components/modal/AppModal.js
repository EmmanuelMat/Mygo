import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './appmodal.css';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
 
class AppModal  extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false,
      turn: '',
      price: '',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



  onPriceChange = (e) =>{
    this.setState({price: e.target.value})
  }


  componentDidMount(){
        Modal.setAppElement('body');
  }

 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
  render() {
       const{ onNameChange, onDeleteHandler, turns } = this.props; 
    return (
      <div>
         <button 
        onClick={this.openModal} 
        className = 'tab-bttons b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f6 dib m0'>+</button>
         <button 
                     onClick = {() => onDeleteHandler(turns)} 
                     className = '  b ph3 pv0 input-reset ba b--white bg-transparent grow pointer white f10 dib tab-bttons'>
                       $</button>
         <button 
         onClick = {() => onDeleteHandler(turns)} 
                     className = ' tab-bttons b ph3 pv2 input-reset ba b--white bg-transparent grow pointer white f10 dib'>-</button>
        <Modal 
          
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Add New Turn</h2>
          <button onClick={this.props.onAddTurns}>Add</button>
         <div className = 'content'>
           <label>Name</label>
           <input 
               onChange = {onNameChange}
               placeholder = 'Enter Name'
               type = 'text' 
               className="b pa2 input-reset ba bg-transparent
                hover-bg-black hover-white w-50"/>
           <label>Price</label>
           <input
                onChange = {this.onPriceChange}
                type = 'text'   
                className="b pa2 input-reset ba bg-transparent
                hover-bg-black hover-white w-50" />
         </div>
        </Modal>
      </div>
    );
  }
}

export default AppModal; 