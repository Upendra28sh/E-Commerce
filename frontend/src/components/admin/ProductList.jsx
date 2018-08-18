import React, {Component} from 'react';
import {Card, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import ProductCard from "./ProductCard";
import * as actions from '../../actions/shop';
import { connect } from 'react-redux';

class ProductList extends Component {
    componentDidMount()
    {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <h2>Seller Listings <Link to="/admin/listings/new" className="add_listing"><button>+</button></Link></h2>
                
                <Row gutter={16}>
               {
                   this.props.products.map((product)=>{
                   return <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                   <ProductCard data={product}/>
               </Col>
               })}
                </Row>
            </div>
        );
    }
}
export default connect(
    state => state,
    actions
  )(ProductList);
  
