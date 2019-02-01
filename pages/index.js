import React, { Component } from 'react';
import { Button, Card, Divider, Form, Grid, Header, Image, Input,Label, Message, Segment } from 'semantic-ui-react'
import moment from 'moment'
import Layout from '../components/Layout';
import contractInstance from '../contract';
import { initAccount } from "../util/uportconn";
import {Link,Router} from '../routes'
import web3 from '../web3';
import ipfs from '../ipfs';


class VerifyDoc extends Component {
constructor(props){
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      buffer:null,
      ipfsHash:null,
      ipfsHash1:null,
      newdate:'',
      userName:''
    };

  }

//getInitialProps async method fetches the accounts and allpastevents from block 0 to latest block.
//allLogs returns all the events from block 0 to latest block.
//newLogs returns all the events from block 0 to latest block for a specific filter such as address
// Note of coution : For better performance consider moving this huge logs to off chain or to any JSON data storage.
static async getInitialProps() {

    const accounts = await web3.eth.getAccounts();
    const allLogs = await contractInstance.getPastEvents({fromBlock:0,toBlock:'latest'})

    const newLogs = await allLogs.filter(function(mylog){
      return (mylog.returnValues.currentUserEvent1 === accounts[0]);
    })

    return { allLogs, newLogs };
}

//getPastEvents1 method gets all the events from the allLogs and apply map.Map is equilavent to for loop
// Returns : lit of items as Card.Group for nicer display.<Card..Group/> is a component from semantic-ui-react
getPastEvents1() {

  const newLog1 = this.props.allLogs.map(el => {
    return {
      header : (
        el.returnValues.snapEvent1),
      description: el.returnValues.currentUserEvent1,
      meta: moment.unix(el.returnValues.timeEvent1).format("MM/DD/YYYY, h:mm:ss a"),
      fluid: true
    };
  });

  return <Card.Group items={newLog1} />;
}

//getAllMySnaps method gets all the events from the newLogs and apply map.Map is equilavent to for loop
// Returns : lit of items as Card.Group for nicer display.<Card..Group/> is a component from semantic-ui-react
getAllMySnaps(){

  const mylogs = this.props.newLogs.map(el => {
    return {
      header: el.returnValues.snapEvent1,
      description: el.returnValues.currentUserEvent1,
      meta: moment.unix(el.returnValues.timeEvent1).format("MM/DD/YYYY, h:mm:ss a"),
      fluid: true
    };

  });

  return <Card.Group items={mylogs}/>;

}
//browseFile is an onChange event. Which captures the snap uploaded and converts it to a stream of buffer which IPFS is compatible with.
//buffer is a state updated using setState()
browseFile = async(event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () =>{
      this.setState({buffer:Buffer(reader.result)});
    }

};
//submitToIpfs is an onSubmit event which submits the buffer(euivalent of snap) to IPFS
//IPFS after storing returns its equivalent ipfsHash value ipfsHash1
//To browse the uploaded snap use it like sp : https://ipfs.io/ipfs/QmXatCjWSNMRGFeqRzo3oC6y4Dv7sFHnto38V1CCCmvwk7
submitToIpfs = async (event) => {
  event.preventDefault();
  const ipfsHash1 = await ipfs.add(this.state.buffer);
  this.setState({ipfsHash1:ipfsHash1[0].hash});
  console.log('ipfshas', ipfsHash1);
/*
  await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      //setState by setting ipfsHash to ipfsHash[0].hash
      console.log('ipfsHash[1].hash val',ipfsHash[0].hash);
      this.setState({ipfsHash:ipfsHash[0].hash});
  })
*/
  //As soon as the ipfshash is return, this this function will be directed to submitToBlockchain()
  await this.submitToBlockchain();

}
submitToBlockchain = async() => {

    const localhash = this.state.ipfsHash1;
    const accounts = await web3.eth.getAccounts();
    //ipfsHash1 is passed as string to the smart contract as below
    //accounts[0] is the loggedin user's context first account
    const logTx = await contractInstance.methods.setgetsnapDetails(localhash).send({
      from: accounts[0]
    });
    //Stores the ipfshash value in blockchain and returns the time of storing in epoch
    const timeEvent1 = await logTx.events.logsetgetDetails.returnValues.timeEvent1;
    //converted epoch time to human friendly date and time in EST
    //moment.js is an open source library for parsing and displaying date and time in javaScript
    var newdate = moment.unix(timeEvent1).format("MM/DD/YYYY, h:mm:ss a")
    this.setState({newdate:newdate});

}

//getuportutil is an onClick event. Whenever user clicks on Login with uport identity, it will prompt to scan the QR code.
//Once you scan the code your screen will display my app name : you have interacted with mynewreactuportapp 'number' times before submitting.
//Once loged in, it will display the name on the top of the page as 'srinivas' in my case
//getup will call initAccount from "../util/uportconn";
getuportutil = async (event) => {
  event.preventDefault();

  try {
  const identity = await initAccount();
  this.setState({
     specificNetworkAddress: identity.specificNetworkAddress,
     userName: identity.user.name

    })

  } catch (e) {
    console.log('in catch:', e.Message);
  }

}
/*
getMySnaps = async (event) =>{
  event.preventDefault();
  console.log('in getMySnaps bfn');

  const accounts = await web3.eth.getAccounts();
  try {
    const allLogs = await contractInstance.getPastEvents({fromBlock:0,toBlock:'latest'})
    const newLogs = await allLogs.filter(function(mylog){
      return (mylog.returnValues.currentUserEvent1 === accounts[0]);
    }).map(function(el){
      return {
        header: el.returnValues.snapEvent1,
        description: el.returnValues.currentUserEvent1,
        meta: moment.unix(el.returnValues.timeEvent1).format("MM/DD/YYYY, h:mm:ss a"),
        fluid: true
      };

    })


  } catch (e) {
    console.log(e.message);
  }

  return <Card.Group items={newLogs}/>;
}
*/

//Below is the page render method. Render page is divided into 4 segment.
//First segment : Login with uport identity.Will allow user to browse the snap and submit.
//Second segment : As soon as the snap is uploaded . It will be displayed here with the date and time of upload.
//Third segment : Displays all the snaps that are uploaded fromBlock 0 to latest block. With the ipfshash , date and time and the person who has uploaded.
//Fourth segment : Displays all the snaps for an individual address. Third and fourth segment will be an onLoad()
render(){

  return(
    <Layout>
          <div className='digital-identity'>
            <Grid.Column>
              <Header as='h2' color='teal' textAlign='center'>uPort Identity
              </Header>
              {this.state.userName}
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=''/>
              <Form onSubmit={this.submitToIpfs}>
                <Segment stacked>
                  <Input type='file' color='teal' onChange={this.browseFile}/>
                  <Button color='blue' fluid-size='large' onSubmit={this.submitToIpfs}>submitToIpfs</Button>
                  <Button color='teal' fluid-size='large' onClick={this.getuportutil}>Login with uport identity</Button>
                  
                </Segment>
              </Form>
              <Message>No uport Wallet app ?Download from <a href='#'>www.uport.me</a></Message>
            </Grid.Column>
            <Divider horizontal>Recently Added</Divider>
            <div>
                <Image src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} size='tiny' verticalAlign='middle' />
                <Label as='a' tag>uploaded at EST : {this.state.newdate}</Label>
            </div>
          </div>
          <Divider horizontal>All blocks fromBlock[0] toBlock['latest'] </Divider>
          <Divider horizontal>Snap Uploaded time in EST in Ascending order </Divider>
          <div>{this.getPastEvents1()}</div>
          <Divider horizontal>My Snaps</Divider>
          <div>{this.getAllMySnaps()}</div>
    </Layout>
  );

}
}

export default VerifyDoc;
