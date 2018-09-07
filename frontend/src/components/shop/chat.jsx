import React, {Component} from 'react'
import {render} from 'react-dom'
 
class Demo extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
 
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }
 
  render() {
    return (<div id="chatbox">
    <div id="friendslist">
        <div id="topmenu">
            <span className="friends"></span>
              <span className="chats"></span>
              <span className="history"></span>
          </div>
          
          <div id="friends">
            <div className="friend">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <p>
                    <strong>Miro Badev</strong>
                    <span>mirobadev@gmail.com</span>
                  </p>
                  <div className="status available"></div>
              </div>
              
              <div className="friend">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                  <p>
                    <strong>Martin Joseph</strong>
                    <span>marjoseph@gmail.com</span>
                  </p>
                  <div className="status away"></div>
              </div>
              
              <div className="friend">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3_copy.jpg" />
                  <p>
                    <strong>Tomas Kennedy</strong>
                    <span>tomaskennedy@gmail.com</span>
                  </p>
                  <div className="status inactive"></div>
              </div>
              
              <div className="friend">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/4_copy.jpg" />
                  <p>
                    <strong>Enrique	Sutton</strong>
                    <span>enriquesutton@gmail.com</span>
                  </p>
                  <div className="status inactive"></div>
              </div>
              
              <div className="friend">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
                  <p>
                  <strong>	Darnell	Strickland</strong>
                    <span>darnellstrickland@gmail.com</span>
                  </p>
                  <div className="status inactive"></div>
              </div>
              
              <div id="search">
                <input type="text" id="searchfield" value="Search contacts..." />
              </div>
              
          </div>                
          
      </div>	
      
      <div id="chatview" className="p1">    	
          <div id="profile">
  
              <div id="close">
                  <div className="cy"></div>
                  <div className="cx"></div>
              </div>
              
              <p>Miro Badev</p>
              <span>miro@badev@gmail.com</span>
          </div>
          <div id="chat-messages">
            <label>Thursday 02</label>
              
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Really cool stuff!
                      <div className="corner"></div>
                      <span>3 min</span>
                  </div>
              </div>
              
              <div className="message right">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                  <div className="bubble">
                    Can you share a link for the tutorial?
                      <div className="corner"></div>
                      <span>1 min</span>
                  </div>
              </div>
              
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Yeah, hold on
                      <div className="corner"></div>
                      <span>Now</span>
                  </div>
              </div>
              
              <div className="message right">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
                  <div className="bubble">
                    Can you share a link for the tutorial?
                      <div className="corner"></div>
                      <span>1 min</span>
                  </div>
              </div>
              
              <div className="message">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
                  <div className="bubble">
                    Yeah, hold on
                      <div className="corner"></div>
                      <span>Now</span>
                  </div>
              </div>
              
          </div>
        
          <div id="sendmessage">
            <input type="text" value="Send message..." />
              <button id="send"></button>
          </div>
      
      </div>        
  </div>	)
  }
}
export default Demo;