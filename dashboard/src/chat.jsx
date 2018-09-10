import React, { Component } from "react";
import { GET_ALL_USERS, GET_AUTH } from "../src/components/Query/query";
import { Query } from "react-apollo";
import {getmessages,sendmessagesellertouser} from "./push-notification";

class chat extends Component {
  state = {
    username: "",
    messageList: [],
    message: ""
  };
  onSummits(sellername) {
    console.log("clicked");
    sendmessagesellertouser(
      this.state.username,
      this.state.message,
      sellername
    );
    this.setState({
      message:''
    })
  }
  onTyping(e)
  {
      this.setState({
          message:e.target.value
      })
  }
getdata(username,shopName)
{
    if(this.state.username!='')
    {
    getmessages(this.state.username,shopName).off();
    }
    this.setState({
        username:username
    },()=>{
        var self = this;
        getmessages(username,shopName).on('value', function(snapshot) {
          var temp = [];
          for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
                temp.push(snapshot.val()[key]);
            }
        }
        console.log(temp);
          self.setState({
            messageList:temp
          })
        })
    })
}
  render() {
    return (
      <Query query={GET_AUTH}>
      {({ data, loading }) => {
          const sellerdata = data.auth.user;
        return <div class="wrapper">
          <div class="container" style={{ padding: "0px" }}>
            <div class="left">
              <div class="top" style={{ paddingRight: "0px" }}>
                <input type="text" placeholder="Search" />
                <a href="javascript:;" class="search" />
              </div>

              <Query query={GET_ALL_USERS}>
                {({ data, loading }) => {
                  if (loading) return <p>Loading ...</p>;
                  console.log(data);
                  data = data.allUsers;
                  return (
                    <ul
                      class="people"
                      style={{ listStyle: "none", padding: "0px" }}
                    >
                      {data.map((value, index) => {
                        return (
                          <li
                            class="person"
                            data-chat="person1"
                            onClick={() => {
                              this.getdata(value.username,sellerdata.shopName)
                            }}
                          >
                            <img src={value.image} alt="" />
                            <span class="name">{value.username}</span>
                            <span class="preview">{value.about}</span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }}
              </Query>
            </div>
            <div class="right">
              <div class="top">
                <span>
                  To: <span class="name">{this.state.username}</span>
                </span>
              </div>
              <div class="active-chat">
                <div class="conversation-start">
                {
                    this.state.messageList.map((value)=>{
                        if(value.author=="them")
                        {
                        return <div class="bubble you" style={{ marginLeft: "20px" }}>
                        {value.message}
                      </div>
                        }
                        else{
                      return <div class="bubble me" style={{ marginRight: "20px" }}>
                       {value.message}
                      </div>
                        }
                    })
                 
                }
                </div>
              </div>
              <div class="write">
                <a href="javascript:;" class="write-link attach"></a>
                <input type="text" value={this.state.message} onChange={(e)=>{this.onTyping(e)}}/>
                <a href="javascript:;" class="write-link smiley"></a>
                <a onClick={()=>this.onSummits(sellerdata.shopName)} href="javascript:;" class="write-link send"></a>
            </div>
            </div>
          </div>
        </div>
      }}</Query>
    );
  }
}

export default chat;
