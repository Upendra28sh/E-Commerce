import React from "react";
import {Button, Col, Icon, InputNumber, Row, Select, Tabs} from "antd";

import gql from "graphql-tag";
import {Query, withApollo} from "react-apollo";
import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../query';
import {GET_PRODUCT} from "../query";

const TabPane = Tabs.TabPane;
const Option = Select.Option;

const decideQuery = bool => bool ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST;



class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    componentWillMount() {
        const path = this.props.location.pathname;
        const id = path.substr(path.length - 24);

        const query = gql`
            query {
                checkInWishlist(product: "${id}")
            }
        `;

        this.props.client.query({
            query: query
        }).then(
            data => {
                data = data.data.checkInWishlist;
                console.log("Check in Wishlist : " ,data);
                let ans;
                if (data == true) {
                    ans = true;
                } else {
                    ans = false;
                }
                this.setState({
                    visible: ans
                });
            }
        );
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
        this.props.client.mutate({
            mutation: decideQuery(this.state.visible),
            variables: {id: id} ,
            refetchQueries : ['showWishlist']
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
        let productID = this.props.match.params.id ;

        return (
            <Query query={GET_PRODUCT} variables={{input : productID}}>
                {({loading, error, data}) => {
                    // console.log(loading, error, data);

                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    data = data.Product;
                    console.log(data);

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
                                                {console.log(this.state.visible , "Visible")}
                                                {(this.state.visible === true) ? <Icon type="heart" theme="filled" /> : <Icon type="heart"/>}
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
                                                    <div style={{fontSize: 18}}>by <strong> {data.seller.name}</strong>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="mt-1">
                                                <h2 className="product__price">
                                                    ₹{data.price}.00
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
                                                        Cash On Delivery :
                                                        {!data.codAccepted ? "Not" : ""} Accepted
                                                    </li>
                                                    <li>
                                                        Return :
                                                        {!data.returnAccepted ? "Not" : ""} Accepted
                                                    </li>
                                                    <li>
                                                        Estimated Delivery : 09-09-2018
                                                    </li>
                                                    <li>
                                                        Wholesale : Yes
                                                    </li>
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
                                                >
                                                    Share
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="information">
                                    <Col span={24}>
                                        <Tabs defaultActiveKey="1" style={{textAlign: 'center'}}>
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


                                            <TabPane tab={<span><Icon type="apple"/>Shipping & Returns</span>} key="2">
                                                Hello World
                                            </TabPane>
                                            <TabPane tab={<span><Icon type="android"/>Reviews</span>} key="3">
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
