import React from 'react';
import {Link, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProducts} from '../../../actions/shop';
import ProductRouter from '../ProductRouter';

class Home extends React.Component {
    componentWillMount() {
        this.props.getProducts().then(() => {
            console.log("fetched products");
            console.log("test", this.props.products);
        });
    }

    render() {
        return (
            <div>
                <div className="container_40">
                    <div className="products">
                        {this.props.products.map((product, index) =>
                            <div key={index} className={'product'}>
                                <div className='image-container'>
                                    <Link to={"/shop/" +  (product.id) }>
                                        <img className="img_fluid" // each_product
                                             alt={product.description} key={index}
                                             src={`product_images/${product.image}`}/>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <ProductRouter/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    };
}

const HomeContainer = connect(mapStateToProps, {
    getProducts
})(Home);

export default HomeContainer;
