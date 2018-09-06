import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import {ADD_SELLER_COMMENT, GET_POST_BY_SELLER} from '../query';
import {Button, Input} from 'antd';

class SellerPost extends Component {
    render() {
        return (
            <Query query={GET_POST_BY_SELLER} variables={{id: this.props.seller}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error...</p>;
                    }
                    console.log(data);
                    data = data.getSellerPostBySeller;
                    return (
                        data.map((post, index) => {

                            return <main id="feed">
                                <div className="photo">
                                    <header className="photo__header">
                                        <img src="http://www.cloudsellerpro.com/wp-content/uploads/2017/01/avatar-3.png"
                                             className="photo__avatar"/>
                                        <div className="photo__user-info">
                                            <span className="photo__author">{this.props.shopName}</span>
                                            <span className="photo__location"></span>
                                        </div>
                                    </header>
                                    <div className="photo__image">
                                        <img src={`product_images/${post.image}`}/>
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
                                        <span className="photo__likes">45 likes</span>
                                        <ul className="photo__comments">
                                            {post.Comments.map((comment) => {
                                                return <li className="photo__comment">
                                                    <span
                                                        className="photo__comment-author">{comment.user != null ? comment.user.name : ''}</span> {comment.text}
                                                </li>;
                                            })}
                                        </ul>
                                        <span className="photo__time-ago">2 hours ago</span>
                                        <div className="photo__add-comment-container">
                                            <Input name="comment" id={`${index}`} placeholder="Add a comment..."/>
                                            <Mutation mutation={ADD_SELLER_COMMENT}>
                                                {(addSellerComment) => (
                                                    <Button type="primary" shape="circle" onClick={() =>
                                                        addSellerComment({
                                                            variables: {
                                                                PostID: post.id,
                                                                text: document.getElementById(`${index}`).value
                                                            },
                                                            refetchQueries: ["sellerpost"],
                                                            update: () => {
                                                                document.getElementById(`${index}`).value = '';
                                                            }
                                                        })
                                                    }><i class="fa fa-send-o"></i>
                                                    </Button>
                                                )}
                                            </Mutation>
                                        </div>
                                    </div>
                                </div>
                            </main>;
                        }));
                }}</Query>
        );
    }
}


export default SellerPost;