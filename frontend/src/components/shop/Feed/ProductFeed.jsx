import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';


class SellerPost extends Component {
    state = {
        addClass: "",
        collapsed: ""
    };

    handleHover() {
        this.setState({
            addClass: "animate" ,
            collapsed : ""
        });
    }

    handleDHover() {
        this.setState({
            addClass: "" ,
            collapsed : "collapsed"
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({collapsed: "collapsed"});
        }, 3000);
    }

    render() {
        const product = this.props.product;
        console.log(product);
        return (
            <div className="photo feed-product">
                <header className="photo__header">
                    <img src={product.seller.image}
                         className="photo__avatar"/>
                    <div className="photo__user-info">
                        <span className="photo__author">{product.seller.name}</span>
                        {/*<span className="photo__location">*/}
                        {/*{product.name}*/}
                        {/*</span>*/}
                    </div>
                </header>
                <div className={`photo__image ${this.state.addClass}`}
                     onMouseEnter={() => this.handleHover()}
                     onMouseLeave={() => this.handleDHover()}
                    //  style={{backgroundImage: `url('${product.image}')`}}
                >
                    <img src={product.image}/>
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

                    {/*<div className="photo__image__overlay">*/}
                    {/*<span className="photo__image__overlay__price">*/}
                    {/*₹ {product.price}*/}
                    {/*</span>*/}
                    {/*<span className="photo__image__overlay__name">*/}
                    {/*{product.name}*/}
                    {/*</span>*/}
                    {/*/!*<p>Saxx Red Envelope</p>*!/*/}
                    {/*{product.sizes.length > 0 && (*/}
                    {/*<div className="photo__image__overlay__options">*/}
                    {/*<strong>SIZES</strong>*/}
                    {/*<span>{product.sizes}</span>*/}
                    {/*</div>*/}
                    {/*)}*/}
                    {/*</div>*/}
                </div>
                <div className="photo__info">
                    <div className='photo__actions'>
                            <span className='photo__save'>
                                Save
                            </span>

                        <div className="float-right">
                            <span className="photo__action">
                                <i className="fa fa-share fa-lg"/>
                            </span>
                            <span className="photo__action">
                                <i className="fa fa-retweet fa-lg"/>
                            </span>
                        </div>
                    </div>
                    {/*<div className="photo__actions">*/}
                    {/*<span className="photo__action">*/}
                    {/*<i className="fa fa-heart-o fa-lg"/>*/}
                    {/*</span>*/}
                    {/*<span className="photo__action">*/}
                    {/*<i className="fa fa-comment-o fa-lg"/>*/}
                    {/*</span>*/}
                    {/*</div>*/}
                    {/*<span className="photo__likes">45 saves</span>*/}
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
