import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Icon, message, Modal, Input} from 'antd';
import {ADD_PRODUCT_REPOST, ADD_TO_WISHLIST, GET_USER_FEED} from "../../query";
import {withApollo} from 'react-apollo';
import gql from "graphql-tag";

const TextArea = Input.TextArea;

class ProductFeed extends Component {
    state = {
        addClass: "",
        collapsed: "",
        visible: false,
        loadingButton: false,
        captionValue: ''
    };

    constructor(props) {
        super(props);

        this.addToWishlist = this.addToWishlist.bind(this);
        this.onCaptionChange = this.onCaptionChange.bind(this);
    }


    onCaptionChange(value) {
        this.setState({
            captionValue: value
        });
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


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({loadingButton: true});
        this.props.client.mutate({
            mutation: ADD_PRODUCT_REPOST,
            variables: {
                input: {
                    product: this.props.product.id,
                    caption: this.state.captionValue
                }
            }
        }).then(({data}) => {
            message.success("Reposted Successfully");
            this.setState({loadingButton: false, visible: false});
        });
    };

    handleCancel = () => {
        this.setState({visible: false});
    };


    addToWishlist = () => {
        this.props.client.mutate({
            mutation: ADD_TO_WISHLIST,
            variables: {
                id: this.props.product.id
            },
            update: (cache, {data}) => {
                console.log(this.props.product.id);
                console.log(data.addToWishlist);
                cache.writeFragment({
                    id: `Product:${this.props.product.id}`,
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
                    <Link to={`/feed/product/${product.id}`}>
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
                            <span className="photo__action" onClick={this.showModal}>
                                <i className="fa fa-retweet fa-lg"/>
                            </span>
                        </div>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    title="Confirm Post"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" loading={this.state.loadingButton}
                                onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <TextArea
                        onChange={this.captionChange}
                        value={this.state.captionValue}/>
                </Modal>
            </div>
        );
    }
}


export default withApollo(ProductFeed);
