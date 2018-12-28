import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketCluster from 'socketcluster-client';

var options = {
  port: 8000
};
 
// Initiate the connection to the server
var socket = socketCluster.create(options);

var chatChannel = socket.subscribe('data');

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      messages: []
    }
    socket.on('connect', function () {
      console.log('CONNECTED');
    });
  }

  componentDidMount(){
    chatChannel.watch((newMessage) => {
      console.log("getdataaaaa", newMessage);
      this.setState({
        messages: [...this.state.messages, newMessage]
      })
    })
    this.setState({message: ''});
  }
  onChange = (e) => {
    this.setState({
      message: e.target.value 
    })
  }

  sendMessage = () => {
    console.log("mess", this.state.message);
    socket.emit('sendMessage', this.state.message);
    this.setState({message: ''});

  }

  render() {
    return (
      <div className="App">
        <input type='text' placeholder='Message' value={this.state.message} onChange={this.onChange}/>
        <button onClick={this.sendMessage}>Send</button>
        {this.state.messages.map((message, index) => {
          return <div key={index}>{message}</div>
        })}
      </div>
    );
  }
}

export default App;
