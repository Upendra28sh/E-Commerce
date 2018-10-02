import React, { Component } from "react";
import { Query } from "react-apollo";
import { Button, Icon } from "antd";
import { GET_ALL_SELLERS, GET_AUTH, GET_ALL_USERS, GET_USER } from "../query";
import {
  getmessages,
  sendmessageusertoseller,
  getmessagesfromuser,
  sendmessageusertouser,
  checkintialized
} from "../../push-notification";

let userdata;

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      sellername: "",
      messageList: [],
      message: "",
      isUser: true
    };
  }
  changeChatContacts()
  {
    this.setState({
      isUser:!this.state.isUser,
      username: "",
      sellername: "",
      messageList: [],
      message: "",
    })
  }
  changeSeller(shopName, username) {
    if (this.state.username != "") {
      getmessagesfromuser(username, this.state.username).off();
    }
    if (this.state.sellername != "") {
      getmessages(username, this.state.sellername).off();
    }
    this.setState(
      {
        sellername: shopName
      },
      () => {
        var self = this;
        getmessages(username, this.state.sellername).on("value", function(
          snapshot
        ) {
          var temp = [];
          for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
              temp.push(snapshot.val()[key]);
            }
          }
          console.log(temp);
          self.setState({
            messageList: temp
          });
        });
      }
    );
  }
  changeUser(otheruser, username) {
    if (this.state.username != "") {
      getmessagesfromuser(username, this.state.username).off();
    }
    if (this.state.sellername != "") {
      getmessages(username, this.state.sellername).off();
    }
    this.setState(
      {
        username: otheruser
      },
      () => {
        var self = this;
        getmessagesfromuser(username, this.state.username).on("value", function(
          snapshot
        ) {
          var temp = [];
          for (var key in snapshot.val()) {
            if (snapshot.val().hasOwnProperty(key)) {
              temp.push(snapshot.val()[key]);
            }
          }
          console.log(temp);
          self.setState({
            messageList: temp
          });
        });
      }
    );
  }
  componentDidMount(){
      console.log(this.props);
      if(checkintialized() && this.props.location.state!=undefined)
      {
    if(this.props.location.state.username!=undefined)
    {
        this.setState({
            username:this.props.location.state.username,
        })
        this.changeUser(this.props.location.state.username,userdata.username)
    }
    if(this.props.location.state.sellername!=undefined)
    {
        this.setState({
            sellername:this.props.location.state.sellername,
            isUser:false
        })
        this.changeSeller(this.props.location.state.sellername,userdata.username)
    }
  }
}
  onTyping(e) {
    this.setState({
      message: e.target.value
    });
  }

  onSummits(username) {
    console.log("clicked");
    if (this.state.isUser) {
      sendmessageusertouser(username, this.state.message, this.state.username);
    } else {
      sendmessageusertoseller(
        username,
        this.state.message,
        this.state.sellername
      );
    }
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <Query query={GET_AUTH}>
        {({ data, loading }) => {
          userdata = data.auth.user;
          return (
            <Query
              query={GET_USER}
              variables={{ username: data.auth.user.username }}
            >
              {({ data, loading }) => {
                console.log("username", data);
                if (loading) return <p>loading....</p>;
                

                return (
                  <div className="wrapper">
                    <br />
                    >
                    <div className="container" style={{ padding: "0px" }}>
                      <div className="left">
                        <div className="top" style={{ paddingRight: "0px" }}>
                          <input type="text" placeholder="Search" />
                          <a href="javascript:" className="search" />
                          <Button type={"primary"} onClick={()=>this.changeChatContacts()}style={{marginLeft:'10px',top:'18%'}}>{this.state.isUser ? 'Sellers' : 'Users'}</Button>
                        </div>
                        
                        {this.state.isUser ? (
                          <ul
                            className="people"
                            style={{ listStyle: "none", padding: "0px" }}
                          >
                            {data.User.following.map((value, index) => {
                              return (
                                <li
                                  className="person"
                                  data-chat="person1"
                                  onClick={() => {
                                    this.changeUser(
                                      value.username,
                                      userdata.username
                                    );
                                  }}
                                >
                                  <img src={value.image} alt="" />
                                  <span className="name">{value.username}</span>
                                  <span className="preview">{value.about}</span>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <ul
                            className="people"
                            style={{ listStyle: "none", padding: "0px" }}
                          >
                            {data.User.followingShop.map((value, index) => {
                              return (
                                <li
                                  className="person"
                                  data-chat="person1"
                                  onClick={() => {
                                    this.changeSeller(
                                      value.shopName,
                                      userdata.username
                                    );
                                  }}
                                >
                                  <img src={value.image} alt="" />
                                  <span className="name">{value.shopName} <button class="btn-circle">1</button></span>
                                  <span className="preview">{value.about}</span>
                                  
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                      <div className="right">
                        <div className="top">
                          <span>
                            To:{" "}
                            <span className="name">{this.state.isUser ? this.state.username:this.state.sellername}</span>
                          </span>
                        </div>
                        <div className="active-chat">
                       
                          <div
                            style={{ overflowY: "scroll", height: "450px" }}
                            className="conversation-start"
                          >
                           <br></br>
                            {this.state.messageList.map(value => {
                              if (value.author === "them") {
                                return (
                                  <div
                                    id="you"
                                    className="bubble you"
                                    style={{ marginLeft: "20px" }}
                                    dangerouslySetInnerHTML={{__html: value.message}}
                                  >
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    className="bubble me"
                                    style={{ marginRight: "20px" }}
                                    dangerouslySetInnerHTML={{__html: value.message}}
                                  >
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                        <div className="write">
                          <a href="javascript:" className="write-link attach" />
                          <input
                            type="text"
                            value={this.state.message}
                            onChange={e => {
                              this.onTyping(e);
                            }}
                          />

                          <a
                            onClick={() => this.onSummits(userdata.username)}
                            href="javascript:;"
                            className="write-link send"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default Demo;
