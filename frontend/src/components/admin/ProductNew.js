import React, { Component } from 'react';
import { Card } from 'antd';
import DetailsForm from './ProductDetailsForm';

export default class ProductDetails extends Component {
  render() {
    const header = (
        <div className="order_header">
            <span className="order_header__title">Product Details</span>
        </div>
    );

    return (
      <div>
        <DetailsForm />        
      </div>
    )
  }
}