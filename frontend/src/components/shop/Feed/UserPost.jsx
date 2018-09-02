import React, {Component} from 'react';

class SellerPost extends Component {
    render() {
        return (
            <div className="photo feed-product">
                <header className="photo__header">
                    <img src="http://www.cloudsellerpro.com/wp-content/uploads/2017/01/avatar-3.png"
                         alt=''
                         className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">Rahul jain</span>
                        <span className="photo__location">
                            <span className="photo__icon"><i className="fa fa-share" aria-hidden="true"/></span>
                            shared Red Envelope By Seller 1
                        </span>
                    </div>
                </header>
                <div className="photo__image">
                    {/*<img src="product_images/product1.jpg"/>*/}
                    <div className="photo__image__overlay">
                        <span className="photo__image__overlay__price">
                          ₹200
                        </span>
                        <span className="photo__image__overlay__name">
                          Red Envelope
                        </span>
                        <p>Saxx Red Envelope</p>
                    </div>
                </div>
                <div className="photo__info">
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
                        <li className="photo__comment">
                            <span className="photo__comment-author">serranoarevalo</span> love this!
                        </li>
                        <li className="photo__comment">
                            <span className="photo__comment-author">serranoarevalo</span> love this!
                        </li>
                    </ul>
                    <span className="photo__time-ago">2 hours ago</span>
                    <div className="photo__add-comment-container">
                        <textarea name="comment" placeholder="Add a comment..."/>
                        <i className="fa fa-ellipsis-h"/>
                    </div>
                </div>
            </div>
        );
    }
}


export default SellerPost;
