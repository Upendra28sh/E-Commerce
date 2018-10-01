import React, {Component} from 'react';
import {Button, Input, Mention, Form} from 'antd';
import {
    ADD_SELLER_COMMENT,
    ADD_SELLER_POST_LIKE,
    GET_USER_FEED,
    REMOVE_SELLER_POST_LIKE,
    SEARCH_USERS
} from '../../query';
import {Mutation, withApollo} from 'react-apollo';

const {toString, getMentions, toContentState, Nav} = Mention;

let defaultPost = {
    id: '123',
    seller: {
        name: "default"
    }
};


const {TextArea} = Input;

// TODO : Implement Likes

class SellerPost extends Component {

    state = {
        suggestions: [],
        loading: false,
        mention: toContentState('')
    };

    constructor(props) {
        super(props);

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onAddComment = this.onAddComment.bind(this);
        this.onChange = this.onChange.bind(this);
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
    removeLikeFromPost = () => {
        this.props.client.mutate({
            mutation: REMOVE_SELLER_POST_LIKE,
            variables: {
                input: {
                    post: this.props.post.id
                }
            },
            update: (cache, {data , errors}) => {
                console.log(errors)
                let userFeed = cache.readQuery({query: GET_USER_FEED});
                console.log(userFeed.getFeed, data.removeSellerPostLike);
                userFeed = userFeed.getFeed.map(FeedItem => {

                    if (FeedItem.origin.id === data.removeSellerPostLike.id) {
                        console.log("Found Item For Post");
                        FeedItem.origin.liked_by_me = data.removeSellerPostLike.liked_by_me;
                        FeedItem.origin.likes = data.removeSellerPostLike.likes;
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
    addLikeToPost = () => {
        this.props.client.mutate({
            mutation: ADD_SELLER_POST_LIKE,
            variables: {
                input: {
                    post: this.props.post.id
                }
            },
            update: (cache, {data}) => {
                let userFeed = cache.readQuery({query: GET_USER_FEED});
                // console.log(userFeed.getFeed, data.addSellerPostLike);
                userFeed = userFeed.getFeed.map(FeedItem => {
                    if (FeedItem.origin.id === data.addSellerPostLike.id) {
                        console.log("Found Item For Post");
                        FeedItem.origin.liked_by_me = data.addSellerPostLike.liked_by_me;
                        FeedItem.origin.likes = data.addSellerPostLike.likes;
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

    onAddComment = () => {
        const mentions = getMentions(this.state.mention);
        console.log(mentions);
        const string = toString(this.state.mention);
        console.log(string);
        if (string.length > 0) {
            this.props.client.mutate({
                mutation: ADD_SELLER_COMMENT,
                variables: {
                    input: {
                        post: this.props.post.id,
                        comment: string,
                        mentions: mentions
                    }
                },
                update: (cache, {data}) => {
                    let userFeed = cache.readQuery({query: GET_USER_FEED});
                    console.log(userFeed.getFeed, data.addSellerComment);
                    userFeed = userFeed.getFeed.map(FeedItem => {
                        if (FeedItem.origin.id === data.addSellerComment.id) {
                            console.log("Found Item For Post");
                            FeedItem.origin.comments = data.addSellerComment.comments;
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

    render() {

        let post = this.props.post;
        // console.log(post);
        if (!post) {
            post = {};
        }
        if (!post.comments) {
            post.comments = [];
        }
        return (
            <div className="photo" key={post.id}>
                <header className="photo__header">
                    <img
                        src={post.seller.image}
                        className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">{post.seller.name}</span>
                        <span className="photo__location"/>
                    </div>
                </header>
                {/* style={{backgroundImage: `url("${post.image}")`}} */}
                <div className="photo__image">
                    <img src={post.image}/>
                </div>
                <div className="photo__info" style={{textAlign: 'left'}}>
                    <div className='photo__actions'>
                        {
                            post.liked_by_me && (
                                <span className='photo__save' onClick={this.removeLikeFromPost}>
                                    Liked
                                </span>
                            )
                        }
                        {
                            !post.liked_by_me && (
                                <span className='photo__save' onClick={this.addLikeToPost}>
                                    Like
                                </span>
                            )
                        }
                        <div className="float-right">
                            <span className="photo__action">
                                <i className="fa fa-share fa-lg"/>
                            </span>
                        </div>
                    </div>
                    <span className="photo__likes">{post.likes} likes</span>
                    <ul className="photo__comments">
                        <li className="photo__comment" style={{marginBottom: 5}}>
                            <span className="photo__comment-author">{post.seller.shopName}</span> {post.caption}
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
                    <span className="photo__time-ago">{post.updated_at}</span>

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


export default withApollo(SellerPost);
