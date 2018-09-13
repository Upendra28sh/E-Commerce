import React, {Component} from "react";
import {Query} from "react-apollo";
import {Button, Icon} from "antd";
import {GET_ALL_SELLERS, GET_AUTH} from "../query";
import {getmessages, sendmessageusertoseller} from "../../push-notification";

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            openPortal: false,
            openChat: false,
            sellername: "",
            sellerImage: "",
            sellerIntro: "",
            messageList: [],
            message: ""
        };
    }

    changeSeller(value, username) {
        if (this.state.sellername != '') {
            getmessages(username, this.state.sellername).off();
        }
        this.setState(
            {
                sellername: value.shopName,
                sellerImage: value.image,
                sellerIntro: value.intro,
                openChat: true
            },
            () => {
                var self = this;
                getmessages(username, this.state.sellername).on('value', function (snapshot) {
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

    onTyping(e) {
        this.setState({
            message: e.target.value
        });
    }

    onSummits(username) {
        console.log("clicked");
        sendmessageusertoseller(
            username,
            this.state.message,
            this.state.sellername
        );
        this.setState({
            message: ''
        });
    }

    render() {
        console.log(this.props);
        if (!this.state.openPortal) {
            return (
                <Button
                    onClick={() => {
                        var e = this.state.openPortal;
                        this.setState({openPortal: !e});
                    }}
                    type="primary"
                    icon="wechat"
                    shape="circle"
                    size="large"
                    style={{top: "600px", left: "90%"}}
                />
            );
        }


        return (
            <Query query={GET_AUTH}>
                {({data, loading}) => {
                    const userdata = data.auth.user;

                    return <div id="chat">
                        <Button
                            onClick={() => {
                                var e = this.state.openPortal;
                                this.setState({openPortal: !e});
                            }}
                            type="primary"
                            icon="cross"
                            shape="circle"
                            size="large"
                            style={{top: "600px", left: "90%"}}
                        />
                        <div id="chatbox">
                            {!this.state.openChat ? (
                                <div id="friendslist" style={{display: "block"}}>
                                    <div id="topmenu">
                                        <span className="friends"/>
                                        <span className="chats"/>
                                        <span className="history"/>
                                    </div>

                                    <div id="friends">
                                        <Query query={GET_ALL_SELLERS}>
                                            {({loading, error, data}) => {
                                                if (loading) return <p>loading...</p>;
                                                data = data.allSellers;

                                                return data.map(value => {
                                                    return (
                                                        <div
                                                            className="friend"
                                                            onClick={() => this.changeSeller(value, userdata.username)}
                                                        >
                                                            <img src={value.image}/>
                                                            <p>
                                                                <strong>{value.name}</strong>
                                                                <br/>
                                                                <span>{value.intro}</span>
                                                            </p>
                                                            <div className="status available"/>
                                                        </div>
                                                    );
                                                });
                                            }}
                                        </Query>
                                    </div>
                                </div>
                            ) : (
                                <div id="chatview" className="p1">
                                    <div id="profile">
                                        <div id="close">
                                            <Icon type="close" onClick={() => this.setState({openChat: false})}
                                                  theme="outlined"/>
                                        </div>

                                        <p>{this.state.sellername}</p>
                                        <span>{this.state.sellerIntro}</span>
                                    </div>
                                    <div id="chat-messages">
                                        {
                                            this.state.messageList.map((value, key) => {
                                                console.log(value.author);
                                                if (value.author == 'me') {
                                                    return <div className="message right">
                                                        <img
                                                            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg"/>
                                                        <div className="bubble">
                                                            {value.message}
                                                            <div className="corner"/>
                                                            {/* <span>1 min</span> */}
                                                        </div>
                                                    </div>;

                                                }
                                                else {
                                                    return <div className="message">
                                                        <img src={this.state.sellerImage}/>
                                                        <div className="bubble">
                                                            {value.message}
                                                            <div className="corner"/>
                                                        </div>
                                                    </div>;

                                                }
                                            })
                                        }


                                    </div>
                                    <div id="sendmessage">
                                        <input
                                            type="text"
                                            value={this.state.message}
                                            placeholder="Send messages here..."
                                            onChange={e => this.onTyping(e)}
                                        />
                                        <button
                                            type="button"
                                            id="send"
                                            onClick={this.onSummits.bind(this, userdata.username)}
                                        />
                                    </div>
                                    <img
                                        src={this.state.sellerImage}
                                        className="floatingImg"
                                        style={{top: "20px", width: "68px", left: "108px"}}
                                    />
                                </div>
                            )}
                        </div>
                    </div>;
                }}

            </Query>
        );
    }
}

export default Demo;
