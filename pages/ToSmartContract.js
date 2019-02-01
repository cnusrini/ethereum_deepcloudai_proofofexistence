import React, {Component} from 'react';

class ToSmartContract extends Component{
constructor(props){
  super(props);
  this.state = {};
}

  render(){
    return(
      <div>
        <h4>in toSmartContract component:{props.myname}</h4>
      </div>
    );
  }
}

export default ToSmartContract;
