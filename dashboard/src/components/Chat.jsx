import React, {Component} from "react";
import {GET_ALL_USERS, GET_AUTH} from "./Query/query";
import {Query} from "react-apollo";
import {getmessages, sendmessagesellertouser} from "../push-notification";

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
            message: ''
        });
    }

    onTyping(e) {
        this.setState({
            message: e.target.value
        });
    }

    getdata(username, shopName) {
        if (this.state.username != '') {
            getmessages(this.state.username, shopName).off();
        }
        this.setState({
            username: username
        }, () => {
            var self = this;
            getmessages(username, shopName).on('value', function (snapshot) {
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
        });
    }

    render() {
        return (
            <Query query={GET_AUTH}>
                {({data, loading}) => {
                    const sellerdata = data.auth.user;
                    return (
                        <div className="wrapper">
                            <div className="container" style={{padding: "0px"}}>
                                <div className="left">
                                    <div className="top" style={{paddingRight: "0px"}}>
                                        <input type="text" placeholder="Search"/>
                                        <a href="javascript:" className="search"/>
                                    </div>
                                    {console.log('seller',sellerdata)}
                                    <Query query={GET_ALL_USERS}>
                                        {({data, loading}) => {
                                            if (loading) return <p>Loading ...</p>;
                                            console.log(data);
                                            data = data.allUsers;
                                            return (
                                                <ul
                                                    className="people"
                                                    style={{listStyle: "none", padding: "0px"}}
                                                >
                                                    {data.map((value, index) => {
                                                        return (
                                                            <li
                                                                className="person"
                                                                data-chat="person1"
                                                                onClick={() => {
                                                                    this.getdata(value.username, sellerdata.shopName);
                                                                }}
                                                            >
                                                                <img src={value.image} alt=""/>
                                                                <span className="name">{value.username}</span>
                                                                <span className="preview">{value.about}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            );
                                        }}
                                    </Query>
                                </div>
                                <div className="right">
                                    <div className="top">
                                    <span>
                                      To: <span className="name">{this.state.username}</span>
                                    </span>
                                    </div>
                                    <div className="active-chat">
                                        <div style={{overflow:'hidden'}} className="conversation-start">
                                            {
                                                this.state.messageList.map((value) => {
                                                    if (value.author === "them") {
                                                        return <div className="bubble you" style={{marginLeft: "20px"}}>
                                                            {value.message}
                                                        </div>;
                                                    }
                                                    else {
                                                        return <div className="bubble me" style={{marginRight: "20px"}}>
                                                            {value.message}
                                                        </div>;
                                                    }
                                                })

                                            }
                                        </div>
                                    </div>
                                    <div className="write">
                                        <a href="javascript:" className="write-link attach"/>
                                        <input type="text" value={this.state.message} onChange={(e) => {
                                            this.onTyping(e);
                                        }}/>

                                        <a onClick={() => this.onSummits(sellerdata.shopName)} href="javascript:;"
                                           className="write-link send"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                }}</Query>
        );
    }
}

export default chat;
