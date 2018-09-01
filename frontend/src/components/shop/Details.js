import React from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import {
  Modal,
  Row,
  Col,
  Tabs,
  Icon,
  Divider,
  Button,
  InputNumber,
  Alert,
  Select,
  Tag
} from "antd";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ApolloClient from "apollo-boost";

// import {getProducts, getDetails, addToCart} from '../../actions/shop';

const client = new ApolloClient({
	uri: "http://localhost:4000"
});

const TabPane = Tabs.TabPane;
const Option = Select.Option;

let GET_PRODUCT = undefined;

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
	this.handleAddToCart = this.handleAddToCart.bind(this);
  }

//   showModal = () => {
//     this.setState(() => ({ visible: true }));
//   };

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
				sellerID {
					id
					name
					image
					about
				}
          	}
          	checkInWishlist(productID: "${id}")
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
					userID: "5b79495957b3413063e7be4c",
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

    client
      .mutate({ mutation: ADD_CART })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

	handleSaveClick(e, inWishlist, id) {
		console.log(e);
		console.log(inWishlist);
		console.log(id);
	}

  	render() {
    // console.log("Details : ", this.props.details);
    // if (!this.state.visible) {
    //     return <Redirect to="/"/>;
    // }

    let selectedSize = undefined;
    let itemCount = undefined;
    let inWishlist = undefined;

    	return (
			<Query query={GET_PRODUCT}>
				{({ loading, error, data }) => {
				// console.log(loading, error, data);

				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
			
				console.log(data);
				
				inWishlist = data.checkInWishlist;
				data = data.Product;
			
				return (
					<div className="product">
						<div className="product__container">
							<Row>
								<Col span={14}>
									<div
										className="product__image"
										style={{ backgroundImage: `url("product_images/${data.image}")` }}
									>
										<div 
											className="product__heart"
											onClick={e => {
												this.handleSaveClick(e, inWishlist, data.id)
												inWishlist = !inWishlist;
											}}
										>
											{ inWishlist ? <Icon type="heart"/> : <Icon type="heart-o"/> }
										</div>
									</div>
								</Col>

								<Col span={10}>
									<Row className="product__seller">
										<Col span={4}>
											<img
												src={`product_images/${data.sellerID.image}`}
												className="product__seller-image"
												id="seller__image"
												alt={data.sellerID.name}
											/>
										</Col>
										<Col span={20} className="product__seller-name">
											{data.sellerID.name}
										</Col>
									</Row>

									<div>
										<div className="my-2">
											<h2 className="product__name">{data.name}</h2>
										</div>
										
										<div className="my-1">
											{ data.keywords.map((keyword,index) => (
												<Tag className="detail" key={index}>{keyword}</Tag>
											))}
										</div>

										<div className="my-2">
											<h2 className="product__price">
												₹{data.price}.00
											</h2>
										</div>

										<div className="my-2">
											<div>Size:</div>
											<Select
												style={{ width: "100%" }}
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
							
										<div className="my-2">
											<div>Quantity:</div>
												<InputNumber
													style={{ width: "100%" }}
													min={1}
													max={10}
													onChange={e => (itemCount = e)}
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
													<Icon type="android" />
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
				)}}
			</Query>
		);
	}
}

export default Details;
