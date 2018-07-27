import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';
import ProductRouter from './ProductRouter';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <div className="products">
                    {this.props.products.map((image, index) =>
                        <Link key={index} to={"/shop/" + (index + 1)}><img className="each_product" alt={image.description} key={index} src={image.image_url}></img></Link>
                    )}
                </div>
                <ProductRouter />
            </div>
        );
    }
}

const HomeContainer = connect(
    state => state,
    actions
)(Home);

export default HomeContainer;
