import React from 'react';
import {Link, Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProducts} from '../../../actions/shop';
import ProductRouter from '../ProductRouter';
import {ModalRoute} from 'react-router-modal';
import Details from '../Details';

class Home extends React.Component {
    componentWillMount() {
        this.props.getProducts().then(() => {
            console.log("fetched products");
            console.log("test", this.props.products);
        });
    }

    render() {
        const {match} = this.props;
        // console.log(ModalRoute);
        return (
            <div>
                <div className="container_40">
                    <div className="products">
                        {this.props.products.map((product, index) =>
                            <div key={index} className={'product'}>
                                <div className='image-container'>
                                    <Link to={match.url + "/" + (product.id)}>
                                        <img className="img_fluid" // each_product
                                             alt={product.description} key={index}
                                             src={`product_images/${product.image}`}/>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/*<ModalRoute path={`${match.url}/product/:id`} component={Details}/>*/}
                <ModalRoute path={`${match.url}/:id`} parentPath={match.url} component={Details}/>

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
