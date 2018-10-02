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
import gql from "graphql-tag";

const {toString, getMentions, toContentState, Nav} = Mention;


class UserPost extends Component {

    state = {
        addClass: "",
        collapsed: "",
        suggestions: [],
        loading: false,
        mention: toContentState(''),
        mentionDict: {}
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
        console.log("in_my_wishlist", this.props.post.product.in_my_wishlist);
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
        this.onMentionSelect = this.onMentionSelect.bind(this);
    }

    onSearchChange(value) {
        const searchString = value.toLowerCase();
        this.setState({loading: true});
        // console.log(searchString);
        this.props.client.query({
            query: SEARCH_USERS,
            variables: {
                input: searchString
            }
        }).then(({data}) => {
            data = data.searchUsers;
            // console.log(data);

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
        const transformedMentions = mentions.map(mention => {
            console.log(mention, typeof mention);
            return this.state.mentionDict[mention.slice(1)];
        });
        console.log(transformedMentions);

        const string = toString(this.state.mention);
        // console.log(string);
        if (string.length > 0) {
            this.props.client.mutate({
                mutation: ADD_USER_POST_COMMENT,
                variables: {
                    input: {
                        post: this.props.post.id,
                        comment: string,
                        mentions: transformedMentions,
                        parentFeedId : this.props.parentFeedId ,
                    }
                },
                update: (cache, {data}) => {
                    cache.writeFragment({
                        id: `UserPost:${this.props.post.id}`,
                        fragment: gql`
                            fragment f on UserPost {
                              comments {
                                    id ,
                                    text , 
                                    username
                               }
                            }
                         `,
                        data: {
                            comments: data.addUserPostComment.comments,
                            __typename: "UserPost"
                        },
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
                console.log(this.props.post.product.id);
                console.log(data.addToWishlist);
                cache.writeFragment({
                    id: `Product:${this.props.post.product.id}`,
                    fragment: gql`
                            fragment f on Product {
                                in_my_wishlist
                            }
                         `,
                    data: {
                        in_my_wishlist: true,
                        __typename: "Product"
                    },
                });
            }
        }).then(({data, error}) => {
            console.log(data, error);
        });
    };

    onMentionSelect(value, data) {
        let toBeInserted = {};
        toBeInserted[value] = data.id;
        console.log(value, data);
        this.setState({
            mentionDict: {
                ...this.state.mentionDict,
                ...toBeInserted
            }
        });
    }

    render() {
        // console.log("Post : " , this.props.post);
        // console.log("Re-Render");
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
                            post.product.in_my_wishlist && (
                                <span className='photo__save'>
                                  Saved
                              </span>
                            )
                        }
                        {
                            !post.product.in_my_wishlist && (
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
                            onSelect={this.onMentionSelect}
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
