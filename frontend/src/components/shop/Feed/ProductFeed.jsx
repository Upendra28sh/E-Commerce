import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import {ADD_TO_WISHLIST, GET_USER_FEED} from "../../query";
import {withApollo} from 'react-apollo'


class ProductFeed extends Component {
    state = {
        addClass: "",
        collapsed: ""
    };

    constructor(props) {
        super(props);

        this.addToWishlist = this.addToWishlist.bind(this);
    }

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
        console.log("Product for Feed", this.props.product);
        setTimeout(() => {
            this.setState({collapsed: "collapsed"});
        }, 3000);
    }

    addToWishlist = () => {
        this.props.client.mutate({
            mutation: ADD_TO_WISHLIST,
            variables: {
                id: this.props.product.id
            },
            update: (cache, {data}) => {
                let userFeed = cache.readQuery({query: GET_USER_FEED});
                console.log(userFeed.getFeed, data.addToWishlist);
                userFeed = userFeed.getFeed.map(FeedItem => {
                    if (FeedItem.origin.id === this.props.product.id) {
                        console.log("User Post Found");
                        FeedItem.origin.in_my_wishlist = true;
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
        const product = this.props.product;
        // console.log(product);
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
                </div>
                <div className="photo__info">
                    <div className='photo__actions'>
                        {
                            product.in_my_wishlist && (
                                <span className='photo__save'>
                                  Saved
                              </span>
                            )
                        }
                        {
                            !product.in_my_wishlist && (
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
                </div>
            </div>
        );
    }
}


export default withApollo(ProductFeed);
