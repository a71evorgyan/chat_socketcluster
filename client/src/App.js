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
    //   <div class="container">
    //   <div class="messages">
    //     <ul id="messages-list"></ul>
    //   </div>
    //   <div class="actions">
    //     <form>
    //       <input id="message" autocomplete="off" placeholder="Type a message...">
    //       <button>Send</button>
    //     </form>
    //   </div>
    // </div>

      <div className="container">
        <div className="messages">
          <ul id="messages-list">
              {this.state.messages.map((message, index) => {
              return <li key={index}>{message}</li>
            })}
          </ul>
        </div>
        <div className="actions">      
          <input type='text' placeholder='Message' value={this.state.message} onChange={this.onChange}/>
          <button onClick={this.sendMessage}>Send</button> 
        </div>
      </div>
    );
  }
}

export default App;
