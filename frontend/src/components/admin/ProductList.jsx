import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import * as actions from "../../actions/shop";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_PRODUCT_ADMIN = gql`
  {
    allProducts {
      id
      name
      price
      image
      sizes
      codAccepted
      returnAccepted
      description
      keywords
    }
  }
`;

class ProductList extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>
          Seller Listings{" "}
          <Link to="/admin/listings/new" className="add_listing">
            <button>+</button>
          </Link>
        </h2>

        <Query query={GET_PRODUCT_ADMIN}>
          {({ loading, error, data }) => {
            if (loading) return <Spin size="large" />;
            if (error) return <p>Error</p>;
            return (
              <div>
                <Row gutter={16}>
                  {data.allProducts.map(product => {
                    return (
                      <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard product={product} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductList;
