import React from "react";
import {Card, Row, Col, Input} from "antd";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
import {Mutation} from "react-apollo";

let ADD_PRODUCT = gql`
    mutation addProduct($input: AddProductInput!) {
        addProduct(input: $input) {
            product {
                id
            }
        }
    }
`;
const client = new ApolloClient({
    uri: "http://localhost:4000"
});

class ProductDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: 0,
            description: "",
            image: ""
        };
    }

    componentDidMount() {
        if (this.props.match !== undefined) {
            ADD_PRODUCT = gql`
                mutation updateProduct($input: UpdateProductInput!) {
                    updateProduct(input: $input) {
                        product {
                            id
                        }
                    }
                }
            `;

            client
            .query({
                query: gql`query{Product(id:"${this.props.match.params.id}"){
                    name
                    price
                    description
                    image
                }}
                `
            })
            .then(result => {
                result = result.data.Product;
                this.setState({
                    name: result.name,
                    description: result.description,
                    image: result.image,
                    price: result.price
                });
                this.setState({productID: this.props.match.params.id});
            });
        }
    }

    render() {
        return (
            <Mutation mutation={ADD_PRODUCT}>
                {(addProduct, {data}) => (
                    <div>
                        <Card style={{width: "95%", margin: "auto"}}>
                            <div className="product_header">
                                <h3>Photos</h3>
                                <p>Add as many pictures as you can</p>
                            </div>

                            <Row className="product_pictures">
                                <Col span={6} className="product_pictures__details">
                                    <Row>
                                        <p style={{marginBottom: 0}}>
                                            <strong>Photos:</strong>
                                        </p>
                                        Use up to ten photos to show your item's most important
                                        qualities.
                                    </Row>
                                    <br/>
                                    <strong>Tips:</strong>
                                    <ol>
                                        <li>Use natural light and no flash.</li>
                                        <li>Include a common object for scale.</li>
                                        <li>Show the item being held, worn, or used.</li>
                                        <li>Shoot against a clean, simple background.</li>
                                    </ol>
                                </Col>
                                <Col span={18}>
                                    <div className="product_pictures__new">+</div>
                                    <div className="product_pictures__new">+</div>
                                    <div className="product_pictures__new">+</div>
                                    <div className="product_pictures__new">+</div>
                                    <div className="product_pictures__new">+</div>
                                </Col>
                            </Row>
                        </Card>

                        <br/>

                        <Card style={{width: "95%", margin: "auto"}}>
                            <div className="product_header">
                                <h3>Listing Details</h3>
                                <p>
                                    Tell the world all about your item and why they’ll love it.
                                </p>
                            </div>

                            <br/>

                            <Row className="product_details">
                                <form onSubmit={this.handleSubmit}>
                                    <Row className="product_details__item">
                                        <Col className="product_details__label" span={4}>
                                            Name
                                            <p>
                                                Tell the world all about your item and tell them what is
                                                great about your product.
                                            </p>
                                        </Col>
                                        <Col span={20} className="product_details__input">
                                            <Input
                                                value={this.state.name}
                                                onChange={e => this.setState({name: e.target.value})}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="product_details__item">
                                        <Col className="product_details__label" span={4}>
                                            Price
                                            <p>
                                                Tell the world all about your item and tell them what is
                                                great about your product.
                                            </p>
                                        </Col>
                                        <Col span={20} className="product_details__input">
                                            <Input
                                                value={this.state.price}
                                                onChange={e =>
                                                    this.setState({price: parseInt(e.target.value)})
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="product_details__item">
                                        <Col className="product_details__label" span={4}>
                                            Description
                                            <p>
                                                Tell the world all about your item and tell them what is
                                                great about your product.
                                            </p>
                                        </Col>
                                        <Col span={20} className="product_details__input">
                                            <Input
                                                value={this.state.description}
                                                onChange={e =>
                                                    this.setState({description: e.target.value})
                                                }
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="product_details__item">
                                        <Col className="product_details__label" span={4}>
                                            Image URL
                                            <p>
                                                Tell the world all about your item and tell them what is
                                                great about your product.
                                            </p>
                                        </Col>
                                        <Col span={20} className="product_details__input">
                                            <Input
                                                value={this.state.image}
                                                onChange={e => this.setState({image: e.target.value})}
                                            />
                                        </Col>
                                    </Row>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            addProduct({variables: {input: this.state}});
                                            window.location = "http://localhost:3000/admin/listings";
                                        }}
                                    >
                                        {this.state.productID == undefined ? "Add" : "Update"}
                                    </button>
                                </form>
                            </Row>
                        </Card>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default ProductDetailsForm;
