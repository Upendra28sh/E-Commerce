import React from "react";
import {Button, Col, Icon, InputNumber, Row, Select, Tabs, Modal} from "antd";

import gql from "graphql-tag";
import {Query, withApollo} from "react-apollo";
import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from "../query";
import {GET_PRODUCT} from "../query";

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const decideQuery = bool => (bool ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST);

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleshare: false
        };
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    getToChat(id) {
        this.props.history.push({
            pathname: '/chat',
            state: {message: `http://frnzy.in/feed/${id}`}
        });
    }

    componentWillMount() {
        const path = this.props.location.pathname;
        const id = path.substr(path.length - 24);

        const query = gql`
            query {
                checkInWishlist(product: "${id}")
            }
        `;

        this.props.client
            .query({
                query: query
            })
            .then(data => {
                data = data.data.checkInWishlist;
                console.log("Check in Wishlist : ", data);
                let ans;
                if (data === true) {
                    ans = true;
                } else {
                    ans = false;
                }
                this.setState({
                    visible: ans
                });
            });
    }

    handleAddToCart(data, selectedSize, itemCount) {
        console.log(data, selectedSize, itemCount);

        const ADD_CART = gql`
            mutation {
                addToCart(
                    input: {
                        productID: "${data.id}",
                        itemCount: ${itemCount}
                        selectedSize: "${selectedSize}"
                    }
                )
                {
                    user
                    {
                        id
                        name
                    }
                    items
                    {
                        item
                        {
                            name
                            id
                        }
                        itemCount
                        selectedSize
                    }
                }
            }
        `;

        this.props.client
            .mutate({mutation: ADD_CART})
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    handleSaveClick(e, id) {
        // TODO : Update Cache
        this.props.client
            .mutate({
                mutation: decideQuery(this.state.visible),
                variables: {id: id},
                refetchQueries: ["showWishlist"]
            })
            .then(data => {
                console.log(data);
                this.setState(prevState => ({
                    visible: !prevState.visible
                }));
            });
    }

    render() {
        let selectedSize = undefined;
        let itemCount = 1;
        let productID = this.props.match.params.id;

        return (
            <Query query={GET_PRODUCT} variables={{input: productID}}>
                {({loading, error, data}) => {
                    // console.log(loading, error, data);

                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    data = data.Product;
                    console.log(data);

                    let parentFeedID;
                    if (this.props.location.state) {
                        parentFeedID = this.props.location.state.parentFeedId;
                    } else {
                        parentFeedID = '';
                    }


                    return (
                        <div className="product">
                            <div className="product__container">
                                <Row>
                                    <Col span={14}>
                                        <div
                                            className="product__image"
                                            style={{backgroundImage: `url("${data.image}")`}}
                                        >
                                            <div
                                                className="product__heart"
                                                onClick={e => {
                                                    this.handleSaveClick(e, data.id);
                                                }}
                                            >
                                                {console.log(this.state.visible, "Visible")}
                                                {this.state.visible === true ? (
                                                    <Icon type="heart" theme="filled"/>
                                                ) : (
                                                    <Icon type="heart"/>
                                                )}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={10}>
                                        <div className="mt-1">
                                            <h2 className="product__name">{data.name}</h2>
                                        </div>
                                        <div>
                                            <Row className="product__seller">
                                                <Col span={12}>
                                                    <div style={{fontSize: 18}}>
                                                        by <strong> {data.seller.name}</strong>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="mt-1">
                                                <h2 className="product__price">
                                                    ₹{data.price}
                                                    .00
                                                </h2>
                                            </div>
                                            <div className="mt-2">
                                                {data.sizes.length > 1 && (
                                                    <div className="product__size">
                                                        <div>Size:</div>
                                                        <Select
                                                            style={{width: "100%"}}
                                                            placeholder="Select Size"
                                                            optionFilterProp="children"
                                                            onChange={e => (selectedSize = e)}
                                                        >
                                                            {data.sizes.map(size => (
                                                                <Option value={size} key={size}>
                                                                    {size}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </div>
                                                )}
                                                <div className="product__quantity">
                                                    <div>Quantity:</div>
                                                    <InputNumber
                                                        style={{width: "100%"}}
                                                        min={1}
                                                        max={5}
                                                        onChange={e => (itemCount = e)}
                                                        defaultValue={1}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h5>Overview</h5>
                                                <ul className="product__overview">
                                                    <li>
                                                        Cash On Delivery :{!data.codAccepted ? "Not" : ""}{" "}
                                                        Accepted
                                                    </li>
                                                    <li>
                                                        Return :{!data.returnAccepted ? "Not" : ""} Accepted
                                                    </li>
                                                    <li>Estimated Delivery : 09-09-2018</li>
                                                    <li>Wholesale : Yes</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col span={12}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    className="product__add-to-cart"
                                                    onClick={() =>
                                                        this.handleAddToCart(data, selectedSize, itemCount)
                                                    }
                                                >
                                                    Add To Cart
                                                </Button>
                                            </Col>
                                            <Col span={12}>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    className="product__share"
                                                    onClick={() => {
                                                        this.setState({visibleshare: true});
                                                    }}
                                                >
                                                    Share
                                                </Button>
                                                <Modal
                                                    title="Share on Various platform"
                                                    visible={this.state.visibleshare}
                                                    onCancel={() => {
                                                        this.setState({visibleshare: false});
                                                    }}
                                                >
                                                    <a
                                                        class="resp-sharing-button__link"
                                                        href={`https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffrnzy.in%2Ffeed%2F${parentFeedID}`}
                                                        target="_blank"
                                                        aria-label="Share on Facebook"
                                                    >
                                                        <div
                                                            class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large">
                                                            <div
                                                                aria-hidden="true"
                                                                class="resp-sharing-button__icon resp-sharing-button__icon--solid"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                                                                </svg>
                                                            </div>
                                                            Share on Facebook
                                                        </div>
                                                    </a>

                                                    <a
                                                        class="resp-sharing-button__link"
                                                        href={`https://twitter.com/intent/tweet/?text=http%3A%2F%2Ffrnzy.in%2Ffeed%2F${parentFeedID}`}
                                                        target="_blank"
                                                        aria-label="Share on Twitter"
                                                    >
                                                        <div
                                                            class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large">
                                                            <div
                                                                aria-hidden="true"
                                                                class="resp-sharing-button__icon resp-sharing-button__icon--solid"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                                                                </svg>
                                                            </div>
                                                            Share on Twitter
                                                        </div>
                                                    </a>

                                                    <a
                                                        class="resp-sharing-button__link"
                                                        href={`whatsapp://send?text= http%3A%2F%2Ffrnzy.in%2Ffeed%2F${parentFeedID}`}
                                                        target="_blank"
                                                        aria-label="Share on WhatsApp"
                                                    >
                                                        <div
                                                            class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--large">
                                                            <div
                                                                aria-hidden="true"
                                                                class="resp-sharing-button__icon resp-sharing-button__icon--solid"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/>
                                                                </svg>
                                                            </div>
                                                            Share on WhatsApp
                                                        </div>
                                                    </a>

                                                    <a
                                                        class="resp-sharing-button__link"
                                                        target="_blank"
                                                        onClick={() => this.getToChat(parentFeedID)}
                                                        aria-label="Share on Telegram"
                                                    >
                                                        <div
                                                            class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--large">
                                                            <div
                                                                aria-hidden="true"
                                                                class="resp-sharing-button__icon resp-sharing-button__icon--solid"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        d="M.707 8.475C.275 8.64 0 9.508 0 9.508s.284.867.718 1.03l5.09 1.897 1.986 6.38a1.102 1.102 0 0 0 1.75.527l2.96-2.41a.405.405 0 0 1 .494-.013l5.34 3.87a1.1 1.1 0 0 0 1.046.135 1.1 1.1 0 0 0 .682-.803l3.91-18.795A1.102 1.102 0 0 0 22.5.075L.706 8.475z"/>
                                                                </svg>
                                                            </div>
                                                            Share on message chat
                                                        </div>
                                                    </a>
                                                </Modal>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="information">
                                    <Col span={24}>
                                        <Tabs defaultActiveKey="1" style={{textAlign: "center"}}>
                                            <TabPane
                                                tab={
                                                    <span>
                            <Icon type="android"/>
                            Description
                          </span>
                                                }
                                                key="1"
                                            >
                                                {data.description}
                                            </TabPane>

                                            <TabPane
                                                tab={
                                                    <span>
                            <Icon type="apple"/>
                            Shipping & Returns
                          </span>
                                                }
                                                key="2"
                                            >
                                                Hello World
                                            </TabPane>
                                            <TabPane
                                                tab={
                                                    <span>
                            <Icon type="android"/>
                            Reviews
                          </span>
                                                }
                                                key="3"
                                            >
                                                Hello World
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withApollo(Details);
