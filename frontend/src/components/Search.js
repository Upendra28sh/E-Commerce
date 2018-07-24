import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/home';
import ProductRouter from './ProductRouter';

class Search extends React.Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const query = this.props.match.params.query.trim().toLowerCase();

        return (
            <div>
                <h1>Search Results</h1>
                <h1>#{query}</h1>
                <div>
                    <div className="products">
                        {console.log(this.props.products)}
                        {
                            this.props.products.map((product, index) => {
                                if (product.description.toLowerCase().includes(query)) {
                                    console.log('found');
                                    return (<Link 
                                        key={index} 
                                        to={"/shop/" + (index + 1)}
                                    >
                                        <img 
                                            className="each_product" 
                                            alt={product.description} 
                                            key={index} 
                                            src={product.product_url}
                                        />
                                    </Link>);
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => state,
    actions
)(Search);