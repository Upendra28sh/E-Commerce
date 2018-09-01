import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class SellerPost extends Component {
    state = {
        addClass: ""
    };

    handleHover() {
        this.setState({
            addClass: "animate"
        });
    }

    handleDHover() {
        this.setState({
            addClass: ""
        });
    }


    render() {
        return (
            <div className="photo feed-product">
                <header className="photo__header">
                    <img src="http://www.cloudsellerpro.com/wp-content/uploads/2017/01/avatar-3.png"
                         className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">Rahul jain</span>
                        <span className="photo__location">
                            added new Product ,Red Envelope
                        </span>
                    </div>
                </header>
                <div className={`photo__image ${this.state.addClass}`}
                     onMouseEnter={() => this.handleHover()}
                     onMouseLeave={() => this.handleDHover()}
                >
                    {/*<img src="product_images/product1.jpg"/>*/}
                    <div className="photo__image__layer"/>
                    <Link to={`/feed`}>
                        <div className="photo__image__view-details">View details</div>
                    </Link>

                    <div className="photo__image__overlay">
                        <span className="photo__image__overlay__price">
                          ₹200
                        </span>
                        <span className="photo__image__overlay__name">
                          Red Envelope
                        </span>
                        <p>Saxx Red Envelope</p>
                        <div className="photo__image__overlay__options">
                            <strong>SIZES</strong>
                            <span>S , M , L</span>
                            <strong>COLORS</strong>
                            <div className="photo__image__overlay__colors">
                                <div className="c-blue">
                                    <span/>
                                </div>
                                <div className="c-red">
                                    <span/>
                                </div>
                                <div className="c-white">
                                    <span/>
                                </div>
                                <div className="c-green">
                                    <span/>
                                </div>
                            </div>
                        </div>
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