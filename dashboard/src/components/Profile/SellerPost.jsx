import React, {Component} from 'react';
import {Button, Input} from 'antd';
import {Mutation} from 'react-apollo';

let defaultPost = {
    id: '123',
    seller: {
        name: "default"
    }
};

// TODO : Implement Likes

class SellerPost extends Component {
    render() {
        let post = this.props.post;
        if (!post) {
            post = {};
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
                <div className="photo__image" style={{backgroundImage: `url("${post.image}")`}}>
                    {/*<img src={post.image}/>*/}
                </div>
                <div className="photo__info" style={{textAlign: 'left'}}>
                    <div className="photo__actions">
                                                <span className="photo__action">
                                                    <i className="fa fa-heart-o fa-lg"/>
                                                </span>
                        <span className="photo__action">
                                                    <i className="fa fa-comment-o fa-lg"/>
                                                </span>
                    </div>
                    {/*<span className="photo__likes">45 likes</span>*/}
                    <ul className="photo__comments">
                        {post.comments.map((comment , index) => {
                            return (
                                <li className="photo__comment" key={index}>
                                    <span className="photo__comment-author">
                                        {comment.user != null ? ('@' + comment.user.username) : ''}
                                    </span> &nbsp;
                                    {comment.text}
                                </li>);
                        })}
                    </ul>
                    <span className="photo__time-ago">{post.updated_at}</span>
                </div>
            </div>

        );
    }
}


export default SellerPost;
