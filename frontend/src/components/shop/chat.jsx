import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {Button,Icon} from 'antd'
import {GET_ALL_SELLERS} from '../query'; 
import {sendmessageusertoseller} from '../../push-notification'

class Demo extends Component {
 
  constructor() {
    super();
    this.state = {
      openPortal:false,
      openChat:false,
      sellername:'',
      sellerImage:'',
      sellerIntro:'',
      messageList: [],
      message:''
    };
  }
 changeSeller(value)
 {
    this.setState({
      sellername:value.shopName,
      sellerImage:value.image,
      sellerIntro:value.intro,
      openChat:true
    });
    
 }
 onTyping(e)
 {
   this.setState({
     message:e.target.value
   })
 }
 onSummits()
 {
   console.log('clicked')
   sendmessageusertoseller("dhruvramdev",this.state.message,this.state.sellername);

 }
  render() {
    console.log(this.props);
    if(!this.state.openPortal)
    {
      return <Button onClick={()=>{this.setState({openPortal:true})}} type="primary" style={{top:'600px',left:'90%'}}></Button>
    }
    if(this.state.openChat)
    {
      var objDiv = document.getElementById("chat-messages");
      if(objDiv!=null)
      {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
   
    }

    return <div id="chat">
    <div id="chatbox">
    { !this.state.openChat ? (
    <div id="friendslist" style={{display:'block'}}>
        <div id="topmenu">
            <span className="friends"></span>
              <span className="chats"></span>
              <span className="history"></span>
          </div>
          
          <div id="friends">
          <Query query={GET_ALL_SELLERS}>
          {({loading, error, data})=>{
            if(loading) return <p>loading...</p>
            data = data.allSellers;
           
           return  data.map((value)=>{
              return <div className="friend" onClick={()=>this.changeSeller(value)}>
              <img src={value.image}/>
                <p>
                  <strong>{value.name}</strong><br></br>
                  <span>{value.intro}</span>
                </p>
                <div className="status available"></div>
            </div>
            })
             
          }}
              </Query>
             </div>
             </div>
    )
      
     : (<div id="chatview" className="p1">    	
          <div id="profile">
  
              <div id="close">
              <Icon type="close" theme="outlined" />
              </div>
              
              <p>{this.state.sellername}</p>
              <span>{this.state.sellerIntro}</span>
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
            <input type="text" value={this.state.message} placeholder="Send messages here..." onChange={(e)=>this.onTyping(e)} />
              <button type="button" id="send" onClick={this.onSummits.bind(this)}></button>
          </div>
          <img src={this.state.sellerImage} className="floatingImg" style={{top: '20px', width: '68px', left: '108px'}}/>
     </div>   )
    }     
  </div>
    
  </div>
    		
  }
}
export default Demo;