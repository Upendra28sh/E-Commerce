import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Icon, Mention} from "antd";
import {
    ADD_SELLER_COMMENT,
    ADD_SELLER_POST_LIKE, ADD_TO_WISHLIST,
    ADD_USER_POST_COMMENT,
    GET_USER_FEED,
    SEARCH_USERS
} from "../../query";
import {withApollo} from 'react-apollo';

const {toString, getMentions, toContentState, Nav} = Mention;


class UserPost extends Component {

    state = {
        addClass: "",
        collapsed: "",
        suggestions: [],
        loading: false,
        mention: toContentState('')
    };

    handleHover() {
        this.setState({
            addClass: "animate",
            collapsed: ""
        });
    }

    handleDHover() {
        this.setState({
            addClass: "",
            collapsed: "collapsed"
        });
    }

    componentDidMount() {
        console.log("Post for User", this.props.post);
        setTimeout(() => {
            this.setState({collapsed: "collapsed"});
        }, 3000);
    }

    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onAddComment = this.onAddComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addToWishlist = this.addToWishlist.bind(this);
    }

    onSearchChange(value) {
        const searchString = value.toLowerCase();
        this.setState({loading: true});
        console.log(searchString);
        this.props.client.query({
            query: SEARCH_USERS,
            variables: {
                input: searchString
            }
        }).then(({data}) => {
            data = data.searchUsers;
            console.log(data);

            const suggestions = data.map(suggestion => (
                <Nav
                    value={suggestion.username}
                    data={suggestion}
                >
                    <span>{suggestion.username} ({suggestion.name})</span>
                </Nav>
            ));
            this.setState({suggestions, loading: false});
        });
    }


    onChange(editorState) {
        this.setState({
            mention: editorState
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (errors) {
                console.log('Errors in the form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    };

    onAddComment = () => {
        const mentions = getMentions(this.state.mention);
        console.log(mentions);
        const string = toString(this.state.mention);
        console.log(string);
        if (string.length > 0) {
            this.props.client.mutate({
                mutation: ADD_USER_POST_COMMENT,
                variables: {
                    input: {
                        post: this.props.post.id,
                        comment: string,
                        mentions: mentions
                    }
                },
                update: (cache, {data}) => {
                    let userFeed = cache.readQuery({query: GET_USER_FEED});
                    console.log(userFeed.getFeed, data.addUserPostComment);
                    userFeed = userFeed.getFeed.map(FeedItem => {
                        if (FeedItem.origin.id === data.addUserPostComment.id) {
                            console.log("Found Item For Post");
                            FeedItem.origin.comments = data.addUserPostComment.comments;
                            return FeedItem;
                        }
                        return FeedItem;
                    });

                    let writeData = {
                        getFeed: userFeed
                    };

                    cache.writeQuery({
                        query: GET_USER_FEED,
                        data: writeData
                    });
                }
            }).then(({data, error}) => {
                // console.log(data, error);
                this.resetCommentField();
            });
        }
    };

    resetCommentField() {
        this.setState({
            suggestions: [],
            mention: toContentState("")
        });
    }

    addToWishlist = () => {
        this.props.client.mutate({
            mutation: ADD_TO_WISHLIST,
            variables: {
                id: this.props.post.product.id
            },
            update: (cache, {data}) => {
                let userFeed = cache.readQuery({query: GET_USER_FEED});
                console.log(userFeed.getFeed, data.addToWishlist);
                userFeed = userFeed.getFeed.map(FeedItem => {
                    if (FeedItem.origin.id === this.props.post.id) {
                        console.log("User Post Found");
                        FeedItem.origin.product.inWishlist = true;
                        return FeedItem;
                    }
                    return FeedItem;
                });

                let writeData = {
                    getFeed: userFeed
                };

                cache.writeQuery({
                    query: GET_USER_FEED,
                    data: writeData
                });
            }
        }).then(({data, error}) => {
            // console.log(data, error);
        });
    };

    render() {
        // console.log(this.props.post);
        let post = this.props.post;
        if (!post) {
            post = {};
        }
        if (!post.comments) {
            post.comments = [];
        }

        return (
            <div className="photo feed-product">
                <header className="photo__header">
                    <img src={post.user.image}
                         className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">{post.user.name}</span>
                        <span className="photo__location">
                        {`shared ${post.product.seller.name}'s Product`}
                        </span>
                    </div>
                </header>
                <div className={`photo__image ${this.state.addClass}`}
                     onMouseEnter={() => this.handleHover()}
                     onMouseLeave={() => this.handleDHover()}
                    //  style={{backgroundImage: `url('${product.image}')`}}
                >
                    <img src={post.product.image}/>
                    <div className="photo__image__layer"/>
                    <Link to={`/feed`}>
                        <div className="photo__image__view-details">View details</div>
                    </Link>

                    <div className={`photo__image__pointer ${this.state.collapsed}`}>
                        <Icon type="shopping-cart" theme="outlined"/>
                        <span>
                            Hover To View Product
                        </span>
                    </div>
                </div>
                <div className="photo__info">
                    <div className='photo__actions'>
                        {
                            post.product.inWishlist && (
                                <span className='photo__save'>
                                  Saved
                              </span>
                            )
                        }
                        {
                            !post.product.inWishlist && (
                                <span className='photo__save' onClick={this.addToWishlist}>
                                    Save
                                </span>
                            )
                        }
                        <div className="float-right">
                            <span className="photo__action">
                                <i className="fa fa-share fa-lg"/>
                            </span>
                            <span className="photo__action">
                                <i className="fa fa-retweet fa-lg"/>
                            </span>
                        </div>
                    </div>
                    <ul className="photo__comments">
                        <li className="photo__comment" style={{marginBottom: 5}}>
                            <span className="photo__comment-author">{post.user.username}</span> {post.caption}
                        </li>
                        {post.comments.map((comment, index) => {
                            return (
                                <li className="photo__comment" key={index}>
                                    <span className="photo__comment-author">
                                        {comment.username != null ? (comment.username) : ''}
                                    </span> &nbsp;
                                    {comment.text}
                                </li>);
                        })}
                    </ul>
                    {/*<span className="photo__time-ago">2 hours ago</span>*/}
                    <div className="photo__add-comment-container">
                        <Mention
                            style={{width: '100%'}}
                            placeholder='Add a comment...'
                            onChange={this.onChange}
                            loading={this.state.loading}
                            notFoundContent={"No Users Found"}
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                            value={this.state.mention}
                        />
                        <i className="fa fa-lg fa-send-o" onClick={this.onAddComment}/>
                        {/*<i className="fa fa-ellipsis-h"/>*/}
                    </div>
                </div>
            </div>
        );
    }
}


export default withApollo(UserPost);
