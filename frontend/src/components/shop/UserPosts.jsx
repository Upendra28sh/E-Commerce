import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { GET_POST } from '../query';

class UserPosts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div>
                <Query query={GET_POST} variables={{
                    username: this.props.username
                }}>
                    {({loading, data}) => {
                        if (loading) {
                            return "Loading";
                        }
                        data = data.Posts;
                        console.log(data);
                        return (
                            data.map(
                                (post, index) => {
                                    return (
                                        <main id="feed" key={index}>
                                            <div className="photo">
                                                <header className="photo__header">
                                                    <img src="https://scontent-bom1-1.cdninstagram.com/vp/633748d19c49931c166948e7c6b05f65/5BFD73F1/t51.2885-19/s150x150/30086307_190554238405069_2778711456735035392_n.jpg" className="photo__avatar"/>
                                                    <div className="photo__user-info">
                                                        <span className="photo__author">{post.user.username}</span>
                                                        <span className="photo__location">by {post.product.sellerID.name}</span>
                                                    </div>
                                                </header>
                                                <div className="photo__image" style={{backgroundImage: `url("product_images/${post.product.image}")`}}></div>
                                                {/* <img src={`product_images/${post.product.image}`}/> */}
                                                <div className="photo__info">
                                                    <div className="photo__actions">
                                                        {post.product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </main>
                                    )
                                }
                            )
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default UserPosts;