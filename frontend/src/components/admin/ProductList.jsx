import React, {Component} from 'react';
import {Card, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import ProductCard from "./ProductCard";
import * as actions from '../../actions/shop';
import {connect} from 'react-redux';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const GET_PRODUCT_ADMIN = gql`
    {
        allProducts {
            id ,
            name ,
            image ,
            price ,
            description
        }
    }
`;


class ProductList extends Component {
    render() {
        return (
            <Query query={GET_PRODUCT_ADMIN}>
                {({loading, error, data}) => {
                    if(loading) return <p>Loading</p>
                    if(error) return <p>Error</p>
                    return (
                        <div>
                            <h2>Seller Listings <Link to="/admin/listings/new" className="add_listing">
                                <button>+</button>
                            </Link></h2>

                            <Row gutter={16}>
                                {
                                    data.allProducts.map((product) => {
                                        return <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                                            <ProductCard product={product}/>
                                        </Col>;
                                    })
                                }
                            </Row>
                        </div>
                    );
                }}

            </Query>
        );
    }
}

// export default connect(
//     state => state,
//     actions
//   )(ProductList);
//

export default ProductList;