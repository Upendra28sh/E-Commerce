import React from "react";
import {Button, Col, Icon, InputNumber, Row, Select, Tabs, Tag} from "antd";

import gql from "graphql-tag";
import {Query, withApollo} from "react-apollo";
import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../query';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const decideQuery = bool => bool ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST;

let GET_PRODUCT = undefined;


class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: undefined
        };
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    // handleCancel = () => {
    //     this.setState(() => ({visible: false}));
    //     // this.props.history.push('/shop');
    //     this.props.history.goBack();
    // };

    // checkUser() {
    //     if (this.props.token) {
    //         this.props.addToCart(this.props.details.id, this.props.token);
    //     } else {
    //         this.props.emptyFields();
    //     }
    // }

    // containsObject(obj, list) {
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i].id === obj.id) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    componentWillMount() {
        const path = this.props.location.pathname;
        const id = path.substr(path.length - 24);

        const query = gql`
            query {
                checkInWishlist(productID: "${id}")
            }
        `;

        this.props.client.query({
            query: query
        }).then(
            data => {
                data = data.data.checkInWishlist;
                let ans;
                if (data == true) {
                    ans = true;
                } else {
                    ans = false;
                }
                this.setState(() => ({
                    visible: ans
                }));
            }
        );

        GET_PRODUCT = gql`
            query {
                Product(id: "${id}") {
                    id
                    name
                    image
                    price
                    sizes
                    codAccepted
                    returnAccepted
                    description
                    keywords
                    seller {
                        id
                        name
                        image
                        about
                    }
                }
            }
        `;
        // console.log(this.props.products);
        // console.log("Actions : ", actions);

        // if (this.props.products.length === 0) {
        //     console.log("Products Currently Empty");
        //     this.props.getProducts().then(data => {
        //         console.log("Success");
        //         console.log("Fetched Products : ", this.props.products);
        //         this.props.getDetails(this.props.match.params.id);
        //     });

        // }
        // else {
        //     console.log("Products Already There : ", this.props.products);
        //     this.props.getDetails(this.props.match.params.id);
        // }
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
        this.props.client.mutate({
            mutation: decideQuery(this.state.visible),
            variables: {id: id}
        }).then(
            data => {
                console.log(data);
                this.setState(prevState => ({
                    visible: !prevState.visible
                }));
            }
        );
    }

    render() {
        // console.log("Details : ", this.props.details);
        // if (!this.state.visible) {
        //     return <Redirect to="/"/>;
        // }

        let selectedSize = undefined;
        let itemCount = 1;

        return (
            <Query query={GET_PRODUCT}>
                {({loading, error, data}) => {
                    // console.log(loading, error, data);

                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    data = data.Product;

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
                                                {this.state.visible ? <Icon type="heart"/> : <Icon type="heart-o"/>}
                                            </div>
                                        </div>
                                    </Col>

                                    <Col span={10}>
                                        <Row className="product__seller">
                                            <Col span={4}>
                                                <img
                                                    src={`${data.seller.image}`}
                                                    className="product__seller-image"
                                                    id="seller__image"
                                                    alt={data.seller.name}
                                                />
                                            </Col>
                                            <Col span={20} className="product__seller-name">
                                                {data.seller.name}
                                            </Col>
                                        </Row>

                                        <div>
                                            <div className="my-2">
                                                <h2 className="product__name">{data.name}</h2>
                                            </div>

                                            <div className="my-1">
                                                {data.keywords.map((keyword, index) => (
                                                    <Tag className="detail" key={index}>{keyword}</Tag>
                                                ))}
                                            </div>

                                            <div className="my-2">
                                                <h2 className="product__price">
                                                    ₹{data.price}.00
                                                </h2>
                                            </div>

                                            {data.sizes.length > 1 && (
                                                <div className="my-2">
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
                                            <div className="my-2">
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
                                                    Cash On Delivery &nbsp;
                                                    {!data.codAccepted ? "Not" : ""} Accepted
                                                </li>
                                                <li>
                                                    Return &nbsp;
                                                    {!data.returnAccepted ? "Not" : ""} Accepted
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="my-1">Estimated Delivery by - 04/08/2018</p>

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
                                                >
                                                    Share
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="information">
                                    <Col span={24}>
                                        <Tabs defaultActiveKey="1">
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
                                            {/*
										<TabPane tab={<span><Icon type="apple"/>Envelope</span>} key="2">
												envelope dimensions {this.props.details.envelope_dimension}
										</TabPane>
										<TabPane tab={<span><Icon type="android"/>Card</span>} key="3">
											card dimensions {this.props.details.card_dimension}
										</TabPane>
										<TabPane tab={<span><Icon type="android"/>Made In</span>} key="4">
											made in the U.S.A
										</TabPane> 
									*/}
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
