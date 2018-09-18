import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import {GET_PRODUCTS_BY_SELLER} from '../Query/query';

class SellerProducts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {match} = this.props;
        const id = this.props.seller;
        return (
            <Query query={GET_PRODUCTS_BY_SELLER} variables={{id: id}}>
                {({loading, error, data}) => {
                    if (loading) {
                        return <p>Loading...</p>;
                    }
                    if (error) {
                        return <p>Error...</p>;
                    }
                    console.log("Products : ", data);

                    data = data.getProductBySeller;
                    console.log(data);
                    console.log(this.props);
                    
                    if (data.length) {
                        return (
                            <div>
                                <div className="products">
                                    {data.map((product, index) =>
                                        <div key={index} className={'product'}>
                                            <div className='image-container'>
                                                <Link to={match.url + "/product/" + (product.id)}>
                                                    <img className="img_fluid" // each_product
                                                         alt={product.description} key={index}
                                                         src={product.image}/>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return <p>No Products</p>
                }}
            </Query>
        );
    }
}

export default SellerProducts;